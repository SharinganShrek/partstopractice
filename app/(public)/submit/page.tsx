'use client';

import VideoRequestForm from '../../components/VideoRequestForm';
import PageSection from '../../components/PageSection';
import SectionHeading from '../../components/SectionHeading';
import { useLanguage } from '../../components/LanguageContext';

export default function SubmitPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      <PageSection variant="cream" animate={false}>
        <SectionHeading title={t('submit.title')} subtitle={t('submit.description')} />
        <div className="max-w-3xl">
          <VideoRequestForm />
        </div>
      </PageSection>
    </div>
  );
}
