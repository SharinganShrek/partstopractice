const YOUTUBE_VIDEOS_API = 'https://www.googleapis.com/youtube/v3/videos';
const MAX_IDS_PER_REQUEST = 50;

interface YoutubeVideosListResponse {
  items?: Array<{
    id?: string;
    statistics?: { viewCount?: string };
  }>;
  error?: { message?: string; code?: number };
}

/**
 * Sum view counts for the given video IDs via YouTube Data API v3 (videos.list statistics).
 * IDs are requested in batches of 50. Missing or private videos contribute 0.
 */
export async function fetchYoutubeViewsTotal(
  apiKey: string,
  videoIds: string[]
): Promise<number> {
  if (videoIds.length === 0) return 0;

  let sum = 0;
  for (let i = 0; i < videoIds.length; i += MAX_IDS_PER_REQUEST) {
    const chunk = videoIds.slice(i, i + MAX_IDS_PER_REQUEST);
    const url = new URL(YOUTUBE_VIDEOS_API);
    url.searchParams.set('part', 'statistics');
    url.searchParams.set('id', chunk.join(','));
    url.searchParams.set('key', apiKey);

    const res = await fetch(url.toString());
    const data = (await res.json()) as YoutubeVideosListResponse;

    if (!res.ok) {
      const msg = data.error?.message ?? res.statusText;
      throw new Error(`YouTube API: ${msg}`);
    }

    for (const item of data.items ?? []) {
      const raw = item.statistics?.viewCount;
      if (raw != null && raw !== '') {
        sum += Number.parseInt(raw, 10);
      }
    }
  }

  return sum;
}
