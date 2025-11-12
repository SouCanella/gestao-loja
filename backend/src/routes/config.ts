import { Router, type Request, type Response } from "express";
import { z } from "zod";

const router = Router();

// "Banco" em memória para testes
let CURRENT_CONFIG: {
  storeName: string;
  currency: string;
  whatsappNumber: string;
} | null = null;

const ConfigSchema = z.object({
  storeName: z.string().min(1),
  currency: z.string().min(3),
  whatsappNumber: z.string().min(8)
});

router.get("/", (_req: Request, res: Response) => {
  if (!CURRENT_CONFIG) return res.status(404).json({ message: "Config not found" });
  return res.status(200).json(CURRENT_CONFIG);
});

router.post("/", (req: Request, res: Response) => {
  const parse = ConfigSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid config", issues: parse.error.flatten() });
  }
  CURRENT_CONFIG = parse.data;
  return res.status(201).json(CURRENT_CONFIG);
});

export default router;
