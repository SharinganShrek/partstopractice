import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const BUCKET = 'course-videos';
const OBJECT_PATH = 'modul-6/tinkercad-linki-nasil-alinir.mp4';
const LOCAL_FILE = path.join(
  process.cwd(),
  'content/drive-import/tinkercad-linki-nasil-alinir-compressed.mp4'
);

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (!fs.existsSync(LOCAL_FILE)) {
    console.error('Missing processed video:', LOCAL_FILE);
    console.error('Run ffmpeg to create the muted file first.');
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(LOCAL_FILE);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(OBJECT_PATH, fileBuffer, {
      contentType: 'video/mp4',
      upsert: true,
    });

  if (uploadError) {
    console.error('Upload failed:', uploadError.message);
    process.exit(1);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(OBJECT_PATH);
  console.log('Public URL:', data.publicUrl);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
