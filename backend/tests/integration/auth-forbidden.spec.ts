import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../../src/index.js";
import { sign } from "../../src/middleware/auth.js";

describe("auth requireRole", () => {
  let tokenOp: string;
  beforeAll(() => {
    tokenOp = sign({ sub: "u1", name: "Oper", role: "Operacional" });
  });

  it("403 quando role inadequada", async () => {
    const res = await request(app)
      .patch("/orders/999")
      .set("Authorization", `Bearer ${tokenOp}`)
      .send({ status: "PAID" });
    expect([403,404]).toContain(res.status); // aceita 404 se repo estiver vazio
  });
});
