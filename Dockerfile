FROM node:16.10.0-alpine3.14 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production=true --frozen-lockfile
COPY modules/ modules
COPY pages/ pages
COPY public/ public
COPY .env.production .
COPY tsconfig.json .
RUN yarn build

FROM node:16.10.0-alpine3.14
WORKDIR /app
COPY --from=build /app/package.json package.json
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/public public
COPY --from=build /app/.next .next
CMD ["yarn", "start"]
