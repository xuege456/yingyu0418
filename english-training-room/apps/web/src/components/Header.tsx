'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useState } from 'react';

const gradientBg = 'bg-gradient-to-r from-blue-600 to-purple-600';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };

  const getAvatarText = () => {
    if (!user) return '?';
    if (user.nickname) return user.nickname[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return '?';
  };

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
                isActive('/') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              首页
            </Link>
            <Link
              href="/practice"
              className={`text-sm font-medium transition-colors ${
                isActive('/practice') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              题库
            </Link>
            <Link
              href="/progress"
              className={`text-sm font-medium transition-colors ${
                isActive('/progress') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
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
            <Link href="/notifications" className="relative">
              <i className="fas fa-bell text-gray-500 hover:text-gray-700 cursor-pointer" />
              {user && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              )}
            </Link>

            {/* User Avatar / Login */}
            {!isLoading && (
              <div className="relative">
                {user ? (
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      {getAvatarText()}
                    </div>
                  </button>
                ) : (
                  <Link href="/login" className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      <i className="fas fa-user text-sm" />
                    </div>
                  </Link>
                )}

                {/* User dropdown menu */}
                {showUserMenu && user && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{user.nickname || '用户'}</div>
                      <div className="text-sm text-gray-500">{user.email || user.phone}</div>
                    </div>
                    <Link
                      href="/notifications"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="fas fa-bell mr-2" />
                      我的通知
                    </Link>
                    <Link
                      href="/progress"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="fas fa-chart-line mr-2" />
                      学习进度
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      <i className="fas fa-sign-out-alt mr-2" />
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}