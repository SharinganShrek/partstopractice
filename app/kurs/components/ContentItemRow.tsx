'use client';

import {
  PlayCircle,
  FileQuestion,
  ClipboardCheck,
  CheckCircle2,
  Circle,
  BookOpen,
  Link2,
  Trophy,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ContentItem, ProgressStatus } from '@/lib/lms/types';

interface ContentItemRowProps {
  item: ContentItem;
  status: ProgressStatus;
  score?: number;
  variant?: 'row' | 'card';
  onClick: () => void;
}

const TYPE_ICONS = {
  video: PlayCircle,
  reading: BookOpen,
  topic_quiz: FileQuestion,
  module_assessment: ClipboardCheck,
  performance_task: Link2,
  capstone: Trophy,
};

const TYPE_LABELS = {
  video: 'Video',
  reading: 'Okuma',
  topic_quiz: 'Konu Testi',
  module_assessment: 'Modül Sınavı',
  performance_task: 'Uygulama Ödevi',
  capstone: 'Bitirme Projesi',
};

export default function ContentItemRow({
  item,
  status,
  score,
  variant = 'row',
  onClick,
}: ContentItemRowProps) {
  const Icon = TYPE_ICONS[item.type];
  const isCompleted = status === 'completed';
  const typeLabel =
    item.type === 'video' && item.counts_toward_progress === false
      ? 'Yardımcı Video'
      : TYPE_LABELS[item.type];

  if (variant === 'card') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-accent-blue/40 hover:shadow-sm transition-all text-left group"
      >
        <div className="h-11 w-11 rounded-lg bg-accent-blue/10 flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-accent-blue" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-body leading-snug">{item.title}</p>
          <p className="text-xs text-text-muted mt-0.5">{typeLabel}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {score != null && (
            <Badge variant={score >= 70 ? 'success' : 'warning'}>%{score}</Badge>
          )}
          {isCompleted && !score && (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          )}
          <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-accent-blue" />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
    >
      {isCompleted ? (
        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
      ) : (
        <Circle className="h-5 w-5 text-text-muted shrink-0 group-hover:text-primary" />
      )}
      <Icon className="h-4 w-4 text-primary shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-body truncate">{item.title}</p>
        <p className="text-xs text-text-muted">{typeLabel}</p>
      </div>
      {score != null && (
        <Badge variant={score >= 70 ? 'success' : 'warning'}>%{score}</Badge>
      )}
      {!isCompleted && status === 'in_progress' && (
        <Badge variant="default">Devam ediyor</Badge>
      )}
    </button>
  );
}
