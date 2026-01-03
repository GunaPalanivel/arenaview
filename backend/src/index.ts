import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { corsOptions } from "./config/cors";
import { prisma } from "./config/database";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import gamesRoutes from "./routes/games.routes";
import favoritesRoutes from "./routes/favorites.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/favorites", favoritesRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Export app for Vercel serverless
export default app;

// Start server only if not in serverless environment
if (process.env.VERCEL !== "1") {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
  });

  // Graceful shutdown
  process.on("SIGTERM", async () => {
    console.log("SIGTERM received, closing server...");
    server.close(async () => {
      await prisma.$disconnect();
      console.log("✅ Server closed");
      process.exit(0);
    });
  });
}
