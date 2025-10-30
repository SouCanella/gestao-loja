# Blueprint de Estrutura Alvo (Target) — Loja Controle

> Documento de referência para a **estrutura modular final** do repositório e o **plano de migração** a partir do starter atual.

## 1) Estrutura Alvo (Monorepo)

```
/README.md
/frontend
  /web                 # Loja (Next.js - App Router)
  /admin               # Admin (Next.js - App Router)
  /design-system       # tokens, componentes base, docs de uso
/backend
  /src                 # Fastify + módulos (produtos, insumos, receitas, produção, pedidos, clientes)
  /tests               # unit/integration (Vitest + Supertest)
  /prisma              # schema.prisma, migrations, seed
/docs
  /openapi             # contratos OAS por versão (v1, v2...)
  /traceability        # map.json e matrix.md (REQ ↔ API ↔ Testes)
  /adr                 # decisões arquiteturais (ADR-001, ADR-002...)
  /handbook            # segurança/LGPD, RACI, operação, analytics
/qa
  /api                 # Behavex/Pytest ou Newman suites (sucesso + erro)
  /e2e                 # Playwright (smoke loja/admin)
/devops
  /docker              # Dockerfiles, compose(s) ambientes
  /ci                  # pipelines (GitHub Actions/GitLab CI)
/database
  /scripts             # utilitários (seed extra, dumps, migrações especiais)
```

> Nota: **Prisma** continua dono de `schema.prisma` + `migrations/` em `/backend/prisma`. A pasta `/database` é para *scripts auxiliares* (importações, dumps, jobs).

---

## 2) Owners (RACI) por pasta

| Pasta                | R | A | C | I |
|----------------------|---|---|---|---|
| `/frontend/web`      | Frontend | CPA | QA, PO | DevOps |
| `/frontend/admin`    | Frontend | CPA | QA, PO | DevOps |
| `/frontend/design-system` | Frontend | CPA | PO, QA | Back |
| `/backend`           | Backend | CPA | QA, Front, DevOps | PO |
| `/docs`              | CPA/PO | CPA | Todas | Todos |
| `/qa`                | QA | CPA | Front, Back | DevOps |
| `/devops`            | DevOps | CPA | Back, Front | PO |
| `/database`          | Backend | CPA | DevOps | QA |

---

## 3) Plano de Migração (Starter → Alvo)

### Fase A — Documentação & Contratos
- [ ] Mover `backend/docs/openapi.yaml` → `/docs/openapi/openapi.yaml`.
- [ ] Criar `/docs/traceability/map.json` e `/docs/traceability/matrix.md` (iniciar com REQ-PROD-001).
- [ ] ADR-001 (Stack oficial) e ADR-002 (Padrão de validação/erros).

### Fase B — Frontend Modular
- [ ] Extrair `/frontend/app` em `/frontend/web` e `/frontend/admin`.
- [ ] Criar `/frontend/design-system` (tokens + Button, Card, Input).
- [ ] Configurar testes ≥90% por app.

### Fase C — Qualidade e QA
- [ ] Criar `/qa/api` (sucesso + 400/404/409) para Produtos.
- [ ] Criar `/qa/e2e` (Playwright smoke: loja lista + admin cria).
- [ ] Amarrar rastreabilidade no `map.json`.

### Fase D — DevOps & CI
- [ ] Mover `docker-compose.yml` → `/devops/docker/compose.dev.yml` (+ script na raiz).
- [ ] Criar `/devops/ci` com pipeline (lint + test + coverage gates + build).
- [ ] Adicionar Spectral para lint do OpenAPI.

### Fase E — Database & Seeds
- [ ] Manter Prisma em `/backend/prisma` (migrations + seed).
- [ ] Adicionar `/database/scripts/seed-extra.sql` (opcional).
- [ ] Política de migração: `dev → qa` com testes + seed.

---

## 4) Quality Gates (confirmados)
- **API:** 100% dos casos mapeados (sucesso + erros) por endpoint; cobertura global ≥95%.
- **Frontend:** cobertura ≥90% por app (`web`, `admin`).
- **E2E:** smoke obrigatório rodando em PRs com mudança de UI/API.
- **Docs:** PR exige OAS atualizado + rastreabilidade consistente.

---

## 5) Convenções de IDs
- REQ: `REQ-<MOD>-NNN` (ex.: `REQ-PROD-001`)
- API: `API-<MOD>-VERBO` (ex.: `API-PROD-POST`)
- TAPI: `TAPI-<MOD>-NNN`
- TFRONT: `TFRONT-<APP>-NNN`
- TE2E: `TE2E-<FLUXO>-NNN`

---

## 6) DoD (Definition of Done) — por módulo
- Rotas implementadas + OpenAPI + testes (unit/integration/API/E2E) + rastreabilidade atualizada.
- Migrations versionadas e seed consistentes.
- Checklist LGPD e Operação revisados.

---

## 7) Roadmap Trimestral (alto nível)
1. Mês 1 — Produtos (API + Web/Admin) + docs + trace + E2E smoke.
2. Mês 2 — Insumos/Receitas + Produção (transações) + Design System.
3. Mês 3 — Pedidos/Clientes + Relatórios + CI completo e deploy QA.
