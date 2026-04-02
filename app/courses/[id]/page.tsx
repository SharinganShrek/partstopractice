'use client';

import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getCourseById } from '@/lib/courses';
import { getTestByCourseId } from '@/lib/tests';
import CourseTest from '../../components/CourseTest';
import { useLanguage } from '../../components/LanguageContext';
import type { SupportedLanguage } from '@/lib/i18n/config';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();
  const courseId = params.id as string;
  const contentLangParam = searchParams.get('contentLang');
  const contentLanguage = (contentLangParam as SupportedLanguage | null) ?? language;

  const course = getCourseById(courseId, contentLanguage);
  const questions = course ? getTestByCourseId(course.id, contentLanguage) : undefined;

  useEffect(() => {
    if (!course) {
      router.push('/courses');
    }
  }, [course, router]);

  if (!course) {
    return null;
  }

  return (
    <div className="bg-[#fafaf5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/courses"
            className="text-[#800020] hover:text-[#a01e2b] font-medium inline-flex items-center gap-2 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('courses.backToCourses')}
          </Link>
          <h1 className="text-2xl font-bold text-[#212529]">{course.title}</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-[#e9ecef] overflow-hidden mb-8">
          <div className="p-4 border-b border-[#e9ecef]">
            <h2 className="text-lg font-semibold text-[#212529]">{t('course.video')}</h2>
          </div>
          <div className="aspect-video bg-black">
            {course.youtubeId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${course.youtubeId}?rel=0`}
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xl mb-2">{t('course.noVideo')}</p>
                  <p className="text-gray-400">{t('course.noVideoSub')}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {questions && questions.length > 0 ? (
          <CourseTest questions={questions} courseTitle={course.title} />
        ) : (
          <div className="bg-white rounded-lg shadow-md border border-[#e9ecef] p-8 text-center text-[#495057]">
            {t('course.noQuiz')}
          </div>
        )}
      </div>
    </div>
  );
}
