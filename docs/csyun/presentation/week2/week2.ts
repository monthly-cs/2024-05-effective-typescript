// @ts-nocheck
{
  let num1 = 10;
// 추론된 타입이 number

  const num2 = 10;
// 추론된 타입이 literal 10

// number or 10이라고 타입을 지정하지 않았지만 ts는 값을보고 타입을 추론할 수 있다.

  function add(a: number, b: number) {
    return a + b;
  }

// 함수의 타입도 추론 할 수있다.
// return type을 명시하지 않았지만 number로 추론하는 모습

  type ABFunction = typeof add

  const minus: ABFunction = (a, b) => {
    return a - b
  }

  function logMessage(message: string | null) {
    if (message) {
      return message
    }

    return message
  }

// strictNullChecks에 따라 message의 추론된 타입이 달라짐
// 조건문의 분기에서 타입이 어떻게 변하는지 볼 수 있음


  const foo = {
    x: [1, 2, 3],
    bar: {
      name: "Fred"
    }
  }


// 객체의 타입도 추론할 수 있음


  function gerElement(elOrId: string | HTMLElement | null): HTMLElement {
    if (typeof elOrId === "object") {
      return elOrId;
    } else if (elOrId === null) {
      return document.body;
    } else {
      const el = document.getElementById(elOrId)
      return el
    }
  }


  /*
   첫번째 오류를 잡으려면 null 타입을 걸러야 한다.
   typeof null === "object" 이기 때문에 걸러지지 않는다.

    * typeof null === "object"인 이유는 자바스크립트 첫번째 버전의 버그라고 한다
   (출처) https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/typeof#null

    두번째 오류를 잡으려면 마찬가지로 el !== null 체크를 해야한다.

  */
}


{

  type A = "A";
  type B = "B";
  type Twelve = 12;
  // unit or literal type

  type AB = A | B;
  type ABTwelve = AB | Twelve;
  // union type
  // 유니온 타입은 값 집합들의 합집합

  const a: AB = "A"; // 정상 "A"는 {"A","B"} 의 원소
  const c: AB = "C"; // "C"는 AB 타입에 할당할 수 없음


  interface Person {
    name: string;
  }

  interface Lifespan {
    birth: Date
    death: Date
  }

  type PersonSpan = Person & Lifespan;

  const ps: PersonSpan = {
    name: "Fred",
    birth: new Date(),
    death: new Date(),
  }

  type K = keyof (Person | Lifespan) // never


  interface Point {
    x: number;
    y: number;
  }

  function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
    // ~~~ 대충 함수 있다는 뜻
    return vals
  }

  const pts: Point[] = [{x: 1, y: 1}, {x: 2, y: 2}]
  sortBy(pts, 'x')
  sortBy(pts, 'y')
  sortBy(pts, 'z')
  // 'x','y'는 keyof T를 상속
  // 'z'는 interface Point에 없어서 상속이 안됨


  const list = [1, 2]
  const tuple: [number, number] = list
  // number[]는 [number,number]의 부분집합이 아님, 반대로는 동작함

  const list2: [number, number] = [1, 2]
  const tuple2: number[] = list2


  const triple: [number, number, number] = [1, 2, 3]
  const double: [number, number] = triple;
  // 모델링을 {0:number, 1:number} 이 아닌
  // {0:number, 1:number, length:2} 로 해서 double과 tripple의 length 값이 맞지 않아 오류 발생
  // 길이를 비교하는것은 합리적인 방법이며 더 나은 방법은 없을것

  type T = Exclude<string | Date, string | number>

  type NomZeroNums = Exclude<number, 0>

  const zero: NomZeroNums = 0
  // NomZeroNums의 타입은 여전히 number기 떄문에 number에서 0을 Exclude 해도 할당 됨
}

{

  interface Cylinder {
    radius: number;
    height: number;
  }

  const Cylinder = (radius: number, height: number) => ({radius, height})
  // interface Cylinder와 const Cylinder는 이름만 같고 서로 아무 관련도 없다
  // 이런점이 오류를 일으키기도 함

  function calculateVolume(shape: unknown) {
    if (shape instanceof Cylinder) {
      return shape.radius
    }
  }


  // instanceof 연산자는 자바스크립트 런타임 연산자고 값에 대해서 연산을 함
  // 그래서 instanceof Cylinder는 타입이 아니라 함수를 참조함


  class Cylinder2 {
    radius = 1;
    height = 1;
  }

  function calculateVolume2(shape: unknown) {
    if (shape instanceof Cylinder2) {
      const a = shape
      return shape.radius
    }
  }

  // 클래스가 타입으로 쓰일떄는 형태로 사용
  // 클래스가 값으로 사용되면 생성자가 사용됨
}

{
  interface Person {
    name: string;
  }

  {
    const alice: Person = {name: 'Alice'}
    const bob = {name: 'Bob'} as Person
  }
  //결과가 같아 보이지만 그렇지 않다.

  {
    const alice: Person = {};
    const bob = {} as Person;
  }
  // 타입 단언은 타입체커에게 오류를 무시하라고 하는것
  // any와 다를바가 없다

  {
    const alice: Person = {name: 'Alice', occupation: "Typescript developer"}
    const bob = {name: 'Alice', occupation: "Typescript developer"} as Person;
  }
  // 속성을 추가할 떄도 마찬가지

  {
    const alice = <Person>{};
    const bob = {} as Person;
  }
  // 타입 단언의 원래 문법이며 as 문법과 같다

  const people = ['alice', 'bob', 'jan'].map((name) => {
    return {name} as Person
  })
  //문제가 없는것 처럼 보인다.

  const people2 = ['alice', 'bob', 'jan'].map((name) => {
    return {} as Person
  })
  //마찬가지로 Person[]로 추론을 해버린다 오류!

  const people3 = ['alice', 'bob', 'jan'].map((name) => {
    const person: Person = {name}
    return person;
  })
  //or
  const people4 = ['alice', 'bob', 'jan'].map((name): Person => {
    return {name}
  })
  //이렇게 사용하는 것이 가장 이상적이고 직관적인 방법


  const elNull = document.getElementById('foo')
  const el = document.getElementById('foo')!
  // 접미사로 쓰이는 "!"는 null이 아니라는 단언문으로 해석함

  document.querySelector('#myButton')!.addEventListener('click', (e) => {
    const $target = e.currentTarget
    const button = e.currentTarget as HTMLButtonElement
  })
  // 개발자는 '#myButton'이랑 e.currentTarget이 같은 버튼이란걸 알지만
  // TS는 DOM에 접근할 수 없기 때문에 TS는 알지 못한다.
  // 타입스크립트가 알지 못하는 정보를 개발자는 알고 있을때 타입 단언문을 쓰는것은 타당하다
}

{
  //아이템 10은 IDE에서 다 막아버리는것 같은데?
  let x = 'hello'
  x.language = "English"

  // new String도 못함
  // warning message = 기본 타입 객체 래퍼가 사용되었습니다
  const value = 'hello' === String('hello')

  function isGreeting(phrase: String) {
    return [
      'hello',
      'good day'
    ].includes(phrase)
  }
}

{
  interface Room {
    numDoors: number
    ceilingHeightFt: number;
  }

  const r: Room = {
    numDoors: 2,
    ceilingHeightFt: 10,
    elephant: 'present'
  }
  // 덕타이핑으로 에러가 안나야 할것 같은데 난다


  const obj = {
    numDoors: 2,
    ceilingHeightFt: 10,
    elephant: 'present'
  }
  const r2: Room = obj
  //에러 없는 정상 할당됨

  /*
  차이점은 첫번째 예제에선 구조적 타입 시스템에서 발생할 수 있는 "중요한 종류의 오류"를 잡을 수 있도록
  '잉여 속성 체크' 라는 과정이 수행됨

  그러나 조건에 따라 '잉여 속성 체크'가 동작하지 않을 수 있음(예제2)
   */


  interface Options {
    title: string;
    darkMode?: boolean;
  }

  const o1: Options = document
  const o2: Options = new HTMLAnchorElement
  //document, HTMLAnchorElement 모두 string 타입인 title 속서을 갖고 있기 때문에 할당문은 정상
  //Options 타입은 정말 넓은 타입임


  const o3: Options = {darkmode: true, title: 'Ski Free'};
  // o3 는 객체 리터럴을 할당하기 때문에 잉여 속성 체크가 되고 있고

  const intermediate = {darkmode: true, title: 'Ski Free'};
  const o4: Options = intermediate;
  // o4는 객체 리터럴을 할당하는게 아니기 떄문에 잉여 속성 체크를 건너 뜀

  o4.darkMode
  o4.darkmode
  // 그러나 darkmode를 사용할 순 없다

  const o5 = {darkmode: true, title: 'Ski Free'} as Options;
  // 타입 단언을 해도 잉여 속성 체크를 건너 뜀
  // 이 역시 단언문보다 선언문을 사용 해야 하는 이유
}

{
  function rollDice1(sides: number): number {
    return sides
  } // 문장 (statement)

  const rollDice2 = function (sides: number): number {
    return sides
  } // 표현식 (expression)

  const rollDice3 = (sides: number): number => {
    return sides
  } // 표현식 (expression)

  type DiceRollFn = (sides: number) => number
  const rollDice4: DiceRollFn = (sides) => {
    return sides
  } // 이미 sides를 number로 추론하고 있음


  async function getQuote() {
    const response = await fetch('/quote?by=Mark+Twain')
    const quote = await response.json()
    return quote
  }

  // 이 함수는 버그가 존재함
  // /quote가 존재 하지 않다면 '404 Not Found'가 포함된 내용을 응답할건데 이 형식은 JSON형식이 아닐 수 있음

  const checkFetch: typeof fetch = async (input, init) => {
    const response = await fetch(input, init)
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
    return response.json()
  }
  // throw가 아니라 return을 하면 에러가 발생
}



