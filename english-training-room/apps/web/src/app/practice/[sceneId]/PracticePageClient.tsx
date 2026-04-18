"use client";

import { useState } from "react";
import Link from "next/link";
import { EvaluationResult } from "@/types/evaluation";

interface Question {
  id: string;
  prompt: string;
  hint?: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
}

interface PracticePageClientProps {
  scene: {
    code: string;
    name: string;
    description: string;
  };
  questions: Question[];
}

// Mock AI evaluation function
async function mockEvaluate(
  questionType: string,
  userInput: string
): Promise<EvaluationResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock response based on input
  const hasGoodVocabulary =
    userInput.toLowerCase().includes("deploy") ||
    userInput.toLowerCase().includes("fetch") ||
    userInput.toLowerCase().includes("api");

  const score = hasGoodVocabulary ? 88 : 72;

  return {
    total_score: score,
    dimensions: [
      {
        name: "技术准确性",
        score: hasGoodVocabulary ? 90 : 75,
        detail: hasGoodVocabulary
          ? "准确使用了专业术语"
          : "部分技术表达可以更地道",
      },
      {
        name: "语法正确性",
        score: 85,
        detail: "语法结构正确",
      },
      {
        name: "流畅度",
        score: 80,
        detail: "表达流畅，但可以更自然",
      },
      {
        name: "地道表达",
        score: hasGoodVocabulary ? 92 : 65,
        detail: hasGoodVocabulary
          ? "使用了硅谷工程师常用的表达方式"
          : "建议使用更地道的英语表达",
      },
    ],
    feedback:
      hasGoodVocabulary
        ? "整体表现不错！你使用了正确的技术术语。继续加油！"
        : "表达基本准确，但建议使用更地道的英语技术表达。例如：把'部署代码'翻译为'deploy the code'或'ship to production'会更专业。",
    better_expressions: hasGoodVocabulary
      ? []
      : [
          {
            user_expression: "deploy the code",
            better_version: "ship to production / push to production",
            reason: "更符合硅谷工程师日常用语习惯",
          },
        ],
  };
}

export default function PracticePageClient({
  scene,
  questions,
}: PracticePageClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = `${currentIndex + 1} / ${questions.length}`;

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setIsEvaluating(true);
    setResult(null);

    try {
      const evalResult = await mockEvaluate("TRANSLATION_CN_TO_EN", userInput);
      setResult(evalResult);
    } catch (error) {
      console.error("Evaluation failed:", error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSkip = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
    setUserInput("");
    setResult(null);
    setShowHint(false);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput("");
      setResult(null);
      setShowHint(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link
              href="/practice"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              ← 返回题库
            </Link>
            <span className="font-medium">{scene.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              进度: {progress}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-xl border shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                ${
                  currentQuestion.difficulty === "BEGINNER"
                    ? "bg-green-100 text-green-800"
                    : ""
                }
                ${
                  currentQuestion.difficulty === "INTERMEDIATE"
                    ? "bg-yellow-100 text-yellow-800"
                    : ""
                }
                ${
                  currentQuestion.difficulty === "ADVANCED"
                    ? "bg-red-100 text-red-800"
                    : ""
                }
              `}
            >
              {currentQuestion.difficulty === "BEGINNER"
                ? "L1 基础"
                : currentQuestion.difficulty === "INTERMEDIATE"
                ? "L2 进阶"
                : "L3 困难"}
            </span>
            {currentQuestion.hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                {showHint ? "隐藏提示" : "显示提示"}
              </button>
            )}
          </div>

          <p className="text-lg font-medium mb-2">请将以下中文翻译成英文：</p>
          <p className="text-xl text-primary">{currentQuestion.prompt}</p>

          {showHint && currentQuestion.hint && (
            <p className="mt-4 text-sm text-muted-foreground bg-blue-50 rounded-lg p-3">
              💡 提示: {currentQuestion.hint}
            </p>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-card rounded-xl border shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium mb-2">
            你的翻译答案
          </label>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.slice(0, 300))}
            placeholder="在此输入你的英文翻译..."
            className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            maxLength={300}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {userInput.length}/300 字符
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={!userInput.trim() || isEvaluating}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isEvaluating ? (
              <>
                <span className="mr-2 animate-spin">⏳</span>
                AI 评估中...
              </>
            ) : (
              "提交评估"
            )}
          </button>
          <button
            onClick={handleSkip}
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            跳过此题
          </button>
        </div>

        {/* AI Feedback Panel */}
        {result && (
          <div className="mt-6 bg-card rounded-xl border shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">AI 评估结果</h3>

            {/* Total Score */}
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {result.total_score}
                </div>
                <div className="text-xs text-muted-foreground">综合得分</div>
              </div>
              <div className="flex-1 space-y-2">
                {result.dimensions.map((dim, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-sm w-20">{dim.name}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{dim.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-sm">{result.feedback}</p>
            </div>

            {/* Better Expressions */}
            {result.better_expressions.length > 0 && (
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-green-800 mb-2">
                  地道表达推荐
                </h4>
                {result.better_expressions.map((expr, idx) => (
                  <div key={idx} className="text-sm mb-2">
                    <p className="text-green-700">
                      <span className="font-medium">原文:</span>{" "}
                      {expr.user_expression}
                    </p>
                    <p className="text-green-700">
                      <span className="font-medium">推荐:</span>{" "}
                      {expr.better_version}
                    </p>
                    <p className="text-green-600 text-xs mt-1">
                      {expr.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Next Button */}
            {currentIndex < questions.length - 1 && (
              <button
                onClick={handleNext}
                className="mt-4 w-full inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                下一题 →
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          英语练功房
        </Link>
      </footer>
    </div>
  );
}
