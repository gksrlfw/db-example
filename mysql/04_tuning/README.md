# Tuning
"업무에 바로 쓰는 SQL 튜닝" 실습코드입니다.

실습 데이터가 한글로 저장되어 있습니다. mysql, linux 에 한글이 깨지지 않도록 세팅해주어야 합니다.
### Run
1. 스크립트를 이용해 실행합니다.
```
bash init.sh
```

2. seeds/data_setting.sql 을 실행하여 실습용 데이터를 넣습니다.
```
> cd seeds
> mysql < data_setting.sql
```

Todo. 스크립트로 작성.

3. 정상적으로 조회되는지 확인합니다.
```
> use tuning;
> show tables;
```
### Wiki

