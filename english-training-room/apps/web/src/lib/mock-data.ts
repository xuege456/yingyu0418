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
    code: 'it-programming',
    name: 'IT与编程英语',
    description: '程序员专属技术英语，涵盖代码部署、接口调用、Code Review等场景',
    icon: 'fa-code',
    iconBg: 'from-blue-500 to-purple-600',
    category: 'IT_PROGRAMMING',
    difficulty: 'INTERMEDIATE',
    questionCount: 20,
    duration: 30,
    tags: ['热门'],
  },
  {
    id: '2',
    code: 'daily',
    name: '日常口语',
    description: '日常生活中的实用表达，轻松应对各种日常对话场景',
    icon: 'fa-home',
    iconBg: 'from-green-500 to-teal-600',
    category: 'DAILY_LIFE',
    difficulty: 'BEGINNER',
    questionCount: 15,
    duration: 20,
  },
  {
    id: '3',
    code: 'travel',
    name: '出国旅游',
    description: '旅行中的常用英语对话，让你的出境游沟通无障碍',
    icon: 'fa-plane',
    iconBg: 'from-cyan-500 to-blue-600',
    category: 'TRAVEL',
    difficulty: 'BEGINNER',
    questionCount: 18,
    duration: 25,
  },
  {
    id: '4',
    code: 'business',
    name: '商务场景',
    description: '职场商务英语表达，提升职场沟通专业度',
    icon: 'fa-briefcase',
    iconBg: 'from-amber-500 to-orange-600',
    category: 'BUSINESS',
    difficulty: 'INTERMEDIATE',
    questionCount: 22,
    duration: 35,
  },
  {
    id: '5',
    code: 'cet',
    name: '四六级',
    description: '大学英语四六级备考，专项训练翻译题型',
    icon: 'fa-book',
    iconBg: 'from-purple-500 to-pink-600',
    category: 'CET',
    difficulty: 'INTERMEDIATE',
    questionCount: 25,
    duration: 40,
  },
  {
    id: '6',
    code: 'ielts',
    name: '雅思托福',
    description: '雅思/托福考试训练，备战出国语言考试',
    icon: 'fa-graduation-cap',
    iconBg: 'from-rose-500 to-red-600',
    category: 'IELTS',
    difficulty: 'ADVANCED',
    questionCount: 30,
    duration: 50,
    tags: ['高级'],
  },
];

// Questions for IT Programming scene
export const itProgrammingQuestions: Question[] = [
  {
    id: 'q1',
    sceneId: '1',
    type: 'TRANSLATION_CN_TO_EN',
    prompt: '部署代码到生产环境',
    hint: '使用硅谷工程师常用的表达，如 "ship to production" 或 "push to production"',
    difficulty: 'INTERMEDIATE',
    topic: '代码部署 (Deployment)',
  },
  {
    id: 'q2',
    sceneId: '1',
    type: 'TRANSLATION_CN_TO_EN',
    prompt: '调用这个接口获取用户数据',
    hint: '可以用 "hit the endpoint" 或 "fetch the API"',
    difficulty: 'INTERMEDIATE',
    topic: '接口调用 (API)',
  },
  {
    id: 'q3',
    sceneId: '1',
    type: 'TRANSLATION_CN_TO_EN',
    prompt: '我们需要进行一次代码审查',
    hint: '常用表达是 "code review" 或 "CR"',
    difficulty: 'INTERMEDIATE',
    topic: '代码审查 (Code Review)',
  },
  {
    id: 'q4',
    sceneId: '1',
    type: 'TRANSLATION_CN_TO_EN',
    prompt: '把新功能提交给测试团队',
    hint: '可以用 "hand off for testing" 或 "submit for QA"',
    difficulty: 'INTERMEDIATE',
    topic: '提测 (Hand off)',
  },
  {
    id: 'q5',
    sceneId: '1',
    type: 'TRANSLATION_CN_TO_EN',
    prompt: '修复这个bug',
    hint: '可以说 "fix this bug" 或 "debug this issue"',
    difficulty: 'BEGINNER',
    topic: 'Bug修复 (Debug)',
  },
];

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
    scene: scenes[0],
    question: '部署代码到生产环境',
    score: 82,
  },
  {
    id: '2',
    time: '今天 11:20',
    scene: scenes[1],
    question: '你今天过得怎么样？',
    score: 90,
  },
  {
    id: '3',
    time: '昨天 20:15',
    scene: scenes[3],
    question: '感谢您抽出宝贵时间',
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
  return itProgrammingQuestions.filter((q) => q.sceneId === sceneId);
}