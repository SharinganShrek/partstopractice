'use client';

import { useState } from 'react';
import { LANGUAGES } from '@/lib/i18n/config';
import { VIDEO_TYPES } from '@/lib/video-requests';
import { useLanguage } from './LanguageContext';

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary';
const labelClass = 'block text-sm font-medium text-text-muted mb-1.5';

export default function VideoRequestForm() {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [videoType, setVideoType] = useState('');
  const [language, setLanguage] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/video-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          video_type: videoType,
          language,
          drive_link: driveLink,
          submitter_name: submitterName || undefined,
          submitter_email: submitterEmail || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(result.error ?? t('submit.error'));
        return;
      }

      setStatus('success');
      setTitle('');
      setVideoType('');
      setLanguage('');
      setDriveLink('');
      setSubmitterName('');
      setSubmitterEmail('');
    } catch {
      setStatus('error');
      setErrorMessage(t('submit.error'));
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center shadow-md">
        <div className="text-4xl mb-4 text-primary">✓</div>
        <h2 className="font-display text-xl font-bold text-text-body mb-2">{t('submit.success')}</h2>
        <p className="text-text-muted mb-6">{t('submit.successMessage')}</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-primary">
          {t('submit.sendAnother')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5 shadow-md">
      <div>
        <label htmlFor="video-type" className={labelClass}>
          {t('submit.videoType')} *
        </label>
        <select
          id="video-type"
          required
          value={videoType}
          onChange={(e) => setVideoType(e.target.value)}
          className={inputClass}
        >
          <option value="">{t('submit.selectOption')}</option>
          {VIDEO_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>
          {t('submit.titleLabel')} *
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder={t('submit.titlePlaceholder')}
        />
      </div>

      <div>
        <label htmlFor="language" className={labelClass}>
          {t('submit.language')} *
        </label>
        <select
          id="language"
          required
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={inputClass}
        >
          <option value="">{t('submit.selectOption')}</option>
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="drive-link" className={labelClass}>
          {t('submit.driveLink')} *
        </label>
        <input
          id="drive-link"
          type="url"
          required
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          className={inputClass}
          placeholder="https://drive.google.com/file/d/..."
        />
        <p className="text-xs text-text-muted mt-1.5">{t('submit.driveLinkHint')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="submitter-name" className={labelClass}>
            {t('submit.submitterName')}
          </label>
          <input
            id="submitter-name"
            type="text"
            value={submitterName}
            onChange={(e) => setSubmitterName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="submitter-email" className={labelClass}>
            {t('submit.submitterEmail')}
          </label>
          <input
            id="submitter-email"
            type="email"
            value={submitterEmail}
            onChange={(e) => setSubmitterEmail(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {errorMessage}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary disabled:opacity-60">
        {status === 'loading' ? t('submit.sending') : t('submit.send')}
      </button>
    </form>
  );
}
