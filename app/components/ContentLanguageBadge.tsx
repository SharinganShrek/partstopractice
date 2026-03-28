'use client';

import { useLanguage } from './LanguageContext';
import { getLanguageInfo } from '@/lib/i18n/config';

/** Dynamic badge that shows which language content is in. Replaces TurkishContentBadge. */
export default function ContentLanguageBadge({
  variant = 'onDark',
  className = '',
}: {
  variant?: 'onDark' | 'onLight';
  className?: string;
}) {
  const { language, t } = useLanguage();
  const info = getLanguageInfo(language);

  const base =
    variant === 'onDark'
      ? 'border-white/35 bg-white/12 text-[#f5f5dc]'
      : 'border-[#800020]/25 bg-[#f5f5dc] text-[#800020]';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm ${base} ${className}`}
      title={t('badge.contentIn')}
    >
      <span className="text-sm leading-none" aria-hidden>
        {info.flag}
      </span>
      <span className="normal-case font-medium tracking-normal">
        {t('badge.contentIn')}
      </span>
    </span>
  );
}
