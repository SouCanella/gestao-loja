# ADR-002 — Padrão de Validação e Tratamento de Erros

**Status:** Aprovado  
**Data:** 2025-10-29  
**Autor:** Chief Product Architect (CPA)

## Contexto
Necessário padronizar o comportamento das APIs quanto à validação de entrada, mensagens de erro e códigos HTTP para garantir previsibilidade no frontend e automação dos testes de QA.

## Decisão
Utilizar **Zod** como validador de schema nas rotas Fastify.

### Padrão de Respostas
| Tipo | Código | Corpo (JSON) | Exemplo |
|------|---------|--------------|----------|
| Sucesso (POST) | `201` | `{ "id": "uuid", "name": "..." }` | Retorna o objeto criado |
| Sucesso (GET) | `200` | `[...]` ou `{...}` | |
| Validação | `400` | `{ "message": "Invalid body", "issues": [...] }` | Campos inválidos |
| Não encontrado | `404` | `{ "message": "Not found" }` | |
| Conflito | `409` | `{ "message": "Conflict: already exists" }` | Duplicidades |
| Erro interno | `500` | `{ "message": "Internal server error" }` | fallback |

### Regras adicionais
- Nenhuma exceção “bruta” deve vazar no log.
- Todos os erros 400/404/409 devem ser **testados individualmente**.
- Testes Vitest + Supertest devem validar estrutura e status code.

## Status de Implementação
✅ Implementado no módulo Produtos (Fastify + Zod)  
