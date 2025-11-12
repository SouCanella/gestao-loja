# Backend — Estratégia Dev/Test/Prod (Vitest)

## Serviços (docker-compose)

- `backend` (prod local): imagem leve, sem devDependencies, roda `dist/` pronto
- `backend-dev`: hot reload com `tsx`
- `backend-test`: executa Vitest e salva coverage em `./reports/coverage`

## Comandos

```bash
# subir stack prod local
docker compose up --build

# dev (hot reload)
docker compose up --build backend-dev

# testes + cobertura
docker compose run --rm backend-test
# relatórios em ./reports/coverage
```

## Observações
- O estágio `prod` espera que `dist/` exista no contexto (rode `npm run build` no host antes do compose).
- Imports ESM/NodeNext: use extensão `.js` nos imports relativos em TS que viram ESM no build.
- JWT/DB/PORT são injetados via environment no compose.