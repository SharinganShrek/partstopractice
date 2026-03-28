const stats = [
  {
    value: '10+',
    label: 'Languages',
    sub: 'FIRST and FRC introductory materials available in many languages',
  },
  {
    value: '10,000+',
    label: 'People reached',
    sub: 'Resources shared with students and the wider community',
  },
  {
    value: '6',
    label: 'Video lessons',
    sub: '60+ interactive quiz questions to reinforce what you learn',
  },
] as const;

export default function StatsStrip() {
  return (
    <section
      className="bg-[#fafaf5] border-b border-[#e9ecef] py-12 md:py-14"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="sr-only">
        Program impact at a glance
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
