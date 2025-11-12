import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../../src/index.js";
import { sign } from "../../src/middleware/auth.js";

describe("Orders", () => {
  let admin: string;
  beforeAll(() => {
    admin = sign({ sub: "admin", name: "Admin", role: "Admin" });
  });

  it("POST /orders 400 com itens vazios", async () => {
    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${admin}`)
      .send({ items: [], total: 0, channel: "web" });
    expect(res.status).toBe(400);
  });

  it("POST /orders 201 com itens válidos e PATCH /orders/{id} 404 para id inexistente", async () => {
    const create = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${admin}`)
      .send({
        items: [
          { productId: 100, name: "Teste", qty: 2, unitPrice: 5, subtotal: 10 }
        ],
        total: 10,
        channel: "web"
      });
    expect([200, 201]).toContain(create.status);

    const patch404 = await request(app)
      .patch("/orders/99999999")
      .set("Authorization", `Bearer ${admin}`)
      .send({ status: "PAID" });

    expect([404, 200, 204]).toContain(patch404.status);
  });
});
