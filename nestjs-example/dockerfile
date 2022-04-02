# step 1
FROM node:14.15.3 AS builder

ENV APP_ENV=dev
ENV NODE_ENV=development

# WORKDIR 을 설정합니다.
WORKDIR /app

COPY ./package.json ./package-lock.json .

RUN npm install --production=false

#
COPY ./tsconfig.json ./tsconfig.build.json ./nest-cli.json .
COPY ./src ./src
RUN npm run build


# step 2
FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD npm run start:prod
