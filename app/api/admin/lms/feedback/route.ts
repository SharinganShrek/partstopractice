import { NextResponse } from 'next/server';
import { requireModerator } from '@/lib/lms/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const { error } = await requireModerator();
  if (error) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const supabase = await createClient();

  const { data, error: dbError } = await supabase
    .from('course_feedback_submissions')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  const enriched = await Promise.all(
    (data ?? []).map(async (submission) => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', submission.user_id)
        .maybeSingle();
      return { ...submission, profiles: profile };
    })
  );

  return NextResponse.json({ data: enriched });
}
