import { NextResponse } from 'next/server';
import { requireLmsAccess } from '@/lib/lms/auth';
import { getAllContentItems, getUserLmsData } from '@/lib/lms/data';
import { calculateCourseStats } from '@/lib/lms/progress';
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
    userData.certificate
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

  if (!contentItemId) {
    return NextResponse.json({ error: 'contentItemId gerekli' }, { status: 400 });
  }

  const supabase = await createClient();

  const updateData: Record<string, unknown> = {
    user_id: user.id,
    content_item_id: contentItemId,
    status: status ?? 'completed',
    watch_seconds: watchSeconds ?? 0,
  };

  if (status === 'completed') {
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
    userData.certificate
  );

  return NextResponse.json({
    progress: data,
    stats,
    attempts: userData.attempts,
    assignments: userData.assignments,
  });
}
