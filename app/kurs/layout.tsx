'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function KursLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/kurs/giris';
  const isVerifyPage = pathname.startsWith('/kurs/sertifika/dogrula');
  const hideNav = isLoginPage || isVerifyPage;

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/kurs/giris');
  }

  return (
    <div className="bg-surface-cream min-h-screen">
      {!hideNav && (
        <div className="bg-white border-b border-border sticky top-0 z-40 h-[var(--kurs-nav-height)]">
          <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
            <Link href="/kurs" className="font-display font-bold text-primary text-lg">
              Yaz Kursu LMS
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-xs text-text-muted hover:text-primary transition-colors">
                Ana Site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-text-muted hover:text-primary transition-colors"
              >
                Çıkış
              </button>
            </div>
          </div>
        </div>
      )}
      <main className={hideNav ? '' : 'max-w-6xl mx-auto px-4 py-6 md:py-8'}>{children}</main>
    </div>
  );
}
