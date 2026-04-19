'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useState, useEffect } from 'react';

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
    // Force refresh to ensure state is synced
    window.location.href = '/';
  };

  const getAvatarText = () => {
    if (!user) return '?';
    if (user.nickname) return user.nickname[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return '?';
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowUserMenu(false);
    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);

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
              <i className="fas fa-bell text-gray-500 hover:text-gray-700 cursor-pointer text-lg" />
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
                  // Logged in - show avatar with dropdown
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(!showUserMenu);
                    }}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                      {getAvatarText()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                      {user.nickname || user.email?.split('@')[0] || '用户'}
                    </span>
                    <i className="fas fa-chevron-down text-xs text-gray-400" />
                  </button>
                ) : (
                  // Not logged in - show login button
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:shadow-md transition-all"
                  >
                    <i className="fas fa-user text-xs" />
                    <span>登录/注册</span>
                  </Link>
                )}

                {/* User dropdown menu */}
                {showUserMenu && user && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{user.nickname || '用户'}</div>
                      <div className="text-sm text-gray-500 truncate">{user.email || user.phone || '未设置邮箱'}</div>
                    </div>
                    <Link
                      href="/notifications"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="fas fa-bell w-5 text-gray-400" />
                      我的通知
                    </Link>
                    <Link
                      href="/progress"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="fas fa-chart-line w-5 text-gray-400" />
                      学习进度
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <i className="fas fa-sign-out-alt w-5" />
                        退出登录
                      </button>
                    </div>
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