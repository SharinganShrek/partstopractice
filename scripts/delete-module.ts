import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

async function main() {
  const slug = process.argv[2] ?? 'modul-6';
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: mod, error: modError } = await supabase
    .from('modules')
    .select('id, title')
    .eq('slug', slug)
    .single();

  if (modError || !mod) {
    console.log(`Module "${slug}" not found in database.`);
    return;
  }

  const { data: items } = await supabase
    .from('content_items')
    .select('id, title, quiz_id')
    .eq('module_id', mod.id);

  const quizIds = (items ?? [])
    .map((item) => item.quiz_id)
    .filter((id): id is string => Boolean(id));

  const { error: deleteModError } = await supabase.from('modules').delete().eq('id', mod.id);

  if (deleteModError) {
    console.error('Failed to delete module:', deleteModError.message);
    process.exit(1);
  }

  for (const quizId of quizIds) {
    await supabase.from('quiz_questions').delete().eq('quiz_id', quizId);
    await supabase.from('quizzes').delete().eq('id', quizId);
  }

  console.log(`Removed module "${mod.title}" (${slug})`);
  console.log(`  content items: ${items?.length ?? 0}`);
  console.log(`  orphaned quizzes cleaned: ${quizIds.length}`);
}

main().catch(console.error);
