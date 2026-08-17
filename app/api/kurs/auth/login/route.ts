import { NextResponse } from 'next/server';
import { createMagicLink, deliverLoginEmail } from '@/lib/lms/deliver-login-email';
import { isSmtpConfigured } from '@/lib/lms/login-email-smtp';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { email } = await request.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'E-posta gerekli' }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const { data: enrolled } = await supabase.rpc('is_email_enrolled', {
    check_email: normalizedEmail,
  });

  if (!enrolled) {
    return NextResponse.json(
      {
        error:
          'Bu e-posta adresi kurs kaydında bulunamadı. Lütfen eğitmeninizle iletişime geçin.',
      },
      { status: 403 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const redirectTo = `${siteUrl}/auth/callback?next=/kurs`;

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: 'Sunucu yapılandırması eksik (SUPABASE_SERVICE_ROLE_KEY).' },
      { status: 500 }
    );
  }

  if (!isSmtpConfigured() && !process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        error:
          'E-posta gönderimi yapılandırılmamış. SMTP_HOST, SMTP_USER ve SMTP_PASS değerlerini .env.local dosyasına ekleyin.',
      },
      { status: 500 }
    );
  }

  const link = await createMagicLink(normalizedEmail, redirectTo);
  if (!link.ok) {
    return NextResponse.json({ error: link.error }, { status: 500 });
  }

  const delivered = await deliverLoginEmail(normalizedEmail, link.magicLink);
  if (!delivered.ok) {
    return NextResponse.json({ error: delivered.error }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message:
      'Giriş bağlantısı e-postanıza gönderildi. Gelen kutunuzu ve spam klasörünü kontrol edin.',
  });
}
