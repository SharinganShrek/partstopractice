import { NextResponse } from 'next/server';
import { requireLmsAccess } from '@/lib/lms/auth';
import { getAllContentItems, getUserLmsData } from '@/lib/lms/data';
import { calculateCourseStats } from '@/lib/lms/progress';
import { createClient } from '@/lib/supabase/server';

const MAX_LENGTH = 500;

function trimField(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export async function GET(request: Request) {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const contentItemId = searchParams.get('contentItemId');

  const supabase = await createClient();

  let query = supabase
    .from('course_feedback_submissions')
    .select('*')
    .eq('user_id', user.id);

  if (contentItemId) {
    query = query.eq('content_item_id', contentItemId);
  }

  const { data: submission } = await query.maybeSingle();

  return NextResponse.json({ submission });
}

export async function POST(request: Request) {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const contentItemId = body.contentItemId?.trim() ?? '';
  const fullName = trimField(body.fullName, 120);
  const teamMessage = trimField(body.teamMessage, MAX_LENGTH);
  const improvementFeedback = trimField(body.improvementFeedback, MAX_LENGTH);

  if (!contentItemId) {
    return NextResponse.json({ error: 'contentItemId gerekli' }, { status: 400 });
  }

  if (!fullName || !teamMessage || !improvementFeedback) {
    return NextResponse.json({ error: 'Tüm alanları doldurun.' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: contentItem, error: contentError } = await supabase
    .from('content_items')
    .select('id, type')
    .eq('id', contentItemId)
    .maybeSingle();

  if (contentError || !contentItem || contentItem.type !== 'final_feedback') {
    return NextResponse.json({ error: 'Geçersiz geri bildirim içeriği' }, { status: 404 });
  }

  const { data: existing } = await supabase
    .from('course_feedback_submissions')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: 'Geri bildirim zaten gönderildi.' }, { status: 409 });
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

  if (!stats.certificateEligible) {
    return NextResponse.json(
      { error: 'Geri bildirim göndermek için sertifika şartlarını tamamlamanız gerekir.' },
      { status: 403 }
    );
  }

  const { data: submission, error: insertError } = await supabase
    .from('course_feedback_submissions')
    .insert({
      user_id: user.id,
      content_item_id: contentItemId,
      full_name: fullName,
      team_message: teamMessage,
      improvement_feedback: improvementFeedback,
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  await supabase.from('student_progress').upsert(
    {
      user_id: user.id,
      content_item_id: contentItemId,
      status: 'completed',
      watch_seconds: 0,
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,content_item_id' }
  );

  const updatedUserData = await getUserLmsData(user.id);
  const updatedStats = calculateCourseStats(
    contentItems,
    updatedUserData.progress,
    updatedUserData.attempts,
    updatedUserData.assignments,
    updatedUserData.certificate,
    updatedUserData.feedbackSubmissions
  );

  return NextResponse.json({ submission, stats: updatedStats });
}
