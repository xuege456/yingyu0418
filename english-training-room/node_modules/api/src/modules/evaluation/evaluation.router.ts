import { Router } from "express";
import { z } from "zod";
import { evaluateTranslation, validateInput } from "./evaluation.service.js";
import { IT_PROGRAMMING_PROMPT_CONFIG, checkRequiredTranslation } from "../../prompts/it-programming.js";

export const evaluationRouter = Router();

const EvaluateSchema = z.object({
  questionType: z.string(),
  userInput: z.string().max(300),
  sceneCode: z.string().optional(),
});

/**
 * POST /api/evaluation
 * Submit a translation for AI evaluation
 */
evaluationRouter.post("/", async (req, res) => {
  try {
    // Validate request body
    const parsed = EvaluateSchema.safeParse(req.body);
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

    const { questionType, userInput, sceneCode } = parsed.data;

    // Validate user input
    const validation = validateInput(userInput);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_INPUT",
          message: validation.error,
        },
      });
    }

    // Perform evaluation
    const result = await evaluateTranslation({
      questionType,
      userInput,
      sceneCode,
    });

    return res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Evaluation endpoint error:", error);
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
 * GET /api/evaluation/check-translation
 * Check if a phrase needs better translation
 */
evaluationRouter.get("/check-translation", (req, res) => {
  const { phrase } = req.query;

  if (!phrase || typeof phrase !== "string") {
    return res.status(400).json({
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message: "缺少 phrase 参数",
      },
    });
  }

  const suggestions = checkRequiredTranslation(phrase);

  return res.json({
    success: true,
    data: {
      phrase,
      suggestions: suggestions || [],
      hasAlternatives: !!suggestions,
    },
  });
});

/**
 * GET /api/evaluation/prompt-config
 * Get the prompt configuration for IT programming category
 */
evaluationRouter.get("/prompt-config", (req, res) => {
  const { category } = req.query;

  if (category === "IT_PROGRAMMING") {
    return res.json({
      success: true,
      data: {
        required_translations: IT_PROGRAMMING_PROMPT_CONFIG.required_translations,
        scene_overrides: IT_PROGRAMMING_PROMPT_CONFIG.scene_overrides,
        output_format: IT_PROGRAMMING_PROMPT_CONFIG.output_format,
      },
    });
  }

  return res.json({
    success: true,
    data: null,
  });
});
