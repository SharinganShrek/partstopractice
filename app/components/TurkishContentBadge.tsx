/** Site UI is in English; lessons and quizzes remain in Turkish. */
export default function TurkishContentBadge({
  variant = 'onDark',
  className = '',
}: {
  variant?: 'onDark' | 'onLight';
  className?: string;
}) {
  const base =
    variant === 'onDark'
      ? 'border-white/35 bg-white/12 text-[#f5f5dc]'
      : 'border-[#800020]/25 bg-[#f5f5dc] text-[#800020]';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm ${base} ${className}`}
      title="All course videos and quiz questions are in Turkish."
    >
      <span className="tabular-nums font-bold" aria-hidden>
        TR
      </span>
      <span className="normal-case font-medium tracking-normal">
        Lessons & quizzes in Turkish
      </span>
    </span>
  );
}
