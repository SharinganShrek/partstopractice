'use client';

import { useEffect, useState } from 'react';
import type { CourseFeedbackSubmission } from '@/lib/lms/types';
import { Badge } from '@/components/ui/badge';

const MAX_LENGTH = 500;

interface FinalFeedbackFormProps {
  contentItemId: string;
  onSubmitted?: () => void;
}

export default function FinalFeedbackForm({
  contentItemId,
  onSubmitted,
}: FinalFeedbackFormProps) {
  const [form, setForm] = useState({
    fullName: '',
    teamMessage: '',
    improvementFeedback: '',
  });
  const [submission, setSubmission] = useState<CourseFeedbackSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/kurs/feedback?contentItemId=${contentItemId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.submission) {
          setSubmission(data.submission);
          setForm({
            fullName: data.submission.full_name,
            teamMessage: data.submission.team_message,
            improvementFeedback: data.submission.improvement_feedback,
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

    const response = await fetch('/api/kurs/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentItemId, ...form }),
    });

    const data = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setError(data.error ?? 'Gönderim başarısız');
      return;
    }

    setSubmission(data.submission);
    onSubmitted?.();
  }

  if (loading) return <p className="text-text-muted text-sm">Yükleniyor...</p>;

  return (
    <div className="card p-6 md:p-8 shadow-md">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-text-body mb-2">Son bir görev</h2>
        <p className="text-text-muted text-sm leading-relaxed">
          Sertifikanızı alabilmek için aşağıdaki kısa geri bildirim formunu doldurun.
        </p>
      </div>

      {submission ? (
        <div className="space-y-4">
          <Badge variant="success">Gönderildi</Badge>
          <div className="space-y-3 p-4 rounded-xl border border-border bg-surface-cream">
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">İsim Soyisim</p>
              <p className="text-sm text-text-body mt-1">{submission.full_name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                IMC ekibine mesaj
              </p>
              <p className="text-sm text-text-body mt-1 whitespace-pre-wrap">{submission.team_message}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                İyileştirme önerisi
              </p>
              <p className="text-sm text-text-body mt-1 whitespace-pre-wrap">
                {submission.improvement_feedback}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text-body mb-2">İsim Soyisim</label>
            <input
              type="text"
              required
              maxLength={120}
              value={form.fullName}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              placeholder="Adınız ve soyadınız"
              className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-body mb-2">
              Bu eğitimleri hazırlayan IMC ekibine bir mesaj bırak:
            </label>
            <textarea
              required
              rows={3}
              maxLength={MAX_LENGTH}
              value={form.teamMessage}
              onChange={(e) => setForm((prev) => ({ ...prev, teamMessage: e.target.value }))}
              placeholder="Kısa bir teşekkür veya mesajınız..."
              className="w-full px-4 py-3 rounded-xl border border-border text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <p className="mt-1 text-xs text-text-muted">{form.teamMessage.length}/{MAX_LENGTH}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-body mb-2">
              Sence neyi daha iyi yapabilirdik?
            </label>
            <textarea
              required
              rows={3}
              maxLength={MAX_LENGTH}
              value={form.improvementFeedback}
              onChange={(e) => setForm((prev) => ({ ...prev, improvementFeedback: e.target.value }))}
              placeholder="Kısa bir öneriniz..."
              className="w-full px-4 py-3 rounded-xl border border-border text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <p className="mt-1 text-xs text-text-muted">
              {form.improvementFeedback.length}/{MAX_LENGTH}
            </p>
          </div>

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
            {submitting ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </form>
      )}
    </div>
  );
}
