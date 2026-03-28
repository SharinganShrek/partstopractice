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

const testsIt: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "Come vengono assegnate le mansioni ai robot in FLL?",
                options: parseOptions(
                    'Selezionati casualmente',
                    'Mansioni determinate dal tema della stagione',
                    'Le squadre inventano mansioni',
                    'Gli arbitri decidono durante la partita'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Come vince una squadra FLL?',
                options: parseOptions(
                    'Con il robot più grande',
                    'Come squadra più veloce',
                    'Con la performance del robot, il progetto e il lavoro di squadra',
                    'Con solo i punti del robot'
                ),
                correctAnswer: 'C',
            },
            {
                question: 'Qual è il contributo accademico di FLL?',
                options: parseOptions(
                    'Solo intrattenimento',
                    'Sviluppa abilità sportive',
                    'Sviluppa abilità STEM',
                    'Riduce il successo negli esami'
                ),
                correctAnswer: 'C',
            },
            {
                question: "Come viene progettato il robot in FLL?",
                options: parseOptions(
                    'Acquistato già pronto',
                    'Progettato con pezzi LEGO',
                    'Realizzato tagliando metallo',
                    'Assemblato durante la competizione'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Quali sono i 4 componenti principali di FLL?",
                options: parseOptions(
                    'Codice, velocità, competizione, punti',
                    'Gioco di robot, progetto, valori, progettazione',
                    'Solo competizione di robot',
                    'Presentazione e premio'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Qual è l\'obiettivo della competizione FLL?',
                options: parseOptions(
                    'Combattimento di robot',
                    'Insegnamento della risoluzione di problemi e dell\'ingegneria',
                    'Competizione di velocità',
                    'Solo ottenere premi'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quanto durano le partite di robot FLL?',
                options: parseOptions('1 minuto', '2 minuti 30 secondi', '5 minuti', '10 minuti'),
                correctAnswer: 'B',
            },
            {
                question: "Qual è il tema principale di ogni stagione FLL?",
                options: parseOptions(
                    'Argomenti casuali',
                    'Un problema sociale attuale',
                    'Solo la velocità del robot',
                    'L\'intrattenimento del gioco'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Quale è più importante in FLL: il processo o il risultato?",
                options: parseOptions(
                    'Solo il risultato',
                    'Solo il premio',
                    'Processo e apprendimento',
                    'Dimensione del robot'
                ),
                correctAnswer: 'C',
            },
            {
                question: "Qual è il contributo di FLL allo sviluppo delle abilità STEM a un\'età precoce?",
                options: parseOptions(
                    'Nessuno',
                    'Solo intrattenimento',
                    'Crea interesse per la scienza e l\'ingegneria',
                    'Rende più difficile la scuola'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "Qual è la differenza tra FTC e FLL?",
                options: parseOptions(
                    'Sono identici',
                    'FTC è più grande e complesso',
                    'FTC è più piccolo',
                    'FTC è senza robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Cosa possono fare i robot FTC?',
                options: parseOptions(
                    'Solo muoversi',
                    'Raccogliere oggetti e svolgere mansioni',
                    'Volare',
                    'Solo girare'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quale tipo di lavoro meccanico è richiesto per FTC?',
                options: parseOptions(
                    'Montaggio semplice',
                    'Progettazione meccanica seria',
                    'Solo software',
                    'Nessuna progettazione'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Cosa si deve considerare durante la preparazione per la competizione?',
                options: parseOptions(
                    'Colore del robot',
                    'Strategia della squadra',
                    'Maglietta della squadra',
                    'Solo velocità'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quanto conoscenza robotica è richiesta per FTC?',
                options: parseOptions(
                    'Nessuna richiesta',
                    'Livello di ingegneria medio',
                    'Solo conoscenza del gioco',
                    'Solo software'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Qual è l\'obiettivo principale di FTC?",
                options: parseOptions(
                    'Vincere la competizione',
                    'Dirigere gli studenti verso l\'ingegneria',
                    'Vendere robot',
                    'Solo divertirsi'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quali linguaggi di programmazione vengono utilizzati in FTC?',
                options: parseOptions(
                    'Java e programmazione a blocchi',
                    'Solo C++',
                    'Python obbligatorio',
                    'Nessun codice'
                ),
                correctAnswer: 'A',
            },
            {
                question: "Perché la progettazione meccanica è importante in FTC?",
                options: parseOptions(
                    'Non è importante',
                    'Il robot svolge mansioni',
                    'Solo per l\'aspetto',
                    'L\'arbitro lo richiede'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Come sono costruiti i robot FTC?',
                options: parseOptions(
                    'LEGO',
                    'Pezi di kit in metallo',
                    'Cartone',
                    'Giocattoli in plastica'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Come si deve pianificare la strategia e il processo di ingegneria per la competizione FTC?',
                options: parseOptions(
                    'Casualmente',
                    'Pianificato e testato',
                    'L\'ultimo giorno',
                    'Solo facendo software'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "Cosa significa FIRST?",
                options: parseOptions(
                    'Future Innovation Science Teams',
                    'For Inspiration and Recognition of Science and Technology',
                    'Fast Robotics Initiative',
                    'Federation of Robot Teams'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Qual è il nome completo del fondatore di FIRST?",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "Qual è la missione di FIRST?",
                options: parseOptions(
                    'Vendere robot',
                    'Dirigere i giovani verso le aree STEM',
                    'Organizzare competizioni',
                    'Guadagnare denaro'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Quali sono i valori fondamentali di FIRST?",
                options: parseOptions(
                    'Velocità e competizione',
                    'Lavoro di squadra e rispetto',
                    'Vincere',
                    'Potenza del robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Cosa FIRST si aspetta da noi?',
                options: parseOptions(
                    'Solo vincere',
                    'Imparare e condividere',
                    'Fare robot',
                    'Sconfiggere gli avversari'
                ),
                correctAnswer: 'B',
            },
            {
                question: '"Valori fondamentali" - cosa significa?',
                options: parseOptions(
                    'Punti del robot',
                    'Comportamento della squadra e collaborazione',
                    'Solo vincere',
                    'Regole dell\'arbitro'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Come possiamo applicare i valori di FIRST nella nostra vita quotidiana?',
                options: parseOptions(
                    'Non possiamo utilizzarli',
                    'Con rispetto e collaborazione',
                    'Solo durante la competizione',
                    'Fuori dalla scuola non è necessario'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Come utilizziamo i valori di FIRST nel lavoro di squadra?',
                options: parseOptions(
                    'Discutendo',
                    'Collaborando',
                    'Lavorando da soli',
                    'Non ascoltando il leader'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Cosa significa "Gracious Professionalism"?',
                options: parseOptions(
                    'Competizione dura',
                    'Professionalismo rispettoso',
                    'Fame di vittoria',
                    'Silenzio'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Cosa significa "Coopertition"?',
                options: parseOptions(
                    'Sconfiggere gli avversari',
                    'Competere e collaborare',
                    'Competere da soli',
                    'Annullare la competizione'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC volontario e premio
        questions: [
            {
                question: 'Come si può diventare volontario FRC?',
                options: parseOptions(
                    'Diventare membro',
                    'Fare una richiesta di volontariato',
                    'Creare una squadra',
                    'Fare un robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Chi può diventare volontario FRC?',
                options: parseOptions(
                    'Solo gli studenti',
                    'I volontari di tutte le età',
                    'Solo gli insegnanti',
                    'Solo gli ingegneri'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Cosa fanno i volontari in FRC?",
                options: parseOptions(
                    'Guidare i robot',
                    'Sostenere l\'organizzazione',
                    'Creare una squadra',
                    'Dirigere la competizione'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Come le nuove squadre devono sviluppare le loro strategie?',
                options: parseOptions(
                    'Fare il robot più difficile',
                    'Creare un sistema semplice e affidabile',
                    'Solo velocità',
                    'Fare un grande robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Come i volontari aiutano a diffondere FIRST?",
                options: parseOptions(
                    'Sostenendo le competizioni',
                    'Fare robot',
                    'Scrivere codice',
                    'Solo guardando'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Cosa si considera quando si assegnano i premi FRC?',
                options: parseOptions(
                    'Solo i punti',
                    'Lavoro di squadra e impatto',
                    'Colore del robot',
                    'Velocità'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Qual è il ruolo dei volontari nella famiglia FRC?",
                options: parseOptions(
                    'Solo guardare',
                    'Sostenere l\'organizzazione',
                    'Guidare i robot',
                    'Essere arbitro'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Qual è il ruolo dei volontari nella diffusione della cultura FRC?',
                options: parseOptions(
                    'Nessuno',
                    'Fornire promozione e sostegno',
                    'Solo assegnare premi',
                    'Fare robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Come si può diventare Field Ressetter?',
                options: parseOptions(
                    'Fare un robot',
                    'Fare una richiesta di volontariato',
                    'Creare una squadra',
                    'Essere arbitro'
                ),
                correctAnswer: 'B',
            },
            {
                question: "L\'obiettivo dei premi FRC è solo misurare il successo?",
                options: parseOptions(
                    'Sì',
                    'No, misura anche la cultura della squadra',
                    'Solo misura la velocità',
                    'Misura la potenza del robot'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // Distribuzione dei compiti
        questions: [
            {
                question: 'Quali sono i ruoli che si trovano in una squadra FRC?',
                options: parseOptions(
                    'Solo guidatore',
                    'Meccanico, software, PR, ecc.',
                    'Solo software',
                    'Arbitro'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quale è l\'importanza della distribuzione dei compiti?',
                options: parseOptions(
                    'Nessuna',
                    'Fornisce un lavoro organizzato',
                    'Causa perdita di tempo',
                    'Solo il leader lavora'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Come si deve realizzare la distribuzione dei ruoli in una squadra?',
                options: parseOptions('Casualmente', 'Secondo la competenza', 'Secondo l\'età', 'Secondo la dimensione'),
                correctAnswer: 'B',
            },
            {
                question: 'Come si deve gestire la comunicazione tra i ruoli della squadra?',
                options: parseOptions(
                    'Senza parlare',
                    'Con una comunicazione regolare',
                    'Solo con il leader',
                    'Durante la competizione'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Perché la distribuzione dei compiti deve essere realizzata in una squadra?',
                options: parseOptions(
                    'Per evitare la confusione',
                    'Per divertirsi',
                    'Non è necessario',
                    'Solo per formalità'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Quali sono i compiti principali della divisione tecnica?',
                options: parseOptions(
                    'Fare promozione',
                    'Sviluppare il robot',
                    'Fare video',
                    'Trovare sponsor'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Quali sono i compiti principali di PR?",
                options: parseOptions(
                    'Fare robot',
                    'Promuovere la squadra',
                    'Scrivere codice',
                    'Creare il campo di gioco'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Come si deve coordinare tra le squadre di meccanica e software?',
                options: parseOptions(
                    'Nessuna necessità',
                    'Comunicazione costante',
                    'Lavorare separatamente',
                    'Unirsi durante la competizione'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Come la mancanza di leadership influenza la performance della squadra?',
                options: parseOptions(
                    'Non influenza',
                    'Riduce la performance',
                    'Aumenta la performance',
                    'Aumenta la dimensione del robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quali problemi possono sorgere se la distribuzione dei compiti non viene realizzata correttamente?',
                options: parseOptions(
                    'Nessun problema',
                    'Confusione e malfunzionamento',
                    'Il robot si velocizza',
                    'I punti aumentano'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // Competizione FIRST
        questions: [
            {
                question: 'In quante categorie principali sono divise le competizioni FIRST?',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: 'Quali sono le 3 competizioni che comprende FIRST?',
                options: parseOptions(
                    'FLL, FTC, FRC',
                    'VEX, RoboCup, FRC',
                    'FLL, VEX, FTC',
                    'RoboCup, FTC, FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Quale è la prima competizione che un studente incontra con FIRST?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Lega universitaria'),
                correctAnswer: 'C',
            },
            {
                question: 'Per quali gruppi di età sono organizzate le competizioni?',
                options: parseOptions(
                    'Solo per la scuola superiore',
                    'Dalla scuola elementare alla scuola superiore',
                    'Solo per l\'università',
                    'Solo per gli adulti'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quale è la differenza tra i robot FRC e gli altri robot FIRST?',
                options: parseOptions(
                    'Dimensione più piccola',
                    'Dimensione più grande e più potente',
                    'Robot LEGO',
                    'Capacità di volo'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quanto sono grandi i robot FRC rispetto ai robot FTC?',
                options: parseOptions('Stessa dimensione', 'Circa 2 volte più grande', '10 volte più grande', 'Dimensione più piccola'),
                correctAnswer: 'B',
            },
            {
                question: 'Quale è la competizione che utilizza i robot più piccoli?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Nessuno'),
                correctAnswer: 'C',
            },
            {
                question: 'Quale è la competizione che utilizza i robot più grandi e più industriali?',
                options: parseOptions('FLL', 'FTC', 'FRC', 'Tutti sono identici'),
                correctAnswer: 'C',
            },
            {
                question: 'Come funziona la valutazione nelle competizioni?',
                options: parseOptions(
                    'Casualmente',
                    'Secondo i successi delle mansioni',
                    'Secondo la dimensione del robot',
                    'L\'arbitro sceglie'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Come si risolvono i problemi meccanici che sorgono durante la competizione?',
                options: parseOptions(
                    'Ritirandosi dalla competizione',
                    'L\'equipe di pit effettua riparazioni rapide',
                    'Aspettando',
                    'Annullando la partita'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsIt;
