typeof undefined; // undefined
typeof 'abc'; // string
typeof 123    // nunber
typeof true   // boolean
typeof {}     // object
typeof []     // object
typeof null   // object
typeof console.log  // function

/************************************************** 
 * 安全的类型检测
 * Safari 对正则表达式检测时用 typeof 时会返回 "function"
 * 在任何值上调用 Object 原生的 toString() 方法,
 * 都会返回一个 [object NativeConstructorName]格式的字符串
 * 每个类在内部都有一个 [[Class]] 属性,
 * 这个属性中就指定了上述字符串中的构造函数名.
 * Object.protype.toString() 本身也可能会被修改,
 */

var value = new Array();
( Object.prototype.toString.call(value) ); 
//"[object Array]"

/*********************************
 * 由于原生数组的构造函数名与全局作用域无关
 * 因此使用 toString() 就能保证返回一致的值
 * 利用这一点 , 就可以创建如下函数
 * @param value (Array)
 * @returns {boolean} (是否为数组类型)
 ******************/
function isArray(value) {
    return Object.prototype.toString.call(value) == "[object Array]";
}
function isFunction(value) {
    return Object.prototype.toString.call(value) == "[object Function]";
}
function isRegExp(value) {
    return Object.prototype.toString.call(value) == "[object RegExp]";
}

/** 
 * 在 IE 中以 COM 对象形式实现的任何函数,
 * isFunction 都将返回 false (因为它们并非原生的 JavaScript 函数)
 * 这一技巧也广泛应用于检测原生 JSON 对象,
 * Object.toString() 方法不能检测非原生构造函数的构造函数名
 */
var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON)
    == "[object JSON]";
//console.log(isNativeJSON);


////////////////////////////////////
// toString: => [object class]
// 很多对象重写了 toString() 方法, 为了能调用正确的 toString 版本.
// 必须间接地调用 Function.call()方法
function classof(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";
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
// function f() {           // 定义一个自定义构造函数
// }
// (classof(new f()));      // => "Object"
// var f2 = function f2() { };
// (classof(f2));   // => Function