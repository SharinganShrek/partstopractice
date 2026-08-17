'use client';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  light = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-14 max-w-3xl ${className}`}>
      {eyebrow && (
        <p
          className={`text-sm font-semibold mb-3 ${
            light ? 'text-white/90' : 'text-primary'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <div
        className={`section-heading-bar mb-4 ${
          light ? 'bg-gradient-to-r from-white/80 to-white/20' : ''
        }`}
      />
      <h2
        className={`font-display text-3xl md:text-4xl font-bold leading-tight ${
          light ? 'text-white' : 'text-text-body'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${
            light ? 'text-white/80' : 'text-text-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
