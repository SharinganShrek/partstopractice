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
    <div className="bg-white rounded-lg shadow-md border border-[#e9ecef] p-6">
      <div className="flex flex-wrap items-center gap-3 mb-2 border-b border-[#e9ecef] pb-4">
        <h3 className="text-xl font-bold text-[#212529]">{t('quizzes.practiceQuiz')}</h3>
      </div>
      <p className="text-[#495057] text-sm mb-6">{courseTitle}</p>
      <div className="space-y-4">
        {questions.map((q, index) => (
          <TestQuestionCard key={index} question={q} index={index} />
        ))}
      </div>
    </div>
  );
}
