/**
 * Generates placeholder quiz JSON for seeding when real questions aren't ready yet.
 */
export function generatePlaceholderQuiz(
  title: string,
  questionCount: number,
  passingScore = 70
) {
  const options = [
    { key: 'A', text: 'Seçenek A [PLACEHOLDER]' },
    { key: 'B', text: 'Seçenek B [PLACEHOLDER]' },
    { key: 'C', text: 'Seçenek C [PLACEHOLDER]' },
    { key: 'D', text: 'Seçenek D [PLACEHOLDER]' },
  ];

  return {
    title,
    passingScore,
    questions: Array.from({ length: questionCount }, (_, i) => ({
      question: `[PLACEHOLDER] ${title}: Soru ${i + 1}`,
      options,
      correctAnswer: 'A',
    })),
  };
}
