import Link from "next/link";

const SCENES = [
  {
    code: "daily",
    name: "日常口语",
    description: "日常生活中的实用表达",
    icon: "🏠",
    category: "DAILY_LIFE",
    difficulty: "BEGINNER",
  },
  {
    code: "travel",
    name: "出国旅游",
    description: "旅行中的常用英语对话",
    icon: "✈️",
    category: "TRAVEL",
    difficulty: "BEGINNER",
  },
  {
    code: "business",
    name: "商务场景",
    description: "职场商务英语表达",
    icon: "💼",
    category: "BUSINESS",
    difficulty: "INTERMEDIATE",
  },
  {
    code: "cet",
    name: "四六级",
    description: "大学英语四六级备考",
    icon: "📚",
    category: "CET",
    difficulty: "INTERMEDIATE",
  },
  {
    code: "ielts",
    name: "雅思托福",
    description: "雅思/托福考试训练",
    icon: "🎓",
    category: "IELTS",
    difficulty: "ADVANCED",
  },
  {
    code: "it-programming",
    name: "IT与编程英语",
    description: "程序员专属技术英语",
    icon: "💻",
    category: "IT_PROGRAMMING",
    difficulty: "INTERMEDIATE",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <span className="font-bold text-lg">英语练功房</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              首页
            </Link>
            <Link href="/practice" className="text-sm font-medium hover:text-primary">
              题库
            </Link>
            <Link href="/user/progress" className="text-sm font-medium hover:text-primary">
              我的进度
            </Link>
            <Link href="/vip" className="text-sm font-medium text-amber-600 hover:text-amber-700">
              VIP订阅
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              注册
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                AI 驱动的<span className="text-primary">英语训练</span>平台
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                通过场景化题库、AI 实时反馈与&quot;打怪升级&quot;的互动体验，
                高效提升你的英语实际应用能力
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/practice"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                >
                  开始练习 →
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground w-full sm:w-auto"
                >
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Scene Selection */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">选择你的训练场景</h2>
              <p className="mt-4 text-muted-foreground">
                覆盖生活、学习、职场、编程的全方位场景
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {SCENES.map((scene) => (
                <Link
                  key={scene.code}
                  href={`/practice/${scene.code}`}
                  className="group relative overflow-hidden rounded-xl border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-4">{scene.icon}</div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {scene.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {scene.description}
                  </p>
                  <div className="mt-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${scene.difficulty === 'BEGINNER' ? 'bg-green-100 text-green-800' : ''}
                      ${scene.difficulty === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${scene.difficulty === 'ADVANCED' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {scene.difficulty === 'BEGINNER' ? 'L1 基础' :
                       scene.difficulty === 'INTERMEDIATE' ? 'L2 进阶' : 'L3 困难'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">核心功能</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold mb-2">AI 智能评估</h3>
                <p className="text-sm text-muted-foreground">
                  基于大语言模型的实时评估，从准确度、流畅度、专业度多维度给出反馈
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">进度可视化</h3>
                <p className="text-sm text-muted-foreground">
                  清晰的学习进度追踪，能力雷达图让你的进步一目了然
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">🏆</div>
                <h3 className="text-lg font-semibold mb-2">打怪升级</h3>
                <p className="text-sm text-muted-foreground">
                  游戏化的练习体验，完成任务解锁成就，让学习不再枯燥
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📝</span>
              <span className="font-semibold">英语练功房</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-primary">服务条款</Link>
              <Link href="/privacy" className="hover:text-primary">隐私政策</Link>
              <Link href="/contact" className="hover:text-primary">联系方式</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 English Training Room. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
