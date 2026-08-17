import { Resend } from 'resend';
import { getResendFromAddress } from '@/lib/lms/resend-from';

interface SendCertificateParams {
  to: string;
  studentName: string;
  pdfBytes: Uint8Array;
  averageScore: number;
}

export async function sendCertificateEmail(params: SendCertificateParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = getResendFromAddress();

  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured: skipping certificate email');
    return false;
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: params.to,
      subject: 'Khan Academy × FIRST Yaz Kursu: Sertifikanız',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #7a0019;">Tebrikler, ${params.studentName}!</h1>
          <p>Khan Academy × FIRST Yaz Kursu'nu başarıyla tamamladınız.</p>
          <p><strong>Başarı ortalamanız:</strong> %${params.averageScore}</p>
          <p>Sertifikanız ekte yer almaktadır.</p>
          <p style="color: #666; font-size: 14px;">Khan Academy Türkiye × FIRST</p>
        </div>
      `,
      attachments: [
        {
          filename: 'sertifika.pdf',
          content: Buffer.from(params.pdfBytes),
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Email send failed:', err);
    return false;
  }
}
