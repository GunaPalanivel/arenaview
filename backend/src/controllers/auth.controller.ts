import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";
import { successResponse } from "../utils/response";

export const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await AuthService.register(req.body);
    successResponse(res, data, "Registration successful", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await AuthService.login(req.body);
    successResponse(res, data, "Login successful");
  } catch (error) {
    next(error);
  }
};
