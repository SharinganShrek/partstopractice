'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { AssignmentSubmission, ContentItem, QuizAttempt, StudentProgress } from '@/lib/lms/types';
import DriveVideoPlayer from './DriveVideoPlayer';
import { resolveVideoDurationSeconds } from '@/lib/lms/video-watch';
import ReadingViewer from './ReadingViewer';
import ScoredQuiz from './ScoredQuiz';
import PerformanceTaskForm from './PerformanceTaskForm';
import CapstoneSubmissionForm from './CapstoneSubmissionForm';

interface ContentViewerProps {
  item: ContentItem;
  progress?: StudentProgress;
  quizAttempts?: QuizAttempt[];
  inline?: boolean;
  onClose: () => void;
  onProgressUpdate: () => void;
}

interface QuizData {
  quiz: { id: string; title: string; passing_score: number };
  questions: Array<{
    id: string;
    quiz_id: string;
    order_index: number;
    question_text: string;
    options: { key: string; text: string }[];
    correct_answer: string;
  }>;
}

function ContentBody({
  item,
  progress,
  quizAttempts,
  quizData,
  assignment,
  loading,
  onProgressUpdate,
}: {
  item: ContentItem;
  progress?: StudentProgress;
  quizAttempts: QuizAttempt[];
  quizData: QuizData | null;
  assignment: AssignmentSubmission | null;
  loading: boolean;
  onProgressUpdate: () => void;
}) {
  const isCompleted = progress?.status === 'completed';

  return (
    <>
      {item.type === 'video' && item.drive_url && (
        <DriveVideoPlayer
          driveUrl={item.drive_url}
          contentItemId={item.id}
          durationSeconds={resolveVideoDurationSeconds({
            durationSeconds: item.duration_seconds,
            estimatedMinutes: item.estimated_duration_minutes,
            driveUrl: item.drive_url,
          })}
          initialWatchSeconds={progress?.watch_seconds ?? 0}
          onComplete={onProgressUpdate}
          isCompleted={isCompleted}
          supplementary={item.counts_toward_progress === false}
        />
      )}

      {item.type === 'reading' && item.drive_url && (
        <ReadingViewer
          driveUrl={item.drive_url}
          contentItemId={item.id}
          onComplete={onProgressUpdate}
          isCompleted={isCompleted}
        />
      )}

      {(item.type === 'topic_quiz' || item.type === 'module_assessment') && loading && (
        <p className="text-text-muted text-sm py-8 text-center">Yükleniyor...</p>
      )}

      {(item.type === 'topic_quiz' || item.type === 'module_assessment') && quizData && (
        <ScoredQuiz
          quizId={quizData.quiz.id}
          contentItemId={item.id}
          title={quizData.quiz.title}
          questions={quizData.questions}
          passingScore={quizData.quiz.passing_score}
          previousAttempts={quizAttempts.filter((a) => a.quiz_id === quizData.quiz.id)}
          onProgressUpdate={onProgressUpdate}
        />
      )}

      {item.type === 'performance_task' && !loading && (
        <PerformanceTaskForm
          contentItemId={item.id}
          title={item.title}
          existingLink={assignment?.primary_link}
          onComplete={onProgressUpdate}
        />
      )}

      {item.type === 'capstone' && (
        <CapstoneSubmissionForm contentItemId={item.id} onSubmitted={onProgressUpdate} />
      )}
    </>
  );
}

export default function ContentViewer({
  item,
  progress,
  quizAttempts = [],
  inline = false,
  onClose,
  onProgressUpdate,
}: ContentViewerProps) {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [assignment, setAssignment] = useState<AssignmentSubmission | null>(null);
  const [loading, setLoading] = useState(
    item.type === 'topic_quiz' ||
      item.type === 'module_assessment' ||
      item.type === 'performance_task' ||
      item.type === 'capstone'
  );

  useEffect(() => {
    setQuizData(null);
    setAssignment(null);
    setLoading(
      item.type === 'topic_quiz' ||
        item.type === 'module_assessment' ||
        item.type === 'performance_task' ||
        item.type === 'capstone'
    );

    async function load() {
      if (item.type === 'topic_quiz' || item.type === 'module_assessment') {
        const response = await fetch(`/api/kurs/content/${item.id}`);
        if (response.ok) setQuizData(await response.json());
        setLoading(false);
      } else if (item.type === 'performance_task') {
        const response = await fetch(`/api/kurs/assignment?contentItemId=${item.id}`);
        if (response.ok) {
          const data = await response.json();
          setAssignment(data.submission);
        }
        setLoading(false);
      } else if (item.type === 'capstone') {
        setLoading(false);
      }
    }
    load();
  }, [item]);

  if (inline) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Modüle dön
        </button>
        <h2 className="font-display text-xl md:text-2xl font-bold text-text-body">{item.title}</h2>
        <ContentBody
          item={item}
          progress={progress}
          quizAttempts={quizAttempts}
          quizData={quizData}
          assignment={assignment}
          loading={loading}
          onProgressUpdate={onProgressUpdate}
        />
      </div>
    );
  }

  return null;
}
