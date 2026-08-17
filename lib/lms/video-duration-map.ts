import { extractDriveFileId } from './drive';

/** Drive file id → exact duration in seconds (synced from seed via scripts/sync-video-durations.ts). */
export const VIDEO_DURATION_BY_FILE_ID: Record<string, number> = {
  '1iOKobKgVTxMRFzjK4mLMfqPpsiopv640': 404,
  '1RudlDmrX3ISw-d4z-flPli8vzQ2JWPUe': 323,
  '1-p-ULfXnWEi6U8-3KFhY4z-nzrh6xbk1': 231,
  '1A9p6MPAehhr4T2T5mGqwsnyTp4EEqiyJ': 299,
  '19yd_X47HsR8bafKpEH_aCEX6JiYV6ZMG': 461,
  '1RppZBAeZiv9cy38IE6Glp3IdqPnoa59k': 304,
  '1-bKSB19QcJL6THuPoc9mDwvoymD-tiXi': 831,
  '18mVxrB_DCwaoM5z1EaoOSEhjStjyYoja': 679,
  '1IQDQSe7AfPs2uTNGh-I-NgJJ86f_BBh5': 920,
  '11oaOsS1HaLsMJl-LMZZPwv8KCme3KP2K': 362,
};

export function getDurationFromDriveUrl(
  driveUrl: string | null | undefined
): number | null {
  if (!driveUrl) return null;
  const fileId = extractDriveFileId(driveUrl);
  if (!fileId) return null;
  return VIDEO_DURATION_BY_FILE_ID[fileId] ?? null;
}
