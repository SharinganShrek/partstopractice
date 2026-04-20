'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { CourseWithContentLang } from '@/lib/courses';
import { getCoursesByAllLanguages, getCoursesForVideoFilter } from '@/lib/courses';
import VideoTagFilter, { type VideoTag } from '../components/VideoTagFilter';
import { useLanguage } from '../components/LanguageContext';
import { getLanguageInfo } from '@/lib/i18n/config';

export default function CoursesPage() {
  const { language, t } = useLanguage();
  const coursesByLang = getCoursesByAllLanguages();
  const [tagFilter, setTagFilter] = useState<VideoTag>('all');

  const langCourses: CourseWithContentLang[] = getCoursesForVideoFilter(
    language,
    coursesByLang
  );

  const filteredCourses = langCourses.filter((course) => {
    if (tagFilter === 'all') return true;
    return course.tags?.includes(tagFilter);
  });

  const listHeading = `${getLanguageInfo(language).name} — ${t('videos.videosLabel')}`;

  return (
    <div className="bg-[#fafaf5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#212529] mb-4">{t('courses.title')}</h1>
        <p className="text-[#495057] mb-6 max-w-2xl">{t('courses.description')}</p>
        <VideoTagFilter value={tagFilter} onChange={setTagFilter} className="mb-8" />

        <section>
          <h3 className="text-2xl font-bold text-[#212529] mb-6">{listHeading}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={`${course.contentLang}-${course.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-[#e9ecef] overflow-hidden group"
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
                    {course.tags && course.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {course.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#e9ecef] text-[#495057] px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2 text-[#212529] group-hover:text-[#800020] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-[#495057] mb-4 text-sm">{course.description}</p>
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
  );
}
