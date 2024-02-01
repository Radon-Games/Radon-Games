import { db } from "./db";
import bcrypt from "bcrypt";

export async function getUserFromToken(tokenString: string) {
  const [tokenId, token] = tokenString.split(".");

  if (!tokenId || !token) {
    return null;
  }

  const { tokenHash, user } =
    (await db.token.findUnique({
      where: {
        id: tokenId
      },
      include: {
        user: true
      }
    })) ?? {};

  if (!tokenHash || !user) {
    return null;
  }

  const isValid = await bcrypt.compare(token, tokenHash);

  if (!isValid) {
    return null;
  }

  return user;
}

export async function getProfileFromToken(tokenString: string) {
  const [tokenId, token] = tokenString.split(".");

  if (!tokenId || !token) {
    return null;
  }

  const { tokenHash, userId } =
    (await db.token.findUnique({
      where: {
        id: tokenId
      }
    })) ?? {};

  if (!tokenHash || !userId) {
    return null;
  }

  const isValid = await bcrypt.compare(token, tokenHash);

  if (!isValid) {
    return null;
  }

  return await db.profile.findUnique({
    where: {
      id: userId
    }
  });
}
