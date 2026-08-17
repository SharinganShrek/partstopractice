import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  try {
    const supabase = createServiceClient();

    const { data: cert, error } = await supabase
      .from('certificates')
      .select('user_id, average_score, issued_at, verification_code')
      .eq('verification_code', code)
      .maybeSingle();

    if (error || !cert) {
      return NextResponse.json({ error: 'Sertifika bulunamadı' }, { status: 404 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', cert.user_id)
      .maybeSingle();

    return NextResponse.json({
      studentName: profile?.full_name ?? 'Öğrenci',
      courseName: 'Khan Academy × FIRST Yaz Kursu',
      averageScore: Number(cert.average_score),
      issuedAt: cert.issued_at,
      verificationCode: cert.verification_code,
      valid: true,
    });
  } catch {
    return NextResponse.json({ error: 'Doğrulama servisi yapılandırılmamış' }, { status: 503 });
  }
}
