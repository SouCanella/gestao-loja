# Sprint 1 — Planejamento e Histórias

**Status:** Planejada  
**Período sugerido:** 2025-11-01 → 2025-11-15  
**Objetivo:** Consolidar o módulo Produtos ponta a ponta com rastreabilidade e cobertura completa.

---

## 🎯 Objetivos Principais
- Concluir o CRUD de Produtos (API + Front + DB + Docs).
- Alcançar 100% de cobertura de testes de API e 90% no Frontend.
- Publicar documentação atualizada (OpenAPI, map.json, README).
- Preparar a base para os próximos módulos (Insumos e Receitas).

---

## 📋 Histórias da Sprint 1

| ID | História | Descrição / Critérios | Dono |
|----|-----------|------------------------|------|
| **REQ-PROD-001** | Cadastrar produto com preço e estoque | API `/products` deve criar produto com campos validados e retornar `201`. | Backend |
| **REQ-PROD-002** | Listar produtos | Endpoint GET `/products` deve listar todos ordenados por data desc. | Backend |
| **REQ-PROD-003** | Atualizar produto | PUT `/products/:id` com campos parciais válidos. Retornar `200` ou `404`. | Backend |
| **REQ-PROD-004** | Excluir produto | DELETE `/products/:id` com retorno `204`. | Backend |
| **REQ-PROD-005** | Exibir produtos na loja | Página `/` deve listar produtos retornados da API. | Frontend |
| **REQ-PROD-006** | Gerenciar produtos no Admin | Página `/admin` com CRUD completo integrado à API. | Frontend |
| **REQ-PROD-007** | Testes de API (sucesso/erro) | Casos 201, 400, 404, 409. Validar corpo, status e estrutura. | QA |
| **REQ-PROD-008** | Testes unitários do Front | Testar `ProductList`, `AdminForm` e hooks com Vitest/RTL. | QA |
| **REQ-PROD-009** | Documentação OpenAPI atualizada | Campos, exemplos e status codes coerentes. | Docs |
| **REQ-PROD-010** | Rastreabilidade completa | Atualizar `map.json` com REQ ↔ API ↔ Testes. | Docs |

---

## ✅ Critérios de Pronto (DoD)
- Todos os endpoints funcionando e testados.
- Cobertura (Vitest): API ≥95 %, Front ≥90 %.
- OpenAPI atualizado e validado com Spectral.
- `map.json` e `matrix.md` sincronizados.
- Build local (compose) rodando sem erro.
- Review técnico do CPA aprovado.

---

## 📅 Entregáveis da Sprint
- `/backend/src/routes/products.ts` completo e testado  
- `/frontend/app/page.tsx` e `/frontend/app/admin/page.tsx` integrados  
- `/docs/openapi.yaml` revisado  
- `/docs/traceability/map.json` inicial  
- Coverage report HTML salvo em `/reports/coverage/`

---

## 🔗 Dependências futuras
- Módulo Insumos/Receitas (Sprint 2)
- Pipeline CI (Sprint 2)
