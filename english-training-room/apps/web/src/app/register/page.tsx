'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

const gradientBg = 'bg-gradient-to-r from-blue-600 to-purple-600';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      setError('请填写邮箱和密码');
      return;
    }
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    if (password.length < 6) {
      setError('密码至少6位字符');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await register(email, password, nickname || undefined);
    if (result.success) {
      router.push('/practice');
    } else {
      setError(result.error || '注册失败');
    }
    setIsLoading(false);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = () => {
    if (!password) return { bars: 0, color: '', text: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { bars: 1, color: 'bg-red-500', text: '密码强度: 弱' },
      { bars: 2, color: 'bg-yellow-400', text: '密码强度: 中等' },
      { bars: 3, color: 'bg-green-500', text: '密码强度: 强' },
      { bars: 4, color: 'bg-green-500', text: '密码强度: 很强' },
    ];
    return levels[strength - 1] || levels[0];
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <Link href="/" className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <i className="fas fa-language text-2xl" />
            </div>
            <span className="font-bold text-2xl">AI编程练功房</span>
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            开始你的<br />
            英语提升之旅
          </h1>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            加入 thousands of learners<br />
            一起高效提升英语能力
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                <i className="fas fa-bolt text-xl" />
              </div>
              <div>
                <div className="font-semibold">免费开始</div>
                <div className="text-sm text-blue-200">每日免费练习额度</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                <i className="fas fa-shield-alt text-xl" />
              </div>
              <div>
                <div className="font-semibold">数据安全</div>
                <div className="text-sm text-blue-200">你的学习数据安全加密</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                <i className="fas fa-headset text-xl" />
              </div>
              <div>
                <div className="font-semibold">7x24 支持</div>
                <div className="text-sm text-blue-200">随时解答你的问题</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-16 text-sm text-blue-200">
          © 2024 AI编程练功房. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className={`w-10 h-10 rounded-xl ${gradientBg} flex items-center justify-center`}>
              <i className="fas fa-language text-white text-lg" />
            </div>
            <span className="font-bold text-xl">AI编程练功房</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">创建账户</h2>
            <p className="text-gray-600">完成注册，即刻开始免费练习</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              <i className="fas fa-exclamation-circle mr-2" />
              {error}
            </div>
          )}

          {/* Register Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">昵称（选填）</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400" />
                </div>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="你希望我们怎么称呼你"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="至少 6 位字符"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i <= passwordStrength.bars ? passwordStrength.color : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{passwordStrength.text}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次输入密码"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-0.5"
              />
              <span className="text-sm text-gray-600">
                我已阅读并同意 <a href="#" className="text-primary-600 hover:underline">服务条款</a> 和 <a href="#" className="text-primary-600 hover:underline">隐私政策</a>
              </span>
            </div>

            <button
              onClick={handleRegister}
              disabled={!agreeTerms || !email || !password || isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2" />
                  注册中...
                </>
              ) : (
                '注册'
              )}
            </button>
          </div>

          <p className="mt-8 text-center text-gray-600">
            已有账户？
            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}