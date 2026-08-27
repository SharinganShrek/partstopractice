import { NextResponse } from 'next/server';
import { requireLmsAccess } from '@/lib/lms/auth';
import {
  isValidDriveUrl,
  isValidHttpUrl,
  isValidTinkercadUrl,
} from '@/lib/lms/capstone-links';
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

  return NextResponse.json({ submission: data });
}

export async function POST(request: Request) {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createClient();
  const body = await request.json();
  const { contentItemId } = body;

  if (!contentItemId) {
    return NextResponse.json({ error: 'contentItemId gerekli' }, { status: 400 });
  }

  const { data: contentItem, error: itemError } = await supabase
    .from('content_items')
    .select('*')
    .eq('id', contentItemId)
    .single();

  if (itemError || !contentItem) {
    return NextResponse.json({ error: 'İçerik bulunamadı' }, { status: 404 });
  }

  if (contentItem.type === 'capstone') {
    return handleCapstoneSubmission(supabase, user.id, contentItemId, body);
  }

  if (contentItem.type === 'performance_task') {
    return handlePerformanceTaskSubmission(supabase, user.id, contentItemId, body);
  }

  return NextResponse.json({ error: 'Geçersiz içerik türü' }, { status: 400 });
}

async function handleCapstoneSubmission(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  contentItemId: string,
  body: {
    tinkercadLink?: string;
    reportLink?: string;
    arduinoLink?: string;
  }
) {
  const tinkercadLink = body.tinkercadLink?.trim() ?? '';
  const reportLink = body.reportLink?.trim() ?? '';
  const arduinoLink = body.arduinoLink?.trim() ?? '';

  if (!tinkercadLink || !isValidTinkercadUrl(tinkercadLink)) {
    return NextResponse.json(
      { error: 'Geçerli bir Tinkercad proje bağlantısı girin.' },
      { status: 400 }
    );
  }

  if (!reportLink || !isValidDriveUrl(reportLink)) {
    return NextResponse.json(
      { error: 'Geçerli bir Google Drive teknik rapor bağlantısı girin.' },
      { status: 400 }
    );
  }

  if (!arduinoLink || !isValidHttpUrl(arduinoLink)) {
    return NextResponse.json(
      { error: 'Geçerli bir Arduino kod bağlantısı girin.' },
      { status: 400 }
    );
  }

  const { data: submission, error: submitError } = await supabase
    .from('assignment_submissions')
    .upsert(
      {
        user_id: userId,
        content_item_id: contentItemId,
        primary_link: tinkercadLink,
        secondary_link: reportLink,
        arduino_link: arduinoLink,
        code_text: null,
        image_path: null,
        file_path: null,
        file_name: null,
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

  const stats = await buildStats(supabase, userId);
  return NextResponse.json({ submission, stats });
}

async function handlePerformanceTaskSubmission(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  contentItemId: string,
  body: { primaryLink?: string; secondaryLink?: string }
) {
  const { primaryLink, secondaryLink } = body;

  if (!primaryLink) {
    return NextResponse.json(
      { error: 'contentItemId ve primaryLink gerekli' },
      { status: 400 }
    );
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
