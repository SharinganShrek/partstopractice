'use client';

interface CourseProgressBarProps {
  percent: number;
  averageScore?: number;
  mediaPercent?: number;
}

export default function CourseProgressBar({
  percent,
  averageScore,
  mediaPercent,
}: CourseProgressBarProps) {
  return (
    <div className="card p-6 md:p-8 shadow-md bg-gradient-to-br from-primary/5 to-white">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-text-muted uppercase tracking-wide mb-1">
            Kurs İlerlemeniz
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl md:text-6xl font-bold text-primary">
              {percent}%
            </span>
            <span className="text-text-muted text-sm">tamamlandı</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 sm:text-right">
          {mediaPercent != null && (
            <div>
              <p className="text-sm text-text-muted">Video ilerlemesi</p>
              <p className="font-display text-2xl font-bold text-text-body">%{mediaPercent}</p>
            </div>
          )}
          {averageScore != null && averageScore > 0 && (
            <div>
              <p className="text-sm text-text-muted">Quiz Ortalaması</p>
              <p className="font-display text-2xl font-bold text-text-body">%{averageScore}</p>
            </div>
          )}
        </div>
      </div>
      <div className="h-4 bg-primary/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
