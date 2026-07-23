import { LANGUAGES, type SupportedLanguage } from './i18n/config';

export const VIDEO_TYPES = ['first', 'fll', 'ftc', 'frc'] as const;
export type VideoType = (typeof VIDEO_TYPES)[number];

export const REQUEST_STATUSES = ['pending', 'approved', 'rejected'] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export interface VideoRequest {
  id: string;
  title: string;
  video_type: VideoType;
  language: SupportedLanguage;
  drive_link: string;
  submitter_name: string | null;
  submitter_email: string | null;
  status: RequestStatus;
  moderator_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
}

export interface VideoRequestInput {
  title: string;
  video_type: VideoType;
  language: SupportedLanguage;
  drive_link: string;
  submitter_name?: string;
  submitter_email?: string;
}

const SUPPORTED_LANGUAGE_CODES = new Set(LANGUAGES.map((l) => l.code));

export function isValidVideoType(value: string): value is VideoType {
  return VIDEO_TYPES.includes(value as VideoType);
}

export function isValidLanguage(value: string): value is SupportedLanguage {
  return SUPPORTED_LANGUAGE_CODES.has(value as SupportedLanguage);
}

export function isValidStatus(value: string): value is RequestStatus {
  return REQUEST_STATUSES.includes(value as RequestStatus);
}

export function isValidDriveLink(value: string): boolean {
  try {
    const url = new URL(value);
    return url.hostname === 'drive.google.com' || url.hostname.endsWith('.google.com');
  } catch {
    return false;
  }
}

export function validateVideoRequestInput(body: unknown): {
  data?: VideoRequestInput;
  error?: string;
} {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid request body' };
  }

  const input = body as Record<string, unknown>;
  const title = typeof input.title === 'string' ? input.title.trim() : '';
  const video_type = typeof input.video_type === 'string' ? input.video_type : '';
  const language = typeof input.language === 'string' ? input.language : '';
  const drive_link = typeof input.drive_link === 'string' ? input.drive_link.trim() : '';
  const submitter_name =
    typeof input.submitter_name === 'string' ? input.submitter_name.trim() : undefined;
  const submitter_email =
    typeof input.submitter_email === 'string' ? input.submitter_email.trim() : undefined;

  if (!title) return { error: 'Title is required' };
  if (!isValidVideoType(video_type)) return { error: 'Invalid video type' };
  if (!isValidLanguage(language)) return { error: 'Invalid language' };
  if (!drive_link) return { error: 'Google Drive link is required' };
  if (!isValidDriveLink(drive_link)) return { error: 'Invalid Google Drive link' };

  if (submitter_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitter_email)) {
    return { error: 'Invalid email address' };
  }

  return {
    data: {
      title,
      video_type,
      language,
      drive_link,
      submitter_name: submitter_name || undefined,
      submitter_email: submitter_email || undefined,
    },
  };
}

export function isModerator(appMetadata: Record<string, unknown> | undefined): boolean {
  return appMetadata?.role === 'moderator';
}
