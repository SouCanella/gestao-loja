import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { requireRole } from "../middleware/auth.js";

const router = Router();

// Mini storage em memória pro teste
type OrderItem = { productId: number; name: string; qty: number; unitPrice: number; subtotal: number };
type Order = { id: number; items: OrderItem[]; total: number; channel: string; status?: string };
const ORDERS = new Map<number, Order>();
let SEQ = 1;

// Schemas alinhados aos payloads dos testes
const OrderItemSchema = z.object({
  productId: z.number().int(),
  name: z.string().min(1),
  qty: z.number().int().positive(),
  unitPrice: z.number().positive(),
  subtotal: z.number().nonnegative()
});

const OrderCreateSchema = z.object({
  items: z.array(OrderItemSchema).min(1),
  total: z.number().positive(),
  channel: z.string().min(1)
});

const OrderPatchSchema = z.object({
  status: z.string().min(1)
});

// GET /orders (apenas para existir e ser protegido)
router.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({ count: ORDERS.size });
});

// POST /orders cria pedido válido
router.post("/", (req: Request, res: Response) => {
  const parse = OrderCreateSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid order", issues: parse.error.flatten() });
  }
  const id = SEQ++;
  const order: Order = { id, ...parse.data };
  ORDERS.set(id, order);
  return res.status(201).json(order);
});

// PATCH /orders/:id exige Admin
router.patch("/:id", requireRole("Admin"), (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!ORDERS.has(id)) return res.status(404).json({ message: "Order not found" });

  const parse = OrderPatchSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid patch", issues: parse.error.flatten() });
  }
  const updated = { ...ORDERS.get(id)!, status: parse.data.status };
  ORDERS.set(id, updated);
  return res.status(200).json(updated);
});

export default router;
