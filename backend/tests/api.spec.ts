import request from 'supertest'
import app from '../src/index.js'
import { load, save } from '../src/lib/db.js'

describe('API P0', () => {
  it('GET /config', async () => {
    const r = await request(app).get('/config')
    expect(r.status).toBe(200)
    expect(r.body.storeName).toBeTruthy()
  })

  it('POST /config - validação', async () => {
    const r = await request(app).post('/config').send({})
    expect(r.status).toBe(400)
    expect(r.body.error).toBeTruthy()
  })

  it('GET /products', async () => {
    const r = await request(app).get('/products')
    expect(r.status).toBe(200)
    expect(Array.isArray(r.body)).toBe(true)
  })

  it('POST /products/bulk', async () => {
    const r = await request(app).post('/products/bulk').send([
      { name:'Novo', price: 10.5 },
      { name:'Outro', price: 5.0, available: true }
    ])
    expect(r.status).toBe(201)
    expect(r.body.count).toBe(2)
  })

  it('POST /orders -> cria', async () => {
    const db = load()
    const p = db.products[0]
    const r = await request(app).post('/orders').send({ items: [{ productId: p.id, qty: 2, price: p.price }] })
    expect(r.status).toBe(201)
    expect(r.body.id).toBeTruthy()
  })

  it('GET /orders', async () => {
    const r = await request(app).get('/orders')
    expect(r.status).toBe(200)
    expect(Array.isArray(r.body)).toBe(true)
  })

  it('PATCH /orders/:id', async () => {
    const db = load()
    const id = db.orders[0]?.id
    expect(id).toBeTruthy()
    const r = await request(app).patch(`/orders/${id}`).send({ status: 'paid' })
    expect(r.status).toBe(200)
    expect(r.body.status).toBe('paid')
  })

  it('POST /auth/login -> token', async () => {
    const r = await request(app).post('/auth/login').send({ email:'admin@local', password:'admin123' })
    expect(r.status).toBe(200)
    expect(r.body.token).toBeTruthy()
  })

  it('GET /auth/me -> require token', async () => {
    const login = await request(app).post('/auth/login').send({ email:'admin@local', password:'admin123' })
    const tok = login.body.token
    const r = await request(app).get('/auth/me').set('Authorization', 'Bearer '+tok)
    expect(r.status).toBe(200)
    expect(r.body.user.email).toBe('admin@local')
  })
})
