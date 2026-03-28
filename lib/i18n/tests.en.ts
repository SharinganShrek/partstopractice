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

const testsEn: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "How are tasks assigned to robots in FLL?",
                options: parseOptions(
                    'Randomly selected',
                    'Tasks are determined by the season theme',
                    'Teams come up with tasks',
                    'Judges decide during the match'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'How does an FLL team win?',
                options: parseOptions(
                    'With the largest robot',
                    'As the fastest team',
                    'With robot performance, project, and teamwork',
                    'Only with robot points'
                ),
                correctAnswer: 'C',
            },
            {
                question: 'What kind of academic contribution can FLL provide?',
                options: parseOptions(
                    'Only entertainment',
                    'Develops sports skills',
                    'Develops STEM skills',
                    'Decreases exam success'
                ),
                correctAnswer: 'C',
            },
            {
                question: "How is robot design done in FLL?",
                options: parseOptions(
                    'Bought ready-made',
                    'Designed with LEGO parts',
                    'Made by cutting metal',
                    'Assembled during the competition'
                ),
                correctAnswer: 'B',
            },
            {
                question: "What are the 4 main components of FLL?",
                options: parseOptions(
                    'Code, speed, competition, points',
                    'Robot game, project, values, design',
                    'Only robot competition',
                    'Presentation and award'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What is the purpose of the FLL competition?',
                options: parseOptions(
                    'To fight robots',
                    'To teach problem-solving and engineering',
                    'To hold a speed competition',
                    'Only to receive awards'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'How long do FLL robot matches last?',
                options: parseOptions('1 minute', '2 minutes 30 seconds', '5 minutes', '10 minutes'),
                correctAnswer: 'B',
            },
            {
                question: "What does the main theme of each FLL season cover?",
                options: parseOptions(
                    'Random topics',
                    'A current social problem',
                    'Only robot speed',
                    'Game entertainment'
                ),
                correctAnswer: 'B',
            },
            {
                question: "In FLL, which is more important: Process or Result?",
                options: parseOptions(
                    'Only the result',
                    'Only the award',
                    'Process and learning',
                    'Robot size'
                ),
                correctAnswer: 'C',
            },
            {
                question: "What are FLL's contributions to STEM development at a young age?",
                options: parseOptions(
                    'None',
                    'Only provides entertainment',
                    'Creates interest in science and engineering',
                    'Makes lessons more difficult'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "What is the difference between FTC and FLL?",
                options: parseOptions(
                    'They are the same',
                    'FTC is larger and more complex',
                    'FTC is smaller',
                    'FTC is robot-less'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What can FTC robots do?',
                options: parseOptions(
                    'Only move',
                    'Pick up objects and perform tasks',
                    'Fly',
                    'Only spin'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What kind of mechanical work is required for FTC?',
                options: parseOptions(
                    'Simple assembly',
                    'Serious mechanical design',
                    'Only software',
                    'No design at all'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What should be considered most during the preparation process for the competition?',
                options: parseOptions(
                    'Robot color',
                    'Team strategy',
                    'Team t-shirt',
                    'Only speed'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'How much robotic knowledge is required for FTC?',
                options: parseOptions(
                    'Not required at all',
                    'Medium-level engineering knowledge',
                    'Only game knowledge',
                    'Only software'
                ),
                correctAnswer: 'B',
            },
            {
                question: "What is the main purpose of FTC?",
                options: parseOptions(
                    'To win the competition',
                    'To direct students towards engineering',
                    'To sell robots',
                    'Only to have fun'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Which programming languages are used in FTC?',
                options: parseOptions(
                    'Java and block coding',
                    'Only C++',
                    'Python is mandatory',
                    'No coding at all'
                ),
                correctAnswer: 'A',
            },
            {
                question: "Why is mechanical design important in FTC?",
                options: parseOptions(
                    'It is not important',
                    'The robot performs tasks',
                    'Only for appearance',
                    'The judge requires it'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What kind of structure do FTC robots have?',
                options: parseOptions(
                    'LEGO',
                    'Metal kit parts',
                    'Cardboard',
                    'Plastic toys'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'How should the strategy and engineering process be planned for the FTC competition?',
                options: parseOptions(
                    'Randomly',
                    'Planned and tested',
                    'At the last minute',
                    'Only by coding'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "What does FIRST stand for?",
                options: parseOptions(
                    'Future Innovation Science Teams',
                    'For Inspiration and Recognition of Science and Technology',
                    'Fast Robotics Initiative',
                    'Federation of Robot Teams'
                ),
                correctAnswer: 'B',
            },
            {
                question: "What is the full name of the founder of FIRST?",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "What is the mission of FIRST?",
                options: parseOptions(
                    'To sell robots',
                    'To direct young people towards STEM fields',
                    'To hold competitions',
                    'To make money'
                ),
                correctAnswer: 'B',
            },
            {
                question: "What are the core values of FIRST?",
                options: parseOptions(
                    'Speed and competition',
                    'Teamwork and respect',
                    'Winning',
                    'Robot power'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What does FIRST expect from us exactly?',
                options: parseOptions(
                    'Only to win',
                    'To learn and share',
                    'To build robots',
                    'To defeat opponents'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What does the concept of "Core Values" cover?',
                options: parseOptions(
                    'Robot points',
                    'Team behavior and collaboration',
                    'Only winning',
                    'Judge rules'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'How can we adapt FIRST values to our daily lives?',
                options: parseOptions(
                    'We cannot use them',
                    'With respect and collaboration',
                    'Only during competitions',
                    'Outside of school is not necessary'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'How do we use FIRST values in teamwork?',
                options: parseOptions(
                    'By arguing',
                    'By collaborating',
                    'By working alone',
                    'By not listening to the leader'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What does Gracious Professionalism mean?',
                options: parseOptions(
                    'Tough competition',
                    'Respectful professionalism',
                    'Desire to win',
                    'Silence'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What does the concept of Coopertition mean?',
                options: parseOptions(
                    'To defeat opponents',
                    'To compete while collaborating',
                    'To work alone',
                    'To cancel the competition'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC volunteer and award
        questions: [
            {
                question: 'What needs to be done to become an FRC volunteer?',
                options: parseOptions(
                    'To become a member',
                    'To apply as a volunteer',
                    'To form a team',
                    'To build a robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Who can be an FRC volunteer?',
                options: parseOptions(
                    'Only students',
                    'Volunteers of all ages',
                    'Only teachers',
                    'Only engineers'
                ),
                correctAnswer: 'B',
            },
            {
                question: "What do volunteers do in FRC?",
                options: parseOptions(
                    'Drive robots',
                    'Support the organization',
                    'Form teams',
                    'Manage the competition'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'In what direction should new teams develop their strategies?',
                options: parseOptions(
                    'To build the most difficult robot',
                    'To create a simple and reliable system',
                    'Only speed',
                    'To build a large robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: "How do volunteers help spread FIRST?",
                options: parseOptions(
                    'By supporting competitions',
                    'By building robots',
                    'By coding',
                    'By only watching'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'What is considered when awarding FRC awards?',
                options: parseOptions(
                    'Only points',
                    'Teamwork and impact',
                    'Robot color',
                    'Speed'
                ),
                correctAnswer: 'B',
            },
            {
                question: "What is the role of volunteers in the FRC family?",
                options: parseOptions(
                    'Only to watch',
                    'To support the organization',
                    'To drive robots',
                    'To be a judge'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What is the role of volunteers in spreading FRC culture?',
                options: parseOptions(
                    'None',
                    'They provide promotion and support',
                    'Only give awards',
                    'Build robots'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What needs to be done to become a Field Ressetter?',
                options: parseOptions(
                    'To build a robot',
                    'To apply as a volunteer',
                    'To form a team',
                    'To be a judge'
                ),
                correctAnswer: 'B',
            },
            {
                question: "Is the purpose of FRC awards only to measure success?",
                options: parseOptions(
                    'Yes',
                    'No, it also measures team culture',
                    'Only measures speed',
                    'Measures robot power'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // Task distribution
        questions: [
            {
                question: 'What roles are found in an FRC team?',
                options: parseOptions(
                    'Only driver',
                    'Mechanical, software, PR, etc.',
                    'Only software',
                    'Judge'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What is the importance of task distribution?',
                options: parseOptions(
                    'None',
                    'Provides organized work',
                    'Wastes time',
                    'Only the leader works'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'How should role distribution be done in a team?',
                options: parseOptions('Randomly', 'According to talent', 'According to age', 'According to height'),
                correctAnswer: 'B',
            },
            {
                question: 'How should communication be carried out between team roles?',
                options: parseOptions(
                    'Without talking at all',
                    'With regular communication',
                    'Only with the leader',
                    'Only during the competition'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Why should task distribution be done within a team?',
                options: parseOptions(
                    'To avoid confusion',
                    'For entertainment',
                    'It is unnecessary',
                    'Only for formality'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'What are the main tasks of the technical division?',
                options: parseOptions(
                    'To make promotions',
                    'To develop the robot',
                    'To shoot videos',
                    'To find sponsorships'
                ),
                correctAnswer: 'B',
            },
            {
                question: "What are the main tasks of PR?",
                options: parseOptions(
                    'To build robots',
                    'To promote the team',
                    'To code',
                    'To set up the field'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What kind of coordination is required between mechanical and software teams?',
                options: parseOptions(
                    'None is required',
                    'Continuous communication is required',
                    'They work separately',
                    'They come together during the competition'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'How does a lack of leadership affect team performance?',
                options: parseOptions(
                    'It does not affect',
                    'It decreases performance',
                    'It increases performance',
                    'It makes the robot larger'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What kind of problems can arise on competition day if task distribution is not done correctly?',
                options: parseOptions(
                    'No problems arise',
                    'Confusion and disruption occur',
                    'The robot speeds up',
                    'Points increase'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // FIRST competition
        questions: [
            {
                question: 'How many main categories are FIRST competitions divided into?',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: 'What are the 3 competitions included in FIRST?',
                options: parseOptions(
                    'FLL, FTC, FRC',
                    'VEX, RoboCup, FRC',
                    'FLL, VEX, FTC',
                    'RoboCup, FTC, FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: 'Which competition is the first point of contact for a student with FIRST?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'University league'),
                correctAnswer: 'C',
            },
            {
                question: 'What age groups are the competitions organized for?',
                options: parseOptions(
                    'Only high school',
                    'From elementary school to high school',
                    'Only university',
                    'Only adults'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'What is the difference between FRC robots and other FIRST robots?',
                options: parseOptions(
                    'They are smaller',
                    'They are larger and more powerful',
                    'They are made of LEGO',
                    'They can fly'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'How many times larger are FRC robots compared to FTC robots?',
                options: parseOptions('The same', 'Approximately 2 times', '10 times', 'Smaller'),
                correctAnswer: 'B',
            },
            {
                question: 'Which competition uses the smallest robots?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'None'),
                correctAnswer: 'C',
            },
            {
                question: 'Which competition uses the largest and most industrial robots?',
                options: parseOptions('FLL', 'FTC', 'FRC', 'All are the same'),
                correctAnswer: 'C',
            },
            {
                question: 'How does scoring work in competitions?',
                options: parseOptions(
                    'Randomly',
                    'According to task successes',
                    'According to robot size',
                    'The judge chooses'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'How are mechanical problems that arise during the competition handled?',
                options: parseOptions(
                    'By withdrawing from the competition',
                    'By the pit crew making quick repairs',
                    'By waiting',
                    'By canceling the match'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsEn;
