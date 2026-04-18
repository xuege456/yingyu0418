import { Router } from "express";
import { z } from "zod";

export const scenesRouter = Router();

const SceneCategorySchema = z.enum([
  "DAILY_LIFE",
  "TRAVEL",
  "BUSINESS",
  "CET",
  "IELTS",
  "IT_PROGRAMMING",
]);

const DifficultySchema = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]);

// Mock data - in production this comes from database
const SCENES = [
  {
    id: "scene_daily",
    code: "daily",
    name: "日常口语",
    description: "日常生活中的实用表达",
    icon: "🏠",
    category: "DAILY_LIFE",
    difficulty: "BEGINNER",
    isActive: true,
    sortOrder: 1,
    questionCount: 15,
  },
  {
    id: "scene_travel",
    code: "travel",
    name: "出国旅游",
    description: "旅行中的常用英语对话",
    icon: "✈️",
    category: "TRAVEL",
    difficulty: "BEGINNER",
    isActive: true,
    sortOrder: 2,
    questionCount: 12,
  },
  {
    id: "scene_business",
    code: "business",
    name: "商务场景",
    description: "职场商务英语表达",
    icon: "💼",
    category: "BUSINESS",
    difficulty: "INTERMEDIATE",
    isActive: true,
    sortOrder: 3,
    questionCount: 20,
  },
  {
    id: "scene_cet",
    code: "cet",
    name: "四六级",
    description: "大学英语四六级备考",
    icon: "📚",
    category: "CET",
    difficulty: "INTERMEDIATE",
    isActive: true,
    sortOrder: 4,
    questionCount: 30,
  },
  {
    id: "scene_ielts",
    code: "ielts",
    name: "雅思托福",
    description: "雅思/托福考试训练",
    icon: "🎓",
    category: "IELTS",
    difficulty: "ADVANCED",
    isActive: true,
    sortOrder: 5,
    questionCount: 25,
  },
  {
    id: "scene_it",
    code: "it-programming",
    name: "IT与编程英语",
    description: "程序员专属技术英语",
    icon: "💻",
    category: "IT_PROGRAMMING",
    difficulty: "INTERMEDIATE",
    isActive: true,
    sortOrder: 6,
    questionCount: 18,
  },
];

/**
 * GET /api/scenes
 * Get all active scenes
 */
scenesRouter.get("/", (req, res) => {
  const activeScenes = SCENES.filter((s) => s.isActive);
  return res.json({
    success: true,
    data: activeScenes,
  });
});

/**
 * GET /api/scenes/:code
 * Get scene by code
 */
scenesRouter.get("/:code", (req, res) => {
  const { code } = req.params;
  const scene = SCENES.find((s) => s.code === code);

  if (!scene) {
    return res.status(404).json({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: `场景 ${code} 不存在`,
      },
    });
  }

  return res.json({
    success: true,
    data: scene,
  });
});

/**
 * GET /api/scenes/:code/questions
 * Get questions for a scene
 */
scenesRouter.get("/:code/questions", (req, res) => {
  const { code } = req.params;
  const { limit = "10", difficulty } = req.query;

  const scene = SCENES.find((s) => s.code === code);
  if (!scene) {
    return res.status(404).json({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: `场景 ${code} 不存在`,
      },
    });
  }

  // Mock questions - in production come from database
  const questions = [
    {
      id: "q1",
      prompt: "部署代码到生产环境",
      hint: "使用硅谷工程师常用的表达",
      difficulty: "INTERMEDIATE",
      tags: ["deployment", "production"],
    },
    {
      id: "q2",
      prompt: "调用这个接口获取用户数据",
      hint: "考虑用更专业的技术术语",
      difficulty: "INTERMEDIATE",
      tags: ["api", "fetch"],
    },
    {
      id: "q3",
      prompt: "我们需要进行一次代码审查",
      hint: "Code Review是常见的缩写形式",
      difficulty: "INTERMEDIATE",
      tags: ["code-review", "collaboration"],
    },
  ];

  let filtered = questions;
  if (difficulty) {
    filtered = filtered.filter((q) => q.difficulty === difficulty);
  }

  return res.json({
    success: true,
    data: {
      scene,
      questions: filtered.slice(0, parseInt(limit as string, 10)),
      total: filtered.length,
    },
  });
});
