import { Resend } from 'resend';
import { getResendFromAddress } from '@/lib/lms/resend-from';

interface SendLoginEmailParams {
  to: string;
  magicLink: string;
}

export function buildLoginEmailHtml(magicLink: string): string {
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
              <p style="margin:8px 0 0;color:#f5f5dc;font-size:14px;">Öğrenme platformu girişi</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:#212529;font-size:16px;line-height:1.6;">
                Merhaba,
              </p>
              <p style="margin:0 0 24px;color:#495057;font-size:15px;line-height:1.6;">
                Yaz kampı platformuna giriş yapmak için aşağıdaki butona tıklayın. Bu bağlantı
                <strong>tek kullanımlıktır</strong> ve güvenliğiniz için kısa süre geçerlidir.
              </p>
              <p style="margin:0 0 28px;text-align:center;">
                <a href="${magicLink}"
                   style="display:inline-block;background:#7a0019;color:#ffffff;text-decoration:none;
                          padding:14px 28px;border-radius:8px;font-size:16px;font-weight:bold;">
                  Kampa Giriş Yap
                </a>
              </p>
              <p style="margin:0 0 12px;color:#495057;font-size:14px;line-height:1.6;">
                Buton çalışmıyorsa bu bağlantıyı tarayıcınıza yapıştırın:
              </p>
              <p style="margin:0 0 24px;word-break:break-all;color:#7a0019;font-size:13px;line-height:1.5;">
                ${magicLink}
              </p>
              <p style="margin:0;color:#868e96;font-size:13px;line-height:1.6;">
                İlk girişten sonra tarayıcınızda oturumunuz açık kalır; her seferinde yeni e-posta
                almanız gerekmez. Farklı cihaz kullanırken veya çıkış yaptıktan sonra tekrar
                giriş bağlantısı isteyebilirsiniz.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#f8f9fa;border-top:1px solid #e9ecef;">
              <p style="margin:0;color:#868e96;font-size:12px;line-height:1.5;">
                Bu e-postayı siz istemediyseniz güvenle yok sayabilirsiniz.<br>
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

export async function sendLoginEmail(
  params: SendLoginEmailParams
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY yapılandırılmamış' };
  }

  const resend = new Resend(apiKey);
  const fromEmail = getResendFromAddress();

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: params.to,
      subject: 'IMC 4191 X KhanAcademy Türkiye FIRST Yaz Kampı: Giriş Bağlantınız',
      html: buildLoginEmailHtml(params.magicLink),
    });

    if (error) {
      console.error('Login email error:', error);
      return { ok: false, error: error.message ?? 'Resend gönderimi başarısız' };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Bilinmeyen e-posta hatası';
    console.error('Login email send failed:', err);
    return { ok: false, error: message };
  }
}
