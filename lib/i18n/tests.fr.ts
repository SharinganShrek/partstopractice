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

const testsFr: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "Comment les tâches sont-elles attribuées aux robots dans FLL ?",
                options: parseOptions(
                    'Sélection aléatoire',
                    'Tâches déterminées par le thème de la saison',
                    'Les équipes inventent des tâches',
                    'Les juges décident pendant le match'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Comment une équipe FLL gagne-t-elle ?',
                options: parseOptions(
                    'Avec le robot le plus grand',
                    'En tant qu\'équipe la plus rapide',
                    'Avec la performance du robot, le projet et le travail d\'équipe',
                    'Avec uniquement les points du robot'
                ),
                correctAnswer: 'C',
            },
            {
                question: 'Quelle contribution académique FLL peut-elle apporter ?',
                options: parseOptions(
                    'Uniquement du divertissement',
                    'Des compétences sportives',
                    'Des compétences STEM',
                    'Une diminution du succès aux examens'
                ),
                correctAnswer: 'C',
            },
            {
                question: "Comment la conception de robot est-elle réalisée dans FLL ?",
                options: parseOptions(
                    'Achat d\'un robot prêt à l\'emploi',
                    'Conception avec des pièces LEGO',
                    'Fabrication par découpe de métal',
                    'Assemblage pendant la compétition'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Quels sont les 4 principaux composants de FLL ?",
                options: parseOptions(
                    'Code, vitesse, compétition, points',
                    'Jeu de robot, projet, valeurs, conception',
                    'Uniquement compétition de robot',
                    'Présentation et récompense'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quel est l\'objectif de la compétition FLL ?',
                options: parseOptions(
                    'Combat de robots',
                    'Enseignement de la résolution de problèmes et de l\'ingénierie',
                    'Compétition de vitesse',
                    'Uniquement obtenir des récompenses'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Combien de temps durent les matchs de robot FLL ?',
                options: parseOptions('1 minute', '2 minutes 30 secondes', '5 minutes', '10 minutes'),
                correctAnswer: 'B',
            },
            {
                question: "Quel est le thème principal de chaque saison FLL ?",
                options: parseOptions(
                    'Sujets aléatoires',
                    'Un problème social actuel',
                    'Uniquement la vitesse du robot',
                    'Le divertissement du jeu'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Qu\'est-ce qui est plus important dans FLL : le processus ou le résultat ?",
                options: parseOptions(
                    'Uniquement le résultat',
                    'Uniquement la récompense',
                    'Processus et apprentissage',
                    'Taille du robot'
                ),
                correctAnswer: 'C',
            },
            {
                question: "Quelle est la contribution de FLL au développement des compétences STEM à un âge précoce ?",
                options: parseOptions(
                    'Aucune',
                    'Uniquement du divertissement',
                    'Création d\'un intérêt pour la science et l\'ingénierie',
                    'Difficulté des cours'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "Quelle est la différence entre FTC et FLL ?",
                options: parseOptions(
                    'Ils sont identiques',
                    'FTC est plus grand et plus complexe',
                    'FTC est plus petit',
                    'FTC est sans robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Que peuvent faire les robots FTC ?',
                options: parseOptions(
                    'Seulement se déplacer',
                    'Prendre des objets et effectuer des tâches',
                    'Vol',
                    'Seulement tourner'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quel type de travail mécanique est requis pour FTC ?',
                options: parseOptions(
                    'Montage simple',
                    'Conception mécanique sérieuse',
                    'Uniquement logiciel',
                    'Aucune conception'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Que faut-il considérer pendant la préparation pour la compétition ?',
                options: parseOptions(
                    'Couleur du robot',
                    'Stratégie de l\'équipe',
                    'T-shirt de l\'équipe',
                    'Uniquement vitesse'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quel niveau de connaissance robotique est requis pour FTC ?',
                options: parseOptions(
                    'Aucun requis',
                    'Niveau d\'ingénierie moyen',
                    'Uniquement connaissance du jeu',
                    'Uniquement logiciel'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Quel est l\'objectif principal de FTC ?",
                options: parseOptions(
                    'Gagner la compétition',
                    'Diriger les étudiants vers l\'ingénierie',
                    'Vendre des robots',
                    'Uniquement s\'amuser'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quels langages de programmation sont utilisés dans FTC ?',
                options: parseOptions(
                    'Java et programmation en blocs',
                    'Uniquement C++',
                    'Python obligatoire',
                    'Aucun code'
                ),
                correctAnswer: 'A',
            },
            {
                question: "Pourquoi la conception mécanique est-elle importante dans FTC ?",
                options: parseOptions(
                    'Elle n\'est pas importante',
                    'Le robot effectue des tâches',
                    'Uniquement pour l\'apparence',
                    'Le juge le demande'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Comment sont construits les robots FTC ?',
                options: parseOptions(
                    'LEGO',
                    'Pièces de kit en métal',
                    'Carton',
                    'Jouets en plastique'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Comment la stratégie et le processus d\'ingénierie doivent-ils être planifiés pour la compétition FTC ?',
                options: parseOptions(
                    'Aléatoirement',
                    'Planifié et testé',
                    'Le dernier jour',
                    'Uniquement en faisant du logiciel'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "Qu\'est-ce que FIRST ?",
                options: parseOptions(
                    'Future Innovation Science Teams',
                    'For Inspiration and Recognition of Science and Technology',
                    'Fast Robotics Initiative',
                    'Federation of Robot Teams'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Quel est le nom complet du fondateur de FIRST ?",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "Quelle est la mission de FIRST ?",
                options: parseOptions(
                    'Vendre des robots',
                    'Diriger les jeunes vers les domaines STEM',
                    'Organiser des compétitions',
                    'Gagner de l\'argent'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Quels sont les valeurs fondamentales de FIRST ?",
                options: parseOptions(
                    'Vitesse et compétition',
                    'Travail d\'équipe et respect',
                    'Gagner',
                    'Puissance du robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Que FIRST attend-il de nous ?',
                options: parseOptions(
                    'Uniquement gagner',
                    'Apprendre et partager',
                    'Faire des robots',
                    'Vaincre les adversaires'
                ),
                correctAnswer: 'B',
            },
            {
                question: '"Valeurs fondamentales" - qu\'est-ce que cela signifie ?',
                options: parseOptions(
                    'Points du robot',
                    'Comportement de l\'équipe et collaboration',
                    'Uniquement gagner',
                    'Règles du juge'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Comment pouvons-nous appliquer les valeurs de FIRST dans notre vie quotidienne ?',
                options: parseOptions(
                    'Nous ne pouvons pas les utiliser',
                    'Avec respect et collaboration',
                    'Uniquement pendant la compétition',
                    'En dehors de l\'école, ce n\'est pas nécessaire'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Comment utilisons-nous les valeurs de FIRST dans le travail d\'équipe ?',
                options: parseOptions(
                    'En discutant',
                    'En collaborant',
                    'En travaillant seul',
                    'En n\'écoutant pas le leader'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Qu\'est-ce que "Gracious Professionalism" ?',
                options: parseOptions(
                    'Compétition dure',
                    'Professionnalisme respectueux',
                    'Faim de victoire',
                    'Silence'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Qu\'est-ce que "Coopertition" ?',
                options: parseOptions(
                    'Vaincre les adversaires',
                    'Compétir et collaborer',
                    'Compétir seul',
                    'Annuler la compétition'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC bénévole et récompense
        questions: [
            {
                question: 'Comment devenir bénévole FRC ?',
                options: parseOptions(
                    'Devenir membre',
                    'Faire une demande de bénévolat',
                    'Créer une équipe',
                    'Faire un robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Qui peut devenir bénévole FRC ?',
                options: parseOptions(
                    'Uniquement les étudiants',
                    'Les bénévoles de tous âges',
                    'Uniquement les enseignants',
                    'Uniquement les ingénieurs'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Que font les bénévoles dans FRC ?",
                options: parseOptions(
                    'Conduire des robots',
                    'Soutenir l\'organisation',
                    'Créer une équipe',
                    'Diriger la compétition'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Comment les nouvelles équipes doivent-elles développer leurs stratégies ?',
                options: parseOptions(
                    'Faire le robot le plus difficile',
                    'Créer un système simple et fiable',
                    'Uniquement vitesse',
                    'Faire un grand robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Comment les bénévoles aident-ils à diffuser FIRST ?",
                options: parseOptions(
                    'En soutenant les compétitions',
                    'En faisant des robots',
                    'En écrivant du code',
                    'Uniquement en regardant'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Que considère-t-on lors de l\'attribution des récompenses FRC ?',
                options: parseOptions(
                    'Uniquement les points',
                    'Travail d\'équipe et impact',
                    'Couleur du robot',
                    'Vitesse'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Quel est le rôle des bénévoles dans la famille FRC ?",
                options: parseOptions(
                    'Uniquement regarder',
                    'Soutenir l\'organisation',
                    'Conduire des robots',
                    'Être juge'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quel est le rôle des bénévoles dans la diffusion de la culture FRC ?',
                options: parseOptions(
                    'Aucun',
                    'Fournir promotion et soutien',
                    'Uniquement attribuer des récompenses',
                    'Faire des robots'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Comment devenir Field Ressetter ?',
                options: parseOptions(
                    'Faire un robot',
                    'Faire une demande de bénévolat',
                    'Créer une équipe',
                    'Être juge'
                ),
                correctAnswer: 'B',
            },
            {
                question: "L\'objectif des récompenses FRC est-il uniquement de mesurer le succès ?",
                options: parseOptions(
                    'Oui',
                    'Non, il mesure également la culture de l\'équipe',
                    'Uniquement mesurer la vitesse',
                    'Mesurer la puissance du robot'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // Répartition des tâches
        questions: [
            {
                question: 'Quels sont les rôles que l\'on trouve dans une équipe FRC ?',
                options: parseOptions(
                    'Uniquement conducteur',
                    'Mécanique, logiciel, PR, etc.',
                    'Uniquement logiciel',
                    'Juge'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quelle est l\'importance de la répartition des tâches ?',
                options: parseOptions(
                    'Aucune',
                    'Fournit un travail organisé',
                    'Cause une perte de temps',
                    'Uniquement le leader travaille'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Comment la répartition des rôles doit-elle être réalisée dans une équipe ?',
                options: parseOptions('Aléatoirement', 'Selon la compétence', 'Selon l\'âge', 'Selon la taille'),
                correctAnswer: 'B',
            },
            {
                question: 'Comment la communication entre les rôles de l\'équipe doit-elle être menée ?',
                options: parseOptions(
                    'Sans parler',
                    'Avec une communication régulière',
                    'Uniquement avec le leader',
                    'Pendant la compétition'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Pourquoi la répartition des tâches doit-elle être réalisée dans une équipe ?',
                options: parseOptions(
                    'Pour éviter la confusion',
                    'Pour s\'amuser',
                    'Ce n\'est pas nécessaire',
                    'Uniquement pour la formalité'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Quelles sont les tâches principales de la division technique ?',
                options: parseOptions(
                    'Faire de la promotion',
                    'Développer le robot',
                    'Faire des vidéos',
                    'Trouver des sponsors'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Quelles sont les tâches principales de PR ?",
                options: parseOptions(
                    'Faire des robots',
                    'Promouvoir l\'équipe',
                    'Écrire du code',
                    'Créer le terrain de jeu'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Comment la coordination entre les équipes de mécanique et de logiciel doit-elle être réalisée ?',
                options: parseOptions(
                    'Aucune nécessité',
                    'Communication constante',
                    'Travailler séparément',
                    'Se réunir pendant la compétition'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Comment le manque de leadership affecte-t-il la performance de l\'équipe ?',
                options: parseOptions(
                    'Aucun effet',
                    'Diminue la performance',
                    'Améliore la performance',
                    'Augmente la taille du robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quels problèmes peuvent survenir si la répartition des tâches n\'est pas réalisée correctement ?',
                options: parseOptions(
                    'Aucun problème',
                    'Confusion et dysfonctionnement',
                    'Le robot s\'accélère',
                    'Les points augmentent'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // Compétition FIRST
        questions: [
            {
                question: 'Combien de catégories principales les compétitions FIRST sont-elles divisées ?',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: 'Quelles sont les 3 compétitions que FIRST comprend ?',
                options: parseOptions(
                    'FLL, FTC, FRC',
                    'VEX, RoboCup, FRC',
                    'FLL, VEX, FTC',
                    'RoboCup, FTC, FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Quelle est la première compétition que rencontre un étudiant avec FIRST ?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Ligue universitaire'),
                correctAnswer: 'C',
            },
            {
                question: 'Pour quels groupes d\'âge les compétitions sont-elles organisées ?',
                options: parseOptions(
                    'Uniquement pour le lycée',
                    'De l\'école primaire au lycée',
                    'Uniquement pour l\'université',
                    'Uniquement pour les adultes'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Quelle est la différence entre les robots FRC et les autres robots FIRST ?',
                options: parseOptions(
                    'Taille plus petite',
                    'Taille plus grande et plus puissante',
                    'Robots LEGO',
                    'Capacité de vol'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Combien de fois les robots FRC sont-ils plus grands que les robots FTC ?',
                options: parseOptions('Même taille', 'Environ 2 fois plus grand', '10 fois plus grand', 'Taille plus petite'),
                correctAnswer: 'B',
            },
            {
                question: 'Quelle est la compétition qui utilise les robots les plus petits ?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Aucun'),
                correctAnswer: 'C',
            },
            {
                question: 'Quelle est la compétition qui utilise les robots les plus grands et les plus industriels ?',
                options: parseOptions('FLL', 'FTC', 'FRC', 'Tous sont identiques'),
                correctAnswer: 'C',
            },
            {
                question: 'Comment fonctionne la notation dans les compétitions ?',
                options: parseOptions(
                    'Aléatoirement',
                    'Selon les réussites des tâches',
                    'Selon la taille du robot',
                    'Le juge choisit'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Comment les problèmes mécaniques qui surviennent pendant la compétition sont-ils résolus ?',
                options: parseOptions(
                    'En se retirant de la compétition',
                    'L\'équipe de pit effectue des réparations rapides',
                    'En attendant',
                    'En annulant le match'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsFr;
