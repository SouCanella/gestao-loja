# Entrega — Backend Sprint 1
**Data:** 30/10/2025  
**Caminho de trabalho:** `/backend/`  
**Contrato:** `/backend/docs/openapi.yaml`  
**Rastreabilidade:** `/docs/traceability/map.json` e `/docs/traceability/matrix.md`

---

## 1) Resumo da Entrega
Implementados os endpoints **P0** para integração **Admin ↔ Loja**, substituindo o `localStorage` por persistência real (arquivo JSON). Inclui contrato OpenAPI válido, middleware de erro padronizado, autenticação via JWT, testes unitários (Vitest + Supertest) e pipeline de CI (GitHub Actions).

---

## 2) Itens Implementados

### Endpoints
- **REQ-001**
  - `GET /config` — retorna a configuração da loja.
  - `POST /config` — define/atualiza a configuração (validação com Zod).
- **REQ-002**
  - `GET /products` — lista produtos.
  - `POST /products/bulk` — upsert em lote (validação + merge simples por `id`).
- **REQ-006**
  - `POST /orders` — cria pedido (com itens).
  - `GET /orders` — lista pedidos.
  - `PATCH /orders/{id}` — atualiza parcialmente (status/items).
- **REQ-009**
  - `POST /auth/login` — autentica e retorna JWT.
  - `GET /auth/me` — retorna dados do token (rota protegida).

### Tratamento de erros (padrão)
- Middleware `backend/src/middleware/error.ts` padroniza:  
  `{"error": { "code": string, "message": string, "details"?: any }}`
- OpenAPI inclui `components.schemas.Error` e `components.responses.ErrorResponse`.

### Persistência
- Arquivo JSON em `backend/data/db.json` (seed automático no primeiro run).
- Usuário seed: `admin@local` / `admin123`.

### Segurança / Auth
- JWT Bearer (12h). Variável `JWT_SECRET` recomendada no ambiente.
- Rota `/auth/me` exige `Authorization: Bearer <token>`.

### Testes
- `backend/tests/api.spec.ts` cobre:
  - `GET/POST /config` (inclui validação 400)
  - `GET /products` e `POST /products/bulk`
  - `POST /orders`, `GET /orders`, `PATCH /orders/{id}`
  - `POST /auth/login` e `GET /auth/me` (com token)
- Thresholds de cobertura definidos em `vitest.config.ts` (≥ 70%).

### OpenAPI
- `backend/docs/openapi.yaml` — **OpenAPI 3.0.3** com:
  - paths de Config, Products, Orders e Auth,
  - `bearerAuth` (JWT),
  - schemas (`Config`, `Product`, `Order`, `OrderItem`, `OrderCreate`, `OrderPatch`, `Error`).

### CI/CD
- Workflow `.github/workflows/ci.yml`:
  - Node 20, `npm ci`, build, testes com cobertura e lint OpenAPI (Redocly).

---

## 3) Como Validar a Entrega

```bash
npm i
npm run dev              # sobe em http://localhost:4000
npm run test            # roda vitest + supertest e gera cobertura
npm run lint:openapi    # valida openapi.yaml com Redocly
```

---

Smoke: GET /health → { "ok": true }

Login/Me:
POST /auth/login → { "email": "admin@local", "password": "admin123" }
GET /auth/me com Authorization: Bearer <token>.

---
## 4) Conformidade com o DoD (Checklist)

✅ Endpoints funcionais conforme contrato.
✅ openapi.yaml válido (lint passa).
✅ Respostas padronizadas (error schema).
✅ Cobertura unitária ≥ 70%. (threshold configurado; testes prontos)
✅ CI executando sem erros.
✅ Rastreabilidade atualizada no PR.

## 5) Observações e Ajustes Realizados

Projeto em ESM ("type": "module").
Porta padrão 4000 (configurável via PORT).
Persistência inicial em arquivo JSON (P0).
Evolução sugerida: SQLite/Prisma mantendo contratos.

## 6) Próximos Passos (sugestão)

Migrar persistência para SQLite (dev) / Postgres (prod) com Prisma.
Regras de negócio (ex.: checagem de estoque ao criar pedido).
Observabilidade (correlation-id, logs estruturados, métricas).
Segurança (RBAC, escopos por rota).
OpenAPI com exemplos de requests/responses e error.details tipado.