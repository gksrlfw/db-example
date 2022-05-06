# Artillery
unit, e2e 테스트를 이용하면 코드 상에서의 오류를 찾을 순 있지만 API 의 성능에 대해서는 테스트할 수 없습니다.

OOM(Out Of Memory) 문제와 같이 하드웨어의 제약으로 서비스에 문제가 발생할 수 있는데, 이를 방지하기 위해서는 Performance test 를 시도해보는 것이 좋습니다.

여기서는 Artillery 를 이용하여 graphql 서버의 성능을 테스트 해봅니다.


### Features
* Javascript 로직을 작성 가능
* 여러 trigger 포인트 추가 가능
* Http, Socket 등 다양한 프로토콜 지원
* 리포트 페이지 제공

위 특징을 이용하여 서비스의 API 성능을 테스트할 수 있습니다.

### easygraphql-load-tester
graphql 쿼리를 쉽게 테스트하기 위해 easygraphql-load-tester 패키지를 설치합니다.

https://github.com/EasyGraphQL/easygraphql-load-tester

### Directory structure
```
├── queries                 # 테스트할 custom query
├── reports                 # artillery 결과 리포트
├── schema                  # 서비스 graphql schema. playground 에서 다운로드 할 수 있습니다.
├── scripts                 # artillery 스크립트 파일
├── seeds                   # script config payload
├── tests                   # script scenarios function
└── processor.js            # script config processor
```

### Run
```
# 실행
npx artillery run <script path> --output <report path> -e <env>
# 리포트 생성
npx artillery report <report path>
```

```
npx artillery run ./scripts/get-sites.script.yml --output ./reports/report.json && npx artillery report ./reports/report.json && open ./reports/report.json.html
```

### Todo
여기서는 artillery 관련 코드만 제공하므로, 간단한 API 서버를 만들어서 실제로 테스트를 해봅시다.