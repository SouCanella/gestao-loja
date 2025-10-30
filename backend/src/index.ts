import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler } from './middleware/error.js'
import configRouter from './routes/config.js'
import productsRouter from './routes/products.js'
import ordersRouter from './routes/orders.js'
import authRouter from './routes/auth.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req, res)=> res.json({ ok: true }))

app.use('/config', configRouter)
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)
app.use('/auth', authRouter)

app.use(errorHandler)

const port = process.env.PORT || 4000
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, ()=> console.log(`API on http://localhost:${port}`))
}
export default app
