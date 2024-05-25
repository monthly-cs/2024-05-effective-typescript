// @ts-ignore
/** 4-1 */
// not good!
let xNot: number = 12;

// enough!
let xGood = 12;

/** 4-2 */
// 객체 추론
const person = {
  name: "Sojourner Truth",
  born: {
    where: "Swartekill, NY",
    when: "c.1797",
  },
  died: {
    where: "Battle Creek, MI",
    when: "Nov. 26, 1883",
  },
};
// {
//   name: string;
//   born: {
//     where: string;
//     when: string;
//   };
//   died: {
//     where: string;
//     when: string;
//   }
// }

// 함수의 반환 타입 추론
function square(nums: number[]) {
  return nums.map((x) => x * x);
}
const squares = square([1, 2, 3, 4]);
//    ^? const squares: number[]

/** 5 */
interface Product {
  id: string;
  name: string;
  price: number;
}

function logProductNot(product: Product) {
  // @ts-ignore
  const id: number = product.id;
  // ~~ Type 'string' is not assignable to type 'number'
  const name: string = product.name;
  const price: number = product.price;
  console.log(id, name, price);
}

function logProductGood(product: Product) {
  const { id, name, price } = product;
  console.log(id, name, price);
}

/** 6-1 */
// Don't do this:
// @ts-ignore
app.get("/health", (request: express.Request, response: express.Response) => {
  response.send("OK");
});

// Do this:
// @ts-ignore
app.get("/health", (request, response) => {
  //                ^? (parameter) request: Request<...>
  response.send("OK");
  // ^? (parameter) response: Response<...>
});

/** 6-2 */
// @ts-ignore
import _ from "lodash";

interface FoodItem {
  icon: string;
  category: string;
  price: number;
}

const foodItems: FoodItem[] = [
  { icon: "🍔", category: "Fast Food", price: 5000 },
  { icon: "🍕", category: "Fast Food", price: 8000 },
  { icon: "🍣", category: "Japanese", price: 12000 },
  { icon: "🍜", category: "Japanese", price: 10000 },
  { icon: "🍝", category: "Italian", price: 15000 },
  { icon: "🥗", category: "Healthy", price: 9000 },
];

// Lodash의 groupBy를 사용할 때 콜백 함수의 매개변수 타입이 자동으로 추론됨
const groupedByCategory = _.groupBy(foodItems, (item) => item.category);

console.log(groupedByCategory);

/** 7-1 */
// @ts-ignore
const cache: { [ticker: string]: number } = {};
// @ts-ignore
function getQuote(ticker: string) {
  if (ticker in cache) {
    return cache[ticker]; // 구현 오류: Promise를 반환해야 한다!
  }
  return fetch(`https://quotes.example.com/?q=${ticker}`)
    .then((response) => response.json())
    .then((quote) => {
      cache[ticker] = quote;
      return quote as number;
    });
}

// 함수를 호출한 곳에서 에러가 발생한다
// @ts-ignore
getQuote("MSFT").then(considerBuying);
//               ~~~~ Property 'then' does not exist on type
//                    'number | Promise<number>'

// 의도된 반환 타입을 명시하여 => 에러가 발생한 위치를 정확히 표기하기
// @ts-ignore
const cache: { [ticker: string]: number } = {};
// @ts-ignore
function getQuote(ticker: string): Promise<number> {
  if (ticker in cache) {
    // @ts-ignore
    return cache[ticker];
    // ~~~ Type 'number' is not assignable to type 'Promise<number>'
  }
  // ...
}

/** 9 */
declare const fetchProduct;
declare const fetchProductBySerialNumber;

let productIdA: string | number = "12-34-56";
fetchProduct(productIdA);

// 타입을 좁혀서 다른 타입을 사용할 수 있습니다.
productIdA = 123456; // OK
fetchProductBySerialNumber(productIdA); // OK

// 다른 변수를 사용하는 것이 좋습니다
const productIdB = "12-34-56";
fetchProduct(productIdB);

const serial = 123456; // OK
fetchProductBySerialNumber(serial); // OK

// 스코프
const productIdC = "12-34-56";
fetchProduct(productIdC);

{
  const productIdC = 123456; // OK
  fetchProductBySerialNumber(productIdC); // OK
}

/** 11 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}
function getComponent(vector: Vector3, axis: "x" | "y" | "z") {
  return vector[axis];
}

let x = "x"; // const로 선언할 시 "x" 유닛 타입
let vec = { x: 10, y: 20, z: 30 };
// @ts-ignore
getComponent(vec, x);
//                ~ Argument of type 'string' is not assignable
//                  to parameter of type '"x" | "y" | "z"'

/** 12 */
function processPoint(point: { x: 10; y: 20 }) {
  // processPoint 내부에서는 point의 타입이 { x: 10, y: 20 }로 추론됩니다.
}
const p = { x: 10, y: 20 };
// @ts-ignore
processPoint(p);

const point = { x: 10, y: 20 } as const; // Type is { readonly x: 10, readonly y: 20 }

/** 13 */
type Point = [number, number];
const capitalsBad = {
  // @ts-ignore
  ny: [-73.7562, 42.6526, 148],
  //  ~~ Type '[number, number, number]' is not assignable to type 'Point'.
  // @ts-ignore
  ca: [-121.4944, 38.5816, 26],
  //  ~~ Type '[number, number, number]' is not assignable to type 'Point'.
} satisfies Record<string, Point>;

/** 15-1 */
const elemA = document.getElementById("what-time-is-it");
//    ^? const elem: HTMLElement | null
if (!elemA) throw new Error("Unable to find #what-time-is-it"); // null을 체크함
elemA.innerHTML = "Party Time".blink();
// ^? const elem: HTMLElement

/** 15-2 */
interface Apple {
  isGoodForBaking: boolean;
}
interface Orange {
  numSlices: number;
}
function pickFruit(fruit: Apple | Orange) {
  if ("isGoodForBaking" in fruit) {
    fruit;
    // ^? (parameter) fruit: Apple
  } else {
    fruit;
    // ^? (parameter) fruit: Orange
  }
  fruit;
  // ^? (parameter) fruit: Apple | Orange
}

/** 15-3 */
// [분기문] 값의 타입을 instacneof를 사용하여 좁힘
function containsA(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    return !!search.exec(text);
    //       ^? (parameter) search: RegExp
  }
  return text.includes(search);
  //                   ^? (parameter) search: string
}

/** 15-4 */
// [내장 함수]
function containsB(text: string, terms: string | string[]) {
  const termList = Array.isArray(terms) ? terms : [terms]; // 내장 메소드로 타입 좁히기
  //    ^? const termList: string[] 이제 string 배열
  // ...
}

/** 16-1  */

// [tagged union] 태그된 유니온, 또는 구별된 유니온 discriminated union
interface UploadEvent {
  type: "upload"; // 유니온!
  filename: string;
  contents: string;
}
interface DownloadEvent {
  type: "download"; // 유니온!
  filename: string;
}
type AppEvent = UploadEvent | DownloadEvent;

function handleEvent(e: AppEvent) {
  switch (e.type) {
    case "download": // 활용
      console.log("Download", e.filename);
      //                      ^? (parameter) e: DownloadEvent
      break;
    case "upload":
      console.log("Upload", e.filename, e.contents.length, "bytes");
      //                    ^? (parameter) e: UploadEvent
      break;
  }
}

/** 16-2  */
// 사용자 정의 타입 가드
function isInputElement(el: Element): el is HTMLInputElement {
  return "value" in el;
}

function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    // 인풋 엘리먼트이냐?
    return el.value;
    //     ^? (parameter) el: HTMLInputElement
  }
  return el.textContent;
  //     ^? (parameter) el: HTMLElement
}

/** 16-3 */
// 커스텀 타입 가드 예시
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

const jackson5 = ["Jackie", "Tito", "Jermaine", "Marlon", "Micheal"];
const members = ["Janet", "Micheal"]
  .map((who) => jackson5.find((n) => n === who))
  .filter(isDefined); // filter(x => x !== undefined)은 반환되는 타입에 영향을 주지 않음

/** 17 */
const elemB = document.getElementById("what-time-is-it");
//    ^? const elem: HTMLElement | null
if (typeof elemB === "object") {
  elemB;
  // ^? const elem: HTMLElement | null 🤷‍♀️
}

function maybeLogX(x?: number | string | null) {
  if (!x) {
    console.log(x);
    //          ^? (parameter) x: string | number | null | undefined 🤷‍♀️
  }
}

/** 19 */

const ptB = {}; // 변수의 타입이 {} 기준으로 추론됩니다.
//    ^? const ptB: {}
// @ts-ignore
ptB.x = 3;
// ~ Property 'x' does not exist on type '{}'
//  존재하지 않는 속성을 추가할 수 없습니다
// @ts-ignore
ptB.y = 4;
// ~ Property 'y' does not exist on type '{}'

// interface
interface PointB {
  x: number;
  y: number;
}
// @ts-ignore
const ptC: PointB = {}; // 속성이 없다!
// ~~ Type '{}' is missing the following properties from type 'PointB': x, y
ptC.x = 3;
ptC.y = 4;

// 해결A: 한 번에 객체 생성하기
const ptD: PointB = {
  x: 3,
  y: 4, // 한 번에 정의하기!
};

// 해결B: 단언
const pt = {} as Point;
//    ^? const pt: Point
// @ts-ignore
pt.x = 3;
// @ts-ignore
pt.y = 4; // OK

/** 20-1 */
const pt0 = {};
const pt1 = { ...pt0, x: 3 };
const pt2: PointB = { ...pt1, y: 4 }; // OK

/** 20-2 */
declare let hasMiddle: boolean;
const firstLast = { first: "Harry", last: "Truman" };
const president = { ...firstLast, ...(hasMiddle ? { middle: "S" } : {}) };
//    ^? const president: {
//         middle?: string; // 선택적 속성으로 추론됨!
//         first: string;
//         last: string;
//       }
// or: const president = {...firstLast, ...(hasMiddle && {middle: 'S'})};

/** 20-3 */
function addOptional<T extends object, U extends object>(
  a: T,
  b: U | null
): T & Partial<U> {
  return { ...a, ...b };
}
