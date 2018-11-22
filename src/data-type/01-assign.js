'use strict'
// es6 变量的解析赋值:
// 数组，对象，字符串，数值和布尔， 函数参数，圆括号，用途

////////////////////////////////////////
// 1.基本用法

{
  // let a = 1;
  // let b = 2;
  // let c = 3;
  let [a, b, c] = [1, 2, 3]
  // console.log(a, b, c)
  // => 1 2 3

  //左右模式 位置对应
  let [foo, [[bar], baz]] = [1, [[2], 3]]
  // console.log(foo) // 1
  // console.log(bar) // 2
  // console.log(baz) // 3

  let [, , third] = ['foo', 'bar', 'baz']
  // console.log(third);	// baz

  // rest 剩余运算符
  let [head, ...tail] = [1, 2, 3, 4]
  // console.log(head);	//  1
  // console.log(tail); // [2, 3, 4]

  let [x2, y2, ...z2] = ['a']
  // console.log(x2) // "a"
  // console.log(y2) // undefined
  // console.log(z2) // []

  // 本身不具备遍历结构 会报错
  // let [foo] = 1;
  // let [foo] = false;
  // let [foo] = NaN;
  // let [foo] = undefined;
  // let [foo] = null;
  // let [foo] = {};
}

{
  ////////////////////////////////////////
  // 2.对象的解析赋值

  let { foo3, bar3 } = { foo3: 'aaa', bar3: 'bbb' }
  // console.log(foo3); // aaa
  // console.log(bar3); // bbb

  let { baz4 } = { foo4: 'aaa', bar4: 'bbb' }
  // console.log(baz4); // undefined; 次顺不一致

  let obj = { first: 'hello', last: 'world' }
  let { first: f, last: l } = obj
  // console.log(f);
  // console.log(l);

  let { foo9: baz9 } = { foo9: 'aaa', bar9: 'bbb' }
  // console.log(baz9); // aaa
  // console.log(foo9);	// error: not defined
}

{
  // 解构，可以用于嵌套的对象
  let obj1 = {
    p: ['Hello', { y: 'World' }]
  }

  let {
    p: [x, { y }]
  } = obj1
  // console.log(x) // hello
  // console.log(y) // word

  // 嵌套赋值的例子
  let obj3 = {}
  let arr1 = []
  ;({ foo: obj3.prop, bar: arr1[0] } = { foo: 123, bar: true })
  // console.log(obj3)
  // console.log(arr1)
}

{
  /////////////////////////
  // 3.字符串的解析
  const [a17, b17, c17, d17, e17] = 'hello'
  // console.log(a17) // h
  // console.log(b17) // e
  // console.log(c17) // l
  // console.log(d17) // l
  // console.log(e17) // o

  let { length: len1 } = 'hello'
  // console.log(len1)	// 5
}

{
  /////////////////////////
  // 5.函数参数的解构赋值
  function add1([x, y]) {
    return x + y
  }
  add1([1, 2]) // 3
  ;[[1, 2], [3, 4]].map(([a, b]) => a + b)
  // [3, 7]

  function move2({ x, y } = { x: 0, y: 0 }) {
    // console.log([x, y]);
    return [x, y]
  }
  move2({ x: 3, y: 8 }) // [3, 8]
  move2({ x: 3 }) // [3, undefined]
  move2({}) // [undefined, undefined]
  move2() // [0, 0]
  ;[1, undefined, 3].map((x = 'yes') => x)
  // [1, 'yes', 3]
}
{
  /////////////////////////
  // 7.用途

  // 1.交换变量
  let x18 = 1
  let y18 = 2
  ;[x18, y18] = [y18, x18]

  //2.从函数返回多个值
  function example() {
    return [1, 2, 3]
  }
  let [a19, b19, c19] = example()
  // console.log([a19, b19, c19]); // [1, 2, 3]

  // 返回一个对象
  function example2() {
    return {
      foo: 1,
      bar: 2
    }
  }
  let { foo, bar } = example2()
  // console.log({ foo, bar });	// 1, 2

  // 3.函数参数的定义
  function f21([x, y, z]) {}
  f21([1, 2, 3])

  function f22({ x, y, z }) {}
  f22({ z: 3, y: 2, x: 1 })

  // 4.提取json 数据
  let jsonData = {
    id: 42,
    status: 'OK',
    data: [867, 5309]
  }
  let { id, status, data: number } = jsonData
  // console.log(id, status, number);
  // 42, "OK", [867, 5309]

  // 5. 函数参数的默认值
  let jQuery2 = {}
  jQuery2.ajax = function(
    url,
    {
      async = true,
      beforeSend = function() {},
      cache = true,
      complete = function() {},
      crossDomain = false,
      global = true
    }
  ) {}

  // 6.遍历 Map 结构
  var map = new Map()
  map.set('first', 'hello')
  map.set('second', 'world')
  for (let [key, value] of map) {
    // console.log(key + ' is ' + value)
  }
  // first is hello
  // second is world

  // for (let [key] of map){}
  // for (let [, value] of map){}

  //7. 输入模块的指定方法
  // const { SourceMapConsumer, SourceNode } = require("source-map");

  // 8. 前后端通信 嵌套使用
  //
  {
    let metaData = {
      title: 'abc',
      test: [
        {
          title: 'test',
          desc: 'description'
        }
      ]
    }

    let {
      title: esTitle,
      test: [{ title: cnTitle, desc: cnDesc }]
    } = metaData
    // console.log(esTitle, cnTitle, cnDesc);
  }
}
