import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { validateVideoRequestInput } from '@/lib/video-requests';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = validateVideoRequestInput(body);

    if (error || !data) {
      return NextResponse.json({ error: error ?? 'Invalid input' }, { status: 400 });
    }

    const supabase = await createClient();
    const { error: insertError } = await supabase.from('video_requests').insert({
      title: data.title,
      video_type: data.video_type,
      language: data.language,
      drive_link: data.drive_link,
      submitter_name: data.submitter_name ?? null,
      submitter_email: data.submitter_email ?? null,
    });

    if (insertError) {
      console.error('Failed to insert video request:', insertError);
      return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
