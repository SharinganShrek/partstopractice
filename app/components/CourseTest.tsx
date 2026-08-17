'use client';

import type { Question } from '@/lib/tests';
import TestQuestionCard from './TestQuestionCard';
import { useLanguage } from './LanguageContext';

interface CourseTestProps {
  questions: Question[];
  courseTitle: string;
}

export default function CourseTest({ questions, courseTitle }: CourseTestProps) {
  const { t } = useLanguage();

  return (
    <div className="card p-6 shadow-md">
      <div className="flex flex-wrap items-center gap-3 mb-2 border-b border-border pb-4">
        <h3 className="font-display text-xl font-bold text-text-body">{t('quizzes.practiceQuiz')}</h3>
      </div>
      <p className="text-text-muted text-sm mb-6">{courseTitle}</p>
      <div className="space-y-4">
        {questions.map((q, index) => (
          <TestQuestionCard key={index} question={q} index={index} />
        ))}
      </div>
    </div>
  );
}
