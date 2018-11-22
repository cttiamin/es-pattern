/***************************************************************
 * Chapter 5, 引用类型, 20140319 15:48,  Wednesday
 *  5.2 Array 类型: 最多可包含4 294 967 295个项
 *  检测数组:
 *      instanceof
 *      Array.isArray(varlue): 是否为数组
 *  =>转换方法:
 *     toString(): 把数组转换为字符串，并返回结果。
 *     toLocaleString(): 把数组转换为本地数组，并返回结果。
 *     valueOf(): 返回数组对象的原始值
 *     Array.join(",") : 使用不同的分割符来构造字符串.
 *  =>栈方法:
 *      push(): 添加末端
 *      pop():  弹出末端
 *  =>队列方法:
 *      shift(): 弹出最前端
 *      unshift(): 添加前端
 *  =>重排序方法:
 *      reverse():反
 *      sort():正
 *  =>操作方法:
 *     concat: 合并两个返回一个数组
 *     slice(startIndex, endIndex): 从已有的数组中返回选定的元素
 *     splice(start, int, addItem): 分割数组 => arr.splice('index', 1) 删除
 *  =>位置方法:
 *     indexOf():返回数组索引位置
 *     lastIndexOf(): 从尾开始
 *  =>迭代方法 [ie9+]:
 *      every: 对数组中的每一项运行给定函数, 如果该函数每一项true, 则 return true
 *      filter: 对...函数, 返回该函数返回true的组成部份
 *      forEach: 对...函数, no return
 *      map; 对...函数, return invoked function result.
 *      some; 对...函数, 如该函对任一项返回true,则 return true
 *  =>缩小方法 [ie9+]:
 *     reduce
 *     reduceRight
 */
// 数组去重
// 数组拍平

Function.prototype.method = function(name, func) {
  this.prototype[name] = func
  return this
}

//检测数组
var colors = ['red', 'blue', 'green']
colors.toString() //=> String: "red,blue,green"
colors.valueOf() //=>  ["red", "blue", "green"]
colors // => ["red", "blue", "green"], 后台调用 toString(),

Array.isArray([]) // => true
Array.isArray({}) // => false
var isArray2 =
  Function.isArray ||
  function(o) {
    return (
      typeof o === 'object' &&
      Object.prototype.toString.call(o) === '[object Array]'
    )
  }
// Confusion
var isArray3 = function(value) {
  return value && typeof value === 'object' && value.constructor === Array
}
var isArray4 = function(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.length === 'number' &&
    typeof value.splice === 'function' &&
    !value.propertyIsEnumerable('length')
  )
}

//数组长度
//使用Object.defineProperty()让数组的length属性变成只读的
var arr5 = [1, 2, 3]
Object.defineProperty(arr5, 'length', { writable: false })
// arr5.length = 0 // error

///////////////////////////
// 栈方法, 队列方法
// push(), 添加末端
// pop(),  弹出末端
// shift(), 弹出最前端
// unshift(): 添加前端
var colors1 = new Array()
colors1.push('red', 'green') // 2
colors1.push('black')
colors1.pop() //=> black
colors1.shift() //=> red
colors1.unshift('yellow', 'red')
// "yellow", "red", "green"

// The Good Part
Array.method('unshift2', function() {
  this.splice.apply(this, [0, 0].concat(Array.prototype.slice.apply(arguments)))
  return this.length
})

/*********************************
 * 重排序方法
 * join: 将数组中所有元素转化为字符串并连接在一起,返回最生生成的字符串
 * reverse  : 反序
 * sort     : 正序
 */

var arr6 = [0, 1, 5, 10, 1] // 创建一个包含三个元素的数组
arr6.join() // => "0, 1, 5, 10, 1"
// arr6.reverse();
// arr6.sort();

/**************************************************************
 * 操作方法,
 * concat(arr, arr): 创建数组, 多个数组, 返回生成一个新数组
 * slice(startIndex, endIndex): 复制数组,
 * splice(index, int) : 分割数组, 返回分割后的数组
 */
var colors2 = ['red', 'gree', 'blue']
colors2.concat('yellow', ['black', 'brown'])
//[red, gree, blue, yellow, black, brown]

var colors3 = ['red', 'green', 'blue', 'yellow', 'purple']
colors3.slice(1) // 从1开始复制
// green,blue,yellow,purple
colors3.slice(1, 4) // 从1开始 到 3 结束
// green,blue,yellow

var colors4 = ['red', 'green', 'blue']
colors4.splice(0, 1) // ["red"] => 删除第一项
// colors4 = ["green", "blue"]
colors4.splice(1, 0, 'yellow', 'orange') // 从位置1开始插入两项
// colors4 = ["green", "yellow", "orange", "blue"]
colors4.splice(1, 1, 'red', 'purple') //插入两项, 删除一项(先删后插)
// colors4 = ["green", "red", "purple", "orange", "blue"]

///////////////////////////////
// Good Part
// Monday, 5/1/2015
// The splice like this:
Array.method('splice', function(start, deleteCount) {
  var max = Math.max,
    min = Math.min,
    delta,
    element,
    insertCount = max(arguments.length - 2, 0),
    k = 0,
    len = this.length,
    new_len,
    result = [],
    shift_count

  start = start || 0
  if (start < 0) {
    start += len
  }

  start = max(min(start, len), 0)
  deleteCount = max(
    min(typeof deleteCount === 'number' ? deleteCount : len, len - start),
    0
  )

  delta = insertCount - deleteCount
  new_len = len + delta
  while (k < deleteCount) {
    element = this[start + k]
    if (element !== undefined) {
      result[k] = element
    }
    k += 1
  }
  shift_count = len - start - deleteCount
  if (delta < 0) {
    k = start + insertCount
    while (shift_count) {
      this[k] = this[k - delta]
      k += 1
      shift_count -= 1
    }
    this.length = new_len
  } else if (delta > 0) {
    k = 1
    while (shift_count) {
      this[new_len - k] = this[len - k]
      k += 1
      shift_count -= 1
    }
  }
  for (k = 0; k < insertCount; k += 1) {
    this[start + k] = arguments[k + 2]
  }
  return result
})

/***********************************
 * 位置方法
 * indexOf(): 反回索引位置
 * lastIndexOf(): 从尾到头
 */
var number = [1, 2, 3, 4, 5, 4, 3, 2, 1]
number.indexOf(4, 4) // 5, 查找4,从索引4开始找
number.lastIndexOf(4, 4) //3

/***********************************
 * ECMAScript 选代方法 ie9+
 * every(): 对数组中的每一项运行给定函数,
 *      如果该函数每一项true, 则 return true
 * filter():  返回该函数返回true的组成部份
 * forEach():  no return
 * map();  return invoked function result.
 * some();  如该函对任一项返回true,则 return true
 */

var obj1 = {
  a: 'a',
  b: '',
  c: 'c',
  d: 'd'
}
var keys = Object.keys(obj1) // 获得对象属性名组成的数组
var values1 = []
for (var i = 0, len = keys.length; i < len; i++) {
  var key = keys[i]
  if (!obj1[key]) continue //跳过null,undefined+不存在的元素
  if (obj1[key] === undefined) continue //跳过 undefined+不存在的元素
  if (!(key in obj1)) continue //跳过不存在的元素

  values1[i] = obj1[key]
  // console.log(values[i]);
}

// every
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]
var everyResult = numbers.every(function(item, index, array) {
  // console.log(index, item, array);
  return item > 2 // 全体大于 2
})
everyResult // false

// some
var someResult = numbers.some(function(item, index, array) {
  return item > 2 // 部份大于 2
})
someResult // true

// filter
var filterResult = numbers.filter(function(item, index, array) {
  return item > 2
})
filterResult //[3, 4, 5, 4, 3]

// map
var mapResult = numbers.map(function(item, index, array) {
  return item * 2
})
mapResult //[2, 4, 6, 8, 10, 6, 4, 2]

// forEach
numbers.forEach(function(item, index, array) {
  // console.log(index, item, array);
  array[index] = item + 1
})
numbers // =>

//////////////////////////////
// 缩小方法 : ie9+, firefox3+, safari4+
// reduce(func(上一次回调函数的返回值, 当前元素值, index, reduce 数组))
// reduceRight
var values = [1, 2, 3, 4, 5]
var reduceSum = values.reduce(function(prev, cur, index, array) {
  // console.log(prev, cur, index, array);
  return prev + cur // 前一项/上一次回调函数的返回值 + 当前项
})
reduceSum //15

var reduceRightSum = values.reduceRight(function(prev, cur, index, array) {
  // console.log(prev, cur, index, array);
  return prev + cur // 前一项/上一次回调函数的返回值 + 当前项
})
reduceRightSum //15

Array.method('reduce1', function(f, value) {
  var i
  for (i = 0; i < this.length; i += 1) {
    // 上一项值
    value = f(this[i], value)
    // console.log(this[i], value);
  }
  return value
})
// Create an array of numbers.
var data = [4, 8, 15, 16, 23, 42]
var add = function(a, b) {
  return a + b
}
var mult = function(a, b) {
  return a * b
}
// add function.
var reduce1Sum = data.reduce1(add, 0)
// sum is 108
var reduce1Product = data.reduce1(mult, 1)
// product is 7418880
data.total = function() {
  return this.reduce1(add, 0)
}
var total = data.total()
// total is 108

/***********************************
 *  7.11 类数组对象
 * 判定o是否是一个类数组对象
 * 字符串和函数有length属性, 但是它们
 * 可以用typeof检测将其排除, 在客户端JavaScript中, DOM文本节点
 * 也有length属性,需要用额外判断 o.nodeType != 3 将其排除
 */
function isArrayLike(o) {
  if (
    o && // o 非null, undefined等
    typeof o === 'object' && // o 是对象
    isFinite(o.length) && //o.length 是有限数值
    o.length >= 0 && //o.length为非负值
    o.length === Math.floor(o.length) && // o.length 是整数
    o.length < 4294967296
  )
    // o.length < 2^32
    return true
  //o是类数组对象
  else return false // 否则它不是
}

// 类数组对象
var arr4 = { '0': 'a', '1': 'b', '2': 'c', length: 3 }
Array.prototype.join.call(arr4, '+') // => "a+b+c"
Array.prototype.slice.call(arr4, 0)
// => ["a", "b", "c"]: 真正的数组的副本
Array.prototype.map.call(arr4, function(x) {
  return x.toUpperCase()
})
// => ["A", "B", "C"]

isArrayLike(arr4) // true

/********************************************
 * 7.12 作为数组的字符串
 *  索引字符串的最大好处就是简单,用[]代替了 charAt 调用.
 *  字符串是不可变值, 故当把它们作为数组看待时, 它们是只读的.
 *  如 push, sort, reverse, splice
 */
var str1 = 'JavaScript'
str1.charAt(0) // => "J"
str1[1] // => a

Array.prototype.join.call(str1, ' ')
// => "J a v a S c r i p t"

Array.prototype.filter
  .call(str1, function(x) {
    return x.match(/[^aeiou]/)
  })
  .join('')
// => "JavaScript"

/*****************************
 * 不能直接修改 Array 的构造函数, 可使用这个模式
 */
function SpecialArray() {
  var values = new Array() // 创建数组
  // apply : 劫持另外一个对象的方法，继承另外一个对象的属性
  // values : 用 values 去执行 values.push(Array)
  // 添加值, 在 values 作用域 push(argumens)
  values.push.apply(values, arguments)

  values.toPipeString = function() {
    return this.join('|') // 数组转字符串
  }
  return values
}
var colors = SpecialArray('red', 'blue', 'green') // new
// colors.toPipeString();     // "red|blue|green

// 数组去重
// 双层循环，外层循环元素，内层循环时比较值
// Array.prototype.distinct = function(){
var distinct = function(arr_origin) {
  var arr = arr_origin,
    result = [],
    i,
    j,
    len = arr.length
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        j = ++i
      }
    }
    result.push(arr[i])
  }
  return result
}
var arra = [1, 2, 3, 4, 4, 1, 1, 2, 1, 1, 1]
// console.log(distinct(arra))

// 数组拍平 使用递归
var arr = [1, 2, 3, [3, 3, 3, [5, 4, 5, 6, 6, 7, 8]],[333, 4444]];
function product() {
 // 1、创建一个空数组,
 var newarr = [];
 ///2、并且返回一个函数, 函数参数为要拍平的数组
 return function flatten(arr) {
  // 3、循环数组，判断每一项, 不为输的话将其塞入 newarr
  // 若为数组,递归调用 faltten, 并将结果与 newarr 合并
  for (var t of arr) {
   if (!Array.isArray(t)) {
    newarr.push(t);
   } else {
    newarr.concat(flatten(t))
   }
  }
  return newarr
 }
}
// var flatten = product();
// console.log(flatten(arr))

var arr_concat = [1, 2, 3, [3, 3, 3, [5, 4, 5, 6, 6, 7, 8]],[333, 4444]];

var arr_new = [],
  concatArr = function concatArrFunc(arr) {
  // arr_new = arr_new || [];
  // if (arr.length < 2) return arr_new.concat(arr[0])

  // for(var i = 0, len = arr.length; i<len; i++){
  //   console.log(arr[i])
  // }
  
  arr.forEach(function(item, index, array) {
    // console.log(index, item, array);
    // array[index] = item + 1
    if(Array.isArray(item)) {
      arr_new.concat(concatArrFunc(item))
      // arr_new.concat(concatArrFunc(item), arr_new)
    } else {
      arr_new.push(item)
    }
  })
  return arr_new;
}
var arr_concat_res = concatArr(arr_concat);
console.log(arr_concat_res)
