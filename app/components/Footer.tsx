'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/imc-4191-logo.png"
                alt="IMC 4191"
                width={56}
                height={56}
                className="h-14 w-14 rounded-md object-cover"
              />
              <div>
                <p className="font-display font-bold text-lg leading-none">#4191</p>
                <p className="text-sm text-white/75 mt-1">Parts to Practice</p>
              </div>
            </div>
            <p className="text-sm text-white/75 leading-relaxed">{t('hero.subtitle')}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/75 hover:text-white transition-colors">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white/75 hover:text-white transition-colors">
                  {t('footer.allCourses')}
                </Link>
              </li>
              <li>
                <Link href="/tests" className="text-white/75 hover:text-white transition-colors">
                  {t('footer.quizzes')}
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-white/75 hover:text-white transition-colors">
                  {t('footer.submitVideo')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t('footer.contact')}</h3>
            <p className="text-sm text-white/75">team4191@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 text-center">
          <p className="text-xs text-white/60">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
