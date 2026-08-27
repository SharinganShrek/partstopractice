import { NextResponse } from 'next/server';
import { requireModerator } from '@/lib/lms/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const { error } = await requireModerator();
  if (error) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const supabase = await createClient();

  const { data: capstoneItems } = await supabase
    .from('content_items')
    .select('id')
    .eq('type', 'capstone');

  const capstoneIds = (capstoneItems ?? []).map((i) => i.id);
  if (capstoneIds.length === 0) {
    return NextResponse.json({ data: [] });
  }

  const { data, error: dbError } = await supabase
    .from('assignment_submissions')
    .select('*')
    .in('content_item_id', capstoneIds)
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

export async function PATCH(request: Request) {
  const { user, error } = await requireModerator();
  if (error || !user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id, status, grade, feedback } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'id gerekli' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: submission, error: fetchError } = await supabase
    .from('assignment_submissions')
    .select('*, content_items(type)')
    .eq('id', id)
    .single();

  if (fetchError || !submission) {
    return NextResponse.json({ error: 'Teslim bulunamadı' }, { status: 404 });
  }

  const { data, error: updateError } = await supabase
    .from('assignment_submissions')
    .update({
      status,
      grade: grade ?? null,
      feedback: feedback ?? null,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
    })
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  if (status === 'approved') {
    await supabase.from('student_progress').upsert(
      {
        user_id: submission.user_id,
        content_item_id: submission.content_item_id,
        status: 'completed',
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,content_item_id' }
    );
  }

  return NextResponse.json({ data });
}
