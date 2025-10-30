import { Router } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { load } from '../lib/db.js'
import { sign, auth } from '../middleware/auth.js'

const router = Router()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3)
})

router.post('/login', async (req, res)=>{
  const parsed = loginSchema.safeParse(req.body)
  if(!parsed.success){
    return res.status(400).json({ error: { code:'INVALID_BODY', message:'Credenciais inválidas', details: parsed.error.flatten() } })
  }
  const db = load()
  const user = db.users.find(u=>u.email===parsed.data.email)
  if(!user) return res.status(401).json({ error: { code:'UNAUTHORIZED', message:'Usuário ou senha inválidos' } })
  const ok = await bcrypt.compare(parsed.data.password, user.passwordHash)
  if(!ok) return res.status(401).json({ error: { code:'UNAUTHORIZED', message:'Usuário ou senha inválidos' } })
  const token = sign({ sub: user.id, email: user.email, role: user.role, name: user.name })
  res.json({ token })
})

router.get('/me', auth, (req, res)=>{
  const u = (req as any).user
  res.json({ user: u })
})

export default router
