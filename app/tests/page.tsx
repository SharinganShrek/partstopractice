'use client';

import Link from 'next/link';
import { courses } from '@/lib/courses';
import { getTestByCourseId } from '@/lib/tests';
import TurkishContentBadge from '../components/TurkishContentBadge';

export default function TestsPage() {
  const coursesWithTests = courses.filter((course) => {
    const questions = getTestByCourseId(course.id);
    return questions && questions.length > 0;
  });

  return (
    <div className="bg-[#fafaf5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-[#212529]">Quizzes</h1>
          <TurkishContentBadge variant="onLight" />
        </div>
        <p className="text-[#495057] mb-8 max-w-2xl">
          Select a course to start its practice quiz. All questions and answers are in{' '}
          <strong>Turkish</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesWithTests.map((course) => (
            <Link
              key={course.id}
              href={`/tests/${course.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-[#e9ecef] overflow-hidden group cursor-pointer block"
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
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-[#f5f5dc] text-[#800020] px-3 py-1 rounded-full font-medium">
                    {course.level}
                  </span>
                  <span className="text-[#495057]">10 questions</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
