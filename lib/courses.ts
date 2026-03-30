import type { SupportedLanguage } from './i18n/config';

import coursesTr from './i18n/courses.tr';
import coursesEn from './i18n/courses.en';
import coursesZh from './i18n/courses.zh';
import coursesHe from './i18n/courses.he';
import coursesDe from './i18n/courses.de';
import coursesPl from './i18n/courses.pl';
import coursesAr from './i18n/courses.ar';
import coursesHi from './i18n/courses.hi';
import coursesEs from './i18n/courses.es';
import coursesIt from './i18n/courses.it';
import coursesSw from './i18n/courses.sw';
import coursesRu from './i18n/courses.ru';
import coursesFr from './i18n/courses.fr';

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  thumbnail: string;
  youtubeId: string | null;
}

const coursesByLang: Record<SupportedLanguage, Course[]> = {
  tr: coursesTr,
  en: coursesEn,
  zh: coursesZh,
  he: coursesHe,
  de: coursesDe,
  pl: coursesPl,
  ar: coursesAr,
  hi: coursesHi,
  es: coursesEs,
  it: coursesIt,
  sw: coursesSw,
  ru: coursesRu,
  fr: coursesFr,
};

/** Get all courses for a given language. Falls back to English. */
export function getCourses(lang: SupportedLanguage = 'en'): Course[] {
  return coursesByLang[lang] ?? coursesByLang.en;
}

/**
 * Get courses for all supported languages.
 * Useful for rendering "selected language first" + "other languages later".
 */
export function getCoursesByAllLanguages(): Record<SupportedLanguage, Course[]> {
  return coursesByLang;
}

/** Legacy default export kept for backward compatibility — returns Turkish. */
export const courses = coursesTr;

export function getCourseById(
  id: number | string,
  lang: SupportedLanguage = 'en'
): Course | undefined {
  const courseId = typeof id === 'string' ? parseInt(id, 10) : id;
  return getCourses(lang).find((c) => c.id === courseId);
}
