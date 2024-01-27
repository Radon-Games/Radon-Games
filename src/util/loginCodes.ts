import { randomBytes } from "crypto";

const codes: Map<
  string,
  {
    code: string;
    expiresAt: Date;
  }
> = new Map();

setInterval(
  () => {
    for (const [userId, data] of codes.entries()) {
      if (data.expiresAt < new Date()) {
        codes.delete(userId);
      }
    }
  },
  1000 * 60 * 60
);

export function generateCode(userId: string): string {
  const code = getNewCode();

  codes.set(userId, {
    code,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24)
  });

  return code;
}

function getNewCode(): string {
  const code = randomBytes(3).toString("hex");

  for (const [userId, data] of codes.entries()) {
    if (data.code === code) {
      if (data.expiresAt < new Date()) {
        codes.delete(userId);
      } else {
        return getNewCode();
      }
    }
  }

  return code;
}

export function verifyCode(code: string): string | null {
  for (const [userId, data] of codes.entries()) {
    if (data.code === code) {
      codes.delete(userId);

      if (data.expiresAt < new Date()) {
        return null;
      }

      return userId;
    }
  }

  return null;
}
