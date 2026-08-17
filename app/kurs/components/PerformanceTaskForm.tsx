'use client';

import { useState } from 'react';

interface PerformanceTaskFormProps {
  contentItemId: string;
  title: string;
  onComplete: () => void;
  existingLink?: string | null;
}

export default function PerformanceTaskForm({
  contentItemId,
  title,
  onComplete,
  existingLink,
}: PerformanceTaskFormProps) {
  const [link, setLink] = useState(existingLink ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(!!existingLink);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const response = await fetch('/api/kurs/assignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentItemId, primaryLink: link }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? 'Gönderim başarısız');
      return;
    }

    setSubmitted(true);
    onComplete();
  }

  if (submitted) {
    return (
      <div className="space-y-3">
        <p className="text-sm font-medium text-text-body">{title}</p>
        <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
          Sanal uygulama ödevi teslim edildi.
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm hover:underline break-all"
        >
          {link}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-text-muted">
        Tinkercad simülasyon veya proje bağlantınızı yapıştırın. Gönderim otomatik olarak
        tamamlanmış sayılır.
      </p>
      <input
        type="url"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://www.tinkercad.com/..."
        className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60"
      >
        {loading ? 'Gönderiliyor...' : 'Ödevi Teslim Et'}
      </button>
    </form>
  );
}
