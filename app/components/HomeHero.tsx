'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function PartnerLogos() {
  return (
    <div
      className="inline-flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10 rounded-2xl bg-white/95 backdrop-blur-sm px-4 sm:px-8 py-8 md:px-12 md:py-10 shadow-lg border border-border w-full max-w-4xl"
      role="group"
      aria-label="Partners and program branding"
    >
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/80">
            Team IMC#4191
          </span>
          <Image
            src="/imc-4191-logo.png"
            alt="IMC 4191"
            width={280}
            height={196}
            className="h-28 sm:h-32 md:h-36 w-auto max-w-[220px] sm:max-w-[260px] object-contain"
            priority
          />
        </div>
        <span className="text-primary/30 text-4xl font-light select-none" aria-hidden>
          ×
        </span>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/80">
            FIRST
          </span>
          <div className="rounded-xl bg-primary px-6 py-4 md:px-8 md:py-5 shadow-md">
            <Image
              src="/FIRST_HorzRGB_reverse.png"
              alt="FIRST"
              width={280}
              height={72}
              className="h-12 sm:h-14 md:h-16 w-auto max-w-[240px] object-contain"
              priority
            />
          </div>
        </div>
      </div>
      <span className="hidden lg:block text-primary/30 text-4xl font-light select-none" aria-hidden>
        ×
      </span>
      <span className="lg:hidden text-primary/30 text-3xl font-light select-none" aria-hidden>
        ×
      </span>
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
          Khan Academy
        </span>
        <Image
          src="/62a63a8403a870b920cbfd4a.png"
          alt="Khan Academy"
          width={320}
          height={160}
          className="h-24 sm:h-28 md:h-32 w-auto max-w-[280px] object-contain drop-shadow-sm"
          priority
        />
      </div>
    </div>
  );
}

export default function HomeHero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const inner = (
    <>
      <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white mb-4">
        {t('hero.subtitle')}
      </span>
      <h1 className="font-display font-bold text-white leading-tight text-[clamp(1.75rem,8vw,4.5rem)] max-w-4xl mb-5">
        {t('hero.title')}
      </h1>
      <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mb-8">
        {t('hero.description')}
      </p>
      <Link
        href="/courses"
        className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-white text-primary px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/95 shadow-sm mb-10"
      >
        {t('nav.courses')} →
      </Link>
      <PartnerLogos />
    </>
  );

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-white">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pt-28 pb-16 md:pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          {reduceMotion ? (
            inner
          ) : (
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white mb-4"
              >
                {t('hero.subtitle')}
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="font-display font-bold text-white leading-tight text-[clamp(1.75rem,8vw,4.5rem)] max-w-4xl mb-5"
              >
                {t('hero.title')}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mb-8"
              >
                {t('hero.description')}
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/courses"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-white text-primary px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/95 shadow-sm mb-10"
                >
                  {t('nav.courses')} →
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <PartnerLogos />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
