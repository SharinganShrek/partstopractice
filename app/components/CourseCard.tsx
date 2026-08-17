'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { CourseWithContentLang } from '@/lib/courses';
import { getLanguageInfo } from '@/lib/i18n/config';
import { useLanguage } from './LanguageContext';

interface CourseCardProps {
  course: CourseWithContentLang;
  showLangFlag?: boolean;
}

export default function CourseCard({ course, showLangFlag = false }: CourseCardProps) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const CardWrapper = reduceMotion ? 'div' : motion.div;
  const motionProps = reduceMotion ? {} : { whileHover: { y: -4 }, transition: { duration: 0.25 } };

  return (
    <CardWrapper
      {...motionProps}
      className={`card card-hover overflow-hidden group flex flex-col ${
        !course.youtubeId ? 'opacity-60' : ''
      }`}
    >
      <Link href={`/courses/${course.id}?contentLang=${course.contentLang}`} className="block flex-1">
        <div className="aspect-[4/3] relative bg-surface-cream overflow-hidden">
          {showLangFlag && (
            <span
              className="absolute top-3 right-3 z-10 rounded-full bg-white/95 px-2.5 py-0.5 text-sm shadow border border-border"
              title={getLanguageInfo(course.contentLang).englishName}
            >
              {getLanguageInfo(course.contentLang).flag}
            </span>
          )}
          {course.tags && course.tags.length > 0 && (
            <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
              {course.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4 md:p-5">
          <h3 className="font-bold text-base md:text-lg mb-2 text-text-body group-hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>
          {course.description && (
            <p className="text-text-muted text-sm line-clamp-2 mb-3">{course.description}</p>
          )}
        </div>
      </Link>
      <div className="px-4 md:px-5 pb-4 md:pb-5 flex justify-between items-center text-sm gap-2 mt-auto">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="rounded-full bg-surface-cream text-primary px-3 py-1 text-xs font-semibold">
            {course.level}
          </span>
          <Link
            href={`/tests/${course.id}?contentLang=${course.contentLang}`}
            onClick={(e) => e.stopPropagation()}
            className="text-accent-blue hover:text-primary font-semibold text-xs"
          >
            {t('courses.practiceQuiz')} →
          </Link>
        </div>
        {course.duration && (
          <span className="text-text-muted text-xs tabular-nums">{course.duration}</span>
        )}
      </div>
    </CardWrapper>
  );
}
