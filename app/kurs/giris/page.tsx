'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function KursLoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const response = await fetch('/api/kurs/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? 'Giriş başarısız');
    } else {
      setMessage(data.message ?? 'E-postanızı kontrol edin.');
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-bold text-text-body mb-2">
            Yaz Kursu Girişi
          </h1>
          <p className="text-text-muted text-sm">
            Khan Academy × FIRST Yaz Kursu: kayıtlı e-posta adresinizle giriş yapın.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-body mb-1.5">
              E-posta Adresi
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@okul.edu.tr"
              className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? 'Gönderiliyor...' : 'Giriş Bağlantısı Gönder'}
          </button>
        </form>

        <div className="mt-6 space-y-2 text-xs text-text-muted">
          <p>
            <strong>Her seferinde e-posta gerekmez.</strong> İlk girişten sonra aynı tarayıcıda
            oturumunuz açık kalır. Yeni cihaz, farklı tarayıcı veya çıkış yaptıysanız tekrar
            bağlantı isteyin.
          </p>
          <p>Giriş bağlantısı e-postanıza gelir. Spam klasörünü de kontrol edin.</p>
        </div>
      </div>
    </div>
  );
}
