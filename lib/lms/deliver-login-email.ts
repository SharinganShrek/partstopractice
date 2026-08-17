import { buildAuthConfirmUrl } from '@/lib/lms/magic-link';
import { sendLoginEmailViaSmtp, isSmtpConfigured } from '@/lib/lms/login-email-smtp';
import { sendLoginEmail } from '@/lib/lms/login-email';
import { canSendResendToRecipient } from '@/lib/lms/resend-from';
import { createServiceClient } from '@/lib/supabase/service';

type DeliveryResult = { ok: true; channel: string } | { ok: false; error: string };

export async function createMagicLink(
  email: string,
  redirectTo: string
): Promise<{ ok: true; magicLink: string } | { ok: false; error: string }> {
  const admin = createServiceClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const next = new URL(redirectTo).searchParams.get('next') ?? '/kurs';

  const { data, error } = await admin.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: { redirectTo: `${siteUrl}/auth/confirm?next=${encodeURIComponent(next)}` },
  });

  const hashedToken = data?.properties?.hashed_token;
  if (error || !hashedToken) {
    console.error('generateLink failed:', error?.message);
    return {
      ok: false,
      error: 'Giriş bağlantısı oluşturulamadı.',
    };
  }

  return {
    ok: true,
    magicLink: buildAuthConfirmUrl(siteUrl, hashedToken, next),
  };
}

export async function deliverLoginEmail(
  to: string,
  magicLink: string
): Promise<DeliveryResult> {
  if (isSmtpConfigured()) {
    const sent = await sendLoginEmailViaSmtp(to, magicLink);
    if (sent.ok) {
      return { ok: true, channel: 'smtp' };
    }
    console.error('SMTP login email failed:', sent.error);
    return { ok: false, error: sent.error };
  }

  if (process.env.RESEND_API_KEY && canSendResendToRecipient(to)) {
    const sent = await sendLoginEmail({ to, magicLink });
    if (sent.ok) {
      return { ok: true, channel: 'resend' };
    }
    console.error('Resend login email failed:', sent.error);
    return { ok: false, error: sent.error };
  }

  return {
    ok: false,
    error:
      'E-posta gönderimi yapılandırılmamış. .env.local dosyasında SMTP_HOST, SMTP_USER ve SMTP_PASS ayarlayın.',
  };
}
