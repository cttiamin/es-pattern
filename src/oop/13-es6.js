/*
1. 函数参数的默认值
2. rest 参数
3. 扩展运算符
4. 严格模式
5. name 属性
6. 箭头函数
7. 绑定 this
*/

//////////////////////////////
// 1. 函数参数的默认值
{
  // es6
  function Point(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  var p = new Point()
  // console.log(p);	// {x: 0, y:0}

  // 解构赋值默认值结合使用
  function foo({ x, y = 5 }) {
    // console.log(x, y);
  }
  foo({}) // undefined, 5
  foo({ x: 1 }) // 1, 5
  foo({ x: 1, y: 2 }) // 1, 2
  // foo();	// TypeError: Cannot read property 'x' of undefined

  //解构赋值默认值
  function fetch(url, { body = '', method = 'GET', headers = {} }) {
    console.log(method)
  }
  // fetch('http://example.com', {})
  // => GET
  function fetch2(url, { body = '', method = 'GET', headers = {} } = {}) {
    console.log(method)
  }
  // fetch2('http://example.com')
  // => "GET"

  function m1({ x = 0, y = 0 } = {}) {
    return [x, y]
  }
  function m2({ x, y } = { x: 0, y: 0 }) {
    return [x, y]
  }
  m1() // [0, 0]
  m2() // [0, 0]
  m1({ x: 3, y: 8 }) //[3, 8]
  m2({ x: 3, y: 8 }) //[3, 8]
  // x有值，y无值
  m1({ x: 3 }) //[3, 0]
  m2({ x: 3 }) //[3, undefined]
  // x, y 都无值
  m1({}) //[0, 0];
  m2({}) //[undefined, undefined]
  m1({ z: 3 }) // [0, 0]
  m2({ z: 3 }) // [undefined, undefined]
}


//////////////////////////////
// 2.rest 参数
{
  // 用于获取函数的多余参数; 替换 arguments
  function add1(...values) {
    let sum = 0
    for (var val of values) {
      sum += val
    }
    return sum
  }
  add1(2, 5, 3) // 10

  //es5
  function getRest() {
    return Array.prototype.slice.call(arguments)
  }

  // rest 变量代表一个数组
  function push2(array, ...items) {
    items.forEach(function(item) {
      array.push(item)
      // console.log(item);
    })
  }
  var a = []
  push2(a, 1, 2, 3)
  // rest 参数之后不能有其他参数，是最后一个参数
}

//////////////////////////////
//  3. 扩展运算符
{
  // 将一个数组转换为 用逗号分隔参数序列
  // console.log(1, ...[2, 3, 4], 5); // => 1 2 3 4 5

  function push3(array, ...items) {
    return array.push(...items)
  }
  function add(x, y) {
    return x + y
  }
  // push3([1], [2, 3]) // 1 2 3
  var numbers = [4, 38]
  add(...numbers) //42
  function f3(v, w, x, y, z) {
    var args = [0, 1]
    f(-1, ...args, 2, ...[3])
  }

  // 替代数组的 apply 方法
  function f4(x, y, z) { console.log(x, y, z)}
  var args = [0, 1, 2] 
  f4.apply(null, args)  // es5
  var args2 = [0, 1, 2] 
  f4(...args2)          // es6
  Math.max.apply(null, [14, 3, 77]) // es5
  Math.max(...[14, 3, 77]) // es6
  Math.max(14, 3, 77) // 等同于

  var arr1 = [0, 1, 2]
  var arr2 = [3, 4, 5]
  // Array.prototype.push.apply(arr1, arr2) // es5
  arr1.push(...arr2) // es6 => [0,1,2,3,4,5]
}

//////////////////////////////
// 扩展运算符的应用
{
  // 1).合并数组
  ;[1, 2].concat([3, 4]) // es5
  ;[1, 2, ...[3, 4]] // es6

  var arr5 = ['a', 'b']
  var arr6 = ['c']
  var arr7 = ['d', 'e']

  arr5.concat(arr2, arr1) //es5
  // [0,1,2,3,4,5]
  ;[...arr1, arr2] //es6
  // console.log([...arr1, arr2])
  // [0,1,2,3,4,5]

  // 2. 解构赋值结合 => 生成数组
  const [first1, ...rest1] = [1, 2, 3, 4, 5]
  first1 // => 1
  rest1 // [2, 3, 4, 5];

  // 3. 函数的返回值
  // var dateFields = readDateFields(database);
  // var d = new Date(...dateFields);

  // 4) 字符串
  ;[...'hello'] // ["h", "e", "1", "1", "o"]
}

//////////////////////////////
// 4.严格模式
{
  // 1. 设置全局模式
  ;('use strict')
  function doSomething2(a, b = a) {}

  // 2. 把函数包在一个 即时函数里
  const doSomething = (function() {
    'use strict'
    return function(value = 42) {}
  })()
}

//////////////////////////////
// 5. name 属性
{
  // 函数名
  var f3 = function() {}
  f3.name // es5: ''
  f3.name // es6: 'f'
}

//////////////////////////////
// 6. 箭头函数
{
  // 如果直接返回一个对象，必须在对象外面加上括号
  var getTempItem = id => ({ id: id, name: 'Temp' })

  // 与变量解构结全使用
  const full = ({ first, last }) => first + ' ' + last
  // 等同于
  function full2(person) {
    return person.first + '' + person.last
  }
}

//////////////////////////////
// 7. 绑定 this
{
  // :: ES7 => 左边对象 右边函数
  // foo::bar;
  // // 等同于
  // bar.bind(foo);

  // ;foo::bar(...arguments)
  // bar.apply(foo, arguments)
}
