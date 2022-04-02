# Dataloader

Dataloader 는 성능 개선을 위한 도구로, 일괄처리 및 캐싱을 이용하여 요청에 대한 비용을 줄이는 역할을 수행합니다.

Graphql 에서는 N+1 문제를 해결하기 위해 사용합니다.

### CNestDataLoader

NestDataLoader 에서 batchLoaderFunction 만 따로 작성하고 싶을 때 사용합니다.
사용에 불편함이 있는 경우에는 기존의 NestDataLoader 를 사용합시다.

# References

- https://medium.com/zigbang/dataloader%EB%A1%9C-non-graphql%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0-e6619010f60b
- https://github.com/graphql/dataloader
- nest-dataloader v7: https://github.com/krislefeber/nestjs-dataloader
- nest-dataloader v8: https://github.com/cobraz/nestjs-dataloader/blob/master/index.ts
