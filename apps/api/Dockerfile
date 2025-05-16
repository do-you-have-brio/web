FROM oven/bun

WORKDIR /app

COPY package.json bun.lock ./

RUN apt-get update -y && apt-get install -y openssl

RUN bun install

COPY . .

CMD ["nx", "run", "api:dev"]
