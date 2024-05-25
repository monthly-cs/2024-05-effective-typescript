// @ts-nocheck

type Language = "JavaScript" | "Typescript" | "Python";

function setLanguage(language: Language) {
  return language
}

{
  let language = "JavaScript"
  setLanguage(language)
}

// language값을 제한하는 방법

{
//1. 타입 명시
  let language: Language = "JavaScript"
  setLanguage(language)
}
//2. const로 할당
{
  const language2 = "JavaScript"
  setLanguage(language2)
}

//튜플 사용시 주의점
function panTo1(where: [number, number]) {
  return where
}

{
  const loc = [10, 20]
  panTo1(loc)
}

function panTo2(where: [number, number]) {
  return where
}

{
  const loc = [10, 20] as const
  panTo2(loc)
  // 너무 과하게 정확해서 readonly가 없다고 해서 에러
}

// 책에선 최선의 해결책이 매개변수에 readonly를 붙히는거라고 했는데
// 내생각엔 타입을 선언해서 사용하는게 최선이라고 생각한다.

type Pan = [number, number]

function panTo3(where: Pan) {
  return where
}

{
  const loc: Pan = [10, 20]
  panTo3(loc)
}


// 객체사용시 주의점
interface GovernedLanguage {
  language: Language
  organization: string
}

function complain(language: GovernedLanguage) {
  return language
}

complain({language: "Typescript", organization: "Microsoft"})


const ts = {
  language: "Typescript",
  organization: "Microsoft"
}

complain(ts)

function callWidthFunction(fn: (n1: number, n2: number) => void) {
  fn(Math.random(), Math.random())
}

callWidthFunction((a, b) => {
  console.log(a, b)
})

const ex = (a, b) => {
  console.log(a, b)
}

callWidthFunction(ex)


