import { NextResponse } from 'next/server';
import { requireModerator } from '@/lib/lms/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const { error } = await requireModerator();
  if (error) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const supabase = await createClient();
  const { data, error: dbError } = await supabase
    .from('course_enrollments')
    .select('*')
    .order('enrolled_at', { ascending: false });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const { error } = await requireModerator();
  if (error) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ error: 'email gerekli' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error: insertError } = await supabase
    .from('course_enrollments')
    .insert({ email: email.trim().toLowerCase() })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(request: Request) {
  const { error } = await requireModerator();
  if (error) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'id gerekli' }, { status: 400 });
  }

  const supabase = await createClient();
  const { error: deleteError } = await supabase
    .from('course_enrollments')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
