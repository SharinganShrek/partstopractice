'use client';

import { useState } from 'react';
import type { Question } from '@/lib/tests';
import { useLanguage } from './LanguageContext';

interface TestQuestionCardProps {
  question: Question;
  index: number;
}

export default function TestQuestionCard({ question, index }: TestQuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const isRevealed = selectedOption !== null;

  return (
    <div className="card overflow-hidden">
      <div className="p-4 md:p-5 bg-surface-cream/50">
        <p className="font-medium text-text-body mb-4" lang={language}>
          {index + 1}. {question.question}
        </p>
        <div className="space-y-2">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.key;
            const isCorrectOpt = opt.key === question.correctAnswer;
            const showCorrect = isRevealed && isCorrectOpt;
            const showWrong = isRevealed && isSelected && !isCorrectOpt;

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setSelectedOption(opt.key)}
                disabled={isRevealed}
                lang={language}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-start ${
                  showCorrect
                    ? 'border-green-600 bg-green-50 text-green-800'
                    : showWrong
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white hover:border-primary/50 hover:bg-primary/5'
                } ${isRevealed ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="font-semibold text-primary shrink-0">{opt.key})</span>
                <span className="min-w-0 break-words">{opt.text}</span>
                {showCorrect && (
                  <span className="sm:ml-auto text-green-600 font-medium shrink-0">
                    {t('question.correct')}
                  </span>
                )}
                {showWrong && (
                  <span className="sm:ml-auto text-red-600 font-medium shrink-0">
                    {t('question.incorrect')}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {isRevealed && (
          <div className="mt-4 px-4 py-3 bg-surface-cream rounded-lg border border-primary/20">
            <p className="text-primary font-semibold text-sm">
              {t('question.correctAnswer')}: {question.correctAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
