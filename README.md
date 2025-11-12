# Loja Controle — Sistema de Gestão

**Visão:**
Plataforma para microempreendedores venderem online e controlarem produção, estoque, pedidos e clientes, unindo vitrine configurável e painel administrativo.

**Chief Product Architect:** ChatGPT  
**Product Owner:** Rômulo Canella

---

## 📁 Estrutura de pastas

| Pasta | Descrição |
|-------|------------|
| `frontend/` | Web, admin, design-system e protótipos |
| `backend/` | API, testes e migrações |
| `database/` | Schema e migrations |
| `qa/` | Testes automatizados (API, e2e) |
| `devops/` | Docker, CI/CD |
| `docs/` | Documentação, rastreabilidade e guias |

---

## 🍀 Metas de Qualidade

| Tipo | Cobertura | Observação |
|------|------------|------------|
| API | 100% dos casos (sucesso/erro) | Vitest + Supertest + coverage |
| Frontend | ≥90% (line/branch) | Vitest / Jest + React Testing Library |
| E2E | Fluxos críticos | Playwright (smoke loja/admin) |

A build falha se a cobertura ficar abaixo dos limites definidos em `devops/ci/quality-gates.yml`.

---

## 🔗 Rastreamento

Cada requisito (`REQ-XXX`) liga-se a APIs (`API-XXX`) e testes (`TAPI`, `TFRONT`, `TE2E`).

**Artefatos principais:**
- `docs/traceability/map.json` — mapeamento técnico  
- `docs/traceability/matrix.md` — tabela visual  
- `docs/openapi/` — endpoints com exemplos de sucesso e erro

---

## 🧠 Papéis

| Papel | Responsável |
|-------|--------------|
| CEO / Product Owner | **Rômulo Canella** |
| Chief Product Architect | **ChatGPT** |
| Frontend (UX/UI) | Equipe Web |
| Backend / Banco | Equipe API |
| QA | Equipe de Qualidade |
| DevOps | Infra e CI/CD |
| Suporte & Operação | Em definição |
| Financeiro / Backoffice | Em definição |
| Dados & Analytics | Em definição |

---

## 🔒 LGPD e Segurança

Checklist mínimo disponível em [`docs/handbook/seguranca.md`](docs/handbook/seguranca.md).

---

## 📆 Roadmap

### **Fase 1 — MVP**
- Catálogo e checkout via WhatsApp  
- Admin com produtos, insumos, receitas e pedidos  
- Dashboard básico e rastreabilidade de testes  

### **Fase 2 — Expansão**
- Autenticação e perfis  
- Relatórios financeiros e integrações  

### **Fase 3 — Escala**
- Pagamentos, automações e analytics avançado  

---

# 🧩 Gestão Loja — Backend (Sprint 1)

Endpoints P0 + OpenAPI, testes e rastreabilidade.

---

## ⚙️ Scripts

| Comando | Descrição |
|----------|------------|
| `npm run dev` | Inicia API com hot-reload (TSX) |
| `npm run build` | Compila TypeScript |
| `npm start` | Inicia a versão compilada (`dist/`) |
| `npm run test` | Executa testes com Vitest + Supertest e cobertura |
| `npm run test:watch` | Roda testes com watch ativo |
| `npm run lint:openapi` | Valida a especificação OpenAPI (Redocly CLI) |
| `npm run ci` | Build + Test + Lint (modo CI/CD) |

---

## 🧪 Testes

### 🔹 Localmente (Node)
```bash
cd backend
npm ci
npm run build
npm run test
```

### 🔹 Docker Compose (ambiente isolado)
```bash
# builda imagens do backend e de teste
docker compose build --no-cache backend backend-test

# sobe containers (db + backend + front)
docker compose up -d

# roda os testes com coverage (Vitest)
docker compose run --rm backend-test
```

### 🔹 Relatório de cobertura
Após o teste, o relatório estará disponível em:
```
backend/coverage/lcov-report/index.html
```
Ou, se rodado via Docker, será exportado para:
```
reports/coverage/
```

### 📊 Limites de cobertura
Definidos em `vitest.config.ts`:
- **Lines:** 90%  
- **Branches:** 80%  
- **Functions:** 90%  
- **Statements:** 90%

---

## 🌱 Estrutura de Código

```
backend/
  src/
    lib/
    middleware/
    routes/
    index.ts
  tests/
    integration/
    unit/
  docs/
    openapi.yaml
docs/
  traceability/
    map.json
    matrix.md
.github/
  workflows/
    ci.yml
```

---

## 🔧 Ambiente

Crie um arquivo `.env` na pasta `backend/` com as seguintes variáveis:

```bash
JWT_SECRET=um-segredo-seguro
PORT=4000
NODE_ENV=development
```

---

## 🧭 Status atual da sprint

✅ Backend buildando com sucesso  
✅ Testes 100% passando (`22/22`)  
✅ Cobertura: **95.4% linhas / 85.7% branches**  
✅ Integração Docker + Vitest + Prisma  
✅ Middleware de autenticação validado  

---

## 📦 Próximos passos

- Integrar pipelines automáticos (`.github/workflows/ci.yml`)
- Criar testes E2E com Playwright
- Implementar rastreabilidade automática (`REQ → TEST`)
- Expandir métricas no dashboard do gestor

---

**“Todo commit é uma entrega. Todo teste é uma garantia.”**
