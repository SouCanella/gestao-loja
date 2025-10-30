import { Router } from 'express'
import { z } from 'zod'
import { load, save, type Product } from '../lib/db.js'
import { uid } from '../lib/util.js'
const r = Router()
r.get('/', (req,res)=>{ const db=load(); const limit=Math.min(parseInt(String((req.query as any).limit??'50')),100); const offset=Math.max(parseInt(String((req.query as any).offset??'0')),0); const items=db.products.slice(offset,offset+limit); res.json({items, meta:{total:db.products.length, limit, offset}})})
const product=z.object({ id:z.string().optional(), name:z.string().min(1), price:z.number().nonnegative(), description:z.string().optional(), category:z.string().optional(), available:z.boolean().optional(), rating:z.number().min(0).max(5).optional() })
r.post('/bulk',(req,res)=>{ const arr=z.array(product).safeParse(req.body); if(!arr.success){ const issues=arr.error.issues?.map(i=>({path:i.path,message:i.message,code:i.code})); return res.status(400).json({error:{code:'INVALID_BODY',message:'Lista inválida',issues}})} const db=load(); const draft=structuredClone(db); let ins=0, up=0; for(const p0 of arr.data as Product[]){ const p={...p0}; if(!p.id) p.id=uid('p'); const idx=draft.products.findIndex(x=>x.id===p.id); if(idx>=0){ draft.products[idx]={...draft.products[idx],...p}; up++ } else { draft.products.push(p); ins++ } } save(draft); res.status(201).json({count: (arr.data as Product[]).length, inserted: ins, updated: up}) })
export default r