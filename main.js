function add(a, b) {
    return a + b;
}
var three = add(1, 2); // 타입이 number
var twelve = add('1', '2'); // 타입이 string
console.log(three, twelve);
