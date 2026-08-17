import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { toDrivePreviewUrl } from '../lib/lms/drive';
import { generatePlaceholderQuiz } from '../lib/lms/seed/quiz-placeholders';
import type { SeedModuleContent, SeedQuizFile } from '../lib/lms/types';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const shouldReset = process.argv.includes('--reset');

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const seedDir = path.join(process.cwd(), 'lib/lms/seed');

function loadQuiz(slug: string, quizFile: string, title: string): SeedQuizFile {
  const quizPath = path.join(seedDir, slug, quizFile);
  if (fs.existsSync(quizPath)) {
    return JSON.parse(fs.readFileSync(quizPath, 'utf-8'));
  }
  const count = quizFile.includes('modul-sinavi') ? 10 : 5;
  const quiz = generatePlaceholderQuiz(title, count);
  fs.mkdirSync(path.dirname(quizPath), { recursive: true });
  fs.writeFileSync(quizPath, JSON.stringify(quiz, null, 2));
  console.log(`    Generated placeholder: ${quizFile}`);
  return quiz;
}

async function resetLmsTables() {
  console.log('Resetting LMS tables...');
  const tables = [
    'student_progress',
    'quiz_attempts',
    'assignment_submissions',
    'project_submissions',
    'quiz_questions',
    'quizzes',
    'content_items',
    'modules',
  ];
  for (const table of tables) {
    const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error && !error.message.includes('does not exist')) {
      // serial id tables use different delete - use raw for modules
      if (table === 'modules') {
        await supabase.from('modules').delete().gte('id', 0);
      } else if (table === 'quiz_questions' || table === 'quizzes' || table === 'content_items') {
        await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
      }
    }
  }
  // modules has serial id
  await supabase.from('content_items').delete().gte('order_index', 0);
  await supabase.from('quiz_questions').delete().gte('order_index', 0);
  await supabase.from('quizzes').delete().gte('passing_score', 0);
  await supabase.from('modules').delete().gte('id', 0);
  console.log('Reset complete.\n');
}

async function seedModules() {
  const modulesPath = path.join(seedDir, 'modules.json');
  const modules = JSON.parse(fs.readFileSync(modulesPath, 'utf-8'));

  for (const mod of modules) {
    const { error } = await supabase.from('modules').upsert(
      {
        order_index: mod.orderIndex,
        title: mod.title,
        description: mod.description,
        slug: mod.slug,
      },
      { onConflict: 'slug' }
    );
    if (error) console.error(`Module ${mod.slug}:`, error.message);
    else console.log(`✓ Module: ${mod.title}`);
  }
}

async function seedModuleContent(slug: string) {
  const contentPath = path.join(seedDir, slug, 'content.json');
  if (!fs.existsSync(contentPath)) {
    console.log(`  Skipping ${slug} :  no content.json`);
    return;
  }

  const { data: mod } = await supabase.from('modules').select('id').eq('slug', slug).single();
  if (!mod) {
    console.error(`  Module not found: ${slug}`);
    return;
  }

  const content: SeedModuleContent = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

  for (const item of content.items) {
    let quizId: string | null = null;

    if (item.quizFile) {
      const quizData = loadQuiz(slug, item.quizFile, item.title);

      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          title: quizData.title,
          passing_score: quizData.passingScore ?? 70,
        })
        .select()
        .single();

      if (quizError) {
        console.error(`  Quiz error:`, quizError.message);
        continue;
      }

      quizId = quiz.id;

      for (let i = 0; i < quizData.questions.length; i++) {
        const q = quizData.questions[i];
        await supabase.from('quiz_questions').insert({
          quiz_id: quizId,
          order_index: i + 1,
          question_text: q.question,
          options: q.options,
          correct_answer: q.correctAnswer,
        });
      }
    }

    const driveUrl =
      item.driveUrl && !item.driveUrl.includes('PLACEHOLDER')
        ? toDrivePreviewUrl(item.driveUrl)
        : item.driveUrl?.includes('PLACEHOLDER')
        ? item.driveUrl
        : null;

    const { error: itemError } = await supabase.from('content_items').insert({
      module_id: mod.id,
      order_index: item.order,
      type: item.type,
      title: item.title,
      drive_url: driveUrl,
      quiz_id: quizId,
      estimated_duration_minutes: item.estimatedDurationMinutes ?? null,
      unit_label: item.unitLabel ?? null,
      unit_order: item.unitOrder ?? null,
    });

    if (itemError) console.error(`  Item ${item.title}:`, itemError.message);
    else console.log(`  ✓ ${item.title}`);
  }
}

async function main() {
  console.log('Seeding LMS curriculum...\n');

  if (shouldReset) {
    await resetLmsTables();
  }

  await seedModules();

  const moduleDirs = fs
    .readdirSync(seedDir)
    .filter((d) => d.startsWith('modul-'))
    .sort();

  for (const slug of moduleDirs) {
    console.log(`\nSeeding ${slug}...`);
    await seedModuleContent(slug);
  }

  console.log('\nDone!');
}

main().catch(console.error);
