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

const testsDe: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "Wie werden Aufgaben für Roboter im FLL zugewiesen?",
                options: parseOptions(
                    'Zufällig ausgewählt',
                    'Aufgaben werden durch das Saison-Thema bestimmt',
                    'Teams erfinden Aufgaben',
                    'Schiedsrichter entscheiden während des Spiels'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie gewinnt ein FLL-Team?',
                options: parseOptions(
                    'Mit dem größten Roboter',
                    'Als das schnellste Team',
                    'Mit Robot-Leistung, Projekt und Teamarbeit',
                    'Nur mit Robot-Punkten'
                ),
                correctAnswer: 'C',
            },
            {
                question: 'Welchen akademischen Beitrag kann FLL leisten?',
                options: parseOptions(
                    'Nur Unterhaltung',
                    'Entwickelt Sportfähigkeiten',
                    'Entwickelt STEM-Fähigkeiten',
                    'Verringert den Erfolg in Prüfungen'
                ),
                correctAnswer: 'C',
            },
            {
                question: "Wie wird die Robotik-Entwicklung im FLL durchgeführt?",
                options: parseOptions(
                    'Kauf eines fertigen Roboters',
                    'Entwicklung mit LEGO-Teilen',
                    'Herstellung durch Metallschneiden',
                    'Aufbau während des Wettbewerbs'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Was sind die 4 Hauptkomponenten des FLL?",
                options: parseOptions(
                    'Code, Geschwindigkeit, Wettbewerb, Punkte',
                    'Roboter-Spiel, Projekt, Werte, Design',
                    'Nur Roboter-Wettbewerb',
                    'Präsentation und Auszeichnung'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Was ist das Ziel des FLL-Wettbewerbs?',
                options: parseOptions(
                    'Roboter-Kampf',
                    'Beibringung von Problemlösung und Ingenieurskunst',
                    'Geschwindigkeitswettbewerb',
                    'Nur Auszeichnungen'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie lange dauern FLL-Roboter-Spiele?',
                options: parseOptions('1 Minute', '2 Minuten 30 Sekunden', '5 Minuten', '10 Minuten'),
                correctAnswer: 'B',
            },
            {
                question: "Was umfasst das Hauptthema jeder FLL-Saison?",
                options: parseOptions(
                    'Zufällige Themen',
                    'Ein aktuelles soziales Problem',
                    'Nur Roboter-Geschwindigkeit',
                    'Spiel-Unterhaltung'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Was ist im FLL wichtiger: Prozess oder Ergebnis?",
                options: parseOptions(
                    'Nur das Ergebnis',
                    'Nur die Auszeichnung',
                    'Prozess und Lernen',
                    'Roboter-Größe'
                ),
                correctAnswer: 'C',
            },
            {
                question: "Welchen Beitrag leistet FLL zur Entwicklung von STEM-Fähigkeiten im jungen Alter?",
                options: parseOptions(
                    'Keinen',
                    'Nur Unterhaltung',
                    'Erzeugt Interesse an Wissenschaft und Ingenieurskunst',
                    'Erschwert den Unterricht'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "Was ist der Unterschied zwischen FTC und FLL?",
                options: parseOptions(
                    'Sie sind gleich',
                    'FTC ist größer und komplexer',
                    'FTC ist kleiner',
                    'FTC ist roboterlos'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Was können FTC-Roboter?',
                options: parseOptions(
                    'Nur bewegen',
                    'Objekte aufnehmen und Aufgaben ausführen',
                    'Fliegen',
                    'Nur drehen'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Welche Art von mechanischer Arbeit ist für FTC erforderlich?',
                options: parseOptions(
                    'Einfache Montage',
                    'Ernsthafte mechanische Konstruktion',
                    'Nur Software',
                    'Keine Konstruktion'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Was muss während der Vorbereitung auf den Wettbewerb am meisten beachtet werden?',
                options: parseOptions(
                    'Roboter-Farbe',
                    'Team-Strategie',
                    'Team-T-Shirt',
                    'Nur Geschwindigkeit'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie viel robotische Kenntnisse sind für FTC erforderlich?',
                options: parseOptions(
                    'Keine erforderlich',
                    'Mittleres Ingenieurs-Niveau',
                    'Nur Spiel-Kenntnisse',
                    'Nur Software'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Was ist das Hauptziel von FTC?",
                options: parseOptions(
                    'Wettbewerb gewinnen',
                    'Schüler zur Ingenieurskunst führen',
                    'Roboter verkaufen',
                    'Nur Spaß haben'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Welche Programmiersprachen werden in FTC verwendet?',
                options: parseOptions(
                    'Java und Block-Programmierung',
                    'Nur C++',
                    'Python ist obligatorisch',
                    'Kein Code'
                ),
                correctAnswer: 'A',
            },
            {
                question: "Warum ist mechanische Konstruktion in FTC wichtig?",
                options: parseOptions(
                    'Sie ist nicht wichtig',
                    'Der Roboter führt Aufgaben aus',
                    'Nur für das Aussehen',
                    'Der Schiedsrichter verlangt es'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie sind FTC-Roboter aufgebaut?',
                options: parseOptions(
                    'LEGO',
                    'Metall-Kit-Teile',
                    'Karton',
                    'Plastik-Spielzeug'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie sollte die Strategie und der Ingenieurs-Prozess für den FTC-Wettbewerb geplant werden?',
                options: parseOptions(
                    'Zufällig',
                    'Geplant und getestet',
                    'Am letzten Tag',
                    'Nur durch Software-Entwicklung'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "Was bedeutet FIRST?",
                options: parseOptions(
                    'Future Innovation Science Teams',
                    'For Inspiration and Recognition of Science and Technology',
                    'Fast Robotics Initiative',
                    'Federation of Robot Teams'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Was ist der vollständige Name des Gründers von FIRST?",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "Was ist die Mission von FIRST?",
                options: parseOptions(
                    'Roboter verkaufen',
                    'Jugendliche zur Wissenschaft und Ingenieurskunst führen',
                    'Wettbewerbe durchführen',
                    'Geld verdienen'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Was sind die Kernwerte von FIRST?",
                options: parseOptions(
                    'Geschwindigkeit und Wettbewerb',
                    'Teamarbeit und Respekt',
                    'Gewinnen',
                    'Roboter-Kraft'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Was erwartet FIRST von uns?',
                options: parseOptions(
                    'Nur gewinnen',
                    'Lernen und teilen',
                    'Roboter bauen',
                    'Gegner besiegen'
                ),
                correctAnswer: 'B',
            },
            {
                question: '"Core Values" - was bedeutet das?',
                options: parseOptions(
                    'Roboter-Punkte',
                    'Team-Verhalten und Zusammenarbeit',
                    'Nur gewinnen',
                    'Schiedsrichter-Regeln'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie können wir die Werte von FIRST in unserem Alltag umsetzen?',
                options: parseOptions(
                    'Wir können sie nicht verwenden',
                    'Mit Respekt und Zusammenarbeit',
                    'Nur während des Wettbewerbs',
                    'Außerhalb der Schule ist es nicht notwendig'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie verwenden wir die Werte von FIRST in der Teamarbeit?',
                options: parseOptions(
                    'Durch Streit',
                    'Durch Zusammenarbeit',
                    'Durch Einzelarbeit',
                    'Durch Nichtbeachten des Leiters'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Was bedeutet "Gracious Professionalism"?',
                options: parseOptions(
                    'Harter Wettbewerb',
                    'Respektvoller Professionalismus',
                    'Gewinn-Hunger',
                    'Stille'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Was bedeutet "Coopertition"?',
                options: parseOptions(
                    'Gegner besiegen',
                    'Wettbewerb und Zusammenarbeit',
                    'Allein antreten',
                    'Wettbewerb absagen'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC-Ehrenamtler und Auszeichnungen
        questions: [
            {
                question: 'Wie kann man FRC-Ehrenamtler werden?',
                options: parseOptions(
                    'Mitglied werden',
                    'Ehrenamtlicher Antrag stellen',
                    'Team gründen',
                    'Roboter bauen'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wer kann FRC-Ehrenamtler werden?',
                options: parseOptions(
                    'Nur Schüler',
                    'Ehrenamtler aller Altersgruppen',
                    'Nur Lehrer',
                    'Nur Ingenieure'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Was tun Ehrenamtler in FRC?",
                options: parseOptions(
                    'Roboter steuern',
                    'Organisation unterstützen',
                    'Team gründen',
                    'Wettbewerb leiten'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie sollten neue Teams ihre Strategien entwickeln?',
                options: parseOptions(
                    'Den schwierigsten Roboter bauen',
                    'Einfaches und zuverlässiges System erstellen',
                    'Nur Geschwindigkeit',
                    'Großen Roboter bauen'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Wie helfen Ehrenamtler bei der Verbreitung von FIRST?",
                options: parseOptions(
                    'Durch Unterstützung von Wettbewerben',
                    'Durch Roboter-Bau',
                    'Durch Codierung',
                    'Durch bloßes Zuschauen'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Was wird bei der Vergabe von FRC-Auszeichnungen berücksichtigt?',
                options: parseOptions(
                    'Nur Punkte',
                    'Teamarbeit und Auswirkungen',
                    'Roboter-Farbe',
                    'Geschwindigkeit'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Was ist die Rolle von Ehrenamtlichen in der FRC-Familie?",
                options: parseOptions(
                    'Nur zusehen',
                    'Organisation unterstützen',
                    'Roboter steuern',
                    'Schiedsrichter sein'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie tragen Ehrenamtler zur Verbreitung der FRC-Kultur bei?',
                options: parseOptions(
                    'Keine',
                    'Durch Förderung und Unterstützung',
                    'Nur durch Auszeichnungen',
                    'Durch Roboter-Bau'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie kann man Field-Ressetter werden?',
                options: parseOptions(
                    'Roboter bauen',
                    'Ehrenamtlicher Antrag stellen',
                    'Team gründen',
                    'Schiedsrichter sein'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Ist der Zweck von FRC-Auszeichnungen nur, den Erfolg zu messen?",
                options: parseOptions(
                    'Ja',
                    'Nein, auch die Team-Kultur',
                    'Nur Geschwindigkeit messen',
                    'Roboter-Kraft messen'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // Aufgabenverteilung
        questions: [
            {
                question: 'Welche Rollen gibt es in einem FRC-Team?',
                options: parseOptions(
                    'Nur Fahrer',
                    'Mechanik, Software, PR usw.',
                    'Nur Software',
                    'Schiedsrichter'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie wichtig ist die Aufgabenverteilung?',
                options: parseOptions(
                    'Keine',
                    'Sorgt für geordnete Arbeit',
                    'Verursacht Zeitverlust',
                    'Nur der Leiter arbeitet'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie sollte die Rollenverteilung in einem Team durchgeführt werden?',
                options: parseOptions('Zufällig', 'Nach Fähigkeit', 'Nach Alter', 'Nach Größe'),
                correctAnswer: 'B',
            },
            {
                question: 'Wie sollte die Kommunikation zwischen den Team-Rollen durchgeführt werden?',
                options: parseOptions(
                    'Ohne Gespräch',
                    'Mit regelmäßiger Kommunikation',
                    'Nur mit dem Leiter',
                    'Während des Wettbewerbs'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Warum sollte die Aufgabenverteilung in einem Team durchgeführt werden?',
                options: parseOptions(
                    'Um Verwirrung zu vermeiden',
                    'Für Unterhaltung',
                    'Es ist nicht notwendig',
                    'Nur für Formalitäten'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Was sind die Hauptaufgaben der technischen Abteilung?',
                options: parseOptions(
                    'Förderung durchführen',
                    'Roboter entwickeln',
                    'Videos drehen',
                    'Sponsoren finden'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Was sind die Hauptaufgaben von PR?",
                options: parseOptions(
                    'Roboter bauen',
                    'Team fördern',
                    'Code schreiben',
                    'Spielfeld aufbauen'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie sollte die Koordination zwischen den mechanischen und software-technischen Teams durchgeführt werden?',
                options: parseOptions(
                    'Keine notwendig',
                    'Ständige Kommunikation',
                    'Getrennte Arbeit',
                    'Während des Wettbewerbs'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie wirkt sich das Fehlen von Führung auf die Team-Leistung aus?',
                options: parseOptions(
                    'Keine Auswirkung',
                    'Verringert die Leistung',
                    'Erhöht die Leistung',
                    'Vergrößert den Roboter'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Welche Probleme können auftreten, wenn die Aufgabenverteilung nicht richtig durchgeführt wird?',
                options: parseOptions(
                    'Keine Probleme',
                    'Verwirrung und Störungen',
                    'Roboter beschleunigt',
                    'Punkte erhöhen'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // FIRST-Wettbewerb
        questions: [
            {
                question: 'In wie viele Hauptkategorien sind die FIRST-Wettbewerbe unterteilt?',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: 'Welche drei Wettbewerbe gehören zu FIRST?',
                options: parseOptions(
                    'FLL, FTC, FRC',
                    'VEX, RoboCup, FRC',
                    'FLL, VEX, FTC',
                    'RoboCup, FTC, FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Welcher Wettbewerb ist der erste Kontakt eines Schülers mit FIRST?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Universitäts-Liga'),
                correctAnswer: 'C',
            },
            {
                question: 'Für welche Altersgruppen werden die Wettbewerbe durchgeführt?',
                options: parseOptions(
                    'Nur für die Oberstufe',
                    'Von der Grundschule bis zur Oberstufe',
                    'Nur für die Universität',
                    'Nur für Erwachsene'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Was ist der Unterschied zwischen FRC-Robotern und anderen FIRST-Robotern?',
                options: parseOptions(
                    'Kleinere Größe',
                    'Größere und stärkere Roboter',
                    'LEGO-Roboter',
                    'Flugfähigkeit'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie viel größer sind FRC-Roboter im Vergleich zu FTC-Robotern?',
                options: parseOptions('Gleiche Größe', 'Ungefähr 2-mal so groß', '10-mal so groß', 'Kleinere Größe'),
                correctAnswer: 'B',
            },
            {
                question: 'Welcher Wettbewerb verwendet die kleinsten Roboter?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Keiner'),
                correctAnswer: 'C',
            },
            {
                question: 'Welcher Wettbewerb verwendet die größten und industriellsten Roboter?',
                options: parseOptions('FLL', 'FTC', 'FRC', 'Alle gleich'),
                correctAnswer: 'C',
            },
            {
                question: 'Wie funktioniert die Punktevergabe bei den Wettbewerben?',
                options: parseOptions(
                    'Zufällig',
                    'Nach Erfolgen bei Aufgaben',
                    'Nach Roboter-Größe',
                    'Schiedsrichter wählt'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Wie werden mechanische Probleme während des Wettbewerbs gelöst?',
                options: parseOptions(
                    'Durch Rückzug vom Wettbewerb',
                    'Durch schnelle Reparatur durch das Pit-Team',
                    'Durch Warten',
                    'Durch Absage des Spiels'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsDe;
