'use client';

import { useState } from 'react';
import {
  getCoursesByAllLanguages,
  getCoursesForVideoFilter,
  type VideoContentFilter,
} from '@/lib/courses';
import { getLanguageInfo } from '@/lib/i18n/config';
import HomeHero from '../components/HomeHero';
import StatsStrip from '../components/StatsStrip';
import CourseCard from '../components/CourseCard';
import PageSection from '../components/PageSection';
import SectionHeading from '../components/SectionHeading';
import VideoTagFilter, { type VideoTag } from '../components/VideoTagFilter';
import VideoLanguageFilter from '../components/VideoLanguageFilter';
import { useLanguage } from '../components/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const coursesByLang = getCoursesByAllLanguages();
  const [tagFilter, setTagFilter] = useState<VideoTag>('all');
  const [langFilter, setLangFilter] = useState<VideoContentFilter>('all');

  const langCourses = getCoursesForVideoFilter(langFilter, coursesByLang);
  const filteredCourses = langCourses.filter((course) => {
    if (tagFilter === 'all') return true;
    return course.tags?.includes(tagFilter);
  });

  const listHeading =
    langFilter === 'all'
      ? t('videos.listHeadingAll')
      : `${getLanguageInfo(langFilter).name} :  ${t('videos.videosLabel')}`;

  return (
    <div className="bg-white min-h-screen -mt-[var(--nav-height)]">
      <HomeHero />
      <StatsStrip />

      <PageSection variant="white">
        <SectionHeading title={t('courses.title')} subtitle={t('courses.description')} />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
          <VideoLanguageFilter value={langFilter} onChange={setLangFilter} />
          <VideoTagFilter value={tagFilter} onChange={setTagFilter} />
        </div>
        <h3 className="font-display text-2xl font-bold text-text-body mb-6">{listHeading}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={`${course.contentLang}-${course.id}`}
              course={course}
              showLangFlag={langFilter === 'all'}
            />
          ))}
        </div>
      </PageSection>
    </div>
  );
}
