# Rastreabilidade — Sprint 1

| Requisito | Endpoints | Código | Testes | OpenAPI |
|---|---|---|---|---|
| REQ-001 | GET /config, POST /config | backend/src/routes/config.ts; backend/src/middleware/error.ts; backend/src/lib/db.ts | backend/tests/api.spec.ts | backend/docs/openapi.yaml |
| REQ-002 | GET /products, POST /products/bulk | backend/src/routes/products.ts; backend/src/middleware/error.ts; backend/src/lib/db.ts; backend/src/lib/util.ts | backend/tests/api.spec.ts | backend/docs/openapi.yaml |
| REQ-006 | POST /orders, GET /orders, PATCH /orders/{id} | backend/src/routes/orders.ts; backend/src/middleware/error.ts; backend/src/lib/db.ts; backend/src/lib/util.ts | backend/tests/api.spec.ts | backend/docs/openapi.yaml |
| REQ-009 | POST /auth/login, GET /auth/me | backend/src/routes/auth.ts; backend/src/middleware/auth.ts; backend/src/middleware/error.ts; backend/src/lib/db.ts | backend/tests/api.spec.ts | backend/docs/openapi.yaml |

**Esquema de erro padrão**: todos os endpoints retornam `{"error": { code, message, details? }}` para 4xx/5xx.
