'use client';

import { CheckCircle2, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { ModuleWithContent, ProgressStatus, StudentProgress } from '@/lib/lms/types';
import { groupContentByUnit } from '@/lib/lms/progress';
import ContentItemRow from './ContentItemRow';

interface ModuleAccordionProps {
  modules: ModuleWithContent[];
  progressMap: Map<string, StudentProgress>;
  bestScores: Map<string, number>;
  onContentClick: (moduleSlug: string, contentId: string) => void;
}

function getModuleProgress(
  module: ModuleWithContent,
  progressMap: Map<string, StudentProgress>
) {
  const total = module.content_items.length;
  if (total === 0) return 0;
  const completed = module.content_items.filter(
    (item) => progressMap.get(item.id)?.status === 'completed'
  ).length;
  return Math.round((completed / total) * 100);
}

export default function ModuleAccordion({
  modules,
  progressMap,
  bestScores,
  onContentClick,
}: ModuleAccordionProps) {
  return (
    <Accordion type="multiple" className="space-y-3">
      {modules.map((mod) => {
        const modProgress = getModuleProgress(mod, progressMap);
        const isComplete = modProgress === 100;
        const unitGroups = groupContentByUnit(mod.content_items);

        return (
          <AccordionItem key={mod.id} value={`mod-${mod.id}`}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3 text-left flex-1 mr-2">
                {isComplete ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-text-muted shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-text-body">{mod.title}</p>
                  {mod.description && (
                    <p className="text-xs text-text-muted truncate mt-0.5">{mod.description}</p>
                  )}
                </div>
                <Badge variant={isComplete ? 'success' : 'muted'}>{modProgress}%</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {unitGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2 px-1">
                      {group.label}
                    </p>
                    <div className="space-y-2">
                      {group.items.map((item) => (
                        <ContentItemRow
                          key={item.id}
                          item={item}
                          status={
                            (progressMap.get(item.id)?.status ?? 'not_started') as ProgressStatus
                          }
                          score={item.quiz_id ? bestScores.get(item.quiz_id) : undefined}
                          onClick={() => onContentClick(mod.slug, item.id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
