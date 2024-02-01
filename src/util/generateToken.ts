import bcrypt from "bcrypt";
import { randomBytes } from "crypto";

const SALT_ROUNDS = 12;

export async function generateToken(): Promise<{
  token: string;
  hash: string;
  expiresAt: Date;
}> {
  const token = randomBytes(256).toString("hex");

  const hash = await bcrypt.hash(token, SALT_ROUNDS);

  return {
    token,
    hash,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  };
}
