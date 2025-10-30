import { Router } from 'express'
import { z } from 'zod'
import { load, save, type Config } from '../lib/db.js'

const router = Router()

router.get('/', (_req, res)=>{
  const db = load()
  res.json(db.config)
})

const cfgSchema = z.object({
  storeName: z.string().min(1),
  currency: z.string().min(1),
  whatsappNumber: z.string().min(8),
  theme: z.record(z.string()).optional(),
  logoUrl: z.string().url().optional(),
  businessHours: z.array(z.object({ day: z.string(), open: z.string(), close: z.string() })).optional(),
  deliveryAreas: z.array(z.string()).optional(),
  paymentMethods: z.array(z.string()).optional()
})

router.post('/', (req, res)=>{
  const parse = cfgSchema.safeParse(req.body)
  if(!parse.success){
    return res.status(400).json({ error: { code:'INVALID_BODY', message:'Corpo inválido', details: parse.error.flatten() } })
  }
  const db = load()
  db.config = parse.data as Config
  save(db)
  res.status(201).json(db.config)
})

export default router
