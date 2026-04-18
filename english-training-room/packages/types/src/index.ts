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

export function isFallbackResponse(response: EvaluationResult | AIFallbackResponse): response is AIFallbackResponse {
  return 'is_fallback' in response && response.is_fallback === true;
}

export interface User {
  id: string;
  email?: string;
  phone?: string;
  nickname?: string;
  avatar?: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  vipStatus: "NONE" | "MONTHLY" | "YEARLY" | "LIFETIME";
  vipExpireAt?: string;
  coinBalance: number;
}

export interface Scene {
  id: string;
  code: string;
  name: string;
  description?: string;
  icon?: string;
  category: SceneCategory;
  difficulty: Difficulty;
  isActive: boolean;
  sortOrder: number;
}

export type SceneCategory =
  | "DAILY_LIFE"
  | "TRAVEL"
  | "BUSINESS"
  | "CET"
  | "IELTS"
  | "IT_PROGRAMMING";

export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

export interface Question {
  id: string;
  sceneId: string;
  type: QuestionType;
  prompt: string;
  referenceAnswer?: string;
  hint?: string;
  difficulty: Difficulty;
  tags: string[];
}

export type QuestionType =
  | "TRANSLATION_CN_TO_EN"
  | "TRANSLATION_EN_TO_CN"
  | "EXPRESSION_EQUIVALENT"
  | "FREE_EXPRESSION";

export interface PracticeRecord {
  id: string;
  userId: string;
  questionId: string;
  userInput: string;
  evaluationResult: EvaluationResult;
  totalScore: number;
  dimensions: string[];
  feedback: string;
  betterExpressions?: BetterExpression[];
  isFavorite: boolean;
  reviewCount: number;
  completionTime?: number;
  aiLatency?: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
  };
}
