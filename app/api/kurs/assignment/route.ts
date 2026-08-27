import { NextResponse } from 'next/server';
import { requireLmsAccess } from '@/lib/lms/auth';
import {
  CAPSTONE_BUCKET,
  capstoneInoPath,
  getCapstoneFileSignedUrl,
  validateCapstoneInoFile,
} from '@/lib/lms/capstone-storage';
import { getAllContentItems, getUserLmsData } from '@/lib/lms/data';
import { calculateCourseStats } from '@/lib/lms/progress';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const contentItemId = searchParams.get('contentItemId');

  if (!contentItemId) {
    return NextResponse.json({ error: 'contentItemId gerekli' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from('assignment_submissions')
    .select('*')
    .eq('user_id', user.id)
    .eq('content_item_id', contentItemId)
    .maybeSingle();

  const fileUrl = await getCapstoneFileSignedUrl(supabase, data?.file_path);

  return NextResponse.json({ submission: data, fileUrl });
}

export async function POST(request: Request) {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createClient();
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    return handleCapstoneSubmission(request, supabase, user.id);
  }

  return handlePerformanceTaskSubmission(request, supabase, user.id);
}

async function handleCapstoneSubmission(
  request: Request,
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
) {
  const formData = await request.formData();
  const contentItemId = formData.get('contentItemId');
  const inoFile = formData.get('inoFile');

  if (typeof contentItemId !== 'string' || !contentItemId) {
    return NextResponse.json({ error: 'contentItemId gerekli' }, { status: 400 });
  }

  const { data: contentItem, error: itemError } = await supabase
    .from('content_items')
    .select('*')
    .eq('id', contentItemId)
    .single();

  if (itemError || !contentItem || contentItem.type !== 'capstone') {
    return NextResponse.json({ error: 'Capstone içeriği bulunamadı' }, { status: 404 });
  }

  const { data: existing } = await supabase
    .from('assignment_submissions')
    .select('file_path, file_name')
    .eq('user_id', userId)
    .eq('content_item_id', contentItemId)
    .maybeSingle();

  let filePath = existing?.file_path ?? null;
  let fileName = existing?.file_name ?? null;

  if (inoFile instanceof File && inoFile.size > 0) {
    const fileError = validateCapstoneInoFile(inoFile);
    if (fileError) {
      return NextResponse.json({ error: fileError }, { status: 400 });
    }

    const path = capstoneInoPath(userId, contentItemId, inoFile.name);
    const buffer = Buffer.from(await inoFile.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(CAPSTONE_BUCKET)
      .upload(path, buffer, { contentType: 'text/plain', upsert: true });

    if (uploadError) {
      console.error('Capstone .ino upload failed:', uploadError.message);
      return NextResponse.json({ error: 'Dosya yüklenemedi.' }, { status: 500 });
    }

    filePath = path;
    fileName = inoFile.name;
  }

  if (!filePath) {
    return NextResponse.json({ error: '.ino dosyanızı yükleyin.' }, { status: 400 });
  }

  const { data: submission, error: submitError } = await supabase
    .from('assignment_submissions')
    .upsert(
      {
        user_id: userId,
        content_item_id: contentItemId,
        file_path: filePath,
        file_name: fileName,
        code_text: null,
        image_path: null,
        primary_link: null,
        secondary_link: null,
        status: 'under_review',
        submitted_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,content_item_id' }
    )
    .select()
    .single();

  if (submitError) {
    return NextResponse.json({ error: submitError.message }, { status: 500 });
  }

  const fileUrl = await getCapstoneFileSignedUrl(supabase, submission.file_path);
  const stats = await buildStats(supabase, userId);

  return NextResponse.json({ submission, fileUrl, stats });
}

async function handlePerformanceTaskSubmission(
  request: Request,
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
) {
  const { contentItemId, primaryLink, secondaryLink } = await request.json();

  if (!contentItemId || !primaryLink) {
    return NextResponse.json(
      { error: 'contentItemId ve primaryLink gerekli' },
      { status: 400 }
    );
  }

  const { data: contentItem, error: itemError } = await supabase
    .from('content_items')
    .select('*')
    .eq('id', contentItemId)
    .single();

  if (itemError || !contentItem) {
    return NextResponse.json({ error: 'İçerik bulunamadı' }, { status: 404 });
  }

  if (contentItem.type !== 'performance_task') {
    return NextResponse.json({ error: 'Geçersiz teslim türü' }, { status: 400 });
  }

  const { data: submission, error: submitError } = await supabase
    .from('assignment_submissions')
    .upsert(
      {
        user_id: userId,
        content_item_id: contentItemId,
        primary_link: primaryLink,
        secondary_link: secondaryLink ?? null,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,content_item_id' }
    )
    .select()
    .single();

  if (submitError) {
    return NextResponse.json({ error: submitError.message }, { status: 500 });
  }

  await supabase.from('student_progress').upsert(
    {
      user_id: userId,
      content_item_id: contentItemId,
      status: 'completed',
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,content_item_id' }
  );

  const stats = await buildStats(supabase, userId);
  return NextResponse.json({ submission, stats });
}

async function buildStats(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const [contentItems, userData] = await Promise.all([
    getAllContentItems(),
    getUserLmsData(userId),
  ]);

  return calculateCourseStats(
    contentItems,
    userData.progress,
    userData.attempts,
    userData.assignments,
    userData.certificate
  );
}
