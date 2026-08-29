import { NextResponse } from 'next/server';
import { requireLmsAccess } from '@/lib/lms/auth';
import { getAllContentItems, getUserLmsData } from '@/lib/lms/data';
import { calculateCourseStats } from '@/lib/lms/progress';
import { getRequiredWatchSeconds, resolveVideoDurationSeconds } from '@/lib/lms/video-watch';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    userData.certificate,
    userData.feedbackSubmissions
  );

  return NextResponse.json({
    progress: userData.progress,
    attempts: userData.attempts,
    assignments: userData.assignments,
    stats,
    certificate: userData.certificate,
  });
}

export async function POST(request: Request) {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { contentItemId, status, watchSeconds } = body;
  const nextStatus = status ?? 'completed';
  const nextWatchSeconds = Math.max(0, Math.floor(watchSeconds ?? 0));

  if (!contentItemId) {
    return NextResponse.json({ error: 'contentItemId gerekli' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: contentItem, error: contentError } = await supabase
    .from('content_items')
    .select('type, estimated_duration_minutes, duration_seconds, drive_url')
    .eq('id', contentItemId)
    .maybeSingle();

  if (contentError || !contentItem) {
    return NextResponse.json({ error: 'İçerik bulunamadı' }, { status: 404 });
  }

  if (contentItem.type === 'video' && nextStatus === 'completed') {
    const durationSeconds = resolveVideoDurationSeconds({
      durationSeconds: contentItem.duration_seconds,
      estimatedMinutes: contentItem.estimated_duration_minutes,
      driveUrl: contentItem.drive_url,
    });
    const requiredSeconds = getRequiredWatchSeconds(durationSeconds);
    if (nextWatchSeconds < requiredSeconds) {
      return NextResponse.json(
        {
          error: `Videoyu tamamlamak için en az ${requiredSeconds} saniye izlemeniz gerekir.`,
        },
        { status: 400 }
      );
    }
  }

  const updateData: Record<string, unknown> = {
    user_id: user.id,
    content_item_id: contentItemId,
    status: nextStatus,
    watch_seconds: nextWatchSeconds,
  };

  if (nextStatus === 'completed') {
    updateData.completed_at = new Date().toISOString();
  }

  const { data, error: upsertError } = await supabase
    .from('student_progress')
    .upsert(updateData, { onConflict: 'user_id,content_item_id' })
    .select()
    .single();

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
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
    userData.certificate,
    userData.feedbackSubmissions
  );

  return NextResponse.json({
    progress: data,
    stats,
    attempts: userData.attempts,
    assignments: userData.assignments,
  });
}
