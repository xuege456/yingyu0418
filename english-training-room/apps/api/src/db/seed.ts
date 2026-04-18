import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { scenes, achievements } from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log('🌱 开始种子数据...');

  // ==================== 场景数据 ====================
  console.log('📚 插入场景数据...');

  const sceneData = [
    {
      code: 'it_programming',
      name: 'IT与编程英语',
      description: '程序员专属技术英语，涵盖代码部署、接口调用、Code Review等场景',
      icon: 'code',
      category: 'IT_PROGRAMMING' as const,
      difficulty: 'INTERMEDIATE' as const,
      sortOrder: 1,
    },
    {
      code: 'daily_life',
      name: '日常口语',
      description: '日常生活中的实用表达，轻松应对各种日常对话场景',
      icon: 'home',
      category: 'DAILY_LIFE' as const,
      difficulty: 'BEGINNER' as const,
      sortOrder: 2,
    },
    {
      code: 'travel',
      name: '出国旅游',
      description: '旅行中的常用英语对话，让你的出境游沟通无障碍',
      icon: 'plane',
      category: 'TRAVEL' as const,
      difficulty: 'BEGINNER' as const,
      sortOrder: 3,
    },
    {
      code: 'business',
      name: '商务场景',
      description: '职场商务英语表达，提升职场沟通专业度',
      icon: 'briefcase',
      category: 'BUSINESS' as const,
      difficulty: 'INTERMEDIATE' as const,
      sortOrder: 4,
    },
    {
      code: 'cet',
      name: '四六级',
      description: '大学英语四六级备考，专项训练翻译题型',
      icon: 'book',
      category: 'CET' as const,
      difficulty: 'INTERMEDIATE' as const,
      sortOrder: 5,
    },
    {
      code: 'ielts',
      name: '雅思托福',
      description: '雅思/托福考试训练，备战出国语言考试',
      icon: 'graduation-cap',
      category: 'IELTS' as const,
      difficulty: 'ADVANCED' as const,
      sortOrder: 6,
    },
  ];

  for (const scene of sceneData) {
    await db.insert(scenes).values(scene).onConflictDoNothing();
    console.log(`  ✓ 场景: ${scene.name}`);
  }

  // ==================== 成就数据 ====================
  console.log('🏆 插入成就数据...');

  const achievementData = [
    // 连续练习成就
    {
      code: 'STREAK_3',
      name: '初露锋芒',
      description: '连续练习3天',
      icon: 'fire',
      category: 'streak',
      requirement: 3,
    },
    {
      code: 'STREAK_7',
      name: '坚持不懈',
      description: '连续练习7天',
      icon: 'fire',
      category: 'streak',
      requirement: 7,
    },
    {
      code: 'STREAK_30',
      name: '习惯养成',
      description: '连续练习30天',
      icon: 'fire',
      category: 'streak',
      requirement: 30,
    },
    // 完成题目成就
    {
      code: 'QUESTIONS_10',
      name: '初学者',
      description: '累计完成10道题目',
      icon: 'tasks',
      category: 'completion',
      requirement: 10,
    },
    {
      code: 'QUESTIONS_100',
      name: '练习达人',
      description: '累计完成100道题目',
      icon: 'tasks',
      category: 'completion',
      requirement: 100,
    },
    {
      code: 'QUESTIONS_500',
      name: '熟能生巧',
      description: '累计完成500道题目',
      icon: 'tasks',
      category: 'completion',
      requirement: 500,
    },
    // 场景成就
    {
      code: 'IT_QUESTIONS_20',
      name: 'IT达人',
      description: '完成20道IT英语题目',
      icon: 'code',
      category: 'category',
      requirement: 20,
    },
    {
      code: 'IT_SCENE_COMPLETE',
      name: 'IT专家',
      description: '完成IT场景全部题目',
      icon: 'check-double',
      category: 'category',
      requirement: 1,
    },
    // 得分成就
    {
      code: 'SCORE_PERFECT',
      name: '满分达成',
      description: '首次获得满分',
      icon: 'star',
      category: 'score',
      requirement: 100,
    },
    {
      code: 'AVG_SCORE_80',
      name: '优秀学员',
      description: '平均得分超过80分',
      icon: 'chart-line',
      category: 'score',
      requirement: 80,
    },
    {
      code: 'AVG_SCORE_90',
      name: '卓越表现',
      description: '平均得分超过90分',
      icon: 'chart-line',
      category: 'score',
      requirement: 90,
    },
  ];

  for (const achievement of achievementData) {
    await db.insert(achievements).values(achievement).onConflictDoNothing();
    console.log(`  ✓ 成就: ${achievement.name}`);
  }

  console.log('✅ 种子数据插入完成！');
}

seed().catch(console.error);
