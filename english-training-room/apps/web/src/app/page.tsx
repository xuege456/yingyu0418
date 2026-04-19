import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SceneCard from '@/components/SceneCard';
import { scenes } from '@/lib/mock-data';

const gradientBg = 'bg-gradient-to-r from-blue-600 to-purple-600';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 py-20 lg:py-32">
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                AI 驱动的<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">英语训练</span>平台
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
                通过场景化题库、AI 实时反馈与&quot;打怪升级&quot;的互动体验，
                <br className="hidden sm:block" />
                高效提升你的英语实际应用能力
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/practice"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-primary-600 px-8 py-4 text-base font-semibold text-white hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <i className="fas fa-play mr-2" />
                  开始练习
                </Link>
                <Link
                  href="#scenes"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 hover:border-primary-300 hover:text-primary-600 transition-all"
                >
                  <i className="fas fa-info-circle mr-2" />
                  了解更多
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                <div>
                  <div className="text-3xl font-bold text-primary-600">10K+</div>
                  <div className="text-sm text-gray-500 mt-1">练习次数</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">98%</div>
                  <div className="text-sm text-gray-500 mt-1">用户满意度</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">6+</div>
                  <div className="text-sm text-gray-500 mt-1">训练场景</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scene Selection Section */}
        <section id="scenes" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                选择你的训练场景
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                覆盖生活、学习、职场、编程的全方位场景
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenes.map((scene) => (
                <SceneCard key={scene.id} scene={scene} showHotTag={scene.code === 'it-programming'} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">核心功能</h2>
              <p className="mt-4 text-lg text-gray-600">为什么选择英语练功房？</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI Evaluation */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 rounded-2xl ${gradientBg} flex items-center justify-center mb-6 shadow-lg`}>
                  <i className="fas fa-robot text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI 智能评估</h3>
                <p className="text-gray-600 leading-relaxed">
                  基于大语言模型的实时评估，从准确度、流畅度、专业度多维度给出反馈，助你精准提升
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    多维度评分拆解
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    地道表达推荐
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    语法问题诊断
                  </li>
                </ul>
              </div>

              {/* Progress Tracking */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center mb-6 shadow-lg">
                  <i className="fas fa-chart-line text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">进度可视化</h3>
                <p className="text-gray-600 leading-relaxed">
                  清晰的学习进度追踪，能力雷达图让你的进步一目了然，告别盲目学习
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    能力雷达图分析
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    每日练习统计
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    历史记录回顾
                  </li>
                </ul>
              </div>

              {/* Gamification */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6 shadow-lg">
                  <i className="fas fa-trophy text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">打怪升级</h3>
                <p className="text-gray-600 leading-relaxed">
                  游戏化的练习体验，完成任务解锁成就徽章，让学习不再枯燥
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    成就徽章系统
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    等级段位挑战
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    连续打卡奖励
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* IT Programming Special Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center rounded-full bg-blue-500/30 px-4 py-2 text-sm font-medium text-blue-200 mb-6">
                  <i className="fas fa-code mr-2" />
                  程序员专属
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  IT与编程英语
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    告别chinglish
                  </span>
                </h2>
                <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                  &quot;部署代码&quot;不是 Deploying Code，而是{' '}
                  <span className="text-green-400 font-semibold">Deploy the code</span>
                  <br />
                  &quot;调用接口&quot;不是 Calling Interface，而是{' '}
                  <span className="text-green-400 font-semibold">Hit the endpoint</span>
                  <br />
                  硅谷工程师怎么说，你就怎么说
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <i className="fas fa-check text-green-400" />
                    </div>
                    <span className="text-gray-200">Code Review / CR feedback</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <i className="fas fa-check text-green-400" />
                    </div>
                    <span className="text-gray-200">Ship to production / Push to prod</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <i className="fas fa-check text-green-400" />
                    </div>
                    <span className="text-gray-200">Fetch the API / Call the endpoint</span>
                  </div>
                </div>

                <Link
                  href="/practice/it-programming"
                  className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary-600 hover:bg-gray-100 transition-all shadow-xl"
                >
                  <i className="fas fa-code mr-2" />
                  立即体验IT英语
                </Link>
              </div>

              {/* Right - Code Demo */}
              <div className="relative">
                <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="font-mono text-sm space-y-3">
                    <div>
                      <span className="text-gray-500">// 题目</span>
                    </div>
                    <div className="text-gray-300">部署代码到生产环境</div>
                    <div className="mt-4">
                      <span className="text-gray-500">// 你的翻译</span>
                    </div>
                    <div className="text-green-400">&gt; deploy the code to production</div>
                    <div className="mt-4">
                      <span className="text-gray-500">// AI评估</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">★★★★☆</span>
                      <span className="text-green-400">85分</span>
                    </div>
                    <div className="text-gray-400 text-xs mt-2">
                      💡 建议: &quot;ship to production&quot; 更地道
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              准备好提升你的英语了吗？
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              免费注册，即刻开始你的英语提升之旅
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-primary-600 px-8 py-4 text-base font-semibold text-white hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
              >
                <i className="fas fa-rocket mr-2" />
                免费开始
              </Link>
              <Link
                href="/vip"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border-2 border-amber-300 bg-amber-50 px-8 py-4 text-base font-semibold text-amber-700 hover:bg-amber-100 transition-all"
              >
                <i className="fas fa-crown mr-2" />
                升级VIP
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}