# Todo
찾아봐야하는 내용을 작성합니다.


### 
Todo. 4-4. * 가 아닌, 인덱스가 있는 컬럼만 가져오면 type 은 index, Extra 에 Using index 가 생깁니다. extra 는 모든 곳에 인덱스인 녀석만 사용하니까 이해가 되는데 type 은 왜 인덱스 풀 스캔으로 바뀌는지...???

key 에는 성별_성 인덱스를 탄걸로 되어있는데 스토리지 엔진에 접근한 데이터 rows 수는 동일해서 실제로 인덱스를 탄게 맞는지? 맞으면 왜 rows 가 동일한지?

쿼리에서 바꾼건 가져오는 데이터의 컬럼이 인덱스가 있냐 없냐인데, 이게 실제 검색에 어떤 영향을 미치는지??

```mysql
EXPLAIN
SELECT 성별
FROM 사원
WHERE CONCAT(성별,' ',성) = 'M Radwan';

+----+-------------+--------+------------+-------+---------------+--------------+---------+------+--------+----------+--------------------------+
| id | select_type | table  | partitions | type  | possible_keys | key          | key_len | ref  | rows   | filtered | Extra                    |
+----+-------------+--------+------------+-------+---------------+--------------+---------+------+--------+----------+--------------------------+
|  1 | SIMPLE      | 사원   | NULL       | index | NULL          | I_성별_성    | 51      | NULL | 299113 |   100.00 | Using where; Using index |
+----+-------------+--------+------------+-------+---------------+--------------+---------+------+--------+----------+--------------------------+
1 row in set, 1 warning (0.00 sec)


explain SELEct 생년월일 FROM 사원 WHERE CONCAT(성별,' ',성) = 'M Radwan';
+----+-------------+--------+------------+------+---------------+------+---------+------+--------+----------+-------------+
| id | select_type | table  | partitions | type | possible_keys | key  | key_len | ref  | rows   | filtered | Extra       |
+----+-------------+--------+------------+------+---------------+------+---------+------+--------+----------+-------------+
|  1 | SIMPLE      | 사원   | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 299113 |   100.00 | Using where |
+----+-------------+--------+------------+------+---------------+------+---------+------+--------+----------+-------------+
1 row in set, 1 warning (0.01 sec)
```

### tinyint 타입 비교...?: IS TRUE or = TRUE
실제 쿼리 중
```mysql
SELECT * 
FROM A
INNER JOIN B on B.a_id = A.id
INNER JOIN C on C.a_id = A.id
WHERE B.base_date < DATE("2022-01-01")
     AND A.is_used = true
```
base_date 는 인덱스가 있습니다.

위 쿼리의 explain 결과에서 A 테이블은 테이블 풀 스캔, base_date 가 인덱스를 타지 않았습니다.

여기서 A.is_used = true 를 A.is_used IS TRUE 로 변경하면 정상적으로 동작합니다.

tinyint(1) 값에는 0, 1, 2 ... 등 여러 숫자가 들어갈 수 있는데, = true 로 하면 1 만을 가져오고 is true 로 하면 전부 가져옵니다. (https://www.mysqltutorial.org/mysql-boolean/)

형변환이 일어나서 안되는 걸로 추측...?

###########################################################################

**수정 (220627)**

```
# not use index
explain
select count(*)
from post_log pl
inner join post p on pl.post_id = p.id
where
    pl.base_date >= DATE("2022-05-01")
    and pl.base_date < DATE("2022-05-02")
    and p.is_used = true
    and p.is_deleted = false;

# use index
explain
select count(*)
from post_log pl
inner join post p on pl.post_id = p.id
where
    pl.base_date >= DATE("2022-05-01")
    and pl.base_date < DATE("2022-05-02")
    and p.is_used is true
    and p.is_deleted is false;
```

tinyint 기준으로 = TRUE 는 1만, IS TRUE 0이 아닌 모든 수를 매칭합니다. 둘은 적용되는 연산이 다릅니다.

explain 시, = TRUE 는 filtered 가 1, iIS TRUE 는 100입니다.

기본적으로 최종 결과와 접근한 rows 가 비슷하고 filtered 가 더 높은게 좋습니다. 여기서는 filtered 가 낮은 즉, 더 적게 선택하는 것 처럼 보이는 = true 를 index 보다 먼저 접근하는 것을 효율적으로 판단하는 것으로 보입니다.

**즉, 쿼리는 옵티마이저에 의해 우리가 원하는대로 동작하지 않을 수 있으므로 explain 으로 확인하고 hint 를 주는 것이 중요합니다.**

* filtered 는 storage 엔진에서 가져온 것들 중 mysql 엔진에 의해 필터링 된 퍼센트를 의미하며, 실제 값이 아닌 통계 정보로부터 예측된 값을 의미합니다.





### like 의 인덱스...?
실제로 어떻게 동작하는지 확인해보기
**Todo. 4-8. 추가적으로 위 처럼 부분검색이 목적인 LIKE 절 대신 부등호 조건절이 우선하여 인덱스를 사용하므로 데이터 접근 범위를 줄일 수 있습니다.**
