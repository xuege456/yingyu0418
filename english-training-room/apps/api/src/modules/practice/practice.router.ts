import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import prisma from "../../db/index.js";
import { authMiddleware } from "../auth/auth.router.js";

export const practiceRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

const SubmitSchema = z.object({
  questionId: z.string(),
  userInput: z.string().max(300),
});

// Helper to get user from token
function getUserFromToken(req: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  try {
    const token = authHeader.split(" ")[1];
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * GET /api/practice/history
 * Get practice history for current user
 */
practiceRouter.get("/history", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: "UNAUTHORIZED", message: "请先登录" },
      });
    }

    const { page = "1", pageSize = "10" } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(pageSize as string);

    const [records, total] = await Promise.all([
      prisma.practiceRecord.findMany({
        where: { userId: (user as any).userId },
        include: {
          question: {
            select: {
              id: true,
              prompt: true,
              scene: { select: { code: true, name: true, icon: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: parseInt(pageSize as string),
      }),
      prisma.practiceRecord.count({ where: { userId: (user as any).userId } }),
    ]);

    const items = records.map((r) => ({
      id: r.id,
      questionId: r.questionId,
      questionPrompt: r.question.prompt,
      sceneCode: r.question.scene.code,
      sceneName: r.question.scene.name,
      sceneIcon: r.question.scene.icon,
      userInput: r.userInput,
      totalScore: r.totalScore,
      createdAt: r.createdAt.toISOString(),
    }));

    return res.json({
      success: true,
      data: {
        items,
        total,
        page: parseInt(page as string),
        pageSize: parseInt(pageSize as string),
        totalPages: Math.ceil(total / parseInt(pageSize as string)),
      },
    });
  } catch (error) {
    console.error("Get history error:", error);
    return res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "获取历史记录失败" },
    });
  }
});

/**
 * GET /api/practice/stats
 * Get practice statistics for current user
 */
practiceRouter.get("/stats", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: "UNAUTHORIZED", message: "请先登录" },
      });
    }

    const userId = (user as any).userId;

    // Get user's practice records
    const records = await prisma.practiceRecord.findMany({
      where: { userId },
      select: {
        totalScore: true,
        createdAt: true,
        question: {
          select: {
            scene: { select: { category: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (records.length === 0) {
      return res.json({
        success: true,
        data: {
          totalPracticeDays: 0,
          totalQuestions: 0,
          averageScore: 0,
          masteredSentences: 0,
          radarData: { accuracy: 0, fluency: 0, vocabulary: 0, idiomaticity: 0 },
        },
      });
    }

    // Calculate stats
    const totalQuestions = records.length;
    const averageScore = Math.round(records.reduce((sum, r) => sum + r.totalScore, 0) / totalQuestions);

    // Calculate consecutive days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let consecutiveDays = 0;
    const uniqueDays = new Set<string>();

    records.forEach((r) => {
      const day = r.createdAt.toISOString().split("T")[0];
      uniqueDays.add(day);
    });

    // Count consecutive days from today
    const sortedDays = Array.from(uniqueDays).sort().reverse();
    for (let i = 0; i < sortedDays.length; i++) {
      const dayDate = new Date(sortedDays[i]);
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);
      if (dayDate.toISOString().split("T")[0] === expectedDate.toISOString().split("T")[0]) {
        consecutiveDays++;
      } else {
        break;
      }
    }

    // Get mastered sentences (score >= 85)
    const masteredSentences = await prisma.practiceRecord.count({
      where: { userId, totalScore: { gte: 85 } },
    });

    // Get scene-specific scores for radar
    const sceneScores: Record<string, number[]> = {};
    records.forEach((r) => {
      const cat = r.question.scene.category;
      if (!sceneScores[cat]) sceneScores[cat] = [];
      sceneScores[cat].push(r.totalScore);
    });

    const radarData = {
      accuracy: sceneScores["IT_PROGRAMMING"]?.length
        ? Math.round(sceneScores["IT_PROGRAMMING"].reduce((a, b) => a + b, 0) / sceneScores["IT_PROGRAMMING"].length)
        : averageScore,
      fluency: sceneScores["DAILY_LIFE"]?.length
        ? Math.round(sceneScores["DAILY_LIFE"].reduce((a, b) => a + b, 0) / sceneScores["DAILY_LIFE"].length)
        : Math.round(averageScore * 0.95),
      vocabulary: sceneScores["BUSINESS"]?.length
        ? Math.round(sceneScores["BUSINESS"].reduce((a, b) => a + b, 0) / sceneScores["BUSINESS"].length)
        : Math.round(averageScore * 0.9),
      idiomaticity: sceneScores["TRAVEL"]?.length
        ? Math.round(sceneScores["TRAVEL"].reduce((a, b) => a + b, 0) / sceneScores["TRAVEL"].length)
        : Math.round(averageScore * 0.85),
    };

    return res.json({
      success: true,
      data: {
        totalPracticeDays: consecutiveDays,
        totalQuestions,
        averageScore,
        masteredSentences,
        radarData,
      },
    });
  } catch (error) {
    console.error("Get stats error:", error);
    return res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "获取统计数据失败" },
    });
  }
});