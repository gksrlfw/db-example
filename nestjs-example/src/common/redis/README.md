# Redis

In-memory DB 는 디스크가 아닌 메모리에서 데이터를 처리하기 때문에 속도가 빠릅니다. Redis 는 키-값 기반의 인-메모리 DB 이고, 다양한 데이터 구조를 제공합니다.

다양한 용도로 사용할 수 있지만, 여기서는 token 을 저장하기 위해 사용합니다. (학습필요!)

### Check connection (with docker)

```
docker exec -it redis sh
```

```
redis-cli
```

```
keys *
```

프로젝트가 정상적으로 실행되었다면 마지막 명령에서 1) "test" 이 출력됩니다. (CommonModule 에 작성되어있습니다.)

## Todo

데이터를 캐싱해봅시다.
