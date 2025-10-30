import { describe, it, expect } from 'vitest';
import request from 'supertest';
import Fastify from 'fastify';
import { productsRoutes } from '../src/routes/products.js';

async function build() {
  const app = Fastify();
  await app.register(productsRoutes, { prefix: '/products' });
  return app;
}

describe('Products API', () => {
  it('lists products (should be 200)', async () => {
    const app = await build();
    const res = await request(app.server).get('/products');
    expect(res.status).toBe(200);
  });
});
