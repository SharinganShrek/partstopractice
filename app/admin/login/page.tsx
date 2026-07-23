'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-[#e9ecef] bg-white text-[#212529] focus:outline-none focus:ring-2 focus:ring-[#800020]/30 focus:border-[#800020]';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !data.user) {
      setError('Giriş başarısız. E-posta veya şifre hatalı.');
      setLoading(false);
      return;
    }

    if (data.user.app_metadata?.role !== 'moderator') {
      await supabase.auth.signOut();
      setError('Bu hesabın moderatör yetkisi yok.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="bg-[#fafaf5] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#212529]">Moderatör Girişi</h1>
          <p className="text-[#495057] mt-2">Video taleplerini yönetmek için giriş yapın.</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md border border-[#e9ecef] p-6 space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#495057] mb-1.5">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#495057] mb-1.5">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#800020] text-white font-medium hover:bg-[#a01e2b] transition-colors disabled:opacity-60"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
