/**
 * Verifies media %70 and certificate eligibility calculations.
 * Run: npx tsx scripts/verify-progress.ts
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { calculateCourseStats, calculateMediaCompletion } from '../lib/lms/progress';
import {
  formatVideoTimestamp,
  getRequiredWatchSeconds,
  getVideoDurationSeconds,
  getWatchProgressPercent,
  resolveVideoDurationSeconds,
  VIDEO_WATCH_THRESHOLD,
} from '../lib/lms/video-watch';
import type { ContentItem, QuizAttempt, StudentProgress } from '../lib/lms/types';

config({ path: '.env.local' });

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`OK: ${message}`);
}

function mockProgress(completedIds: string[]): StudentProgress[] {
  return completedIds.map((id) => ({
    id: `p-${id}`,
    user_id: 'test',
    content_item_id: id,
    status: 'completed',
    watch_seconds: 0,
    completed_at: new Date().toISOString(),
  }));
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error('Supabase env missing :  running unit tests only');
    runUnitTests([]);
    return;
  }

  const supabase = createClient(url, key);
  const { data: items, error } = await supabase
    .from('content_items')
    .select('*')
    .order('order_index');

  if (error) throw error;
  const contentItems = (items ?? []) as ContentItem[];

  const media = contentItems.filter((i) => i.type === 'video' || i.type === 'reading');
  const quizIds = [
    ...new Set(contentItems.filter((i) => i.quiz_id).map((i) => i.quiz_id as string)),
  ];

  console.log('\n=== DB content summary ===');
  console.log('Total content items:', contentItems.length);
  console.log('Media (video + reading):', media.length);
  console.log('Quizzes linked:', quizIds.length);
  console.log(
    'Min media items for 70%:',
    Math.ceil(media.length * 0.7),
    `(of ${media.length})`
  );

  runUnitTests(contentItems);

  const { count: progressCount } = await supabase
    .from('student_progress')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  console.log('\n=== Live DB ===');
  console.log('Total completed progress rows (all users):', progressCount ?? 0);
}

function runUnitTests(contentItems: ContentItem[]) {
  console.log('\n=== Unit tests ===');

  assert(getVideoDurationSeconds(407) === 407, '407 sec video → 407 sec total');
  assert(getRequiredWatchSeconds(407) === 284, '407 sec video → 284 sec threshold (70%)');
  assert(formatVideoTimestamp(407) === '6:47', '407 sec → 6:47 display');
  assert(formatVideoTimestamp(404) === '6:44', '404 sec → 6:44 display');
  assert(
    getWatchProgressPercent(142, 407) === 50,
    'half of required watch → 50% progress bar'
  );
  assert(
    getWatchProgressPercent(284, 407) === 100,
    'threshold reached → 100% progress bar'
  );
  assert(
    resolveVideoDurationSeconds({ driveUrl: 'https://drive.google.com/file/d/1iOKobKgVTxMRFzjK4mLMfqPpsiopv640/view' }) === 404,
    'drive url map fallback → 404 sec'
  );
  assert(VIDEO_WATCH_THRESHOLD === 0.7, 'watch threshold is 70%');

  const media =
    contentItems.length > 0
      ? contentItems.filter(
          (i) =>
            (i.type === 'video' || i.type === 'reading') &&
            i.counts_toward_progress !== false
        )
      : Array.from({ length: 24 }, (_, i) => ({
          id: `media-${i}`,
          type: i % 2 === 0 ? ('video' as const) : ('reading' as const),
          module_id: 1,
          order_index: i,
          title: `M${i}`,
          unit_label: null,
          drive_url: null,
          estimated_duration_minutes: 10,
          quiz_id: null,
        }));

  const mediaCount = media.length;
  const thresholdCount = Math.ceil(mediaCount * 0.7);

  // Edge: empty progress
  assert(calculateMediaCompletion(media, []) === 0, '0 completed → 0%');

  // Just below threshold
  const belowIds = media.slice(0, thresholdCount - 1).map((m) => m.id);
  const belowPct = calculateMediaCompletion(media, mockProgress(belowIds));
  assert(belowPct < 70, `${thresholdCount - 1}/${mediaCount} → ${belowPct}% (< 70)`);

  // At threshold
  const atIds = media.slice(0, thresholdCount).map((m) => m.id);
  const atPct = calculateMediaCompletion(media, mockProgress(atIds));
  assert(atPct >= 70, `${thresholdCount}/${mediaCount} → ${atPct}% (>= 70)`);

  // All complete
  assert(
    calculateMediaCompletion(media, mockProgress(media.map((m) => m.id))) === 100,
    'all media → 100%'
  );

  if (contentItems.length > 0) {
    const quizIds = [
      ...new Set(contentItems.filter((i) => i.quiz_id).map((i) => i.quiz_id as string)),
    ];
    const attempts: QuizAttempt[] = quizIds.map((qid) => ({
      id: `a-${qid}`,
      user_id: 'test',
      quiz_id: qid,
      score: 80,
      passed: true,
      answers: {},
      created_at: new Date().toISOString(),
    }));

    const capstoneItem = contentItems.find((i) => i.type === 'capstone');
    const assignments = capstoneItem
      ? [
          {
            id: 'cap-approved',
            user_id: 'test',
            content_item_id: capstoneItem.id,
            primary_link: 'https://example.com',
            secondary_link: null,
            code_text: null,
            image_path: null,
            file_path: null,
            file_name: null,
            arduino_link: null,
            status: 'approved' as const,
            grade: null,
            feedback: null,
            submitted_at: new Date().toISOString(),
            reviewed_at: new Date().toISOString(),
          },
        ]
      : [];

    const stats = calculateCourseStats(
      contentItems,
      mockProgress(media.map((m) => m.id)),
      attempts,
      assignments,
      null
    );

    assert(stats.mediaCompletionPercent === 100, 'full media → mediaCompletionPercent 100');
    assert(stats.mediaCompletionMet === true, 'mediaCompletionMet true at 100%');
    assert(stats.allQuizzesPassed === true, 'all quizzes at 80% → allQuizzesPassed');
    assert(
      stats.certificateEligible === true,
      'certificateEligible true when media, quizzes, and capstone (if any) are complete'
    );
    assert(stats.feedbackSubmitted === false, 'no feedback → feedbackSubmitted false');
    assert(stats.certificateReady === false, 'no feedback → certificateReady false');

    const statsWithFeedback = calculateCourseStats(
      contentItems,
      mockProgress(media.map((m) => m.id)),
      attempts,
      assignments,
      null,
      [
        {
          id: 'fb-1',
          user_id: 'test',
          content_item_id: 'feedback-item',
          full_name: 'Test User',
          team_message: 'Teşekkürler',
          improvement_feedback: 'Daha fazla örnek',
          submitted_at: new Date().toISOString(),
        },
      ]
    );
    assert(statsWithFeedback.feedbackSubmitted === true, 'feedback present → feedbackSubmitted true');
    assert(statsWithFeedback.certificateReady === true, 'eligible + feedback → certificateReady true');
  }

  console.log('\nAll progress calculation checks passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
