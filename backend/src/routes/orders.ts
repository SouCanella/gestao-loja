import { Router, Request, Response } from "express";

const router = Router();

/** POST /orders – cria pedido (stub) */
router.post("/", (req: Request, res: Response) => {
  const order = { id: "ord_1", ...req.body };
  // TODO: persistir no DB
  res.status(201).json(order);
});

/** GET /orders – lista pedidos (mock) */
router.get("/", (_req: Request, res: Response) => {
  res.json([{ id: "ord_1", total: 15.0 }]);
});

/** PATCH /orders/:id – atualiza parcialmente (stub) */
router.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: aplicar patch no DB
  res.json({ id, patch: req.body });
});

export default router;
