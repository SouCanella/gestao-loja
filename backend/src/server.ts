import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { productsRoutes } from './routes/products.js';

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

await app.register(swagger, {
  openapi: {
    info: { title: 'Loja Controle API', version: '1.0.0' }
  }
});
await app.register(swaggerUI, { routePrefix: '/docs' });

app.get('/health', async () => ({ ok: true }));

await app.register(productsRoutes, { prefix: '/products' });

const port = Number(process.env.PORT || 3001);
app.listen({ port, host: '0.0.0.0' }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
