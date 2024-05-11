function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: number, b: number) {
  return a + b;
}

const three = add(1, 2); // 타입이 number
const twelve = add('1', '2'); // 타입이 string

console.log(three, twelve);
