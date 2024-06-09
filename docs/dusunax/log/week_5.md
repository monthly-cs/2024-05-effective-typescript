# 240609_Memo

- 함수 내부에서 any를 사용하는 경우 ← 괜찮다
  - 함수 내부에서 any를 사용하는 것은 괜찮지만, 타입 안전성을 위해 필요한 경우에만 사용하는 것이 좋다.
- 암시적 any
  ```tsx
  let nullableA = null;
  let undefinedableB = undefined;
  let C;
  ```
- any를 전부 unknown으로 대체 가능한가
  - 이론적으로 가능
  - unknown을 사용할 경우 타입 체크&가드가 필요 => 코드가 더 복잡해질 수 있다.
  - any는 어떤 타입이든 할당 / unknown는 더 많은 타입 체크를 요구 (안전)
- eslint ← 명시적 any 제한 또는 경고
- 타입

  ```tsx
  type A = {
    foo: boolean;
    bar?: never;
  };

  type B = {
    bar: boolean;
    foo?: never;
  };
  ```

- 몽키패치 사용하는 경우 예시: 코드 수정 없이 동작을 변경할 때
  - 오픈소스 라이브러리
  - SDK
  - next-auth
- {}는 unknown 이전에 타입 안정성을 보장하지 않던 방식
  - unknown이 안전하다
- 키-값 쌍 객체 타입을 정의하는 법
  ```tsx
  {[key: string]: unknown}
  {[key: Symbol]: unknown}
  Record<string, unknown>
  ```
- unknown 단언
  - 경우? 제너릭
  - 추론된 타입에서부터 특정 타입으로 타입을 좁히는 과정
  ```tsx
  "A" as string;
  "A" as unknown as string;
  "A" as any as string;
  ```
- 타입 커버리지를 추적
  - 서드파티에서 any 뿜는 경우 에러 확인용
    - d.ts
  - 마이그레이션
    - 0% ⇒ 90%
  - CI에다가 확인용 (빌드 시 확인)
    - 퍼센테이지 확인, CI 실패
- CI 도구
  - 소나큐브
  - codecov
    - https://about.codecov.io/ (좋음)
- 테스트
  - [**React Testing Library**](https://testing-library.com/docs/react-testing-library/intro/)
  - jest
    - jest-dom
      - 라우트 모킹 ok
- 스토리북
  - 디자이너
- 테스트 코드

  - QA
  - 메인 로직: 중요도에 따라 테스트코드 여부 결정

    - ERP의 경우? 결재 상신 로직의 경우의 수
    - 유틸 유닛 테스트

      ```tsx
      /util
        aaa.ts
        aaa.test.ts

      /test
        aaa.ts

      /aaa
        aaa.hook.ts
        aaa.util.ts
        aaa.test.ts

      /hook
        aaa.ts
      /util
      ```

- FSD 아키텍처
- MSA
  - 도메인별 / 섹션별 분리
  - 쿠팡, 토스 큰회사!
  - 디자인 시스템
    - 레이아웃
      - 피처
      - 피처
- 디자인 시스템은?
  - 모듈화
    - 디자인 시스템을 모듈화하여 UI 프레임워크처럼 사용할 수 있도록 개발
  - 디자인 시스템을 만드는 비용
  - antd
- UI
  - shacdn UI - 블랙&화이트 요즘 서타일
    - theme 컬러 선호도 같은 것도 국가별로 다름 (해외는 bright, 국내는 pale한 컬러를 선호하는 경향이 있는 것 같다.)
  - radix ui: Shdcdn UI에 사용됨. CSS 없음
- 전역 상태 관리
  - 값 변경이 추적이 안됨
  - context API + memo
    - 모달
  - props driiling
    - props 양이 많으면 묶어서 드릴링 ex) recipeItemProps
- ts 5.5
  - https://devblogs.microsoft.com/typescript/announcing-typescript-5-5-rc/
