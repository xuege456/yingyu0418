import { notFound } from "next/navigation";
import PracticePageClient from "./PracticePageClient";

interface PageProps {
  params: Promise<{ sceneId: string }>;
}

// Mock data - in production, this would come from database
const SCENES: Record<string, { name: string; description: string }> = {
  daily: { name: "日常口语", description: "日常生活中的实用表达" },
  travel: { name: "出国旅游", description: "旅行中的常用英语对话" },
  business: { name: "商务场景", description: "职场商务英语表达" },
  cet: { name: "四六级", description: "大学英语四六级备考" },
  ielts: { name: "雅思托福", description: "雅思/托福考试训练" },
  "it-programming": { name: "IT与编程英语", description: "程序员专属技术英语" },
};

const QUESTIONS: Record<string, Array<{ id: string; prompt: string; hint?: string; difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT" }>> = {
  "it-programming": [
    {
      id: "q1",
      prompt: "部署代码到生产环境",
      hint: "使用硅谷工程师常用的表达",
      difficulty: "INTERMEDIATE",
    },
    {
      id: "q2",
      prompt: "调用这个接口获取用户数据",
      hint: "考虑用更专业的技术术语",
      difficulty: "INTERMEDIATE",
    },
    {
      id: "q3",
      prompt: "我们需要进行一次代码审查",
      hint: "Code Review是常见的缩写形式",
      difficulty: "INTERMEDIATE",
    },
    {
      id: "q4",
      prompt: "把新功能提交给测试团队",
      hint: "可以用hand off或submit for testing",
      difficulty: "ADVANCED",
    },
    {
      id: "q5",
      prompt: "这个接口的性能需要优化",
      hint: "考虑使用speed up或optimize",
      difficulty: "INTERMEDIATE",
    },
  ],
  daily: [
    {
      id: "q1",
      prompt: "你今天过得怎么样？",
      difficulty: "BEGINNER",
    },
    {
      id: "q2",
      prompt: "我们周末一起吃饭吧",
      difficulty: "BEGINNER",
    },
    {
      id: "q3",
      prompt: "请问最近的地铁站在哪里？",
      difficulty: "INTERMEDIATE",
    },
  ],
  travel: [
    {
      id: "q1",
      prompt: "我想预订一个双人房间",
      hint: "使用book或make a reservation",
      difficulty: "INTERMEDIATE",
    },
    {
      id: "q2",
      prompt: "请问这个菜单有英文版本吗？",
      difficulty: "INTERMEDIATE",
    },
    {
      id: "q3",
      prompt: "我需要一张去市中心的地铁票",
      difficulty: "BEGINNER",
    },
  ],
  business: [
    {
      id: "q1",
      prompt: "感谢您抽出宝贵时间与我见面",
      difficulty: "INTERMEDIATE",
    },
    {
      id: "q2",
      prompt: "我们可以在周三下午召开会议",
      difficulty: "INTERMEDIATE",
    },
    {
      id: "q3",
      prompt: "请查收附件中的报价单",
      difficulty: "ADVANCED",
    },
  ],
  cet: [
    {
      id: "q1",
      prompt: "随着科技的发展，人们的生活方式发生了巨大变化",
      difficulty: "INTERMEDIATE",
    },
    {
      id: "q2",
      prompt: "我认为这个观点很有道理",
      difficulty: "INTERMEDIATE",
    },
    {
      id: "q3",
      prompt: "政府应该采取措施来解决这个问题",
      difficulty: "ADVANCED",
    },
  ],
  ielts: [
    {
      id: "q1",
      prompt: "Some people believe that technology has greatly improved our lives, while others think it has brought more problems. Discuss both views and give your own opinion.",
      difficulty: "ADVANCED",
    },
    {
      id: "q2",
      prompt: "In some countries, many more people are choosing to live alone nowadays than in the past. Do you think this is a positive or negative development?",
      difficulty: "ADVANCED",
    },
  ],
};

export default async function PracticePage({ params }: PageProps) {
  const { sceneId } = await params;
  const scene = SCENES[sceneId];
  const questions = QUESTIONS[sceneId] || [];

  if (!scene || questions.length === 0) {
    notFound();
  }

  return <PracticePageClient scene={scene} questions={questions} />;
}
