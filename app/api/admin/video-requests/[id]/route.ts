import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isModerator, isValidStatus } from '@/lib/video-requests';

async function requireModerator() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !isModerator(user.app_metadata)) {
    return { supabase: null, user: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  return { supabase, user, error: null };
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { supabase, user, error } = await requireModerator();
  if (error || !supabase || !user) return error;

  const { id } = await params;

  try {
    const body = await request.json();
    const status = typeof body.status === 'string' ? body.status : '';
    const moderator_notes =
      typeof body.moderator_notes === 'string' ? body.moderator_notes.trim() : null;

    if (!isValidStatus(status) || status === 'pending') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const { data, error: updateError } = await supabase
      .from('video_requests')
      .update({
        status,
        moderator_notes,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
      })
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      console.error('Failed to update video request:', updateError);
      return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
