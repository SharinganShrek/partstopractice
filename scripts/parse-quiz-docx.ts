import * as fs from 'fs';
import * as path from 'path';
import mammoth from 'mammoth';
import {
  buildSlotMappings,
  ensureContentDir,
  getQuizDocxForSlot,
  IMPORT_DIR,
  MODULE_SLUGS,
  QUIZ_REVIEW_DIR,
  SEED_DIR,
  walkImportFiles,
} from './lib/drive-import-utils';
import { parseQuizText } from './lib/parse-quiz-text';

async function extractDocxText(filePath: string): Promise<string> {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

async function main() {
  ensureContentDir();
  fs.mkdirSync(QUIZ_REVIEW_DIR, { recursive: true });

  if (!fs.existsSync(IMPORT_DIR)) {
    console.warn(`Import klasörü bulunamadı: ${IMPORT_DIR}`);
    console.warn('Drive klasörünü content/drive-import/ altına indirin, sonra tekrar çalıştırın.');
    process.exit(0);
  }

  const files = walkImportFiles();
  if (files.length === 0) {
    console.warn('Import klasöründe dosya bulunamadı.');
    process.exit(0);
  }
  let parsedCount = 0;
  let reviewCount = 0;

  for (const slug of MODULE_SLUGS) {
    const quizSlots = buildSlotMappings(slug).filter(
      (s) => s.contentType === 'topic_quiz' || s.contentType === 'module_assessment'
    );

    for (const slot of quizSlots) {
      if (!slot.quizFile) continue;

      const docxPath = getQuizDocxForSlot(files, slug, slot.slotKey);
      const outputPath = path.join(SEED_DIR, slug, slot.quizFile);

      if (!docxPath) {
        console.log(`  ⚠ ${slug}/${slot.slotKey}: .docx bulunamadı (${slot.title})`);
        continue;
      }

      const rawText = await extractDocxText(docxPath);
      const parsed = parseQuizText(rawText, slot.title);

      if (parsed.confidence === 'low' || parsed.quiz.questions.length === 0) {
        const reviewBase = path.join(QUIZ_REVIEW_DIR, `${slug}-${slot.slotKey}`);
        fs.writeFileSync(`${reviewBase}.txt`, rawText, 'utf-8');
        fs.writeFileSync(`${reviewBase}.json`, JSON.stringify(parsed.quiz, null, 2), 'utf-8');
        reviewCount++;
        console.log(`  ⚠ Review needed: ${slug}/${slot.slotKey} (${parsed.issues.join('; ')})`);
        continue;
      }

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, JSON.stringify(parsed.quiz, null, 2), 'utf-8');
      parsedCount++;
      console.log(
        `  ✓ ${slug}/${slot.quizFile} (${parsed.quiz.questions.length} soru, ${parsed.confidence})`
      );

      if (parsed.issues.length > 0) {
        console.log(`    Notes: ${parsed.issues.join('; ')}`);
      }
    }
  }

  console.log(`\nParsed ${parsedCount} quiz files. ${reviewCount} need manual review in content/quiz-review/.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
