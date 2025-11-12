import { Router } from "express";
import type { Request, Response } from "express";
import { z } from 'zod'

const router = Router()

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  cost: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  category: z.string().optional(),
  active: z.boolean().optional()
})

router.get('/', (req, res) => {
  const limit = Math.min(parseInt(String((req.query as any).limit ?? '50')), 100)
  const offset = Math.max(parseInt(String((req.query as any).offset ?? '0')), 0)
  return res.json({ items: [], meta: { total: 0, limit, offset } })
})

router.post('/bulk', (req, res) => {
  const parsed = z.array(productSchema).safeParse(req.body)
  if (!parsed.success) {
    const issues = parsed.error.issues?.map(i => ({ path: i.path, message: i.message, code: i.code }))
    return res.status(400).json({ error: { code:'INVALID_BODY', message:'Lista inválida', issues } })
  }
  const inserted = parsed.data.length
  return res.status(201).json({ count: inserted, inserted, updated: 0 })
})

export default router
