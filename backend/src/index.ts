import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler } from './middleware/error.js'
import configRouter from './routes/config.js'
import productsRouter from './routes/products.js'
import ordersRouter from './routes/orders.js'
import authRouter from './routes/auth.js'

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET ausente em produção — defina a variável de ambiente.')
}

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))
app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/config', configRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)
app.use('/auth', authRouter)
app.use(errorHandler)
export default app