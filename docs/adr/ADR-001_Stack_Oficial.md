# ADR-001 — Stack Oficial do Projeto Loja Controle
**Status:** Aprovado  
**Data:** 2025-10-29  
**Autor:** Chief Product Architect (CPA)

## Contexto
O projeto Loja Controle requer uma stack moderna, leve e escalável.


## Decisão
Adotar a seguinte stack:

| Camada | Tecnologia | Motivo |
|---------|-------------|---------|
| Backend | **Node.js + Fastify + Prisma + Postgres** | Rápido, leve e com tipagem forte via Prisma; integração direta com Postgres e suporte a OpenAPI |
| Frontend | **Next.js 14 (App Router) + React 18 + TypeScript** | Escalável, SSR/ISR nativo, integração direta com API e mesma base para web e mobile (futuro Expo) |
| Banco | **PostgreSQL (Docker)** | Estável, seguro e gratuito; já pronto para concorrência e migração futura para serviços cloud |
| Testes | **Vitest + Supertest + Playwright + Spectral + Behavex (futuro)** | Ecosistema unificado (JS/TS), cobrindo unit, integração e e2e com lint de OpenAPI |
| Infra | **Docker / Compose** | Setup rápido, replicável e compatível com CI/CD |
| Documentação | **OpenAPI 3.0 + Markdown versionado** | Fonte de verdade de APIs e rastreabilidade com `map.json` |


## Consequências
- Ambiente único para backend e frontend (compose dev).
- Migrations automáticas via Prisma.
- Rastreabilidade direta entre REQ, API e Testes.
- Suporte nativo a migração futura para Postgres cloud (Neon, Supabase, Render).

## Status de Implementação
✅ Starter fullstack rodando ponta a ponta
