//@ts-nocheck
// 아이템 41. any의 진화를 이해하기

function range1(start: number, limit: number) {
  const out = []
  for (let i = start; i < limit; i++) {
    out.push(i)
  }
  return out
}

// any[]로 추론되던 것이 return될때는 number[]로 추론됨


const result = []
result.push('a')
console.log(result)
result.push(1)
console.log(result)


let val1
if (Math.random() < 0.5) {
  val1 = /hello/
  console.log(val1)
} else {
  val1 = 12
  console.log(val1)
}
console.log(val1)

//조건문에선 분기에 따라 타입이 변할 수 있음.


function somethingDangerous() {
}

let val2 = null
try {
  somethingDangerous()
  val2 = 12
  console.log(val2)
} catch (e) {
  console.warn('alas!')
}
console.log(val2)
// 변수의 초기값이 null인 경우에도 any의 진화가 일어남


let val3: any
if (Math.random() < 0.5) {
  val3 = /hello/
  console.log(val3)
} else {
  val3 = 12
  console.log(val3)
}
console.log(val3)

// noImplicitAny가 설정된 상태에서 명시적으로 any를 선언하면 타입이 그대로 유지됨


function range2(start: number, limit: number) {
  const out = []
  //    ~~~ Variable 'out' implicitly has type 'any[]' in some
  //        locations where its type cannot be determined
  if (start === limit) {
    return out
    //     ~~~ Variable 'out' implicitly has an 'any[]' type
  }
  for (let i = start; i < limit; i++) {
    out.push(i)
  }
  return out
}


/**
 *  위와 같이 any인 상태의 변수에 어떤 할당도 하지 않고 사용하려하면 오류발생!
 */


function range3(start: number, limit: number) {
  const out = [] // Type is any[]
  for (let i = start; i < limit; i++) {
    out.push(i) // Type of out is any[]
  }
  return out // Type is number[]
}

function makeSquares1(start: number, limit: number) {
  const out = []
  // ~~~ Variable 'out' implicitly has type 'any[]' in some locations
  range3(start, limit).forEach(i => {
    out.push(i * i)
  })
  return out
  // ~~~ Variable 'out' implicitly has an 'any[]' type
}

function makeSquares2(start: number, limit: number) {
  let out = []
  out = range3(start, limit).map(i => i * i)
  return out
}

// 암시적 any 타입은 함수 호출을 거쳐도 진화하지 않는다.
// 루프로 순회하는 대신 map 메서드를 배열을 만들어 any 전체를 진화시키는 방법을 사용하면 된다!

export default {}