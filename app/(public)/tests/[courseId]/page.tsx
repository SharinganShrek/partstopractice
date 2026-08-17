'use client';

import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getCourseById } from '@/lib/courses';
import { getTestByCourseId } from '@/lib/tests';
import TestQuestionCard from '../../../components/TestQuestionCard';
import PageSection from '../../../components/PageSection';
import { useLanguage } from '../../../components/LanguageContext';
import type { SupportedLanguage } from '@/lib/i18n/config';

export default function CourseTestPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();
  const courseId = params.courseId as string;
  const contentLangParam = searchParams.get('contentLang');
  const contentLanguage = (contentLangParam as SupportedLanguage | null) ?? language;

  const course = getCourseById(courseId, contentLanguage);
  const questions = course ? getTestByCourseId(course.id, contentLanguage) : undefined;

  useEffect(() => {
    if (!course || !questions?.length) {
      router.push('/tests');
    }
  }, [course, questions, router]);

  if (!course || !questions?.length) {
    return null;
  }

  return (
    <div className="bg-white min-h-screen">
      <PageSection variant="cream" animate={false}>
        <Link
          href="/tests"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-6 text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('quizzes.backToQuizzes')}
        </Link>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-text-body">{course.title}</h1>
        <p className="text-sm text-text-muted mt-1 mb-8">{t('quizzes.practiceQuiz')}</p>
        <p className="text-text-muted mb-8">{t('quizzes.instruction')}</p>
        <div className="space-y-4">
          {questions.map((q, index) => (
            <TestQuestionCard key={index} question={q} index={index} />
          ))}
        </div>
      </PageSection>
    </div>
  );
}
