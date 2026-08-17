/** Minimum watch ratio before a video can be marked complete. */
export const VIDEO_WATCH_THRESHOLD = 0.7;

const DEFAULT_VIDEO_DURATION_SECONDS = 600;

export function resolveVideoDurationSeconds(input: {
  durationSeconds?: number | null;
  estimatedMinutes?: number | null;
}): number {
  if (input.durationSeconds != null && input.durationSeconds > 0) {
    return input.durationSeconds;
  }
  if (input.estimatedMinutes != null && input.estimatedMinutes > 0) {
    return input.estimatedMinutes * 60;
  }
  return DEFAULT_VIDEO_DURATION_SECONDS;
}

export function getVideoDurationSeconds(durationSeconds: number): number {
  return Math.max(60, Math.round(durationSeconds));
}

export function getRequiredWatchSeconds(durationSeconds: number): number {
  const total = getVideoDurationSeconds(durationSeconds);
  return Math.max(30, Math.floor(total * VIDEO_WATCH_THRESHOLD));
}

/** Format seconds as M:SS (e.g. 8:05). */
export function formatVideoTimestamp(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function getWatchProgressPercent(
  watchSeconds: number,
  durationSeconds: number
): number {
  const required = getRequiredWatchSeconds(durationSeconds);
  if (required <= 0) return 100;
  return Math.min(100, Math.round((watchSeconds / required) * 100));
}
