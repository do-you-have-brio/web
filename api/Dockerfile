FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

COPY prisma ./

RUN apt-get update && apt-get install -y openssl

RUN bun install --frozen-lockfile

COPY . .

CMD ["bun", "dev"]
