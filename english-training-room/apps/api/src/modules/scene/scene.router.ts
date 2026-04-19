import { Router } from "express";
import { z } from "zod";
import prisma from "../../db/index.js";

export const scenesRouter = Router();

// Icon mapping for frontend display
const ICON_MAP: Record<string, { icon: string; iconBg: string }> = {
  DAILY_LIFE: { icon: "fa-home", iconBg: "from-green-500 to-teal-600" },
  TRAVEL: { icon: "fa-plane", iconBg: "from-cyan-500 to-blue-600" },
  BUSINESS: { icon: "fa-briefcase", iconBg: "from-amber-500 to-orange-600" },
  CET: { icon: "fa-book", iconBg: "from-purple-500 to-pink-600" },
  IELTS: { icon: "fa-graduation-cap", iconBg: "from-rose-500 to-red-600" },
  IT_PROGRAMMING: { icon: "fa-code", iconBg: "from-blue-500 to-purple-600" },
};

const DifficultySchema = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]);

/**
 * GET /api/scenes
 * Get all active scenes
 */
scenesRouter.get("/", async (req, res) => {
  try {
    const scenes = await prisma.scene.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    // Transform for frontend
    const transformedScenes = scenes.map((scene) => ({
      id: scene.id,
      code: scene.code,
      name: scene.name,
      description: scene.description || "",
      icon: scene.icon || ICON_MAP[scene.category]?.icon || "fa-book",
      iconBg: ICON_MAP[scene.category]?.iconBg || "from-gray-500 to-gray-600",
      category: scene.category,
      difficulty: scene.difficulty,
      questionCount: scene._count.questions,
      tags: scene.category === "IT_PROGRAMMING" ? ["热门"] : [],
    }));

    return res.json({
      success: true,
      data: transformedScenes,
    });
  } catch (error) {
    console.error("Error fetching scenes:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "获取场景列表失败",
      },
    });
  }
});

/**
 * GET /api/scenes/:code
 * Get scene by code
 */
scenesRouter.get("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const scene = await prisma.scene.findUnique({
      where: { code },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    if (!scene) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: `场景 ${code} 不存在`,
        },
      });
    }

    const transformedScene = {
      id: scene.id,
      code: scene.code,
      name: scene.name,
      description: scene.description || "",
      icon: scene.icon || ICON_MAP[scene.category]?.icon || "fa-book",
      iconBg: ICON_MAP[scene.category]?.iconBg || "from-gray-500 to-gray-600",
      category: scene.category,
      difficulty: scene.difficulty,
      questionCount: scene._count.questions,
    };

    return res.json({
      success: true,
      data: transformedScene,
    });
  } catch (error) {
    console.error("Error fetching scene:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "获取场景详情失败",
      },
    });
  }
});

/**
 * GET /api/scenes/:code/questions
 * Get questions for a scene
 */
scenesRouter.get("/:code/questions", async (req, res) => {
  const { code } = req.params;
  const { limit = "10", difficulty } = req.query;

  try {
    // First get the scene
    const scene = await prisma.scene.findUnique({
      where: { code },
    });

    if (!scene) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: `场景 ${code} 不存在`,
        },
      });
    }

    // Build where clause
    const whereClause: any = {
      sceneId: scene.id,
      isActive: true,
    };

    if (difficulty && DifficultySchema.safeParse(difficulty).success) {
      whereClause.difficulty = difficulty;
    }

    // Get questions
    const questions = await prisma.question.findMany({
      where: whereClause,
      take: parseInt(limit as string, 10),
      orderBy: { createdAt: "asc" },
    });

    // Transform for frontend
    const transformedQuestions = questions.map((q) => ({
      id: q.id,
      type: q.type,
      prompt: q.prompt,
      hint: q.hint,
      difficulty: q.difficulty,
      topic: q.tags && q.tags.length > 0 ? q.tags[0] : undefined,
    }));

    // Get scene info for response
    const sceneInfo = {
      id: scene.id,
      code: scene.code,
      name: scene.name,
      description: scene.description || "",
      icon: scene.icon || ICON_MAP[scene.category]?.icon || "fa-book",
      iconBg: ICON_MAP[scene.category]?.iconBg || "from-gray-500 to-gray-600",
      category: scene.category,
      difficulty: scene.difficulty,
    };

    return res.json({
      success: true,
      data: {
        scene: sceneInfo,
        questions: transformedQuestions,
        total: transformedQuestions.length,
      },
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "获取题目列表失败",
      },
    });
  }
});