# Loja Controle — Sistema de Gestão

**Visão:**
Plataforma para microempreendedores venderem online e controlarem produção, estoque, pedidos e clientes, unindo vitrine configurável e painel administrativo.

**Chief Product Architect:** ChatGPT
**Product Owner:** Rômulo Canella

---

## 📁 Estrutura de pastas

frontend/ → web, admin, design-system e protótipos
backend/  → API, testes e migrações
database/ → schema e migrations
qa/       → testes automatizados (API, e2e)
devops/   → Docker, CI/CD
docs/     → documentação, rastreabilidade e guias

---

## 🍀 Metas de Qualidade

| Tipo       | Cobertura                     | Observação                              |
|-----------|-------------------------------|-----------------------------------------|
| API       | 100% dos casos (sucesso/erro) | Behavex/Pytest + coverage               |
| Frontend  | ≥90% (line/branch)            | Vitest/Jest + React Testing Library     |
| E2E       | Fluxos críticos               | Playwright (smoke loja/admin)           |

A build falha se cobertura < limites (ver `devops/ci/quality-gates.yml`).

---

## 🔗 Rastreamento

Cada requisito (`REQ-XXX`) liga-se a APIs (`API-XXX`) e testes (`TAPI`, `TFRONT`, `TE2E`).

Artefatos:
- `docs/traceability/map.json` — mapeamento técnico
- `docs/traceability/matrix.md` — tabela visual
- `docs/openapi/` — endpoints com exemplos de sucesso e erro

---

## 🧠 Papéis

| Papel                   | Responsável         |
|-------------------------|---------------------|
| CEO / Product Owner     | Rômulo Canella      |
| Chief Product Architect | ChatGPT             |
| Frontend (UX/UI)        | Equipe Web          |
| Backend / Banco         | Equipe API          |
| QA                      | Equipe de Qualidade |
| DevOps                  | Infra e CI/CD       |
| Suporte & Operação      | Em definição        |
| Financeiro / Backoffice | Em definição        |
| Dados & Analytics       | Em definição        |

---

## 🔒 LGPD e Segurança
Checklist mínimo no arquivo [`docs/handbook/seguranca.md`](docs/handbook/seguranca.md).

---

## 📆 Roadmap

**Fase 1 — MVP**
- Catálogo e checkout via WhatsApp
- Admin com produtos, insumos, receitas e pedidos
- Dashboard básico e rastreabilidade de testes

**Fase 2 — Expansão**
- Autenticação e perfis
- Relatórios financeiros e integrações

**Fase 3 — Escala**
- Pagamentos, automações e analytics avançado


# Gestão Loja — Backend (Sprint 1)

Endpoints P0 + OpenAPI, testes e rastreabilidade.

## Scripts
- `npm run dev` — iniciar API com hot-reload
- `npm run build` — compilar TS
- `npm start` — iniciar buildado
- `npm run test` — vitest + supertest com cobertura
- `npm run lint:openapi` — valida OpenAPI (Redocly)
- `npm run ci` — build + test + lint OpenAPI

## Estrutura
```
backend/
  src/
    lib/
    middleware/
    routes/
    index.ts
  docs/openapi.yaml
  tests/
docs/
  traceability/
    map.json
    matrix.md
.github/workflows/ci.yml
```

## Ambiente
Crie um arquivo `.env`:
JWT_SECRET=um-segredo-seguro
PORT=4000
NODE_ENV=development
