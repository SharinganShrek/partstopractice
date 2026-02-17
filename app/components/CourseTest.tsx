'use client';

import type { Question } from '@/lib/tests';
import TestQuestionCard from './TestQuestionCard';

interface CourseTestProps {
  questions: Question[];
  courseTitle: string;
}

export default function CourseTest({ questions, courseTitle }: CourseTestProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-[#e9ecef] p-6">
      <h3 className="text-xl font-bold mb-6 text-[#212529] border-b border-[#e9ecef] pb-4">
        {courseTitle} - Test
      </h3>
      <div className="space-y-4">
        {questions.map((q, index) => (
          <TestQuestionCard key={index} question={q} index={index} />
        ))}
      </div>
    </div>
  );
}
