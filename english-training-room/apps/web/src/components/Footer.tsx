import Link from 'next/link';

const gradientBg = 'bg-gradient-to-r from-blue-600 to-purple-600';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-9 h-9 rounded-lg ${gradientBg} flex items-center justify-center`}>
                <i className="fas fa-language text-white text-lg" />
              </div>
              <span className="font-bold text-xl">英语练功房</span>
            </div>
            <p className="text-gray-400 max-w-md">
              AI驱动的英语翻译练习平台，通过场景化题库和智能反馈，帮助你高效提升英语实际应用能力。
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">产品</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/practice" className="hover:text-white transition-colors">
                  题库中心
                </Link>
              </li>
              <li>
                <Link href="/vip" className="hover:text-white transition-colors">
                  VIP订阅
                </Link>
              </li>
              <li>
                <Link href="/progress" className="hover:text-white transition-colors">
                  学习进度
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">支持</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  使用帮助
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  服务条款
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  隐私政策
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  联系我们
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 英语练功房. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all"
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all"
            >
              <i className="fab fa-discord" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}