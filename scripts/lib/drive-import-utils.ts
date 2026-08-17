import * as fs from 'fs';
import * as path from 'path';
import { extractDriveFileId, isValidDriveUrl } from '../../lib/lms/drive';
import type { SeedContentItem, SeedModuleContent } from '../../lib/lms/types';

export const ROOT = process.cwd();
export const IMPORT_DIR = path.join(ROOT, 'content/drive-import');
export const SEED_DIR = path.join(ROOT, 'lib/lms/seed');
export const CONTENT_DIR = path.join(ROOT, 'content');
export const REPORT_PATH = path.join(CONTENT_DIR, 'import-report.json');
export const URL_TEMPLATE_PATH = path.join(CONTENT_DIR, 'drive-urls.template.csv');
export const URL_CSV_PATH = path.join(CONTENT_DIR, 'drive-urls.csv');
export const QUIZ_REVIEW_DIR = path.join(CONTENT_DIR, 'quiz-review');

export const MODULE_SLUGS = ['modul-1', 'modul-2', 'modul-3', 'modul-4', 'modul-5'] as const;
export type ModuleSlug = (typeof MODULE_SLUGS)[number];

export interface DriveFileEntry {
  relativePath: string;
  fileName: string;
  extension: string;
  moduleSlug: ModuleSlug | null;
}

export interface SlotMapping {
  moduleSlug: ModuleSlug;
  slotKey: string;
  contentType: 'video' | 'reading' | 'topic_quiz' | 'module_assessment';
  title: string;
  quizFile?: string;
  unitOrder?: number;
}

export interface ImportReport {
  scannedAt: string;
  importDirExists: boolean;
  modules: Record<
    string,
    {
      folderName: string | null;
      files: Array<{
        relativePath: string;
        guessedType: string;
        suggestedSlot: string | null;
        confidence: 'high' | 'medium' | 'low' | 'none';
      }>;
      unmatched: string[];
    }
  >;
  warnings: string[];
}

const MODULE_FOLDER_PATTERNS: Array<{ slug: ModuleSlug; patterns: RegExp[] }> = [
  { slug: 'modul-1', patterns: [/^mod[uü]l[\s_-]*1$/i, /^module[\s_-]*1$/i] },
  { slug: 'modul-2', patterns: [/^mod[uü]l[\s_-]*2$/i, /^module[\s_-]*2$/i] },
  { slug: 'modul-3', patterns: [/^mod[uü]l[\s_-]*3$/i, /^module[\s_-]*3$/i] },
  { slug: 'modul-4', patterns: [/^mod[uü]l[\s_-]*4$/i, /^module[\s_-]*4$/i] },
  { slug: 'modul-5', patterns: [/^mod[uü]l[\s_-]*5$/i, /^module[\s_-]*5$/i] },
];

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function moduleSlugFromFolderName(folderName: string): ModuleSlug | null {
  const normalized = normalizeText(folderName);
  for (const entry of MODULE_FOLDER_PATTERNS) {
    if (entry.patterns.some((p) => p.test(normalized) || p.test(folderName))) {
      return entry.slug;
    }
  }
  return null;
}

export function moduleNumberFromSlug(slug: ModuleSlug): number {
  return Number(slug.split('-')[1]);
}

export function loadModuleContent(slug: ModuleSlug): SeedModuleContent {
  const filePath = path.join(SEED_DIR, slug, 'content.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function buildSlotMappings(slug: ModuleSlug): SlotMapping[] {
  const content = loadModuleContent(slug);
  const modNum = moduleNumberFromSlug(slug);
  const slots: SlotMapping[] = [];

  for (const item of content.items) {
    if (item.type === 'video' && item.unitOrder) {
      slots.push({
        moduleSlug: slug,
        slotKey: `video_u${modNum}${item.unitOrder}`,
        contentType: 'video',
        title: item.title,
        unitOrder: item.unitOrder,
      });
    } else if (item.type === 'reading' && item.unitOrder) {
      slots.push({
        moduleSlug: slug,
        slotKey: `reading_u${modNum}${item.unitOrder}`,
        contentType: 'reading',
        title: item.title,
        unitOrder: item.unitOrder,
      });
    } else if (item.type === 'topic_quiz' && item.quizFile) {
      const match = item.quizFile.match(/odev-(\d+)-(\d+)\.json$/);
      const slotKey = match ? `quiz_odev_${match[1]}_${match[2]}` : `quiz_${item.order}`;
      slots.push({
        moduleSlug: slug,
        slotKey,
        contentType: 'topic_quiz',
        title: item.title,
        quizFile: item.quizFile,
        unitOrder: item.unitOrder,
      });
    } else if (item.type === 'module_assessment' && item.quizFile) {
      slots.push({
        moduleSlug: slug,
        slotKey: `quiz_modul_sinavi_${modNum}`,
        contentType: 'module_assessment',
        title: item.title,
        quizFile: item.quizFile,
      });
    }
  }

  return slots;
}

export function walkImportFiles(): DriveFileEntry[] {
  if (!fs.existsSync(IMPORT_DIR)) return [];

  const results: DriveFileEntry[] = [];

  function walk(currentDir: string, relativeParts: string[]) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const nextRelative = [...relativeParts, entry.name];
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, nextRelative);
        continue;
      }
      if (entry.name.startsWith('.')) continue;
      const ext = path.extname(entry.name).toLowerCase();
      const moduleSlug =
        relativeParts.length > 0 ? moduleSlugFromFolderName(relativeParts[0]) : null;
      results.push({
        relativePath: nextRelative.join('/'),
        fileName: entry.name,
        extension: ext,
        moduleSlug,
      });
    }
  }

  walk(IMPORT_DIR, []);
  return results;
}

function isQuizDocx(fileName: string): boolean {
  const n = normalizeText(path.parse(fileName).name);
  return (
    n.includes('odev') ||
    n.includes('onu sonu') ||
    n.includes('konu sonu') ||
    n.includes('degerlendirme') ||
    n.includes('testi') ||
    n.includes('sorular') ||
    n.includes('sinav') ||
    n.includes('soru') ||
    /\b\d+\.\d+\b/.test(n) ||
    /\bunite\s*\d/.test(n) ||
    /\bmodul\b/.test(n)
  );
}

function isReadingFile(fileName: string): boolean {
  const n = normalizeText(path.parse(fileName).name);
  return (
    n.includes('okuma') ||
    n.includes('reading') ||
    n.includes('materyal') ||
    n.includes('ders notu') ||
    n.includes('not ')
  );
}

export function classifyFile(entry: DriveFileEntry): {
  guessedType: 'video' | 'reading' | 'quiz_docx' | 'other';
  suggestedSlot: string | null;
  confidence: 'high' | 'medium' | 'low' | 'none';
} {
  if (!entry.moduleSlug) {
    return { guessedType: 'other', suggestedSlot: null, confidence: 'none' };
  }

  const modNum = moduleNumberFromSlug(entry.moduleSlug);
  const baseName = normalizeText(path.parse(entry.fileName).name);

  if (
    entry.extension === '.mp4' ||
    entry.extension === '.mov' ||
    entry.extension === '.webm' ||
    entry.extension === '.ders'
  ) {
    const unitMatch =
      baseName.match(/(?:unite|unit|u|ders)?[\s_-]*(\d)[\s_.-]*(\d)?/) ??
      baseName.match(/\b(\d)\.(\d)\b/) ??
      baseName.match(/(\d)\s*ders/);
    if (unitMatch) {
      const unit = unitMatch[2] ?? unitMatch[1];
      return {
        guessedType: 'video',
        suggestedSlot: `video_u${modNum}${unit}`,
        confidence: 'high',
      };
    }
    return { guessedType: 'video', suggestedSlot: null, confidence: 'low' };
  }

  if (entry.extension === '.docx' && isQuizDocx(entry.fileName)) {
    if (baseName.includes('degerlendirme testi') || baseName.includes('modul sinavi')) {
      return {
        guessedType: 'quiz_docx',
        suggestedSlot: `quiz_modul_sinavi_${modNum}`,
        confidence: 'high',
      };
    }
    if (baseName.includes('1 2') || baseName.includes('1.2') || baseName.includes('unite 1 2')) {
      return {
        guessedType: 'quiz_docx',
        suggestedSlot: `quiz_odev_${modNum}_2`,
        confidence: 'high',
      };
    }
    const odevMatch =
      baseName.match(/(?:odev|onu|konu|unite)[\s_-]*(\d)[\s_.-]*(\d)/) ??
      baseName.match(/unite\s*(\d)(?:\s|$)/) ??
      baseName.match(/\b(\d)\.(\d)\b/);
    if (odevMatch && !baseName.includes('sinav') && !baseName.includes('modul sinavi')) {
      const mod = odevMatch[2] ? odevMatch[1] : String(modNum);
      const unit = odevMatch[2] ?? odevMatch[1];
      return {
        guessedType: 'quiz_docx',
        suggestedSlot: `quiz_odev_${mod}_${unit}`,
        confidence: 'high',
      };
    }
    return { guessedType: 'quiz_docx', suggestedSlot: null, confidence: 'medium' };
  }

  if (
    entry.extension === '.pdf' ||
    entry.extension === '.docx' ||
    entry.extension === '.pptx'
  ) {
    if (isReadingFile(entry.fileName) || !isQuizDocx(entry.fileName)) {
      const unitMatch = baseName.match(/(?:unite|unit|okuma)?[\s_-]*(\d)[\s_.-]*(\d)?/) ??
        baseName.match(/\b(\d)\.(\d)\b/);
      if (unitMatch) {
        const unit = unitMatch[2] ?? unitMatch[1];
        return {
          guessedType: 'reading',
          suggestedSlot: `reading_u${modNum}${unit}`,
          confidence: isReadingFile(entry.fileName) ? 'high' : 'medium',
        };
      }
      return { guessedType: 'reading', suggestedSlot: null, confidence: 'low' };
    }
  }

  return { guessedType: 'other', suggestedSlot: null, confidence: 'none' };
}

export function findModuleFolders(): Map<ModuleSlug, string> {
  const map = new Map<ModuleSlug, string>();
  if (!fs.existsSync(IMPORT_DIR)) return map;

  for (const entry of fs.readdirSync(IMPORT_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = moduleSlugFromFolderName(entry.name);
    if (slug) map.set(slug, entry.name);
  }
  return map;
}

export function slotToLocalFilename(
  files: DriveFileEntry[],
  moduleSlug: ModuleSlug,
  slotKey: string
): string | null {
  for (const file of files) {
    if (file.moduleSlug !== moduleSlug) continue;
    const classification = classifyFile(file);
    if (classification.suggestedSlot === slotKey) {
      return file.relativePath;
    }
  }
  return null;
}

export function ensureContentDir() {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

export function writeCsv(rows: Array<Record<string, string>>, filePath: string) {
  const headers = ['module_slug', 'slot_key', 'local_filename', 'drive_url'];
  const lines = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const value = row[h] ?? '';
          return value.includes(',') || value.includes('"')
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        })
        .join(',')
    ),
  ];
  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
}

export function readCsv(filePath: string): Array<Record<string, string>> {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, 'utf-8').trim();
  if (!text) return [];
  const [headerLine, ...dataLines] = text.split(/\r?\n/);
  const headers = headerLine.split(',').map((h) => h.trim());
  return dataLines
    .filter(Boolean)
    .map((line) => {
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === ',' && !inQuotes) {
          values.push(current);
          current = '';
        } else {
          current += ch;
        }
      }
      values.push(current);
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx]?.trim() ?? '';
      });
      return row;
    });
}

export function normalizeDriveUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (!isValidDriveUrl(trimmed)) return null;
  const fileId = extractDriveFileId(trimmed);
  return fileId ? `https://drive.google.com/file/d/${fileId}/view` : null;
}

export function applyDriveUrlToItem(item: SeedContentItem, driveUrl: string): SeedContentItem {
  return { ...item, driveUrl: normalizeDriveUrl(driveUrl) ?? driveUrl };
}

export function assignSequentialSlots(
  files: DriveFileEntry[],
  moduleSlug: ModuleSlug,
  contentType: 'video' | 'reading'
): Map<string, string> {
  const slots = buildSlotMappings(moduleSlug)
    .filter((s) => s.contentType === contentType && s.unitOrder)
    .sort((a, b) => (a.unitOrder ?? 0) - (b.unitOrder ?? 0));

  const candidates = files
    .filter((f) => f.moduleSlug === moduleSlug)
    .filter((f) => classifyFile(f).guessedType === contentType)
    .sort((a, b) => a.relativePath.localeCompare(b.relativePath, 'tr'));

  const map = new Map<string, string>();
  for (let i = 0; i < slots.length && i < candidates.length; i++) {
    map.set(slots[i].slotKey, candidates[i].relativePath);
  }
  return map;
}

export function getQuizDocxForSlot(
  files: DriveFileEntry[],
  moduleSlug: ModuleSlug,
  slotKey: string
): string | null {
  for (const file of files) {
    if (file.moduleSlug !== moduleSlug || file.extension !== '.docx') continue;
    const classification = classifyFile(file);
    if (classification.guessedType === 'quiz_docx' && classification.suggestedSlot === slotKey) {
      return path.join(IMPORT_DIR, file.relativePath);
    }
  }
  return null;
}
