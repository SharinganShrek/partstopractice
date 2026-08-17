import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import { toDrivePreviewUrl } from '../lib/lms/drive';
import type { SeedModuleContent, SeedQuizFile } from '../lib/lms/types';

config({ path: '.env.local' });

const seedDir = path.join(process.cwd(), 'lib/lms/seed');

function loadQuiz(slug: string, quizFile: string): SeedQuizFile {
  const quizPath = path.join(seedDir, slug, quizFile);
  return JSON.parse(fs.readFileSync(quizPath, 'utf-8'));
}

async function insertQuiz(
  supabase: ReturnType<typeof createClient>,
  slug: string,
  quizFile: string
): Promise<string | null> {
  const quizData = loadQuiz(slug, quizFile);

  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .insert({
      title: quizData.title,
      passing_score: quizData.passingScore ?? 70,
    })
    .select()
    .single();

  if (quizError || !quiz) {
    console.error(`Quiz insert failed (${quizFile}):`, quizError?.message);
    return null;
  }

  for (let i = 0; i < quizData.questions.length; i++) {
    const q = quizData.questions[i];
    await supabase.from('quiz_questions').insert({
      quiz_id: quiz.id,
      order_index: i + 1,
      question_text: q.question,
      options: q.options,
      correct_answer: q.correctAnswer,
    });
  }

  return quiz.id;
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error('Usage: npx tsx scripts/sync-module-content.ts <module-slug>');
    process.exit(1);
  }

  const contentPath = path.join('lib/lms/seed', slug, 'content.json');
  if (!fs.existsSync(contentPath)) {
    console.error(`Missing ${contentPath}`);
    process.exit(1);
  }

  const content: SeedModuleContent = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: mod, error: modError } = await supabase
    .from('modules')
    .select('id')
    .eq('slug', slug)
    .single();

  if (modError || !mod) {
    console.error('Module not found:', slug);
    process.exit(1);
  }

  const { data: existing } = await supabase
    .from('content_items')
    .select('id, quiz_id, title, type')
    .eq('module_id', mod.id);

  const quizIds = (existing ?? [])
    .map((item) => item.quiz_id)
    .filter((id): id is string => Boolean(id));

  if (existing?.length) {
    const { error: deleteError } = await supabase
      .from('content_items')
      .delete()
      .eq('module_id', mod.id);

    if (deleteError) {
      console.error('Delete content items failed:', deleteError.message);
      process.exit(1);
    }
    console.log(`Removed ${existing.length} existing items`);
  }

  for (const quizId of quizIds) {
    await supabase.from('quiz_questions').delete().eq('quiz_id', quizId);
    await supabase.from('quizzes').delete().eq('id', quizId);
  }

  for (const item of content.items) {
    let quizId: string | null = null;
    if (item.quizFile) {
      quizId = await insertQuiz(supabase, slug, item.quizFile);
    }

    const driveUrl =
      item.driveUrl && !item.driveUrl.includes('PLACEHOLDER')
        ? toDrivePreviewUrl(item.driveUrl)
        : item.driveUrl?.includes('PLACEHOLDER')
          ? item.driveUrl
          : null;

    const { error: insertError } = await supabase.from('content_items').insert({
      module_id: mod.id,
      order_index: item.order,
      type: item.type,
      title: item.title,
      drive_url: driveUrl,
      quiz_id: quizId,
      estimated_duration_minutes: item.estimatedDurationMinutes ?? null,
      duration_seconds: item.durationSeconds ?? null,
      unit_label: item.unitLabel ?? null,
      unit_order: item.unitOrder ?? null,
    });

    if (insertError) {
      console.error(`Insert failed (${item.title}):`, insertError.message);
    } else {
      console.log(`✓ ${item.order}. ${item.title}`);
    }
  }

  const { data: finalItems } = await supabase
    .from('content_items')
    .select('order_index, title, type')
    .eq('module_id', mod.id)
    .order('order_index');

  console.log(`\n${slug} now has ${finalItems?.length ?? 0} items`);
}

main().catch(console.error);
