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

const testsPl: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "Jak zadania są przydzielane robotom w FLL?",
                options: parseOptions(
                    'Wybierane losowo',
                    'Zadania są określone przez temat sezonu',
                    'Zespoły wymyślają zadania',
                    'Sędziowie decydują podczas meczu'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak zespół FLL wygrywa?',
                options: parseOptions(
                    'Z największym robotem',
                    'Jako najszybszy zespół',
                    'Z wydajnością robota, projektem i pracą zespołową',
                    'Tylko z punktami robota'
                ),
                correctAnswer: 'C',
            },
            {
                question: 'Jaki wkład edukacyjny może mieć FLL?',
                options: parseOptions(
                    'Tylko rozrywka',
                    'Rozwija umiejętności sportowe',
                    'Rozwija umiejętności STEM',
                    'Obniża sukces w egzaminach'
                ),
                correctAnswer: 'C',
            },
            {
                question: "Jak jest projektowany robot w FLL?",
                options: parseOptions(
                    'Kupowany gotowy',
                    'Projektowany z elementów LEGO',
                    'Wytwarzany przez cięcie metalu',
                    'Montowany podczas zawodów'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Jakie są 4 główne składniki FLL?",
                options: parseOptions(
                    'Kod, prędkość, zawody, punkty',
                    'Gra robota, projekt, wartości, projektowanie',
                    'Tylko zawody robota',
                    'Prezentacja i nagroda'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jaki jest cel zawodów FLL?',
                options: parseOptions(
                    'Walka robotów',
                    'Nauczanie rozwiązywania problemów i inżynierii',
                    'Zawody prędkości',
                    'Tylko otrzymywanie nagród'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak długo trwają mecze robota FLL?',
                options: parseOptions('1 minuta', '2 minuty 30 sekund', '5 minut', '10 minut'),
                correctAnswer: 'B',
            },
            {
                question: "Jaki jest główny temat każdego sezonu FLL?",
                options: parseOptions(
                    'Losowe tematy',
                    'Aktualny problem społeczny',
                    'Tylko prędkość robota',
                    'Rozrywka gry'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Co jest ważniejsze w FLL: Proces czy Wynik?",
                options: parseOptions(
                    'Tylko wynik',
                    'Tylko nagroda',
                    'Proces i nauka',
                    'Wielkość robota'
                ),
                correctAnswer: 'C',
            },
            {
                question: "Jaki jest wkład FLL w rozwój umiejętności STEM w młodym wieku?",
                options: parseOptions(
                    'Brak',
                    'Tylko rozrywka',
                    'Tworzy zainteresowanie nauką i inżynierią',
                    'Utrudnia naukę'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "Jaka jest różnica między FTC a FLL?",
                options: parseOptions(
                    'Są identyczne',
                    'FTC jest większy i bardziej złożony',
                    'FTC jest mniejszy',
                    'FTC jest bez robota'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Co mogą robić roboty FTC?',
                options: parseOptions(
                    'Tylko poruszać się',
                    'Pobierać obiekty i wykonywać zadania',
                    'Latać',
                    'Tylko obracać się'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jaki rodzaj pracy mechanicznej jest wymagany dla FTC?',
                options: parseOptions(
                    'Prosta montaż',
                    'Poważna konstrukcja mechaniczna',
                    'Tylko oprogramowanie',
                    'Brak konstrukcji'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Co należy brać pod uwagę podczas przygotowania do zawodów?',
                options: parseOptions(
                    'Kolor robota',
                    'Strategia zespołu',
                    'Koszulka zespołu',
                    'Tylko prędkość'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jaki poziom wiedzy robotycznej jest wymagany dla FTC?',
                options: parseOptions(
                    'Brak wymagań',
                    'Poziom inżynierski średni',
                    'Tylko wiedza o grze',
                    'Tylko oprogramowanie'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Jaki jest główny cel FTC?",
                options: parseOptions(
                    'Wygrać zawody',
                    'Kierować uczniów w stronę inżynierii',
                    'Sprzedawać roboty',
                    'Tylko się bawić'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jakie języki programowania są używane w FTC?',
                options: parseOptions(
                    'Java i programowanie w bloczkach',
                    'Tylko C++',
                    'Python obowiązkowy',
                    'Brak kodu'
                ),
                correctAnswer: 'A',
            },
            {
                question: "Dlaczego konstrukcja mechaniczna jest ważna w FTC?",
                options: parseOptions(
                    'Nie jest ważna',
                    'Robot wykonuje zadania',
                    'Tylko dla wyglądu',
                    'Sędzia tego wymaga'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak są zbudowane roboty FTC?',
                options: parseOptions(
                    'LEGO',
                    'Części zestawu metalowego',
                    'Karton',
                    'Zabawki z plastiku'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak należy zaplanować strategię i proces inżynierski na zawody FTC?',
                options: parseOptions(
                    'Losowo',
                    'Zaplanowany i przetestowany',
                    'Ostatni dzień',
                    'Tylko robiąc oprogramowanie'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "Co oznacza FIRST?",
                options: parseOptions(
                    'Future Innovation Science Teams',
                    'For Inspiration and Recognition of Science and Technology',
                    'Fast Robotics Initiative',
                    'Federation of Robot Teams'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Jaki jest pełny tytuł założyciela FIRST?",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "Jaki jest cel FIRST?",
                options: parseOptions(
                    'Sprzedawać roboty',
                    'Kierować młodych w stronę dziedzin STEM',
                    'Organizować zawody',
                    'Zarabiać pieniądze'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Jakie są podstawowe wartości FIRST?",
                options: parseOptions(
                    'Prędkość i konkurencja',
                    'Praca zespołowa i szacunek',
                    'Wygrać',
                    'Moc robota'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Co FIRST oczekuje od nas?',
                options: parseOptions(
                    'Tylko wygrać',
                    'Uczyć się i dzielić',
                    'Robić roboty',
                    'Pobić przeciwników'
                ),
                correctAnswer: 'B',
            },
            {
                question: '"Wartości podstawowe" - co to oznacza?',
                options: parseOptions(
                    'Punkty robota',
                    'Zachowanie zespołu i współpraca',
                    'Tylko wygrać',
                    'Reguły sędziego'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak możemy zastosować wartości FIRST w naszym życiu codziennym?',
                options: parseOptions(
                    'Nie możemy ich używać',
                    'Z szacunkiem i współpracą',
                    'Tylko podczas zawodów',
                    'Poza szkołą nie jest to konieczne'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak używamy wartości FIRST w pracy zespołowej?',
                options: parseOptions(
                    'Dyskutując',
                    'Współpracując',
                    'Pracując samodzielnie',
                    'Nie słuchając lidera'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Co oznacza "Gracious Professionalism"?',
                options: parseOptions(
                    'Twarda konkurencja',
                    'Szacunek i profesjonalizm',
                    'Żądza zwycięstwa',
                    'Cisza'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Co oznacza "Coopertition"?',
                options: parseOptions(
                    'Pobić przeciwników',
                    'Konkurencja i współpraca',
                    'Konkurencja samodzielna',
                    'Anulować zawody'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC wolontariusz i nagroda
        questions: [
            {
                question: 'Jak można zostać wolontariuszem FRC?',
                options: parseOptions(
                    'Zostać członkiem',
                    'Złożyć wniosek o wolontariat',
                    'Utworzyć zespół',
                    'Zrobić robota'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Kto może zostać wolontariuszem FRC?',
                options: parseOptions(
                    'Tylko uczniowie',
                    'Wolontariusze wszystkich wieków',
                    'Tylko nauczyciele',
                    'Tylko inżynierowie'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Co robią wolontariusze w FRC?",
                options: parseOptions(
                    'Sterować robotami',
                    'Wspierać organizację',
                    'Utworzyć zespół',
                    'Kierować zawodami'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak nowe zespoły powinny rozwijać swoje strategie?',
                options: parseOptions(
                    'Zrobić najtrudniejszego robota',
                    'Utworzyć prosty i niezawodny system',
                    'Tylko prędkość',
                    'Zrobić duży robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Jak wolontariusze pomagają w promowaniu FIRST?",
                options: parseOptions(
                    'Wspierając zawody',
                    'Robiąc roboty',
                    'Pisząc kod',
                    'Tylko obserwując'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Co jest brane pod uwagę przy przyznawaniu nagród FRC?',
                options: parseOptions(
                    'Tylko punkty',
                    'Praca zespołowa i wpływ',
                    'Kolor robota',
                    'Prędkość'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Jaki jest rol wolontariuszy w rodzinie FRC?",
                options: parseOptions(
                    'Tylko obserwować',
                    'Wspierać organizację',
                    'Sterować robotami',
                    'Być sędzią'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jaki jest rol wolontariuszy w promowaniu kultury FRC?',
                options: parseOptions(
                    'Brak',
                    'Świadczyć promocję i wsparcie',
                    'Tylko przyznawać nagrody',
                    'Robić roboty'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak można zostać Field Ressetter?',
                options: parseOptions(
                    'Zrobić robota',
                    'Złożyć wniosek o wolontariat',
                    'Utworzyć zespół',
                    'Być sędzią'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Czy cel nagród FRC jest tylko mierzyć sukces?",
                options: parseOptions(
                    'Tak',
                    'Nie, mierzy również kulturę zespołu',
                    'Tylko mierzyć prędkość',
                    'Mierzyć moc robota'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // Podział zadań
        questions: [
            {
                question: 'Jakie role są w zespole FRC?',
                options: parseOptions(
                    'Tylko kierowca',
                    'Mechanik, oprogramowanie, PR itp.',
                    'Tylko oprogramowanie',
                    'Sędzia'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jaki jest znaczenie podziału zadań?',
                options: parseOptions(
                    'Brak',
                    'Świadczyć zorganizowaną pracę',
                    'Powodować stratę czasu',
                    'Tylko lider pracuje'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak należy realizować podział ról w zespole?',
                options: parseOptions('Losowo', 'Według umiejętności', 'Według wieku', 'Według rozmiaru'),
                correctAnswer: 'B',
            },
            {
                question: 'Jak należy prowadzić komunikację między rolami zespołu?',
                options: parseOptions(
                    'Bez rozmawiania',
                    'Z regularną komunikacją',
                    'Tylko z liderem',
                    'Podczas zawodów'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Dlaczego podział zadań powinien być realizowany w zespole?',
                options: parseOptions(
                    'Aby uniknąć zamieszania',
                    'Dla rozrywki',
                    'Nie jest to konieczne',
                    'Tylko dla formalności'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Jakie są podstawowe zadania działu technicznego?',
                options: parseOptions(
                    'Robić promocję',
                    'Rozwijać robota',
                    'Robić filmy',
                    'Znajdować sponsorów'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Jakie są podstawowe zadania PR?",
                options: parseOptions(
                    'Robić roboty',
                    'Promować zespół',
                    'Pisać kod',
                    'Tworzyć pole gry'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak należy koordynować między zespołami mechanicznymi i oprogramowania?',
                options: parseOptions(
                    'Brak konieczności',
                    'Stała komunikacja',
                    'Pracować oddzielnie',
                    'Łączyć się podczas zawodów'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak brak przywództwa wpływa na wynik zespołu?',
                options: parseOptions(
                    'Nie wpływa',
                    'Obniża wynik',
                    'Zwiększa wynik',
                    'Zwiększa rozmiar robota'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jakie problemy mogą wystąpić, jeśli podział zadań nie jest realizowany prawidłowo?',
                options: parseOptions(
                    'Brak problemów',
                    'Zamieszanie i awarie',
                    'Robot przyspiesza',
                    'Punkty zwiększają się'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // Zawody FIRST
        questions: [
            {
                question: 'Na ile kategorii głównych są podzielone zawody FIRST?',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: 'Jakie są 3 zawody, które obejmuje FIRST?',
                options: parseOptions(
                    'FLL, FTC, FRC',
                    'VEX, RoboCup, FRC',
                    'FLL, VEX, FTC',
                    'RoboCup, FTC, FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Jaki jest pierwszy kontakt ucznia z FIRST?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Liga uniwersytecka'),
                correctAnswer: 'C',
            },
            {
                question: 'Dla jakich grup wiekowych są organizowane zawody?',
                options: parseOptions(
                    'Tylko dla szkoły średniej',
                    'Od szkoły podstawowej do szkoły średniej',
                    'Tylko dla uniwersytetu',
                    'Tylko dla dorosłych'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jaka jest różnica między robotami FRC a innymi robotami FIRST?',
                options: parseOptions(
                    'Rozmiar mniejszy',
                    'Rozmiar większy i bardziej potężny',
                    'Roboty LEGO',
                    'Możliwość latania'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Ile razy są większe roboty FRC niż roboty FTC?',
                options: parseOptions('Ten sam rozmiar', 'Około 2 razy większy', '10 razy większy', 'Rozmiar mniejszy'),
                correctAnswer: 'B',
            },
            {
                question: 'Jaki jest zawód, który używa najmniejszych robotów?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Żaden'),
                correctAnswer: 'C',
            },
            {
                question: 'Jaki jest zawód, który używa największych i najbardziej przemysłowych robotów?',
                options: parseOptions('FLL', 'FTC', 'FRC', 'Wszystkie są takie same'),
                correctAnswer: 'C',
            },
            {
                question: 'Jak działa punktacja w zawodach?',
                options: parseOptions(
                    'Losowo',
                    'Według sukcesów w zadaniach',
                    'Według rozmiaru robota',
                    'Sędzia wybiera'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jak rozwiązywać problemy mechaniczne, które występują podczas zawodów?',
                options: parseOptions(
                    'Wycofanie się z zawodów',
                    'Zespół pit wykonuje szybkie naprawy',
                    'Czekanie',
                    'Anulowanie meczu'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsPl;
