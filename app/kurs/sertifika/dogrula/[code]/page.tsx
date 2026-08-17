'use client';

import { useEffect, useState } from 'react';
import { Award, CheckCircle2, XCircle } from 'lucide-react';

export default function CertificateVerifyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const [code, setCode] = useState<string | null>(null);
  const [result, setResult] = useState<{
    valid: boolean;
    studentName?: string;
    courseName?: string;
    averageScore?: number;
    issuedAt?: string;
    error?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ code: c }) => {
      setCode(c);
      fetch(`/api/kurs/certificate/verify/${c}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setResult({
              valid: true,
              studentName: data.studentName,
              courseName: data.courseName,
              averageScore: data.averageScore,
              issuedAt: data.issuedAt,
            });
          } else {
            setResult({ valid: false, error: data.error ?? 'Geçersiz sertifika' });
          }
          setLoading(false);
        })
        .catch(() => {
          setResult({ valid: false, error: 'Doğrulama başarısız' });
          setLoading(false);
        });
    });
  }, [params]);

  return (
    <div className="min-h-screen bg-surface-cream flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md p-8 shadow-lg text-center">
        {loading ? (
          <p className="text-text-muted">Sertifika doğrulanıyor...</p>
        ) : result?.valid ? (
          <>
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="font-display text-xl font-bold text-text-body mb-2">
              Geçerli Sertifika
            </h1>
            <Award className="h-8 w-8 text-primary mx-auto mb-4" />
            <p className="font-semibold text-lg mb-1">{result.studentName}</p>
            <p className="text-text-muted text-sm mb-4">{result.courseName}</p>
            <div className="text-sm space-y-1 text-left bg-surface-cream rounded-lg p-4">
              <p>
                <span className="font-medium">Quiz ortalaması:</span> %{result.averageScore}
              </p>
              <p>
                <span className="font-medium">Tarih:</span>{' '}
                {result.issuedAt
                  ? new Date(result.issuedAt).toLocaleDateString('tr-TR')
                  : '-'}
              </p>
              <p className="text-xs text-text-muted mt-2 break-all">Kod: {code}</p>
            </div>
            <p className="text-xs text-text-muted mt-4">
              IMC 4191 × Khan Academy Türkiye onaylı sertifika
            </p>
          </>
        ) : (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="font-display text-xl font-bold text-text-body mb-2">
              Sertifika Bulunamadı
            </h1>
            <p className="text-text-muted text-sm">{result?.error}</p>
          </>
        )}
      </div>
    </div>
  );
}
