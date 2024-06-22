## 아이템 53. 타입스크립트 기능보다는 ECMAScript 기능을 사용하기

### 요약

- 일반적으로 타입스크립트 코드에서 모든 타입 정보를 제거하면 자바스크립트가 되지만,
- 열거형, 매개변수 속성, 트리플 슬래시 임포트, 데코레이터는 타입 정보를 제거한다고 자바스크립트가 되지는 않는다.
- 타입스트립트의 역할을 명확하게 하려면, 열거형, 매개변수 속성, 트리플 슬래시 임포트, 데코레이터는 사용하지 않는 것이 좋다.
- 타입스크립트의 원칙(역할) = 런타임 기능이 아닌, 오직 타입 기능만 발전시킨다.

```typescript
enum Status {
  Active,
  Inactive,
  Pending
}

interface Status2 {
  Active: 0
  Inactive: 1
  Pending: 2
}

console.log(Status)
console.log(Status2)
```

### 문제점 1. 런타임 오버헤드

- 런타임에 객체로 존재하여 메모리를 차지함

[ts-playground](https://www.typescriptlang.org/play/?#code/KYOwrgtgBAygLgQzmAzlA3gKClAggYzgEsA3YAGmygEkQFDSKqAFUAEyJAHNMBfTIA)

- 결과물

```typescript
const status3 = {
  Active: 0,
  0: "Active",
  Inactive: 1,
  1: "Inactive",
  Pending: 2,
  2: "Pending"
}

console.log(Status.Active)
console.log(Status[0])
```

### 트리플 슬래시 임포트

```typescript
/// <reference types="vite/client" />
```

- Vite는 vite/client.d.ts을 통해 import.meta.hot에 대한 타입 정의를 제공하고 있습니다.
- src 디렉터리 아래에 env.d.ts를 생성해 TypeScript가 타입 정의를 찾을 수 있도록 할 수 있습니다:

#### IntelliSense for TypeScript

[github](https://github.com/vitejs/vite/blob/main/packages/vite/client.d.ts)

## 아이템 54. 객체를 순회하는 노하우

```typescript
const obj = {a: 1, b: 2, c: 3};

for (const [key, value] of Object.entries(obj)) {
  console.log(key, value)
}
```

### 가장 베스트라고 한다.

## 아이템 55. DOM 계층 구조 이해하기

- week7.ts