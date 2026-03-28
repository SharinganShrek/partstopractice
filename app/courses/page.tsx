'use client';

import Link from 'next/link';
import { courses } from '@/lib/courses';
import TurkishContentBadge from '../components/TurkishContentBadge';

export default function CoursesPage() {
  return (
    <div className="bg-[#fafaf5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold text-[#212529]">Courses</h1>
          <TurkishContentBadge variant="onLight" />
        </div>
        <p className="text-[#495057] mb-8 max-w-2xl">
          Course names and videos are in Turkish. Use <strong>Practice quiz</strong> for the
          multiple-choice review for each lesson.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-[#e9ecef] overflow-hidden group"
            >
              <Link href={`/courses/${course.id}`} className="block">
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
                </div>
              </Link>
              <div className="px-6 pb-6 flex justify-between items-center text-sm gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#f5f5dc] text-[#800020] px-3 py-1 rounded-full font-medium">
                    {course.level}
                  </span>
                  <Link
                    href={`/tests/${course.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#800020] hover:text-[#a01e2b] font-medium hover:underline"
                  >
                    Practice quiz
                  </Link>
                </div>
                {course.duration && (
                  <span className="text-[#495057]">⏱️ {course.duration}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
