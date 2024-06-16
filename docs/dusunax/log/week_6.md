# 240609_Memo

> 주희님, 강욱님, 형욱님, 수현님, 성보님, 두선아

- dtslint 써보셨나요?
  - 문자열을 비교한다. string === string
  - 들어본 적 없음 6
- 타입을 테스트?
  - 안함 6
- 기업 과제 테스트 코드
  - jest + RTL
    - 테스트코드를 통과하는 경우
    - 테스트코드를 작성하는 경우
  - e2e
    - 행위 주도 // fe 사이프레스
      - 사용자 인터렉션에 의한 기능 위주
- 메인 로직
  - 기능의 복잡도!
  - 기능 변경될 때 테스트코드
- 어떻게 작성할 것인지
  - 뮤테이션
    - 로직 체크
  - 모킹데이터
- @types
  - 의존성
  - 버전 충돌 경고의 경우
    - install 전에 호환 체크 정도로 진행
- JSDoc
  - 컨벤션
    - 작성자, 생성날짜 // 코드째로 외부에 넘겨주는 경우 ex) SI
  - JS 프로젝트
    ```tsx
    /**
    * getPost
    * @params { postId } string
    * @return { post } Post
    */
    funtion getPost (postId: string): Post{
    	return ~~~
    }
    ```
  - 함수에 대한 주석
    ```tsx
    /** 함수 이름으로는 알기 힘든 중요한 정보 */
    function getPostWhen어쩌고() {}
    ```
  - 컴포넌트
    - IDE JSDoc 오류 뜨는 조건 찾아보기 ← VSC 세팅…?
    ```tsx
    /**
     * getPost
     * @param { number } postId
     * @returns { Post } post
     */
    function getPosts(postId: string) {
      return [];
    }
    ```
- next
  - i18n 적용과 error.js 꼬이는 경우
- 유저 로그인은 어떻게 처리?
  - 세션 2
    - 클라이언트 쿠키 - 유틸 함수로 체크
    - 헤더에 넣고 verified
  - access / refresh 토큰 2
    - 백엔드 refresh 처리
      - accessToken // 401 accessToken이 만료되었습니다.
  - NextJS 11 이후 getServerProps X ⇒ authWrapper로 감싸서 처리하는 경우
    - 페이지 이동 시 체크 하기
      - middleware.js ⇒ match로 라우트 확인 후, 필요한 페이지에서 auth체크
  - API 에러 반환 3가지 타입
    - 401 ⇒ auth 오류
    - 404 에러 반환 시 ⇒ 에러 바운더리 사용, 글로벌 notFound 페이지로 이동
    - 500대 에러 페이지 ⇒ 에러 페이지
  - 에러 핸들링
    - 에러 바운더리 wrapper
      - 최상위에서 감싸서 fallback 컴포넌트에 에러 코드, 에러 메시지 넘김
    - Next의 경우에는 notFound.js, error.js로 처리함
    - react-router-dom
      - route 없을 때, notFound 컴포넌트가 포함된 페이지로 이동
      - /post/sdfsfsdsdfdsf/edit // 없는 페이지일 때 ⇒ post 레이아웃의 404 페이지
