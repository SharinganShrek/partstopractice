'use client';

import { useState, useRef, useEffect } from 'react';
import { LANGUAGES } from '@/lib/i18n/config';
import { useLanguage } from './LanguageContext';

interface LanguageSelectorProps {
  compact?: boolean;
}

export default function LanguageSelector({ compact = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[1];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-full border border-border bg-surface-cream p-1 text-sm font-medium transition-colors hover:border-primary/30"
        aria-label="Select language"
        aria-expanded={open}
        id="language-selector-btn"
      >
        <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold uppercase text-white flex items-center gap-1">
          <span>{current.flag}</span>
          {!compact && <span>{current.code}</span>}
        </span>
        <svg
          className={`w-3.5 h-3.5 mx-1 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-52 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-white shadow-xl z-50 py-1 max-h-80 overflow-y-auto"
          role="listbox"
          aria-labelledby="language-selector-btn"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={lang.code === language}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 flex items-center gap-2.5 text-sm transition-colors ${
                lang.code === language
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-text-body hover:bg-surface-cream'
              }`}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <span>{lang.name}</span>
              {lang.code === language && (
                <svg className="w-4 h-4 ml-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
