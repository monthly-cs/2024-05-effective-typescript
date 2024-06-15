> [!Note]  
> _6주차 발표자료입니다._

---

**Provide a Type for this in Callbacks if It's Part of Their API**

# 아이템 49: 콜백에 this에 대한 타입 제공하기

### JavaScript에서 `this`는 동적 스코프를 가집니다.

- 렉시컬 스코프를 가진 `let`, `const` 변수의 유효 범위는 코드 작성 시점에서 결정됩니다.
- 동적 스코프인 `this`는 호출되는 컨텍스트에 따라 달라집니다.

  - this는 클래스에서 인스턴스를 참조할 때 주로 사용됩니다.

    ```jsx
    class C {
      vals = [1, 2, 3];
      logSquares() {
        for (const val of this.vals) {
          console.log(val ** 2);
        }
      }
    }

    const c = new C();
    c.logSquares();

    const method = c.logSquares;
    method();

    // c.logSquares()
    // 인스턴스의 prototype의 logSquares 메소드 실행
    // this의 값을 c로 바인딩, this 참조: 인스턴스의 this는 생성된 객체의 this
    // c.logSquares를 참조하는 변수를 사용 << 함수의 this는 전역 this (strictmode에서 undefined)

    method.call(c); // call 메서드로 this를 바인딩
    ```

### 프로토타입 체인과 바인딩된 함수

```jsx
class ResetButton {
  constructor() {
    this.onClick = this.onClick.bind(this); // onClick 메서드의 컨텍스트를 현재 인스턴스로 바인딩
  }
  render() {
    return makeButton({ text: "Reset", onClick: this.onClick }); // 버튼 생성 후 onClick 핸들러 설정
  }
  onClick() {
    alert(`Reset ${this}`); // 버튼 클릭 시 실행되는 함수
  }
}
```

#### 바인딩

this.onClick.bind(this)는 onClick 메서드를 ResetButton 클래스의 인스턴스(this)와 바인딩합니다. 클릭 이벤트가 발생할 때 onClick 메서드 내부에서 this가 ResetButton 인스턴스를 가리키도록 합니다.

#### 조회 순서 lookup sequence

프로토타입의 체인 조회 순서 lookup sequence는 객체에서 속성이나 메서드를 찾을 때 참조하는 순서를 말합니다. 자바스크립트는 객체의 프로토타입 체인을 따라 상위 객체에 정의된 속성이나 메서드를 찾습니다.

onClick() 메서드 내부에서 alert(Reset ${this});를 호출할 때, this는 현재 클릭된 버튼 객체가 아니라 ResetButton 인스턴스를 가리키게 됩니다. this.onClick.bind(this);에서 onClick 메서드의 컨텍스트를 명시적으로 ResetButton 인스턴스로 바인딩했기 때문입니다.

### 콜백 함수에서 `this` 바인딩 문제 해결 패턴

- 화살표 함수는 상위 스코프의 `this`를 그대로 사용하여 `this` 바인딩 문제를 회피할 수 있습니다.
- TypeScript는 JavaScript의 `this` 바인딩을 모델링하므로, `this`를 사용하는 콜백 함수에 대해 고려해야 합니다.
- 라이브러리 사용자가 콜백 함수에서 `this`를 참조할 수 있습니다. 콜백 함수를 화살표 함수로 작성하면 TypeScript가 에러를 검출할 수 있습니다.

```tsx
class ResetButton {
  render() {
    return makeButton({ text: "Reset", onClick: this.onClick });
  }
  onClick = () => {
    alert(`Reset ${this}`);
  };
}
```

### 주의할 점

- `this` 바인딩 작동 원리를 이해하기
- API 만들 때 콜백함수의 this 타입 제공하기
- 동적 바인딩 피하기
  - 화살표 함수
  - 명시적 바인딩 bind()
  - 콜백 함수나 이벤트 핸들러에서 this를 참조하지 않도록 설계

---

**Prefer Conditional Types to Overload Signatures**

## 아이템 50: 오버로딩 타입보다는 조건부 타입을 사용하기

### 함수 오버로딩

- 함수 오버로딩은 유니온 타입 혹은 너무 구체적인 제너릭을 사용하여, 모호성이나 과도한 특수성을 가질 수 있습니다.

```tsx
// ❌ 너무 모호한 예시
declare function double(x: string | number): string | number;
const num = double(12);
//    ^? const num: string | number
const str = double("x");
//    ^? const str: string | number

// ❌ 너무 구체적인 예시
declare function double<T extends string | number>(x: T): T;
const num = double(12);
//    ^? const num: 12
const str = double("x");
//    ^? const str: "x"
```

- 또는 오류가 발생할 수 있습니다.

```tsx
declare function double(x: number): number;
declare function double(x: string): string;

function f(x: string | number) {
  return double(x);
  //            ~ 'string | number' 타입의 인수는 'string' 타입의 매개변수에 할당할 수 없습니다.
  // ❌ 오버로딩된 타입들은 순차적으로 일치하는 타입을 찾기 때문에 'string | number'는 'string'에 할당할 수 없습니다.

  // string | number을 number에 할당할 수 없다.
  // string | number을 string에 할당할 수 없다.
  // 할당할 수 없다
}
```

### 조건부 타입 사용하기 👏

- 조건부 타입을 사용하면 제너릭을 적용하여 더 명확하게 함수를 정의할 수 있습니다.
- 유니언 타입에 조건부 타입을 적용하면, 조건에 따라 타입이 분기됩니다.

```tsx
function double<T extends string | number>( // T는 string | number
  x: T
): T extends string ? string : number; // 그런데? T가 string이면 string 리턴, 아니면 number

function double(x: string | number) {
  // return x + x;
  //        ~~~~~ Operator '+' cannot be applied to types 'string | number' and 'string | number'.ts(2365)
  //              (parameter) x: string | number

  return typeof x === "string" ? x + x : x + x;
}
```

### 주의할 점

- 오버로딩된 타입보다는 조건부 타입을 사용하기. 조건부 타입은 유니언 타입을 지원하면서 추가적인 오버로딩 없이 함수를 선언하기
- 만약 유니언 타입이 사용하기에 적절하지 않다면, 함수를 더 명확하게 나누어 다른 이름으로 구현하는 것도 고려하기
- 선언된 함수에 대해 조건부 타입을 사용하여 단일 오버로드 전략(단일 함수)을 고려하기

### 요약

- 오버로딩 타입보다는 조건부 타입을 사용하여 함수를 구현하는 것이 바람직합니다. 이는 유니언 타입을 지원하면서도 더 명확하고 간결한 코드를 작성할 수 있게 해줍니다.
- 함수를 정의할 때, 조건부 타입을 통해 유연성과 명확성을 동시에 확보할 수 있습니다.

---

**Mirror Types to Sever Dependencies**

## 아이템 51: 의존성 분리를 위해 미러 타입 사용하기

라이브러리나 모듈 개발 시, 타입 의존성을 관리하는 방법 중 하나로 **미러 타입**을 사용하는 것이 좋습니다. 프로젝트의 외부 의존성을 줄이고, 필요하지 않은 타입 선언의 전이적 의존성(transitive type dependencies)을 피할 수 있습니다.

### 라이브러리 의존 타입 예시

예를 들어, Node.js 환경에서 사용하는 Buffer 타입을 위해 `@types/node`를 devDependency로 추가하는 경우가 있습니다. 그러나 이는 Node.js 개발자가 필요로 하는 타입이므로, 웹 개발에 Node.js가 필요하지 않은 경우에는 필요하지 않은 의존성입니다.

### 미러링된 타입 인터페이스

프로젝트가 Node.js와 무관한 경우에는 필요한 부분만 추출하여 미러 타입 인터페이스를 만들어 사용할 수 있습니다. 이는 필요한 타입 선언을 프로젝트 내에 명시적으로 유지하면서, 외부 의존성을 줄이고 관리하기 쉽게 합니다.

### 조건부 타입 사용

또한, 구조적 타이핑을 사용하여 필수가 아닌 의존성을 분리하는 것도 중요합니다. 이를 통해 라이브러리나 모듈이 사용되는 환경에 따라 필수 타입과 선택적 타입을 구분할 수 있습니다.

### 주의할 점

- 반드시 필요한 경우가 아니라면, 프로젝트에 전이적인 타입 의존성을 추가하지 않는 것이 좋습니다. 이는 의존성 관리와 버전 충돌 문제를 줄이며 배포 및 업데이트 과정을 간소화합니다.
- 특히, JavaScript 개발자나 Node.js와 관련 없는 개발자에게는 `@types`에 대한 강제 의존성을 지양해야 합니다.

---

**Write Tests for Your Types**

## 아이템 52: 테스팅 타입의 함정에 주의하기

프로젝트를 공개할 때, 코드뿐만 아니라 타입에 대한 테스트 코드도 작성하는 것이 중요합니다. 이는 코드의 안정성을 보장하고 타입 시스템의 일관성을 유지하는 데 도움이 됩니다.

### 헬퍼 함수를 만들어 사용

타입 테스트를 위해 헬퍼 함수를 사용할 수 있습니다. 그러나 일반적인 방식으로 사용할 경우 몇 가지 주의할 점이 있습니다.

```tsx
// 타입을 assert하는 헬퍼 함수
function assertType<T>(x: T) {}
```

#### assertType 헬퍼 함수의 문제점

- 할당 가능성(assignability)을 체크하기 때문에 심볼에도 `string` 또는 `number`를 할당할 수 있습니다.

```tsx
const n = 12;
assertType<number>(n); // OK
```

- 매개변수의 갯수를 체크하지 않기 때문에, 매개변수가 적은 함수도 할당할 수 있습니다.

```tsx
const double = (x: number) => 2 * x;
assertType<(a: number, b: number) => number>(double); // OK
```

#### 개선된 방법 (Parameters, ReturnType)

매개변수의 타입과 반환 타입을 분리하여 테스트하는 것이 좋습니다.

```tsx
const double = (x: number) => 2 * x;

declare let p: Parameters<typeof double>;
assertType<[number]>(p); // 매개변수 타입 테스트

declare let r: ReturnType<typeof double>;
assertType<number>(r); // 반환 타입 테스트
```

### this 테스트 통과하기

```tsx
const beatles = ["john", "paul", "george", "ringo"]; // string[]

assertType<number[]>(
  map(beatles, function (name, i, array) {
    // ~~~ Argument of type '(name: any, i: any, array: any) => any' is
    //     not assignable to parameter of type '(u: string) => any'

    assertType<string>(name); // name은 string
    assertType<number>(i); // index는 숫자
    assertType<string[]>(array); // array는 문자열 배열
    assertType<string[]>(this); // this는 암시적 any <- 여기서 문제
    //                   ~~~~ 'this' implicitly has type 'any'
    return name.length; //각 문자열의 길이를 반환합니다.
  })
);

// 다음 map을 선언해서 any 오류를 없앨 수 있습니다~
declare function map<U, V>(
  array: U[],
  fn: (this: U[], u: U, i: number, array: U[]) => V
): V[];
// this가 U의 배열임을 명시함
```

### dtslint

DefinitelyTyped에서는 dtslint를 사용하여 타입 선언을 테스트할 수 있습니다.

#### 주석을 통한 동작

dtslint는 주석을 사용하여 동작하며, 각 심볼에 대한 타입을 추출하여 검사합니다.

#### 글자 자체의 비교

도구는 주어진 타입 정의 파일에서 각 심볼의 타입을 추출하고, 이를 기반으로 타입 정의 파일의 내용을 검사합니다. 이 과정에서 주어진 타입이 명시된대로 실제로 적용되는지를 확인합니다.

#### 한계

타입 간의 정확한 일치를 보장하기 위해 심볼의 "글자 자체"만을 비교합니다.

예를 들어 string과 any의 할당 가능성, 또는 number|string과 string|number의 정확한 타입 일치 여부를 비교하는 데 어려움을 초래할 수 있습니다.

```tsx
// 일반적으로 dtslint를 사용할 때는 주석을 통해 각 심볼의 타입이 올바르게 명시되었는지를 확인합니다.
const beatles = ["john", "paul", "george", "ringo"];
map(
  beatles,
  function (
    name, // $ExpectType string
    i, // $ExpectType number
    array // $ExpectType string[]
  ) {
    this; // $ExpectType string[]
    return name.length;
  }
); // $ExpectType number
```

### expect-type 라이브러리

타입 일치를 검사하는 라이브러리로, 타입 테스트를 더욱 편리하게 할 수 있습니다.

```tsx
import { expectTypeOf } from "expect-type";

const beatles = ["john", "paul", "george", "ringo"];
expectTypeOf(
  map(beatles, function (name, i, array) {
    expectTypeOf(name).toEqualTypeOf<string>();
    expectTypeOf(i).toEqualTypeOf<number>();
    expectTypeOf(array).toEqualTypeOf<string[]>();
    expectTypeOf(this).toEqualTypeOf<string[]>(); // this 타입 테스트
    return name.length;
  })
).toEqualTypeOf<number[]>();
```

### 주의할 점

- 타입 테스트 시 함수 타입에 대한 동일성과 할당 가능성의 차이를 이해하기
- 콜백 함수를 사용하는 함수의 경우, 콜백 파라미터의 추론된 타입을 테스트하고 API의 일환으로 `this`의 타입도 확인할 것
- 직접적인 타입 테스트 코드를 작성하는 대신, 일반적으로 사용되는 도구를 활용하자.
  - 도구: vitest, expect-type, Type Challenges 접근법, (타입 디스플레이)eslint-plugin-expect-type
