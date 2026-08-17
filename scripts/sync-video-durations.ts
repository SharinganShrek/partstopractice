import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import { extractDriveFileId } from '../lib/lms/drive';

config({ path: '.env.local' });

async function fetchDriveDurationSeconds(fileId: string): Promise<number | null> {
  const response = await fetch(`https://drive.google.com/get_video_info?docid=${fileId}`);
  if (!response.ok) return null;

  const text = await response.text();
  const lengthMatch = text.match(/(?:^|&)(?:length_seconds|dur)=([\d.]+)/);
  if (!lengthMatch) return null;

  return Math.round(Number(lengthMatch[1]));
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

async function main() {
  const seedDir = path.join(process.cwd(), 'lib/lms/seed');
  const moduleSlugs = fs
    .readdirSync(seedDir)
    .filter((name) => fs.existsSync(path.join(seedDir, name, 'content.json')));

  const updates: Array<{
    moduleSlug: string;
    title: string;
    fileId: string;
    durationSeconds: number;
  }> = [];

  for (const moduleSlug of moduleSlugs) {
    const contentPath = path.join(seedDir, moduleSlug, 'content.json');
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8')) as {
      moduleSlug: string;
      items: Array<{ type: string; title: string; driveUrl?: string; durationSeconds?: number }>;
    };

    let changed = false;

    for (const item of content.items) {
      if (item.type !== 'video' || !item.driveUrl) continue;

      const fileId = extractDriveFileId(item.driveUrl);
      if (!fileId) {
        console.warn(`Skip (no file id): ${item.title}`);
        continue;
      }

      const durationSeconds = await fetchDriveDurationSeconds(fileId);
      if (!durationSeconds) {
        console.warn(`Skip (no duration): ${item.title}`);
        continue;
      }

      item.durationSeconds = durationSeconds;
      changed = true;
      updates.push({ moduleSlug, title: item.title, fileId, durationSeconds });
      console.log(
        `${moduleSlug} | ${item.title} | ${formatDuration(durationSeconds)} (${durationSeconds}s)`
      );
    }

    if (changed) {
      fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`, 'utf-8');
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.log('\nSeed updated. Supabase env missing, skipped DB sync.');
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  for (const update of updates) {
    const { data: videos, error: fetchError } = await supabase
      .from('content_items')
      .select('id, drive_url')
      .eq('type', 'video');

    if (fetchError) {
      console.error('Failed to load videos:', fetchError.message);
      break;
    }

    const match = (videos ?? []).find((video) => {
      const fileId = video.drive_url ? extractDriveFileId(video.drive_url) : null;
      return fileId === update.fileId;
    });

    if (!match) {
      console.warn(`DB row not found for ${update.title}`);
      continue;
    }

    const { error } = await supabase
      .from('content_items')
      .update({
        duration_seconds: update.durationSeconds,
        estimated_duration_minutes: Math.max(1, Math.round(update.durationSeconds / 60)),
      })
      .eq('id', match.id);

    if (error) {
      console.error(`DB update failed (${update.title}):`, error.message);
    }
  }

  console.log(`\nUpdated ${updates.length} videos in seed${updates.length ? ' and DB' : ''}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
