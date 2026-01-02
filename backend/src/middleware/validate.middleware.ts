import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ValidationError } from "../utils/errors";

type ValidationTarget = "body" | "query" | "params";

export const validate =
  (schema: AnyZodObject, target: ValidationTarget = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate =
        target === "body"
          ? req.body
          : target === "query"
          ? req.query
          : req.params;

      const validatedData = await schema.parseAsync(dataToValidate);

      // Attach validated data back to request
      if (target === "body") {
        req.body = validatedData;
      } else if (target === "query") {
        req.query = validatedData;
      } else {
        req.params = validatedData;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.errors.reduce((acc, err) => {
          const field = err.path.join(".");
          acc[field] = err.message;
          return acc;
        }, {} as Record<string, string>);
        throw new ValidationError(
          `Validation failed: ${JSON.stringify(fieldErrors)}`
        );
      }
      throw error;
    }
  };
