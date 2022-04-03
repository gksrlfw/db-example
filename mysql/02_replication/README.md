# Replication
Replication 관련 실습 코드입니다.

master - slave 구조를 실습합니다.

### Run
1. 스크립트를 이용해 docker-compose 를 실행합니다.
```
bash init.sh
```

2. db-master 에 접속하여 master status 를 확인합니다.
```
docker exec -it db-master /bin/bash

mysql

show master status;
```

3. db-slave 에 접속하여 db-master 와 연결합니다.
```
docker exec -it db-slave /bin/bash

mysql

# db-master 에서 설정한 slave 계정, bin_file 정보를 입력합니다. 
# Why port = 3306, not 4406??
change master to master_host='db-master', master_user='slave', master_log_file='mysql-bin.000003', master_log_pos=157, master_port=3306;

# stop slave;
start slave;

# 에러가 없는지 확인합니다.
show slave status;
```

4. db-master 에서 수정되는 데이터가 db-slave 에 동기화되는지 확인합니다.
```
# In db-master
INSERT INTO example.user VALUES(1, ‘cola’, 19);

# In db-slave;
SELECT * FROM example.user;
```

### Issue
* 두 컨테이너를 같은 network 로 묶어서 container 이름을 사용할 수 있도록 합니다. (Todo.)
* change master 시에 db-master 의 port 는 3306 으로 해야합니다. (Why??)
* slave 와 master 의 db 정보는 같아야합니다.
    * master 내용을 dump 하여 일치시킬 수 있습니다.
        ```
        mysqldump -uroot example > dump.sql
        
        docker cp db-master:dump.sql .
        
        docker cp dump.sql db-slave:.
        
        mysql -uroot example < dump.sql
        ```

### Wiki
[여기](https://github.com/gksrlfw/study/wiki/Mysql#replication)
