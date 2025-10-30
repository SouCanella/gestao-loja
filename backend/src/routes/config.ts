import { Router, Request, Response } from "express";

const router = Router();

/** GET /config – retorna config atual (mock) */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    storeName: "DiDoces",
    currency: "BRL",
    whatsappNumber: "+55XXXXXXXXXXX",
  });
});

/** POST /config – atualiza config (stub) */
router.post("/", (req: Request, res: Response) => {
  // TODO: validar (zod) e salvar no DB
  res.status(200).json({ ok: true, saved: req.body });
});

export default router;
