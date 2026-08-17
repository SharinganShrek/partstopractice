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
      <label htmlFor="video-tag-filter" className="text-sm font-medium text-text-muted">
        {t('videos.tagFilterLabel')}
      </label>
      <div className="flex flex-wrap gap-2" id="video-tag-filter">
        {AVAILABLE_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onChange(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              value === tag
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-text-muted border border-border hover:text-primary hover:border-primary/30'
            }`}
          >
            {tag === 'all' ? t('videos.filterAll') : tag.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
