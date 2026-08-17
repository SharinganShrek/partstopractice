import { NextResponse } from 'next/server';
import { requireLmsAccess } from '@/lib/lms/auth';
import { getAllContentItems, getUserLmsData } from '@/lib/lms/data';
import { calculateCourseStats } from '@/lib/lms/progress';
import { createClient } from '@/lib/supabase/server';
import { isValidDriveUrl } from '@/lib/lms/drive';

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

  const { contentItemId, primaryLink, secondaryLink } = await request.json();

  if (!contentItemId || !primaryLink) {
    return NextResponse.json(
      { error: 'contentItemId ve primaryLink gerekli' },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data: contentItem, error: itemError } = await supabase
    .from('content_items')
    .select('*')
    .eq('id', contentItemId)
    .single();

  if (itemError || !contentItem) {
    return NextResponse.json({ error: 'İçerik bulunamadı' }, { status: 404 });
  }

  if (contentItem.type === 'capstone') {
    if (!secondaryLink || !isValidDriveUrl(secondaryLink)) {
      return NextResponse.json(
        { error: 'Capstone için simülasyon URL ve geçerli rapor Drive linki gerekli' },
        { status: 400 }
      );
    }
  }

  const isPerformanceTask = contentItem.type === 'performance_task';
  const status = isPerformanceTask ? 'submitted' : 'under_review';

  const { data: submission, error: submitError } = await supabase
    .from('assignment_submissions')
    .upsert(
      {
        user_id: user.id,
        content_item_id: contentItemId,
        primary_link: primaryLink,
        secondary_link: secondaryLink ?? null,
        status,
        submitted_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,content_item_id' }
    )
    .select()
    .single();

  if (submitError) {
    return NextResponse.json({ error: submitError.message }, { status: 500 });
  }

  if (isPerformanceTask) {
    await supabase.from('student_progress').upsert(
      {
        user_id: user.id,
        content_item_id: contentItemId,
        status: 'completed',
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,content_item_id' }
    );
  }

  const [contentItems, userData] = await Promise.all([
    getAllContentItems(),
    getUserLmsData(user.id),
  ]);

  const stats = calculateCourseStats(
    contentItems,
    userData.progress,
    userData.attempts,
    userData.assignments,
    userData.certificate
  );

  return NextResponse.json({ submission, stats });
}
