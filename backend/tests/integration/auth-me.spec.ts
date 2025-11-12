import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../../src/index.js";

async function login(username = "admin", role?: "Admin" | "Operacional") {
  const res = await request(app).post("/auth/login").send({ username, role });
  return res.body.access_token as string;
}

describe("Auth /auth/me", () => {
  it("401 - sem token", async () => {
    const res = await request(app).get("/auth/me");
    expect(res.status).toBe(401);
  });

  it("200 - com token válido", async () => {
    const token = await login("maria", "Operacional");
    const res = await request(app).get("/auth/me").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("sub", "maria");
    expect(res.body).toHaveProperty("role", "Operacional");
  });
});
