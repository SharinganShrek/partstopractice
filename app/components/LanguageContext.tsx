'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { SupportedLanguage } from '@/lib/i18n/config';
import { DEFAULT_LANGUAGE } from '@/lib/i18n/config';
import translations from '@/lib/i18n/translations';
import InitialLanguagePicker from './InitialLanguagePicker';

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  /** Translate a UI key. Returns the key itself if missing. */
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: (key) => key,
});

const STORAGE_KEY = 'ptp-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [ready, setReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    if (stored && translations[stored]) {
      setLanguageState(stored);
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
    setReady(true);
  }, []);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    setShowOnboarding(false);
  }, []);

  const completeOnboarding = useCallback((lang: SupportedLanguage) => {
    setLanguage(lang);
  }, [setLanguage]);

  const t = useCallback(
    (key: string): string => {
      return translations[language]?.[key] ?? translations.en[key] ?? key;
    },
    [language]
  );

  if (!ready) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {showOnboarding ? (
        <InitialLanguagePicker onSelect={completeOnboarding} />
      ) : (
        children
      )}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
