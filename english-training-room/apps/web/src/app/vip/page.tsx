'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const gradientBg = 'bg-gradient-to-r from-blue-600 to-purple-600';

const plans = [
  {
    id: 'monthly',
    name: '月度会员',
    price: '¥39',
    period: '/月',
    description: '每月自动续费',
    features: [
      { text: '无限练习次数', included: true },
      { text: '解锁全部场景', included: true },
      { text: 'AI 详细分析报告', included: true },
      { text: '专属学习计划', included: false },
      { text: '一对一辅导', included: false },
    ],
    isPopular: false,
  },
  {
    id: 'yearly',
    name: '年度会员',
    price: '¥279',
    period: '/年',
    description: '相当于 ¥23/月',
    features: [
      { text: '无限练习次数', included: true },
      { text: '解锁全部场景', included: true },
      { text: 'AI 详细分析报告', included: true },
      { text: '专属学习计划', included: true },
      { text: '一对一辅导', included: false },
    ],
    isPopular: true,
    discount: '省 40%',
  },
  {
    id: 'lifetime',
    name: '终身会员',
    price: '¥799',
    period: '',
    description: '一次购买，终身使用',
    features: [
      { text: '无限练习次数', included: true },
      { text: '解锁全部场景', included: true },
      { text: 'AI 详细分析报告', included: true },
      { text: '专属学习计划', included: true },
      { text: '一对一辅导', included: true },
    ],
    isPopular: false,
    isDark: true,
    badge: '尊享',
  },
];

const vipFeatures = [
  {
    icon: 'fa-infinity',
    gradient: 'from-blue-500 to-purple-600',
    title: '无限练习',
    description: '告别次数限制，想练就练，充分利用碎片时间提升',
  },
  {
    icon: 'fa-brain',
    gradient: 'from-green-500 to-teal-600',
    title: 'AI 深度分析',
    description: '获得更详细的语法解析、用词建议和个性化学习反馈',
  },
  {
    icon: 'fa-map',
    gradient: 'from-amber-500 to-orange-600',
    title: '专属学习路径',
    description: '根据你的水平和目标，定制个性化学习计划',
  },
  {
    icon: 'fa-user-tie',
    gradient: 'from-rose-500 to-pink-600',
    title: '一对一辅导',
    description: '专业英语老师在线答疑，针对性解决你的学习困惑',
  },
  {
    icon: 'fa-download',
    gradient: 'from-cyan-500 to-blue-600',
    title: '离线下载',
    description: '下载练习题目和解析，无网络也能随时学习',
  },
  {
    icon: 'fa-headset',
    gradient: 'from-purple-500 to-violet-600',
    title: '优先客服',
    description: '7x24 小时专属客服支持，问题快速响应',
  },
];

const comparisonData = [
  { feature: '每日练习次数', free: '10 次', vip: '无限', vipIcon: true },
  { feature: '可用场景', free: '3 个', vip: '全部 6 个', vipIcon: true },
  { feature: 'AI 评估维度', free: '3 维度', vip: '5 维度', vipIcon: true },
  { feature: '地道表达推荐', free: '3 条/题', vip: '10 条/题', vipIcon: true },
  { feature: '学习进度分析', free: true, vip: '高级雷达图', vipIcon: true },
  { feature: '专属学习计划', free: false, vip: true, vipIcon: true },
  { feature: '一对一辅导', free: false, vip: true, vipIcon: true },
];

const faqs = [
  {
    question: 'VIP 会员可以退款吗？',
    answer: '订阅后 7 天内如有任何不满，可申请全额退款。超过 7 天后将无法退款，但可以取消自动续费。',
  },
  {
    question: '如何取消订阅？',
    answer: '你可以随时在账户设置中取消订阅。取消后，你仍可以继续使用 VIP 功能直到当前订阅周期结束。',
  },
  {
    question: '年度会员可以切换到月度吗？',
    answer: '可以的。你可以在账户设置中将订阅切换为月度会员，我们会按比例退还年度会员的剩余价值。',
  },
  {
    question: '终身会员有什么特别的？',
    answer: '终身会员一次购买，终身有效，无需续费。并且包含一对一辅导功能，是最高性价比的选择。',
  },
];

export default function VIPPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 py-16 lg:py-24">
          <div className="absolute top-10 right-10 w-64 h-64 bg-amber-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 mb-6 shadow-xl">
              <i className="fas fa-crown text-white text-3xl" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              解锁 <span className="bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">VIP 会员</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              升级 VIP，解锁无限练习次数、专属场景、高级功能
              <br />
              让你的英语学习效率提升 10 倍
            </p>

            {/* Current Plan Badge */}
            <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-gray-100 text-sm">
              <span className="text-gray-500">当前方案:</span>
              <span className="font-semibold text-gray-700">免费版</span>
              <a href="#" className="text-primary-600 hover:underline font-medium">
                升级
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 -mt-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl border-2 p-6 relative transition-all ${
                    plan.isPopular
                      ? 'border-primary-500 shadow-xl shadow-primary-100'
                      : plan.isDark
                        ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 text-white'
                        : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Badges */}
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-primary-600 text-white text-sm font-medium">
                        最受欢迎
                      </span>
                    </div>
                  )}
                  {plan.discount && (
                    <div className="absolute -top-3 right-6">
                      <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                        {plan.discount}
                      </span>
                    </div>
                  )}
                  {plan.badge && (
                    <div className="absolute -top-3 right-6">
                      <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-medium">
                        <i className="fas fa-crown mr-1" />
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6 pt-4">
                    <h3 className={`text-lg font-bold mb-2 ${!plan.isDark && 'text-gray-900'}`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-4xl font-bold ${plan.isPopular ? 'text-primary-600' : plan.isDark ? '' : 'text-gray-900'}`}>
                        {plan.price}
                      </span>
                      <span className={plan.isDark ? 'text-gray-400' : 'text-gray-500'}>{plan.period}</span>
                    </div>
                    <p className={`text-sm mt-2 ${plan.isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        {feature.included ? (
                          <i className={`fas fa-check ${plan.isDark ? 'text-green-400' : 'text-green-500'}`} />
                        ) : (
                          <i className={`fas fa-times ${plan.isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                        )}
                        <span className={feature.included ? (plan.isDark ? '' : 'text-gray-700') : plan.isDark ? 'text-gray-600' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                        : plan.isDark
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:-translate-y-0.5'
                          : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    选择{plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VIP Features */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">VIP 专属权益</h2>
              <p className="text-gray-600">升级 VIP，解锁更多高级功能</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vipFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <i className={`fas ${feature.icon} text-white text-xl`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">功能对比</h2>
              <p className="text-gray-600">免费版与 VIP 会员功能对比</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">功能</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">免费版</th>
                    <th className="text-center py-4 px-6 font-semibold text-primary-600 bg-primary-50">VIP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-4 px-6 text-gray-700">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-gray-600">
                        {typeof row.free === 'boolean' ? (
                          row.free ? (
                            <i className="fas fa-check text-green-500" />
                          ) : (
                            <i className="fas fa-times text-gray-400" />
                          )
                        ) : (
                          row.free
                        )}
                      </td>
                      <td className="py-4 px-6 text-center bg-primary-50">
                        {typeof row.vip === 'boolean' ? (
                          row.vipIcon && <i className="fas fa-check text-primary-600" />
                        ) : row.vipIcon ? (
                          <span className="text-primary-600 font-semibold">
                            {row.vip}
                            <i className="fas fa-infinity text-primary-600 ml-1" />
                          </span>
                        ) : (
                          row.vip
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">常见问题</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-4">
                  <button className="w-full flex items-center justify-between text-left">
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <i className="fas fa-chevron-down text-gray-400" />
                  </button>
                  <p className="mt-3 text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              准备好提升你的英语了吗？
            </h2>
            <p className="text-gray-600 mb-8">立即升级 VIP，开启高效学习之旅</p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-base font-semibold text-white hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <i className="fas fa-crown mr-2" />
              立即升级 VIP
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}