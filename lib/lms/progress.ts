import type {
  Certificate,
  ContentItem,
  CourseStats,
  QuizAttempt,
  StudentProgress,
  AssignmentSubmission,
} from './types';

const CERTIFICATE_THRESHOLD = 70;
const MEDIA_COMPLETION_THRESHOLD = 70;

export function mapProgressByContentId(
  progress: StudentProgress[]
): Map<string, StudentProgress> {
  return new Map(progress.map((p) => [p.content_item_id, p]));
}

export function getBestQuizScores(
  attempts: QuizAttempt[],
  quizIds: string[]
): Map<string, number> {
  const best = new Map<string, number>();
  for (const quizId of quizIds) {
    const quizAttempts = attempts.filter((a) => a.quiz_id === quizId);
    if (quizAttempts.length === 0) continue;
    best.set(quizId, Math.max(...quizAttempts.map((a) => a.score)));
  }
  return best;
}

function countsTowardProgress(item: ContentItem): boolean {
  return item.counts_toward_progress !== false;
}

export function calculateMediaCompletion(
  contentItems: ContentItem[],
  progress: StudentProgress[]
): number {
  const mediaItems = contentItems.filter(
    (item) =>
      (item.type === 'video' || item.type === 'reading') && countsTowardProgress(item)
  );
  if (mediaItems.length === 0) return 100;

  const progressMap = mapProgressByContentId(progress);
  const completed = mediaItems.filter(
    (item) => progressMap.get(item.id)?.status === 'completed'
  ).length;

  return Math.round((completed / mediaItems.length) * 100);
}

export function calculateCourseStats(
  contentItems: ContentItem[],
  progress: StudentProgress[],
  attempts: QuizAttempt[],
  assignments: AssignmentSubmission[],
  certificate: Certificate | null
): CourseStats {
  const progressMap = mapProgressByContentId(progress);
  const allTrackable = contentItems.filter(countsTowardProgress);

  const completedItems = allTrackable.filter(
    (item) => progressMap.get(item.id)?.status === 'completed'
  ).length;

  const completionPercent =
    allTrackable.length > 0
      ? Math.round((completedItems / allTrackable.length) * 100)
      : 0;

  const mediaCompletionPercent = calculateMediaCompletion(contentItems, progress);

  const quizIds = [
    ...new Set(
      contentItems
        .filter((item) => item.quiz_id)
        .map((item) => item.quiz_id as string)
    ),
  ];

  const bestScores = getBestQuizScores(attempts, quizIds);
  const quizScoreValues = [...bestScores.values()];

  let averageScore = 0;
  if (quizScoreValues.length > 0) {
    averageScore = Math.round(
      quizScoreValues.reduce((sum, s) => sum + s, 0) / quizScoreValues.length
    );
  }

  const allQuizzesPassed =
    quizIds.length === 0 ||
    quizIds.every((id) => (bestScores.get(id) ?? 0) >= CERTIFICATE_THRESHOLD);

  const capstoneItem = contentItems.find((i) => i.type === 'capstone');
  const capstoneSubmission = capstoneItem
    ? assignments.find((a) => a.content_item_id === capstoneItem.id)
    : null;
  const hasCapstone = Boolean(capstoneItem);
  const capstoneApproved =
    !capstoneItem || capstoneSubmission?.status === 'approved';

  const mediaCompletionMet = mediaCompletionPercent >= MEDIA_COMPLETION_THRESHOLD;

  const certificateEligible =
    mediaCompletionMet &&
    allQuizzesPassed &&
    capstoneApproved;

  return {
    completionPercent,
    averageScore,
    mediaCompletionPercent,
    totalItems: allTrackable.length,
    completedItems,
    certificateEligible,
    certificateIssued: certificate != null,
    capstoneApproved,
    hasCapstone,
    allQuizzesPassed,
    mediaCompletionMet,
  };
}

export function quizQuestionToLegacy(q: {
  question_text: string;
  options: { key: string; text: string }[];
  correct_answer: string;
}) {
  return {
    question: q.question_text,
    options: q.options,
    correctAnswer: q.correct_answer,
  };
}

export function groupContentByUnit(items: ContentItem[]) {
  const groups: { label: string; items: ContentItem[] }[] = [];
  const unitMap = new Map<string, ContentItem[]>();
  const moduleEnd: ContentItem[] = [];

  for (const item of items) {
    if (item.unit_label) {
      const existing = unitMap.get(item.unit_label) ?? [];
      existing.push(item);
      unitMap.set(item.unit_label, existing);
    } else {
      moduleEnd.push(item);
    }
  }

  for (const [label, unitItems] of unitMap) {
    groups.push({ label, items: unitItems });
  }

  if (moduleEnd.length > 0) {
    groups.push({ label: 'Modül Sonu', items: moduleEnd });
  }

  return groups;
}
