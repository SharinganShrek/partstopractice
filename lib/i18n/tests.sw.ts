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

const testsSw: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "Jinsi gani roboti zinazoshindana katika FLL hupokea kazi zao?",
                options: parseOptions(
                    'Zinachaguliwa kwa bahati nasibu',
                    'Kazi zinazofafanuliwa na mada ya msimu',
                    'Timu zinabuni kazi',
                    'Wamuamu huamua wakati wa mchezo'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Timu ya FLL inashinda vipi?',
                options: parseOptions(
                    'Kwa roboti kubwa zaidi',
                    'Kama timu yenye kasi zaidi',
                    'Kwa utendaji wa roboti, mradi na ushirikiano wa timu',
                    'Kwa alama za roboti pekee'
                ),
                correctAnswer: 'C',
            },
            {
                question: 'FLL inatoa mchango gani katika maana ya kitaaluma?',
                options: parseOptions(
                    'Hutoa burudani tu',
                    'Hutoa ujuzi wa michezo',
                    'Hukuza ujuzi wa STEM',
                    'Inapunguza mafanikio ya mtihani'
                ),
                correctAnswer: 'C',
            },
            {
                question: "Jinsi gani muundo wa roboti hufanywa katika FLL?",
                options: parseOptions(
                    'Hununuliwa tayari',
                    'Hundizwa kwa sehemu za LEGO',
                    'Hufanywa kwa kukata chuma',
                    'Hujengwa wakati wa mashindano'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Vipengele vinne vikuu vya FLL ni vipi?",
                options: parseOptions(
                    'Msimbo, kasi, mashindano, alama',
                    'Mchezo wa roboti, mradi, maadili, muundo',
                    'Mashindano ya roboti pekee',
                    'Utangazaji na tuzo'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Lengo la mashindano ya FLL ni nini?',
                options: parseOptions(
                    'Kupigana kwa roboti',
                    'Kufundisha suluhisho la matatizo na uhandisi',
                    'Kufanya mbio za kasi',
                    'Kupata tuzo pekee'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Michezo ya roboti ya FLL hudumu kwa dakika ngapi?',
                options: parseOptions('Dakika 1', 'Dakika 2:30', 'Dakika 5', 'Dakika 10'),
                correctAnswer: 'B',
            },
            {
                question: "Mada kuu ya kila msimu katika FLL inahusu nini?",
                options: parseOptions(
                    'Mada za bahati nasibu',
                    'Tatizo la kijamii linaloendelea',
                    'Kasi ya roboti pekee',
                    'Burudani ya mchezo'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Nini ni muhimu zaidi katika FLL: Mchakato au Matokeo?",
                options: parseOptions(
                    'Matokeo pekee',
                    'Tuzo pekee',
                    'Mchakato na kujifunza',
                    'Ukubwa wa roboti'
                ),
                correctAnswer: 'C',
            },
            {
                question: "FLL inatoa mchango gani katika maendeleo ya STEM kwa umri mdogo?",
                options: parseOptions(
                    'Hakuna',
                    'Hutoa burudani tu',
                    'Huunda hamu katika sayansi na uhandisi',
                    'Inafanya masomo kuwa magumu'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "Tofauti kati ya FTC na FLL ni nini?",
                options: parseOptions(
                    'Zinafanana',
                    'FTC ni kubwa zaidi na tata zaidi',
                    'FTC ni ndogo zaidi',
                    'FTC haina roboti'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Roboti za FTC zinaweza kufanya nini?',
                options: parseOptions(
                    'Zinaweza kusogea tu',
                    'Kutwaa vitu na kutekeleza kazi',
                    'Zinaweza kuruka',
                    'Zinaweza kuzunguka tu'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC inahitaji aina gani ya kazi ya mitambo?',
                options: parseOptions(
                    'Ufungaji rahisi',
                    'Muundo wa mitambo unaohitaji uangalifu',
                    'Programu pekee',
                    'Hakuna muundo'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Nini cha kuzingatia zaidi wakati wa kujiandaa kwa mashindano?',
                options: parseOptions(
                    'Rangi ya roboti',
                    'Mbinu ya timu',
                    'Shati la timu',
                    'Kasi pekee'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC inahitaji ujuzi gani wa robotiki?',
                options: parseOptions(
                    'Hauhitaji kabisa',
                    'Ujuzi wa kiufundi wa wastani',
                    'Ujuzi wa mchezo pekee',
                    'Programu pekee'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Lengo kuu la FTC ni nini?",
                options: parseOptions(
                    'Kushinda mashindano',
                    'Kuongoza wanafunzi kuelekea uhandisi',
                    'Kuziuza roboti',
                    'Kufurahia tu'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Lugha gani za programu zinatumika katika FTC?',
                options: parseOptions(
                    'Java na msimbo wa vipande',
                    'C++ pekee',
                    'Python ni lazima',
                    'Hakuna msimbo'
                ),
                correctAnswer: 'A',
            },
            {
                question: "Kwa nini muundo wa mitambo ni muhimu katika FTC?",
                options: parseOptions(
                    'Si muhimu',
                    'Roboti hutekeleza kazi',
                    'Kwa sura tu',
                    'Mwamuzi anahitaji'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Roboti za FTC zina muundo gani?',
                options: parseOptions(
                    'LEGO',
                    'Sehemu za chuma za seti',
                    'Kadi',
                    'Doa la plastiki'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Mbinu na mchakato wa uhandisi wa kujiandaa kwa mashindano ya FTC unapaswa kupangwa vipi?',
                options: parseOptions(
                    'Kwa bahati nasibu',
                    'Kwa mpango na kupima',
                    'Siku ya mwisho',
                    'Kwa kufanya programu pekee'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "FIRST ni kifupisho cha nini?",
                options: parseOptions(
                    'Future Innovation Science Teams',
                    'For Inspiration and Recognition of Science and Technology',
                    'Fast Robotics Initiative',
                    'Federation of Robot Teams'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Jina kamili la mwanzilishi wa FIRST ni nani?",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "Dhumuni la FIRST ni nini?",
                options: parseOptions(
                    'Kuziuza roboti',
                    'Kuongoza vijana kuelekea taaluma za STEM',
                    'Kufanya mashindano',
                    'Kupata pesa'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Thamani kuu za FIRST ni zipi?",
                options: parseOptions(
                    'Kasi na ushindani',
                    'Ushirikiano wa timu na heshima',
                    'Kushinda',
                    'Nguvu ya roboti'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FIRST inatufanya tuamini nini hasa?',
                options: parseOptions(
                    'Kushinda tu',
                    'Kujifunza na kushirikiana',
                    'Kujenga roboti',
                    'Kushinda mpinzani'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Dhana ya "Core values" inahusu nini?',
                options: parseOptions(
                    'Alama za roboti',
                    'Tabia za timu na ushirikiano',
                    'Kushinda tu',
                    'Sheria za mwamuzi'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Tunawezaje kuingiza thamani za FIRST katika maisha ya kila siku?',
                options: parseOptions(
                    'Hatutumii',
                    'Kwa heshima na ushirikiano',
                    'Katika mashindano tu',
                    'Hazihitajiki nje ya shule'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Tunawezaje kutumia thamani za FIRST katika ushirikiano wa timu?',
                options: parseOptions(
                    'Kwa kujadiliana',
                    'Kwa kushirikiana',
                    'Kwa kufanya kazi peke yako',
                    'Kwa kutomwamini kiongozi'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Gracious Professionalism inamaanisha nini?',
                options: parseOptions(
                    'Ushindani mkali',
                    'Utaalamu wenye heshima',
                    'Hamu ya kushinda',
                    'Kimya'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Dhana ya Coopertition inamaanisha nini?',
                options: parseOptions(
                    'Kushinda mpinzani',
                    'Kushindana wakati wa kushirikiana',
                    'Kushindana peke yako',
                    'Kufuta mashindano'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC mswahili na tuzo
        questions: [
            {
                question: 'Kufanya nini ili kuwa mswahili wa FRC?',
                options: parseOptions(
                    'Kuwa mwanachama',
                    'Kufanya maombi ya kuwa mswahili',
                    'Kuunda timu',
                    'Kujenga roboti'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Nani anaweza kuwa mswahili wa FRC?',
                options: parseOptions(
                    'Wanafunzi pekee',
                    'Watu wa umri wowote',
                    'Walimu pekee',
                    'Wahandisi pekee'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Waswahili wanafanya nini katika FRC?",
                options: parseOptions(
                    'Wanaendesha roboti',
                    'Wanaunga mkono utaratibu',
                    'Wanaunda timu',
                    'Wanahamasisha mashindano'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Timu mpya zinapaswa kuendeleza mbinu zao kwa upande gani?',
                options: parseOptions(
                    'Kujenga roboti ngumu zaidi',
                    'Kuanzisha mfumo rahisi na wa kutegemewa',
                    'Kasi pekee',
                    'Kujenga roboti kubwa'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Waswahili wanasaidia kusambaza FIRST vipi?",
                options: parseOptions(
                    'Kwa kuunga mkono mashindano',
                    'Kwa kujenga roboti',
                    'Kwa kuandika msimbo',
                    'Kwa kutazama tu'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Wanachukua nini kuzingatia wakati wa kutoa tuzo za FRC?',
                options: parseOptions(
                    'Alama pekee',
                    'Ushirikiano wa timu na athari',
                    'Rangi ya roboti',
                    'Kasi'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Jukumu la waswahili katika familia ya FRC ni nini?",
                options: parseOptions(
                    'Kutazama tu',
                    'Kusaidia utaratibu',
                    'Kuendesha roboti',
                    'Lazima kuwa mwamuzi'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Jukumu la waswahili katika kusambaza utamaduni wa FRC ni nini?',
                options: parseOptions(
                    'Hakuna jukumu',
                    'Kutoa utangazaji na msaada',
                    'Kutoa tuzo pekee',
                    'Kujenga roboti'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Kufanya nini ili kuwa Field Resetter?',
                options: parseOptions(
                    'Kujenga roboti',
                    'Kufanya maombi kama mswahili',
                    'Kuunda timu',
                    'Kuwa mwamuzi'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Lengo la tuzo katika FRC ni kupima mafanikio tu?",
                options: parseOptions(
                    'Ndiyo',
                    'Hapana, pia hupima utamaduni wa timu',
                    'Hupima kasi tu',
                    'Hupima nguvu ya roboti'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // Ugawaji wa kazi
        questions: [
            {
                question: 'Kuna majukumu gani katika timu ya FRC?',
                options: parseOptions(
                    'Dereva pekee',
                    'Mitambo, programu, mahusiano ya umma, n.k.',
                    'Programu pekee',
                    'Mwamuzi'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Umuhimu wa ugawaji wa kazi ni nini?',
                options: parseOptions(
                    'Hakuna umuhimu',
                    'Hutoa kazi ya mpango',
                    'Hupoteza muda',
                    'Kiongozi anafanya kazi pekee'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Ugawaji wa majukumu katika timu unapaswa kufanywa vipi?',
                options: parseOptions('Kwa bahati nasibu', 'Kulingana na uwezo', 'Kulingana na umri', 'Kulingana na rangi'),
                correctAnswer: 'B',
            },
            {
                question: 'Mawasiliano kati ya majukumu ya timu yanapaswa kuendeshwa vipi?',
                options: parseOptions(
                    'Bila mazungumzo',
                    'Kwa mawasiliano ya mara kwa mara',
                    'Na kiongozi pekee',
                    'Kwa mazungumzo wakati wa mashindano'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Kwa nini ugawaji wa kazi unapaswa kufanywa ndani ya timu?',
                options: parseOptions(
                    'Ili kuepuka mchanganyiko',
                    'Kwa burudani',
                    'Si muhimu',
                    'Kwa ajili ya rasmi tu'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Majukumu ya msingi ya kitengo cha kiufundi ni yapi?',
                options: parseOptions(
                    'Kufanya utangazaji',
                    'Kukuza roboti',
                    'Kupiga video',
                    'Kupata wafadhili'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Majukumu ya msingi ya PR ni yapi?",
                options: parseOptions(
                    'Kujenga roboti',
                    'Kutangaza timu',
                    'Kuandika msimbo',
                    'Kuandaa uwanja'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Aina gani ya uratibu unahitajika kati ya timu za mitambo na programu?',
                options: parseOptions(
                    'Hauhitajiki',
                    'Mawasiliano endelevu yanahitajika',
                    'Hufanya kazi tofauti',
                    'Huungana wakati wa mashindano'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Ukosefu wa uongozi unavyoathiri utendaji wa timu ni vipi?',
                options: parseOptions(
                    'Haathiri',
                    'Hupunguza utendaji',
                    'Huongeza utendaji',
                    'Hukuza roboti'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Matatizo gani yanaweza kutokea siku ya mashindano ikiwa ugawaji wa kazi haujafanywa vizuri?',
                options: parseOptions(
                    'Hakuna matatizo',
                    'Mchanganyiko na kukwama',
                    'Roboti huwa na kasi',
                    'Alama huongezeka'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // Mashindano ya FIRST
        questions: [
            {
                question: 'Mashindano ya FIRST yanagawanyika katika kategoria ngapi kuu?',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: 'Mashindano matatu gani yanayofanyika chini ya FIRST?',
                options: parseOptions(
                    'FLL, FTC, FRC',
                    'VEX, RoboCup, FRC',
                    'FLL, VEX, FTC',
                    'RoboCup, FTC, FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Mashindano gani mwanafunzi anayokutana nayo kwa mara ya kwanza na FIRST?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Ligi ya chuo kikuu'),
                correctAnswer: 'C',
            },
            {
                question: 'Mashindano yanawalenga kikundi gani cha umri?',
                options: parseOptions(
                    'Shule ya upili pekee',
                    'Kuanzia shule ya msingi hadi shule ya upili',
                    'Chuo kikuu pekee',
                    'Watu wazima pekee'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Roboti za FRC zinatofautiana vipi na roboti zingine za FIRST?',
                options: parseOptions(
                    'Zinakuwa ndogo',
                    'Zinakuwa kubwa zaidi na zenye nguvu',
                    'Zinakuwa za LEGO',
                    'Zinaweza kuruka'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Roboti za FRC ni kubwa mara ngapi kuliko roboti za FTC?',
                options: parseOptions('Sawa', 'Mara 2 hivi', 'Mara 10', 'Ndogo zaidi'),
                correctAnswer: 'B',
            },
            {
                question: 'Mashindano yapi yanayotumia roboti ndogo zaidi?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Hakuna'),
                correctAnswer: 'C',
            },
            {
                question: 'Mashindano yapi yanayotumia roboti kubwa zaidi na za viwandani?',
                options: parseOptions('FLL', 'FTC', 'FRC', 'Zote sawa'),
                correctAnswer: 'C',
            },
            {
                question: 'Alama katika mashindano zinahesabiwa vipi?',
                options: parseOptions(
                    'Kwa bahati nasibu',
                    'Kulingana na mafanikio ya kazi',
                    'Kulingana na ukubwa wa roboti',
                    'Mwamuzi anachagua'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Matatizo ya mitambo yanayotokea wakati wa mashindano yanashughulikiwa vipi?',
                options: parseOptions(
                    'Kujiondoa katika mashindano',
                    'Timu ya pit inafanya marekebisho ya haraka',
                    'Kungoja',
                    'Kufuta mchezo'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsSw;
