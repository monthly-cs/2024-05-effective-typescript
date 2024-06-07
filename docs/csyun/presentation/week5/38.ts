// @ts-nocheck
// 아이템 38. any타입은 가능한 한 좁은 범위에서만 사용하기

interface Foo {
  foo: string
}

interface Bar {
  bar: string
}

declare function expressionReturningFoo(): Foo

function processBar1(b: Bar) {
  /* ... */
}

function f() {
  const x = expressionReturningFoo()
  processBar1(x)
  //         ~ Argument of type 'Foo' is not assignable to
  //           parameter of type 'Bar'
}


// x를 할당 가능하게 하려면 방법은 2가지

function f1() {
  const x: any = expressionReturningFoo()
  processBar1(x)
  return x;
}

function f2() {
  const x = expressionReturningFoo()
  processBar1(x as any)
  return x;
}

function f3() {
  const x = expressionReturningFoo()
  //@ts-ignore
  processBar1(x)
  return x;
}

/**
 *  저자는 f2방법이 제일 낫다고 설명한다
 *  1. any타입이 processBar함수의 매개변수에만 영향을 끼치기 때문 (좁은 지역으로)
 *  2. f1에서는 x의 타입이 마지막까지 any인 반면 f2는 Foo타입이다.
 */


function g() {
  const foo = f1() // Type is any
  foo.fooMethod() // This call is unchecked!
}

/**
 *  1. 함수의 반환타입이 any라면 프로젝트 전반에 큰 영향을 끼칠 수 있다
 *  2. 그래서 any의 사용범위를 좁혀야 한다.
 *  3. 함수의 반환타입에 관한 자세한 내용은 아이템 19에서 자세하게 다룬다.
 */

// ------------------------------------------------------------------------------------------------------------------------------

interface Foo {
  foo: string
}

interface Bar {
  bar: string
}

declare function expressionReturningFoo(): Foo

function processBar(b: Bar) {
  /* ... */
}

interface Config {
  a: number
  b: number
  c: {
    key: Foo
  }
}

declare const value: Bar
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value,
    // ~~~ Property ... missing in type 'Bar' but required in type 'Foo'
  },
}


// 역시 방법은 as any

const config1: Config = {
  a: 1,
  b: 2,
  c: {
    key: value,
  },
} as any

// 하지만 최소한의 범위에 적용하는게 좋으므로

const config2: Config = {
  a: 1,
  b: 2,
  c: {
    key: value as any,
  },
}


export default {}