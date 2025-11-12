import type { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";

// Convenções
const SECRET = process.env.JWT_SECRET || "change_me";
const EXPIRES_IN_RAW = process.env.JWT_EXPIRES_IN || "1d";

// Tipagem do usuário no token
export type UserClaims = {
  sub: string;
  name: string;
  role: "Admin" | "Operacional" | string;
};

// Em ESM + NodeNext, zere callback e use options
const SIGN_OPTS: SignOptions = { expiresIn: EXPIRES_IN_RAW as SignOptions["expiresIn"] };

// Gera token
export function sign(payload: UserClaims): string {
  return jwt.sign(payload, SECRET, SIGN_OPTS);
}

// Autentica e popula req.user
export function auth(req: Request, res: Response, next: NextFunction) {
  const h = req.header("Authorization") || "";
  const [schema, token] = h.split(" ");
  if (schema !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, SECRET) as UserClaims;
    // @ts-expect-error adição dinâmica
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// Exige um dos papéis informados
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-expect-error leitura dinâmica
    const user = req.user as UserClaims | undefined;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return next();
  };
}
