import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../db/index.js";

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";
const JWT_EXPIRES_IN = "7d";

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
});

function generateToken(user: { id: string; email?: string | null; phone?: string | null; role: string }) {
  return jwt.sign(
    { userId: user.id, email: user.email, phone: user.phone, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function transformUser(user: any) {
  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    nickname: user.nickname,
    avatar: user.avatar,
    role: user.role,
    vipStatus: user.vipStatus,
    vipExpireAt: user.vipExpireAt,
    coinBalance: user.coinBalance,
    createdAt: user.createdAt,
  };
}

/**
 * POST /api/auth/register
 */
authRouter.post("/register", async (req, res) => {
  try {
    const parsed = RegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_REQUEST", message: "请求参数无效", details: parsed.error.issues },
      });
    }

    const { email, phone, password, nickname } = parsed.data;

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_REQUEST", message: "请提供邮箱或手机号" },
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [...(email ? [{ email }] : []), ...(phone ? [{ phone }] : [])] },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { code: "USER_EXISTS", message: "该邮箱或手机号已注册" },
      });
    }

    const passwordHash = password ? await bcrypt.hash(password, 10) : null;

    const user = await prisma.user.create({
      data: {
        email,
        phone,
        passwordHash,
        nickname: nickname || (email ? email.split("@")[0] : `用户${Date.now()}`),
        role: "USER",
        vipStatus: "NONE",
        coinBalance: 10,
      },
    });

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      data: { user: transformUser(user), token },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "服务器内部错误" },
    });
  }
});

/**
 * POST /api/auth/login
 */
authRouter.post("/login", async (req, res) => {
  try {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_REQUEST", message: "请求参数无效" },
      });
    }

    const { email, phone, password } = parsed.data;

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_REQUEST", message: "请提供邮箱或手机号" },
      });
    }

    const user = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "账号或密码错误" },
      });
    }

    if (password && user.passwordHash) {
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({
          success: false,
          error: { code: "INVALID_CREDENTIALS", message: "账号或密码错误" },
        });
      }
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      data: { user: transformUser(user), token },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "服务器内部错误" },
    });
  }
});

/**
 * GET /api/auth/me
 */
authRouter.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: { code: "UNAUTHORIZED", message: "请先登录" },
      });
    }

    const token = authHeader.split(" ")[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_TOKEN", message: "登录已过期" },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: "USER_NOT_FOUND", message: "用户不存在" },
      });
    }

    return res.json({ success: true, data: { user: transformUser(user) } });
  } catch (error) {
    console.error("Get me error:", error);
    return res.status(500).json({
      success: false,
      error: { code: "INTERNAL_ERROR", message: "服务器内部错误" },
    });
  }
});

/**
 * POST /api/auth/logout
 */
authRouter.post("/logout", (req, res) => {
  return res.json({ success: true, data: { message: "已退出登录" } });
});