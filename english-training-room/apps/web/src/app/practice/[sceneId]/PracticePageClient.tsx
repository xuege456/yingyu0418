'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

const gradientBg = 'bg-gradient-to-r from-blue-600 to-purple-600';

interface Question {
  id: string;
  type: string;
  prompt: string;
  hint?: string;
  difficulty: string;
  topic?: string;
}

interface Scene {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  iconBg: string;
  category: string;
  difficulty: string;
}

interface EvaluationResult {
  total_score: number;
  dimensions: {
    name: string;
    score: number;
    detail: string;
  }[];
  feedback: string;
  better_expressions: {
    user_expression: string;
    better_version: string;
    reason: string;
  }[];
}

interface PracticePageClientProps {
  sceneCode: string;
  initialQuestions?: Question[];
}

export default function PracticePageClient({
  sceneCode,
  initialQuestions = [],
}: PracticePageClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [scene, setScene] = useState<Scene | null>(null);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialQuestions.length);

  // Fetch questions from API
  useEffect(() => {
    if (initialQuestions.length > 0) {
      setQuestions(initialQuestions);
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      try {
        const [sceneRes, questionsRes] = await Promise.all([
          fetch(`/api/scenes/${sceneCode}`),
          fetch(`/api/scenes/${sceneCode}/questions?limit=20`),
        ]);

        const sceneData = await sceneRes.json();
        const questionsData = await questionsRes.json();

        if (sceneData.success) {
          setScene(sceneData.data);
        }

        if (questionsData.success) {
          setQuestions(questionsData.data.questions);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('加载数据失败，请刷新重试');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [sceneCode, initialQuestions.length]);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setUserInput(value);
      setCharCount(value.length);
    }
  };

  const handleSubmit = async () => {
    if (!userInput.trim() || !currentQuestion) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionType: currentQuestion.type || 'TRANSLATION_CN_TO_EN',
          userInput: userInput,
          sceneCode: sceneCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store result in sessionStorage for result page
        sessionStorage.setItem('evaluationResult', JSON.stringify(data.data));
        sessionStorage.setItem('question', JSON.stringify(currentQuestion));
        sessionStorage.setItem('userInput', userInput);
        router.push(`/practice/${sceneCode}/result`);
      } else {
        setError(data.error?.message || '评估失败，请重试');
      }
    } catch (err) {
      console.error('Evaluation failed:', err);
      setError('评估失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput('');
      setCharCount(0);
      setShowHint(false);
    }
  };

  const handleQuestionSelect = (idx: number) => {
    setCurrentIndex(idx);
    setUserInput('');
    setCharCount(0);
    setShowHint(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-spinner fa-spin text-primary-600 text-2xl" />
            </div>
            <p className="text-gray-600">加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-exclamation-triangle text-red-600 text-2xl" />
            </div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              刷新重试
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">暂无题目</p>
            <Link href="/practice" className="text-primary-600 hover:underline mt-4 inline-block">
              返回题库
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const sceneIcon = scene?.icon || 'fa-code';
  const sceneName = scene?.name || 'IT与编程英语';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/practice"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <i className="fas fa-arrow-left" />
                <span className="hidden sm:inline">返回题库</span>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${gradientBg} flex items-center justify-center`}>
                  <i className={`fas ${sceneIcon} text-white text-sm`} />
                </div>
                <span className="font-semibold text-gray-900">{sceneName}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <i className="fas fa-fire text-orange-500" />
                <span>
                  连续练习: <strong className="text-gray-900">5</strong> 天
                </span>
              </div>
              <div className="relative">
                <i className="fas fa-bell text-gray-500 hover:text-gray-700 cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </div>
              {user ? (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                  {user.nickname?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
                </div>
              ) : (
                <Link href="/login">
                  <div className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">
                    登录
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">练习进度</span>
              <span className="text-sm text-gray-500">
                第 <span className="font-semibold text-primary-600">{currentIndex + 1}</span> / {questions.length} 题
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>
                <i className="fas fa-check-circle text-green-500 mr-1" />
                已完成: {currentIndex}
              </span>
              <span>
                <i className="fas fa-clock text-yellow-500 mr-1" />
                进行中: 1
              </span>
              <span>
                <i className="fas fa-circle text-gray-300 mr-1" />
                未开始: {questions.length - currentIndex - 1}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Question Header */}
            <div className={`${gradientBg} px-6 py-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <i className={`fas ${sceneIcon} text-white text-lg`} />
                  </span>
                  <div className="text-white">
                    <div className="font-semibold">中译英练习</div>
                    <div className="text-sm text-blue-100">将中文翻译成地道的英文表达</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm">
                    <i className="fas fa-signal mr-1" />
                    {currentQuestion.difficulty === 'BEGINNER' ? 'L1 基础' : currentQuestion.difficulty === 'INTERMEDIATE' ? 'L2 进阶' : 'L3 困难'}
                  </span>
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-6 lg:p-8">
              {/* Topic Badge */}
              {currentQuestion.topic && (
                <div className="mb-6">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                    <i className="fas fa-folder mr-1.5" />
                    场景: {currentQuestion.topic}
                  </span>
                </div>
              )}

              {/* Question */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <i className="fas fa-pencil-alt mr-2 text-primary-500" />
                  请将以下中文翻译成英文
                </label>
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100">
                  <p className="text-xl lg:text-2xl font-medium text-gray-900 leading-relaxed">
                    &quot;{currentQuestion.prompt}&quot;
                  </p>
                </div>
              </div>

              {/* Hint */}
              {currentQuestion.hint && (
                <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-lightbulb text-amber-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-amber-800 text-sm mb-1">提示</div>
                      <p className="text-amber-700 text-sm">{currentQuestion.hint}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <i className="fas fa-edit mr-2 text-primary-500" />
                  你的翻译
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="在这里输入你的英文翻译..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all resize-none text-base"
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 text-sm text-gray-400">
                    <span>{charCount}</span> / <span>200</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <i className="fas fa-keyboard" />
                  <span>支持 Ctrl + Enter 提交</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
                  >
                    <i className="fas fa-lightbulb text-amber-500" />
                    给我一点思路
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!userInput.trim() || isSubmitting}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin" />
                        评估中...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane" />
                        提交翻译
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="mt-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-200 p-6">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <i className="fas fa-graduation-cap" />
              常用表达积累
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <div className="text-gray-500 text-sm mb-1">部署代码</div>
                <div className="font-medium text-gray-900">deploy the code / ship to prod</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <div className="text-gray-500 text-sm mb-1">调用接口</div>
                <div className="font-medium text-gray-900">hit the endpoint / fetch the API</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <div className="text-gray-500 text-sm mb-1">代码审查</div>
                <div className="font-medium text-gray-900">code review / CR feedback</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <div className="text-gray-500 text-sm mb-1">提测</div>
                <div className="font-medium text-gray-900">hand off for testing</div>
              </div>
            </div>
          </div>

          {/* Related Questions */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">本场景其他题目</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {questions.slice(0, 8).map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionSelect(idx)}
                  className={`p-4 rounded-xl border-2 text-left transition-colors ${
                    idx === currentIndex
                      ? 'border-primary-600 bg-white'
                      : idx < currentIndex
                        ? 'border-green-300 bg-green-50 hover:border-green-400'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`text-xs font-medium mb-1 ${idx === currentIndex ? 'text-primary-600' : 'text-gray-500'}`}>
                    题目 {idx + 1}
                  </div>
                  <div className="text-sm font-medium text-gray-900 line-clamp-2">{q.prompt}</div>
                  <div className="mt-2 flex items-center gap-2">
                    {idx < currentIndex ? (
                      <>
                        <i className="fas fa-check-circle text-green-500 text-xs" />
                        <span className="text-xs text-gray-500">已完成</span>
                      </>
                    ) : idx === currentIndex ? (
                      <>
                        <i className="fas fa-spinner text-primary-500 text-xs fa-spin" />
                        <span className="text-xs text-primary-600">进行中</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-circle text-gray-300 text-xs" />
                        <span className="text-xs text-gray-500">未开始</span>
                      </>
                    )}
                  </div>
                </button>
              ))}
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