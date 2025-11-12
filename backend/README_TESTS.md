# Patch: tests no container de backend-test

- `backend/Dockerfile`: agora copia `tests/` no estágio **dev** (o estágio **test** herda e encontra os arquivos).
- `backend/vitest.config.ts`: define `include` para `tests/**/*.{test,spec}.ts` e coverage para `src/**/*.ts`.

## Como aplicar

1) Extraia este zip na raiz do projeto sobrescrevendo arquivos.
2) Rebuild e rode:
   ```bash
   docker compose up --build -d
   docker compose run --rm backend-test
   ```
3) Cobertura sai em `./reports/coverage/` (mapeado pelo docker-compose).