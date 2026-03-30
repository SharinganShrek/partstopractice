'use client';

import Link from 'next/link';
import type { Course } from '@/lib/courses';
import { getCoursesByAllLanguages } from '@/lib/courses';
import HomeHero from './components/HomeHero';
import StatsStrip from './components/StatsStrip';
import ContentLanguageBadge from './components/ContentLanguageBadge';
import { useLanguage } from './components/LanguageContext';
import { LANGUAGES, getLanguageInfo, type SupportedLanguage } from '@/lib/i18n/config';

type CourseWithContentLang = Course & { contentLang: SupportedLanguage };

export default function Home() {
  const { language, t } = useLanguage();
  const coursesByLang = getCoursesByAllLanguages();

  const selectedCourses: CourseWithContentLang[] = (coursesByLang[language] ?? []).map(
    (course) => ({ ...course, contentLang: language })
  );

  const otherCourses: CourseWithContentLang[] = LANGUAGES.filter((l) => l.code !== language).flatMap(
    (langInfo) =>
      (coursesByLang[langInfo.code] ?? []).map((course) => ({
        ...course,
        contentLang: langInfo.code,
      }))
  );

  return (
    <div className="bg-[#fafaf5] min-h-screen">
      <HomeHero />
      <StatsStrip />

      <div className="max-w-7xl mx-auto px-4 py-14 md:py-16">
        <div className="max-w-3xl mb-10 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212529] tracking-tight">
              {t('courses.title')}
            </h2>
            <ContentLanguageBadge variant="onLight" />
          </div>
          <p className="text-[#495057] text-lg leading-relaxed">
            {t('courses.description')}
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          <section>
            <h3 className="text-2xl font-bold text-[#212529] mb-6">
              {getLanguageInfo(language).name} {t('videos.videosLabel')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCourses.map((course) => (
                <div
                  key={`${course.contentLang}-${course.id}`}
                  className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-[#e9ecef] overflow-hidden group ${
                    !course.youtubeId ? 'opacity-60' : ''
                  }`}
                >
                  <Link
                    href={`/courses/${course.id}?contentLang=${course.contentLang}`}
                    className="block"
                  >
                    <div className="h-48 relative bg-gray-100">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-[#212529] group-hover:text-[#800020] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-[#495057] mb-4 text-sm">
                        {course.description}
                      </p>
                    </div>
                  </Link>
                  <div className="px-6 pb-6 flex justify-between items-center text-sm gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#f5f5dc] text-[#800020] px-3 py-1 rounded-full font-medium">
                        {course.level}
                      </span>
                      <Link
                        href={`/tests/${course.id}?contentLang=${course.contentLang}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#800020] hover:text-[#a01e2b] font-medium hover:underline"
                      >
                        {t('courses.practiceQuiz')}
                      </Link>
                    </div>
                    {course.duration && (
                      <span className="text-[#495057]">⏱️ {course.duration}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-[#212529] mb-6">{t('videos.otherVideosLabel')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCourses.map((course) => (
                <div
                  key={`${course.contentLang}-${course.id}`}
                  className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-[#e9ecef] overflow-hidden group ${
                    !course.youtubeId ? 'opacity-60' : ''
                  }`}
                >
                  <Link
                    href={`/courses/${course.id}?contentLang=${course.contentLang}`}
                    className="block"
                  >
                    <div className="h-48 relative bg-gray-100">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-[#212529] group-hover:text-[#800020] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-[#495057] mb-4 text-sm">
                        {course.description}
                      </p>
                    </div>
                  </Link>
                  <div className="px-6 pb-6 flex justify-between items-center text-sm gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#f5f5dc] text-[#800020] px-3 py-1 rounded-full font-medium">
                        {course.level}
                      </span>
                      <Link
                        href={`/tests/${course.id}?contentLang=${course.contentLang}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#800020] hover:text-[#a01e2b] font-medium hover:underline"
                      >
                        {t('courses.practiceQuiz')}
                      </Link>
                    </div>
                    {course.duration && (
                      <span className="text-[#495057]">⏱️ {course.duration}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
