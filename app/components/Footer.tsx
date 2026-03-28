'use client';

import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#212529] text-[#e9ecef] py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f5f5dc]">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-[#f5f5dc] transition-colors">
                  {t('footer.home')}
                </a>
              </li>
              <li>
                <a href="/courses" className="hover:text-[#f5f5dc] transition-colors">
                  {t('footer.allCourses')}
                </a>
              </li>
              <li>
                <a href="/tests" className="hover:text-[#f5f5dc] transition-colors">
                  {t('footer.quizzes')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f5f5dc]">{t('footer.contact')}</h3>
            <p className="text-sm">team4191@gmail.com</p>
          </div>
        </div>
        <div className="border-t border-[#495057] mt-8 pt-6 text-center text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
