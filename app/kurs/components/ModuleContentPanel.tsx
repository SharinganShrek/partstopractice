'use client';

import type { ContentItem, ProgressStatus, StudentProgress } from '@/lib/lms/types';
import ContentItemRow from './ContentItemRow';

interface ModuleContentPanelProps {
  moduleTitle: string;
  moduleDescription: string | null;
  items: ContentItem[];
  progressMap: Map<string, StudentProgress>;
  bestScores: Map<string, number>;
  onContentClick: (contentId: string) => void;
}

const LEARN_TYPES = new Set(['video', 'reading']);
const PRACTICE_TYPES = new Set(['topic_quiz', 'module_assessment']);
const OTHER_TYPES = new Set(['capstone', 'performance_task']);

export default function ModuleContentPanel({
  moduleTitle,
  moduleDescription,
  items,
  progressMap,
  bestScores,
  onContentClick,
}: ModuleContentPanelProps) {
  const learnItems = items.filter((i) => LEARN_TYPES.has(i.type));
  const practiceItems = items.filter((i) => PRACTICE_TYPES.has(i.type));
  const otherItems = items.filter((i) => OTHER_TYPES.has(i.type));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-text-body">{moduleTitle}</h2>
        {moduleDescription && (
          <p className="text-text-muted text-sm mt-2 max-w-2xl">{moduleDescription}</p>
        )}
      </div>

      {(learnItems.length > 0 || practiceItems.length > 0) && (
        <div
          className={`grid gap-8 ${
            learnItems.length > 0 && practiceItems.length > 0
              ? 'md:grid-cols-2'
              : 'max-w-2xl'
          }`}
        >
          {learnItems.length > 0 && (
            <section>
              <h3 className="font-display text-lg font-bold text-text-body mb-4 pb-2 border-b border-border">
                Öğren
              </h3>
              <div className="space-y-2">
                {learnItems.map((item) => (
                  <ContentItemRow
                    key={item.id}
                    item={item}
                    variant="card"
                    status={
                      (progressMap.get(item.id)?.status ?? 'not_started') as ProgressStatus
                    }
                    onClick={() => onContentClick(item.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {practiceItems.length > 0 && (
            <section>
              <h3 className="font-display text-lg font-bold text-text-body mb-4 pb-2 border-b border-border">
                Test
              </h3>
              <div className="space-y-2">
                {practiceItems.map((item) => (
                  <ContentItemRow
                    key={item.id}
                    item={item}
                    variant="card"
                    status={
                      (progressMap.get(item.id)?.status ?? 'not_started') as ProgressStatus
                    }
                    score={item.quiz_id ? bestScores.get(item.quiz_id) : undefined}
                    onClick={() => onContentClick(item.id)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {otherItems.length > 0 && (
        <section>
          <h3 className="font-display text-lg font-bold text-text-body mb-4 pb-2 border-b border-border">
            Proje
          </h3>
          <div className="space-y-2 max-w-xl">
            {otherItems.map((item) => (
              <ContentItemRow
                key={item.id}
                item={item}
                variant="card"
                status={(progressMap.get(item.id)?.status ?? 'not_started') as ProgressStatus}
                onClick={() => onContentClick(item.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
