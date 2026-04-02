'use client';

import { useEffect, useMemo } from 'react';
import { LANGUAGES, type SupportedLanguage } from '@/lib/i18n/config';
import translations from '@/lib/i18n/translations';

interface InitialLanguagePickerProps {
  onSelect: (code: SupportedLanguage) => void;
}

export default function InitialLanguagePicker({ onSelect }: InitialLanguagePickerProps) {
  const { title, hint } = useMemo(() => {
    const fallback = {
      title: translations.en['language.onboardingTitle'] ?? translations.en['language.select'],
      hint:
        translations.en['language.onboardingHint'] ??
        'You can change this anytime from the top bar.',
    };
    if (typeof window === 'undefined') return fallback;
    const nav = navigator.language?.toLowerCase().split(/[-_]/)[0] as SupportedLanguage;
    const pack = nav && translations[nav];
    if (pack?.['language.onboardingTitle']) {
      return {
        title: pack['language.onboardingTitle'],
        hint: pack['language.onboardingHint'] ?? fallback.hint,
      };
    }
    return fallback;
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#212529]/55 backdrop-blur-[6px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="initial-language-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 border border-[#e9ecef] max-h-[min(90vh,640px)] flex flex-col">
        <h2
          id="initial-language-title"
          className="text-xl md:text-2xl font-bold text-[#212529] mb-1 tracking-tight"
        >
          {title}
        </h2>
        <p className="text-sm text-[#495057] mb-5 md:mb-6">{hint}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto pr-1 -mr-1 min-h-0 flex-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelect(lang.code)}
              className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-xl border border-[#e9ecef] bg-white hover:border-[#800020]/45 hover:bg-[#f5f5dc]/40 transition-colors text-sm text-[#212529]"
            >
              <span className="text-lg leading-none shrink-0" aria-hidden>
                {lang.flag}
              </span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
