import type { Request, Response, NextFunction } from 'express'

export class AppError extends Error {
  status: number
  code: string
  details?: unknown
  constructor(status: number, code: string, message: string, details?: unknown){
    super(message); this.status=status; this.code=code; this.details=details
  }
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction){
  const status = err?.status ?? 500
  const code = err?.code ?? 'INTERNAL_ERROR'
  const message = err?.message ?? 'Erro interno'
  const details = err?.details
  res.status(status).json({ error: { code, message, details } })
}
