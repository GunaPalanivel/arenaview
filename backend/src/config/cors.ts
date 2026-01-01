import cors from "cors";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = [
      FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:3000",
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400, // Cache preflight for 24 hours
};
