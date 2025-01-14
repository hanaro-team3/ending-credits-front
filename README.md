# ending-credits-front

### ✅ 커밋 규칙

| 깃모지 | 태그 이름  | 설명                                                              |
| ------ | ---------- | ----------------------------------------------------------------- |
| 🩹     | [chore]    | 코드 수정, 내부 파일 수정                                         |
| ✨     | [feat]     | 새로운 기능 구현                                                  |
| 👔     | [add]      | FEAT 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 |
| 🚑     | [hotfix]   | issue나 QA에서 급한 버그 수정에 사용                              |
| 🐛     | [fix]      | 버그, 오류 해결                                                   |
| ⚰️     | [del]      | 쓸모 없는 코드 삭제                                               |
| 📝     | [docs]     | README나 WIKI 등의 문서 개정                                      |
| 🏷️     | [correct]  | 주로 문법의 오류나 타입의 변경, 이름 변경에 사용                  |
| 🚚     | [move]     | 프로젝트 내 파일이나 코드의 이동                                  |
| 🚚     | [rename]   | 파일 이름 변경이 있을 때 사용                                     |
| ⚡️    | [improve]  | 향상이 있을 때 사용                                               |
| ♻️     | [refactor] | 전면 수정이 있을 때 사용                                          |
| ✅     | [test]     | 테스트 코드 추가 시 사용                                          |

---

### 👀 팀 프로젝트 진행 방법

1. git flow 도구 사용해서 init (초기화) 해줌
    - `git flow init`
2. 폭풍 엔터로 브랜치 명명규칙은 기본값을 따라줌
3. 모든 팀원 로컬 환경에서 처음에 main 브랜치 뿐만 있었는데 develop 브랜치가 로컬에 생겨남
4. 각자 맡은 작업을 시작 하기 위해 git flow 도구 사용해서 feature 브랜치 생성
    - `git flow feature start <feature-name>`
    - (( feature 폭풍 작업 ))
5. 작업 완료 후 feature 브랜치를 push 해서 PR 올림
    - `git push origin feature/<feature-name>`
6. PR 타이틀, 설명 등 작성 후 리뷰어 팀원들 등록
7. PR 승인 되면 Squash and Merge 버튼을 통해 압축 된 하나의 커밋으로 develop에 머지한다.
    - `git flow feature finish <feature-name>`
8. 또 다른 feature 작업을 위해 가장 마지막으로 업데이트 된 develop 브랜치를 pull 한다.
    - `git push origin develop`
    - `git checkout develop`
    - `git pull origin develop`
