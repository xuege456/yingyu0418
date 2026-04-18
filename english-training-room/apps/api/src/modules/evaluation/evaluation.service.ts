import Anthropic from "@anthropic-ai/sdk";
import { EvaluationResult, AIFallbackResponse } from "@anthropic-ai/evaluation";
import { buildEvaluationPrompt, IT_PROGRAMMING_PROMPT_CONFIG } from "../prompts/it-programming.js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const AI_TIMEOUT_MS = 15000; // 15 seconds

interface EvaluateParams {
  questionType: string;
  userInput: string;
  sceneCode?: string;
}

/**
 * Call AI with timeout handling and fallback
 */
async function callAIWithTimeout(
  prompt: string
): Promise<Anthropic.Message | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-7",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    clearTimeout(timeoutId);
    return message;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError" || error.code === "timeout") {
      return null; // Timeout
    }
    throw error;
  }
}

/**
 * Parse AI response text to EvaluationResult
 */
function parseAIResponse(text: string): EvaluationResult {
  try {
    // Try to extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);

      // Validate structure
      if (typeof parsed.total_score === "number") {
        return {
          total_score: Math.min(100, Math.max(0, parsed.total_score)),
          dimensions: Array.isArray(parsed.dimensions)
            ? parsed.dimensions.map((d: any) => ({
                name: String(d.name || "未知"),
                score: Math.min(100, Math.max(0, Number(d.score) || 0)),
                detail: String(d.detail || ""),
              }))
            : [],
          feedback: String(parsed.feedback || "暂无反馈"),
          better_expressions: Array.isArray(parsed.better_expressions)
            ? parsed.better_expressions.map((e: any) => ({
                user_expression: String(e.user_expression || ""),
                better_version: String(e.better_version || ""),
                reason: String(e.reason || ""),
              }))
            : [],
          grammar_issues: Array.isArray(parsed.grammar_issues)
            ? parsed.grammar_issues.map((g: any) => ({
                original: String(g.original || ""),
                corrected: String(g.corrected || ""),
                explanation: String(g.explanation || ""),
              }))
            : undefined,
        };
      }
    }
  } catch (e) {
    console.error("Failed to parse AI response:", e);
  }

  // Return default if parsing fails
  return {
    total_score: 70,
    dimensions: [
      { name: "技术准确性", score: 70, detail: "评估生成失败" },
      { name: "语法正确性", score: 70, detail: "评估生成失败" },
    ],
    feedback: "评估生成失败，请稍后重试",
    better_expressions: [],
  };
}

/**
 * Generate fallback response for timeout or error cases
 */
function getFallbackResponse(reason: "AI_TIMEOUT" | "AI_ERROR" | "RATE_LIMIT"): AIFallbackResponse {
  const messages = {
    AI_TIMEOUT: "AI老师当前较忙，请稍后重试",
    AI_ERROR: "AI评估服务出现异常，请稍后重试",
    RATE_LIMIT: "请求频率超限，请稍后重试",
  };

  return {
    total_score: 70,
    dimensions: [],
    feedback: messages[reason],
    better_expressions: [],
    is_fallback: true,
    fallback_reason: reason,
  };
}

/**
 * Main evaluation function with fallback handling
 */
export async function evaluateTranslation(params: EvaluateParams): Promise<EvaluationResult | AIFallbackResponse> {
  const { questionType, userInput, sceneCode } = params;

  // Build prompt
  const prompt = buildEvaluationPrompt(questionType, userInput, sceneCode);

  try {
    // Try to call AI
    const message = await callAIWithTimeout(prompt);

    if (!message) {
      // Timeout occurred
      console.warn("AI evaluation timeout");
      return getFallbackResponse("AI_TIMEOUT");
    }

    // Parse response
    const responseText = message.content[0].type === "text"
      ? message.content[0].text
      : "";

    return parseAIResponse(responseText);
  } catch (error: any) {
    console.error("AI evaluation error:", error);

    // Handle specific errors
    if (error.status === 429) {
      return getFallbackResponse("RATE_LIMIT");
    }

    return getFallbackResponse("AI_ERROR");
  }
}

/**
 * Validate user input before sending to AI
 */
export function validateInput(input: string): { valid: boolean; error?: string } {
  const trimmed = input.trim();

  // Check empty
  if (!trimmed) {
    return { valid: false, error: "输入不能为空" };
  }

  // Check too short
  if (trimmed.length < 2) {
    return { valid: false, error: "输入过短，请提供更完整的翻译" };
  }

  // Check nonsense (simple check)
  const nonsensePatterns = /^[asdfghjklzxcvbnm]+$/i;
  if (nonsensePatterns.test(trimmed.toLowerCase())) {
    return { valid: false, error: "请输入有意义的翻译内容" };
  }

  // Check if all Chinese (for EN output scenarios)
  const allChinese = /^[\u4e00-\u9fa5]+$/;
  if (allChinese.test(trimmed)) {
    return { valid: false, error: "请输入英文翻译，而非纯中文" };
  }

  return { valid: true };
}
