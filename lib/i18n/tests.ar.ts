import type { CourseTest } from '../tests';

function parseOptions(
    a: string,
    b: string,
    c: string,
    d: string
): { key: string; text: string }[] {
    return [
        { key: 'A', text: a },
        { key: 'B', text: b },
        { key: 'C', text: c },
        { key: 'D', text: d },
    ];
}

const testsAr: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "كيف تُعطى المهام للروبوتات المتسابقة في FLL؟",
                options: parseOptions(
                    'تُختار عشوائياً',
                    'تكون المهام محددة وفقاً لموضوع الموسم',
                    'تخترع الفرق المهام',
                    'يحدد الحكام المهام أثناء المباراة'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'كيف يفوز فريق FLL؟',
                options: parseOptions(
                    'بأكبر روبوت',
                    'كأسرع فريق',
                    'من خلال أداء الروبوت، المشروع، والعمل الجماعي',
                    'بنقاط الروبوت فقط'
                ),
                correctAnswer: 'C',
            },
            {
                question: 'ما هو الإسهام الأكاديمي الذي يمكن أن يقدمه FLL؟',
                options: parseOptions(
                    'يوفر الترفيه فقط',
                    'يوفر مهارات رياضية',
                    'يطور مهارات STEM',
                    'يقلل من النجاح في الامتحانات'
                ),
                correctAnswer: 'C',
            },
            {
                question: "كيف يتم تصميم الروبوت في FLL؟",
                options: parseOptions(
                    'يُشترى جاهزاً',
                    'يُصمم باستخدام قطع LEGO',
                    'يُصنع بقطع المعادن',
                    'يُركب أثناء المسابقة'
                ),
                correctAnswer: 'B',
            },
            {
                question: "ما هي المكونات الأربعة الرئيسية لـ FLL؟",
                options: parseOptions(
                    'الكود، السرعة، السباق، النقاط',
                    'لعبة الروبوت، المشروع، القيم، التصميم',
                    'سباق الروبوت فقط',
                    'العرض والجوائز'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما هو هدف مسابقة FLL؟',
                options: parseOptions(
                    'مقاتلة الروبوتات',
                    'تعليم حل المشكلات والهندسة',
                    'سباق السرعة',
                    'الحصول على الجوائز فقط'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'كم دقيقة تستغرق مباريات روبوتات FLL؟',
                options: parseOptions('1 دقيقة', '2 دقيقة و30 ثانية', '5 دقائق', '10 دقائق'),
                correctAnswer: 'B',
            },
            {
                question: "ما الذي يغطيه الموضوع الرئيسي لكل موسم في FLL؟",
                options: parseOptions(
                    'مواضيع عشوائية',
                    'مشكلة مجتمعية حالية',
                    'سرعة الروبوت فقط',
                    'الترفيه في اللعبة'
                ),
                correctAnswer: 'B',
            },
            {
                question: "في FLL، أيهما أكثر أهمية: العملية أم النتيجة؟",
                options: parseOptions(
                    'النتيجة فقط',
                    'الجائزة فقط',
                    'العملية والتعلم',
                    'حجم الروبوت'
                ),
                correctAnswer: 'C',
            },
            {
                question: "ما هي إسهامات FLL في تطوير STEM في سن صغير؟",
                options: parseOptions(
                    'لا توجد',
                    'يوفر الترفيه فقط',
                    'يخلق اهتماماً بالعلوم والهندسة',
                    'يصعب الدروس'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "ما هو الفرق بين FTC و FLL؟",
                options: parseOptions(
                    'هما نفس الشيء',
                    'FTC أكبر وأكثر تعقيداً',
                    'FTC أصغر',
                    'FTC بدون روبوتات'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما الذي يمكن لروبوتات FTC القيام به؟',
                options: parseOptions(
                    'التحرك فقط',
                    'جمع الأشياء وإنجاز المهام',
                    'الطيران',
                    'الدوران فقط'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما نوع العمل الميكانيكي المطلوب في FTC؟',
                options: parseOptions(
                    'تركيب بسيط',
                    'تصميم ميكانيكي جاد',
                    'البرمجيات فقط',
                    'لا يوجد تصميم'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما الذي يجب مراعاته أكثر أثناء التحضير للمسابقة؟',
                options: parseOptions(
                    'لون الروبوت',
                    'استراتيجية الفريق',
                    'قميص الفريق',
                    'السرعة فقط'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما مدى شمولية المعرفة الروبوتية المطلوبة لـ FTC؟',
                options: parseOptions(
                    'ليست مطلوبة على الإطلاق',
                    'معرفة هندسية متوسطة المستوى',
                    'معرفة اللعبة فقط',
                    'البرمجيات فقط'
                ),
                correctAnswer: 'B',
            },
            {
                question: "ما هو الهدف الأساسي لـ FTC؟",
                options: parseOptions(
                    'الفوز بالمسابقة',
                    'توجيه الطلاب نحو الهندسة',
                    'بيع الروبوتات',
                    'الترفيه فقط'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما هي لغات البرمجة المستخدمة في FTC؟',
                options: parseOptions(
                    'Java والبرمجة بالكتل',
                    'C++ فقط',
                    'Python إلزامي',
                    'لا يوجد كود'
                ),
                correctAnswer: 'A',
            },
            {
                question: "لماذا يعتبر التصميم الميكانيكي مهماً في FTC؟",
                options: parseOptions(
                    'غير مهم',
                    'الروبوت ينفذ المهام',
                    'للمظهر فقط',
                    'يطلبه الحكم'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما هي بنية روبوتات FTC؟',
                options: parseOptions(
                    'LEGO',
                    'قطع معدنية جاهزة',
                    'كرتون',
                    'لعبة بلاستيكية'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'كيف يجب تخطيط استراتيجية وهندسة عملية التحضير لمسابقة FTC؟',
                options: parseOptions(
                    'عشوائياً',
                    'بشكل مخطط واختباره',
                    'في اليوم الأخير',
                    'بالقيام بالبرمجة فقط'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "ما هو اختصار FIRST؟",
                options: parseOptions(
                    'Future Innovation Science Teams',
                    'For Inspiration and Recognition of Science and Technology',
                    'Fast Robotics Initiative',
                    'Federation of Robot Teams'
                ),
                correctAnswer: 'B',
            },
            {
                question: "ما هو الاسم الكامل لمؤسس FIRST؟",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "ما هي مهمة FIRST؟",
                options: parseOptions(
                    'بيع الروبوتات',
                    'توجيه الشباب نحو مجالات STEM',
                    'إقامة المسابقات',
                    'كسب المال'
                ),
                correctAnswer: 'B',
            },
            {
                question: "ما هي القيم الأساسية لـ FIRST؟",
                options: parseOptions(
                    'السرعة والمنافسة',
                    'العمل الجماعي والاحترام',
                    'الفوز',
                    'قوة الروبوت'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما الذي تريده FIRST منا بالضبط؟',
                options: parseOptions(
                    'الفوز فقط',
                    'التعلم والمشاركة',
                    'صنع الروبوت',
                    'هزيمة الخصم'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما الذي يغطيه مفهوم "القيم الأساسية"؟',
                options: parseOptions(
                    'نقاط الروبوت',
                    'سلوكيات الفريق والتعاون',
                    'الفوز فقط',
                    'قواعد الحكم'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'كيف يمكننا تكييف قيم FIRST في الحياة اليومية؟',
                options: parseOptions(
                    'لا يمكننا',
                    'بالاحترام والتعاون',
                    'فقط في المسابقة',
                    'غير مطلوب خارج المدرسة'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'كيف نستخدم قيم FIRST في العمل الجماعي؟',
                options: parseOptions(
                    'بالمجادلة',
                    'بالتعاون',
                    'بالعمل الفردي',
                    'بعدم الاستماع للقائد'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما معنى Gracious Professionalism؟',
                options: parseOptions(
                    'منافسة شرسة',
                    'احترافية مهذبة',
                    'الرغبة في الفوز',
                    'السكوت'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما الذي يعبر عنه مفهوم Coopertition؟',
                options: parseOptions(
                    'هزيمة الخصم',
                    'التنافس مع التعاون',
                    'المنافسة بمفردك',
                    'إلغاء المسابقة'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC متطوع وجائزة
        questions: [
            {
                question: 'ما الذي يجب فعله لتصبح متطوعاً في FRC؟',
                options: parseOptions(
                    'الانضمام كعضو',
                    'تقديم طلب تطوع',
                    'إنشاء فريق',
                    'صنع روبوت'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'من يمكن أن يكون متطوعاً في FRC؟',
                options: parseOptions(
                    'الطلاب فقط',
                    'متطوعون من جميع الأعمار',
                    'المعلمون فقط',
                    'المهندسون فقط'
                ),
                correctAnswer: 'B',
            },
            {
                question: "ماذا يفعل المتطوعون في FRC؟",
                options: parseOptions(
                    'يقودون الروبوت',
                    'يدعمون التنظيم',
                    'ينشئون فريقاً',
                    'يديرون المسابقة'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'في أي اتجاه يجب على الفرق المبتدئة تطوير استراتيجياتها؟',
                options: parseOptions(
                    'صنع أصعب روبوت',
                    'إنشاء نظام بسيط وموثوق',
                    'السرعة فقط',
                    'صنع روبوت كبير'
                ),
                correctAnswer: 'B',
            },
            {
                question: "كيف يساعد المتطوعون في نشر FIRST؟",
                options: parseOptions(
                    'بدعم المسابقات',
                    'بصنع الروبوت',
                    'بكتابة الكود',
                    'بالمراقبة فقط'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'ما الذي يؤخذ بعين الاعتبار عند منح جوائز FRC؟',
                options: parseOptions(
                    'النقاط فقط',
                    'عمل الفريق والتأثير',
                    'لون الروبوت',
                    'السرعة'
                ),
                correctAnswer: 'B',
            },
            {
                question: "ما هو دور المتطوعين في عائلة FRC؟",
                options: parseOptions(
                    'المراقبة فقط',
                    'دعم التنظيم',
                    'قيادة الروبوت',
                    'العمل كحكم إلزامي'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما هو دور المتطوعين في نشر ثقافة FRC؟',
                options: parseOptions(
                    'لا يوجد دور',
                    'يوفرون الترويج والدعم',
                    'يمنحون الجوائز فقط',
                    'يصنعون الروبوتات'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ماذا يجب فعله لتصبح Field Resetter؟',
                options: parseOptions(
                    'صنع روبوت',
                    'التقدم كمتطوع',
                    'إنشاء فريق',
                    'أن تصبح حكماً'
                ),
                correctAnswer: 'B',
            },
            {
                question: "هل الهدف من جوائز FRC قياس النجاح فقط؟",
                options: parseOptions(
                    'نعم',
                    'لا، تقيس ثقافة الفريق أيضاً',
                    'تقيس السرعة فقط',
                    'تقيس قوة الروبوت'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // توزيع المهام
        questions: [
            {
                question: 'ما هي الأدوار الموجودة في فريق FRC؟',
                options: parseOptions(
                    'السائق فقط',
                    'الميكانيك، البرمجيات، العلاقات العامة، إلخ.',
                    'البرمجيات فقط',
                    'الحكم'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما أهمية توزيع المهام؟',
                options: parseOptions(
                    'لا أهمية له',
                    'يوفر عملاً منظماً',
                    'يضيع الوقت',
                    'يعمل القائد فقط'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'كيف يجب تنفيذ توزيع الأدوار في الفريق؟',
                options: parseOptions('عشوائياً', 'حسب المهارة', 'حسب العمر', 'حسب اللون'),
                correctAnswer: 'B',
            },
            {
                question: 'كيف يجب إدارة التواصل بين أدوار الفريق؟',
                options: parseOptions(
                    'بدون حديث',
                    'بالتواصل المنتظم',
                    'مع القائد فقط',
                    'التحدث أثناء المسابقة'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'لماذا يجب توزيع المهام داخل الفريق؟',
                options: parseOptions(
                    'لتجنب الفوضى',
                    'للتسلية',
                    'غير ضروري',
                    'شكلي فقط'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'ما هي المهام الأساسية للقسم التقني؟',
                options: parseOptions(
                    'الترويج',
                    'تطوير الروبوت',
                    'تصوير الفيديو',
                    'البحث عن الرعاة'
                ),
                correctAnswer: 'B',
            },
            {
                question: "ما هي المهام الأساسية للعلاقات العامة؟",
                options: parseOptions(
                    'صنع الروبوت',
                    'ترويج الفريق',
                    'كتابة الكود',
                    'إعداد الملعب'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما نوع التنسيق المطلوب بين فرق الميكانيك والبرمجيات؟',
                options: parseOptions(
                    'غير مطلوب',
                    'التواصل المستمر ضروري',
                    'يعملون بشكل منفصل',
                    'يتحدون في المسابقة'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'كيف يؤثر نقص القيادة على أداء الفريق؟',
                options: parseOptions(
                    'لا يؤثر',
                    'يقلل الأداء',
                    'يزيد الأداء',
                    'يكبر الروبوت'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما هي أنواع المشاكل التي قد تظهر في يوم المسابقة إذا لم يتم توزيع المهام بشكل صحيح؟',
                options: parseOptions(
                    'لا توجد مشاكل',
                    'حدوث فوضى وتعطل',
                    'يتسارع الروبوت',
                    'تزيد النقاط'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // مسابقة FIRST
        questions: [
            {
                question: 'إلى كم فئة رئيسية تنقسم مسابقات FIRST؟',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: 'ما هي المسابقات الثلاث التي تنظمها FIRST؟',
                options: parseOptions(
                    'FLL, FTC, FRC',
                    'VEX, RoboCup, FRC',
                    'FLL, VEX, FTC',
                    'RoboCup, FTC, FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'ما هي المسابقة التي يتعرف عليها الطالب لأول مرة مع FIRST؟',
                options: parseOptions('FRC', 'FTC', 'FLL', 'دوري الجامعة'),
                correctAnswer: 'C',
            },
            {
                question: 'لمن تُنظم هذه المسابقات؟',
                options: parseOptions(
                    'للمدرسة الثانوية فقط',
                    'من المرحلة الابتدائية إلى الثانوية',
                    'للجامعة فقط',
                    'للبالغين فقط'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'ما هو الفرق بين روبوتات FRC وروبوتات FIRST الأخرى؟',
                options: parseOptions(
                    'صغر حجمها',
                    'كبر حجمها وقوتها',
                    'كونها من LEGO',
                    'طيرانها'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'كم ضعفاً أكبر روبوتات FRC مقارنةً بروبوتات FTC؟',
                options: parseOptions('نفس الحجم', 'حوالي الضعف', '10 أضعاف', 'أصغر'),
                correctAnswer: 'B',
            },
            {
                question: 'ما هي المسابقة التي تستخدم أصغر الروبوتات؟',
                options: parseOptions('FRC', 'FTC', 'FLL', 'لا شيء منها'),
                correctAnswer: 'C',
            },
            {
                question: 'ما هي المسابقة التي تستخدم أكبر الروبوتات الصناعية؟',
                options: parseOptions('FLL', 'FTC', 'FRC', 'كلها بنفس الحجم'),
                correctAnswer: 'C',
            },
            {
                question: 'كيف يتم احتساب النقاط في المسابقات؟',
                options: parseOptions(
                    'عشوائياً',
                    'حسب إنجاز المهام',
                    'حسب حجم الروبوت',
                    'يختار الحكم'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'كيف يتم التعامل مع الأعطال الميكانيكية التي تحدث أثناء المسابقة؟',
                options: parseOptions(
                    'الانسحاب من المسابقة',
                    'يقوم فريق الصيانة بالإصلاح السريع',
                    'الانتظار',
                    'إلغاء المباراة'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsAr;
