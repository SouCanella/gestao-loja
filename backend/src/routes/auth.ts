import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

type User = { id: string; email: string; password?: string };

/** POST /auth/login – login simples (stub) */
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};
  const user: User | null =
    email === "admin@admin.com" ? { id: "1", email, password: "admin" } : null;

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET ?? "changeme", {
    expiresIn: "1h",
  });

  res.json({ token });
});

/** GET /auth/me – retorna dados do usuário (stub) */
router.get("/me", (_req: Request, res: Response) => {
  // TODO: extrair user do token (middleware) e buscar no DB
  res.json({ id: "1", email: "admin@admin.com", role: "admin" });
});

export default router;
