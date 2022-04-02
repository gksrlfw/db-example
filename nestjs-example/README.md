# Simple nestjs example

Nestjs 기반의 간단한 예제 코드입니다.

# RUN

### ENV

자세한 내용은 [여기](./src/core/config/README.md)에서 확인하세요

### RUN ON LOCAL

1. 의존성을 설치합니다.

```
npm install
```

2. package.json 의 스크립트를 확인한 후, .env.\* 파일을 설정합니다.

3. 프로젝트를 실행합니다.

```
npm run start:dev
```

### RUN ON DOCKER

```
docker-compose up --build
```


# TODO

- [ ] nestjs
  - [x] [configuration](./src/core/config/README.md)
  - [x] filter
  - [ ] decorator
  - [ ] auth
    - [ ] token 인증
    - [ ] [redis](./src/common/redis/README.md)
  - [ ] ...
- [x] graphql
  - [x] custom scalar
  - [x] [dataloader](./src/common/dataloader/README.md)
- [x] mysql
- [ ] mongodb
- [x] [husky, lint-staged](./.husky/README.md)
- [x] docker
- [x] [test](./src/modules/post/test/README.md)
- [x] [github actions](.github/workflows/README.md)
- [x] [k8s](./k8s/README.md)


# WIKI
https://github.com/gksrlfw/nestjs-example/wiki
