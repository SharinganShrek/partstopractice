'use client';

import { useEffect, useState } from 'react';
import { Cpu, FileText, Link2 } from 'lucide-react';
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

const LINK_FIELDS = [
  {
    key: 'tinkercadLink' as const,
    dbKey: 'primary_link' as const,
    label: 'Tinkercad Projesi',
    icon: Link2,
    placeholder: 'https://www.tinkercad.com/things/...',
    hint: 'Tinkercad devre veya 3D projenizin paylaşım bağlantısı',
  },
  {
    key: 'reportLink' as const,
    dbKey: 'secondary_link' as const,
    label: 'Teknik Rapor (Google Drive)',
    icon: FileText,
    placeholder: 'https://drive.google.com/file/d/...',
    hint: 'Teknik raporunuzun Google Drive paylaşım bağlantısı',
  },
  {
    key: 'arduinoLink' as const,
    dbKey: 'arduino_link' as const,
    label: 'Arduino Kod',
    icon: Cpu,
    placeholder: 'https://drive.google.com/file/d/... veya kod paylaşım linki',
    hint: 'Arduino kodunuzun paylaşım bağlantısı (Drive, GitHub vb.)',
  },
];

export default function CapstoneSubmissionForm({
  contentItemId,
  onSubmitted,
}: CapstoneSubmissionFormProps) {
  const [links, setLinks] = useState({
    tinkercadLink: '',
    reportLink: '',
    arduinoLink: '',
  });
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
          setLinks({
            tinkercadLink: data.submission.primary_link ?? '',
            reportLink: data.submission.secondary_link ?? '',
            arduinoLink: data.submission.arduino_link ?? '',
          });
        }
      }
      setLoading(false);
    }
    load();
  }, [contentItemId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const response = await fetch('/api/kurs/assignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentItemId, ...links }),
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

  const canEdit = !submission || submission.status === 'revision';

  if (loading) return <p className="text-text-muted text-sm">Yükleniyor...</p>;

  return (
    <div className="card p-6 md:p-8 shadow-md">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-text-body mb-2">
          Bitirme Projesi: IMC Asenkron Mini-Hackathon
        </h2>
        <p className="text-text-muted text-sm leading-relaxed">
          Aşağıdaki <strong>3 bağlantıyı</strong> doldurun: Tinkercad projesi, Google Drive
          teknik raporu ve Arduino kod paylaşım linki. Tesliminiz eğitmen tarafından incelenip
          onaylanacaktır.
        </p>
      </div>

      {submission && (
        <div className="mb-6 p-4 rounded-xl bg-surface-cream border border-border space-y-2">
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

      {canEdit ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {LINK_FIELDS.map(({ key, label, icon: Icon, placeholder, hint }) => (
            <div key={key}>
              <label className="flex items-center gap-2 text-sm font-semibold text-text-body mb-2">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                {label}
              </label>
              <input
                type="url"
                required
                value={links[key]}
                onChange={(e) => setLinks((prev) => ({ ...prev, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <p className="mt-1.5 text-xs text-text-muted">{hint}</p>
            </div>
          ))}

          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full sm:w-auto px-8 py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {submitting ? 'Gönderiliyor...' : submission ? 'Yeniden Teslim Et' : 'Projeyi Teslim Et'}
          </button>
        </form>
      ) : (
        <div className="space-y-3">
          {LINK_FIELDS.map(({ key, dbKey, label, icon: Icon }) => {
            const url = submission?.[dbKey];
            if (!url) return null;
            return (
              <div
                key={key}
                className="flex items-start gap-3 p-4 rounded-xl border border-border bg-surface-cream"
              >
                <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-body">{label}</p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline break-all"
                  >
                    {url}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
