/**
 * IT & Programming English Prompt Configuration
 *
 * This configuration defines the AI prompt templates for evaluating
 * IT/Programming related English expressions. Must be used when
 * the scene category is IT_PROGRAMMING.
 *
 * Core principle: Use Silicon Valley engineer style terminology,
 * NOT literal or stiff translations.
 */

export const IT_PROGRAMMING_PROMPT_CONFIG = {
  system_prompt: `你是一位拥有资深海外研发经验的硅谷高级工程师。你擅长用精准、地道且符合日常代码审查（Code Review）和技术交流习惯的专业术语来评估英文表达。

评估标准：
1. 技术准确性 - 是否正确传达了技术概念？
2. 习惯用语 - 是否听起来像英语母语工程师的自然表达？
3. 清晰度 - 是否明确无歧义？
4. 专业语气 - 是否适合职场技术沟通？

注意：坚决避免生硬的书面或字面翻译。`,

  evaluation_instructions: {
    TRANSLATION_CN_TO_EN: `对于中译英任务：
1. 首先理解中文/英文原文内容
2. 提供一个地道的、工程师日常使用的翻译
3. 考虑技术场景（代码审查、文档、技术讨论等）
4. 指出用户的技术名词是否地道准确
5. 如翻译生硬或不当，提供改进建议`,

    TRANSLATION_EN_TO_CN: `对于英译中任务：
1. 首先理解英文原文内容
2. 检查中文翻译是否准确传达技术含义
3. 评估中文表达是否自然流畅
4. 指出可能的误译或不够地道的地方`,

    EXPRESSION_EQUIVALENT: `对于表达等价任务：
1. 评估用户表达是否捕捉到相同的含义
2. 以0-100的评分标准评价自然度
3. 如需要，提供更地道的替代表达
4. 解释为什么某些表达更加地道`,

    FREE_EXPRESSION: `对于自由表达任务：
1. 理解用户的沟通目标
2. 评估清晰度、语法和地道性
3. 提供建设性的改进反馈
4. 如需要，建议更专业/正式的表达方式`
  },

  // 评分维度配置
  scoring_dimensions: [
    { key: "technical_accuracy", label: "技术准确性", weight: 0.3 },
    { key: "grammar", label: "语法正确性", weight: 0.2 },
    { key: "vocabulary", label: "词汇选择", weight: 0.2 },
    { key: "fluency", label: "流畅度", weight: 0.15 },
    { key: "idiomaticity", label: "地道表达", weight: 0.15 }
  ],

  // 典型场景覆盖
  scene_overrides: {
    CODE_REVIEW: {
      context: "你正在审查代码审查会话中的评论。",
      additional_criteria: "考虑反馈是否具有建设性和专业性"
    },
    TECHNICAL_DOCS: {
      context: "你正在审查技术文档或 README 内容。",
      additional_criteria: "检查清晰度、完整性和术语准确性"
    },
    BUG_REPORT: {
      context: "你正在审查错误报告或问题描述。",
      additional_criteria: "确保描述清晰且可操作"
    },
    COMMIT_MESSAGE: {
      context: "你正在审查 git commit message。",
      additional_criteria: "遵循常规 commit 格式，简洁但有描述性"
    },
    DATABASE_SQL: {
      context: "你正在审查 SQL 查询或数据库操作语句。",
      additional_criteria: "检查 SQL 语法和查询优化建议"
    },
    API_DESIGN: {
      context: "你正在审查 API 设计和端点命名。",
      additional_criteria: "评估 RESTful 约定和命名规范"
    }
  },

  // 必需的地道表达对照表
  required_translations: {
    "部署代码": ["deploy the code", "push to production", "ship to production"],
    "调用接口": ["fetch the API", "hit the endpoint", "call the endpoint"],
    "代码审查": ["code review", "CR feedback", "review the PR"],
    "提测": ["submit for testing", "send to QA", "hand off to QA"],
    "合并代码": ["merge the PR", "merge into main", "land the changes"],
    "开源项目": ["open source project", "OSS project"],
    "写文档": ["write documentation", "document this", "update the docs"],
    "调试": ["debug", "troubleshoot", "figure out what's broken"],
    "性能优化": ["performance optimization", "optimize performance", "speed up"],
    "代码重构": ["refactor the code", "restructure", "clean up the code"],
    "接口文档": ["API documentation", "API spec", "endpoint documentation"],
    "前端": ["frontend", "client-side"],
    "后端": ["backend", "server-side"],
    "全栈": ["full-stack"],
    "版本控制": ["version control", "source control"],
    "持续集成": ["CI", "continuous integration"],
    "持续部署": ["CD", "continuous deployment"],
    "代码质量": ["code quality", "code health"],
    "技术债务": ["tech debt", "technical debt"],
    "代码规范": ["code standards", "coding standards", "style guide"]
  },

  // 输出格式约束
  output_format: {
    language: "zh-CN",
    max_total_score: 100,
    min_score_per_dimension: 0,
    max_score_per_dimension: 100,
    require_better_expressions: true,
    max_better_expressions: 3
  }
} as const;

/**
 * Build evaluation prompt for a specific question
 */
export function buildEvaluationPrompt(
  questionType: string,
  userInput: string,
  sceneCode?: string
): string {
  const basePrompt = IT_PROGRAMMING_PROMPT_CONFIG.system_prompt;

  // Map question type to instruction key
  const instructionKey = questionType as keyof typeof IT_PROGRAMMING_PROMPT_CONFIG.evaluation_instructions;
  const typeInstructions = IT_PROGRAMMING_PROMPT_CONFIG.evaluation_instructions[instructionKey] ||
    IT_PROGRAMMING_PROMPT_CONFIG.evaluation_instructions.TRANSLATION_CN_TO_EN;

  let fullPrompt = `${basePrompt}\n\n【评估类型】\n${typeInstructions}`;

  // Apply scene override if applicable
  if (sceneCode) {
    // Convert kebab-case (e.g., "code-review") to SCREAMING_SNAKE_CASE (e.g., "CODE_REVIEW")
    const sceneOverrideKey = sceneCode
      .toUpperCase()
      .replace(/-/g, "_") as keyof typeof IT_PROGRAMMING_PROMPT_CONFIG.scene_overrides;
    const sceneOverride = IT_PROGRAMMING_PROMPT_CONFIG.scene_overrides[sceneOverrideKey];

    if (sceneOverride) {
      fullPrompt += `\n\n【场景上下文】\n${sceneOverride.context}`;
      fullPrompt += `\n附加评估标准：${sceneOverride.additional_criteria}`;
    }
  }

  fullPrompt += `\n\n【待评估的表达】\n${userInput}`;

  fullPrompt += `\n\n【输出要求】
请以标准 JSON 格式返回评估结果，包含以下字段：
- total_score: 综合分数 (0-100)
- dimensions: 维度评分数组（包含 name, score, detail）
- feedback: 诊断建议（中文）
- better_expressions: 地道表达推荐数组（包含 user_expression, better_version, reason）
- grammar_issues: 语法问题数组（包含 original, corrected, explanation，可选）

示例输出格式：
{
  "total_score": 85,
  "dimensions": [
    {"name": "技术准确性", "score": 90, "detail": "..."},
    {"name": "语法正确性", "score": 85, "detail": "..."}
  ],
  "feedback": "整体表达不错，但某些技术术语可以更地道...",
  "better_expressions": [
    {"user_expression": "deploy the code", "better_version": "ship to production", "reason": "更符合硅谷工程师日常用语习惯"}
  ]
}`;

  return fullPrompt;
}

/**
 * Check if a given Chinese phrase needs better translation
 * Returns array of recommended native expressions
 */
export function checkRequiredTranslation(chinesePhrase: string): string[] | null {
  const normalized = chinesePhrase.trim().toLowerCase();
  for (const [key, value] of Object.entries(IT_PROGRAMMING_PROMPT_CONFIG.required_translations)) {
    if (normalized.includes(key.toLowerCase())) {
      return value;
    }
  }
  return null;
}
