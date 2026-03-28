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

const testsZh: CourseTest[] = [
    {
        courseId: 2, // FLL
        questions: [
            {
                question: "在FLL比赛中，如何为参赛机器人分配任务？",
                options: parseOptions(
                    '随机选择',
                    '根据赛季主题确定任务',
                    '团队自行设计任务',
                    '裁判在比赛中决定'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FLL团队如何获胜？',
                options: parseOptions(
                    '拥有最大的机器人',
                    '作为最快的团队',
                    '通过机器人表现、项目和团队合作',
                    '仅靠机器人得分'
                ),
                correctAnswer: 'C',
            },
            {
                question: 'FLL在学术方面能带来什么贡献？',
                options: parseOptions(
                    '仅提供娱乐',
                    '培养运动技能',
                    '提升STEM技能',
                    '降低考试成绩'
                ),
                correctAnswer: 'C',
            },
            {
                question: "在FLL中，机器人设计如何进行？",
                options: parseOptions(
                    '直接购买成品',
                    '使用乐高积木设计',
                    '切割金属制作',
                    '在比赛中组装'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FLL的四个核心组成部分是什么？",
                options: parseOptions(
                    '代码、速度、比赛、得分',
                    '机器人游戏、项目、核心价值、设计',
                    '仅机器人竞赛',
                    '展示和奖项'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FLL比赛的目的是什么？',
                options: parseOptions(
                    '机器人对战',
                    '教授问题解决和工程学',
                    '速度竞赛',
                    '仅为获奖'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FLL机器人比赛持续多少分钟？',
                options: parseOptions('1分钟', '2分30秒', '5分钟', '10分钟'),
                correctAnswer: 'B',
            },
            {
                question: "FLL每个赛季的主题涵盖什么内容？",
                options: parseOptions(
                    '随机主题',
                    '当前社会问题',
                    '仅机器人速度',
                    '游戏娱乐'
                ),
                correctAnswer: 'B',
            },
            {
                question: "在FLL中，哪个更重要：过程还是结果？",
                options: parseOptions(
                    '仅结果',
                    '仅奖项',
                    '过程和学习',
                    '机器人大小'
                ),
                correctAnswer: 'C',
            },
            {
                question: "FLL对低龄儿童STEM发展有什么贡献？",
                options: parseOptions(
                    '没有贡献',
                    '仅提供娱乐',
                    '培养对科学和工程的兴趣',
                    '增加课业难度'
                ),
                correctAnswer: 'C',
            },
        ],
    },
    {
        courseId: 3, // FTC
        questions: [
            {
                question: "FTC和FLL有什么区别？",
                options: parseOptions(
                    '相同',
                    'FTC更大且更复杂',
                    'FTC更小',
                    'FTC没有机器人'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC机器人能做什么？',
                options: parseOptions(
                    '仅能移动',
                    '收集物品并完成任务',
                    '能飞行',
                    '仅能旋转'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC在机械方面需要什么样的工作？',
                options: parseOptions(
                    '简单组装',
                    '严谨的机械设计',
                    '仅软件',
                    '无需设计'
                ),
                correctAnswer: 'B',
            },
            {
                question: '在准备比赛过程中，最需要考虑什么？',
                options: parseOptions(
                    '机器人颜色',
                    '团队策略',
                    '团队T恤',
                    '仅速度'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC需要多全面的机器人知识？',
                options: parseOptions(
                    '完全不需要',
                    '中等工程知识',
                    '仅游戏知识',
                    '仅软件'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FTC的主要目的是什么？",
                options: parseOptions(
                    '赢得比赛',
                    '引导学生进入工程领域',
                    '销售机器人',
                    '仅为娱乐'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC中使用哪些编程语言？',
                options: parseOptions(
                    'Java和块编程',
                    '仅C++',
                    'Python必选',
                    '无需编程'
                ),
                correctAnswer: 'A',
            },
            {
                question: "在FTC中，机械设计为什么重要？",
                options: parseOptions(
                    '不重要',
                    '机器人完成任务',
                    '仅为外观',
                    '裁判要求'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FTC机器人的结构是什么样的？',
                options: parseOptions(
                    '乐高',
                    '金属套件部件',
                    '纸板',
                    '塑料玩具'
                ),
                correctAnswer: 'B',
            },
            {
                question: '在准备FTC比赛时，策略和工程过程应如何规划？',
                options: parseOptions(
                    '随机进行',
                    '有计划并进行测试',
                    '最后一天',
                    '仅做软件'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 4, // FIRST
        questions: [
            {
                question: "FIRST的全称是什么？",
                options: parseOptions(
                    '未来创新科学团队',
                    '为了科学和技术的灵感与认可',
                    '快速机器人倡议',
                    '机器人团队联合会'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FIRST创始人的全名是什么？",
                options: parseOptions('Dean Kamen', 'James Dean', 'Mark Kamen', 'John First'),
                correctAnswer: 'A',
            },
            {
                question: "FIRST的使命是什么？",
                options: parseOptions(
                    '销售机器人',
                    '引导青少年进入STEM领域',
                    '举办比赛',
                    '赚钱'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FIRST的核心价值观是什么？",
                options: parseOptions(
                    '速度和竞争',
                    '团队合作和尊重',
                    '获胜',
                    '机器人力量'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FIRST究竟希望我们做什么？',
                options: parseOptions(
                    '仅仅获胜',
                    '学习和分享',
                    '制造机器人',
                    '击败对手'
                ),
                correctAnswer: 'B',
            },
            {
                question: '“核心价值”概念涵盖什么？',
                options: parseOptions(
                    '机器人得分',
                    '团队行为和合作',
                    '仅仅获胜',
                    '裁判规则'
                ),
                correctAnswer: 'B',
            },
            {
                question: '如何将FIRST的价值观应用到日常生活中？',
                options: parseOptions(
                    '无法应用',
                    '通过尊重和合作',
                    '仅在比赛中',
                    '校外不需要'
                ),
                correctAnswer: 'B',
            },
            {
                question: '在团队合作中如何运用FIRST的价值观？',
                options: parseOptions(
                    '通过争论',
                    '通过合作',
                    '单独工作',
                    '不听领导的'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Gracious Professionalism是什么意思？',
                options: parseOptions(
                    '激烈竞争',
                    '优雅的专业精神',
                    '获胜的渴望',
                    '沉默'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'Coopertition概念表达了什么？',
                options: parseOptions(
                    '击败对手',
                    '在竞争中合作',
                    '单独竞争',
                    '取消比赛'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 5, // FRC志愿者和奖项
        questions: [
            {
                question: '如何成为FRC志愿者？',
                options: parseOptions(
                    '成为会员',
                    '提交志愿者申请',
                    '组建团队',
                    '制造机器人'
                ),
                correctAnswer: 'B',
            },
            {
                question: '谁可以成为FRC志愿者？',
                options: parseOptions(
                    '仅学生',
                    '各年龄段的志愿者',
                    '仅教师',
                    '仅工程师'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FRC志愿者做什么？",
                options: parseOptions(
                    '驾驶机器人',
                    '支持组织工作',
                    '组建团队',
                    '管理比赛'
                ),
                correctAnswer: 'B',
            },
            {
                question: '新团队应如何发展策略？',
                options: parseOptions(
                    '制造最复杂的机器人',
                    '建立简单可靠的系统',
                    '仅速度',
                    '制造大型机器人'
                ),
                correctAnswer: 'B',
            },
            {
                question: "志愿者如何帮助推广FIRST？",
                options: parseOptions(
                    '通过支持比赛',
                    '制造机器人',
                    '编写代码',
                    '仅观看'
                ),
                correctAnswer: 'A',
            },
            {
                question: '颁发FRC奖项时关注什么？',
                options: parseOptions(
                    '仅得分',
                    '团队合作和影响',
                    '机器人颜色',
                    '速度'
                ),
                correctAnswer: 'B',
            },
            {
                question: "志愿者在FRC大家庭中的角色是什么？",
                options: parseOptions(
                    '仅观看',
                    '支持组织工作',
                    '驾驶机器人',
                    '必须成为裁判'
                ),
                correctAnswer: 'B',
            },
            {
                question: '志愿者在推广FRC文化中的作用是什么？',
                options: parseOptions(
                    '没有作用',
                    '提供宣传和支持',
                    '仅颁发奖项',
                    '制造机器人'
                ),
                correctAnswer: 'B',
            },
            {
                question: '如何成为Field Resetter？',
                options: parseOptions(
                    '制造机器人',
                    '作为志愿者申请',
                    '组建团队',
                    '成为裁判'
                ),
                correctAnswer: 'B',
            },
            {
                question: "FRC奖项的目的是仅仅衡量成功吗？",
                options: parseOptions(
                    '是',
                    '不是，还衡量团队文化',
                    '仅衡量速度',
                    '衡量机器人力量'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 6, // 任务分配
        questions: [
            {
                question: 'FRC团队中有哪些角色？',
                options: parseOptions(
                    '仅驾驶员',
                    '机械、软件、公关等',
                    '仅软件',
                    '裁判'
                ),
                correctAnswer: 'B',
            },
            {
                question: '任务分配的重要性是什么？',
                options: parseOptions(
                    '不重要',
                    '确保有序工作',
                    '浪费时间',
                    '仅领导工作'
                ),
                correctAnswer: 'B',
            },
            {
                question: '团队中如何进行角色分配？',
                options: parseOptions('随机', '根据能力', '根据年龄', '根据颜色'),
                correctAnswer: 'B',
            },
            {
                question: '团队角色之间如何进行沟通？',
                options: parseOptions(
                    '不交流',
                    '定期沟通',
                    '仅与领导沟通',
                    '在比赛中交流'
                ),
                correctAnswer: 'B',
            },
            {
                question: '团队内为什么需要进行任务分配？',
                options: parseOptions(
                    '避免混乱',
                    '为了娱乐',
                    '不必要',
                    '仅为形式'
                ),
                correctAnswer: 'A',
            },
            {
                question: '技术部门的基本职责是什么？',
                options: parseOptions(
                    '进行宣传',
                    '开发机器人',
                    '拍摄视频',
                    '寻找赞助'
                ),
                correctAnswer: 'B',
            },
            {
                question: "公关部门的基本职责是什么？",
                options: parseOptions(
                    '制造机器人',
                    '推广团队',
                    '编写代码',
                    '搭建场地'
                ),
                correctAnswer: 'B',
            },
            {
                question: '机械和软件团队之间需要什么样的协调？',
                options: parseOptions(
                    '不需要',
                    '需要持续沟通',
                    '分开工作',
                    '在比赛中合作'
                ),
                correctAnswer: 'B',
            },
            {
                question: '缺乏领导力如何影响团队表现？',
                options: parseOptions(
                    '不影响',
                    '降低表现',
                    '提高表现',
                    '使机器人变大'
                ),
                correctAnswer: 'B',
            },
            {
                question: '如果没有正确分配任务，比赛当天可能会出现什么问题？',
                options: parseOptions(
                    '没有问题',
                    '出现混乱和延误',
                    '机器人加速',
                    '得分增加'
                ),
                correctAnswer: 'B',
            },
        ],
    },
    {
        courseId: 1, // FIRST比赛
        questions: [
            {
                question: 'FIRST比赛分为几个主要类别？',
                options: parseOptions('2', '3', '4', '5'),
                correctAnswer: 'B',
            },
            {
                question: 'FIRST包含哪三个比赛？',
                options: parseOptions(
                    'FLL、FTC、FRC',
                    'VEX、RoboCup、FRC',
                    'FLL、VEX、FTC',
                    'RoboCup、FTC、FRC'
                ),
                correctAnswer: 'A',
            },
            {
                question: '学生第一次接触FIRST的比赛是什么？',
                options: parseOptions('FRC', 'FTC', 'FLL', '大学联赛'),
                correctAnswer: 'C',
            },
            {
                question: '比赛针对哪些年龄段？',
                options: parseOptions(
                    '仅高中',
                    '从小学到高中',
                    '仅大学',
                    '仅成人'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FRC机器人与其他FIRST机器人的区别是什么？',
                options: parseOptions(
                    '体积小',
                    '更大更强',
                    '乐高材质',
                    '能飞行'
                ),
                correctAnswer: 'B',
            },
            {
                question: 'FRC机器人比FTC机器人大多少倍？',
                options: parseOptions('相同', '约2倍', '10倍', '更小'),
                correctAnswer: 'B',
            },
            {
                question: '使用最小机器人的比赛是哪个？',
                options: parseOptions('FRC', 'FTC', 'FLL', '无'),
                correctAnswer: 'C',
            },
            {
                question: '使用最大和工业级机器人的比赛是哪个？',
                options: parseOptions('FLL', 'FTC', 'FRC', '全部相同'),
                correctAnswer: 'C',
            },
            {
                question: '比赛中的得分如何计算？',
                options: parseOptions(
                    '随机',
                    '根据任务完成情况',
                    '根据机器人大小',
                    '由裁判决定'
                ),
                correctAnswer: 'B',
            },
            {
                question: '比赛中出现机械故障时如何处理？',
                options: parseOptions(
                    '退出比赛',
                    '维修团队快速修复',
                    '等待',
                    '取消比赛'
                ),
                correctAnswer: 'B',
            },
        ],
    },
];

export default testsZh;
