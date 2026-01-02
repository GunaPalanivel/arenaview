import { z } from "zod";

// Schema for validating gameId in params
export const gameIdParamSchema = z.object({
  gameId: z.string().uuid("Invalid game ID format"),
});

// Export types
export type GameIdParamInput = z.infer<typeof gameIdParamSchema>;
