/***************************************************************
 *  20140319 15:48,  Wednesday
 *  Array 类型: 最多可包含 4 294 967 295 个项
 *  检测数组:
 *      instanceof
 *      Array.isArray(varlue): 是否为数组
 *  转换:
 *     toString():       返回 数组转换为字符串
 *     toLocaleString(): 返回 数组转换为本地数组
 *     valueOf():        返回 数组对象的原始值
 *     Array.join(",") : 使用不同的分割符来构造字符串
 *  =>栈,队列方法:
 *      push: 添加末端
 *      pop:  弹出末端
 *      shift: 弹出最前端
 *      unshift: 添加前端
 *  =>重排序方法:
 *      reverse():反
 *      sort():正
 *  =>操作方法:
 *     concat: 合并两个返回一个数组
 *     slice(startIndex, endIndex): 从已有的数组中返回选定的元素
 *     splice(start, int, addItem): 分割数组, 返回分割后的数组
 *  =>位置方法:
 *     indexOf():返回数组索引位置
 *     lastIndexOf(): 从尾开始
 *  =>迭代方法 [ie9+]:
 *      every:  对数组中的每一项运行给定函数,如果该函数每一项true, 则return true
 *      filter: 返回该函数返回true的组成部份
 *      forEach:no return
 *      map:    return invoked function result.
 *      some:   如该函对任一项返回true,则 return true
 *  =>缩小方法 [ie9+]:
 *     reduce
 *     reduceRight
 * 
 * ES6
 *    Array.from: 对象转为真正的数组
 *    Array.of: 将一组值，转换为数组
 *    copyWithin: 替换
 *    find: 找到第一个 findIndex: 返回下标
 *    fill: 使用给定值 填充一个数组
 *    entries: 数组遍历 => keys + values
 *    includes: 某个数组是否包含给定的值
 */

//检测数组
var colors = ['red', 'blue', 'green'];
colors.toString(); // =>  red,blue,green
colors.valueOf(); // =>  ["red", "blue", "green"]
colors; // => ["red", "blue", "green"], 后台调用 valueOf,

Array.isArray([]); // => true
Array.isArray({}); // => false

// 用 Object.defineProperty 让数组的 length 属性变成只读的
var arr5 = [1, 2, 3];
Object.defineProperty(arr5, 'length', { writable: false });
// arr5.length = 0 // error

///////////////////////////
// 栈方法, 队列方法
var colors1 = new Array();
colors1.push('red', 'green'); // =>2, 
colors1.push('black');        // 添加末端
colors1.pop();                // => black, 弹出末端
colors1.shift();              // => red
colors1.unshift('yellow', 'red'); // 添加前端
// "yellow", "red", "green"

///////////////////////////
// 重排序方法
// join: 转化为字符串
// reverse  : 反序
// sort     : 正序
var arr6 = [0, 1, 5, 10, 1]; // 创建一个包含三个元素的数组
arr6.join(); // => "0, 1, 5, 10, 1"
// arr6.reverse();
// arr6.sort();

/***************************************
 * 操作方法,
 * concat(arr, arr): 创建数组, 多个数组, 返回生成一个新数组
 * slice(startIndex, endIndex): 复制数组,
 * splice(index, int) : 分割数组, 返回分割后的数组
 */
var colors2 = ['red', 'gree', 'blue'];
colors2.concat('yellow', ['black', 'brown']);
//[red, gree, blue, yellow, black, brown]

var colors3 = ['red', 'green', 'blue', 'yellow', 'purple'];
colors3.slice(1); // 从1开始复制
// green,blue,yellow,purple
colors3.slice(1, 4); // 从1开始 到 3 结束
// green,blue,yellow

var colors4 = ['red', 'green', 'blue'];
colors4.splice(0, 1); // ["red"] => 删除第一项
// colors4 = ["green", "blue"]
colors4.splice(1, 0, 'yellow', 'orange'); // 从位置1开始插入两项
// colors4 = ["green", "yellow", "orange", "blue"]
colors4.splice(1, 1, 'red', 'purple'); //插入两项, 删除一项(先删后插)
// colors4 = ["green", "red", "purple", "orange", "blue"]


{
  /////////////////////////////
  // copyWithin
  // @param target(必选) 开始替换数据位置
  // @param start(可选)	 读数据位置
  // @param end (可选)   停止读取数据位置
  // Array.prototype.copyWithin

  ;[1, 2, 3, 4, 5].copyWithin(0, 3)
  // [4, 5, 3, 4, 5]
  ;[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
  // [4, 2, 3, 4, 5]

  // -2相当于3号位，-1 相当于 4 号
  ;[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
  //[4, 2, 3, 4, 5]
}

{
  /////////////////////////////
  // fill
  // 使用给定值，填充一个数组
  ;['a', 'b', 'c'].fill(7)
  // [7, 7, 7]
  ;['a', 'b', 'c'].fill(7, 1, 2)
  // ['a', 7, 'c']
}

/***********************************
 * 位置方法
 */
var number = [1, 2, 3, 4, 5, 4, 3, 2, 1];
number.indexOf(4, 4); // 5, 查找4,从索引4开始找
number.lastIndexOf(4, 4); //3

{
  /////////////////////////////
  // find, findIndex
  // 找出第一个符合条件的数组成员
  ;[1, 4, -5, 10].find(n => n < 0)
  // -5
  ;[1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9
  }) // 10

  // 返回索引位置
  ;[1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9
  }) // => 2
}

{
  /////////////////////////////
  // inclues
  // 某个数组是否包含给定的值
  ;[1, 2, 3].includes(2) // => true
  ;[1, 2, NaN].includes(NaN) // => true

  // 第二个参数:起始位置 default=0
  ;[1, 2, 3].includes(3, 3) // false
  // indexOf 误判
  ;[NaN].indexOf(NaN) // -1

  // 对于不支持 替代版本
  const contains = (() =>
    Array.prototype.includes
      ? (arr, value) => arr.includes(value)
      : (arr, value) => arr.some(el => el === value))()
}

/***********************************
 * ECMAScript 选代方法 ie9+
 */
// every
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var everyResult = numbers.every(function(item, index, array) {
  // console.log(index, item, array);
  return item > 2; // 全体大于 2
});
everyResult; // false

// some
var someResult = numbers.some(function(item, index, array) {
  return item > 2; // 部份大于 2
});
someResult; // true

// filter
var filterResult = numbers.filter(function(item, index, array) {
  return item > 2;
});
filterResult; // [3, 4, 5, 4, 3]

// map
var mapResult = numbers.map(function(item, index, array) {
  return item * 2;
});
mapResult; //[2, 4, 6, 8, 10, 6, 4, 2]

// forEach
numbers.forEach(function(item, index, array) {
  // console.log(index, item, array);
  array[index] = item + 1;
});
numbers; 
// =>  [2, 3, 4, 5, 6, 5, 4, 3, 2]

{
  /////////////////////////////
  // ertries 遍历数组
  // keys
  // values

  for (let index of ['a', 'b'].keys()) {
    // console.log(index);
  } // 0 1

  for (let elem of ['a', 'b'].values()) {
    // console.log(elem);
  } // 'a' 'b'

  for (let [index, elem] of ['a', 'b'].entries()) {
    // console.log(index, elem);
  }
  // 0 'a'
  // 1 'b'

  let letter = ['a', 'b', 'c']
  let entries = letter.entries()
  // console.log(entries.next().value); // [0, 'a']
  // console.log(entries.next().value); // [1, 'b']
  // console.log(entries.next().value); // [2, 'c']
}

//////////////////////////////
// 缩小方法 : ie9+, firefox3+, safari4+
// reduce(func(上一次回调函数的返回值, 当前元素值, index, reduce 数组))
// reduceRight
var values = [1, 2, 3, 4, 5];
var reduceSum = values.reduce(function(prev, cur, index, array) {
  // console.log(prev, cur, index, array);
  return prev + cur; // 前一项/上一次回调函数的返回值 + 当前项
});
reduceSum; //15

var reduceRightSum = values.reduceRight(function(prev, cur, index, array) {
  // console.log(prev, cur, index, array);
  return prev + cur; // 前一项/上一次回调函数的返回值 + 当前项
});
reduceRightSum; //15


// 判定 o 是否是一个类数组对象
function isArrayLike(o) {
  if (
    o && // o 非null, undefined等
    typeof o === 'object' && // o 是对象
    isFinite(o.length) && // o.length 是有限数值
    o.length >= 0 && //o.length为非负值
    o.length === Math.floor(o.length) && // o.length 是整数
    o.length < 4294967296
  )
    // o.length < 2^32
    return true;
  //o是类数组对象
  else return false; // 否则它不是
}

///////////////////////
// 类数组对象
var arr4 = { '0': 'a', '1': 'b', '2': 'c', length: 3 };
Array.prototype.join.call(arr4, '+'); // => "a+b+c"
Array.prototype.slice.call(arr4, 0);
// => ["a", "b", "c"]: 真正的数组的副本
Array.prototype.map.call(arr4, function(x) {
  return x.toUpperCase();
}); // => ["A", "B", "C"]

isArrayLike(arr4); // true

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
  let p = document.querySelectorAll('p')
  let pArr = Array.from(p)
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


