'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/AuthContext';

const gradientBg = 'bg-gradient-to-r from-blue-600 to-purple-600';

interface Stats {
  totalPracticeDays: number;
  totalQuestions: number;
  averageScore: number;
  masteredSentences: number;
  radarData: {
    accuracy: number;
    fluency: number;
    vocabulary: number;
    idiomaticity: number;
  };
}

interface PracticeRecord {
  id: string;
  questionId: string;
  questionPrompt: string;
  sceneCode: string;
  sceneName: string;
  sceneIcon?: string;
  userInput: string;
  totalScore: number;
  createdAt: string;
}

const achievements = [
  { id: 1, name: '连续7天', icon: 'fa-fire', gradient: 'from-yellow-400 to-orange-500', unlocked: false },
  { id: 2, name: 'IT达人', icon: 'fa-code', gradient: 'from-blue-400 to-blue-600', unlocked: false },
  { id: 3, name: '初露锋芒', icon: 'fa-check-double', gradient: 'from-green-400 to-green-600', unlocked: false },
  { id: 4, name: '100题', icon: 'fa-trophy', gradient: 'from-purple-400 to-purple-600', unlocked: false },
  { id: 5, name: '满分', icon: 'fa-gem', gradient: 'from-rose-400 to-rose-600', unlocked: false },
  { id: 6, name: '旅行英语', icon: 'fa-globe', gradient: 'from-cyan-400 to-cyan-600', unlocked: false },
];

export default function ProgressPage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [records, setRecords] = useState<PracticeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('最近7天');

  useEffect(() => {
    if (!authLoading && user && token) {
      fetchData();
    } else if (!authLoading && !user) {
      setIsLoading(false);
    }
  }, [authLoading, user, token]);

  const fetchData = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const [statsRes, historyRes] = await Promise.all([
        fetch('/api/practice/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/practice/history?pageSize=5', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const statsData = await statsRes.json();
      const historyData = await historyRes.json();

      if (statsData.success) setStats(statsData.data);
      if (historyData.success) setRecords(historyData.data.items);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSceneIcon = (sceneCode: string) => {
    const icons: Record<string, string> = {
      'it-programming': 'fa-code',
      'daily': 'fa-home',
      'travel': 'fa-plane',
      'business': 'fa-briefcase',
      'cet': 'fa-book',
      'ielts': 'fa-graduation-cap',
    };
    return icons[sceneCode] || 'fa-book';
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-spinner fa-spin text-primary-600 text-2xl" />
            </div>
            <p className="text-gray-600">加载中...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-chart-line text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-600 mb-4">请先登录查看学习进度</p>
            <Link
              href="/login"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              登录
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const abilityData = stats
    ? [
        { name: '准确度', value: stats.radarData.accuracy },
        { name: '流畅度', value: stats.radarData.fluency },
        { name: '词汇量', value: stats.radarData.vocabulary },
        { name: '专业度', value: stats.radarData.accuracy },
        { name: '语法', value: stats.radarData.idiomaticity },
      ]
    : [
        { name: '准确度', value: 0 },
        { name: '流畅度', value: 0 },
        { name: '词汇量', value: 0 },
        { name: '专业度', value: 0 },
        { name: '语法', value: 0 },
      ];

  const unlockedCount = stats && stats.totalQuestions >= 10 ? 3 : stats && stats.totalQuestions >= 1 ? 1 : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">我的学习进度</h1>
              <p className="mt-1 text-gray-600">追踪你的成长轨迹</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium focus:outline-none focus:border-primary-300"
              >
                <option>最近7天</option>
                <option>最近30天</option>
                <option>全部时间</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-tasks text-blue-600 text-xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.totalQuestions || 0}</div>
              <div className="text-sm text-gray-500">总练习次数</div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <i className="fas fa-check-circle text-green-600 text-xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.masteredSentences || 0}</div>
              <div className="text-sm text-gray-500">掌握句子数</div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <i className="fas fa-star text-purple-600 text-xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.averageScore || 0}</div>
              <div className="text-sm text-gray-500">平均得分</div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <i className="fas fa-fire text-amber-600 text-xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.totalPracticeDays || 0}</div>
              <div className="text-sm text-gray-500">连续打卡天数</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Ability Radar */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">能力雷达图</h2>
                  <p className="text-sm text-gray-500">各维度能力评估</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full bg-primary-500" />
                  <span className="text-gray-600">当前</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Radar Chart */}
                <div className="relative w-64 h-64 flex-shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="#e5e7eb" strokeWidth="1" />

                    <line x1="100" y1="20" x2="100" y2="180" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="43" y1="43" x2="157" y2="157" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="157" y1="43" x2="43" y2="157" stroke="#e5e7eb" strokeWidth="1" />

                    {stats && stats.totalQuestions > 0 && (
                      <polygon
                        points={`100,${100 - (stats.radarData.accuracy / 100) * 80} ${100 + (stats.radarData.fluency / 100) * 80 * 0.87},${100 - (stats.radarData.fluency / 100) * 80 * 0.5} ${100 + (stats.radarData.vocabulary / 100) * 80 * 0.87},${100 + (stats.radarData.vocabulary / 100) * 80 * 0.5} ${100},${100 + (stats.radarData.idiomaticity / 100) * 80}`}
                        fill="rgba(59, 130, 246, 0.3)"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                    )}
                  </svg>

                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-xs font-medium text-gray-600">
                    准确度
                  </div>
                  <div className="absolute bottom-4 left-0 -translate-x-2 text-xs font-medium text-gray-600">
                    流畅度
                  </div>
                  <div className="absolute bottom-4 right-0 translate-x-2 text-xs font-medium text-gray-600">
                    词汇量
                  </div>
                  <div className="absolute top-1/2 right-0 translate-x-2 -translate-y-1/2 text-xs font-medium text-gray-600">
                    专业度
                  </div>
                  <div className="absolute bottom-1/2 left-0 -translate-x-2 translate-y-1/2 text-xs font-medium text-gray-600">
                    语法
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1 grid grid-cols-2 gap-4">
                  {abilityData.map((ability) => (
                    <div key={ability.name} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{ability.name}</span>
                        <span className="text-sm font-semibold text-gray-900">{ability.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${ability.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">成就徽章</h2>
                  <p className="text-sm text-gray-500">已解锁 {unlockedCount}/6</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {achievements.map((achievement, idx) => (
                  <div
                    key={achievement.id}
                    className={`text-center ${idx >= unlockedCount ? 'opacity-40' : ''}`}
                  >
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${achievement.gradient} flex items-center justify-center mb-2 shadow-lg`}
                    >
                      <i className={`fas ${achievement.icon} text-white text-xl`} />
                    </div>
                    <span className={`text-xs ${idx >= unlockedCount ? 'text-gray-400' : 'text-gray-600'}`}>
                      {achievement.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">最近练习</h2>
                <p className="text-sm text-gray-500">你的学习轨迹</p>
              </div>
            </div>

            {records.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-inbox text-gray-400 text-2xl" />
                </div>
                <p className="text-gray-500 mb-4">暂无练习记录</p>
                <Link
                  href="/practice"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  开始练习
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-medium">时间</th>
                      <th className="pb-3 font-medium">场景</th>
                      <th className="pb-3 font-medium">题目</th>
                      <th className="pb-3 font-medium">得分</th>
                      <th className="pb-3 font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {records.map((record) => (
                      <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-4 text-gray-600">
                          {new Date(record.createdAt).toLocaleDateString('zh-CN')}
                        </td>
                        <td className="py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            <i className={`fas ${getSceneIcon(record.sceneCode)}`} />
                            {record.sceneName}
                          </span>
                        </td>
                        <td className="py-4 text-gray-900 max-w-xs truncate">{record.questionPrompt}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                            <i className="fas fa-star" />
                            {record.totalScore}分
                          </span>
                        </td>
                        <td className="py-4">
                          <Link
                            href={`/practice/${record.sceneCode}`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            继续练习
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}