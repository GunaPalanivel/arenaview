import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/**
 * Protected test route - requires valid JWT token
 * GET /api/test/protected
 * Response: 200 with authenticated user data
 */
router.get("/protected", authMiddleware, (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Access granted to protected route",
    user: req.user,
  });
});

export default router;
