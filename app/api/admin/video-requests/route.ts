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
    return { supabase: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  return { supabase, user, error: null };
}

export async function GET(request: Request) {
  const { supabase, error } = await requireModerator();
  if (error || !supabase) return error;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let query = supabase
    .from('video_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (status && isValidStatus(status)) {
    query = query.eq('status', status);
  }

  const { data, error: fetchError } = await query;

  if (fetchError) {
    console.error('Failed to fetch video requests:', fetchError);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }

  return NextResponse.json({ data });
}
