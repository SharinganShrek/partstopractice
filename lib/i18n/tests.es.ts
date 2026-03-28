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

const testsEs: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "¿Cómo se asignan tareas a los robots en FLL?",
                options: parseOptions(
                    'Se seleccionan al azar',
                    'Las tareas se determinan por el tema de la temporada',
                    'Los equipos inventan tareas',
                    'Los jueces deciden durante el partido'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo gana un equipo FLL?',
                options: parseOptions(
                    'Con el robot más grande',
                    'Como el equipo más rápido',
                    'Con el rendimiento del robot, el proyecto y el trabajo en equipo',
                    'Solo con puntos de robot'
                ),
                correctAnswer: 'C',
            },
            {
                question: '¿Qué contribución académica puede hacer FLL?',
                options: parseOptions(
                    'Solo entretenimiento',
                    'Desarrolla habilidades deportivas',
                    'Desarrolla habilidades STEM',
                    'Disminuye el éxito en los exámenes'
                ),
                correctAnswer: 'C',
            },
            {
                question: "¿Cómo se diseña el robot en FLL?",
                options: parseOptions(
                    'Se compra listo',
                    'Se diseña con piezas LEGO',
                    'Se hace cortando metal',
                    'Se monta durante la competencia'
                ),
                correctAnswer: 'B',
            },
            {
                question: "¿Cuáles son los 4 componentes principales de FLL?",
                options: parseOptions(
                    'Código, velocidad, competencia, puntos',
                    'Juego de robot, proyecto, valores, diseño',
                    'Solo competencia de robot',
                    'Presentación y premio'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cuál es el propósito de la competencia FLL?',
                options: parseOptions(
                    'Lucha de robots',
                    'Enseñar resolución de problemas y ingeniería',
                    'Competencia de velocidad',
                    'Solo obtener premios'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cuánto duran los partidos de robot FLL?',
                options: parseOptions('1 minuto', '2 minutos 30 segundos', '5 minutos', '10 minutos'),
                correctAnswer: 'B',
            },
            {
                question: "¿Qué cubre el tema principal de cada temporada FLL?",
                options: parseOptions(
                    'Temas al azar',
                    'Un problema social actual',
                    'Solo la velocidad del robot',
                    'Entretenimiento del juego'
                ),
                correctAnswer: 'B',
            },
            {
                question: "¿Qué es más importante en FLL: Proceso o Resultado?",
                options: parseOptions(
                    'Solo el resultado',
                    'Solo el premio',
                    'Proceso y aprendizaje',
                    'Tamaño del robot'
                ),
                correctAnswer: 'C',
            },
            {
                question: "¿Cuál es la contribución de FLL al desarrollo de habilidades STEM en edades tempranas?",
                options: parseOptions(
                    'Ninguna',
                    'Solo entretenimiento',
                    'Crea interés en ciencia e ingeniería',
                    'Dificulta las clases'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "¿Cuál es la diferencia entre FTC y FLL?",
                options: parseOptions(
                    'Son iguales',
                    'FTC es más grande y complejo',
                    'FTC es más pequeño',
                    'FTC es sin robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Qué pueden hacer los robots FTC?',
                options: parseOptions(
                    'Solo moverse',
                    'Recoger objetos y realizar tareas',
                    'Volar',
                    'Solo girar'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Qué tipo de trabajo mecánico se requiere para FTC?',
                options: parseOptions(
                    'Montaje simple',
                    'Diseño mecánico serio',
                    'Solo software',
                    'No hay diseño'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Qué se debe considerar durante la preparación para la competencia?',
                options: parseOptions(
                    'Color del robot',
                    'Estrategia del equipo',
                    'Camiseta del equipo',
                    'Solo velocidad'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Qué nivel de conocimiento robótico se requiere para FTC?',
                options: parseOptions(
                    'No se requiere',
                    'Nivel de ingeniería medio',
                    'Solo conocimiento del juego',
                    'Solo software'
                ),
                correctAnswer: 'B',
            },
            {
                question: "¿Cuál es el propósito principal de FTC?",
                options: parseOptions(
                    'Ganar la competencia',
                    'Dirigir a los estudiantes hacia la ingeniería',
                    'Vender robots',
                    'Solo divertirse'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Qué lenguajes de programación se utilizan en FTC?',
                options: parseOptions(
                    'Java y programación en bloques',
                    'Solo C++',
                    'Python obligatorio',
                    'No hay código'
                ),
                correctAnswer: 'A',
            },
            {
                question: "¿Por qué es importante el diseño mecánico en FTC?",
                options: parseOptions(
                    'No es importante',
                    'El robot realiza tareas',
                    'Solo para la apariencia',
                    'El juez lo requiere'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo están construidos los robots FTC?',
                options: parseOptions(
                    'LEGO',
                    'Piezas de kit de metal',
                    'Cartón',
                    'Juguetes de plástico'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo se debe planificar la estrategia y el proceso de ingeniería para la competencia FTC?',
                options: parseOptions(
                    'Al azar',
                    'Planificado y probado',
                    'El último día',
                    'Solo haciendo software'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "¿Qué significa FIRST?",
                options: parseOptions(
                    'Future Innovation Science Teams',
                    'For Inspiration and Recognition of Science and Technology',
                    'Fast Robotics Initiative',
                    'Federation of Robot Teams'
                ),
                correctAnswer: 'B',
            },
            {
                question: "¿Cuál es el nombre completo del fundador de FIRST?",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "¿Cuál es la misión de FIRST?",
                options: parseOptions(
                    'Vender robots',
                    'Dirigir a los jóvenes hacia las áreas STEM',
                    'Realizar competencias',
                    'Ganar dinero'
                ),
                correctAnswer: 'B',
            },
            {
                question: "¿Cuáles son los valores fundamentales de FIRST?",
                options: parseOptions(
                    'Velocidad y competencia',
                    'Trabajo en equipo y respeto',
                    'Ganar',
                    'Poder del robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Qué se espera de nosotros en FIRST?',
                options: parseOptions(
                    'Solo ganar',
                    'Aprender y compartir',
                    'Hacer robots',
                    'Vencer a los oponentes'
                ),
                correctAnswer: 'B',
            },
            {
                question: '"Valores fundamentales" - ¿qué significa?',
                options: parseOptions(
                    'Puntos del robot',
                    'Comportamiento del equipo y colaboración',
                    'Solo ganar',
                    'Reglas del juez'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo podemos aplicar los valores de FIRST en nuestra vida diaria?',
                options: parseOptions(
                    'No podemos usarlos',
                    'Con respeto y colaboración',
                    'Solo en la competencia',
                    'Fuera de la escuela no es necesario'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo usamos los valores de FIRST en el trabajo en equipo?',
                options: parseOptions(
                    'Discutiendo',
                    'Colaborando',
                    'Trabajando solo',
                    'No escuchando al líder'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Qué significa "Gracious Professionalism"?',
                options: parseOptions(
                    'Competencia dura',
                    'Profesionalismo respetuoso',
                    'Hambre de victoria',
                    'Silencio'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Qué significa "Coopertition"?',
                options: parseOptions(
                    'Vencer a los oponentes',
                    'Competir y colaborar',
                    'Competir solo',
                    'Cancelar la competencia'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC voluntarios y premios
        questions: [
            {
                question: '¿Cómo se puede ser voluntario de FRC?',
                options: parseOptions(
                    'Ser miembro',
                    'Presentar una solicitud de voluntariado',
                    'Crear un equipo',
                    'Hacer un robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Quién puede ser voluntario de FRC?',
                options: parseOptions(
                    'Solo estudiantes',
                    'Voluntarios de todas las edades',
                    'Solo profesores',
                    'Solo ingenieros'
                ),
                correctAnswer: 'B',
            },
            {
                question: "¿Qué hacen los voluntarios en FRC?",
                options: parseOptions(
                    'Conducir robots',
                    'Apoyar la organización',
                    'Crear un equipo',
                    'Dirigir la competencia'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo deben desarrollar sus estrategias los equipos nuevos?',
                options: parseOptions(
                    'Hacer el robot más difícil',
                    'Crear un sistema simple y confiable',
                    'Solo velocidad',
                    'Hacer un robot grande'
                ),
                correctAnswer: 'B',
            },
            {
                question: "¿Cómo ayudan los voluntarios a difundir FIRST?",
                options: parseOptions(
                    'Apoyando las competencias',
                    'Haciendo robots',
                    'Escribiendo código',
                    'Solo observando'
                ),
                correctAnswer: 'A',
            },
            {
                question: '¿Qué se considera al otorgar premios FRC?',
                options: parseOptions(
                    'Solo puntos',
                    'Trabajo en equipo y impacto',
                    'Color del robot',
                    'Velocidad'
                ),
                correctAnswer: 'B',
            },
            {
                question: "¿Cuál es el papel de los voluntarios en la familia FRC?",
                options: parseOptions(
                    'Solo observar',
                    'Apoyar la organización',
                    'Conducir robots',
                    'Ser juez'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cuál es el papel de los voluntarios en la difusión de la cultura FRC?',
                options: parseOptions(
                    'Ninguno',
                    'Proporcionar promoción y apoyo',
                    'Solo otorgar premios',
                    'Hacer robots'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo se puede ser Field Ressetter?',
                options: parseOptions(
                    'Hacer un robot',
                    'Presentar una solicitud de voluntariado',
                    'Crear un equipo',
                    'Ser juez'
                ),
                correctAnswer: 'B',
            },
            {
                question: "¿Es el propósito de los premios FRC solo medir el éxito?",
                options: parseOptions(
                    'Sí',
                    'No, también mide la cultura del equipo',
                    'Solo mide la velocidad',
                    'Mide la potencia del robot'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // Asignación de tareas
        questions: [
            {
                question: '¿Cuáles son los roles que se encuentran en un equipo FRC?',
                options: parseOptions(
                    'Solo conductor',
                    'Mecánico, software, PR, etc.',
                    'Solo software',
                    'Juez'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cuál es la importancia de la asignación de tareas?',
                options: parseOptions(
                    'Ninguna',
                    'Proporciona un trabajo organizado',
                    'Causa pérdida de tiempo',
                    'Solo el líder trabaja'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo se debe realizar la asignación de roles en un equipo?',
                options: parseOptions('Al azar', 'Según la habilidad', 'Según la edad', 'Según la altura'),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo se debe llevar a cabo la comunicación entre los roles del equipo?',
                options: parseOptions(
                    'Sin hablar',
                    'Con comunicación regular',
                    'Solo con el líder',
                    'Durante la competencia'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Por qué se debe realizar la asignación de tareas en un equipo?',
                options: parseOptions(
                    'Para evitar la confusión',
                    'Para divertirse',
                    'No es necesario',
                    'Solo para formalidad'
                ),
                correctAnswer: 'A',
            },
            {
                question: '¿Cuáles son las tareas principales de la división técnica?',
                options: parseOptions(
                    'Hacer promoción',
                    'Desarrollar el robot',
                    'Grabar videos',
                    'Encontrar patrocinadores'
                ),
                correctAnswer: 'B',
            },
            {
                question: "¿Cuáles son las tareas principales de PR?",
                options: parseOptions(
                    'Hacer robots',
                    'Promocionar el equipo',
                    'Escribir código',
                    'Crear el campo de juego'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo se debe coordinar entre los equipos de mecánica y software?',
                options: parseOptions(
                    'No es necesario',
                    'Comunicación constante',
                    'Trabajar por separado',
                    'Unirse durante la competencia'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo afecta la falta de liderazgo al rendimiento del equipo?',
                options: parseOptions(
                    'No afecta',
                    'Disminuye el rendimiento',
                    'Aumenta el rendimiento',
                    'Aumenta el tamaño del robot'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Qué problemas pueden surgir si no se realiza la asignación de tareas de manera correcta?',
                options: parseOptions(
                    'No surgen problemas',
                    'Confusión y fallos',
                    'El robot se acelera',
                    'Aumentan los puntos'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // Competencia FIRST
        questions: [
            {
                question: '¿En cuántas categorías principales se dividen las competencias FIRST?',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: '¿Cuáles son las 3 competencias que comprende FIRST?',
                options: parseOptions(
                    'FLL, FTC, FRC',
                    'VEX, RoboCup, FRC',
                    'FLL, VEX, FTC',
                    'RoboCup, FTC, FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: '¿Cuál es la primera competencia que un estudiante conoce en FIRST?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Liga universitaria'),
                correctAnswer: 'C',
            },
            {
                question: '¿Para qué grupos de edad se organizan las competencias?',
                options: parseOptions(
                    'Solo para la escuela secundaria',
                    'Desde la escuela primaria hasta la escuela secundaria',
                    'Solo para la universidad',
                    'Solo para adultos'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cuál es la diferencia entre los robots FRC y los demás robots FIRST?',
                options: parseOptions(
                    'Tamaño más pequeño',
                    'Tamaño más grande y más potente',
                    'Robots LEGO',
                    'Capacidad de vuelo'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cuántas veces más grandes son los robots FRC que los robots FTC?',
                options: parseOptions('Mismo tamaño', 'Aproximadamente 2 veces más grande', '10 veces más grande', 'Tamaño más pequeño'),
                correctAnswer: 'B',
            },
            {
                question: '¿Cuál es la competencia que utiliza los robots más pequeños?',
                options: parseOptions('FRC', 'FTC', 'FLL', 'Ninguno'),
                correctAnswer: 'C',
            },
            {
                question: '¿Cuál es la competencia que utiliza los robots más grandes y más industriales?',
                options: parseOptions('FLL', 'FTC', 'FRC', 'Todos son iguales'),
                correctAnswer: 'C',
            },
            {
                question: '¿Cómo funciona la puntuación en las competencias?',
                options: parseOptions(
                    'Al azar',
                    'Según el éxito en las tareas',
                    'Según el tamaño del robot',
                    'El juez elige'
                ),
                correctAnswer: 'B',
            },
            {
                question: '¿Cómo se resuelven los problemas mecánicos que surgen durante la competencia?',
                options: parseOptions(
                    'Retirándose de la competencia',
                    'El equipo de pit realiza reparaciones rápidas',
                    'Esperando',
                    'Cancelando el partido'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsEs;
