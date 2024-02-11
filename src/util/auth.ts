import { db } from "./db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
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

export async function getProfileFromToken(
  tokenString: string,
  include: Prisma.ProfileInclude = {}
) {
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
    },
    include
  });
}
