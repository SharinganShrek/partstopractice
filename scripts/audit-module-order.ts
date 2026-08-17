import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const MODULE_SLUGS = ['modul-1', 'modul-2', 'modul-3', 'modul-4', 'modul-5', 'modul-6'];

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const issues: string[] = [];

  for (const slug of MODULE_SLUGS) {
    const contentPath = path.join('lib/lms/seed', slug, 'content.json');
    const seed = fs.existsSync(contentPath)
      ? (JSON.parse(fs.readFileSync(contentPath, 'utf8')).items as Array<{
          order: number;
          type: string;
          title: string;
        }>)
      : [];

    const { data: mod } = await supabase.from('modules').select('id, title').eq('slug', slug).single();
    if (!mod) {
      issues.push(`${slug}: modül DB'de yok`);
      continue;
    }

    const { data: dbItems } = await supabase
      .from('content_items')
      .select('order_index, type, title, unit_label, unit_order')
      .eq('module_id', mod.id)
      .order('order_index');

    console.log(`\n=== ${mod.title} (${slug}) ===`);
    console.log(`Seed: ${seed.length} | DB: ${dbItems?.length ?? 0}`);

    if (seed.length !== (dbItems?.length ?? 0)) {
      issues.push(`${slug}: seed (${seed.length}) ≠ DB (${dbItems?.length ?? 0})`);
    }

    const maxSeed = seed.length ? Math.max(...seed.map((i) => i.order)) : 0;
    const seedOrders = seed.map((i) => i.order).sort((a, b) => a - b);
    const expectedSeed = Array.from({ length: seed.length }, (_, i) => i + 1);
    if (JSON.stringify(seedOrders) !== JSON.stringify(expectedSeed)) {
      issues.push(`${slug}: seed order_index boşluk/tekrar var → [${seedOrders.join(', ')}]`);
    }

    const dbOrders = (dbItems ?? []).map((i) => i.order_index);
    const dbSorted = [...dbOrders].sort((a, b) => a - b);
    for (let i = 1; i < dbSorted.length; i++) {
      if (dbSorted[i] === dbSorted[i - 1]) {
        issues.push(`${slug}: DB'de tekrarlayan order_index ${dbSorted[i]}`);
      }
    }

    const maxDb = dbOrders.length ? Math.max(...dbOrders) : 0;
    if (dbItems?.length && dbSorted.length !== new Set(dbSorted).size) {
      issues.push(`${slug}: DB order_index çakışması`);
    }

    console.log('  #  | Seed order | DB order | Type              | Title');
    console.log('  ---+------------+----------+-------------------+------');
    const rows = Math.max(seed.length, dbItems?.length ?? 0);
    for (let i = 0; i < rows; i++) {
      const s = seed[i];
      const d = dbItems?.[i];
      const orderMatch = s && d ? s.order === d.order_index : !s || !d;
      const titleMatch = s && d ? s.title === d.title : !s || !d;
      const typeMatch = s && d ? s.type === d.type : !s || !d;
      const flag = orderMatch && titleMatch && typeMatch ? '✓' : '✗';
      console.log(
        `  ${String(i + 1).padStart(2)} | ${String(s?.order ?? '-').padStart(10)} | ${String(d?.order_index ?? '-').padStart(8)} | ${(d?.type ?? s?.type ?? '-').padEnd(17)} | ${flag} ${d?.title ?? s?.title ?? '-'}`
      );
      if (!orderMatch && s && d) issues.push(`${slug}: sıra ${i + 1} seed order ${s.order} ≠ DB ${d.order_index}`);
      if (!titleMatch && s && d) issues.push(`${slug}: sıra ${i + 1} başlık uyuşmuyor`);
      if (!typeMatch && s && d) issues.push(`${slug}: sıra ${i + 1} tip uyuşmuyor (${s.type} vs ${d.type})`);
    }

    if (dbItems?.length && dbSorted.some((o, i) => i > 0 && o - dbSorted[i - 1] > 1)) {
      const gaps = dbSorted.filter((o, i) => i > 0 && o - dbSorted[i - 1] > 1);
      if (gaps.length) {
        issues.push(`${slug}: DB order_index boşlukları var → [${dbOrders.join(', ')}]`);
      }
    }

    void maxSeed;
    void maxDb;
  }

  console.log('\n=== ÖZET ===');
  if (issues.length === 0) {
    console.log('Tüm modüllerde seed ↔ DB sıralaması tutarlı.');
  } else {
    console.log(`${issues.length} sorun bulundu:`);
    issues.forEach((issue) => console.log(`  - ${issue}`));
  }
}

main().catch(console.error);
