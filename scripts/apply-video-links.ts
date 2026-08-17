import * as fs from 'fs';
import * as path from 'path';
import {
  ensureContentDir,
  MODULE_SLUGS,
  normalizeDriveUrl,
  readCsv,
  URL_CSV_PATH,
  URL_TEMPLATE_PATH,
  writeCsv,
} from './lib/drive-import-utils';

const VIDEO_LINKS_PATH = path.join(process.cwd(), 'content/video-links.json');

interface VideoLinkEntry {
  title?: string;
  driveUrl: string;
}

type VideoLinksFile = Record<string, VideoLinkEntry | string>;

function loadVideoLinks(): Map<string, string> {
  if (!fs.existsSync(VIDEO_LINKS_PATH)) {
    console.error(`Missing ${VIDEO_LINKS_PATH}`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(VIDEO_LINKS_PATH, 'utf-8')) as VideoLinksFile;
  const map = new Map<string, string>();

  for (const slug of MODULE_SLUGS) {
    const moduleData = raw[slug];
    if (!moduleData || typeof moduleData === 'string') continue;

    for (const [slotKey, entry] of Object.entries(moduleData)) {
      if (slotKey.startsWith('_')) continue;
      const driveUrl = typeof entry === 'string' ? entry : entry.driveUrl;
      const normalized = normalizeDriveUrl(driveUrl ?? '');
      if (normalized) {
        map.set(`${slug}:${slotKey}`, normalized);
      }
    }
  }

  return map;
}

function syncCsv(videoLinks: Map<string, string>) {
  const templatePath = fs.existsSync(URL_CSV_PATH) ? URL_CSV_PATH : URL_TEMPLATE_PATH;
  const rows = readCsv(templatePath);

  const updatedRows = rows.map((row) => {
    const key = `${row.module_slug}:${row.slot_key}`;
    if (!row.slot_key?.startsWith('video_')) return row;
    const url = videoLinks.get(key);
    if (url) {
      return { ...row, drive_url: url };
    }
    return row;
  });

  for (const [key, url] of videoLinks) {
    const exists = updatedRows.some((row) => `${row.module_slug}:${row.slot_key}` === key);
    if (!exists) {
      const [module_slug, slot_key] = key.split(':');
      updatedRows.push({
        module_slug,
        slot_key,
        local_filename: '',
        drive_url: url,
      });
    }
  }

  writeCsv(updatedRows, URL_CSV_PATH);
  return updatedRows.filter((r) => r.drive_url).length;
}

function main() {
  ensureContentDir();
  const videoLinks = loadVideoLinks();

  if (videoLinks.size === 0) {
    console.log('Henüz video linki yok.');
    console.log(`Lütfen ${VIDEO_LINKS_PATH} dosyasına Drive linklerini ekleyin.`);
    console.log('Örnek: "modul-1" > "video_u11" > "driveUrl": "https://drive.google.com/file/d/..."');
    process.exit(0);
  }

  const count = syncCsv(videoLinks);
  console.log(`✓ ${count} video linki content/drive-urls.csv dosyasına yazıldı.`);
  console.log('Şimdi çalıştırın: npm run merge:drive && npm run seed:lms -- --reset');
}

main();
