// 类型检测
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
    Array.isArray = function(arg) {
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
var isNativeJSON =
  window.JSON && Object.prototype.toString.call(JSON) == '[object JSON]';
// => true


// Confusion
var isArray3 = function(value) {
  return value && typeof value === 'object' && value.constructor === Array;
};
var isArray4 = function(value) {
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
// 调用正确的 toString 版本,必须间接地调用 call
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

function f() {}
// (classof(new f()));      // => "Object"

var f2 = function f2() {};
// (classof(f2));           // => Function


Window.name == window['name'];  //true