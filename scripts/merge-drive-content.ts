import * as fs from 'fs';
import * as path from 'path';
import {
  applyDriveUrlToItem,
  buildSlotMappings,
  ensureContentDir,
  MODULE_SLUGS,
  normalizeDriveUrl,
  readCsv,
  REPORT_PATH,
  SEED_DIR,
  URL_CSV_PATH,
  URL_TEMPLATE_PATH,
} from './lib/drive-import-utils';
import type { SeedContentItem, SeedModuleContent } from '../lib/lms/types';

const LEGACY_QUIZ_FILES = ['quizzes/konu-1.json', 'quizzes/modul-sonu.json'];

function slotKeyForItem(slug: string, item: SeedContentItem): string | null {
  const modNum = Number(slug.split('-')[1]);
  if (item.type === 'video' && item.unitOrder) return `video_u${modNum}${item.unitOrder}`;
  if (item.type === 'reading' && item.unitOrder) return `reading_u${modNum}${item.unitOrder}`;
  return null;
}

function loadUrlMap(): Map<string, string> {
  const csvPath = fs.existsSync(URL_CSV_PATH) ? URL_CSV_PATH : URL_TEMPLATE_PATH;
  const rows = readCsv(csvPath);
  const map = new Map<string, string>();

  for (const row of rows) {
    const key = `${row.module_slug}:${row.slot_key}`;
    const url = normalizeDriveUrl(row.drive_url ?? '');
    if (url) map.set(key, url);
  }
  return map;
}

function removeLegacyQuizFiles() {
  for (const slug of MODULE_SLUGS) {
    for (const legacy of LEGACY_QUIZ_FILES) {
      const filePath = path.join(SEED_DIR, slug, legacy);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`  Removed legacy quiz: ${slug}/${legacy}`);
      }
    }
  }
}

function main() {
  ensureContentDir();
  const urlMap = loadUrlMap();
  const warnings: string[] = [];
  let updatedCount = 0;

  if (urlMap.size === 0) {
    console.warn('No drive URLs found. Fill content/drive-urls.csv before merging.');
  }

  for (const slug of MODULE_SLUGS) {
    const contentPath = path.join(SEED_DIR, slug, 'content.json');
    const content: SeedModuleContent = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

    content.items = content.items.map((item) => {
      const slotKey = slotKeyForItem(slug, item);
      if (!slotKey || !item.driveUrl) return item;

      const url = urlMap.get(`${slug}:${slotKey}`);
      if (!url) {
        if (item.driveUrl.includes('PLACEHOLDER')) {
          warnings.push(`${slug}:${slotKey} :  Drive URL eksik`);
        }
        return item;
      }

      updatedCount++;
      return applyDriveUrlToItem(item, url);
    });

    fs.writeFileSync(contentPath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
    console.log(`✓ Updated ${slug}/content.json`);
  }

  removeLegacyQuizFiles();

  const report = fs.existsSync(REPORT_PATH)
    ? JSON.parse(fs.readFileSync(REPORT_PATH, 'utf-8'))
    : { warnings: [] };
  report.mergeWarnings = warnings;
  report.mergedAt = new Date().toISOString();
  report.updatedDriveUrls = updatedCount;
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8');

  console.log(`\nMerged ${updatedCount} Drive URLs into content.json files.`);

  if (warnings.length > 0) {
    console.log('\nMissing URLs:');
    for (const warning of warnings) {
      console.log(`  - ${warning}`);
    }
  }
}

main();
