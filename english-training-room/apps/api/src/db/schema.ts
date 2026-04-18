import { pgTable, uuid, text, varchar, integer, boolean, timestamp, jsonb, pgEnum, decimal, index, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ==================== Enums ====================

export const sceneCategoryEnum = pgEnum('scene_category', [
  'DAILY_LIFE',
  'TRAVEL',
  'BUSINESS',
  'CET',
  'IELTS',
  'IT_PROGRAMMING'
]);

export const questionTypeEnum = pgEnum('question_type', [
  'TRANSLATION_CN_TO_EN',
  'TRANSLATION_EN_TO_CN',
  'EXPRESSION_EQUIVALENT',
  'FREE_EXPRESSION'
]);

export const difficultyEnum = pgEnum('difficulty', [
  'BEGINNER',
  'INTERMEDIATE',
  'ADVANCED',
  'EXPERT'
]);

export const membershipTierEnum = pgEnum('membership_tier', [
  'FREE',
  'MONTHLY',
  'YEARLY',
  'LIFETIME'
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'PENDING',
  'COMPLETED',
  'FAILED',
  'REFUNDED',
  'EXPIRED'
]);

export const paymentGatewayEnum = pgEnum('payment_gateway', [
  'STRIPE',
  'WECHAT_NATIVE',
  'WECHAT_H5',
  'ALIPAY'
]);

export const practiceStatusEnum = pgEnum('practice_status', [
  'IN_PROGRESS',
  'COMPLETED',
  'ABANDONED'
]);

export const oauthProviderEnum = pgEnum('oauth_provider', [
  'GOOGLE',
  'GITHUB',
  'WECHAT'
]);

// ==================== Users ====================

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique(),
  nickname: varchar('nickname', { length: 100 }),
  avatar: text('avatar'),
  membershipTier: membershipTierEnum('membership_tier').default('FREE').notNull(),
  membershipExpireAt: timestamp('membership_expire_at', { withTimezone: true }),
  coinBalance: integer('coin_balance').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const oauthAccounts = pgTable('oauth_accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  provider: oauthProviderEnum('provider').notNull(),
  providerUserId: varchar('provider_user_id', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  providerUserIdx: index('oauth_accounts_provider_user_idx').on(table.provider, table.providerUserId),
}));

// ==================== Scenes ====================

export const scenes = pgTable('scenes', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 50 }).unique().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  category: sceneCategoryEnum('category').notNull(),
  difficulty: difficultyEnum('difficulty').default('BEGINNER').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ==================== Questions ====================

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  sceneId: uuid('scene_id').notNull().references(() => scenes.id, { onDelete: 'cascade' }),
  type: questionTypeEnum('type').notNull(),
  prompt: text('prompt').notNull(),
  referenceAnswer: text('reference_answer'),
  hint: text('hint'),
  explanation: text('explanation'),
  aiPromptTemplate: text('ai_prompt_template'),
  difficulty: difficultyEnum('difficulty').default('INTERMEDIATE').notNull(),
  tags: text('tags').array().default([]).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  sceneIdIdx: index('questions_scene_id_idx').on(table.sceneId),
  difficultyIdx: index('questions_difficulty_idx').on(table.difficulty),
}));

// ==================== Practice Records ====================

export interface EvaluationDimensions {
  name: string;
  score: number;
  detail: string;
}

export interface BetterExpression {
  userExpression: string;
  betterVersion: string;
  reason: string;
}

export interface GrammarIssue {
  original: string;
  corrected: string;
  explanation: string;
}

export interface EvaluationResult {
  totalScore: number;
  dimensions: EvaluationDimensions[];
  feedback: string;
  betterExpressions: BetterExpression[];
  grammarIssues?: GrammarIssue[];
}

export const practiceRecords = pgTable('practice_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  questionId: uuid('question_id').notNull().references(() => questions.id),
  sceneId: uuid('scene_id').notNull().references(() => scenes.id),
  userInput: text('user_input').notNull(),
  evaluationResult: jsonb('evaluation_result').notNull().$type<EvaluationResult>(),
  totalScore: integer('total_score').notNull(),
  status: practiceStatusEnum('status').default('COMPLETED').notNull(),
  isFavorite: boolean('is_favorite').default(false).notNull(),
  reviewCount: integer('review_count').default(0).notNull(),
  completionTimeMs: integer('completion_time_ms'),
  aiLatencyMs: integer('ai_latency_ms'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('practice_records_user_id_idx').on(table.userId),
  questionIdIdx: index('practice_records_question_id_idx').on(table.questionId),
  sceneIdIdx: index('practice_records_scene_id_idx').on(table.sceneId),
  createdAtIdx: index('practice_records_created_at_idx').on(table.createdAt),
}));

// ==================== User Favorite Scenes ====================

export const userFavoriteScenes = pgTable('user_favorite_scenes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  sceneId: uuid('scene_id').notNull().references(() => scenes.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  userIdSceneIdIdx: index('user_favorite_scenes_user_scene_idx').on(table.userId, table.sceneId),
}));

// ==================== Daily Usage (Rate Limiting) ====================

export const dailyUsage = pgTable('daily_usage', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: varchar('date', { length: 10 }).notNull(),
  practiceCount: integer('practice_count').default(0).notNull(),
  lastPracticeAt: timestamp('last_practice_at', { withTimezone: true }),
}, (table) => ({
  userIdDateIdx: index('daily_usage_user_date_idx').on(table.userId, table.date),
}));

// ==================== VIP Orders ====================

export const vipOrders = pgTable('vip_orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderNo: varchar('order_no', { length: 64 }).unique().notNull(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  vipType: membershipTierEnum('vip_type').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  gateway: paymentGatewayEnum('gateway').notNull(),
  paymentStatus: paymentStatusEnum('payment_status').default('PENDING').notNull(),
  paymentNo: varchar('payment_no', { length: 128 }),
  paidAt: timestamp('paid_at', { withTimezone: true }),
  expireAt: timestamp('expire_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('vip_orders_user_id_idx').on(table.userId),
  paymentStatusIdx: index('vip_orders_payment_status_idx').on(table.paymentStatus),
}));

// ==================== Achievements ====================

export const achievements = pgTable('achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 50 }).unique().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  category: varchar('category', { length: 50 }).notNull(),
  requirement: integer('requirement').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ==================== User Achievements ====================

export const userAchievements = pgTable('user_achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  achievementId: uuid('achievement_id').notNull().references(() => achievements.id),
  unlockedAt: timestamp('unlocked_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('user_achievements_user_id_idx').on(table.userId),
  achievementIdIdx: index('user_achievements_achievement_id_idx').on(table.achievementId),
}));

// ==================== Relations ====================

export const usersRelations = relations(users, ({ many }) => ({
  oauthAccounts: many(oauthAccounts),
  practiceRecords: many(practiceRecords),
  favoriteScenes: many(userFavoriteScenes),
  vipOrders: many(vipOrders),
  dailyUsage: many(dailyUsage),
  userAchievements: many(userAchievements),
}));

export const oauthAccountsRelations = relations(oauthAccounts, ({ one }) => ({
  user: one(users, {
    fields: [oauthAccounts.userId],
    references: [users.id],
  }),
}));

export const scenesRelations = relations(scenes, ({ many }) => ({
  questions: many(questions),
  userFavorites: many(userFavoriteScenes),
  practiceRecords: many(practiceRecords),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  scene: one(scenes, {
    fields: [questions.sceneId],
    references: [scenes.id],
  }),
  practiceRecords: many(practiceRecords),
}));

export const practiceRecordsRelations = relations(practiceRecords, ({ one }) => ({
  user: one(users, {
    fields: [practiceRecords.userId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [practiceRecords.questionId],
    references: [questions.id],
  }),
  scene: one(scenes, {
    fields: [practiceRecords.sceneId],
    references: [scenes.id],
  }),
}));

export const userFavoriteScenesRelations = relations(userFavoriteScenes, ({ one }) => ({
  user: one(users, {
    fields: [userFavoriteScenes.userId],
    references: [users.id],
  }),
  scene: one(scenes, {
    fields: [userFavoriteScenes.sceneId],
    references: [scenes.id],
  }),
}));

export const vipOrdersRelations = relations(vipOrders, ({ one }) => ({
  user: one(users, {
    fields: [vipOrders.userId],
    references: [users.id],
  }),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}));

export const dailyUsageRelations = relations(dailyUsage, ({ one }) => ({
  user: one(users, {
    fields: [dailyUsage.userId],
    references: [users.id],
  }),
}));
