import { prisma } from "../config/database";
import { PasswordService } from "./password.service";
import { generateToken } from "../utils/jwt";
import { ConflictError, UnauthorizedError } from "../utils/errors";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";
import { Prisma } from "@prisma/client";

export class AuthService {
  static async register(input: RegisterInput) {
    const { name, email, password } = input;

    // Hash password
    const hashedPassword = await PasswordService.hash(password);

    try {
      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Generate token
      const token = generateToken(user.id);

      // Return user without password
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      };
    } catch (error) {
      // Handle duplicate email
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictError("Email already registered");
      }
      throw error;
    }
  }

  static async login(input: LoginInput) {
    const { email, password } = input;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Compare password
    const isPasswordValid = await PasswordService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
