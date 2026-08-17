import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

config({ path: '.env.local' });

async function main() {
  const quizPath = process.argv[2];
  const titleMatch = process.argv[3];

  if (!quizPath || !titleMatch) {
    console.error('Usage: npx tsx scripts/update-quiz.ts <quiz-json-path> <title-search>');
    console.error('Example: npx tsx scripts/update-quiz.ts lib/lms/seed/modul-1/quizzes/odev-1-2.json "Ödev 1.2"');
    process.exit(1);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const quizData = JSON.parse(fs.readFileSync(quizPath, 'utf8'));

  const { data: items } = await supabase
    .from('content_items')
    .select('id, quiz_id, title')
    .ilike('title', `%${titleMatch}%`);

  console.log('Content items:', items);
  if (!items?.[0]?.quiz_id) {
    console.log('No quiz_id found');
    process.exit(1);
  }

  const quizId = items[0].quiz_id;
  await supabase.from('quiz_questions').delete().eq('quiz_id', quizId);

  for (let i = 0; i < quizData.questions.length; i++) {
    const q = quizData.questions[i];
    const { error } = await supabase.from('quiz_questions').insert({
      quiz_id: quizId,
      order_index: i + 1,
      question_text: q.question,
      options: q.options,
      correct_answer: q.correctAnswer,
    });
    if (error) console.error('Insert error', error.message);
  }

  await supabase
    .from('quizzes')
    .update({ title: quizData.title, passing_score: quizData.passingScore })
    .eq('id', quizId);

  const { data: qs } = await supabase
    .from('quiz_questions')
    .select('order_index, question_text, correct_answer')
    .eq('quiz_id', quizId)
    .order('order_index');

  console.log(`Updated ${qs?.length} questions for quiz ${quizId}`);
  qs?.forEach((q) =>
    console.log(`${q.order_index}. [${q.correct_answer}] ${q.question_text.slice(0, 55)}...`)
  );
}

main().catch(console.error);
