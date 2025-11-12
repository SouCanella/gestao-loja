import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/index.js";
import { sign } from "../../src/middleware/auth.js";

const admin = sign({ sub: "admin", name: "Admin", role: "Admin" });

describe("products bulk", () => {
  it("400 item inválido", async () => {
    const res = await request(app)
      .post("/products/bulk")
      .set("Authorization", `Bearer ${admin}`)
      .send([{ name: "X", price: -1, cost: 1, stock: 0 }]);
    expect([400,409]).toContain(res.status);
  });

  it("201 items válidos", async () => {
    const res = await request(app)
      .post("/products/bulk")
      .set("Authorization", `Bearer ${admin}`)
      .send([
        { name: "Açaí 120ml", price: 7.9, cost: 3.2, stock: 10 },
        { name: "Coco 180ml", price: 8.9, cost: 3.8, stock: 8 }
      ]);
    expect([200,201]).toContain(res.status);
  });
});
