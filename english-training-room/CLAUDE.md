# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

## 项目概述

英语练功房 (English Training Room) 是一款基于 AI 评估的全栈英语翻译练习平台。用户通过场景化题库进行练习，获得 AI 实时反馈。IT/编程英语分类是面向开发者群体的核心差异化功能。

## 架构

### Monorepo 结构 (Turborepo)
```
english-training-room/
├── apps/
│   ├── web/           # Next.js 14 前端 (App Router)
│   └── api/           # Express 后端
├── packages/
│   └── types/         # 共享 TypeScript 类型
├── docker-compose.yml # Redis (Neon for PostgreSQL)
├── turbo.json
└── package.json
```

### 前端 (Next.js 14)
- **位置**: `apps/web/src/app/`
- **路由**: App Router，支持动态路由 (`/practice/[sceneId]`)
- **样式**: Tailwind CSS + CSS 变量主题系统
- **状态**: 客户端组件使用 React state；服务端组件负责数据获取

### 后端 (Express)
- **位置**: `apps/api/src/`
- **模块**: `auth/`、`evaluation/`、`scene/`、`practice/`
- **AI 集成**: 通过 `@anthropic-ai/sdk` 调用 Anthropic Claude API
- **数据库**: Prisma ORM + PostgreSQL

### 核心流程：练习循环
1. 用户选择场景 → `apps/web/src/app/practice/[sceneId]/page.tsx`
2. 展示题目，用户提交翻译
3. 调用 `POST /api/evaluation`，参数：`questionType`、`userInput`、`sceneCode`
4. 后端 `evaluateTranslation()` 从 `it-programming.ts` 构建 Prompt
5. AI 响应解析为 `EvaluationResult` (total_score, dimensions, feedback, better_expressions)
6. 前端展示分数拆解和改进建议

## 常用命令

```bash
# 安装依赖
npm install

# 启动本地基础设施 (仅 Redis，数据库使用 Neon)
docker-compose up -d

# 运行开发服务器
npm run dev                    # 通过 turbo 运行所有 apps
npm run dev --filter=web       # 仅前端 (http://localhost:3000)
npm run dev --filter=api       # 仅后端 (http://localhost:3001)

# 数据库
npm run db:push               # 推送 schema 到数据库
npm run db:migrate            # 执行迁移
npm run db:generate            # 生成 Prisma Client

# 构建
npm run build
```

## 核心：IT 编程英语 Prompt 系统

当场景分类为 `IT_PROGRAMMING` 时，AI 评估**必须**使用 `apps/api/src/prompts/it-programming.ts` 中的硅谷工程师风格 Prompt。

**核心要求**：避免生硬的书本式翻译。示例：
- "部署代码" → "deploy the code" / "push to production" / "ship to production"
- "调用接口" → "fetch the API" / "hit the endpoint"
- "代码审查" → "code review" / "CR feedback"

Prompt 配置包含：
- `system_prompt`: 基础角色定义
- `evaluation_instructions`: 按题目类型的指令 (TRANSLATION_CN_TO_EN 等)
- `scene_overrides`: CODE_REVIEW、TECHNICAL_DOCS、BUG_REPORT、COMMIT_MESSAGE、DATABASE_SQL、API_DESIGN
- `required_translations`: 中英文短语对照表

## AI 评估响应格式

```typescript
interface EvaluationResult {
  total_score: number;        // 0-100 总分
  dimensions: [{name, score, detail}];  // 维度评分
  feedback: string;           // 中文诊断建议
  better_expressions: [{user_expression, better_version, reason}];  // 地道表达推荐
  grammar_issues?: [{original, corrected, explanation}];  // 语法问题
}
```

## 频控限制

评估接口限制为 **5 次/分钟/IP**，通过 `express-rate-limit` 实现。在 `apps/api/src/main.ts` 中应用：
```typescript
app.use("/api/evaluation", limiter, evaluationRouter);
```

## 输入校验

发送给 AI 前，用户输入会经过校验 (`evaluateTranslation.validateInput()`)：
- 拒绝空输入、长度 <2 字符、乱码模式、纯中文 (输出英文场景)
- 返回 400 错误并携带具体错误信息

## 数据库模型 (Prisma)

核心实体：`User`、`Scene`、`Question`、`PracticeRecord`、`VipOrder`
- `Scene.category`: DAILY_LIFE | TRAVEL | BUSINESS | CET | IELTS | **IT_PROGRAMMING**
- `Question.type`: TRANSLATION_CN_TO_EN | TRANSLATION_EN_TO_CN | EXPRESSION_EQUIVALENT | FREE_EXPRESSION
- `PracticeRecord.evaluationResult`: JSON 字段存储完整 AI 响应
