import { db } from "./db";
import { Prisma } from "@prisma/client";
import {
  randomBytes,
  createHash,
  createCipheriv,
  createDecipheriv
} from "crypto";

class Cipher {
  algorithm: string;
  key: string;
  iv: string;

  constructor(algorithm: string, key: string, iv: string) {
    this.algorithm = algorithm;
    this.key = createHash("sha512").update(key).digest("hex").substring(0, 32);
    this.iv = createHash("sha512").update(iv).digest("hex").substring(0, 16);
  }

  encrypt(data: string) {
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);

    return btoa(cipher.update(data, "utf8", "binary") + cipher.final("binary"));
  }

  decrypt(data: string) {
    const decipher = createDecipheriv(this.algorithm, this.key, this.iv);

    return (
      decipher.update(atob(data), "binary", "utf8") + decipher.final("utf8")
    );
  }
}

const cipher = new Cipher(
  "aes-256-cbc",
  process.env.CIPHER_KEY || randomBytes(256).toString("hex"),
  process.env.CIPHER_IV || randomBytes(16).toString("hex")
);

export async function isAuthenticated(tokenString: string): Promise<boolean> {
  const [tokenId, token] = tokenString.split(".");

  if (!tokenId || !token) {
    return false;
  }

  const { encToken } =
    (await db.token.findUnique({
      where: {
        id: tokenId
      }
    })) ?? {};

  if (!encToken) {
    return false;
  }

  return cipher.decrypt(encToken) === token;
}

export async function getUserIdFromToken(tokenString: string) {
  const [tokenId] = tokenString.split(".");

  if (!tokenId) {
    return null;
  }

  if (!(await isAuthenticated(tokenString))) {
    return null;
  }

  const { userId } = (await db.token.findUnique({
    where: {
      id: tokenId
    }
  })) ?? { userId: null };

  return userId;
}

export async function getUserFromToken(
  tokenString: string,
  include: Prisma.UserInclude = {}
) {
  const userId = await getUserIdFromToken(tokenString);

  if (!userId) {
    return null;
  }

  return await db.user.findUnique({
    where: {
      id: userId
    },
    include
  });
}

export async function getProfileFromToken(
  tokenString: string,
  include: Prisma.ProfileInclude = {}
) {
  const userId = await getUserIdFromToken(tokenString);

  if (!userId) {
    return null;
  }

  return await db.profile.findFirst({
    where: {
      id: userId
    },
    include
  });
}

export async function generateToken(): Promise<{
  token: string;
  encrypted: string;
  expiresAt: Date;
}> {
  const token = randomBytes(256).toString("hex");

  return {
    token,
    encrypted: cipher.encrypt(token),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  };
}
