'use client';

import type { VideoContentFilter } from '@/lib/courses';
import { LANGUAGES } from '@/lib/i18n/config';
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
      <label htmlFor="video-lang-filter" className="text-sm font-medium text-[#495057]">
        {t('videos.filterLabel')}
      </label>
      <select
        id="video-lang-filter"
        value={value}
        onChange={(e) => onChange(e.target.value as VideoContentFilter)}
        className="rounded-lg border border-[#e9ecef] bg-white px-3 py-2 pr-8 text-sm font-medium text-[#212529] shadow-sm focus:border-[#800020] focus:outline-none focus:ring-2 focus:ring-[#800020]/20"
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
