'use client';

import { toDrivePreviewUrl } from '@/lib/lms/drive';

interface ReadingViewerProps {
  driveUrl: string;
  contentItemId: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export default function ReadingViewer({
  driveUrl,
  contentItemId,
  onComplete,
  isCompleted,
}: ReadingViewerProps) {
  const previewUrl = driveUrl.includes('PLACEHOLDER')
    ? null
    : toDrivePreviewUrl(driveUrl);

  async function handleMarkComplete() {
    await fetch('/api/kurs/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentItemId, status: 'completed' }),
    });
    onComplete();
  }

  return (
    <div className="space-y-4">
      {previewUrl ? (
        <div className="aspect-[4/3] bg-surface-cream rounded-lg overflow-hidden border border-border">
          <iframe
            src={previewUrl}
            className="w-full h-full min-h-[400px]"
            title="Okuma materyali"
          />
        </div>
      ) : (
        <div className="card p-6 text-center text-text-muted text-sm">
          Okuma materyali henüz yüklenmedi. Eğitmen Drive linkini eklediğinde burada görünecek.
        </div>
      )}

      {!isCompleted && (
        <button
          type="button"
          onClick={handleMarkComplete}
          className="btn-primary w-full py-2.5 rounded-lg text-sm font-semibold"
        >
          Okudum: Tamamlandı Olarak İşaretle
        </button>
      )}

      {isCompleted && (
        <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          Bu materyal tamamlandı.
        </div>
      )}
    </div>
  );
}
