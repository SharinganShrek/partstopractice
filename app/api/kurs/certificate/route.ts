import { generateCertificatePdf } from '@/lib/lms/certificate-template';
import { sendCertificateEmail } from '@/lib/lms/send-certificate';
import { requireLmsAccess } from '@/lib/lms/auth';
import { getAllContentItems, getUserLmsData } from '@/lib/lms/data';
import { calculateCourseStats } from '@/lib/lms/progress';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export async function POST() {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createClient();

  const { data: existingCert } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (existingCert) {
    return NextResponse.json({
      certificate: existingCert,
      message: existingCert.email_sent_at
        ? 'Sertifikanız daha önce e-postanıza gönderilmiştir.'
        : 'Sertifikanız oluşturuldu.',
      alreadyIssued: true,
    });
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
    userData.certificate,
    userData.feedbackSubmissions
  );

  if (!stats.certificateReady) {
    return NextResponse.json(
      {
        error: stats.certificateEligible
          ? 'Sertifika için Son bir görev formunu tamamlamanız gerekir.'
          : 'Sertifika için gereksinimler henüz tamamlanmadı.',
        stats,
      },
      { status: 400 }
    );
  }

  const studentName =
    userData.profile?.full_name ?? user.email?.split('@')[0] ?? 'Öğrenci';

  const verificationCode = randomUUID();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const verifyUrl = `${siteUrl}/kurs/sertifika/dogrula/${verificationCode}`;

  const pdfBytes = await generateCertificatePdf({
    studentName,
    courseName: 'Khan Academy × FIRST Yaz Kursu',
    averageScore: stats.averageScore,
    issuedDate: new Date(),
    verifyUrl,
    verificationCode,
  });

  const fileName = `${user.id}/certificate.pdf`;

  const { error: uploadError } = await supabase.storage
    .from('certificates')
    .upload(fileName, pdfBytes, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (uploadError) {
    console.error('Certificate upload error:', uploadError);
  }

  const { data: certificate, error: certError } = await supabase
    .from('certificates')
    .insert({
      user_id: user.id,
      average_score: stats.averageScore,
      pdf_path: fileName,
      verification_code: verificationCode,
    })
    .select()
    .single();

  if (certError) {
    return NextResponse.json({ error: certError.message }, { status: 500 });
  }

  let emailSent = false;
  if (user.email) {
    emailSent = await sendCertificateEmail({
      to: user.email,
      studentName,
      pdfBytes,
      averageScore: stats.averageScore,
    });

    if (emailSent) {
      await supabase
        .from('certificates')
        .update({ email_sent_at: new Date().toISOString() })
        .eq('id', certificate.id);
    }
  }

  return NextResponse.json({
    certificate,
    emailSent,
    message: emailSent
      ? 'Sertifikanız oluşturuldu ve e-postanıza gönderildi.'
      : 'Sertifikanız oluşturuldu.',
  });
}

export async function GET() {
  const { user, error } = await requireLmsAccess();
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createClient();
  const { data: certificate } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  const [contentItems, userData] = await Promise.all([
    getAllContentItems(),
    getUserLmsData(user.id),
  ]);

  const stats = calculateCourseStats(
    contentItems,
    userData.progress,
    userData.attempts,
    userData.assignments,
    userData.certificate,
    userData.feedbackSubmissions
  );

  return NextResponse.json({
    certificate,
    stats,
  });
}
