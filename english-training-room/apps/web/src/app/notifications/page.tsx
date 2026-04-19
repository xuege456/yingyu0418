'use client';

import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';

const gradientBg = 'bg-gradient-to-r from-blue-600 to-purple-600';

export default function NotificationsPage() {
  const { user, isLoading } = useAuth();

  const notifications = [
    {
      id: 1,
      type: 'achievement',
      title: '获得新成就',
      content: '恭喜你完成了「IT与编程英语」场景的全部练习！',
      time: '2小时前',
      unread: true,
    },
    {
      id: 2,
      type: 'practice',
      title: '练习提醒',
      content: '你已经连续练习5天了，继续保持！',
      time: '1天前',
      unread: true,
    },
    {
      id: 3,
      type: 'system',
      title: '系统通知',
      content: '欢迎来到AI编程练功房，开始你的学习之旅吧！',
      time: '3天前',
      unread: false,
    },
  ];

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

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-bell text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-600 mb-4">请先登录查看通知</p>
            <Link
              href="/login"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              登录
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <i className="fas fa-arrow-left" />
              <span className="hidden sm:inline">返回首页</span>
            </Link>
            <h1 className="font-semibold text-gray-900">我的通知</h1>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              全部已读
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Notification List */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {notifications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-bell-slash text-gray-400 text-2xl" />
                </div>
                <p className="text-gray-500">暂无通知</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      notification.unread ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.type === 'achievement'
                            ? 'bg-amber-100 text-amber-600'
                            : notification.type === 'practice'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        <i
                          className={`fas ${
                            notification.type === 'achievement'
                              ? 'fa-trophy'
                              : notification.type === 'practice'
                                ? 'fa-fire'
                                : 'fa-cog'
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900">{notification.title}</h3>
                          <span className="text-xs text-gray-400">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{notification.content}</p>
                      </div>

                      {/* Unread indicator */}
                      {notification.unread && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <i className="fas fa-lightbulb text-amber-500" />
              温馨提示
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5" />
                完成更多练习可以解锁更多成就
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5" />
                连续练习可获得额外金币奖励
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-500 mt-0.5" />
                邀请好友可获得VIP试用资格
              </li>
            </ul>
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
              <span>AI编程练功房</span>
            </div>
            <p>© 2024 English Training Room</p>
          </div>
        </div>
      </footer>
    </div>
  );
}