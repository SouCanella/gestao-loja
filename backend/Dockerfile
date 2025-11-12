# Base comum
FROM node:20-slim AS base
WORKDIR /app

# ---------- DEV (hot reload, devDeps, fontes) ----------
FROM base AS dev
COPY package.json package-lock.json* ./
RUN npm ci
COPY tsconfig.json vitest.config.* ./
COPY prisma ./prisma
RUN npx prisma generate
# inclui fontes e testes no estágio dev
COPY src ./src
COPY tests ./tests
CMD ["npm","run","dev"]

# ---------- TEST (build + testes + coverage em /out) ----------
FROM dev AS test
RUN npm run build

# ---------- PROD DEPS (apenas runtime) ----------
FROM base AS prod-deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# ---------- PROD (mínimo) ----------
FROM base AS prod
ENV NODE_ENV=production
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
COPY --from=prod-deps /app/node_modules ./node_modules
COPY prisma ./prisma
COPY dist ./dist
CMD sh -c "npx prisma migrate deploy || true; node dist/server.js"