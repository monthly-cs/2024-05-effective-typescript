// @ts-nocheck
// 아이템 39. any를 구체적으로 변형해서 사용하기

function getLengthBad(array: any) {
  // Don't do this!
  return array.length
}

function getLength(array: any[]) {
  return array.length
}

/**
 *   any보다 any[]를 사용하는게 더 좋은이유 3가지
 *   1. 함수 내의 array.length 타입이 체크됨
 *   2. 함수의 반환타입이 any 대신 number[]로 추론됨
 *   3. 함수 호출될때 배열인지 체크됨
 */

getLengthBad(/123/) // No error, returns undefined
getLength(/123/)
// ~~~~~ Argument of type 'RegExp' is not assignable
//       to parameter of type 'any[]'


function hasTwelveLetterKey1(o: { [key: string]: any }) {
  for (const key in o) {
    if (key.length === 12) {
      return true
    }
  }
  return false
}

function hasTwelveLetterKey2(o: object) {
  for (const key in o) {
    if (key.length === 12) {
      console.log(key, o[key])
      //  ~~~~~~ Element implicitly has an 'any' type
      //         because type '{}' has no index signature
      return true
    }
  }
  return false
}

/**
 *   o: { [key: string]: any }
 *   o: object
 *   두개의 차이점
 *
 *   object 타입은 객체의 키를 열거할 수 있지만, 속성에 접근할 수는 없다.
 *   인덱스 시그니쳐가 없기 떄문!
 *   하지만 원시타입을 제외한 모든 값을 포함한다.
 *   객체의 세부적인 구조를 정의하지 않으며 단순히 객체임을 나타낸다.
 *
 *   반면에 { [key: string]: any } 타입은 객체의 키를 열거할 수도 있고, 속성에 접근도 할 수 있음.
 *   동적 속성을 가지는 객체에 유용할듯
 *   다르게 쓰는 방법으로 Record<string,any>가 있고, 둘은 완전히 취향차이라고 함
 *
 *   객체지만 속성에 접근할 수 없어야 한다면 unknown타입이 필요한 상황일 수 있음
 *   unknown은 B조 발표자분께서 잘 설명 해주실거라고 생각함! ㅎㅎ
 *
 */


type Fn0 = () => any // 매개변수 없이 호출 가능한 모든 함수
type Fn1 = (arg: any) => any // 매개변수 한개
type FnN = (...args: any[]) => any // Function 타입과 동일함 매개변수 갯수의 제한이 없음
export default {}