'use client';

import { useState } from 'react';
import type { Question } from '@/lib/tests';

interface TestQuestionCardProps {
  question: Question;
  index: number;
}

export default function TestQuestionCard({ question, index }: TestQuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (key: string) => {
    setSelectedOption(key);
  };

  const isRevealed = selectedOption !== null;
  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="border border-[#e9ecef] rounded-lg overflow-hidden hover:border-[#800020]/30 transition-colors">
      <div className="p-4 bg-[#fafaf5]">
        <p className="font-medium text-[#212529] mb-4">
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
                onClick={() => handleOptionClick(opt.key)}
                disabled={isRevealed}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex gap-3 items-start ${
                  showCorrect
                    ? 'border-green-600 bg-green-50 text-green-800'
                    : showWrong
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : isSelected
                    ? 'border-[#800020] bg-[#800020]/5'
                    : 'border-[#e9ecef] bg-white hover:border-[#800020]/50 hover:bg-[#800020]/5'
                } ${isRevealed ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="font-semibold text-[#800020] shrink-0">{opt.key})</span>
                <span>{opt.text}</span>
                {showCorrect && (
                  <span className="ml-auto text-green-600 font-medium shrink-0">✓ Doğru</span>
                )}
                {showWrong && (
                  <span className="ml-auto text-red-600 font-medium shrink-0">✗ Yanlış</span>
                )}
              </button>
            );
          })}
        </div>
        {isRevealed && (
          <div className="mt-4 px-4 py-3 bg-[#f5f5dc] rounded-lg border border-[#800020]/20">
            <p className="text-[#800020] font-semibold">
              Doğru cevap: {question.correctAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
