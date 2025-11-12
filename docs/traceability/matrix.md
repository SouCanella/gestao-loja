# 📌 Matriz de Rastreabilidade — Sprint 1 (Backend + Planejamento Completo)

| REQ     | Descrição                                                | API(s)                                                                 | Testes                                                               |
|---------|----------------------------------------------------------|------------------------------------------------------------------------|----------------------------------------------------------------------|
| REQ-001 | Auth básica JWT                                          | `POST /auth/login`<br>`GET /auth/me`                                   | `auth-login.spec.ts`<br>`auth-me.spec.ts`                            |
| REQ-002 | Pedidos (CRUD parcial)                                   | `POST /orders`<br>`PATCH /orders/{id}`<br>`GET /orders`                | `orders.spec.ts`<br>`auth-unauthorized.spec.ts`                      |
| REQ-003 | Configuração da loja                                     | `POST /config`<br>`GET /config`                                        | `config.spec.ts`                                                     |
| REQ-004 | Produtos (listar; bulk; validate)                        | `GET /products`<br>`POST /products/bulk`<br>`POST /products/bulk/validate` | `products-bulk.spec.ts`<br>`products-bulk-validate.spec.ts`          |
| REQ-005 | Health-check                                             | `GET /health`                                                          | `health.spec.ts`                                                     |
| REQ-006 | Insumos & Fornecedores (Custo Unitário)                  | `GET /ingredients`<br>`POST /ingredients`                              | `ingredients.feature`                                                |
| REQ-007 | Receitas & Precificação (Markup, Perda, Versões)         | `GET /recipes`<br>`POST /recipes`<br>`POST /recipes/{id}/version`<br>`POST /recipes/{id}/apply` | `recipes.feature`                                  |
| REQ-008 | Produção (Baixa insumos / Credita estoque)               | `POST /productions`<br>`GET /productions`                              | `productions.feature`                                                |
| REQ-009 | Clientes (Tags, Histórico)                               | `GET /customers`<br>`POST /customers`                                  | `customers.feature`                                                  |
| REQ-010 | CI/CD & Coverage (Relatórios)                            | —                                                                      | `ci/test-pipeline.yml`<br>`reports/coverage/index.html`              |

---

### 🧭 Padrões aplicados
- **REST estrito:** `PATCH /orders/{id}`  
- **Testes:** Vitest + Supertest (backend) e Behavex (QA BDD)  
- **Coverage:** ≥90% linhas / ≥80% branches  
- **Rastreabilidade:** REQ ↔ API ↔ Teste alinhada ao OpenAPI  
