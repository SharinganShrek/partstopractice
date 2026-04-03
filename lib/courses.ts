import { LANGUAGES, type SupportedLanguage } from './i18n/config';

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

export type CourseWithContentLang = Course & { contentLang: SupportedLanguage };

export type VideoContentFilter = SupportedLanguage | 'all';

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

/** Flat list of courses for the video grid, optionally tagged with content language. */
export function getCoursesForVideoFilter(
  filter: VideoContentFilter,
  byLang: Record<SupportedLanguage, Course[]> = coursesByLang
): CourseWithContentLang[] {
  if (filter === 'all') {
    return LANGUAGES.flatMap((l) =>
      (byLang[l.code] ?? []).map((course) => ({
        ...course,
        contentLang: l.code,
      }))
    );
  }
  return (byLang[filter] ?? []).map((course) => ({
    ...course,
    contentLang: filter,
  }));
}

/** Count of video rows across all content languages (matches “all languages” grid); excludes missing YouTube IDs. */
export function getTotalVideoCountAcrossLanguages(
  byLang: Record<SupportedLanguage, Course[]> = coursesByLang
): number {
  return getCoursesForVideoFilter('all', byLang).filter(
    (c) => c.youtubeId != null && c.youtubeId !== ''
  ).length;
}

/** Unique YouTube video IDs across all localized course lists (deduped; skips null/empty). */
export function getAllUniqueYoutubeVideoIds(
  byLang: Record<SupportedLanguage, Course[]> = coursesByLang
): string[] {
  const ids = new Set<string>();
  for (const c of getCoursesForVideoFilter('all', byLang)) {
    const id = c.youtubeId?.trim();
    if (id) ids.add(id);
  }
  return [...ids];
}

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
