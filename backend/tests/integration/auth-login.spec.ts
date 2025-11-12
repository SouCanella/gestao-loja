import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../../src/index.js";

describe("Auth /auth/login", () => {
  it("200 - login com username=admin infere role=Admin", async () => {
    const res = await request(app).post("/auth/login").send({ username: "admin" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token");
    expect(res.body.role).toBe("Admin");
  });

  it("200 - login com username comum infere role=Operacional", async () => {
    const res = await request(app).post("/auth/login").send({ username: "joao" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token");
    expect(res.body.role).toBe("Operacional");
  });

  it("200 - login com role explícita sobrescreve inferência", async () => {
    const res = await request(app).post("/auth/login").send({ username: "joao", role: "Admin" });
    expect(res.status).toBe(200);
    expect(res.body.role).toBe("Admin");
  });

  it("400 - payload inválido", async () => {
    const res = await request(app).post("/auth/login").send({}); // sem username
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
