'use client';

import { getTotalVideoCountAcrossLanguages } from '@/lib/courses';
import { useLanguage } from './LanguageContext';

export default function StatsStrip() {
  const { t } = useLanguage();
  const totalVideos = getTotalVideoCountAcrossLanguages();

  const primaryStats = [
    {
      value: t('stats.languages.value'),
      label: t('stats.languages.label'),
      sub: t('stats.languages.sub'),
    },
    {
      value: t('stats.reached.value'),
      label: t('stats.reached.label'),
      sub: t('stats.reached.sub'),
    },
  ];

  return (
    <section className="bg-surface-cream border-y border-border py-16 md:py-24" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        {t('stats.languages.label')}
      </h2>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {primaryStats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-primary text-white p-6 md:p-8 lg:p-10 shadow-md"
            >
              <p className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tabular-nums tracking-tight mb-2">
                {item.value}
              </p>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-2">
                {item.label}
              </p>
              <p className="text-sm text-white/75 leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
        <div className="card shadow-md p-5 md:p-6">
          <p className="font-display font-extrabold text-2xl md:text-3xl text-accent-blue tabular-nums mb-1">
            {totalVideos}
          </p>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            {t('stats.lessons.label')}
          </p>
          <p className="text-sm text-text-muted leading-relaxed">{t('stats.lessons.sub')}</p>
        </div>
      </div>
    </section>
  );
}
