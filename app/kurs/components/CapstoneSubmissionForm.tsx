'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FileCode2, Upload, X } from 'lucide-react';
import type { AssignmentSubmission } from '@/lib/lms/types';
import { Badge } from '@/components/ui/badge';

interface CapstoneSubmissionFormProps {
  contentItemId: string;
  onSubmitted?: () => void;
}

const STATUS_LABELS: Record<string, string> = {
  submitted: 'Teslim Edildi',
  under_review: 'İnceleniyor',
  approved: 'Onaylandı',
  revision: 'Revizyon Gerekli',
};

export default function CapstoneSubmissionForm({
  contentItemId,
  onSubmitted,
}: CapstoneSubmissionFormProps) {
  const [inoFile, setInoFile] = useState<File | null>(null);
  const [existingFileName, setExistingFileName] = useState<string | null>(null);
  const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);
  const [submission, setSubmission] = useState<AssignmentSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/kurs/assignment?contentItemId=${contentItemId}`);
      if (response.ok) {
        const data = await response.json();
        setSubmission(data.submission);
        if (data.submission?.file_name) {
          setExistingFileName(data.submission.file_name);
        }
        if (data.fileUrl) {
          setExistingFileUrl(data.fileUrl);
        }
      }
      setLoading(false);
    }
    load();
  }, [contentItemId]);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.name.toLowerCase().endsWith('.ino')) {
      setError('Lütfen .ino uzantılı bir Arduino dosyası seçin.');
      return;
    }
    if (file.size > 512 * 1024) {
      setError('Dosya en fazla 512 KB olabilir.');
      return;
    }
    setError(null);
    setInoFile(file);
    setExistingFileName(null);
    setExistingFileUrl(null);
  }, []);

  function clearFile() {
    setInoFile(null);
    setExistingFileName(null);
    setExistingFileUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!inoFile && !submission?.file_path) {
      setError('.ino dosyanızı yükleyin.');
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append('contentItemId', contentItemId);
    if (inoFile) {
      formData.append('inoFile', inoFile);
    }

    const response = await fetch('/api/kurs/assignment', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setError(data.error ?? 'Teslim başarısız');
      return;
    }

    setSubmission(data.submission);
    setExistingFileName(data.submission?.file_name ?? null);
    setExistingFileUrl(data.fileUrl ?? null);
    setInoFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onSubmitted?.();
  }

  const displayName = inoFile?.name ?? existingFileName;
  const canEdit = !submission || submission.status === 'revision';

  if (loading) return <p className="text-text-muted text-sm">Yükleniyor...</p>;

  return (
    <div className="card p-6 md:p-8 shadow-md">
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-text-body mb-2">
          Bitirme Projesi: IMC Asenkron Mini-Hackathon
        </h2>
        <p className="text-text-muted text-sm leading-relaxed">
          Arduino projenizin <strong>.ino</strong> dosyasını yükleyin. Tesliminiz eğitmen tarafından
          incelenip onaylanacaktır.
        </p>
      </div>

      {submission && (
        <div className="mb-6 p-4 rounded-xl bg-surface-cream border border-border space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Durum:</span>
            <Badge variant="muted">{STATUS_LABELS[submission.status] ?? submission.status}</Badge>
          </div>
          {submission.feedback && (
            <p className="text-sm">
              <span className="font-medium">Geri bildirim:</span> {submission.feedback}
            </p>
          )}
        </div>
      )}

      {canEdit ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-text-body mb-3">
              <FileCode2 className="w-4 h-4 text-primary" />
              Arduino Proje Dosyası (.ino)
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".ino,text/plain"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />

            {displayName ? (
              <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-surface-cream">
                <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                  <FileCode2 className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-body truncate">{displayName}</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {inoFile
                      ? `${(inoFile.size / 1024).toFixed(1)} KB · Yeni dosya`
                      : 'Mevcut teslim'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearFile}
                  className="p-2 rounded-lg text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                  aria-label="Dosyayı kaldır"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file) handleFileSelect(file);
                }}
                className={`w-full min-h-[200px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer ${
                  dragOver
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-surface-cream hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <div className="p-4 rounded-full bg-primary/10">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center px-4">
                  <p className="text-sm font-medium text-text-body">
                    .ino dosyanızı sürükleyip bırakın veya tıklayın
                  </p>
                  <p className="text-xs text-text-muted mt-1">Arduino sketch · Maks. 512 KB</p>
                </div>
              </button>
            )}

            {displayName && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 text-sm text-primary hover:text-primary-dark font-medium"
              >
                Farklı dosya seç
              </button>
            )}
          </div>

          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full sm:w-auto px-8 py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {submitting ? 'Gönderiliyor...' : submission ? 'Yeniden Teslim Et' : 'Projeyi Teslim Et'}
          </button>
        </form>
      ) : (
        displayName && (
          <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-surface-cream">
            <div className="p-3 rounded-lg bg-primary/10">
              <FileCode2 className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text-body truncate">{displayName}</p>
              <p className="text-xs text-text-muted mt-0.5">Teslim edildi</p>
            </div>
            {existingFileUrl && (
              <a
                href={existingFileUrl}
                download={displayName}
                className="text-sm text-primary hover:text-primary-dark font-medium shrink-0"
              >
                İndir
              </a>
            )}
          </div>
        )
      )}
    </div>
  );
}
