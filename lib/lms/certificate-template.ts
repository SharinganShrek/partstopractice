import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';

interface CertificateData {
  studentName: string;
  courseName: string;
  averageScore: number;
  issuedDate: Date;
  verifyUrl: string;
  verificationCode: string;
}

export async function generateCertificatePdf(data: CertificateData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const { width, height } = page.getSize();

  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const burgundy = rgb(0.478, 0, 0.098);
  const darkGray = rgb(0.1, 0.1, 0.1);
  const lightGray = rgb(0.4, 0.4, 0.4);

  page.drawRectangle({
    x: 30,
    y: 30,
    width: width - 60,
    height: height - 60,
    borderColor: burgundy,
    borderWidth: 3,
  });

  page.drawRectangle({
    x: 40,
    y: 40,
    width: width - 80,
    height: height - 80,
    borderColor: burgundy,
    borderWidth: 1,
  });

  page.drawText('KATILIM VE BASARI SERTIFIKASI', {
    x: width / 2 - 160,
    y: height - 110,
    size: 22,
    font: helveticaBold,
    color: burgundy,
  });

  page.drawText('Bu belge ile', {
    x: width / 2 - 50,
    y: height - 155,
    size: 14,
    font: helvetica,
    color: lightGray,
  });

  page.drawText(data.studentName, {
    x: width / 2 - Math.min(data.studentName.length * 7, 200),
    y: height - 195,
    size: 28,
    font: timesItalic,
    color: darkGray,
  });

  const courseText = `"${data.courseName}" programini`;
  page.drawText(courseText, {
    x: width / 2 - 150,
    y: height - 240,
    size: 14,
    font: helvetica,
    color: darkGray,
  });

  page.drawText('basariyla tamamladigini onaylar.', {
    x: width / 2 - 120,
    y: height - 265,
    size: 14,
    font: helvetica,
    color: darkGray,
  });

  page.drawText(`Quiz Ortalamasi: %${data.averageScore}`, {
    x: width / 2 - 90,
    y: height - 305,
    size: 14,
    font: helveticaBold,
    color: burgundy,
  });

  const dateStr = data.issuedDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  page.drawText(`Tarih: ${dateStr}`, {
    x: width / 2 - 60,
    y: 120,
    size: 12,
    font: helvetica,
    color: lightGray,
  });

  page.drawText('IMC 4191 x Khan Academy Turkiye', {
    x: width / 2 - 120,
    y: 95,
    size: 11,
    font: helvetica,
    color: burgundy,
  });

  page.drawText(`Dogrulama: ${data.verificationCode.slice(0, 8)}...`, {
    x: width / 2 - 80,
    y: 75,
    size: 9,
    font: helvetica,
    color: lightGray,
  });

  const qrPng = await QRCode.toBuffer(data.verifyUrl, { width: 120, margin: 1 });
  const qrImage = await pdfDoc.embedPng(qrPng);
  page.drawImage(qrImage, {
    x: width - 180,
    y: 60,
    width: 100,
    height: 100,
  });

  page.drawText('QR ile dogrula', {
    x: width - 175,
    y: 50,
    size: 8,
    font: helvetica,
    color: lightGray,
  });

  return pdfDoc.save();
}
