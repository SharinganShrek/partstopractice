import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { getResendFromAddress, canSendResendToRecipient } from '@/lib/lms/resend-from';

export const WELCOME_EMAIL_SUBJECT = 'Yaz Kampımıza Hoş Geldin! ❤️🐙';

export const WELCOME_LOGIN_URL =
  process.env.WELCOME_LOGIN_URL?.trim() ?? 'https://first.partstopractice.org/kurs/giris';

function getSmtpPass(): string | undefined {
  const raw = process.env.SMTP_PASS?.trim();
  if (!raw) return undefined;
  return raw.replace(/\s+/g, '');
}

export function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && getSmtpPass());
}

function getSmtpFromAddress(): string {
  return (
    process.env.SMTP_FROM?.trim() ??
    `IMC 4191 Yaz Kampı <${process.env.SMTP_USER!.trim()}>`
  );
}

export function buildWelcomeEmailHtml(loginUrl: string = WELCOME_LOGIN_URL): string {
  return `
<!DOCTYPE html>
<html lang="tr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#fafaf5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:#7a0019;padding:28px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;line-height:1.35;">
                IMC 4191 X KhanAcademy Türkiye FIRST Yaz Kampı
              </h1>
              <p style="margin:8px 0 0;color:#f5f5dc;font-size:14px;">Yaz Kampımıza Hoş Geldin! ❤️🐙</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:#212529;font-size:16px;line-height:1.6;">
                Merhaba!
              </p>
              <p style="margin:0 0 16px;color:#495057;font-size:15px;line-height:1.6;">
                Kampımıza gösterdiğin ilgi için teşekkür ederiz; öğrenme serüvenin bugün başlıyor! ✨
              </p>
              <p style="margin:0 0 16px;color:#495057;font-size:15px;line-height:1.6;">
                Bu süreçte yeni yetenekler kazanırken konu sonu testleriyle bilgini pekiştireceksin.
                Zorlandığın anlarda ise yalnız değilsin: Haftalık danışma etütlerimizde merak ettiğin
                ve zorlandığın tüm konuları bizlere yöneltebilirsin.
              </p>
              <p style="margin:0 0 24px;color:#495057;font-size:15px;line-height:1.6;">
                Hazırsan serüvene katılmak için aşağıdaki butona tıklaman yeterli!
              </p>
              <p style="margin:0 0 28px;text-align:center;">
                <a href="${loginUrl}"
                   style="display:inline-block;background:#7a0019;color:#ffffff;text-decoration:none;
                          padding:14px 28px;border-radius:8px;font-size:16px;font-weight:bold;">
                  Kampa Giriş Yap
                </a>
              </p>
              <p style="margin:0 0 12px;color:#495057;font-size:14px;line-height:1.6;">
                Buton çalışmıyorsa bu bağlantıyı tarayıcınıza yapıştırın:
              </p>
              <p style="margin:0 0 24px;word-break:break-all;color:#7a0019;font-size:13px;line-height:1.5;">
                ${loginUrl}
              </p>
              <p style="margin:0;color:#495057;font-size:15px;line-height:1.6;">
                Seni aramızda gördüğümüz için çok mutluyuz, görüşmek üzere! ❤️🐙
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#f8f9fa;border-top:1px solid #e9ecef;">
              <p style="margin:0;color:#868e96;font-size:12px;line-height:1.5;">
                IMC 4191 X KhanAcademy Türkiye FIRST Yaz Kampı
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendWelcomeEmailViaResend(
  to: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY yapılandırılmamış' };
  }

  if (!canSendResendToRecipient(to)) {
    return {
      ok: false,
      error: 'Resend sandbox yalnızca hesap sahibi e-postasına gönderim yapar',
    };
  }

  const resend = new Resend(apiKey);
  const fromEmail = getResendFromAddress();

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: WELCOME_EMAIL_SUBJECT,
      html: buildWelcomeEmailHtml(),
    });

    if (error) {
      return { ok: false, error: error.message ?? 'Resend gönderimi başarısız' };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Bilinmeyen e-posta hatası';
    return { ok: false, error: message };
  }
}

export async function sendWelcomeEmailViaSmtp(
  to: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const pass = getSmtpPass();
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !pass) {
    return { ok: false, error: 'SMTP yapılandırılmamış' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER.trim(),
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from: getSmtpFromAddress(),
      to,
      subject: WELCOME_EMAIL_SUBJECT,
      html: buildWelcomeEmailHtml(),
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'SMTP gönderimi başarısız';
    return { ok: false, error: message };
  }
}

export async function deliverWelcomeEmail(
  to: string
): Promise<{ ok: true; channel: string } | { ok: false; error: string }> {
  if (isSmtpConfigured()) {
    const sent = await sendWelcomeEmailViaSmtp(to);
    if (sent.ok) return { ok: true, channel: 'smtp' };
    return sent;
  }

  if (process.env.RESEND_API_KEY) {
    const sent = await sendWelcomeEmailViaResend(to);
    if (sent.ok) return { ok: true, channel: 'resend' };
    return sent;
  }

  return {
    ok: false,
    error: 'E-posta gönderimi yapılandırılmamış (SMTP veya RESEND_API_KEY gerekli).',
  };
}
