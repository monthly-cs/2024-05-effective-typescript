//24. 비동기 코드에는 콜백대신 async 함수 사용하기

function fetchUrl(url: string, cb: (response: string) => void) {
  cb(url)
}

const url1 = '1'
const url2 = '2'
const url3 = '3'

fetchUrl(url1, (response1) => {
  fetchUrl(url2, (response2) => {
    fetchUrl(url3, (response3) => {
      console.log(response3)
    })
    console.log(response2)
  })
  console.log(response1)
})

const page1Promise = fetch(url1);
page1Promise.then((response1) => {
  console.log(response1)
  return fetch(url2)
}).then((response2) => {
  console.log(response2)
  return fetch(url3)
}).then((response3) => {
  console.log(response3)
}).catch(err => {
  console.error(err)
})

async function fetchPages1() {
  const response1 = await fetch(url1)
  const response2 = await fetch(url2)
  const response3 = await fetch(url3)
  console.log(response1)
  console.log(response2)
  console.log(response3)
}

async function fetchPages2() {
  try {
    const response1 = await fetch(url1)
    const response2 = await fetch(url2)
    const response3 = await fetch(url3)
    console.log(response1)
    console.log(response2)
    console.log(response3)
  } catch (err) {
    console.error(err)
  }
}

async function fetchPages3() {
  const [response1, response2, response3] = await Promise.all([fetch(url1), fetch(url2), fetch(url3)])
  return [response1, response2, response3]
}


function timeout(millis: number): Promise<never> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('timeout'), millis)
  })
}

async function fetchWithTimeout(url: string, ms: number) {
  return Promise.race([fetch(url), timeout(ms)])
}

// Response | never 를 추론하는게 아닌 Response를 추론함
// never와의 공집합은 아무 의미가 없으므로 결과가 Promise<Response>로 간단해짐


async function getJson(url: string) {
  const response = await fetch(url)
  const jsonPromise = response.json()
  return jsonPromise
}

async function getJson2(url: string) {
  return "11"
}

// async 함수에서 Promise를 반환하면 또다른 프로미스로 래핑되지 않음
// Promise<Promise<T>>가 아닌 Promise<T>가 됨