/**
 * AI Evaluation Result Types
 * Standardized JSON structure for AI evaluation responses
 */

export interface EvaluationResult {
  total_score: number;
  dimensions: DimensionScore[];
  feedback: string;
  better_expressions: BetterExpression[];
  grammar_issues?: GrammarIssue[];
  overall_comment?: string;
}

export interface DimensionScore {
  name: string;
  score: number;
  detail: string;
}

export interface BetterExpression {
  user_expression: string;
  better_version: string;
  reason: string;
}

export interface GrammarIssue {
  original: string;
  corrected: string;
  explanation: string;
}

export interface AIFallbackResponse extends EvaluationResult {
  is_fallback: true;
  fallback_reason: "AI_TIMEOUT" | "AI_ERROR" | "RATE_LIMIT";
}

/**
 * Check if response is a fallback
 */
export function isFallbackResponse(response: EvaluationResult | AIFallbackResponse): response is AIFallbackResponse {
  return 'is_fallback' in response && response.is_fallback === true;
}
