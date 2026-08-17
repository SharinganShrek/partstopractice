import { NextResponse } from 'next/server';
import { requireLmsAccess } from '@/lib/lms/auth';
import { getAllContentItems, getUserLmsData } from '@/lib/lms/data';
import { calculateCourseStats } from '@/lib/lms/progress';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { quizId, answers, contentItemId } = await request.json();

  if (!quizId || !answers || !contentItemId) {
    return NextResponse.json({ error: 'quizId, answers ve contentItemId gerekli' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: questions, error: qError } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quizId)
    .order('order_index');

  if (qError || !questions?.length) {
    return NextResponse.json({ error: 'Quiz bulunamadı' }, { status: 404 });
  }

  const { data: quiz } = await supabase
    .from('quizzes')
    .select('passing_score')
    .eq('id', quizId)
    .single();

  const passingScore = quiz?.passing_score ?? 70;
  let correct = 0;

  for (const q of questions) {
    if (answers[q.id] === q.correct_answer) {
      correct++;
    }
  }

  const score = Math.round((correct / questions.length) * 100);
  const passed = score >= passingScore;

  const { data: attempt, error: attemptError } = await supabase
    .from('quiz_attempts')
    .insert({
      user_id: user.id,
      quiz_id: quizId,
      score,
      answers,
      passed,
    })
    .select()
    .single();

  if (attemptError) {
    return NextResponse.json({ error: attemptError.message }, { status: 500 });
  }

  if (passed) {
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

  return NextResponse.json({ attempt, score, passed, stats });
}
