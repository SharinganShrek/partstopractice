export function buildAuthConfirmUrl(
  siteUrl: string,
  hashedToken: string,
  next = '/kurs'
): string {
  const url = new URL('/auth/confirm', siteUrl);
  url.searchParams.set('token_hash', hashedToken);
  url.searchParams.set('type', 'magiclink');
  url.searchParams.set('next', next);
  return url.toString();
}
