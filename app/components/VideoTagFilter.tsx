'use client';

import { useLanguage } from './LanguageContext';

export const AVAILABLE_TAGS = ['all', 'first', 'fll', 'ftc', 'frc'] as const;
export type VideoTag = typeof AVAILABLE_TAGS[number];

interface VideoTagFilterProps {
  value: VideoTag;
  onChange: (value: VideoTag) => void;
  className?: string;
}

export default function VideoTagFilter({ value, onChange, className = '' }: VideoTagFilterProps) {
  const { t } = useLanguage();
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <label htmlFor="video-tag-filter" className="text-sm font-medium text-[#495057]">
        {/* If there's a specific translation for tag filter, we would use it. We'll reuse filterLabel for now. */}
        {t('videos.filterLabel') || 'Filter:'}
      </label>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              value === tag
                ? 'bg-[#800020] text-white shadow'
                : 'bg-white text-[#495057] border border-[#e9ecef] hover:bg-[#f8f9fa]'
            }`}
          >
            {tag === 'all' ? (t('videos.filterAll') || 'All') : tag.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
