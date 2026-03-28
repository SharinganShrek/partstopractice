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

const testsHe: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "איך מוקצים משימות לרובוטים ב-FLL?",
                options: parseOptions(
                    'נבחרים באופן אקראי',
                    'משימות נקבעות על ידי נושא העונה',
                    'קבוצות ממציאות משימות',
                    'שופטים מחליטים במהלך המשחק'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'איך קבוצת FLL מנצחת?',
                options: parseOptions(
                    'עם הרובוט הגדול ביותר',
                    'כקבוצה המהירה ביותר',
                    'עם ביצועי הרובוט, הפרויקט ועבודת הקבוצה',
                    'רק עם נקודות הרובוט'
                ),
                correctAnswer: 'C',
            },
            {
                question: 'מהו התרומה האקדמית של FLL?',
                options: parseOptions(
                    'רק בידור',
                    'מפתח כישורים ספורטיביים',
                    'מפתח כישורים STEM',
                    'מוריד את ההצלחה במבחנים'
                ),
                correctAnswer: 'C',
            },
            {
                question: "איך נעשה עיצוב הרובוט ב-FLL?",
                options: parseOptions(
                    'נרכש כבר מוכן',
                    'מעוצב עם חלקי LEGO',
                    'מיוצר על ידי חיתוך מתכת',
                    'מורכב במהלך התחרות'
                ),
                correctAnswer: 'B',
            },
            {
                question: "מהם 4 הרכיבים העיקריים של FLL?",
                options: parseOptions(
                    'קוד, מהירות, תחרות, נקודות',
                    'משחק הרובוט, פרויקט, ערכים, עיצוב',
                    'רק תחרות רובוט',
                    'הצגה ופרס'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מהו המטרה של תחרות FLL?',
                options: parseOptions(
                    'קרב רובוטים',
                    'לימוד פתרון בעיות והנדסה',
                    'תחרות מהירות',
                    'רק לקבל פרסים'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'כמה זמן משחקי הרובוט FLL נמשכים?',
                options: parseOptions('1 דקה', '2 דקות 30 שניות', '5 דקות', '10 דקות'),
                correctAnswer: 'B',
            },
            {
                question: "מהו הנושא הראשי של כל עונה ב-FLL?",
                options: parseOptions(
                    'נושאים אקראיים',
                    'בעיה חברתית נוכחית',
                    'רק מהירות הרובוט',
                    'בידור המשחק'
                ),
                correctAnswer: 'B',
            },
            {
                question: "מהו החשוב יותר ב-FLL: תהליך או תוצאה?",
                options: parseOptions(
                    'רק תוצאה',
                    'רק פרס',
                    'תהליך ולמידה',
                    'גודל הרובוט'
                ),
                correctAnswer: 'C',
            },
            {
                question: "מהו התרומה של FLL לפיתוח כישורים STEM בגיל צעיר?",
                options: parseOptions(
                    'אין',
                    'רק בידור',
                    'יוצר עניין במדע והנדסה',
                    'מקשה על הלימוד'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "מהו ההבדל בין FTC ל-FLL?",
                options: parseOptions(
                    'הם זהים',
                    'FTC גדול ומורכב יותר',
                    'FTC קטן יותר',
                    'FTC ללא רובוט'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מה יכולים לעשות רובוטים FTC?',
                options: parseOptions(
                    'רק לנוע',
                    'לאסוף עצמים ולבצע משימות',
                    'לעוף',
                    'רק לסובב'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מהו הסוג של עבודה מכנית הנדרשת ל-FTC?',
                options: parseOptions(
                    'הרכבה פשוטה',
                    'עיצוב מכני רציני',
                    'רק תוכנה',
                    'אין עיצוב'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מה יש לשים לב אליו במהלך ההכנה לתחרות?',
                options: parseOptions(
                    'צבע הרובוט',
                    'אסטרטגיית הקבוצה',
                    'חולצת הקבוצה',
                    'רק מהירות'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מהו הרמה של ידע רובוטי הנדרש ל-FTC?',
                options: parseOptions(
                    'אין דרישות',
                    'רמת הנדסה בינונית',
                    'רק ידע על המשחק',
                    'רק תוכנה'
                ),
                correctAnswer: 'B',
            },
            {
                question: "מהו המטרה העיקרית של FTC?",
                options: parseOptions(
                    'לנצח בתחרות',
                    'לכוון סטודנטים להנדסה',
                    'למכור רובוטים',
                    'רק לשעשע'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מהם השפות התכנותיות המשמשות ב-FTC?',
                options: parseOptions(
                    'ג\'אווה ותכנות בבלוקים',
                    'רק C++',
                    'פייתון חובה',
                    'אין קוד'
                ),
                correctAnswer: 'A',
            },
            {
                question: "למה עיצוב מכני חשוב ב-FTC?",
                options: parseOptions(
                    'אינו חשוב',
                    'הרובוט מבצע משימות',
                    'רק למראה',
                    'השופט דורש'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מהו המבנה של רובוטים FTC?',
                options: parseOptions(
                    'LEGO',
                    'חלקי קיט מתכת',
                    'קרטון',
                    'צעצועים מפלסטיק'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'איך יש לתכנן אסטרטגיה ותהליך הנדסה לתחרות FTC?',
                options: parseOptions(
                    'באופן אקראי',
                    'מתוכנן ונבדק',
                    'ביום האחרון',
                    'רק על ידי כתיבת תוכנה'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "מהו הפירוש של FIRST?",
                options: parseOptions(
                    'Future Innovation Science Teams',
                    'For Inspiration and Recognition of Science and Technology',
                    'Fast Robotics Initiative',
                    'Federation of Robot Teams'
                ),
                correctAnswer: 'B',
            },
            {
                question: "מהו שם המייסד של FIRST?",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "מהו המשימה של FIRST?",
                options: parseOptions(
                    'למכור רובוטים',
                    'לכוון צעירים לתחומי STEM',
                    'לארגן תחרויות',
                    'להרוויח כסף'
                ),
                correctAnswer: 'B',
            },
            {
                question: "מהם הערכים הבסיסיים של FIRST?",
                options: parseOptions(
                    'מהירות ותחרות',
                    'עבודת צוות וכבוד',
                    'לנצח',
                    'כוח הרובוט'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מה FIRST מצפה מאיתנו?',
                options: parseOptions(
                    'רק לנצח',
                    'ללמוד ולשתף',
                    'ליצור רובוטים',
                    'לנצח את היריבים'
                ),
                correctAnswer: 'B',
            },
            {
                question: '"ערכים בסיסיים" - מה זה אומר?',
                options: parseOptions(
                    'נקודות הרובוט',
                    'התנהגות הקבוצה ושיתוף פעולה',
                    'רק לנצח',
                    'כללי השופט'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'איך אנו יכולים ליישם את ערכי FIRST בחיי היומיום?',
                options: parseOptions(
                    'אנו לא יכולים להשתמש בהם',
                    'עם כבוד ושיתוף פעולה',
                    'רק במהלך התחרות',
                    'מחוץ לבית הספר אין צורך'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'איך אנו משתמשים בערכי FIRST בעבודת צוות?',
                options: parseOptions(
                    'באמצעות דיון',
                    'באמצעות שיתוף פעולה',
                    'באמצעות עבודה עצמאית',
                    'בלי להאזין למנהיג'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מהו "Gracious Professionalism"?',
                options: parseOptions(
                    'תחרות קשה',
                    'מקצוענות מכובדת',
                    'תשוקה לניצחון',
                    'שתיקה'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מהו "Coopertition"?',
                options: parseOptions(
                    'לנצח את היריבים',
                    'תחרות ושיתוף פעולה',
                    'תחרות עצמאית',
                    'לבטל את התחרות'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC מתנדב ופרס
        questions: [
            {
                question: 'איך להיות מתנדב FRC?',
                options: parseOptions(
                    'להיות חבר',
                    'להגיש בקשה להתנדבות',
                    'ליצור קבוצה',
                    'ליצור רובוט'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מי יכול להיות מתנדב FRC?',
                options: parseOptions(
                    'רק סטודנטים',
                    'מתנדבים מכל הגילאים',
                    'רק מורים',
                    'רק מהנדסים'
                ),
                correctAnswer: 'B',
            },
            {
                question: "מה עושים המתנדבים ב-FRC?",
                options: parseOptions(
                    'לנהוג ברובוטים',
                    'לתמוך בארגון',
                    'ליצור קבוצה',
                    'לנהל את התחרות'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'איך קבוצות חדשות צריכות לפתח את אסטרטגייתן?',
                options: parseOptions(
                    'ליצור את הרובוט הקשה ביותר',
                    'ליצור מערכת פשוטה ואמינה',
                    'רק מהירות',
                    'ליצור רובוט גדול'
                ),
                correctAnswer: 'B',
            },
            {
                question: "איך המתנדבים עוזרים לקדם את FIRST?",
                options: parseOptions(
                    'באמצעות תמיכה בתחרויות',
                    'באמצעות יצירת רובוטים',
                    'באמצעות כתיבת קוד',
                    'רק באמצעות צפייה'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'מה נלקח בחשבון בעת הענקת פרסים FRC?',
                options: parseOptions(
                    'רק נקודות',
                    'עבודת צוות והשפעה',
                    'צבע הרובוט',
                    'מהירות'
                ),
                correctAnswer: 'B',
            },
            {
                question: "מהו תפקיד המתנדבים במשפחת FRC?",
                options: parseOptions(
                    'רק לצפות',
                    'לתמוך בארגון',
                    'לנהוג ברובוטים',
                    'להיות שופט'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מהו תפקיד המתנדבים בקידום תרבות FRC?',
                options: parseOptions(
                    'אין',
                    'לספק קידום ותמיכה',
                    'רק להעניק פרסים',
                    'ליצור רובוטים'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'איך להיות Field Ressetter?',
                options: parseOptions(
                    'ליצור רובוט',
                    'להגיש בקשה להתנדבות',
                    'ליצור קבוצה',
                    'להיות שופט'
                ),
                correctAnswer: 'B',
            },
            {
                question: "האם מטרת הפרסים FRC היא רק למדוד הצלחה?",
                options: parseOptions(
                    'כן',
                    'לא, היא מודדת גם את תרבות הקבוצה',
                    'רק מודדת מהירות',
                    'מודדת את כוח הרובוט'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // חלוקת משימות
        questions: [
            {
                question: 'מהם התפקידים הקיימים בקבוצת FRC?',
                options: parseOptions(
                    'רק נהג',
                    'מכניק, תוכנה, PR וכו\'',
                    'רק תוכנה',
                    'שופט'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מהו החשיבות של חלוקת משימות?',
                options: parseOptions(
                    'אין',
                    'מספק עבודה מאורגנת',
                    'גורם לאובדן זמן',
                    'רק המנהיג עובד'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'איך יש לבצע חלוקת תפקידים בקבוצה?',
                options: parseOptions('באופן אקראי', 'לפי יכולת', 'לפי גיל', 'לפי גודל'),
                correctAnswer: 'B',
            },
            {
                question: 'איך יש לנהל את התקשורת בין תפקידי הקבוצה?',
                options: parseOptions(
                    'בלי לדבר',
                    'עם תקשורת רגילה',
                    'רק עם המנהיג',
                    'במהלך התחרות'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'למה יש לבצע חלוקת משימות בקבוצה?',
                options: parseOptions(
                    'כדי למנוע בלבול',
                    'למען הנאה',
                    'אין צורך',
                    'רק לצורך פורמליות'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'מהם התפקידים העיקריים של הדיביזיה הטכנית?',
                options: parseOptions(
                    'לעשות קידום',
                    'לפתח רובוט',
                    'לצלם סרטונים',
                    'למצוא ספונסרים'
                ),
                correctAnswer: 'B',
            },
            {
                question: "מהם התפקידים העיקריים של PR?",
                options: parseOptions(
                    'ליצור רובוט',
                    'לקדם את הקבוצה',
                    'לכתוב קוד',
                    'ליצור את המגרש'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'איך יש לתאם בין קבוצות המכניקה והתוכנה?',
                options: parseOptions(
                    'אין צורך',
                    'תקשורת קבועה',
                    'עבודה נפרדת',
                    'איחוד במהלך התחרות'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'איך היעדרות הנהגה משפיעה על ביצועי הקבוצה?',
                options: parseOptions(
                    'אינה משפיעה',
                    'מורידה את הביצועים',
                    'מעלה את הביצועים',
                    'מגדילה את גודל הרובוט'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מהם הבעיות שיכולות לקרות אם חלוקת המשימות לא תבוצע כראוי?',
                options: parseOptions(
                    'אין בעיות',
                    'בלבול ותקלות',
                    'הרובוט מאיץ',
                    'נקודות מוגברות'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // תחרות FIRST
        questions: [
            {
                question: 'כמה קטגוריות עיקריות מחולקות תחרויות FIRST?',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: 'מהן 3 התחרויות שכלולות ב-FIRST?',
                options: parseOptions(
                    'FLL, FTC, FRC',
                    'VEX, RoboCup, FRC',
                    'FLL, VEX, FTC',
                    'RoboCup, FTC, FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'מהו המפגש הראשון של סטודנט עם FIRST?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'ליגת אוניברסיטה'),
                correctAnswer: 'C',
            },
            {
                question: 'למה גילאים מותאמים תחרויות?',
                options: parseOptions(
                    'רק לתיכון',
                    'מיסודי עד תיכון',
                    'רק לאוניברסיטה',
                    'רק למבוגרים'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'מהו ההבדל בין רובוטים FRC לרובוטים אחרים של FIRST?',
                options: parseOptions(
                    'גודל קטן',
                    'גודל גדול וחזק יותר',
                    'רובוטים LEGO',
                    'יכולת תעופה'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'כמה פעמים רובוטים FRC גדולים מרובוטים FTC?',
                options: parseOptions('אותו גודל', 'כ-2 פעמים גדול יותר', '10 פעמים גדול יותר', 'גודל קטן יותר'),
                correctAnswer: 'B',
            },
            {
                question: 'מהו התחרות שמשתמשת ברובוטים הקטנים ביותר?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'אף אחד'),
                correctAnswer: 'C',
            },
            {
                question: 'מהו התחרות שמשתמשת ברובוטים הגדולים והתעשייתיים ביותר?',
                options: parseOptions('FLL', 'FTC', 'FRC', 'כולם זהים'),
                correctAnswer: 'C',
            },
            {
                question: 'איך עובדת מערכת הנקודות בתחרויות?',
                options: parseOptions(
                    'באופן אקראי',
                    'לפי הצלחות במשימות',
                    'לפי גודל הרובוט',
                    'השופט בוחר'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'איך מתמודדים עם בעיות מכניות שקורות במהלך התחרות?',
                options: parseOptions(
                    'נסיגה מהתחרות',
                    'צוות הפיט מבצע תיקונים מהירים',
                    'המתנה',
                    'ביטול המשחק'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsHe;
