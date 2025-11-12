import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../../src/index'

describe('API integration', () => {
  it('GET /health -> 200', async () => {
    const r = await request(app).get('/health')
    expect(r.status).toBe(200)
    expect(r.body).toEqual({ ok: true })
  })
})
