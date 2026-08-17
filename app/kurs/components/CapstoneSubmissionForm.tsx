'use client';

import { useEffect, useState } from 'react';
import { isValidDriveUrl } from '@/lib/lms/drive';
import type { AssignmentSubmission } from '@/lib/lms/types';
import { Badge } from '@/components/ui/badge';

interface CapstoneSubmissionFormProps {
  contentItemId: string;
  onSubmitted?: () => void;
}

const STATUS_LABELS: Record<string, string> = {
  submitted: 'Teslim Edildi',
  under_review: 'İnceleniyor',
  approved: 'Onaylandı',
  revision: 'Revizyon Gerekli',
};

export default function CapstoneSubmissionForm({
  contentItemId,
  onSubmitted,
}: CapstoneSubmissionFormProps) {
  const [simulationUrl, setSimulationUrl] = useState('');
  const [reportLink, setReportLink] = useState('');
  const [submission, setSubmission] = useState<AssignmentSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/kurs/assignment?contentItemId=${contentItemId}`);
      if (response.ok) {
        const data = await response.json();
        setSubmission(data.submission);
        if (data.submission) {
          setSimulationUrl(data.submission.primary_link);
          setReportLink(data.submission.secondary_link ?? '');
        }
      }
      setLoading(false);
    }
    load();
  }, [contentItemId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isValidDriveUrl(reportLink)) {
      setError('Teknik rapor için geçerli bir Google Drive bağlantısı girin.');
      return;
    }

    setSubmitting(true);
    const response = await fetch('/api/kurs/assignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contentItemId,
        primaryLink: simulationUrl,
        secondaryLink: reportLink,
      }),
    });

    const data = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setError(data.error ?? 'Teslim başarısız');
      return;
    }

    setSubmission(data.submission);
    onSubmitted?.();
  }

  if (loading) return <p className="text-text-muted text-sm">Yükleniyor...</p>;

  return (
    <div className="card p-6 shadow-md">
      <h2 className="font-display text-xl font-bold text-text-body mb-2">
        Bitirme Projesi: IMC Asenkron Mini-Hackathon
      </h2>
      <p className="text-text-muted text-sm mb-6">
        Tinkercad 3D, Circuits ve Arduino/C++ bilgilerinizi birleştiren projenizin canlı
        simülasyon bağlantısını ve teknik rapor dosyanızı (Google Drive) yükleyin.
      </p>

      {submission && (
        <div className="mb-6 p-4 rounded-lg bg-surface-cream border border-border space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Durum:</span>
            <Badge variant="muted">{STATUS_LABELS[submission.status] ?? submission.status}</Badge>
          </div>
          {submission.feedback && (
            <p className="text-sm">
              <span className="font-medium">Geri bildirim:</span> {submission.feedback}
            </p>
          )}
        </div>
      )}

      {(!submission || submission.status === 'revision') && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Canlı Simülasyon Bağlantısı (Tinkercad URL)
            </label>
            <input
              type="url"
              required
              value={simulationUrl}
              onChange={(e) => setSimulationUrl(e.target.value)}
              placeholder="https://www.tinkercad.com/things/..."
              className="w-full px-4 py-3 rounded-lg border border-border text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Teknik Rapor (Google Drive)
            </label>
            <input
              type="url"
              required
              value={reportLink}
              onChange={(e) => setReportLink(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full px-4 py-3 rounded-lg border border-border text-sm"
            />
          </div>
          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary px-6 py-2.5 rounded-lg font-semibold disabled:opacity-60"
          >
            {submitting ? 'Gönderiliyor...' : submission ? 'Yeniden Teslim Et' : 'Capstone Teslim Et'}
          </button>
        </form>
      )}
    </div>
  );
}
