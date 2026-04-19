'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const gradientBg = 'bg-gradient-to-r from-blue-600 to-purple-600';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-lg ${gradientBg} flex items-center justify-center`}>
              <i className="fas fa-language text-white text-lg" />
            </div>
            <span className="font-bold text-xl text-gray-900">英语练功房</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              首页
            </Link>
            <Link
              href="/practice"
              className={`text-sm font-medium transition-colors ${
                isActive('/practice')
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              题库
            </Link>
            <Link
              href="/progress"
              className={`text-sm font-medium transition-colors ${
                isActive('/progress')
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              我的进度
            </Link>
            <Link
              href="/vip"
              className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
            >
              <i className="fas fa-crown" />
              VIP订阅
            </Link>
          </nav>

          {/* Auth & User */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <i className="fas fa-bell text-gray-500 hover:text-gray-700 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </div>

            {/* User Avatar */}
            <Link href="/login" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                李
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}