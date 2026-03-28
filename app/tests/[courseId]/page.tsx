'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCourseById } from '@/lib/courses';
import { getTestByCourseId } from '@/lib/tests';
import TestQuestionCard from '../../components/TestQuestionCard';
import ContentLanguageBadge from '../../components/ContentLanguageBadge';
import { useLanguage } from '../../components/LanguageContext';

export default function CourseTestPage() {
  const params = useParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const courseId = params.courseId as string;
  const course = getCourseById(courseId, language);
  const questions = course ? getTestByCourseId(course.id, language) : undefined;

  useEffect(() => {
    if (!course || !questions?.length) {
      router.push('/tests');
    }
  }, [course, questions, router]);

  if (!course || !questions?.length) {
    return null;
  }

  return (
    <div className="bg-[#fafaf5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 text-[#800020] hover:text-[#a01e2b] font-medium mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('quizzes.backToQuizzes')}
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-[#212529]">{course.title}</h1>
            <ContentLanguageBadge variant="onLight" />
          </div>
          <p className="text-sm text-[#495057] mt-1">{t('quizzes.practiceQuiz')}</p>
        </div>

        <p className="text-[#495057] mb-8">
          {t('quizzes.instruction')}
        </p>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <TestQuestionCard key={index} question={q} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
