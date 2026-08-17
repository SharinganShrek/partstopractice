import type { QuizOption, SeedQuizFile } from '../../lib/lms/types';

const OPTION_LINE =
  /^([A-Da-d])[\)\].:\-]\s*(.+)$|^\(([A-Da-d])\)\s*(.+)$|^([A-Da-d])\s*[\u002D\u2013\u2014]\s*(.+)$/;

const QUESTION_LINE =
  /^(?:❓\s*)?(?:Soru\s*)?(\d+)[\).:\-]?\s*(.+)$/i;

const ANSWER_LINE =
  /^(?:Do[ğg]ru\s*)?(?:Cevap|Yan[ıi]t|Answer)\s*[:\-]\s*([A-Da-d])\b/i;

const CORRECT_MARKER = /\(Do[ğg]ru\s*Cevap\)/i;

export interface ParseQuizResult {
  quiz: SeedQuizFile;
  confidence: 'high' | 'medium' | 'low';
  issues: string[];
}

function normalizeLines(text: string): string[] {
  return text
    .replace(/\r/g, '\n')
    .replace(/❓/g, '\n❓ ')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function parseOptionLine(line: string): { option: QuizOption; isCorrect: boolean } | null {
  const match = line.match(OPTION_LINE);
  if (!match) return null;
  const key = (match[1] ?? match[2] ?? match[4] ?? '').toUpperCase();
  let text = (match[2] ?? match[3] ?? match[5] ?? '').trim();
  const isCorrect = CORRECT_MARKER.test(text);
  text = text.replace(CORRECT_MARKER, '').trim();
  if (!key || !text) return null;
  return { option: { key, text }, isCorrect };
}

function extractCorrectFromOptions(options: QuizOption[]): string | null {
  for (const option of options) {
    if (CORRECT_MARKER.test(option.text)) {
      option.text = option.text.replace(CORRECT_MARKER, '').trim();
      return option.key;
    }
  }
  return null;
}

function finalizeQuestion(
  questionText: string,
  options: QuizOption[],
  correctAnswer: string | null
): { question: string; options: QuizOption[]; correctAnswer: string } | null {
  const cleanedOptions = options.map((o) => ({
    ...o,
    text: o.text.replace(CORRECT_MARKER, '').trim(),
  }));

  if (!questionText.trim() || cleanedOptions.length < 2) return null;

  const answer =
    (correctAnswer && cleanedOptions.some((o) => o.key === correctAnswer)
      ? correctAnswer
      : null) ?? cleanedOptions[0].key;

  return {
    question: questionText.trim(),
    options: cleanedOptions,
    correctAnswer: answer,
  };
}

function splitQuestionBlocks(rawText: string): string[] {
  const normalized = rawText.replace(/\r/g, '\n').trim();

  if (/❓\s*Soru/i.test(normalized)) {
    return normalized
      .split(/(?=❓\s*Soru\s*\d+)/i)
      .map((block) => block.trim())
      .filter(Boolean);
  }

  const numbered = normalized
    .split(/(?=^\d+\.\s)/m)
    .map((block) => block.trim())
    .filter((block) => /^\d+\.\s/.test(block));

  return numbered.length > 0 ? numbered : [normalized];
}

function parseBlock(block: string, fallbackIndex: number) {
  const lines = normalizeLines(block.replace(/^❓\s*/i, ''));
  let questionText = '';
  const options: QuizOption[] = [];
  let pendingAnswer: string | null = null;
  let markerAnswer: string | null = null;

  for (const line of lines) {
    const answerMatch = line.match(ANSWER_LINE);
    if (answerMatch) {
      pendingAnswer = answerMatch[1].toUpperCase();
      continue;
    }

    const questionMatch = line.match(QUESTION_LINE);
    if (questionMatch && !questionText) {
      questionText = questionMatch[2]?.trim() ?? '';
      if (!questionText) continue;
      continue;
    }

    const parsedOption = parseOptionLine(line);
    if (parsedOption) {
      options.push(parsedOption.option);
      if (parsedOption.isCorrect) markerAnswer = parsedOption.option.key;
      continue;
    }

    if (questionText && options.length === 0) {
      questionText = `${questionText} ${line}`.trim();
    } else if (options.length > 0) {
      options[options.length - 1].text = `${options[options.length - 1].text} ${line}`.trim();
    } else if (!questionText) {
      questionText = line;
    }
  }

  if (!questionText) {
    questionText = `Soru ${fallbackIndex}`;
  }

  return finalizeQuestion(questionText, options, markerAnswer ?? pendingAnswer);
}

export function parseQuizText(rawText: string, title: string, passingScore = 70): ParseQuizResult {
  const issues: string[] = [];
  const blocks = splitQuestionBlocks(rawText);
  const questions: SeedQuizFile['questions'] = [];

  blocks.forEach((block, index) => {
    const parsed = parseBlock(block, index + 1);
    if (parsed) {
      questions.push(parsed);
    } else if (block.trim()) {
      issues.push(`Incomplete question block ${index + 1}`);
    }
  });

  let confidence: ParseQuizResult['confidence'] = 'high';
  if (questions.length === 0) {
    confidence = 'low';
    issues.push('No questions parsed from document text.');
  } else if (issues.length > 0) {
    confidence = 'medium';
  }

  const expectedCount = title.toLowerCase().includes('10 soru') ? 10 : 5;
  if (questions.length !== expectedCount) {
    issues.push(`Expected ~${expectedCount} questions, parsed ${questions.length}.`);
    confidence = confidence === 'high' ? 'medium' : 'low';
  }

  return {
    quiz: {
      title,
      passingScore,
      questions,
    },
    confidence,
    issues,
  };
}
