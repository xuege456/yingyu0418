import Link from "next/link";

const SCENES = [
  { code: "daily", name: "日常口语", icon: "🏠", difficulty: "BEGINNER" },
  { code: "travel", name: "出国旅游", icon: "✈️", difficulty: "BEGINNER" },
  { code: "business", name: "商务场景", icon: "💼", difficulty: "INTERMEDIATE" },
  { code: "cet", name: "四六级", icon: "📚", difficulty: "INTERMEDIATE" },
  { code: "ielts", name: "雅思托福", icon: "🎓", difficulty: "ADVANCED" },
  { code: "it-programming", name: "IT与编程英语", icon: "💻", difficulty: "INTERMEDIATE" },
];

export default function PracticeIndexPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <span className="font-bold">英语练功房</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">选择练习场景</h1>
          <p className="text-muted-foreground mt-2">覆盖生活、学习、职场、编程的全方位场景</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {SCENES.map((scene) => (
            <Link
              key={scene.code}
              href={`/practice/${scene.code}`}
              className="bg-card rounded-xl border p-6 hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-3">{scene.icon}</div>
              <h3 className="font-semibold group-hover:text-primary">{scene.name}</h3>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mt-2
                ${scene.difficulty === 'BEGINNER' ? 'bg-green-100 text-green-800' : ''}
                ${scene.difficulty === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${scene.difficulty === 'ADVANCED' ? 'bg-red-100 text-red-800' : ''}
              `}>
                {scene.difficulty === 'BEGINNER' ? 'L1 基础' :
                 scene.difficulty === 'INTERMEDIATE' ? 'L2 进阶' : 'L3 困难'}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
