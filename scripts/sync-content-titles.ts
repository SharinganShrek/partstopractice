import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import type { SeedModuleContent } from '../lib/lms/types';

config({ path: '.env.local' });

const MODULE_SLUGS = ['modul-1', 'modul-2', 'modul-3', 'modul-4', 'modul-5', 'modul-6'];

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  for (const slug of MODULE_SLUGS) {
    const contentPath = path.join('lib/lms/seed', slug, 'content.json');
    if (!fs.existsSync(contentPath)) continue;

    const content: SeedModuleContent = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    const { data: mod } = await supabase.from('modules').select('id').eq('slug', slug).single();
    if (!mod) continue;

    for (const item of content.items) {
      const { data: rows } = await supabase
        .from('content_items')
        .select('id, quiz_id')
        .eq('module_id', mod.id)
        .eq('order_index', item.order);

      const row = rows?.[0];
      if (!row) continue;

      await supabase.from('content_items').update({ title: item.title }).eq('id', row.id);

      if (item.quizFile && row.quiz_id) {
        const quizPath = path.join('lib/lms/seed', slug, item.quizFile);
        if (fs.existsSync(quizPath)) {
          const quiz = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
          await supabase
            .from('quizzes')
            .update({ title: quiz.title })
            .eq('id', row.quiz_id);
        }
      }

      console.log(`✓ ${slug} #${item.order}: ${item.title}`);
    }
  }
}

main().catch(console.error);
