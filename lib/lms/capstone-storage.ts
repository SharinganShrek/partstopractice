import type { SupabaseClient } from '@supabase/supabase-js';

export const CAPSTONE_BUCKET = 'capstone-submissions';

const MAX_INO_BYTES = 512 * 1024;

export function validateCapstoneInoFile(file: File): string | null {
  if (!file.name.toLowerCase().endsWith('.ino')) {
    return 'Dosya .ino uzantılı olmalıdır (Arduino sketch).';
  }
  if (file.size === 0) {
    return 'Dosya boş olamaz.';
  }
  if (file.size > MAX_INO_BYTES) {
    return 'Dosya en fazla 512 KB olabilir.';
  }
  return null;
}

export function capstoneInoPath(userId: string, contentItemId: string, fileName: string): string {
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `${userId}/${contentItemId}/${safeName}`;
}

export async function getCapstoneFileSignedUrl(
  supabase: SupabaseClient,
  filePath: string | null | undefined
): Promise<string | null> {
  if (!filePath) return null;
  const { data } = await supabase.storage.from(CAPSTONE_BUCKET).createSignedUrl(filePath, 3600);
  return data?.signedUrl ?? null;
}

export async function readCapstoneFileText(
  supabase: SupabaseClient,
  filePath: string | null | undefined,
  maxChars = 50_000
): Promise<string | null> {
  if (!filePath) return null;
  const { data, error } = await supabase.storage.from(CAPSTONE_BUCKET).download(filePath);
  if (error || !data) return null;
  const text = await data.text();
  return text.length > maxChars ? `${text.slice(0, maxChars)}\n\n… (kısaltıldı)` : text;
}
