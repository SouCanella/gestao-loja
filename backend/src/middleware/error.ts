// troque esta linha:
// import { Request, Response, NextFunction } from "express";

// por:
import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err?.status ?? 500;
  const code =
    err?.code ??
    (status === 401
      ? "UNAUTHORIZED"
      : status === 403
      ? "FORBIDDEN"
      : "INTERNAL");
  const message = err?.message ?? "Internal error";
  res.status(status).json({ error: { code, message } });
}
