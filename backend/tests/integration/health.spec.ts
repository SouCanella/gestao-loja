import request from 'supertest'
import app from '../../src/index'
import { describe, it, expect } from 'vitest'

describe('GET /health', () => {
  it('deve retornar 200 e ok:true', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true })
  })
})
