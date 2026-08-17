'use client';

import { useState } from 'react';
import { isValidDriveUrl } from '@/lib/lms/drive';
import type { ProjectSubmission } from '@/lib/lms/types';
import { Badge } from '@/components/ui/badge';

interface ProjectSubmissionFormProps {
  submission: ProjectSubmission | null;
  onSubmitted: () => void;
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Teslim Edildi',
  under_review: 'İnceleniyor',
  approved: 'Onaylandı',
  revision: 'Revizyon Gerekli',
};

const STATUS_VARIANTS: Record<string, 'default' | 'warning' | 'success' | 'destructive'> = {
  pending: 'default',
  under_review: 'warning',
  approved: 'success',
  revision: 'destructive',
};

export default function ProjectSubmissionForm({
  submission,
  onSubmitted,
}: ProjectSubmissionFormProps) {
  const [driveLink, setDriveLink] = useState(submission?.drive_link ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isValidDriveUrl(driveLink)) {
      setError('Geçerli bir Google Drive bağlantısı girin.');
      return;
    }

    setLoading(true);
    const response = await fetch('/api/kurs/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ driveLink }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? 'Teslim başarısız');
    } else {
      onSubmitted();
    }
  }

  return (
    <div className="card p-6 shadow-md">
      <h2 className="font-display text-xl font-bold text-text-body mb-2">Bitirme Projesi</h2>
      <p className="text-text-muted text-sm mb-6">
        Projenizi Google Drive&apos;a yükleyin ve paylaşım bağlantısını aşağıya yapıştırın.
      </p>

      {submission && (
        <div className="mb-6 p-4 rounded-lg bg-surface-cream border border-border space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Durum:</span>
            <Badge variant={STATUS_VARIANTS[submission.status] ?? 'muted'}>
              {STATUS_LABELS[submission.status] ?? submission.status}
            </Badge>
          </div>
          {submission.grade != null && (
            <p className="text-sm">
              <span className="font-medium">Not:</span> %{submission.grade}
            </p>
          )}
          {submission.feedback && (
            <p className="text-sm">
              <span className="font-medium">Geri bildirim:</span> {submission.feedback}
            </p>
          )}
          <p className="text-xs text-text-muted">
            Teslim: {new Date(submission.submitted_at).toLocaleString('tr-TR')}
          </p>
        </div>
      )}

      {(!submission || submission.status === 'revision') && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="driveLink" className="block text-sm font-medium mb-1.5">
              Google Drive Bağlantısı
            </label>
            <input
              id="driveLink"
              type="url"
              required
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-6 py-2.5 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? 'Gönderiliyor...' : submission ? 'Yeniden Teslim Et' : 'Projeyi Teslim Et'}
          </button>
        </form>
      )}
    </div>
  );
}
