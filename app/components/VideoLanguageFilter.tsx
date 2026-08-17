'use client';

import { LANGUAGES } from '@/lib/i18n/config';
import type { VideoContentFilter } from '@/lib/courses';
import { useLanguage } from './LanguageContext';

interface VideoLanguageFilterProps {
  value: VideoContentFilter;
  onChange: (value: VideoContentFilter) => void;
  className?: string;
}

export default function VideoLanguageFilter({
  value,
  onChange,
  className = '',
}: VideoLanguageFilterProps) {
  const { t } = useLanguage();

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <label htmlFor="video-lang-filter" className="text-sm font-medium text-text-muted shrink-0">
        {t('videos.filterLabel')}
      </label>
      <select
        id="video-lang-filter"
        value={value}
        onChange={(e) => onChange(e.target.value as VideoContentFilter)}
        className="min-w-0 flex-1 sm:flex-none rounded-full border border-border bg-white pl-3 pr-8 py-1.5 text-sm font-medium text-text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer appearance-none bg-[length:12px] bg-[right_10px_center] bg-no-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B6464'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
        }}
      >
        <option value="all">{t('videos.filterAll')}</option>
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
