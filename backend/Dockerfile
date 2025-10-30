# ---------- build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# 1) Instala dependências (SEM exigir package-lock)
COPY package*.json ./
RUN npm install

# 2) Copia fontes
COPY tsconfig.json ./tsconfig.json
COPY src ./src
# Se usar Prisma, copie o schema
COPY prisma ./prisma

# 3) Gera cliente do ORM (se existir)
RUN npx prisma generate || true

# 4) Compila TypeScript
RUN npm run build

# 5) Remove devDependencies para levar só runtime
RUN npm prune --omit=dev

# ---------- runtime stage ----------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# 6) Copia apenas o necessário do build
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 3001

# 7) Aplica migrações e inicia o server
CMD ["sh", "-c", "npx prisma migrate deploy || true && node dist/server.js"]
