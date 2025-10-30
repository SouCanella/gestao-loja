import { Router } from 'express'
import { z } from 'zod'
import { load, save, type Order } from '../lib/db.js'
import { uid } from '../lib/util.js'

const router = Router()

router.get('/', (_req, res)=>{
  const db = load()
  res.json(db.orders)
})

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    qty: z.number().int().positive(),
    price: z.number().nonnegative()
  })).min(1)
})

router.post('/', (req, res)=>{
  const parsed = orderSchema.safeParse(req.body)
  if(!parsed.success){
    return res.status(400).json({ error: { code: 'INVALID_BODY', message: 'Corpo inválido', details: parsed.error.flatten() } })
  }
  const db = load()
  const order: Order = { id: uid('o'), createdAt: new Date().toISOString(), status: 'open', items: parsed.data.items }
  db.orders.push(order)
  save(db)
  res.status(201).json(order)
})

router.patch('/:id', (req, res)=>{
  const id = req.params.id
  const patchSchema = z.object({
    status: z.enum(['open','paid','cancelled']).optional(),
    items: z.array(z.object({ productId: z.string(), qty: z.number().int().positive(), price: z.number().nonnegative() })).optional()
  }).refine(data => Object.keys(data).length > 0, { message: 'Patch vazio' })
  const parsed = patchSchema.safeParse(req.body)
  if(!parsed.success){
    return res.status(400).json({ error: { code: 'INVALID_BODY', message: 'Corpo inválido', details: parsed.error.flatten() } })
  }
  const db = load()
  const ord = db.orders.find(o=>o.id===id)
  if(!ord) return res.status(404).json({ error: { code:'NOT_FOUND', message:'Pedido não encontrado' } })
  Object.assign(ord, parsed.data)
  save(db)
  res.json(ord)
})

export default router
