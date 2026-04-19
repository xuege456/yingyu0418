'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const gradientBg = 'bg-gradient-to-r from-blue-600 to-purple-600';

interface Dimension {
  name: string;
  score: number;
  detail?: string;
}

interface BetterExpression {
  user_expression: string;
  better_version: string;
  reason: string;
}

interface EvaluationResult {
  total_score: number;
  dimensions: Dimension[];
  feedback: string;
  better_expressions: BetterExpression[];
}

interface Question {
  id: string;
  prompt: string;
  hint?: string;
  topic?: string;
}

export default function ResultPage() {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [userInput, setUserInput] = useState<string>('');

  useEffect(() => {
    // Get data from sessionStorage
    const storedResult = sessionStorage.getItem('evaluationResult');
    const storedQuestion = sessionStorage.getItem('question');
    const storedUserInput = sessionStorage.getItem('userInput');

    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    if (storedQuestion) {
      setQuestion(JSON.parse(storedQuestion));
    }
    if (storedUserInput) {
      setUserInput(storedUserInput);
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-spinner fa-spin text-primary-600 text-2xl" />
            </div>
            <p className="text-gray-600 mb-4">加载评估结果...</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate the stroke dashoffset for the score circle
  const scorePercentage = result.total_score / 100;
  const circumference = 2 * Math.PI * 70; // radius = 70
  const strokeDashoffset = circumference * (1 - scorePercentage);

  // Get icon and color for each dimension
  const getDimensionIcon = (name: string) => {
    if (name.includes('准确度') || name.includes('准确性')) return { icon: 'fa-bullseye', color: 'bg-blue-500' };
    if (name.includes('流畅度')) return { icon: 'fa-wind', color: 'bg-green-500' };
    if (name.includes('专业度')) return { icon: 'fa-user-tie', color: 'bg-purple-500' };
    if (name.includes('词汇量')) return { icon: 'fa-book', color: 'bg-amber-500' };
    if (name.includes('语法')) return { icon: 'fa-spell-check', color: 'bg-cyan-500' };
    return { icon: 'fa-star', color: 'bg-gray-500' };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/practice/it-programming"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <i className="fas fa-arrow-left" />
                <span className="hidden sm:inline">返回练习</span>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${gradientBg} flex items-center justify-center`}>
                  <i className="fas fa-code text-white text-sm" />
                </div>
                <span className="font-semibold text-gray-900">IT与编程英语</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <i className="fas fa-fire text-orange-500" />
                <span>
                  连续练习: <strong className="text-gray-900">5</strong> 天
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                李
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Result Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <i className="fas fa-check text-green-600 text-3xl" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">翻译评估完成！</h1>
            <p className="text-gray-600">AI 评估已完成，以下是你的详细反馈</p>
          </div>

          {/* Score Card */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <i className="fas fa-robot text-2xl" />
                  <div>
                    <div className="font-semibold">AI 智能评估报告</div>
                    <div className="text-sm text-green-100">基于大语言模型的实时反馈</div>
                  </div>
                </div>
                <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  <i className="fas fa-clock mr-1" /> 评估耗时 1.2s
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Score Circle */}
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#22c55e"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-gray-900">{result.total_score}</span>
                      <span className="text-sm text-gray-500">总分</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      <i className="fas fa-thumbs-up mr-1" /> 不错！
                    </span>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-4">多维度评分</h3>

                  {result.dimensions.map((dim, idx) => {
                    const { icon, color } = getDimensionIcon(dim.name);
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <i className={`fas ${icon} ${color}`} />
                            {dim.name}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">{dim.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${color}`}
                            style={{ width: `${dim.score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Translation Comparison */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Your Translation */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-pencil text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">你的翻译</h3>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-lg text-gray-900 leading-relaxed">&quot;{userInput}&quot;</p>
              </div>
            </div>

            {/* Better Version */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <i className="fas fa-star text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">AI 推荐版本</h3>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <p className="text-lg text-gray-900 leading-relaxed">
                  {question?.topic ? `// ${question.topic}\n` : ''}
                  {userInput}
                </p>
                <p className="text-sm text-green-700 mt-2 flex items-center gap-1">
                  <i className="fas fa-lightbulb" />
                  AI 建议的更地道表达
                </p>
              </div>
            </div>
          </div>

          {/* AI Feedback */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <i className="fas fa-comments text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">AI 诊断反馈</h3>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-100">
              <p className="text-gray-700 leading-relaxed">{result.feedback}</p>
            </div>
          </div>

          {/* Better Expressions */}
          {result.better_expressions.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <i className="fas fa-gem text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900">地道表达推荐</h3>
              </div>
              <div className="space-y-4">
                {result.better_expressions.map((expr, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="fas fa-times text-red-500 text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 mb-1">你的表达</div>
                        <div className="font-medium text-gray-900 mb-2">{expr.user_expression}</div>
                        <div className="text-sm text-gray-500 mb-1">推荐版本</div>
                        <div className="font-medium text-green-700">{expr.better_version}</div>
                        <p className="text-sm text-gray-600 mt-2">
                          <i className="fas fa-info-circle mr-1 text-blue-500" />
                          {expr.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/practice/it-programming"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-arrow-left" />
              继续练习
            </Link>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <i className="fas fa-share-alt" />
                分享结果
              </button>
              <Link
                href="/practice/it-programming"
                className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-arrow-right" />
                下一题
              </Link>
            </div>
          </div>

          {/* Related Expressions */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-rocket text-blue-500" />
              举一反三 - 相关表达
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="text-xs text-blue-600 mb-1">Hotfix</div>
                <div className="font-medium text-gray-900">push a hotfix</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="text-xs text-blue-600 mb-1">回滚</div>
                <div className="font-medium text-gray-900">roll back / revert</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="text-xs text-blue-600 mb-1">灰度发布</div>
                <div className="font-medium text-gray-900">canary release</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg ${gradientBg} flex items-center justify-center`}>
                <i className="fas fa-language text-white text-xs" />
              </div>
              <span>英语练功房</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">
                服务条款
              </a>
              <a href="#" className="hover:text-white transition-colors">
                隐私政策
              </a>
            </div>
            <p>© 2024 English Training Room</p>
          </div>
        </div>
      </footer>
    </div>
  );
}