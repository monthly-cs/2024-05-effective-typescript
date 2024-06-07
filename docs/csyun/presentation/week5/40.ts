// @ts-nocheck
// 아이템 40. 함수 안으로 타입 단언문 감추기

declare function shallowEqual1(a: any, b: any): boolean

function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null
  let lastResult: any
  return function (...args: any[]) {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~
    //          Type '(...args: any[]) => any' is not assignable to type 'T'
    if (!lastArgs || !shallowEqual1(lastArgs, args)) {
      lastResult = fn(...args)
      lastArgs = args
    }
    return lastResult
  }
}

/**
 *   원래 함수 fn을 감싸서,
 *   같은 인자로 여러 번 호출되면 원래 함수를 다시 실행하지 않고 이전 결과를 반환
 *
 *   cacheLast에 T타입으로 들어온 함수와 return하는 T함수가 우리는 같다는걸 알지만
 *   타입스크립트는 모른다
 *
 */


function cacheLast2<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null
  let lastResult: any
  return function (...args: any[]) {
    if (!lastArgs || !shallowEqual1(lastArgs, args)) {
      lastResult = fn(...args)
      lastArgs = args
    }
    return lastResult
  } as unknown as T
}

/**
 *   그래서 as unknown as T 로 단언을 해준다.
 *   함수 내부에는 any가 많이 보이지만 호출하는쪽에서는 any가 사용됐는지 모른다.
 *
 */



function shallowObjectEqual2<T extends object>(a: T, b: T): boolean {
  // 이 함수는 두 개의 객체 'a'와 'b'를 받아서
  // 얕은(shallow) 비교를 통해 두 객체가 같은지 확인합니다. 'T'는 객체 타입을 의미합니다.

  for (const [k, aVal] of Object.entries(a)) {
    // 'a' 객체의 모든 키-값 쌍을 반복합니다.
    // Object.entries(a)는 'a' 객체의 모든 키-값 쌍을 배열 형태로 반환합니다.
    // 예: { name: "Alice", age: 25 } -> [["name", "Alice"], ["age", 25]]

    if (!(k in b) || aVal !== b[k]) {
      // ~~~~ Element implicitly has an 'any' type
      //      because type '{}' has no index signature
      // 'b' 객체에 'k' 키가 없거나, 'a' 객체의 값 'aVal'이 'b' 객체의 해당 값과 다르면

      return false
      // 객체 'a'와 'b'가 다르다고 판단하여 false를 반환합니다.
    }
  }

  return Object.keys(a).length === Object.keys(b).length
  // 마지막으로 'a'와 'b' 객체의 키 개수가 같은지 확인합니다.
  // 키의 개수가 다르면 두 객체는 다르므로 false를 반환하고,
  // 키의 개수가 같으면 true를 반환합니다.
}

/**
 *   if구문에서 k in b로 b객체에 k속성이 있다는것을 확인 했지만 b[k]에서 오류가 발생하는것은 이상하다.
 *   어쨌든 오류가 아니라는것을 알고 있기 때문에 any로 단언하는 수 밖에 없다.
 */


function shallowObjectEqual3<T extends object>(a: T, b: T): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== (b as any)[k]) {
      return false
    }
  }
  return Object.keys(a).length === Object.keys(b).length
}

// 타입 선언문은 일반적으로 타입을 위험하게 만들지만, 불가피하게 사용해야 한다면 정확한 정의를 가지는 함수 안으로 숨기도록 해야 한다.

export default {}
