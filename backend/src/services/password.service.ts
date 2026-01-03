import * as bcrypt from "bcrypt";
import { SECURITY } from "../config/constants";

export class PasswordService {
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SECURITY.BCRYPT_SALT_ROUNDS);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
