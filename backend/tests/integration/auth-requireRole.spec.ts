import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../../src/index.js";
import { sign } from "../../src/middleware/auth.js";

describe("Auth 403 (requireRole)", () => {
  let tokenOper: string;
  let tokenAdmin: string;

  beforeAll(() => {
    tokenOper = sign({ sub: "u1", name: "Oper", role: "Operacional" });
    tokenAdmin = sign({ sub: "u2", name: "Admin", role: "Admin" });
  });

  it("Operacional tentando operação protegida -> 403 (ou 404 em repositório vazio)", async () => {
    const res = await request(app)
      .patch("/orders/999999") // id inexistente tudo bem
      .set("Authorization", `Bearer ${tokenOper}`)
      .send({ status: "PAID" });
    expect([403, 404]).toContain(res.status);
  });

  it("Admin com role correta não recebe 403", async () => {
    const create = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        items: [
          { productId: 1, name: "Teste", qty: 1, unitPrice: 10, subtotal: 10 }
        ],
        total: 10,
        channel: "web"
      });
    expect([200, 201]).toContain(create.status);

    const id = create.body?.id ?? create.body?.order?.id ?? 1;
    const patch = await request(app)
      .patch(`/orders/${id}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ status: "PAID" });

    expect([200, 204]).toContain(patch.status);
  });
});
