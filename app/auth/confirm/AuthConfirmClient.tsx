'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { normalizeEmailOtpType } from '@/lib/lms/magic-link';

export default function AuthConfirmClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function confirmLogin() {
      const supabase = createClient();
      const next = searchParams.get('next') ?? '/kurs';
      const safeNext = next.startsWith('/') ? next : '/kurs';
      const code = searchParams.get('code');
      const token_hash = searchParams.get('token_hash');
      const otpType = normalizeEmailOtpType(searchParams.get('type'));

      try {
        const {
          data: { session: existingSession },
        } = await supabase.auth.getSession();
        if (existingSession) {
          await fetch('/api/kurs/auth/link-enrollment', { method: 'POST' });
          router.replace(safeNext);
          return;
        }

        if (code) {
          const { error: codeError } = await supabase.auth.exchangeCodeForSession(code);
          if (codeError) throw codeError;
        } else if (token_hash && otpType) {
          const { error: otpError } = await supabase.auth.verifyOtp({
            type: otpType,
            token_hash,
          });
          if (otpError) throw otpError;
        } else if (window.location.hash) {
          const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');
          if (access_token && refresh_token) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });
            if (sessionError) throw sessionError;
          } else {
            throw new Error('Geçersiz giriş bağlantısı.');
          }
        } else {
          throw new Error('Geçersiz giriş bağlantısı.');
        }

        await fetch('/api/kurs/auth/link-enrollment', { method: 'POST' });
        router.replace(safeNext);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Giriş başarısız';
        setError(message);
      }
    }

    confirmLogin();
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md w-full p-8 text-center">
          <h1 className="font-display text-xl font-bold text-text-body mb-3">Giriş Başarısız</h1>
          <p className="text-sm text-red-600 mb-6">{error}</p>
          <a href="/kurs/giris" className="btn-primary inline-block px-6 py-2 rounded-lg">
            Tekrar Dene
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <p className="text-text-muted text-sm">Giriş yapılıyor...</p>
    </div>
  );
}
