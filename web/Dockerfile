FROM oven/bun AS base

FROM base AS deps
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Create directory for writable files with proper permissions
RUN mkdir -p /app/data && \
    chown -R nodejs:nodejs /app/data

COPY --from=builder /app/.output ./.output

EXPOSE 3000

USER nodejs

CMD ["bun", ".output/server/index.mjs"]
