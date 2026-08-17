import nodemailer from 'nodemailer';
import { buildLoginEmailHtml } from '@/lib/lms/login-email';

const LOGIN_SUBJECT = 'IMC 4191 X KhanAcademy Türkiye FIRST Yaz Kampı: Giriş Bağlantınız';

function getSmtpPass(): string | undefined {
  const raw = process.env.SMTP_PASS?.trim();
  if (!raw) return undefined;
  // Gmail app passwords are often pasted with spaces: "abcd efgh ijkl mnop"
  return raw.replace(/\s+/g, '');
}

export function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && getSmtpPass());
}

export async function sendLoginEmailViaSmtp(
  to: string,
  magicLink: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const pass = getSmtpPass();
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !pass) {
    return { ok: false, error: 'SMTP yapılandırılmamış' };
  }

  const from =
    process.env.SMTP_FROM?.trim() ??
    `IMC 4191 Yaz Kampı <${process.env.SMTP_USER.trim()}>`;

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
      from,
      to,
      subject: LOGIN_SUBJECT,
      html: buildLoginEmailHtml(magicLink),
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'SMTP gönderimi başarısız';
    console.error('SMTP login email failed:', err);
    return { ok: false, error: message };
  }
}
