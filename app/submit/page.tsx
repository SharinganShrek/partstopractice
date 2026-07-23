'use client';

import VideoRequestForm from '../components/VideoRequestForm';
import { useLanguage } from '../components/LanguageContext';

export default function SubmitPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#fafaf5] min-h-screen">
      <div className="bg-gradient-to-r from-[#800020] to-[#a01e2b] text-white py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-3">{t('submit.title')}</h1>
          <p className="text-[#f5f5dc]/90">{t('submit.description')}</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <VideoRequestForm />
      </div>
    </div>
  );
}
