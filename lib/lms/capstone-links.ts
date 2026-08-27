import { isValidDriveUrl } from '@/lib/lms/drive';

export { isValidDriveUrl };

export function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function isValidTinkercadUrl(url: string): boolean {
  try {
    const parsed = new URL(url.trim());
    return parsed.hostname.includes('tinkercad.com');
  } catch {
    return false;
  }
}
