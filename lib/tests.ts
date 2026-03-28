import type { SupportedLanguage } from './i18n/config';

import testsTr from './i18n/tests.tr';
import testsEn from './i18n/tests.en';
import testsZh from './i18n/tests.zh';
import testsHe from './i18n/tests.he';
import testsDe from './i18n/tests.de';
import testsPl from './i18n/tests.pl';
import testsAr from './i18n/tests.ar';
import testsHi from './i18n/tests.hi';
import testsEs from './i18n/tests.es';
import testsIt from './i18n/tests.it';
import testsSw from './i18n/tests.sw';
import testsRu from './i18n/tests.ru';
import testsFr from './i18n/tests.fr';

export interface Question {
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
}

export interface CourseTest {
  courseId: number;
  questions: Question[];
}

const testsByLang: Record<SupportedLanguage, CourseTest[]> = {
  tr: testsTr,
  en: testsEn,
  zh: testsZh,
  he: testsHe,
  de: testsDe,
  pl: testsPl,
  ar: testsAr,
  hi: testsHi,
  es: testsEs,
  it: testsIt,
  sw: testsSw,
  ru: testsRu,
  fr: testsFr,
};

const OPTION_KEYS = ['A', 'B', 'C', 'D'] as const;

/** Rotate options so the correct answer is evenly distributed across A/B/C/D. */
export function applyBalancedOptionRotation(
  question: Question,
  courseId: number,
  questionIndex: number
): Question {
  const texts = question.options.map((o) => o.text);
  const correctIdx = OPTION_KEYS.indexOf(
    question.correctAnswer as (typeof OPTION_KEYS)[number]
  );
  if (correctIdx < 0 || texts.length !== 4) {
    return question;
  }

  const targetIdx = (courseId * 11 + questionIndex) % 4;
  const k = (correctIdx - targetIdx + 4) % 4;
  const newTexts = OPTION_KEYS.map((_, i) => texts[(i + k) % 4]);

  return {
    ...question,
    options: OPTION_KEYS.map((key, i) => ({
      key,
      text: newTexts[i],
    })),
    correctAnswer: OPTION_KEYS[targetIdx],
  };
}

export function getTestByCourseId(
  courseId: number,
  lang: SupportedLanguage = 'en'
): Question[] | undefined {
  const courseTests = testsByLang[lang] ?? testsByLang.en;
  const test = courseTests.find((t) => t.courseId === courseId);
  if (!test) {
    return undefined;
  }
  return test.questions.map((q, index) =>
    applyBalancedOptionRotation(q, courseId, index)
  );
}
