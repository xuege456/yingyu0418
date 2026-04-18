import { Router } from "express";
import { z } from "zod";

export const authRouter = Router();

const RegisterSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().regex(/^1[3-9]\d{9}$/).optional(),
  password: z.string().min(6).optional(),
  nickname: z.string().min(2).max(20).optional(),
});

const LoginSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(1).optional(),
  code: z.string().optional(), // For phone verification login
});

/**
 * POST /api/auth/register
 * Register new user
 */
authRouter.post("/register", async (req, res) => {
  try {
    const parsed = RegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "请求参数无效",
          details: parsed.error.issues,
        },
      });
    }

    // In production:
    // 1. Check if email/phone already exists
    // 2. Hash password
    // 3. Create user in DB
    // 4. Generate JWT token

    const { email, phone, password, nickname } = parsed.data;

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "请提供邮箱或手机号",
        },
      });
    }

    // Mock response
    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: `user_${Date.now()}`,
          email: email || undefined,
          phone: phone || undefined,
          nickname: nickname || "新用户",
          role: "USER",
          vipStatus: "NONE",
        },
        token: `mock_jwt_token_${Date.now()}`,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "服务器内部错误",
      },
    });
  }
});

/**
 * POST /api/auth/login
 * Login user
 */
authRouter.post("/login", async (req, res) => {
  try {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "请求参数无效",
          details: parsed.error.issues,
        },
      });
    }

    // In production:
    // 1. Validate credentials
    // 2. Check password
    // 3. Generate JWT token

    return res.json({
      success: true,
      data: {
        user: {
          id: "user_123",
          email: "user@example.com",
          nickname: "用户",
          role: "USER",
          vipStatus: "NONE",
        },
        token: "mock_jwt_token",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "服务器内部错误",
      },
    });
  }
});

/**
 * POST /api/auth/oauth/:provider
 * OAuth login (GitHub, Google, WeChat)
 */
authRouter.post("/oauth/:provider", async (req, res) => {
  const { provider } = req.params;

  if (!["github", "google", "wechat"].includes(provider)) {
    return res.status(400).json({
      success: false,
      error: {
        code: "INVALID_PROVIDER",
        message: "不支持的第三方登录方式",
      },
    });
  }

  // In production:
  // 1. Redirect to OAuth provider
  // 2. Handle callback
  // 3. Create/link user account

  return res.json({
    success: true,
    data: {
      redirectUrl: `/oauth/callback/${provider}`,
    },
  });
});

/**
 * GET /api/auth/me
 * Get current user info
 */
authRouter.get("/me", (req, res) => {
  // In production, get from JWT middleware
  return res.json({
    success: true,
    data: {
      user: {
        id: "user_123",
        email: "user@example.com",
        nickname: "用户",
        role: "USER",
        vipStatus: "NONE",
        vipExpireAt: null,
        coinBalance: 0,
      },
    },
  });
});

/**
 * POST /api/auth/logout
 * Logout user
 */
authRouter.post("/logout", (req, res) => {
  return res.json({
    success: true,
    data: {
      message: "已退出登录",
    },
  });
});
