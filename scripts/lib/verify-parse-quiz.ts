import { parseQuizText } from './parse-quiz-text';

const sample = `
1. Tinkercad'de bir küp oluşturmak için hangi araç kullanılır?
A) Workplane
B) Basic Shapes
C) Scribble
D) Code
Doğru Cevap: B

2. Milimetrik ölçülendirme neden önemlidir?
A) Renk seçimi için
B) 3D baskı uyumu için
C) Animasyon için
D) Ses efektleri için
Cevap: B

3. Uzamsal düşünme ne demektir?
A) Nesneleri 3 boyutta hayal edebilme
B) Sadece 2D çizim yapma
C) Kod yazma
D) Devre kurma
Doğru Yanıt: A

4. Tasarım araçları arasında hangisi 3D modelleme içindir?
A) Tinkercad 3D
B) Word
C) Excel
D) PowerPoint
Cevap: A

5. Mühendislik sürecinde ilk adım genelde nedir?
A) Prototip üretmek
B) Problemi tanımlamak
C) Sunum yapmak
D) Test etmek
Answer: B
`;

const result = parseQuizText(sample, 'Ödev 1.1 :  Konu Sonu Değerlendirmesi (5 Soru)');

if (result.quiz.questions.length !== 5) {
  console.error(`Expected 5 questions, got ${result.quiz.questions.length}`);
  process.exit(1);
}

if (result.quiz.questions[0].correctAnswer !== 'B') {
  console.error('Question 1 answer mismatch');
  process.exit(1);
}

console.log('parse-quiz-text verification passed.');
