import { Router, Request, Response } from "express";

const router = Router();

/** GET /products – lista simples (mock) */
router.get("/", (_req: Request, res: Response) => {
  res.json([{ id: 1, name: "Sacolé Morango", price: 7.5 }]);
});

/** POST /products/bulk – cria em lote (stub) */
router.post("/bulk", (req: Request, res: Response) => {
  const items = Array.isArray(req.body) ? req.body : [];
  // TODO: persistir no DB
  res.status(201).json({ created: items.length });
});

export default router;
