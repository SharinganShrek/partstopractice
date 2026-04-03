'use client';

import { useEffect, useMemo, useState } from 'react';
import { getTotalVideoCountAcrossLanguages } from '@/lib/courses';
import { intlLocaleForLanguage, type SupportedLanguage } from '@/lib/i18n/config';
import { useLanguage } from './LanguageContext';

function formatAggregatedViews(views: number, lang: SupportedLanguage): string {
  const formatted = new Intl.NumberFormat(intlLocaleForLanguage(lang), {
    maximumFractionDigits: 0,
  }).format(views);
  return `${formatted}+`;
}

export default function StatsStrip() {
  const { t, language } = useLanguage();
  const totalVideos = getTotalVideoCountAcrossLanguages();

  const [viewsTotal, setViewsTotal] = useState<number | null>(null);
  const [fromYoutube, setFromYoutube] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/youtube-views');
        const data = (await res.json()) as { ok?: boolean; total?: number | null };
        if (cancelled) return;
        if (data.ok && typeof data.total === 'number') {
          setViewsTotal(data.total);
          setFromYoutube(true);
        } else {
          setViewsTotal(null);
          setFromYoutube(false);
        }
      } catch {
        if (!cancelled) {
          setViewsTotal(null);
          setFromYoutube(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const reachedDisplay =
    fromYoutube && viewsTotal != null
      ? formatAggregatedViews(viewsTotal, language)
      : t('stats.reached.value');

  const stats = useMemo(
    () => [
      {
        value: t('stats.languages.value'),
        label: t('stats.languages.label'),
        sub: t('stats.languages.sub'),
      },
      {
        value: reachedDisplay,
        label: t('stats.reached.label'),
        sub: t('stats.reached.sub'),
      },
      {
        value: String(totalVideos),
        label: t('stats.lessons.label'),
        sub: t('stats.lessons.sub'),
      },
    ],
    [reachedDisplay, t, totalVideos]
  );

  return (
    <section
      className="bg-[#fafaf5] border-b border-[#e9ecef] py-12 md:py-14"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="sr-only">
        {t('stats.languages.label')}
      </h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((item) => (
            <div
              key={item.label}
              className="relative bg-white rounded-xl border border-[#e9ecef] shadow-sm px-6 py-8 text-center overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-[#800020]"
                aria-hidden
              />
              <p className="text-4xl md:text-5xl font-bold text-[#212529] tabular-nums tracking-tight mb-2">
                {item.value}
              </p>
              <p className="text-sm font-semibold text-[#800020] uppercase tracking-wide mb-2">
                {item.label}
              </p>
              <p className="text-sm text-[#495057] leading-relaxed max-w-xs mx-auto">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
