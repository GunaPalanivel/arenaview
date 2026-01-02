import { z } from "zod";

// Game type enum
export const gameTypeSchema = z.enum(["SPORTS", "CASINO"]);

// Filter schema for query parameters
export const gamesFilterSchema = z.object({
  type: gameTypeSchema.optional(),
  sport: z.string().optional(),
  provider: z.string().optional(),
  search: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val >= 1, "Page must be >= 1"),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 20))
    .refine((val) => val >= 1 && val <= 100, "Limit must be between 1 and 100"),
});

// Schema for validating game ID in params
export const gameIdSchema = z.object({
  id: z.string().uuid("Invalid game ID format"),
});

// Export types
export type GamesFilterInput = z.infer<typeof gamesFilterSchema>;
export type GameIdInput = z.infer<typeof gameIdSchema>;
