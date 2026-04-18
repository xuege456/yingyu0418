import { Router } from "express";
import { z } from "zod";

export const practiceRouter = Router();

const SubmitSchema = z.object({
  questionId: z.string(),
  userInput: z.string().max(300),
});

/**
 * POST /api/practice/submit
 * Submit a practice answer for evaluation
 */
practiceRouter.post("/submit", async (req, res) => {
  try {
    const parsed = SubmitSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "请求参数无效",
          details: parsed.error.issues,
        },
      });
    }

    const { questionId, userInput } = parsed.data;

    // In production, this would:
    // 1. Get the question from DB
    // 2. Get the scene to determine prompt config
    // 3. Call evaluation service
    // 4. Save practice record

    // Mock response
    return res.json({
      success: true,
      data: {
        recordId: `record_${Date.now()}`,
        questionId,
        totalScore: 85,
        dimensions: [
          { name: "技术准确性", score: 90, detail: "准确使用专业术语" },
          { name: "语法正确性", score: 85, detail: "语法结构正确" },
        ],
        feedback: "整体表现不错！",
        betterExpressions: [],
      },
    });
  } catch (error) {
    console.error("Practice submit error:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "服务器内部错误",
      },
    });
  }
});

/**
 * GET /api/practice/history
 * Get practice history for current user
 */
practiceRouter.get("/history", (req, res) => {
  // Mock history data
  return res.json({
    success: true,
    data: {
      items: [
        {
          id: "record_1",
          questionId: "q1",
          questionPrompt: "部署代码到生产环境",
          userInput: "deploy the code to production",
          totalScore: 88,
          createdAt: "2024-01-15T10:30:00Z",
        },
        {
          id: "record_2",
          questionId: "q2",
          questionPrompt: "调用这个接口获取用户数据",
          userInput: "fetch user data from this API",
          totalScore: 92,
          createdAt: "2024-01-15T09:20:00Z",
        },
      ],
      total: 2,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    },
  });
});

/**
 * GET /api/practice/stats
 * Get practice statistics
 */
practiceRouter.get("/stats", (req, res) => {
  return res.json({
    success: true,
    data: {
      totalPracticeDays: 5,
      totalQuestions: 23,
      averageScore: 81,
      masteredSentences: 12,
      radarData: {
        accuracy: 82,
        fluency: 78,
        vocabulary: 85,
        idiomaticity: 75,
      },
    },
  });
});
