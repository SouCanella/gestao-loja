import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const productBody = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.coerce.number().nonnegative(),
  cost: z.coerce.number().nonnegative(),
  stock: z.coerce.number().int().nonnegative().default(0)
});

export async function productsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const items = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    return items;
  });

  app.get('/:id', async (req, reply) => {
    const id = (req.params as any).id as string;
    const item = await prisma.product.findUnique({ where: { id } });
    if (!item) return reply.code(404).send({ message: 'Product not found' });
    return item;
  });

  app.post('/', async (req, reply) => {
    const parsed = productBody.safeParse(req.body);
    if (!parsed.success) return reply.code(400).send({ message: 'Invalid body', issues: parsed.error.flatten() });
    const created = await prisma.product.create({ data: parsed.data });
    return reply.code(201).send(created);
  });

  app.put('/:id', async (req, reply) => {
    const id = (req.params as any).id as string;
    const parsed = productBody.partial().safeParse(req.body);
    if (!parsed.success) return reply.code(400).send({ message: 'Invalid body', issues: parsed.error.flatten() });
    try {
      const updated = await prisma.product.update({ where: { id }, data: parsed.data });
      return updated;
    } catch {
      return reply.code(404).send({ message: 'Product not found' });
    }
  });

  app.delete('/:id', async (req, reply) => {
    const id = (req.params as any).id as string;
    try {
      await prisma.product.delete({ where: { id } });
      return reply.code(204).send();
    } catch {
      return reply.code(404).send({ message: 'Product not found' });
    }
  });
}
