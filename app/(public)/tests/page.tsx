'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { getCourses } from '@/lib/courses';
import { getTestByCourseId } from '@/lib/tests';
import PageSection from '../../components/PageSection';
import SectionHeading from '../../components/SectionHeading';
import { useLanguage } from '../../components/LanguageContext';

export default function TestsPage() {
  const { language, t } = useLanguage();
  const courses = getCourses(language);
  const reduceMotion = useReducedMotion();

  const coursesWithTests = courses.filter((course) => {
    const questions = getTestByCourseId(course.id, language);
    return questions && questions.length > 0;
  });

  return (
    <div className="bg-white min-h-screen">
      <PageSection variant="white" animate={false}>
        <SectionHeading title={t('quizzes.title')} subtitle={t('quizzes.description')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesWithTests.map((course) => {
            const CardWrapper = reduceMotion ? 'div' : motion.div;
            const motionProps = reduceMotion
              ? {}
              : { whileHover: { y: -4 }, transition: { duration: 0.25 } };

            return (
              <CardWrapper key={course.id} {...motionProps}>
                <Link
                  href={`/tests/${course.id}`}
                  className="card card-hover overflow-hidden group block h-full"
                >
                  <div className="aspect-[4/3] bg-surface-cream overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="font-bold text-base md:text-lg mb-2 text-text-body group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    {course.description && (
                      <p className="text-text-muted text-sm line-clamp-2 mb-4">{course.description}</p>
                    )}
                    <div className="flex justify-between items-center text-sm">
                      <span className="rounded-full bg-surface-cream text-primary px-3 py-1 text-xs font-semibold">
                        {course.level}
                      </span>
                      <span className="text-text-muted text-xs">{t('quizzes.questions')}</span>
                    </div>
                  </div>
                </Link>
              </CardWrapper>
            );
          })}
        </div>
      </PageSection>
    </div>
  );
}
