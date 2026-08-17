'use client';

import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import type { QuizAttempt, QuizQuestionRow } from '@/lib/lms/types';
import { quizQuestionToLegacy } from '@/lib/lms/progress';
import { Badge } from '@/components/ui/badge';

interface ScoredQuizProps {
  quizId: string;
  contentItemId: string;
  title: string;
  questions: QuizQuestionRow[];
  passingScore: number;
  previousAttempts?: QuizAttempt[];
  onProgressUpdate: () => void;
}

function formatAttemptDate(value: string) {
  return new Date(value).toLocaleString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ScoredQuiz({
  quizId,
  contentItemId,
  title,
  questions,
  passingScore,
  previousAttempts = [],
  onProgressUpdate,
}: ScoredQuizProps) {
  const [localAttempt, setLocalAttempt] = useState<QuizAttempt | null>(null);

  const sortedAttempts = useMemo(() => {
    const merged = localAttempt
      ? [...previousAttempts.filter((a) => a.id !== localAttempt.id), localAttempt]
      : [...previousAttempts];
    return merged.sort(
      (a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
    );
  }, [previousAttempts, localAttempt]);

  const bestScore = sortedAttempts.length
    ? Math.max(...sortedAttempts.map((a) => a.score))
    : null;

  const [mode, setMode] = useState<'review' | 'take'>(() =>
    sortedAttempts.length > 0 ? 'review' : 'take'
  );
  const [reviewAttemptId, setReviewAttemptId] = useState<string | null>(
    () => sortedAttempts[0]?.id ?? null
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [passed, setPassed] = useState(false);
  const [loading, setLoading] = useState(false);

  const reviewAttempt =
    sortedAttempts.find((a) => a.id === reviewAttemptId) ?? sortedAttempts[0] ?? null;

  const reviewAnswers = reviewAttempt?.answers ?? {};
  const reviewScore = reviewAttempt?.score ?? null;
  const reviewPassed = reviewAttempt?.passed ?? false;

  const allAnswered = questions.every((q) => answers[q.id]);
  const showResults = mode === 'review' || submitted;

  function startRetake() {
    setMode('take');
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setPassed(false);
  }

  async function handleSubmit() {
    if (!allAnswered) return;
    setLoading(true);

    const response = await fetch('/api/kurs/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, contentItemId, answers }),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      setScore(data.score);
      setPassed(data.passed);
      setSubmitted(true);
      setMode('review');
      if (data.attempt) {
        setLocalAttempt(data.attempt);
        setReviewAttemptId(data.attempt.id);
      }
      onProgressUpdate();
    }
  }

  function getAnswerForQuestion(questionId: string) {
    if (mode === 'take' && submitted) return answers[questionId];
    if (mode === 'review') return reviewAnswers[questionId];
    return answers[questionId];
  }

  const displayScore = mode === 'take' && submitted ? score : reviewScore;
  const displayPassed =
    mode === 'take' && submitted ? passed : reviewPassed;

  return (
    <div className="flex flex-col">
      <div className="space-y-4 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto pr-1 pb-4">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h3 className="font-display text-xl font-bold text-text-body">{title}</h3>
        <Badge variant="muted">Geçme notu: %{passingScore}</Badge>
        {bestScore != null && (
          <Badge variant={bestScore >= passingScore ? 'success' : 'warning'}>
            En iyi: %{bestScore}
          </Badge>
        )}
        {sortedAttempts.length > 0 && (
          <Badge variant="muted">{sortedAttempts.length} deneme</Badge>
        )}
      </div>

      {showResults && displayScore != null && (
        <div
          className={`card p-5 ${
            displayPassed ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="font-display text-3xl font-bold">%{displayScore}</p>
              <p
                className={`font-semibold text-sm ${
                  displayPassed ? 'text-green-700' : 'text-amber-700'
                }`}
              >
                {displayPassed
                  ? 'Tebrikler! Bu denemede testi geçtiniz.'
                  : `Geçme notu %${passingScore}. Tekrar deneyebilirsiniz.`}
              </p>
              {reviewAttempt && mode === 'review' && (
                <p className="text-xs text-text-muted mt-1">
                  Deneme tarihi: {formatAttemptDate(reviewAttempt.completed_at)}
                </p>
              )}
            </div>
            {mode === 'review' && (
              <button
                type="button"
                onClick={startRetake}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors shrink-0"
              >
                <RotateCcw className="h-4 w-4" />
                Tekrar Dene
              </button>
            )}
          </div>
          {mode === 'review' && (
            <p className="text-xs text-text-muted mt-3">
              Bu ekranda önceki denemenizin sonuçlarını görüyorsunuz. Yeni cevap seçmek için
              &quot;Tekrar Dene&quot; butonuna tıklayın.
            </p>
          )}
        </div>
      )}

      {mode === 'review' && sortedAttempts.length > 1 && (
        <div className="card p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
            Deneme Geçmişi
          </p>
          <div className="flex flex-wrap gap-2">
            {sortedAttempts.map((attempt, index) => (
              <button
                key={attempt.id}
                type="button"
                onClick={() => setReviewAttemptId(attempt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  reviewAttemptId === attempt.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/40'
                }`}
              >
                #{sortedAttempts.length - index}: %{attempt.score}{' '}
                {attempt.passed ? '✓' : ''}
              </button>
            ))}
          </div>
        </div>
      )}

      {questions.map((q, index) => {
        const legacy = quizQuestionToLegacy(q);
        const selected = getAnswerForQuestion(q.id);

        return (
          <div key={q.id} className="card p-4 md:p-5">
            <p className="font-medium text-text-body mb-4">
              {index + 1}. {legacy.question}
            </p>
            <div className="space-y-2">
              {legacy.options.map((opt) => {
                const isSelected = selected === opt.key;
                const isCorrect = opt.key === legacy.correctAnswer;
                const showCorrect = showResults && isCorrect;
                const showWrong = showResults && isSelected && !isCorrect;
                const canSelect = mode === 'take' && !submitted;

                const optionClass = `w-full text-left px-4 py-3 rounded-lg border-2 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-start transition-all ${
                  showCorrect
                    ? 'border-green-600 bg-green-50 text-green-800'
                    : showWrong
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : isSelected && !showResults
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-white'
                } ${canSelect ? 'cursor-pointer hover:border-primary/50 hover:bg-primary/5' : ''}`;

                if (canSelect) {
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.key }))}
                      className={optionClass}
                    >
                      <span className="font-semibold text-primary shrink-0">{opt.key})</span>
                      <span className="min-w-0 break-words">{opt.text}</span>
                    </button>
                  );
                }

                return (
                  <div key={opt.key} className={optionClass}>
                    <span className="font-semibold text-primary shrink-0">{opt.key})</span>
                    <span className="min-w-0 break-words">{opt.text}</span>
                    {showCorrect && (
                      <span className="sm:ml-auto text-xs font-semibold text-green-700 shrink-0">
                        Doğru
                      </span>
                    )}
                    {showWrong && (
                      <span className="sm:ml-auto text-xs font-semibold text-red-700 shrink-0">
                        Yanlış
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      </div>

      {mode === 'take' && !submitted && (
        <div className="pt-3 border-t border-border bg-white sticky bottom-0">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered || loading}
            className="btn-primary w-full py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Değerlendiriliyor...' : 'Testi Gönder'}
          </button>
        </div>
      )}

      {mode === 'take' && submitted && (
        <div className="pt-3 border-t border-border bg-white">
          <button
            type="button"
            onClick={startRetake}
            className="w-full py-3 rounded-lg font-semibold border border-primary text-primary hover:bg-primary/5 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      )}
    </div>
  );
}
