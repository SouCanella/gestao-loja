// backend/src/routes/auth.ts
import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { sign, auth } from "../middleware/auth.js";

const router = Router();

const LoginSchema = z.object({
  username: z.string().min(1),
  // opcional: força papel; se não vier, inferimos: 'admin' => Admin, senão Operacional
  role: z.enum(["Admin", "Operacional"]).optional()
});

// POST /auth/login -> emite JWT simples para testes
router.post("/login", (req: Request, res: Response) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid login payload", issues: parsed.error.flatten() });
  }

  const { username, role } = parsed.data;
  const inferredRole = role ?? (username.toLowerCase() === "admin" ? "Admin" : "Operacional");

  const token = sign({
    sub: username,
    name: username,
    role: inferredRole
  });

  return res.status(200).json({ access_token: token, token_type: "Bearer", role: inferredRole });
});

// GET /auth/me -> requer auth, devolve claims
router.get("/me", auth, (req: Request, res: Response) => {
  // @ts-expect-error injeção feita pelo middleware
  const user = req.user ?? null;
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  return res.status(200).json(user);
});

export default router;
