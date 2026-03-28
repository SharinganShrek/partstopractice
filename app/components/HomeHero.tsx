import Image from 'next/image';
import TurkishContentBadge from './TurkishContentBadge';

export default function HomeHero() {
  return (
    <header className="bg-gradient-to-r from-[#800020] to-[#a01e2b] text-white py-14 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.12),transparent)] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 relative text-center">
        <div className="flex flex-col items-center gap-3 mb-4">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#f5f5dc]/90">
            IMC#4191 × Khan Academy Türkiye
          </p>
          <TurkishContentBadge variant="onDark" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-balance leading-tight">
          FIRST Parts to Practice
        </h1>
        <p className="text-lg md:text-xl text-[#f5f5dc] max-w-2xl mx-auto leading-relaxed text-balance mb-10">
          Introductory FRC and FIRST coursework in Turkish—video lessons and interactive
          quizzes to support learning.
        </p>

        <div
          className="inline-flex flex-col md:flex-row items-center justify-center gap-6 md:gap-7 rounded-2xl bg-white/95 backdrop-blur-sm px-8 py-7 md:px-10 md:py-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-white/60 max-w-2xl mx-auto"
          role="group"
          aria-label="Partners and program branding"
        >
          {/* IMC 4191 + FIRST (team identity) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#800020]/80">
                Team IMC#4191
              </span>
              <div className="rounded-xl overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.22)] ring-1 ring-black/10">
                <Image
                  src="/imc-4191-logo.png"
                  alt="IMC 4191"
                  width={200}
                  height={140}
                  className="h-[72px] md:h-[84px] w-auto max-w-[160px] object-contain object-center"
                  priority
                />
              </div>
            </div>
            <span
              className="hidden sm:block text-3xl font-light text-[#800020]/40 select-none"
              aria-hidden
            >
              ×
            </span>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#800020]/80">
                FIRST
              </span>
              <div className="rounded-xl bg-[#800020] px-5 py-3 shadow-[0_8px_20px_rgba(128,0,32,0.35)] ring-1 ring-black/5">
                <Image
                  src="/FIRST_HorzRGB_reverse.png"
                  alt="FIRST"
                  width={220}
                  height={56}
                  className="h-9 md:h-10 w-auto object-contain mx-auto"
                  priority
                />
              </div>
            </div>
          </div>

          <span
            className="hidden md:block text-3xl font-light text-[#800020]/40 select-none"
            aria-hidden
          >
            ×
          </span>
          <span
            className="md:hidden text-2xl font-light text-[#800020]/40 select-none leading-none"
            aria-hidden
          >
            ×
          </span>

          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#212529]/60">
              Khan Academy
            </span>
            <Image
              src="/62a63a8403a870b920cbfd4a.png"
              alt="Khan Academy"
              width={200}
              height={200}
              className="h-auto w-[min(200px,55vw)] max-h-[100px] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
