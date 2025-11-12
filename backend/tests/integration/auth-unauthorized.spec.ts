import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/index.js";

describe("Auth 401", () => {
  it("GET /orders sem Authorization -> 401", async () => {
    const res = await request(app).get("/orders");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("GET /orders com token inválido -> 401", async () => {
    const res = await request(app)
      .get("/orders")
      .set("Authorization", "Bearer xxx.yyy.zzz");
    expect(res.status).toBe(401);
  });
});
