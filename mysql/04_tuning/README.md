# Tuning
"업무에 바로 쓰는 SQL 튜닝" 학습내용입니다. 문제될 시 삭제하겠습니다.

실습 데이터가 한글로 저장되어 있는데, 따로 설정하지 않고 도커 컨테이너에 접근하여 한글을 입력하면 깨집니다.

한글이 깨지지 않도록 dockerfile 과 my.cnf 에 필요한 내용을 작성해주어야 합니다. 

(intellij 사용 시, Driver and data source 에서 localhost:4406 으로 연결해줍니다.)

### Run
1. 스크립트를 이용해 실행합니다.
```
bash init.sh
```

2. seeds/data_setting.sql 을 실행하여 실습용 데이터를 넣습니다.
```
> docker exec -it example /bin/bash
> cd seeds
> mysql < data_setting.sql
```

Todo. 스크립트로 작성.

3. 정상적으로 조회되는지 확인합니다.
```
> use tuning;
> show tables;
```

4. docs/*.md 를 확인하며 학습합니다.

