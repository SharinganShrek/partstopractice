'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type {
  AssignmentSubmission,
  Certificate,
  ContentItem,
  CourseStats,
  ModuleWithContent,
  QuizAttempt,
  StudentProgress,
} from '@/lib/lms/types';
import { mapProgressByContentId, getBestQuizScores } from '@/lib/lms/progress';
import CourseProgressBar from './components/CourseProgressBar';
import ModuleSidebar from './components/ModuleSidebar';
import ModuleContentPanel from './components/ModuleContentPanel';
import CertificateBanner from './components/CertificateBanner';
import ContentViewer from './components/ContentViewer';

interface KursDashboardProps {
  modules: ModuleWithContent[];
  initialProgress: StudentProgress[];
  initialAttempts: QuizAttempt[];
  initialAssignments: AssignmentSubmission[];
  initialStats: CourseStats;
  initialCertificate: Certificate | null;
}

export default function KursDashboard({
  modules,
  initialProgress,
  initialAttempts,
  initialStats,
  initialCertificate,
}: KursDashboardProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(initialProgress);
  const [attempts, setAttempts] = useState(initialAttempts);
  const [stats, setStats] = useState(initialStats);
  const [certificate, setCertificate] = useState(initialCertificate);
  const [selectedModuleSlug, setSelectedModuleSlug] = useState(modules[0]?.slug ?? '');
  const [expandedSlugs, setExpandedSlugs] = useState<string[]>(
    modules[0]?.slug ? [modules[0].slug] : []
  );
  const [activeContent, setActiveContent] = useState<ContentItem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const progressMap = mapProgressByContentId(progress);
  const bestScores = getBestQuizScores(
    attempts,
    modules.flatMap((m) =>
      m.content_items.filter((i) => i.quiz_id).map((i) => i.quiz_id as string)
    )
  );

  const selectedModule = modules.find((m) => m.slug === selectedModuleSlug) ?? modules[0];

  const refreshProgress = useCallback(async () => {
    const response = await fetch('/api/kurs/progress');
    if (response.ok) {
      const data = await response.json();
      setProgress(data.progress);
      if (data.attempts) setAttempts(data.attempts);
      setStats(data.stats);
      if (data.certificate) setCertificate(data.certificate);
    }
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/kurs/giris');
  }

  function handleModuleSelect(slug: string) {
    setSelectedModuleSlug(slug);
    setActiveContent(null);
    setExpandedSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
    setSidebarOpen(false);
  }

  function handleContentSelect(slug: string, contentId: string) {
    setSelectedModuleSlug(slug);
    setExpandedSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
    const mod = modules.find((m) => m.slug === slug);
    const item = mod?.content_items.find((i) => i.id === contentId);
    if (item) setActiveContent(item);
    setSidebarOpen(false);
  }

  function handleContentClick(contentId: string) {
    handleContentSelect(selectedModuleSlug, contentId);
  }

  const activeQuizAttempts = activeContent?.quiz_id
    ? attempts.filter((a) => a.quiz_id === activeContent.quiz_id)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-body">
            Yaz Kursu Paneli
          </h1>
          <p className="text-text-muted text-sm mt-1">
            IMC 4191 × Khan Academy Türkiye: Tinkercad & Arduino Programı
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/kurs/proje"
            className="px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
          >
            Capstone Projesi
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-border text-sm text-text-muted hover:bg-surface-cream transition-colors"
          >
            Çıkış
          </button>
        </div>
      </div>

      <CourseProgressBar
        percent={stats.completionPercent}
        averageScore={stats.averageScore}
        mediaPercent={stats.mediaCompletionPercent}
      />

      <CertificateBanner stats={stats} certificate={certificate} />

      <div className="flex flex-col lg:flex-row lg:items-start gap-0 border border-border rounded-xl overflow-hidden bg-white shadow-sm min-h-0 lg:min-h-[560px]">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-cream/50 text-sm font-medium text-text-body hover:bg-surface-cream transition-colors"
        >
          <Menu className="h-4 w-4" />
          Modüller
        </button>

        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden
            />
            <aside className="fixed inset-y-0 left-0 z-50 w-[min(100vw-3rem,20rem)] bg-surface-cream/95 border-r border-border overflow-y-auto lg:hidden shadow-xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white sticky top-0">
                <span className="text-sm font-semibold text-text-body">Modüller</span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-full p-2 text-text-muted hover:bg-surface-cream transition-colors"
                  aria-label="Modülleri kapat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ModuleSidebar
                modules={modules}
                selectedSlug={selectedModule?.slug ?? ''}
                activeContentId={activeContent?.id ?? null}
                progressMap={progressMap}
                expandedSlugs={expandedSlugs}
                bestScores={bestScores}
                onExpandedChange={setExpandedSlugs}
                onModuleSelect={handleModuleSelect}
                onContentSelect={handleContentSelect}
              />
            </aside>
          </>
        )}

        <aside className="hidden lg:block lg:w-80 xl:w-96 shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-surface-cream/50 lg:sticky lg:top-[var(--kurs-nav-height)] lg:max-h-[calc(100vh-var(--kurs-nav-height))] lg:overflow-y-auto">
          <ModuleSidebar
            modules={modules}
            selectedSlug={selectedModule?.slug ?? ''}
            activeContentId={activeContent?.id ?? null}
            progressMap={progressMap}
            expandedSlugs={expandedSlugs}
            bestScores={bestScores}
            onExpandedChange={setExpandedSlugs}
            onModuleSelect={handleModuleSelect}
            onContentSelect={handleContentSelect}
          />
        </aside>

        <div className="flex-1 min-w-0 p-5 md:p-8 bg-white">
          {selectedModule && !activeContent && (
            <ModuleContentPanel
              moduleTitle={selectedModule.title}
              moduleDescription={selectedModule.description}
              items={selectedModule.content_items}
              progressMap={progressMap}
              bestScores={bestScores}
              onContentClick={handleContentClick}
            />
          )}

          {selectedModule && activeContent && (
            <ContentViewer
              item={activeContent}
              progress={progressMap.get(activeContent.id)}
              quizAttempts={activeQuizAttempts}
              inline
              onClose={() => setActiveContent(null)}
              onProgressUpdate={refreshProgress}
            />
          )}
        </div>
      </div>
    </div>
  );
}
