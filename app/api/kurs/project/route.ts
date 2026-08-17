import { NextResponse } from 'next/server';
import { requireLmsAccess } from '@/lib/lms/auth';
import { isValidDriveUrl } from '@/lib/lms/drive';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from('project_submissions')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  return NextResponse.json({ submission: data });
}

export async function POST(request: Request) {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { driveLink } = await request.json();

  if (!driveLink || !isValidDriveUrl(driveLink)) {
    return NextResponse.json(
      { error: 'Geçerli bir Google Drive bağlantısı girin' },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data, error: upsertError } = await supabase
    .from('project_submissions')
    .upsert(
      {
        user_id: user.id,
        drive_link: driveLink,
        status: 'pending',
        submitted_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single();

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({ submission: data });
}
