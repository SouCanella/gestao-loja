FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci || yarn || pnpm i
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]
