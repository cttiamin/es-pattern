//  函数柯里化(function currying)
//  创建已经设置好了一个或多个参数的函数
//  函数柯里化的基本方法和函数绑定是一样的:使用一个闭包返回一个函数.
//  区别: 返回的函数还需要设置一些传入的参数.


function add(num1, num2) {
  return num1 + num2;
}
// function curriedAdd(num2) {
//   return add(5, num2);
// }
/**
 * 动态创建步骤: 调用另一个函数并为它传入要柯里化的的函数和必要参数.
 *  在arguments对象上调用slice方法, 截出第2个开始的参数
 * @param fn
 * @returns {Function}
 */
function curry(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var innerArgs = Array.prototype.slice.call(arguments),
      //内部, 当在次调用传参时
      finalArgs = args.concat(innerArgs);
    //连接两个
    return fn.apply(null, finalArgs);
  };
}
var curriedAdd = curry(add, 5);
curriedAdd(3); // 8
curriedAdd(4); // 9


////////////////////////
// Curry 函数应用
var sayHi = function(who) {
  return 'Hello' + (who ? ', ' + who : '') + '!';
};
sayHi(); // => Hello
sayHi('world'); // => Hello world!
sayHi.apply(null, ['hello']); // => "Hello, hello! n  "
//第一参数将要绑定到该函数内部 this 的一个对象.
//如果第一个参数为null, 那么 this 将指向全局对象.

var alien = {
  sayHi: function(who) {
    return 'Hello' + (who ? ', ' + who : ' ') + '!';
  }
};
alien.sayHi('world'); //=> "Hello world"
sayHi.apply(alien, ['humans']); // => "Hello humans"
sayHi.call(alien, 'humans'); // => "Hello humans"
// call 节省了一个数组

////////////////
// 将 add 函数改成一个用于处理部份应用的 Curry 化函数
// Curry 来自数学家 Haskell Curry 的名字，
// Curry 是一个转化过程
//
// Curry 化的 add 函数 接受部分参数列表
function add_2(x, y) {
  var oldx = x,
    oldy = y;
  if (typeof oldy === 'undefined') {
    //部分
    return function(newy) {
      return oldx + newy;
    };
  }
  //完全应用
  return x + y;
}

//测试
//console.log( typeof add_2(5) );  // "function"
add_2(3)(4); //7
var add200 = add_2(2000);
add200(10); // => 2010

// curry 化的 add 函数
// 接受部分参数列表
function add_3(x, y) {
  if (typeof y === 'undefined') {
    return function(y) {
      return x + y;
    };
  }
  return x + y; // 完全应用
}

// 通用 curry 化函数的示例
function schonfinkelize(fn) {
  var slice = Array.prototype.slice,
    stored_args = slice.call(arguments, 1);
  //console.log( Array.prototype.slice.call(arguments, 1));

  return function() {
    var new_args = slice.call(arguments),
      args = stored_args.concat(new_args);
    //console.log(new_args);
    return fn.apply(null, args);
  };
}

//普通函数
function add_4(x, y) {
  return x + y;
}

//将一个函数 curry 化以获得一个新的函数
var newadd = schonfinkelize(add_4, 5);
newadd(4); // => 9

//another way,  直接调用新的函数
schonfinkelize(add, 6)(7);

function add_5(a, b, c, d, e) {
  return a + b + c + d + e;
}
//可运行于任意数量的参数
schonfinkelize(add_5, 1, 2, 3)(5, 5);
//16

//两步 curry 化
var addOne = schonfinkelize(add_5, 1);
addOne(10, 10, 10, 10); //=> 41
var addSix = schonfinkelize(addOne, 2, 3);
addSix(5, 5); // => 16
