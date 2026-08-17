import { NextResponse } from 'next/server';
import { requireModerator } from '@/lib/lms/auth';
import { getAllContentItems } from '@/lib/lms/data';
import { calculateCourseStats, calculateMediaCompletion } from '@/lib/lms/progress';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const { error } = await requireModerator();
  if (error) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const supabase = await createClient();
  const contentItems = await getAllContentItems();

  const { data: enrollments } = await supabase
    .from('course_enrollments')
    .select('*')
    .not('user_id', 'is', null);

  const students = [];

  for (const enrollment of enrollments ?? []) {
    if (!enrollment.user_id) continue;

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', enrollment.user_id)
      .maybeSingle();

    const [progressRes, attemptsRes, assignmentsRes, certRes] = await Promise.all([
      supabase.from('student_progress').select('*').eq('user_id', enrollment.user_id),
      supabase.from('quiz_attempts').select('*').eq('user_id', enrollment.user_id),
      supabase.from('assignment_submissions').select('*').eq('user_id', enrollment.user_id),
      supabase.from('certificates').select('*').eq('user_id', enrollment.user_id).maybeSingle(),
    ]);

    const progress = progressRes.data ?? [];
    const stats = calculateCourseStats(
      contentItems,
      progress,
      attemptsRes.data ?? [],
      assignmentsRes.data ?? [],
      certRes.data
    );

    const mediaCompletion = calculateMediaCompletion(contentItems, progress);

    students.push({
      userId: enrollment.user_id,
      email: profile?.email ?? enrollment.email,
      fullName: profile?.full_name ?? enrollment.email,
      stats: { ...stats, mediaCompletionPercent: mediaCompletion },
      capstoneStatus:
        assignmentsRes.data?.find((a) =>
          contentItems.some((c) => c.id === a.content_item_id && c.type === 'capstone')
        )?.status ?? null,
      hasCertificate: certRes.data != null,
    });
  }

  return NextResponse.json({ students });
}
