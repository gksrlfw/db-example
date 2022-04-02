# husky, lint-staged

commit 하기 전에 자동으로 formatting 을 하도록 설정합니다.

### GIT HOOK

HOOK 은 특정 상황에서 원하는 스크립트를 실행할 수 있게 해주는 기능으로, 기본적으로 .git./hooks 라는 디렉토리에 저장됩니다.

여러 상황에서 사용할 수 있지만, 여기서 원하는 기능은 commit 이전에 원하는 스크립트를 실행시키는 것이므로 pre-commit 을 이용합니다.

### husky

Git 명령어가 실행되면 특정 스크립트를 실행시켜주는 패키지입니다.

```
npx husky-init
```

### lint-staged

git 에는 세가지 상태가 존재합니다.

- Committed 는 데이터가 로컬 데이터베이스에 안전하게 저장됐다는 것을 의미합니다.
- Modified 는 수정한 파일을 아직 로컬 데이터베이스에 커밋하지 않은 것을 의미합니다.
- Staged 는 현재 수정한 파일을 곧 커밋할 것이라고 표시한 상태를 의미합니다.

lint-staged 는 staged 상태인 파일만 lint 해주는 패키지입니다.
husky 만 사용하면 프로젝트의 모든 코드를 검사해야하지만 lint-staged 를 적용하면 조금 더 효율적으로 formatting 할 수 있습니다.

```
"lint-staged": {
    "*.{ts,md}": "npm run format"
}
```

### References

- https://defineall.tistory.com/667
- https://git-scm.com/book/ko/v2/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-Git-%EA%B8%B0%EC%B4%88
- https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-Hooks
