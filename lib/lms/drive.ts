/** Extract Google Drive file ID from various URL formats. */
export function extractDriveFileId(url: string): string | null {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

/** Normalize Drive share URL to embeddable preview URL. */
export function toDrivePreviewUrl(url: string): string {
  const fileId = extractDriveFileId(url);
  if (!fileId) return url;
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/** Validate that a string looks like a Google Drive link. */
export function isValidDriveUrl(url: string): boolean {
  return extractDriveFileId(url) !== null;
}
