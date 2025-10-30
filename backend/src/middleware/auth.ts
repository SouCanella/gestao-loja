import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { load } from '../lib/db.js'

const SECRET = process.env.JWT_SECRET || 'dev-secret'

export function sign(payload: object){
  return jwt.sign(payload, SECRET, { expiresIn: '12h' })
}

export function auth(req: Request, res: Response, next: NextFunction){
  const h = req.headers.authorization || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : null
  if(!token){ return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Missing token' } }) }
  try{
    const data = jwt.verify(token, SECRET) as any
    ;(req as any).user = data
    next()
  }catch{
    res.status(401).json({ error: { code:'UNAUTHORIZED', message: 'Invalid token' } })
  }
}

export function meFromDb(email: string){
  const db = load()
  return db.users.find(u=>u.email===email) || null
}
