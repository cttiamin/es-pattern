'use strict';
// es6 变量的解析赋值
{
  // let a = 1;
  // let b = 2;
  // let c = 3;
  let [a, b, c] = [1, 2, 3];

  //左右模式 位置对应
  let [foo, [[bar], baz]] = [1, [[2], 3]];

  let [, , third] = ['foo', 'bar', 'baz'];

  // rest 剩余运算符
  let [head, ...tail] = [1, 2, 3, 4];

  // 1.交换变量
  let x18 = 1;
  let y18 = 2;
  [x18, y18] = [y18, x18];
}

{
  // 2.对象的解析赋值
  let { foo3, bar3 } = { foo3: 'aaa', bar3: 'bbb' };

  let { baz4 } = { foo4: 'aaa', bar4: 'bbb' };
  // undefined 次顺不一致

  let obj = { first: 'hello', last: 'world' };
  let { first: f, last: l } = obj;
  // f => hello
  // l => world

  let { foo9: baz9 } = { foo9: 'aaa', bar9: 'bbb' };
  // baz9 =>  aaa
  // foo9 =>	error: not defined

  // 用于嵌套的对象
  let obj1 = {
    p: ['Hello', { y: 'World' }]
  };
  let {
    p: [x, { y }]
  } = obj1;
  // x => hello
  // y => word

  // 提取json 数据
  let jsonData = {
    id: 42,
    status: 'OK',
    data: [867, 5309]
  };
  let { id, status, data: number } = jsonData;
  // 42, "OK", [867, 5309]
}

{
  // 3.字符串的解析
  const [a17, b17, c17, d17, e17] = 'hello';
  // h e l l o
  let { length: len1 } = 'hello';
  // len1 : 5
}

{
  // 5.函数参数的解构赋值

  // 函数参数的定义
  [[1, 2], [3, 4]].map(([a, b]) => a + b);
  // => [3, 7]

  function f21([x, y, z]) {}
  f21([1, 2, 3]);
  function f22({ x, y, z }) {}
  f22({ z: 3, y: 2, x: 1 });

  // 函数参数的默认值
  // function move2({ x = 0, y = 0 }) {
  function move2({ x, y } = { x: 0, y: 0 }) {
    return [x, y];
  }
  move2({ x: 3, y: 8 }); // [3, 8]
  move2({ x: 3 }); // [3, undefined]
  move2({}); // [undefined, undefined]
  move2(); // [0, 0]

  // 从函数返回多个值
  function example() {
    return [1, 2, 3];
  }
  let [a19, b19, c19] = example();
  // [1, 2, 3]

  // 返回一个对象
  function example2() {
    return {
      foo: 1,
      bar: 2
    };
  }
  let { foo, bar } = example2();
  // 1, 2

  // 遍历 map 结构
  var map = new Map();
  map.set('first', 'hello');
  map.set('second', 'world');
  for (let [key, value] of map) {
    key + ' is ' + value;
  }
  for (let [key] of map) {
  }
  for (let [, value] of map) {
  }
}
