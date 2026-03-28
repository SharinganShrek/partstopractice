import type { SupportedLanguage } from './config';

/**
 * UI string translations for every supported language.
 *
 * To add a new key:  add it to EVERY language block below.
 * To add a new language: add a new `[code]: { ... }` block copying the English keys.
 */
const translations: Record<SupportedLanguage, Record<string, string>> = {
  // ─── TURKISH ──────────────────────────────────────────────
  tr: {
    // Nav
    'nav.home': 'Ana Sayfa',
    'nav.courses': 'Dersler',
    'nav.quizzes': 'Quizler',

    // Hero
    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description':
      'Türkçe hazırlanmış FRC ve FIRST tanıtım dersleri—video dersler ve interaktif quizlerle öğrenmeyi destekleyin.',

    // Stats
    'stats.languages.value': '10+',
    'stats.languages.label': 'Dil',
    'stats.languages.sub': 'FIRST ve FRC giriş materyalleri birçok dilde mevcut',
    'stats.reached.value': '10.000+',
    'stats.reached.label': 'Ulaşılan kişi',
    'stats.reached.sub': 'Öğrenciler ve toplulukla paylaşılan kaynaklar',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'Video ders',
    'stats.lessons.sub': 'Öğrendiklerinizi pekiştirmek için 60+ interaktif quiz sorusu',

    // Courses
    'courses.title': 'Dersler',
    'courses.description':
      'Ders başlıkları, videolar ve quizler aşağıdadır. Bir derse tıklayarak videoyu izleyebilir veya doğrudan quiz\'e geçebilirsiniz.',
    'courses.practiceQuiz': 'Quiz',
    'courses.backToCourses': 'Derslere dön',

    // Course detail
    'course.video': 'Video',
    'course.noVideo': 'Video henüz eklenmedi',
    'course.noVideoSub': 'Bu video yakında eklenecektir.',
    'course.noQuiz': 'Bu ders için henüz quiz bulunmamaktadır.',

    // Tests / Quizzes
    'quizzes.title': 'Quizler',
    'quizzes.description':
      'Bir ders seçerek alıştırma quizine başlayın.',
    'quizzes.questions': '10 soru',
    'quizzes.backToQuizzes': 'Quizlere dön',
    'quizzes.practiceQuiz': 'Alıştırma Quizi',
    'quizzes.instruction':
      'Geri bildirim ve doğru cevabı görmek için bir seçeneğe tıklayın.',

    // Question card
    'question.correct': 'Doğru',
    'question.incorrect': 'Yanlış',
    'question.correctAnswer': 'Doğru cevap',

    // Badge
    'badge.contentIn': 'Dersler ve quizler Türkçe',

    // Footer
    'footer.quickLinks': 'Hızlı bağlantılar',
    'footer.home': 'Ana Sayfa',
    'footer.allCourses': 'Tüm dersler',
    'footer.quizzes': 'Quizler',
    'footer.contact': 'İletişim',
    'footer.copyright': '© 2026 FIRST Parts to Practice. Tüm hakları saklıdır.',

    // Language selector
    'language.select': 'Dil seçin',
  },

  // ─── ENGLISH ──────────────────────────────────────────────
  en: {
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.quizzes': 'Quizzes',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description':
      'Introductory FRC and FIRST coursework—video lessons and interactive quizzes to support learning.',

    'stats.languages.value': '10+',
    'stats.languages.label': 'Languages',
    'stats.languages.sub': 'FIRST and FRC introductory materials available in many languages',
    'stats.reached.value': '10,000+',
    'stats.reached.label': 'People reached',
    'stats.reached.sub': 'Resources shared with students and the wider community',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'Video lessons',
    'stats.lessons.sub': '60+ interactive quiz questions to reinforce what you learn',

    'courses.title': 'Courses',
    'courses.description':
      'Browse video lessons and jump straight to the practice quiz for each course.',
    'courses.practiceQuiz': 'Practice quiz',
    'courses.backToCourses': 'Back to courses',

    'course.video': 'Video',
    'course.noVideo': 'Video not available yet',
    'course.noVideoSub': 'This lesson will be updated soon.',
    'course.noQuiz': 'No quiz is available for this course yet.',

    'quizzes.title': 'Quizzes',
    'quizzes.description':
      'Select a course to start its practice quiz.',
    'quizzes.questions': '10 questions',
    'quizzes.backToQuizzes': 'Back to quizzes',
    'quizzes.practiceQuiz': 'Practice quiz',
    'quizzes.instruction':
      'Click an option to see feedback and the correct answer.',

    'question.correct': 'Correct',
    'question.incorrect': 'Incorrect',
    'question.correctAnswer': 'Correct answer',

    'badge.contentIn': 'Lessons & quizzes in English',

    'footer.quickLinks': 'Quick links',
    'footer.home': 'Home',
    'footer.allCourses': 'All courses',
    'footer.quizzes': 'Quizzes',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 FIRST Parts to Practice. All rights reserved.',

    'language.select': 'Select language',
  },

  // ─── CHINESE ──────────────────────────────────────────────
  zh: {
    'nav.home': '首页',
    'nav.courses': '课程',
    'nav.quizzes': '测验',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description': 'FRC 和 FIRST 入门课程——视频课程和互动测验帮助您学习。',

    'stats.languages.value': '10+',
    'stats.languages.label': '种语言',
    'stats.languages.sub': '多种语言提供 FIRST 和 FRC 入门材料',
    'stats.reached.value': '10,000+',
    'stats.reached.label': '触达人数',
    'stats.reached.sub': '与学生和社区共享的资源',
    'stats.lessons.value': '6',
    'stats.lessons.label': '视频课程',
    'stats.lessons.sub': '60+ 互动测验题巩固所学知识',

    'courses.title': '课程',
    'courses.description': '浏览视频课程，直接跳转到每门课程的练习测验。',
    'courses.practiceQuiz': '练习测验',
    'courses.backToCourses': '返回课程',

    'course.video': '视频',
    'course.noVideo': '视频尚未上传',
    'course.noVideoSub': '本课程即将更新。',
    'course.noQuiz': '本课程尚无测验。',

    'quizzes.title': '测验',
    'quizzes.description': '选择一门课程开始测验。',
    'quizzes.questions': '10 道题',
    'quizzes.backToQuizzes': '返回测验',
    'quizzes.practiceQuiz': '练习测验',
    'quizzes.instruction': '点击选项查看反馈和正确答案。',

    'question.correct': '正确',
    'question.incorrect': '错误',
    'question.correctAnswer': '正确答案',

    'badge.contentIn': '课程和测验为中文',

    'footer.quickLinks': '快速链接',
    'footer.home': '首页',
    'footer.allCourses': '所有课程',
    'footer.quizzes': '测验',
    'footer.contact': '联系我们',
    'footer.copyright': '© 2026 FIRST Parts to Practice. 保留所有权利。',

    'language.select': '选择语言',
  },

  // ─── HEBREW ───────────────────────────────────────────────
  he: {
    'nav.home': 'דף הבית',
    'nav.courses': 'קורסים',
    'nav.quizzes': 'חידונים',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description': 'קורסי מבוא ל-FRC ו-FIRST—שיעורי וידאו וחידונים אינטראקטיביים לתמיכה בלמידה.',

    'stats.languages.value': '10+',
    'stats.languages.label': 'שפות',
    'stats.languages.sub': 'חומרי מבוא ל-FIRST ו-FRC זמינים בשפות רבות',
    'stats.reached.value': '10,000+',
    'stats.reached.label': 'אנשים שהושגו',
    'stats.reached.sub': 'משאבים ששותפו עם תלמידים והקהילה',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'שיעורי וידאו',
    'stats.lessons.sub': '60+ שאלות חידון אינטראקטיביות לחיזוק הלמידה',

    'courses.title': 'קורסים',
    'courses.description': 'עיינו בשיעורי וידאו או קפצו ישירות לחידון של כל קורס.',
    'courses.practiceQuiz': 'חידון תרגול',
    'courses.backToCourses': 'חזרה לקורסים',

    'course.video': 'וידאו',
    'course.noVideo': 'הוידאו עדיין לא זמין',
    'course.noVideoSub': 'שיעור זה יעודכן בקרוב.',
    'course.noQuiz': 'אין עדיין חידון לקורס זה.',

    'quizzes.title': 'חידונים',
    'quizzes.description': 'בחרו קורס כדי להתחיל את חידון התרגול.',
    'quizzes.questions': '10 שאלות',
    'quizzes.backToQuizzes': 'חזרה לחידונים',
    'quizzes.practiceQuiz': 'חידון תרגול',
    'quizzes.instruction': 'לחצו על אפשרות כדי לראות משוב ואת התשובה הנכונה.',

    'question.correct': 'נכון',
    'question.incorrect': 'לא נכון',
    'question.correctAnswer': 'תשובה נכונה',

    'badge.contentIn': 'שיעורים וחידונים בעברית',

    'footer.quickLinks': 'קישורים מהירים',
    'footer.home': 'דף הבית',
    'footer.allCourses': 'כל הקורסים',
    'footer.quizzes': 'חידונים',
    'footer.contact': 'צור קשר',
    'footer.copyright': '© 2026 FIRST Parts to Practice. כל הזכויות שמורות.',

    'language.select': 'בחר שפה',
  },

  // ─── GERMAN ───────────────────────────────────────────────
  de: {
    'nav.home': 'Startseite',
    'nav.courses': 'Kurse',
    'nav.quizzes': 'Quizze',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description':
      'Einführende FRC- und FIRST-Kurse—Videolektionen und interaktive Quizze zur Unterstützung des Lernens.',

    'stats.languages.value': '10+',
    'stats.languages.label': 'Sprachen',
    'stats.languages.sub': 'FIRST- und FRC-Einführungsmaterialien in vielen Sprachen verfügbar',
    'stats.reached.value': '10.000+',
    'stats.reached.label': 'Erreichte Personen',
    'stats.reached.sub': 'Ressourcen mit Schülern und der Gemeinschaft geteilt',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'Videolektionen',
    'stats.lessons.sub': '60+ interaktive Quizfragen zum Festigen des Gelernten',

    'courses.title': 'Kurse',
    'courses.description':
      'Durchstöbern Sie Videolektionen oder springen Sie direkt zum Übungsquiz jedes Kurses.',
    'courses.practiceQuiz': 'Übungsquiz',
    'courses.backToCourses': 'Zurück zu Kursen',

    'course.video': 'Video',
    'course.noVideo': 'Video noch nicht verfügbar',
    'course.noVideoSub': 'Diese Lektion wird bald aktualisiert.',
    'course.noQuiz': 'Für diesen Kurs ist noch kein Quiz verfügbar.',

    'quizzes.title': 'Quizze',
    'quizzes.description': 'Wählen Sie einen Kurs, um das Übungsquiz zu starten.',
    'quizzes.questions': '10 Fragen',
    'quizzes.backToQuizzes': 'Zurück zu Quizzen',
    'quizzes.practiceQuiz': 'Übungsquiz',
    'quizzes.instruction':
      'Klicken Sie auf eine Option, um Feedback und die richtige Antwort zu sehen.',

    'question.correct': 'Richtig',
    'question.incorrect': 'Falsch',
    'question.correctAnswer': 'Richtige Antwort',

    'badge.contentIn': 'Lektionen & Quizze auf Deutsch',

    'footer.quickLinks': 'Schnellzugriff',
    'footer.home': 'Startseite',
    'footer.allCourses': 'Alle Kurse',
    'footer.quizzes': 'Quizze',
    'footer.contact': 'Kontakt',
    'footer.copyright': '© 2026 FIRST Parts to Practice. Alle Rechte vorbehalten.',

    'language.select': 'Sprache wählen',
  },

  // ─── POLISH ───────────────────────────────────────────────
  pl: {
    'nav.home': 'Strona główna',
    'nav.courses': 'Kursy',
    'nav.quizzes': 'Quizy',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description':
      'Wprowadzające kursy FRC i FIRST—lekcje wideo i interaktywne quizy wspierające naukę.',

    'stats.languages.value': '10+',
    'stats.languages.label': 'Języków',
    'stats.languages.sub': 'Materiały wprowadzające FIRST i FRC dostępne w wielu językach',
    'stats.reached.value': '10 000+',
    'stats.reached.label': 'Dotartych osób',
    'stats.reached.sub': 'Zasoby udostępnione uczniom i społeczności',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'Lekcji wideo',
    'stats.lessons.sub': '60+ interaktywnych pytań quizowych do utrwalania wiedzy',

    'courses.title': 'Kursy',
    'courses.description':
      'Przeglądaj lekcje wideo lub przejdź bezpośrednio do quizu dla każdego kursu.',
    'courses.practiceQuiz': 'Quiz praktyczny',
    'courses.backToCourses': 'Powrót do kursów',

    'course.video': 'Wideo',
    'course.noVideo': 'Wideo jeszcze niedostępne',
    'course.noVideoSub': 'Ta lekcja zostanie wkrótce zaktualizowana.',
    'course.noQuiz': 'Dla tego kursu nie ma jeszcze quizu.',

    'quizzes.title': 'Quizy',
    'quizzes.description': 'Wybierz kurs, aby rozpocząć quiz praktyczny.',
    'quizzes.questions': '10 pytań',
    'quizzes.backToQuizzes': 'Powrót do quizów',
    'quizzes.practiceQuiz': 'Quiz praktyczny',
    'quizzes.instruction':
      'Kliknij opcję, aby zobaczyć odpowiedź i komentarz.',

    'question.correct': 'Poprawnie',
    'question.incorrect': 'Niepoprawnie',
    'question.correctAnswer': 'Poprawna odpowiedź',

    'badge.contentIn': 'Lekcje i quizy po polsku',

    'footer.quickLinks': 'Szybkie linki',
    'footer.home': 'Strona główna',
    'footer.allCourses': 'Wszystkie kursy',
    'footer.quizzes': 'Quizy',
    'footer.contact': 'Kontakt',
    'footer.copyright': '© 2026 FIRST Parts to Practice. Wszelkie prawa zastrzeżone.',

    'language.select': 'Wybierz język',
  },

  // ─── ARABIC ───────────────────────────────────────────────
  ar: {
    'nav.home': 'الرئيسية',
    'nav.courses': 'الدورات',
    'nav.quizzes': 'الاختبارات',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description':
      'دورات تمهيدية في FRC وFIRST—دروس فيديو واختبارات تفاعلية لدعم التعلم.',

    'stats.languages.value': '10+',
    'stats.languages.label': 'لغات',
    'stats.languages.sub': 'مواد تمهيدية لـ FIRST وFRC متوفرة بعدة لغات',
    'stats.reached.value': '10,000+',
    'stats.reached.label': 'شخص تم الوصول إليه',
    'stats.reached.sub': 'موارد تمت مشاركتها مع الطلاب والمجتمع',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'دروس فيديو',
    'stats.lessons.sub': '60+ سؤال اختبار تفاعلي لتعزيز ما تتعلمه',

    'courses.title': 'الدورات',
    'courses.description': 'تصفح دروس الفيديو أو انتقل مباشرة إلى اختبار كل دورة.',
    'courses.practiceQuiz': 'اختبار تدريبي',
    'courses.backToCourses': 'العودة للدورات',

    'course.video': 'فيديو',
    'course.noVideo': 'الفيديو غير متوفر بعد',
    'course.noVideoSub': 'سيتم تحديث هذا الدرس قريباً.',
    'course.noQuiz': 'لا يوجد اختبار لهذه الدورة بعد.',

    'quizzes.title': 'الاختبارات',
    'quizzes.description': 'اختر دورة لبدء الاختبار التدريبي.',
    'quizzes.questions': '10 أسئلة',
    'quizzes.backToQuizzes': 'العودة للاختبارات',
    'quizzes.practiceQuiz': 'اختبار تدريبي',
    'quizzes.instruction': 'انقر على خيار لرؤية التعليق والإجابة الصحيحة.',

    'question.correct': 'صحيح',
    'question.incorrect': 'خطأ',
    'question.correctAnswer': 'الإجابة الصحيحة',

    'badge.contentIn': 'الدروس والاختبارات بالعربية',

    'footer.quickLinks': 'روابط سريعة',
    'footer.home': 'الرئيسية',
    'footer.allCourses': 'جميع الدورات',
    'footer.quizzes': 'الاختبارات',
    'footer.contact': 'اتصل بنا',
    'footer.copyright': '© 2026 FIRST Parts to Practice. جميع الحقوق محفوظة.',

    'language.select': 'اختر اللغة',
  },

  // ─── HINDI ────────────────────────────────────────────────
  hi: {
    'nav.home': 'होम',
    'nav.courses': 'पाठ्यक्रम',
    'nav.quizzes': 'क्विज़',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description':
      'FRC और FIRST परिचयात्मक पाठ्यक्रम—वीडियो पाठ और इंटरैक्टिव क्विज़ सीखने में सहायता के लिए।',

    'stats.languages.value': '10+',
    'stats.languages.label': 'भाषाएँ',
    'stats.languages.sub': 'कई भाषाओं में FIRST और FRC परिचयात्मक सामग्री उपलब्ध',
    'stats.reached.value': '10,000+',
    'stats.reached.label': 'लोगों तक पहुँच',
    'stats.reached.sub': 'छात्रों और समुदाय के साथ साझा किए गए संसाधन',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'वीडियो पाठ',
    'stats.lessons.sub': '60+ इंटरैक्टिव क्विज़ प्रश्न सीखे हुए को मजबूत करने के लिए',

    'courses.title': 'पाठ्यक्रम',
    'courses.description': 'वीडियो पाठ ब्राउज़ करें या सीधे प्रत्येक पाठ्यक्रम की क्विज़ पर जाएँ।',
    'courses.practiceQuiz': 'अभ्यास क्विज़',
    'courses.backToCourses': 'पाठ्यक्रमों पर वापस',

    'course.video': 'वीडियो',
    'course.noVideo': 'वीडियो अभी उपलब्ध नहीं है',
    'course.noVideoSub': 'यह पाठ जल्द ही अपडेट किया जाएगा।',
    'course.noQuiz': 'इस पाठ्यक्रम के लिए अभी कोई क्विज़ उपलब्ध नहीं है।',

    'quizzes.title': 'क्विज़',
    'quizzes.description': 'अभ्यास क्विज़ शुरू करने के लिए एक पाठ्यक्रम चुनें।',
    'quizzes.questions': '10 प्रश्न',
    'quizzes.backToQuizzes': 'क्विज़ पर वापस',
    'quizzes.practiceQuiz': 'अभ्यास क्विज़',
    'quizzes.instruction': 'प्रतिक्रिया और सही उत्तर देखने के लिए एक विकल्प पर क्लिक करें।',

    'question.correct': 'सही',
    'question.incorrect': 'गलत',
    'question.correctAnswer': 'सही उत्तर',

    'badge.contentIn': 'पाठ और क्विज़ हिंदी में',

    'footer.quickLinks': 'त्वरित लिंक',
    'footer.home': 'होम',
    'footer.allCourses': 'सभी पाठ्यक्रम',
    'footer.quizzes': 'क्विज़',
    'footer.contact': 'संपर्क',
    'footer.copyright': '© 2026 FIRST Parts to Practice. सर्वाधिकार सुरक्षित।',

    'language.select': 'भाषा चुनें',
  },

  // ─── SPANISH ──────────────────────────────────────────────
  es: {
    'nav.home': 'Inicio',
    'nav.courses': 'Cursos',
    'nav.quizzes': 'Cuestionarios',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description':
      'Cursos introductorios de FRC y FIRST—lecciones en video y cuestionarios interactivos para apoyar el aprendizaje.',

    'stats.languages.value': '10+',
    'stats.languages.label': 'Idiomas',
    'stats.languages.sub': 'Materiales introductorios de FIRST y FRC en muchos idiomas',
    'stats.reached.value': '10.000+',
    'stats.reached.label': 'Personas alcanzadas',
    'stats.reached.sub': 'Recursos compartidos con estudiantes y la comunidad',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'Lecciones en video',
    'stats.lessons.sub': '60+ preguntas interactivas para reforzar lo aprendido',

    'courses.title': 'Cursos',
    'courses.description':
      'Explore lecciones en video o salte directamente al cuestionario de cada curso.',
    'courses.practiceQuiz': 'Cuestionario',
    'courses.backToCourses': 'Volver a cursos',

    'course.video': 'Video',
    'course.noVideo': 'Video aún no disponible',
    'course.noVideoSub': 'Esta lección se actualizará pronto.',
    'course.noQuiz': 'Aún no hay cuestionario disponible para este curso.',

    'quizzes.title': 'Cuestionarios',
    'quizzes.description': 'Seleccione un curso para iniciar el cuestionario.',
    'quizzes.questions': '10 preguntas',
    'quizzes.backToQuizzes': 'Volver a cuestionarios',
    'quizzes.practiceQuiz': 'Cuestionario de práctica',
    'quizzes.instruction':
      'Haga clic en una opción para ver la retroalimentación y la respuesta correcta.',

    'question.correct': 'Correcto',
    'question.incorrect': 'Incorrecto',
    'question.correctAnswer': 'Respuesta correcta',

    'badge.contentIn': 'Lecciones y cuestionarios en español',

    'footer.quickLinks': 'Enlaces rápidos',
    'footer.home': 'Inicio',
    'footer.allCourses': 'Todos los cursos',
    'footer.quizzes': 'Cuestionarios',
    'footer.contact': 'Contacto',
    'footer.copyright': '© 2026 FIRST Parts to Practice. Todos los derechos reservados.',

    'language.select': 'Seleccionar idioma',
  },

  // ─── ITALIAN ──────────────────────────────────────────────
  it: {
    'nav.home': 'Home',
    'nav.courses': 'Corsi',
    'nav.quizzes': 'Quiz',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description':
      'Corsi introduttivi FRC e FIRST—lezioni video e quiz interattivi per supportare l\'apprendimento.',

    'stats.languages.value': '10+',
    'stats.languages.label': 'Lingue',
    'stats.languages.sub': 'Materiali introduttivi FIRST e FRC disponibili in molte lingue',
    'stats.reached.value': '10.000+',
    'stats.reached.label': 'Persone raggiunte',
    'stats.reached.sub': 'Risorse condivise con studenti e comunità',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'Lezioni video',
    'stats.lessons.sub': '60+ domande quiz interattive per rafforzare l\'apprendimento',

    'courses.title': 'Corsi',
    'courses.description':
      'Sfoglia le lezioni video o vai direttamente al quiz di ogni corso.',
    'courses.practiceQuiz': 'Quiz di pratica',
    'courses.backToCourses': 'Torna ai corsi',

    'course.video': 'Video',
    'course.noVideo': 'Video non ancora disponibile',
    'course.noVideoSub': 'Questa lezione verrà aggiornata presto.',
    'course.noQuiz': 'Nessun quiz disponibile per questo corso.',

    'quizzes.title': 'Quiz',
    'quizzes.description': 'Seleziona un corso per iniziare il quiz di pratica.',
    'quizzes.questions': '10 domande',
    'quizzes.backToQuizzes': 'Torna ai quiz',
    'quizzes.practiceQuiz': 'Quiz di pratica',
    'quizzes.instruction':
      'Clicca su un\'opzione per vedere il feedback e la risposta corretta.',

    'question.correct': 'Corretto',
    'question.incorrect': 'Sbagliato',
    'question.correctAnswer': 'Risposta corretta',

    'badge.contentIn': 'Lezioni e quiz in italiano',

    'footer.quickLinks': 'Link rapidi',
    'footer.home': 'Home',
    'footer.allCourses': 'Tutti i corsi',
    'footer.quizzes': 'Quiz',
    'footer.contact': 'Contatti',
    'footer.copyright': '© 2026 FIRST Parts to Practice. Tutti i diritti riservati.',

    'language.select': 'Seleziona lingua',
  },

  // ─── SWAHILI ──────────────────────────────────────────────
  sw: {
    'nav.home': 'Nyumbani',
    'nav.courses': 'Kozi',
    'nav.quizzes': 'Majaribio',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description':
      'Kozi za utangulizi za FRC na FIRST—masomo ya video na majaribio ya maingiliano kusaidia kujifunza.',

    'stats.languages.value': '10+',
    'stats.languages.label': 'Lugha',
    'stats.languages.sub': 'Nyenzo za utangulizi za FIRST na FRC zinapatikana kwa lugha nyingi',
    'stats.reached.value': '10,000+',
    'stats.reached.label': 'Watu waliofikiwa',
    'stats.reached.sub': 'Rasilimali zilizoshirikiwa na wanafunzi na jamii',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'Masomo ya video',
    'stats.lessons.sub': '60+ maswali ya majaribio ya maingiliano kuimarisha unachojifunza',

    'courses.title': 'Kozi',
    'courses.description':
      'Pitia masomo ya video au nenda moja kwa moja kwenye jaribio la kozi.',
    'courses.practiceQuiz': 'Jaribio la mazoezi',
    'courses.backToCourses': 'Rudi kwenye kozi',

    'course.video': 'Video',
    'course.noVideo': 'Video bado haijapatikana',
    'course.noVideoSub': 'Somo hili litasasishwa hivi karibuni.',
    'course.noQuiz': 'Hakuna jaribio lililopatikana kwa kozi hii bado.',

    'quizzes.title': 'Majaribio',
    'quizzes.description': 'Chagua kozi kuanza jaribio la mazoezi.',
    'quizzes.questions': 'maswali 10',
    'quizzes.backToQuizzes': 'Rudi kwenye majaribio',
    'quizzes.practiceQuiz': 'Jaribio la mazoezi',
    'quizzes.instruction': 'Bofya chaguo kuona maoni na jibu sahihi.',

    'question.correct': 'Sahihi',
    'question.incorrect': 'Si sahihi',
    'question.correctAnswer': 'Jibu sahihi',

    'badge.contentIn': 'Masomo na majaribio kwa Kiswahili',

    'footer.quickLinks': 'Viungo vya haraka',
    'footer.home': 'Nyumbani',
    'footer.allCourses': 'Kozi zote',
    'footer.quizzes': 'Majaribio',
    'footer.contact': 'Wasiliana',
    'footer.copyright': '© 2026 FIRST Parts to Practice. Haki zote zimehifadhiwa.',

    'language.select': 'Chagua lugha',
  },

  // ─── RUSSIAN ──────────────────────────────────────────────
  ru: {
    'nav.home': 'Главная',
    'nav.courses': 'Курсы',
    'nav.quizzes': 'Тесты',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description':
      'Вводные курсы FRC и FIRST—видеоуроки и интерактивные тесты для поддержки обучения.',

    'stats.languages.value': '10+',
    'stats.languages.label': 'Языков',
    'stats.languages.sub': 'Вводные материалы FIRST и FRC доступны на многих языках',
    'stats.reached.value': '10 000+',
    'stats.reached.label': 'Охват',
    'stats.reached.sub': 'Ресурсы, разделённые со студентами и сообществом',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'Видеоуроков',
    'stats.lessons.sub': '60+ интерактивных вопросов для закрепления знаний',

    'courses.title': 'Курсы',
    'courses.description':
      'Просматривайте видеоуроки или переходите прямо к тесту каждого курса.',
    'courses.practiceQuiz': 'Практический тест',
    'courses.backToCourses': 'Назад к курсам',

    'course.video': 'Видео',
    'course.noVideo': 'Видео пока недоступно',
    'course.noVideoSub': 'Этот урок скоро будет обновлён.',
    'course.noQuiz': 'Для этого курса пока нет теста.',

    'quizzes.title': 'Тесты',
    'quizzes.description': 'Выберите курс, чтобы начать тест.',
    'quizzes.questions': '10 вопросов',
    'quizzes.backToQuizzes': 'Назад к тестам',
    'quizzes.practiceQuiz': 'Практический тест',
    'quizzes.instruction':
      'Нажмите на вариант, чтобы увидеть ответ и правильный ответ.',

    'question.correct': 'Правильно',
    'question.incorrect': 'Неправильно',
    'question.correctAnswer': 'Правильный ответ',

    'badge.contentIn': 'Уроки и тесты на русском',

    'footer.quickLinks': 'Быстрые ссылки',
    'footer.home': 'Главная',
    'footer.allCourses': 'Все курсы',
    'footer.quizzes': 'Тесты',
    'footer.contact': 'Контакты',
    'footer.copyright': '© 2026 FIRST Parts to Practice. Все права защищены.',

    'language.select': 'Выберите язык',
  },

  // ─── FRENCH ───────────────────────────────────────────────
  fr: {
    'nav.home': 'Accueil',
    'nav.courses': 'Cours',
    'nav.quizzes': 'Quiz',

    'hero.subtitle': 'IMC#4191 × Khan Academy Türkiye',
    'hero.title': 'FIRST Parts to Practice',
    'hero.description':
      'Cours d\'introduction FRC et FIRST—leçons vidéo et quiz interactifs pour soutenir l\'apprentissage.',

    'stats.languages.value': '10+',
    'stats.languages.label': 'Langues',
    'stats.languages.sub': 'Matériaux d\'introduction FIRST et FRC disponibles en plusieurs langues',
    'stats.reached.value': '10 000+',
    'stats.reached.label': 'Personnes atteintes',
    'stats.reached.sub': 'Ressources partagées avec les étudiants et la communauté',
    'stats.lessons.value': '6',
    'stats.lessons.label': 'Leçons vidéo',
    'stats.lessons.sub': '60+ questions de quiz interactives pour renforcer vos acquis',

    'courses.title': 'Cours',
    'courses.description':
      'Parcourez les leçons vidéo ou accédez directement au quiz de chaque cours.',
    'courses.practiceQuiz': 'Quiz de pratique',
    'courses.backToCourses': 'Retour aux cours',

    'course.video': 'Vidéo',
    'course.noVideo': 'Vidéo pas encore disponible',
    'course.noVideoSub': 'Cette leçon sera bientôt mise à jour.',
    'course.noQuiz': 'Aucun quiz n\'est encore disponible pour ce cours.',

    'quizzes.title': 'Quiz',
    'quizzes.description': 'Sélectionnez un cours pour commencer le quiz.',
    'quizzes.questions': '10 questions',
    'quizzes.backToQuizzes': 'Retour aux quiz',
    'quizzes.practiceQuiz': 'Quiz de pratique',
    'quizzes.instruction':
      'Cliquez sur une option pour voir le retour et la bonne réponse.',

    'question.correct': 'Correct',
    'question.incorrect': 'Incorrect',
    'question.correctAnswer': 'Bonne réponse',

    'badge.contentIn': 'Leçons et quiz en français',

    'footer.quickLinks': 'Liens rapides',
    'footer.home': 'Accueil',
    'footer.allCourses': 'Tous les cours',
    'footer.quizzes': 'Quiz',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 FIRST Parts to Practice. Tous droits réservés.',

    'language.select': 'Choisir la langue',
  },
};

export default translations;
