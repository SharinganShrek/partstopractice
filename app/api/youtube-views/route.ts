import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { getAllUniqueYoutubeVideoIds } from '@/lib/courses';
import { fetchYoutubeViewsTotal } from '@/lib/youtubeAggregateViews';

const REVALIDATE_SECONDS = Math.max(
  60,
  Number(process.env.YOUTUBE_VIEWS_REVALIDATE_SECONDS) || 3600
);

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({
      ok: false as const,
      error: 'no_api_key',
      total: null,
    });
  }

  try {
    const { total, videoCount } = await unstable_cache(
      async () => {
        const ids = getAllUniqueYoutubeVideoIds();
        const totalViews = await fetchYoutubeViewsTotal(apiKey, ids);
        return { total: totalViews, videoCount: ids.length };
      },
      ['ptp-youtube-aggregate-views'],
      { revalidate: REVALIDATE_SECONDS }
    )();

    return NextResponse.json({
      ok: true as const,
      total,
      videoCount,
      revalidateSeconds: REVALIDATE_SECONDS,
    });
  } catch (e) {
    console.error('[api/youtube-views]', e);
    return NextResponse.json(
      {
        ok: false as const,
        error: 'fetch_failed',
        total: null,
      },
      { status: 502 }
    );
  }
}
