FROM oven/bun:alpine AS install
WORKDIR /app

COPY package.json ./
RUN bun i

FROM oven/bun:alpine AS build
WORKDIR /app

COPY --from=install /app/node_modules ./node_modules
COPY . .

RUN bun run build

RUN bunx prisma migrate deploy
RUN bunx prisma generate

EXPOSE 3000
CMD ["bun", "run", "start"]