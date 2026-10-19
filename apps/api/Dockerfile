FROM node:22.15.1-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
RUN npm ci --workspace=@agenda/api
COPY apps/api apps/api
RUN npm run prisma:generate --workspace=@agenda/api && npm run build --workspace=@agenda/api

FROM node:22.15.1-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
RUN npm ci --omit=dev --workspace=@agenda/api
COPY --from=build /app/apps/api/dist apps/api/dist
COPY --from=build /app/apps/api/prisma apps/api/prisma
COPY --from=build /app/node_modules/.prisma node_modules/.prisma
CMD ["node", "apps/api/dist/server.js"]
