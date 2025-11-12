import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../../src/index.js";
import { sign } from "../../src/middleware/auth.js";

describe("Config", () => {
  let admin: string;
  beforeAll(() => {
    admin = sign({ sub: "admin", name: "Admin", role: "Admin" });
  });

  it("POST /config 400 inválido", async () => {
    const res = await request(app)
      .post("/config")
      .set("Authorization", `Bearer ${admin}`)
      .send({ storeName: "", currency: "BRL", whatsappNumber: "abc" });
    expect(res.status).toBe(400);
  });

  it("POST /config 201 válido e GET /config 200", async () => {
    const res = await request(app)
      .post("/config")
      .set("Authorization", `Bearer ${admin}`)
      .send({ storeName: "DiDoces", currency: "BRL", whatsappNumber: "5599999999999" });
    expect([200, 201]).toContain(res.status);

    const getRes = await request(app)
      .get("/config")
      .set("Authorization", `Bearer ${admin}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body).toHaveProperty("storeName");
  });
});
