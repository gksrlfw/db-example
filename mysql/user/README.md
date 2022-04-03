# 계정
계정생성, 권한부여 및 권한회수 관련 실습 코드입니다.

/sqls/create.sql 에 작성되어 있습니다.

### Run
1. 스크립트를 이용해 실행합니다.
```
bash init.sh
```

2. 정상적으로 동작했는지 확인합니다. dev 계정에 create_priv 권한이 없다면 정상적으로 동작한 상태입니다.
```
> mysql
> select user, host, create_priv, select_priv from user;
```

### Wiki
[여기](https://github.com/gksrlfw/study/wiki/Mysql#%EA%B3%84%EC%A0%95)

