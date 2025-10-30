import { Router } from 'express'
import { z } from 'zod'
import { load, save, type Config } from '../lib/db.js'
const r = Router()
const schema = z.object({ storeName:z.string().min(1), currency:z.string().min(1), whatsappNumber:z.string().min(8) })
r.get('/', (_req,res)=>{ const db=load(); res.json(db.config) })
r.post('/', (req,res)=>{ const parsed=schema.safeParse(req.body); if(!parsed.success){ const issues=parsed.error.issues?.map(i=>({path:i.path,message:i.message,code:i.code})); return res.status(400).json({error:{code:'INVALID_BODY',message:'Corpo inválido',issues}})} const db=load(); db.config=parsed.data as Config; save(db); res.status(201).json(db.config) })
export default r