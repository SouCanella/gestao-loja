import { Router } from 'express'
import { z } from 'zod'
import { load, save, type Product } from '../lib/db.js'
import { uid } from '../lib/util.js'

const router = Router()

router.get('/', (_req, res)=>{
  const db = load()
  res.json(db.products)
})

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  category: z.string().optional(),
  available: z.boolean().optional(),
  rating: z.number().min(0).max(5).optional()
})

router.post('/bulk', (req, res)=>{
  const arr = z.array(productSchema).safeParse(req.body)
  if(!arr.success){
    return res.status(400).json({ error: { code:'INVALID_BODY', message:'Lista inválida', details: arr.error.flatten() } })
  }
  const db = load()
  const incoming = arr.data as Product[]
  for (const p of incoming){
    if(!p.id) p.id = uid('p')
    const idx = db.products.findIndex(x=>x.id===p.id)
    if(idx>=0) db.products[idx] = { ...db.products[idx], ...p }
    else db.products.push(p)
  }
  save(db)
  res.status(201).json({ count: incoming.length })
})

export default router
