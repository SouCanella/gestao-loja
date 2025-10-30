import { Router } from 'express'
import { z } from 'zod'
import { load } from '../lib/db.js'
import { sign, auth } from '../middleware/auth.js'
const r = Router()
const login=z.object({ email:z.string().email(), password:z.string().min(3) })
r.post('/login',(req,res)=>{ const parsed=login.safeParse(req.body); if(!parsed.success){ const issues=parsed.error.issues?.map(i=>({path:i.path,message:i.message,code:i.code})); return res.status(400).json({error:{code:'INVALID_BODY',message:'Credenciais inválidas',issues}})} const db=load(); const u=db.users.find(x=>x.email===parsed.data.email && x.password===parsed.data.password); if(!u) return res.status(401).json({error:{code:'UNAUTHORIZED',message:'Usuário ou senha inválidos'}}); const token=sign({ sub:u.id, email:u.email, role:u.role, name:u.name }); res.json({ token }) })
r.get('/me', auth, (req,res)=>{ res.json({ user:(req as any).user }) })
export default r