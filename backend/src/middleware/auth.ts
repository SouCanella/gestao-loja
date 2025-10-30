import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
const SECRET = process.env.JWT_SECRET || 'dev-secret'
export function sign(payload: object){ return jwt.sign(payload, SECRET, { expiresIn: '12h' }) }
export function auth(req: Request, res: Response, next: NextFunction){
  const h = req.headers.authorization || ''
  const t = h.startsWith('Bearer ') ? h.slice(7) : ''
  if(!t) return res.status(401).json({ error: { code:'UNAUTHORIZED', message:'Token ausente' } })
  try{ (req as any).user = jwt.verify(t, SECRET); next() }catch{ return res.status(401).json({ error:{ code:'UNAUTHORIZED', message:'Token inválido' }}) }
}
export function requireRole(...roles: Array<'Admin'|'Operacional'|'Financeiro'>){
  return (req: Request, res: Response, next: NextFunction)=>{
    const u:any = (req as any).user
    if(!u) return res.status(401).json({ error:{ code:'UNAUTHORIZED', message:'Token ausente'}})
    if(!roles.includes(u.role)) return res.status(403).json({ error:{ code:'FORBIDDEN', message:'Sem permissão'}})
    next()
  }
}