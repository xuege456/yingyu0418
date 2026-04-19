import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { evaluationRouter } from "./modules/evaluation/evaluation.router.js";
import { scenesRouter } from "./modules/scene/scene.router.js";
import { practiceRouter } from "./modules/practice/practice.router.js";
import { authRouter } from "./modules/auth/auth.router.js";
import { errorHandler } from "./common/middleware/errorHandler.js";
import { requestLogger } from "./common/middleware/requestLogger.js";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute per IP for evaluation endpoints
  message: {
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "请求过于频繁，请稍后再试",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Body parsing
app.use(express.json({ limit: "10kb" }));

// Request logging
app.use(requestLogger);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/scenes", scenesRouter);
app.use("/api/practice", practiceRouter);
app.use("/api/evaluation", limiter, evaluationRouter); // Apply rate limiter to evaluation endpoints

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});

export default app;
