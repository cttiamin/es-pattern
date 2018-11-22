// Symbol 
{
  // 声明
  let a3 = Symbol.for('a3')
  let a4 = Symbol.for('a3')
  // console.log(a3 === a4)     // true
}

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
