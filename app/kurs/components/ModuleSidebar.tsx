'use client';

import {
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileQuestion,
  PlayCircle,
  Trophy,
  MessageSquare,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { ContentItem, ModuleWithContent, StudentProgress } from '@/lib/lms/types';

interface ModuleSidebarProps {
  modules: ModuleWithContent[];
  selectedSlug: string;
  activeContentId: string | null;
  progressMap: Map<string, StudentProgress>;
  expandedSlugs: string[];
  bestScores: Map<string, number>;
  onExpandedChange: (slugs: string[]) => void;
  onModuleSelect: (slug: string) => void;
  onContentSelect: (slug: string, contentId: string) => void;
}

const TYPE_ICONS = {
  video: PlayCircle,
  reading: PlayCircle,
  topic_quiz: FileQuestion,
  module_assessment: ClipboardCheck,
  performance_task: ClipboardCheck,
  capstone: Trophy,
  final_feedback: MessageSquare,
};

function getModuleProgress(module: ModuleWithContent, progressMap: Map<string, StudentProgress>) {
  const total = module.content_items.length;
  if (total === 0) return 0;
  const completed = module.content_items.filter(
    (item) => progressMap.get(item.id)?.status === 'completed'
  ).length;
  return Math.round((completed / total) * 100);
}

function SidebarContentItem({
  item,
  isActive,
  isCompleted,
  score,
  onClick,
}: {
  item: ContentItem;
  isActive: boolean;
  isCompleted: boolean;
  score?: number;
  onClick: () => void;
}) {
  const Icon = TYPE_ICONS[item.type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-start gap-2.5 px-3 py-2 rounded-md text-left transition-colors ${
        isActive
          ? 'bg-accent-blue/15 text-accent-blue'
          : 'hover:bg-black/[0.04] text-text-body/90'
      }`}
    >
      <Icon className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${isActive ? 'text-accent-blue' : 'text-text-muted'}`} />
      <span className="flex-1 min-w-0 text-xs leading-snug line-clamp-2">{item.title}</span>
      {score != null ? (
        <span
          className={`text-[10px] font-semibold shrink-0 ${
            score >= 70 ? 'text-green-600' : 'text-amber-600'
          }`}
        >
          %{score}
        </span>
      ) : isCompleted ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
      ) : null}
    </button>
  );
}

export default function ModuleSidebar({
  modules,
  selectedSlug,
  activeContentId,
  progressMap,
  expandedSlugs,
  bestScores,
  onExpandedChange,
  onModuleSelect,
  onContentSelect,
}: ModuleSidebarProps) {
  return (
    <nav className="py-2">
      <p className="px-4 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">
        Modüller
      </p>

      <Accordion
        type="multiple"
        value={expandedSlugs}
        onValueChange={onExpandedChange}
        className="space-y-0"
      >
        {modules.map((mod, index) => {
          const isActiveModule = mod.slug === selectedSlug;
          const progress = getModuleProgress(mod, progressMap);
          const isComplete = progress === 100;

          return (
            <AccordionItem
              key={mod.id}
              value={mod.slug}
              className="border-0 border-b border-border/60 rounded-none overflow-visible"
            >
              <AccordionTrigger
                onClick={() => onModuleSelect(mod.slug)}
                className={`px-4 py-3 hover:no-underline border-l-4 rounded-none [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-text-muted ${
                  isActiveModule
                    ? 'bg-accent-blue/10 border-accent-blue'
                    : 'border-transparent hover:bg-black/[0.03]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 flex-1 min-w-0 text-left">
                  <div className="min-w-0 flex-1 pr-2">
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-wide mb-0.5 ${
                        isActiveModule ? 'text-accent-blue' : 'text-text-muted'
                      }`}
                    >
                      Modül {index + 1}
                    </p>
                    <p
                      className={`text-sm leading-snug ${
                        isActiveModule ? 'font-semibold text-text-body' : 'text-text-body/90'
                      }`}
                    >
                      {mod.title.replace(/^Modül \d+:\s*/, '')}
                    </p>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      {mod.content_items.length} içerik
                    </p>
                  </div>
                  {isComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  ) : (
                    <span className="text-[11px] font-medium text-text-muted shrink-0">
                      %{progress}
                    </span>
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-2 pt-0">
                <div className="pl-5 pr-2 space-y-0.5">
                  {mod.content_items.map((item) => {
                    const status = progressMap.get(item.id)?.status ?? 'not_started';
                    return (
                      <SidebarContentItem
                        key={item.id}
                        item={item}
                        isActive={activeContentId === item.id}
                        isCompleted={status === 'completed'}
                        score={item.quiz_id ? bestScores.get(item.quiz_id) : undefined}
                        onClick={() => onContentSelect(mod.slug, item.id)}
                      />
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </nav>
  );
}
