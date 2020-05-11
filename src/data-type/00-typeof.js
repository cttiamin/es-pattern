// 类型检测 undefined, string, number, boolean
typeof undefined; // undefined
typeof 'abc'; // string
typeof 123; // nunber
typeof true; // boolean
typeof {}; // object
typeof []; // object
typeof null; // object
typeof console.log; // function

// 在任何值上调用 Object.toString()
// 都会返回 [object NativeConstructorName] 字符串
// 每个类在内部都有 [Class] 属性, 指定字符串中 构造函数名
Object.prototype.toString.call(new Array());
//"[object Array]"

// 用 toString 能保证返回一致的值

// Pattern: 不支持 isArray, 用 Object.prototype.toString()
if (typeof Array.isArray === 'undefined') {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

function isFunction(value) {
  return Object.prototype.toString.call(value) == '[object Function]';
}
function isRegExp(value) {
  return Object.prototype.toString.call(value) == '[object RegExp]';
}

// Object.toString 不能检测 非原生构造函数 的构造函数名
// var isNativeJSON =
//   window.JSON && Object.prototype.toString.call(JSON) == '[object JSON]';
// => true


// Confusion
var isArray3 = function (value) {
  return value && typeof value === 'object' && value.constructor === Array;
};
var isArray4 = function (value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.length === 'number' &&
    typeof value.splice === 'function' &&
    !value.propertyIsEnumerable('length')
  );
};

// toString: => [object class]
// 很多对象重写了 toString, .
// 调用正确的 toString 版本, 必须间接地调用 call
function classof(o) {
  if (o === null) return 'Null';
  if (o === undefined) return 'Undefined';
  return Object.prototype.toString.call(o).slice(8, -1);
  // return Object.prototype.toString.call(o).slice(0);
}
// (classof(null));         // => "Null"
// (classof(1));            // => "Number"
// (classof(""));           // => "String"
// (classof(false));        // => "Boolean"
// (classof({}));           // => "Object"
// (classof([]));           // => "Array"
// (classof(/./));          // => "Regexp"
// (classof(new Date()));   //  => "Date"
// (classof(window));       //  => "Window"

function f() { }
// (classof(new f()));      // => "Object"

var f2 = function f2() { };
// (classof(f2));           // => Function

// Window.name == window['name'];  //true




////////////////////////////////////////////////////////
// 判定 o 是否是一个类数组对象
// function isArrayLike(o) {
//   if (
//     o && // o 非null, undefined等
//     typeof o === 'object' && // o 是对象
//     isFinite(o.length) && // o.length 是有限数值
//     o.length >= 0 && //o.length为非负值
//     o.length === Math.floor(o.length) && // o.length 是整数
//     o.length < 4294967296
//   )
//     // o.length < 2^32
//     return true;
//   //o是类数组对象
//   else return false; // 否则它不是
// }

///////////////////////
// 类数组对象
// var arr4 = { '0': 'a', '1': 'b', '2': 'c', length: 3 };
// Array.prototype.join.call(arr4, '+'); // => "a+b+c"
// Array.prototype.slice.call(arr4, 0);
// // => ["a", "b", "c"]: 真正的数组的副本
// Array.prototype.map.call(arr4, function(x) {
//   return x.toUpperCase();
// }); // => ["A", "B", "C"]

// isArrayLike(arr4); // true



{
  /////////////////////////////
  // Array.from 将两类对象转为真正的数组
  let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
  }
  // ES5 写法
  var arr1 = [].slice.call(arrayLike) // ['a', 'b', 'c']
  // ES6 写法
  let arr2 = Array.from(arrayLike) // ['a', 'b', 'c']

  // 解析 DOM 元素
  // let p = document.querySelectorAll('p')
  // let pArr = Array.from(p)
}

{
  /////////////////////////////
  // Array.of 将一组值，转换为数组
  Array.of(3, 11, 8) // => [3, 11, 8]
  // console.log(Array(3)) // [, , ,]
  Array.of()
  Array.of(undefined) // [undefined]
  // es5 实现
  function ArrayOf() {
    return [].slice.call(arguments)
  }
}

/********************************************
 * 作为数组的字符串
 */
var str1 = 'JavaScript';
str1.charAt(0); // => "J"
str1[1]; // => a

Array.prototype.join.call(str1, ' ');
// => "J a v a S c r i p t"

Array.prototype.filter
  .call(str1, function(x) {
    return x.match(/[^aeiou]/);
  })
  .join('');
// => "JavaScript"

