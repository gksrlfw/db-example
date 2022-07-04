#
Nestjs Docs, TypeORM 쿼리 테스트, unit/e2e Test, Typescript 문법 등을 테스트합니다.

## 실행
### 로컬
1. 초기 데이터를 생성합니다.
```
npm run mysql:table     # create table
 
npm run mysql:data      # create data
```


2. 서버를 실행합니다.

```
npm run start:local
```

### 도커
[여기](mysql/sqls)에 작성된 쿼리를 통해 데이터가 생성됩니다.

```
docker-compose up --build
```