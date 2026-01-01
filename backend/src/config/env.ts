import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  FRONTEND_URL: string;
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env: EnvConfig = {
  NODE_ENV: getEnvVariable("NODE_ENV", "development"),
  PORT: parseInt(getEnvVariable("PORT", "3001"), 10),
  DATABASE_URL: getEnvVariable("DATABASE_URL"),
  JWT_SECRET: getEnvVariable("JWT_SECRET"),
  FRONTEND_URL: getEnvVariable("FRONTEND_URL", "http://localhost:5173"),
};

// Validate JWT_SECRET length
if (env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters long");
}
