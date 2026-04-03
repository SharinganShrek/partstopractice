export type SupportedLanguage =
  | 'tr'
  | 'en'
  | 'zh'
  | 'he'
  | 'de'
  | 'pl'
  | 'ar'
  | 'hi'
  | 'es'
  | 'it'
  | 'sw'
  | 'ru'
  | 'fr';

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;       // native name
  englishName: string; // name in English (for fallback)
  flag: string;        // emoji flag
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageInfo[] = [
  { code: 'tr', name: 'Türkçe',    englishName: 'Turkish',    flag: '🇹🇷', dir: 'ltr' },
  { code: 'en', name: 'English',    englishName: 'English',    flag: '🇬🇧', dir: 'ltr' },
  { code: 'zh', name: '中文',       englishName: 'Chinese',    flag: '🇨🇳', dir: 'ltr' },
  { code: 'he', name: 'עברית',      englishName: 'Hebrew',     flag: '🇮🇱', dir: 'rtl' },
  { code: 'de', name: 'Deutsch',    englishName: 'German',     flag: '🇩🇪', dir: 'ltr' },
  { code: 'pl', name: 'Polski',     englishName: 'Polish',     flag: '🇵🇱', dir: 'ltr' },
  { code: 'ar', name: 'العربية',    englishName: 'Arabic',     flag: '🇸🇦', dir: 'rtl' },
  { code: 'hi', name: 'हिन्दी',      englishName: 'Hindi',      flag: '🇮🇳', dir: 'ltr' },
  { code: 'es', name: 'Español',    englishName: 'Spanish',    flag: '🇪🇸', dir: 'ltr' },
  { code: 'it', name: 'Italiano',   englishName: 'Italian',    flag: '🇮🇹', dir: 'ltr' },
  { code: 'sw', name: 'Kiswahili',  englishName: 'Swahili',    flag: '🇹🇿', dir: 'ltr' },
  { code: 'ru', name: 'Русский',    englishName: 'Russian',    flag: '🇷🇺', dir: 'ltr' },
  { code: 'fr', name: 'Français',   englishName: 'French',     flag: '🇫🇷', dir: 'ltr' },
];

/** Maps ISO 3166-1 alpha-2 country codes to a supported language. */
const COUNTRY_TO_LANGUAGE: Record<string, SupportedLanguage> = {
  // Turkish
  TR: 'tr', CY: 'tr',
  // English
  US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en',
  // Chinese
  CN: 'zh', TW: 'zh', HK: 'zh', MO: 'zh', SG: 'zh',
  // Hebrew
  IL: 'he',
  // German
  DE: 'de', AT: 'de', CH: 'de', LI: 'de', LU: 'de',
  // Polish
  PL: 'pl',
  // Arabic
  SA: 'ar', AE: 'ar', EG: 'ar', IQ: 'ar', JO: 'ar', KW: 'ar', LB: 'ar',
  LY: 'ar', MA: 'ar', OM: 'ar', QA: 'ar', SY: 'ar', TN: 'ar', YE: 'ar',
  BH: 'ar', DZ: 'ar', SD: 'ar', PS: 'ar',
  // Hindi
  IN: 'hi',
  // Spanish
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', PE: 'es', VE: 'es', CL: 'es',
  EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es',
  SV: 'es', NI: 'es', CR: 'es', PA: 'es', UY: 'es', PR: 'es',
  // Italian
  IT: 'it', SM: 'it', VA: 'it',
  // Swahili
  TZ: 'sw', KE: 'sw', UG: 'sw', RW: 'sw', CD: 'sw',
  // Russian
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru',
  // French
  FR: 'fr', BE: 'fr', MC: 'fr', SN: 'fr', CI: 'fr', ML: 'fr',
  BF: 'fr', NE: 'fr', TD: 'fr', GN: 'fr', HT: 'fr', CM: 'fr',
};

export function countryToLanguage(countryCode: string): SupportedLanguage {
  return COUNTRY_TO_LANGUAGE[countryCode.toUpperCase()] ?? DEFAULT_LANGUAGE;
}

export function getLanguageInfo(code: SupportedLanguage): LanguageInfo {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[1]; // fallback to English
}
