// Mock data for the English Training Room app

export interface Scene {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  iconBg: string;
  category: 'DAILY_LIFE' | 'TRAVEL' | 'BUSINESS' | 'CET' | 'IELTS' | 'IT_PROGRAMMING';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  questionCount: number;
  duration: number;
  tags?: string[];
}

export interface Question {
  id: string;
  sceneId: string;
  type: 'TRANSLATION_CN_TO_EN' | 'TRANSLATION_EN_TO_CN' | 'EXPRESSION_EQUIVALENT' | 'FREE_EXPRESSION';
  prompt: string;
  hint?: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  topic?: string;
}

export interface EvaluationResult {
  totalScore: number;
  dimensions: {
    name: string;
    score: number;
    icon: string;
    color: string;
  }[];
  feedback: string;
  betterExpressions: {
    userExpression: string;
    betterVersion: string;
    reason: string;
  }[];
  grammarIssues: {
    original: string;
    corrected: string;
    explanation: string;
  }[];
  yourTranslation: string;
  aiRecommendedVersion: string;
}

export interface UserStats {
  totalPracticeCount: number;
  completedQuestions: number;
  averageScore: number;
  consecutiveDays: number;
}

export interface PracticeRecord {
  id: string;
  time: string;
  scene: Scene;
  question: string;
  score: number;
}

// Scenes data
export const scenes: Scene[] = [
  {
    id: '1',
    code: 'sql-crud',
    name: '数据库指令答题',
    description: 'SQL 增删改查拼写练习，掌握数据库核心指令',
    icon: 'fa-database',
    iconBg: 'from-blue-500 to-indigo-600',
    category: 'IT_PROGRAMMING',
    difficulty: 'BEGINNER',
    questionCount: 20,
    duration: 25,
    tags: ['热门'],
  },
  {
    id: '2',
    code: 'sql-shortcuts',
    name: '数据库快捷指令速查',
    description: '高频快捷指令速查 + 针对性练习题强化记忆',
    icon: 'fa-bolt',
    iconBg: 'from-cyan-500 to-blue-600',
    category: 'IT_PROGRAMMING',
    difficulty: 'BEGINNER',
    questionCount: 15,
    duration: 20,
  },
  {
    id: '3',
    code: 'nextjs-basic',
    name: 'Next.js基础语法答题',
    description: 'Next.js 基础语法练习，巩固 React/Next.js 核心知识',
    icon: 'fa-react',
    iconBg: 'from-emerald-500 to-teal-600',
    category: 'IT_PROGRAMMING',
    difficulty: 'BEGINNER',
    questionCount: 18,
    duration: 25,
  },
  {
    id: '4',
    code: 'nextjs-shortcuts',
    name: 'Next.js高频关键字',
    description: '高频快捷关键字与缩写拼写题，提升编码速度',
    icon: 'fa-terminal',
    iconBg: 'from-lime-500 to-green-600',
    category: 'IT_PROGRAMMING',
    difficulty: 'INTERMEDIATE',
    questionCount: 22,
    duration: 30,
  },
  {
    id: '5',
    code: 'cloudcode',
    name: 'Cloud Code 指令答题',
    description: '部署、运行、命令拼写练习，掌握 Cloud Code 常用指令',
    icon: 'fa-cloud',
    iconBg: 'from-purple-500 to-violet-600',
    category: 'IT_PROGRAMMING',
    difficulty: 'INTERMEDIATE',
    questionCount: 20,
    duration: 25,
  },
  {
    id: '6',
    code: 'ai-prompt',
    name: 'AI 编程提示词',
    description: 'AI 编程提示词仿写与填空题，学会高效与 AI 协作',
    icon: 'fa-robot',
    iconBg: 'from-pink-500 to-rose-600',
    category: 'IT_PROGRAMMING',
    difficulty: 'INTERMEDIATE',
    questionCount: 18,
    duration: 30,
  },
  {
    id: '7',
    code: 'dev-english',
    name: '编程专业英语',
    description: '选择题与拼写题混合，巩固开发常用专业术语',
    icon: 'fa-code',
    iconBg: 'from-amber-500 to-orange-600',
    category: 'IT_PROGRAMMING',
    difficulty: 'BEGINNER',
    questionCount: 25,
    duration: 30,
  },
  {
    id: '8',
    code: 'cloudcode-commands',
    name: 'Cloud Code 开发命令',
    description: 'Cloud Code 开发命令速查，覆盖常用开发命令',
    icon: 'fa-terminal',
    iconBg: 'from-sky-500 to-cyan-600',
    category: 'IT_PROGRAMMING',
    difficulty: 'INTERMEDIATE',
    questionCount: 20,
    duration: 25,
  },
  {
    id: '9',
    code: 'advanced',
    name: '开发进阶篇',
    description: '高级开发技巧与最佳实践，向资深工程师迈进',
    icon: 'fa-rocket',
    iconBg: 'from-red-500 to-pink-600',
    category: 'IT_PROGRAMMING',
    difficulty: 'ADVANCED',
    questionCount: 25,
    duration: 35,
    tags: ['高级'],
  },
];

// Questions for each scene
export const sceneQuestions: Record<string, Question[]> = {
  // 1. 数据库指令答题 (SQL CRUD)
  '1': [
    {
      id: 'sql-q1',
      sceneId: '1',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '查询所有用户的信息',
      hint: '使用 SELECT * FROM 句型',
      difficulty: 'BEGINNER',
      topic: 'SELECT 查询',
    },
    {
      id: 'sql-q2',
      sceneId: '1',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '插入一条新记录到用户表',
      hint: '使用 INSERT INTO 句型',
      difficulty: 'BEGINNER',
      topic: 'INSERT 插入',
    },
    {
      id: 'sql-q3',
      sceneId: '1',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '更新指定用户的邮箱地址',
      hint: '使用 UPDATE ... SET ... WHERE 句型',
      difficulty: 'INTERMEDIATE',
      topic: 'UPDATE 更新',
    },
    {
      id: 'sql-q4',
      sceneId: '1',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '删除过期订单记录',
      hint: '使用 DELETE FROM ... WHERE 句型',
      difficulty: 'INTERMEDIATE',
      topic: 'DELETE 删除',
    },
    {
      id: 'sql-q5',
      sceneId: '1',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '按创建时间排序获取最新10条记录',
      hint: '使用 ORDER BY ... DESC LIMIT',
      difficulty: 'INTERMEDIATE',
      topic: 'ORDER BY 排序',
    },
  ],
  // 2. 数据库快捷指令速查
  '2': [
    {
      id: 'sql-shortcut-q1',
      sceneId: '2',
      type: 'EXPRESSION_EQUIVALENT',
      prompt: '列出表的所有字段',
      hint: '使用 DESC 或 DESCRIBE',
      difficulty: 'BEGINNER',
      topic: '表结构查看',
    },
    {
      id: 'sql-shortcut-q2',
      sceneId: '2',
      type: 'EXPRESSION_EQUIVALENT',
      prompt: '统计总记录数',
      hint: '使用 COUNT(*) 函数',
      difficulty: 'BEGINNER',
      topic: '聚合函数',
    },
    {
      id: 'sql-shortcut-q3',
      sceneId: '2',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '去重查询所有不重复的类别',
      hint: '使用 SELECT DISTINCT',
      difficulty: 'INTERMEDIATE',
      topic: 'DISTINCT 去重',
    },
    {
      id: 'sql-shortcut-q4',
      sceneId: '2',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '限制查询结果从第5条开始取10条',
      hint: '使用 LIMIT 和 OFFSET',
      difficulty: 'INTERMEDIATE',
      topic: '分页查询',
    },
  ],
  // 3. Next.js基础语法答题
  '3': [
    {
      id: 'nextjs-q1',
      sceneId: '3',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '声明一个常量变量',
      hint: '使用 const 关键字',
      difficulty: 'BEGINNER',
      topic: '变量声明',
    },
    {
      id: 'nextjs-q2',
      sceneId: '3',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '定义一个异步函数',
      hint: '使用 async function 语法',
      difficulty: 'BEGINNER',
      topic: '异步函数',
    },
    {
      id: 'nextjs-q3',
      sceneId: '3',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '解构赋值获取对象属性',
      hint: '使用 const { a, b } = obj',
      difficulty: 'INTERMEDIATE',
      topic: '解构赋值',
    },
    {
      id: 'nextjs-q4',
      sceneId: '3',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '箭头函数的简写形式',
      hint: '使用 () => {} 语法',
      difficulty: 'BEGINNER',
      topic: '箭头函数',
    },
    {
      id: 'nextjs-q5',
      sceneId: '3',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '展开运算符合并数组',
      hint: '使用 ... 展开运算符',
      difficulty: 'INTERMEDIATE',
      topic: '展开运算符',
    },
  ],
  // 4. Next.js高频关键字
  '4': [
    {
      id: 'nextjs-key-q1',
      sceneId: '4',
      type: 'EXPRESSION_EQUIVALENT',
      prompt: '不等于的判断条件',
      hint: '使用 !== 运算符',
      difficulty: 'INTERMEDIATE',
      topic: '比较运算符',
    },
    {
      id: 'nextjs-key-q2',
      sceneId: '4',
      type: 'EXPRESSION_EQUIVALENT',
      prompt: '严格相等判断',
      hint: '使用 === 而不是 ==',
      difficulty: 'BEGINNER',
      topic: '严格相等',
    },
    {
      id: 'nextjs-key-q3',
      sceneId: '4',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '可选链访问深层属性',
      hint: '使用 ?. 运算符',
      difficulty: 'INTERMEDIATE',
      topic: '可选链',
    },
    {
      id: 'nextjs-key-q4',
      sceneId: '4',
      type: 'EXPRESSION_EQUIVALENT',
      prompt: '空值合并运算符',
      hint: '使用 ?? 运算符',
      difficulty: 'INTERMEDIATE',
      topic: '空值合并',
    },
  ],
  // 5. Cloud Code 指令答题
  '5': [
    {
      id: 'cloudcode-q1',
      sceneId: '5',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '部署代码到生产环境',
      hint: '使用 "deploy" 或 "ship"',
      difficulty: 'INTERMEDIATE',
      topic: '部署命令',
    },
    {
      id: 'cloudcode-q2',
      sceneId: '5',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '运行本地开发服务器',
      hint: '使用 "run dev" 或 "npm run dev"',
      difficulty: 'BEGINNER',
      topic: '运行命令',
    },
    {
      id: 'cloudcode-q3',
      sceneId: '5',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '提交代码到版本库',
      hint: '使用 "commit" 和 "push"',
      difficulty: 'BEGINNER',
      topic: '提交命令',
    },
    {
      id: 'cloudcode-q4',
      sceneId: '5',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '拉取远程最新代码',
      hint: '使用 "pull" 命令',
      difficulty: 'BEGINNER',
      topic: '拉取命令',
    },
    {
      id: 'cloudcode-q5',
      sceneId: '5',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '查看代码变更状态',
      hint: '使用 "git status"',
      difficulty: 'BEGINNER',
      topic: '状态查看',
    },
  ],
  // 6. AI 编程提示词
  '6': [
    {
      id: 'ai-prompt-q1',
      sceneId: '6',
      type: 'FREE_EXPRESSION',
      prompt: '写一个代码优化提示词，要求AI给出性能改进建议',
      hint: '明确角色、任务和输出格式',
      difficulty: 'INTERMEDIATE',
      topic: '代码优化',
    },
    {
      id: 'ai-prompt-q2',
      sceneId: '6',
      type: 'FREE_EXPRESSION',
      prompt: '写一个代码审查提示词，让AI扮演资深工程师',
      hint: '包含角色设定和审查维度',
      difficulty: 'INTERMEDIATE',
      topic: '代码审查',
    },
    {
      id: 'ai-prompt-q3',
      sceneId: '6',
      type: 'FREE_EXPRESSION',
      prompt: '写一个SQL查询优化提示词',
      hint: '明确表结构、查询目标和优化要求',
      difficulty: 'INTERMEDIATE',
      topic: 'SQL优化',
    },
    {
      id: 'ai-prompt-q4',
      sceneId: '6',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '用英文写出"请解释这段代码的功能"',
      hint: '使用 explain 或 describe',
      difficulty: 'BEGINNER',
      topic: '代码解释',
    },
  ],
  // 7. 编程专业英语
  '7': [
    {
      id: 'dev-eng-q1',
      sceneId: '7',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '递归函数',
      hint: '使用 "recursive function"',
      difficulty: 'BEGINNER',
      topic: '函数类型',
    },
    {
      id: 'dev-eng-q2',
      sceneId: '7',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '回调函数',
      hint: '使用 "callback function"',
      difficulty: 'BEGINNER',
      topic: '函数类型',
    },
    {
      id: 'dev-eng-q3',
      sceneId: '7',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '内存泄漏',
      hint: '使用 "memory leak"',
      difficulty: 'INTERMEDIATE',
      topic: '内存管理',
    },
    {
      id: 'dev-eng-q4',
      sceneId: '7',
      type: 'EXPRESSION_EQUIVALENT',
      prompt: '并发控制',
      hint: '使用 "concurrency control"',
      difficulty: 'INTERMEDIATE',
      topic: '并发编程',
    },
    {
      id: 'dev-eng-q5',
      sceneId: '7',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '负载均衡',
      hint: '使用 "load balancing"',
      difficulty: 'INTERMEDIATE',
      topic: '系统架构',
    },
  ],
  // 8. Cloud Code 开发命令
  '8': [
    {
      id: 'cloudcode-commands-q1',
      sceneId: '8',
      type: 'EXPRESSION_EQUIVALENT',
      prompt: '什么是热部署',
      hint: '使用 "hot deployment" 或 "hot reload"',
      difficulty: 'INTERMEDIATE',
      topic: '部署概念',
    },
    {
      id: 'cloudcode-commands-q2',
      sceneId: '8',
      type: 'EXPRESSION_EQUIVALENT',
      prompt: '什么叫代码覆盖率',
      hint: '使用 "code coverage"',
      difficulty: 'INTERMEDIATE',
      topic: '测试概念',
    },
    {
      id: 'cloudcode-commands-q3',
      sceneId: '8',
      type: 'EXPRESSION_EQUIVALENT',
      prompt: '什么是持续集成',
      hint: '使用 "Continuous Integration" 或 CI',
      difficulty: 'INTERMEDIATE',
      topic: '开发流程',
    },
    {
      id: 'cloudcode-commands-q4',
      sceneId: '8',
      type: 'EXPRESSION_EQUIVALENT',
      prompt: '什么叫灰度发布',
      hint: '使用 "canary release" 或 "rolling update"',
      difficulty: 'INTERMEDIATE',
      topic: '发布策略',
    },
  ],
  // 9. 开发进阶篇
  '9': [
    {
      id: 'adv-q1',
      sceneId: '9',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '实现一个单例模式',
      hint: '使用 "singleton pattern"',
      difficulty: 'ADVANCED',
      topic: '设计模式',
    },
    {
      id: 'adv-q2',
      sceneId: '9',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '异步队列处理高并发请求',
      hint: '使用 "async queue" 或 "message queue"',
      difficulty: 'ADVANCED',
      topic: '高并发',
    },
    {
      id: 'adv-q3',
      sceneId: '9',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '缓存穿透的解决方案',
      hint: '使用 "cache penetration" 和 "bloom filter"',
      difficulty: 'ADVANCED',
      topic: '缓存策略',
    },
    {
      id: 'adv-q4',
      sceneId: '9',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '数据库读写分离架构',
      hint: '使用 "read-write splitting"',
      difficulty: 'ADVANCED',
      topic: '数据库架构',
    },
    {
      id: 'adv-q5',
      sceneId: '9',
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '微服务间的分布式事务处理',
      hint: '使用 "distributed transaction" 和 "saga pattern"',
      difficulty: 'ADVANCED',
      topic: '分布式系统',
    },
  ],
};

// Mock evaluation result
export const mockEvaluationResult: EvaluationResult = {
  totalScore: 82,
  dimensions: [
    { name: '准确度', score: 85, icon: 'fa-bullseye', color: 'bg-blue-500' },
    { name: '流畅度', score: 80, icon: 'fa-wind', color: 'bg-green-500' },
    { name: '专业度', score: 80, icon: 'fa-user-tie', color: 'bg-purple-500' },
  ],
  feedback: '你的翻译整体表达正确，语法准确。准确度扣分主要因为 "deploy" 虽然正确，但在硅谷语境下 "ship" 更为地道。流畅度良好，句式自然。建议在技术文档中优先使用 "ship to production" 或 "push to prod"，这些表达在代码审查和技术文档中更常见。',
  betterExpressions: [
    {
      userExpression: 'deploy the code',
      betterVersion: 'ship the code / push to prod',
      reason: '"Ship" 在硅谷 Startup 文化中更常用，强调快速交付和敏捷开发',
    },
    {
      userExpression: 'to production',
      betterVersion: 'to prod (缩写更常用)',
      reason: '口语和 Slack 中常用 "prod" 而非 "production"',
    },
  ],
  grammarIssues: [],
  yourTranslation: 'deploy the code to production',
  aiRecommendedVersion: 'ship the code to production',
};

// User stats
export const mockUserStats: UserStats = {
  totalPracticeCount: 156,
  completedQuestions: 82,
  averageScore: 78.5,
  consecutiveDays: 7,
};

// Recent practice records
export const mockPracticeRecords: PracticeRecord[] = [
  {
    id: '1',
    time: '今天 14:32',
    scene: scenes[4],
    question: '部署代码到生产环境',
    score: 82,
  },
  {
    id: '2',
    time: '今天 11:20',
    scene: scenes[2],
    question: '声明一个常量变量',
    score: 90,
  },
  {
    id: '3',
    time: '昨天 20:15',
    scene: scenes[0],
    question: '查询所有用户的信息',
    score: 75,
  },
];

// Helper function to get difficulty label
export function getDifficultyLabel(difficulty: Scene['difficulty']): string {
  const labels = {
    BEGINNER: 'L1 基础',
    INTERMEDIATE: 'L2 进阶',
    ADVANCED: 'L3 困难',
    EXPERT: 'L4 专家',
  };
  return labels[difficulty];
}

// Helper function to get scene by code
export function getSceneByCode(code: string): Scene | undefined {
  return scenes.find((s) => s.code === code);
}

// Helper function to get questions by scene id
export function getQuestionsBySceneId(sceneId: string): Question[] {
  return sceneQuestions[sceneId] || [];
}