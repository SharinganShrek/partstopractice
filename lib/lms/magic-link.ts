/** Supabase verifyOtp expects type "email" for magic-link token_hash (not "magiclink"). */
export function normalizeEmailOtpType(type: string | null): 'email' | null {
  if (type === 'email' || type === 'magiclink') return 'email';
  return null;
}

export function buildAuthConfirmUrl(
  siteUrl: string,
  hashedToken: string,
  next = '/kurs'
): string {
  const url = new URL('/auth/confirm', siteUrl);
  url.searchParams.set('token_hash', hashedToken);
  url.searchParams.set('type', 'email');
  url.searchParams.set('next', next);
  return url.toString();
}
