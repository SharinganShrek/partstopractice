'use client';

import type { Question } from '@/lib/tests';
import TestQuestionCard from './TestQuestionCard';
import TurkishContentBadge from './TurkishContentBadge';

interface CourseTestProps {
  questions: Question[];
  courseTitle: string;
}

export default function CourseTest({ questions, courseTitle }: CourseTestProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-[#e9ecef] p-6">
      <div className="flex flex-wrap items-center gap-3 mb-2 border-b border-[#e9ecef] pb-4">
        <h3 className="text-xl font-bold text-[#212529]">Practice quiz</h3>
        <TurkishContentBadge variant="onLight" />
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
