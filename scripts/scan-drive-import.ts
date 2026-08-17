import * as fs from 'fs';
import {
  MODULE_SLUGS,
  assignSequentialSlots,
  buildSlotMappings,
  classifyFile,
  ensureContentDir,
  findModuleFolders,
  IMPORT_DIR,
  ImportReport,
  REPORT_PATH,
  slotToLocalFilename,
  URL_TEMPLATE_PATH,
  walkImportFiles,
  writeCsv,
} from './lib/drive-import-utils';

function main() {
  ensureContentDir();

  const importDirExists = fs.existsSync(IMPORT_DIR);
  const moduleFolders = findModuleFolders();
  const files = walkImportFiles();
  const warnings: string[] = [];

  if (!importDirExists) {
    warnings.push(
      `Import klasörü bulunamadı: ${IMPORT_DIR}. Drive klasörünü indirip buraya koyun.`
    );
  } else if (moduleFolders.size === 0) {
    warnings.push(
      'Import klasörü boş veya Modül 1-5 alt klasörleri tanınmadı. Klasör adları "Modül 1" formatında olmalı.'
    );
  }

  const report: ImportReport = {
    scannedAt: new Date().toISOString(),
    importDirExists,
    modules: {},
    warnings,
  };

  const csvRows: Array<Record<string, string>> = [];

  for (const slug of MODULE_SLUGS) {
    const folderName = moduleFolders.get(slug) ?? null;
    const moduleFiles = files.filter((f) => f.moduleSlug === slug);
    const slots = buildSlotMappings(slug).filter(
      (s) => s.contentType === 'video' || s.contentType === 'reading'
    );
    const sequentialVideo = assignSequentialSlots(files, slug, 'video');
    const sequentialReading = assignSequentialSlots(files, slug, 'reading');

    const moduleReport = {
      folderName,
      files: moduleFiles.map((file) => {
        const classification = classifyFile(file);
        return {
          relativePath: file.relativePath,
          guessedType: classification.guessedType,
          suggestedSlot: classification.suggestedSlot,
          confidence: classification.confidence,
        };
      }),
      unmatched: [] as string[],
    };

    for (const file of moduleFiles) {
      const classification = classifyFile(file);
      if (classification.confidence === 'none' || classification.confidence === 'low') {
        moduleReport.unmatched.push(file.relativePath);
      }
    }

    report.modules[slug] = moduleReport;

    for (const slot of slots) {
      const localFilename =
        slotToLocalFilename(files, slug, slot.slotKey) ??
        (slot.contentType === 'video'
          ? sequentialVideo.get(slot.slotKey)
          : sequentialReading.get(slot.slotKey)) ??
        '';

      csvRows.push({
        module_slug: slug,
        slot_key: slot.slotKey,
        local_filename: localFilename,
        drive_url: '',
      });

      if (!localFilename) {
        warnings.push(`${slug}: "${slot.slotKey}" için yerel dosya bulunamadı (${slot.title})`);
      }
    }
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8');
  writeCsv(csvRows, URL_TEMPLATE_PATH);

  console.log('Drive import scan complete.\n');
  console.log(`  Files found: ${files.length}`);
  console.log(`  Module folders: ${moduleFolders.size}`);
  console.log(`  Report: ${REPORT_PATH}`);
  console.log(`  URL template: ${URL_TEMPLATE_PATH}`);

  if (warnings.length > 0) {
    console.log('\nWarnings:');
    for (const warning of warnings) {
      console.log(`  - ${warning}`);
    }
  }

  if (!fs.existsSync(URL_TEMPLATE_PATH.replace('.template', ''))) {
    console.log('\nNext: copy drive-urls.template.csv to drive-urls.csv and add Drive share links.');
  }
}

main();
