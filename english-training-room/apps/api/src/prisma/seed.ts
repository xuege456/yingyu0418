import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create IT Programming Scene
  const itScene = await prisma.scene.upsert({
    where: { code: 'it-programming' },
    update: {},
    create: {
      code: 'it-programming',
      name: 'IT与编程英语',
      description: '面向开发者群体的核心差异化功能，涵盖代码部署、接口调用、代码审查等技术场景',
      icon: 'fa-code',
      category: 'IT_PROGRAMMING',
      difficulty: 'INTERMEDIATE',
      sortOrder: 1,
    },
  });

  console.log('✅ Created scene:', itScene.name);

  // Create questions for IT Programming
  const questions = [
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '我们需要部署新版本到生产环境',
      hint: '可以用ship或deploy',
      difficulty: 'BEGINNER',
      tags: ['部署'],
    },
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '我已经调用了这个API接口获取数据',
      hint: '可以用hit the endpoint',
      difficulty: 'BEGINNER',
      tags: ['接口'],
    },
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '代码审查发现了一个潜在的bug',
      hint: '可以用code review或CR',
      difficulty: 'INTERMEDIATE',
      tags: ['代码审查'],
    },
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '我们需要回滚到上一个稳定版本',
      hint: '可以用roll back或revert',
      difficulty: 'INTERMEDIATE',
      tags: ['回滚'],
    },
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '这个功能已经通过测试，可以提测了',
      hint: '可以用hand off for testing',
      difficulty: 'BEGINNER',
      tags: ['提测'],
    },
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '请把这个hotfix合并到main分支',
      hint: '可以用merge或cherry-pick',
      difficulty: 'INTERMEDIATE',
      tags: ['合并'],
    },
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '我们采用灰度发布策略来降低风险',
      hint: '可以用canary release或rolling update',
      difficulty: 'ADVANCED',
      tags: ['发布'],
    },
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '这段代码需要进行重构以提高可维护性',
      hint: '可以用refactor',
      difficulty: 'BEGINNER',
      tags: ['重构'],
    },
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '服务出现了内存泄漏问题',
      hint: '可以用memory leak',
      difficulty: 'INTERMEDIATE',
      tags: ['问题诊断'],
    },
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '我们需要优化数据库查询性能',
      hint: '可以用optimize query performance',
      difficulty: 'INTERMEDIATE',
      tags: ['性能优化'],
    },
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '这个开源库的API设计得非常优雅',
      hint: '可以用elegant API design',
      difficulty: 'BEGINNER',
      tags: ['API设计'],
    },
    {
      type: 'TRANSLATION_CN_TO_EN',
      prompt: '代码覆盖率达到了85%',
      hint: '可以用code coverage',
      difficulty: 'BEGINNER',
      tags: ['测试'],
    },
  ];

  for (const q of questions) {
    await prisma.question.upsert({
      where: {
        id: `it-programming-${q.tags[0]}`,
      },
      update: {},
      create: {
        id: `it-programming-${q.tags[0]}`,
        sceneId: itScene.id,
        type: q.type as any,
        prompt: q.prompt,
        hint: q.hint,
        difficulty: q.difficulty as any,
        tags: q.tags,
      },
    });
  }

  console.log(`✅ Created ${questions.length} questions`);

  // Create other scenes
  const scenes = [
    { code: 'daily', name: '日常口语', category: 'DAILY_LIFE', description: '日常生活中的实用英语表达' },
    { code: 'travel', name: '旅游英语', category: 'TRAVEL', description: '旅行中常用的英语交流' },
    { code: 'business', name: '商务英语', category: 'BUSINESS', description: '职场商务场景英语' },
    { code: 'cet', name: '四六级英语', category: 'CET', description: '大学英语四六级考试真题' },
    { code: 'ielts', name: '雅思托福', category: 'IELTS', description: '雅思托福考试备考' },
  ];

  for (const s of scenes) {
    await prisma.scene.upsert({
      where: { code: s.code },
      update: {},
      create: {
        code: s.code,
        name: s.name,
        description: s.description,
        icon: 'fa-book',
        category: s.category as any,
        difficulty: 'BEGINNER',
        sortOrder: 0,
      },
    });
  }

  console.log(`✅ Created ${scenes.length} additional scenes`);
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });