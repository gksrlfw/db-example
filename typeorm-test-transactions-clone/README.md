# TypeORM Test Transactions

https://github.com/entrostat/typeorm-test-transactions clone repository 입니다.

### Update
- runInTransaction 함수에서 typeorm 의 connection name 을 받을 수 있도록 수정
- test 시, BaseRepository connection 설정 필요
    ```
    User.useConnection(connection);
    ```
  - connection 에 name 을 부여하면 connection name 이 default 인 connection 을 찾습니다.
  - BaseEntity 를 등록할 때 name 을 부여하지 않아 default 로 설정되어진 것으로 보이고, BaseEntity 를 등록하면서 connection name 을 설정할 수 있는 방법이 있는지 확인해야합니다.

