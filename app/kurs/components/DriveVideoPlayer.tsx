'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { toDrivePreviewUrl } from '@/lib/lms/drive';
interface DriveVideoPlayerProps {
  driveUrl: string;
  contentItemId: string;
  estimatedMinutes: number;
  onComplete: () => void;
  isCompleted: boolean;
}

export default function DriveVideoPlayer({
  driveUrl,
  contentItemId,
  estimatedMinutes,
  onComplete,
  isCompleted,
}: DriveVideoPlayerProps) {
  const [watchSeconds, setWatchSeconds] = useState(0);
  const [canComplete, setCanComplete] = useState(isCompleted);
  const [completing, setCompleting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewUrl = toDrivePreviewUrl(driveUrl);
  const requiredSeconds = Math.max(60, Math.floor(estimatedMinutes * 60 * 0.85));

  const tick = useCallback(() => {
    if (document.visibilityState === 'visible') {
      setWatchSeconds((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    if (isCompleted) {
      setCanComplete(true);
      return;
    }

    intervalRef.current = setInterval(tick, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isCompleted, tick]);

  useEffect(() => {
    if (!isCompleted && watchSeconds >= requiredSeconds) {
      setCanComplete(true);
    }
  }, [watchSeconds, requiredSeconds, isCompleted]);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  async function toggleFullscreen() {
    if (!containerRef.current) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await containerRef.current.requestFullscreen();
      }
    } catch {
      // Browser blocked or unsupported
    }
  }

  async function handleMarkComplete() {    setCompleting(true);
    await fetch('/api/kurs/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contentItemId,
        status: 'completed',
        watchSeconds,
      }),
    });
    setCompleting(false);
    onComplete();
  }

  const watchPercent = Math.min(100, Math.round((watchSeconds / requiredSeconds) * 100));

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative aspect-video bg-black rounded-lg overflow-hidden [&:fullscreen]:aspect-auto [&:fullscreen]:w-screen [&:fullscreen]:h-screen [&:fullscreen]:rounded-none [&:fullscreen]:flex [&:fullscreen]:items-center [&:fullscreen]:justify-center"
      >
        <iframe
          src={previewUrl}
          className="w-full h-full [&:fullscreen]:min-h-full"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title="Ders videosu"
        />
        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-black/80"
          aria-label={isFullscreen ? 'Tam ekrandan çık' : 'Tam ekran'}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="h-4 w-4" />
              Küçült
            </>
          ) : (
            <>
              <Maximize2 className="h-4 w-4" />
              Tam Ekran
            </>
          )}
        </button>
      </div>
      {!isCompleted && (
        <div className="card p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">İzleme süresi</span>
            <span className="font-medium">
              {Math.floor(watchSeconds / 60)}:{String(watchSeconds % 60).padStart(2, '0')} /{' '}
              {Math.floor(requiredSeconds / 60)} dk
            </span>
          </div>
          <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${watchPercent}%` }}
            />
          </div>
          <button
            type="button"
            onClick={handleMarkComplete}
            disabled={!canComplete || completing}
            className="btn-primary w-full py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
          >
            {completing
              ? 'Kaydediliyor...'
              : canComplete
              ? 'Tamamlandı Olarak İşaretle'
              : 'Videoyu izlemeye devam edin...'}
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          Bu video tamamlandı.
        </div>
      )}
    </div>
  );
}
