// Symbol 

Symbol.for('a3') === Symbol.for('a3')

{
  let a1 = Symbol.for('abc')
  let obj = {
    [a1]: '123',
    abc: 345,
    c: 456
  }
  console.log('obj', obj) 
  // {abc: 345, c: 456, Symbol(abc): "123"}

  for (let [key, value] of Object.entries(obj)) {
    console.log(key, value)
  }

  Object.getOwnPropertySymbols(obj).forEach(function(item) {
    console.log(obj[item])
  })

  Reflect.ownKeys(obj).forEach(function(item) {
    console.log('ownkeys', item, obj[item])
  })
}

///////////////////////////////
// iterator， for of 中使用
{
  let arr = ['hello', 'world'];
  let map = arr[Symbol.iterator]();
  // console.log(map.next());  // {value: "hello", done: false}
  // console.log(map.next());  // {value: "world", done: false}
  // console.log(map.next());  // {value: "world", done: false}
}

{
  let obj = {
    start: [1, 3, 2],
    end: [7, 9, 8],
    [Symbol.iterator]() {
      let self = this;
      let index = 0;
      let arr = self.start.concat(self.end);
      let len = arr.length;
      return {
        next() {
          if (index < len) {
            return {
              value: arr[index++],
              done: false
            };
          } else {
            return {
              value: arr[index++],
              done: true
            };
          }
        }
      };
    }
  };
  for (let key of obj) {
    console.log(key);
  }
}

// {
//   let arr = ['hello', 'world'];
//   for (let value of arr) {
//     console.log(value);
//   }
// }