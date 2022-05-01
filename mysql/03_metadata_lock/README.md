# Metadata lock
metadata lock 재현 실습입니다.

## Run
### Lock 재현
1. 스크립트를 이용해 mysql 을 실행합니다.
```
bash init.sh
```

2. transaction 을 의도적으로 지연하기 위해 sleep 을 이용하고 COMMIT / ROLLBACK 하지 않습니다.
```
# session 1
> docker exec -it example /bin/bash
> mysql
> USE ex;
> START TRANSACTION;
> SELECT * FROM user WHERE SLEEP(1000) = 0;
```

3. 다른 세션 혹은 커넥션을 연결하여 트랜잭션이 걸린 테이블에 DDL 을 시도합니다.
```
# session 2
> ALTER TABLE user ADD COLUMN hi INT;
```
트랜잭션이 걸려있는 테이블에 DDL 을 시도하면 lock 에 걸립니다.

4. 다른 세션 혹은 커넥션을 연결하여 DML 을 시도합니다. 
```
# session 3
> SELECT * FROM user;
```
해당 쿼리 역시 lock 에 걸립니다.

5. lock 을 확인합니다.
```
> SHOW FULL processlist;
```
DDL 을 포함한 모든 쿼리가 lock 이 걸린것을 확인할 수 있습니다.

### Lock 해제
* 기본적으로 COMMIT / ROLLBACK 처리를 해주면 lock 이 해제됩니다.
* DDL 프로세스를 KILL 하면 lock 이 풀리고 이후의 모든 쿼리에서도 lock 이 발생하지 않습니다.
* 하지만 COMMIT / ROLLBACK 이 되지 않은 트랜잭션이 존재하는 한, DDL 을 다시 시도하면 lock 이 발생합니다.
  * 따라서 해당 프로세스를 COMMIT / ROLLBACK 하거나 KILL 해야합니다.
* COMMIT / ROLLBACK 이 되지 않은 트랜잭션이 있는 세션 혹은 커넥션을 종료하여도 lock 이 유지됩니다.
  * 강제로 종료되어도 트랜잭션이 COMMIT 혹은 ROLLBACK 이 되지 않는것같습니다.
* 프로세스를 강제로 KILL 하게되면 한 두번은 reconnect 하면서 다시 살아납니다. (Why..?)
    ```
    ERROR 2013 (HY000): Lost connection to MySQL server during query
    No connection. Trying to reconnect...
    Connection id:    25
    Current database: example
    ```
### Wiki
[여기](https://github.com/gksrlfw/study/wiki/Mysql#metadata-lock)

