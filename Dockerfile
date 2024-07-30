FROM node:latest as base

RUN npm i -g pnpm

WORKDIR /app

COPY package.json .

RUN pnpm i

COPY . .

# Run build
FROM base as builder

RUN pnpm run build

# Vrai image à prendre
FROM httpd as build_image
COPY --from=builder /app/out/ /usr/local/apache2/htdocs/


# Run repl
FROM base as runner

EXPOSE 3000

ENTRYPOINT [ "pnpm", "run", "dev" ]

