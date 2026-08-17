'use client';

import { useEffect, useState } from 'react';
import { Award, Mail, TrendingUp } from 'lucide-react';
import type { Certificate, CourseStats } from '@/lib/lms/types';

interface CertificateBannerProps {
  stats: CourseStats;
  certificate: Certificate | null;
}

export default function CertificateBanner({ stats, certificate }: CertificateBannerProps) {
  const [issuing, setIssuing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (stats.certificateEligible && !certificate && !issuing) {
      handleIssue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.certificateEligible, certificate]);

  async function handleIssue() {
    setIssuing(true);
    const response = await fetch('/api/kurs/certificate', { method: 'POST' });
    const data = await response.json();
    setIssuing(false);

    if (response.ok) {
      setMessage(data.message);
    }
  }

  if (certificate || stats.certificateIssued) {
    return (
      <div className="card p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md">
        <div className="flex items-start gap-4">
          <Award className="h-10 w-10 text-green-600 shrink-0" />
          <div>
            <h3 className="font-display text-lg font-bold text-green-800 mb-1">
              Sertifika Kazanıldı!
            </h3>
            <p className="text-green-700 text-sm flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              {message ?? 'Sertifikanız e-postanıza gönderilmiştir.'}
            </p>
            {certificate?.verification_code && (
              <p className="text-green-600 text-xs mt-2">
                Doğrulama kodu: {certificate.verification_code.slice(0, 8)}...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (issuing) {
    return (
      <div className="card p-6 shadow-md">
        <p className="text-text-muted text-sm">Sertifikanız oluşturuluyor...</p>
      </div>
    );
  }

  const mediaRemaining = Math.max(0, 70 - stats.mediaCompletionPercent);

  return (
    <div className="card p-6 shadow-md">
      <div className="flex items-start gap-4">
        <TrendingUp className="h-8 w-8 text-primary shrink-0" />
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold text-text-body mb-1">
            Sertifika Durumu
          </h3>
          <p className="text-text-muted text-sm mb-3">
            Videoların en az %70&apos;i + tüm quizler + capstone onayı gerekir.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Video tamamlama</span>
              <span className={stats.mediaCompletionMet ? 'text-green-600 font-semibold' : 'font-semibold'}>
                %{stats.mediaCompletionPercent}
                {!stats.mediaCompletionMet && ` (${mediaRemaining}% kaldı)`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Genel ilerleme</span>
              <span className="font-semibold">%{stats.completionPercent}</span>
            </div>
            <div className="flex justify-between">
              <span>Quiz ortalaması</span>
              <span className="font-semibold">%{stats.averageScore}</span>
            </div>
            <div className="flex justify-between">
              <span>Tüm quizler geçildi</span>
              <span className={stats.allQuizzesPassed ? 'text-green-600 font-semibold' : 'text-text-muted'}>
                {stats.allQuizzesPassed ? 'Evet' : 'Hayır'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Capstone onayı</span>
              <span className={stats.capstoneApproved ? 'text-green-600 font-semibold' : 'text-text-muted'}>
                {stats.capstoneApproved ? 'Onaylandı' : 'Bekleniyor'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
