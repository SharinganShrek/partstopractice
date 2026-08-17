'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from './LanguageContext';

const NAV_LINKS = [
  { href: '/', key: 'nav.home' as const },
  { href: '/courses', key: 'nav.courses' as const },
  { href: '/tests', key: 'nav.quizzes' as const },
  { href: '/submit', key: 'nav.submit' as const },
  { href: '/kurs/giris', key: null, label: 'Yaz Kursu' },
];

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-[var(--nav-height)]">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Image
              src="/imc-4191-logo.png"
              alt="IMC 4191"
              width={44}
              height={44}
              className="h-11 w-11 rounded-md object-cover"
            />
            <div className="leading-none">
              <span className="font-display font-bold text-lg text-primary">#4191</span>
              <span className="hidden sm:block text-xs text-text-muted font-medium">
                Parts to Practice
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            <nav className="flex items-center gap-1">
              {NAV_LINKS.map(({ href, key, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'bg-primary text-white'
                      : 'text-text-muted hover:text-primary'
                  }`}
                >
                  {label ?? t(key!)}
                </Link>
              ))}
            </nav>
            <LanguageSelector />
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LanguageSelector compact />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-full p-2 text-text-muted hover:bg-surface-cream transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="fixed inset-x-0 top-[var(--nav-height)] z-50 bg-white border-t border-border lg:hidden shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between border-b border-border">
              <span className="text-sm font-semibold text-text-body">Menü</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-2 text-text-muted hover:bg-surface-cream transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ href, key, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'bg-primary text-white'
                      : 'text-text-muted hover:bg-surface-cream hover:text-primary'
                  }`}
                >
                  {label ?? t(key!)}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
