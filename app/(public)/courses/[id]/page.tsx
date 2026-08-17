'use client';

import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getCourseById } from '@/lib/courses';
import { getTestByCourseId } from '@/lib/tests';
import CourseTest from '../../../components/CourseTest';
import PageSection from '../../../components/PageSection';
import { useLanguage } from '../../../components/LanguageContext';
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
    <div className="bg-white min-h-screen">
      <PageSection variant="cream" animate={false}>
        <Link
          href="/courses"
          className="text-primary hover:text-primary-dark font-semibold inline-flex items-center gap-2 mb-6 text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('courses.backToCourses')}
        </Link>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-text-body mb-8">
          {course.title}
        </h1>

        <div className="card overflow-hidden shadow-md mb-8">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-text-body">{t('course.video')}</h2>
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
                <div className="text-center px-4">
                  <p className="text-xl mb-2">{t('course.noVideo')}</p>
                  <p className="text-white/60">{t('course.noVideoSub')}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {questions && questions.length > 0 ? (
          <CourseTest questions={questions} courseTitle={course.title} />
        ) : (
          <div className="card p-8 text-center text-text-muted">{t('course.noQuiz')}</div>
        )}
      </PageSection>
    </div>
  );
}
