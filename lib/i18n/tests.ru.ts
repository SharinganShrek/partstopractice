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

const testsRu: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "Как задания назначаются роботам в FLL?",
                options: parseOptions(
                    'Выбираются случайно',
                    'Задания определяются темой сезона',
                    'Команды придумывают задания',
                    'Судьи решают во время матча'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как команда FLL выигрывает?',
                options: parseOptions(
                    'С самым большим роботом',
                    'Как самая быстрая команда',
                    'С производительностью робота, проектом и командной работой',
                    'Только с очками робота'
                ),
                correctAnswer: 'C',
            },
            {
                question: 'Какой академический вклад может сделать FLL?',
                options: parseOptions(
                    'Только развлечение',
                    'Развивает спортивные навыки',
                    'Развивает навыки STEM',
                    'Снижает успех в экзаменах'
                ),
                correctAnswer: 'C',
            },
            {
                question: "Как проектируется робот в FLL?",
                options: parseOptions(
                    'Купленный готовый',
                    'Проектированный с помощью деталей LEGO',
                    'Изготовленный путем резки металла',
                    'Собранный во время соревнований'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Какие 4 основных компонента FLL?",
                options: parseOptions(
                    'Код, скорость, соревнование, очки',
                    'Игра робота, проект, ценности, проектирование',
                    'Только соревнование робота',
                    'Презентация и награда'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Какой цель соревнований FLL?',
                options: parseOptions(
                    'Бой роботов',
                    'Обучение решению проблем и инженерии',
                    'Соревнование скорости',
                    'Только получение наград'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как долго длятся матчи робота FLL?',
                options: parseOptions('1 минута', '2 минуты 30 секунд', '5 минут', '10 минут'),
                correctAnswer: 'B',
            },
            {
                question: "Какая основная тема каждого сезона FLL?",
                options: parseOptions(
                    'Случайные темы',
                    'Актуальная социальная проблема',
                    'Только скорость робота',
                    'Развлечение игры'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Что более важно в FLL: Процесс или Результат?",
                options: parseOptions(
                    'Только результат',
                    'Только награда',
                    'Процесс и обучение',
                    'Размер робота'
                ),
                correctAnswer: 'C',
            },
            {
                question: "Какой вклад FLL в развитие навыков STEM в молодом возрасте?",
                options: parseOptions(
                    'Нет',
                    'Только развлечение',
                    'Создает интерес к науке и инженерии',
                    'Усложняет обучение'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "Какая разница между FTC и FLL?",
                options: parseOptions(
                    'Они идентичны',
                    'FTC больше и сложнее',
                    'FTC меньше',
                    'FTC без робота'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Что могут делать роботы FTC?',
                options: parseOptions(
                    'Только двигаться',
                    'Брать объекты и выполнять задания',
                    'Летать',
                    'Только вращаться'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Какой тип механической работы требуется для FTC?',
                options: parseOptions(
                    'Простая сборка',
                    'Серьезный механический дизайн',
                    'Только программное обеспечение',
                    'Нет дизайна'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Что следует учитывать во время подготовки к соревнованиям?',
                options: parseOptions(
                    'Цвет робота',
                    'Стратегия команды',
                    'Футболка команды',
                    'Только скорость'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Какой уровень знаний робототехники требуется для FTC?',
                options: parseOptions(
                    'Нет требований',
                    'Уровень инженерии средний',
                    'Только знание игры',
                    'Только программное обеспечение'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Какой основной цель FTC?",
                options: parseOptions(
                    'Выиграть соревнование',
                    'Направлять студентов к инженерии',
                    'Продавать роботов',
                    'Только развлекаться'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Какие языки программирования используются в FTC?',
                options: parseOptions(
                    'Java и программирование в блоках',
                    'Только C++',
                    'Python обязательный',
                    'Нет кода'
                ),
                correctAnswer: 'A',
            },
            {
                question: "Почему механический дизайн важен в FTC?",
                options: parseOptions(
                    'Не важен',
                    'Робот выполняет задания',
                    'Только для вида',
                    'Судья требует'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как устроены роботы FTC?',
                options: parseOptions(
                    'LEGO',
                    'Детали металлического кита',
                    'Картон',
                    'Игрушки из пластика'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как следует планировать стратегию и процесс инженерии для соревнований FTC?',
                options: parseOptions(
                    'Случайно',
                    'Планируемый и протестированный',
                    'Последний день',
                    'Только делая программное обеспечение'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "Что означает FIRST?",
                options: parseOptions(
                    'Future Innovation Science Teams',
                    'For Inspiration and Recognition of Science and Technology',
                    'Fast Robotics Initiative',
                    'Federation of Robot Teams'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Как зовут основателя FIRST?",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "Какова миссия FIRST?",
                options: parseOptions(
                    'Продавать роботов',
                    'Направлять молодежь к STEM-областям',
                    'Организовывать соревнования',
                    'Зарабатывать деньги'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Какие основные ценности FIRST?",
                options: parseOptions(
                    'Скорость и конкуренция',
                    'Командная работа и уважение',
                    'Выигрыш',
                    'Мощность робота'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Что FIRST ожидает от нас?',
                options: parseOptions(
                    'Только выигрыш',
                    'Обучение и обмен',
                    'Создание роботов',
                    'Победа над соперниками'
                ),
                correctAnswer: 'B',
            },
            {
                question: '"Основные ценности" - что это означает?',
                options: parseOptions(
                    'Очки робота',
                    'Поведение команды и сотрудничество',
                    'Только выигрыш',
                    'Правила судьи'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как мы можем применить ценности FIRST в нашей повседневной жизни?',
                options: parseOptions(
                    'Мы не можем использовать их',
                    'С уважением и сотрудничеством',
                    'Только во время соревнований',
                    'Вне школы не обязательно'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как мы используем ценности FIRST в командной работе?',
                options: parseOptions(
                    'Обсуждая',
                    'Сотрудничая',
                    'Работая самостоятельно',
                    'Не слушая лидера'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Что означает "Gracious Professionalism"?',
                options: parseOptions(
                    'Жесткая конкуренция',
                    'Уважительный профессионализм',
                    'Жажда победы',
                    'Молчание'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Что означает "Coopertition"?',
                options: parseOptions(
                    'Победа над соперниками',
                    'Конкуренция и сотрудничество',
                    'Самостоятельная конкуренция',
                    'Отмена соревнований'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC волонтер и награда
        questions: [
            {
                question: 'Как стать волонтером FRC?',
                options: parseOptions(
                    'Стать членом',
                    'Подать заявку на волонтерство',
                    'Создать команду',
                    'Создать робота'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Кто может стать волонтером FRC?',
                options: parseOptions(
                    'Только студенты',
                    'Волонтеры всех возрастов',
                    'Только учителя',
                    'Только инженеры'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Что делают волонтеры в FRC?",
                options: parseOptions(
                    'Управлять роботами',
                    'Поддерживать организацию',
                    'Создать команду',
                    'Руководить соревнованиями'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как новые команды должны развивать свою стратегию?',
                options: parseOptions(
                    'Создать самый сложный робот',
                    'Создать простую и надежную систему',
                    'Только скорость',
                    'Создать большой робот'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Как волонтеры помогают распространять FIRST?",
                options: parseOptions(
                    'Поддерживая соревнования',
                    'Создавая роботов',
                    'Писать код',
                    'Только наблюдая'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Что учитывается при награждении FRC?',
                options: parseOptions(
                    'Только очки',
                    'Командная работа и влияние',
                    'Цвет робота',
                    'Скорость'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Какова роль волонтеров в семье FRC?",
                options: parseOptions(
                    'Только наблюдать',
                    'Поддерживать организацию',
                    'Управлять роботами',
                    'Быть судьей'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Какова роль волонтеров в распространении культуры FRC?',
                options: parseOptions(
                    'Нет',
                    'Предоставлять продвижение и поддержку',
                    'Только вручать награды',
                    'Создавать роботов'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как стать Field Ressetter?',
                options: parseOptions(
                    'Создать робота',
                    'Подать заявку на волонтерство',
                    'Создать команду',
                    'Быть судьей'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Является ли целью наград FRC только измерение успеха?",
                options: parseOptions(
                    'Да',
                    'Нет, измеряет также культуру команды',
                    'Только измеряет скорость',
                    'Измеряет мощность робота'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // Распределение задач
        questions: [
            {
                question: 'Какие роли есть в команде FRC?',
                options: parseOptions(
                    'Только водитель',
                    'Механик, программное обеспечение, PR и т.д.',
                    'Только программное обеспечение',
                    'Судья'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Каково значение распределения задач?',
                options: parseOptions(
                    'Нет',
                    'Предоставляет организованную работу',
                    'Причиняет потерю времени',
                    'Только лидер работает'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как следует распределять роли в команде?',
                options: parseOptions('Случайно', 'По способностям', 'По возрасту', 'По размеру'),
                correctAnswer: 'B',
            },
            {
                question: 'Как следует вести коммуникацию между ролями команды?',
                options: parseOptions(
                    'Не разговаривая',
                    'С регулярной коммуникацией',
                    'Только с лидером',
                    'Во время соревнований'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Почему распределение задач должно быть сделано в команде?',
                options: parseOptions(
                    'Чтобы избежать путаницы',
                    'Для развлечения',
                    'Не обязательно',
                    'Только для формальности'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Какие основные задачи технического дивизиона?',
                options: parseOptions(
                    'Сделать продвижение',
                    'Разработать робота',
                    'Снять видео',
                    'Найти спонсоров'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Какие основные задачи PR?",
                options: parseOptions(
                    'Создать робота',
                    'Продвигать команду',
                    'Писать код',
                    'Создать поле для игры'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как следует координировать между механическими и программными командами?',
                options: parseOptions(
                    'Нет необходимости',
                    'Постоянная коммуникация',
                    'Работать отдельно',
                    'Объединиться во время соревнований'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как отсутствие лидерства влияет на результат команды?',
                options: parseOptions(
                    'Не влияет',
                    'Понижает результат',
                    'Повышает результат',
                    'Увеличивает размер робота'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Какие проблемы могут возникнуть, если распределение задач не будет сделано правильно?',
                options: parseOptions(
                    'Нет проблем',
                    'Путаница и сбой',
                    'Робот ускоряется',
                    'Очки увеличиваются'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // Соревнования FIRST
        questions: [
            {
                question: 'На сколько основных категорий разделены соревнования FIRST?',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: 'Какие 3 соревнования включает в себя FIRST?',
                options: parseOptions(
                    'FLL, FTC, FRC',
                    'VEX, RoboCup, FRC',
                    'FLL, VEX, FTC',
                    'RoboCup, FTC, FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Какое первое знакомство студента с FIRST?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Университетская лига'),
                correctAnswer: 'C',
            },
            {
                question: 'Для каких возрастных групп проводятся соревнования?',
                options: parseOptions(
                    'Только для средней школы',
                    'От начальной школы до средней школы',
                    'Только для университета',
                    'Только для взрослых'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Какая разница между роботами FRC и другими роботами FIRST?',
                options: parseOptions(
                    'Меньший размер',
                    'Больший и более мощный',
                    'Роботы LEGO',
                    'Способность летать'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Во сколько раз больше роботов FRC, чем роботов FTC?',
                options: parseOptions('Одинаковый размер', 'Примерно в 2 раза больше', 'В 10 раз больше', 'Меньший размер'),
                correctAnswer: 'B',
            },
            {
                question: 'Какое соревнование использует самые маленькие роботы?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Ни одно'),
                correctAnswer: 'C',
            },
            {
                question: 'Какое соревнование использует самые большие и промышленные роботы?',
                options: parseOptions('FLL', 'FTC', 'FRC', 'Все одинаковые'),
                correctAnswer: 'C',
            },
            {
                question: 'Как работает система очков в соревнованиях?',
                options: parseOptions(
                    'Случайно',
                    'По успехам в заданиях',
                    'По размеру робота',
                    'Судья выбирает'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Как решаются механические проблемы, возникающие во время соревнований?',
                options: parseOptions(
                    'Снятие с соревнований',
                    'Быстрая починка команды пит-стоп',
                    'Ожидание',
                    'Отмена матча'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsRu;
