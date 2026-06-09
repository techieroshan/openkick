FROM node:20-alpine AS build
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY packages/types/package.json packages/types/package.json
COPY apps/bff/package.json apps/bff/package.json

RUN pnpm install --frozen-lockfile

COPY packages/types packages/types
COPY apps/bff apps/bff

RUN pnpm --filter @openkick/bff exec prisma generate && \
    pnpm --filter @openkick/types build && \
    pnpm --filter @openkick/bff build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8787

COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=build /app/apps/bff/package.json /app/apps/bff/package.json
COPY --from=build /app/packages/types/package.json /app/packages/types/package.json
COPY --from=build /app/packages/types/dist /app/packages/types/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/apps/bff/node_modules /app/apps/bff/node_modules
COPY --from=build /app/apps/bff/dist /app/apps/bff/dist

EXPOSE 8787
CMD ["node", "apps/bff/dist/server.js"]
