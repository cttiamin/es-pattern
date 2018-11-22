/*************************************************
 *  创建多个闭包可能会令代码变得难于理解和调试,
 *  因此很多 js 库将实现了一个可以将函数绑定到指定环境的函数
 *  bind(): 接收一个函数和一个环境, 并返回一个在给定分环境中调用给定函数的函数
 *  在 bind 中创建一个闭包, 闭包使用 apply() 调用传入函数 ,
 *  并给 apply() 传递 context 对象和参数.
 *
 *  注意这里使用的 arguments 对象是内部函数的,
 *  非 bind, 当调用返回的函数时.
 *  它会在给定环境中执行被传入的函数并给出所有参数
 *  support: Ie9+
 */

// ECMAScript5 为所有函数定义了一个原生的 bind() 方法
function bind2(fn, context) {
  return function() {
    return fn.apply(context, arguments)
  }
}

/**
 * 构造出更为复杂的 bind() 函数,
 * 接收一个函数, 和一个 object 对象,
 * @param fn 执行函数
 * @param context 执行环境
 * @returns {Function} 使用闭包返回函数
 */
function bind3(fn, context) {
  var args = Array.prototype.slice.call(arguments, 2)
  //参数从第二个

  return function() {
    var innerArgs = Array.prototype.slice.call(arguments),
      finalArgs = args.concat(innerArgs)
    return fn.apply(context, finalArgs)
  }
}

var handler3 = {
  message: 'Event handled3 ',
  handleClick: function(name, event) {
    console.log(this.message + ':' + name + ':' + event.type)
  }
}

// var btn3 = document.getElementById("my-btn3");
// EventUtil.addHandler(btn3, "click",
//  bind3(handler3.handleClick, handler3, "my-btn3"));

// ECMAScript5的bind(),已实现,无须自定义
// EventUtil.addHandler(btn3, "click",
//  handler3.handleClick.bind(handler3, "my-btn"));

/****************************
 * bind
 * 将函数绑定至某个对象上
 * 如不支持bind方法, 则用 apply 实现
 */
function bind_no(f, o) {
  if (f.bind) return f.bind(o)
  //如果 bind() 方法存在, 使用 bind() 方法
  else {
    return function() {
      // 否则这样使用
      return f.apply(o, arguments)
    }
  }
}

function f(y, z) {
  console.log(this.x + y + z)
  return this.x + y + z
}
var g = f.bind({ x: 1 }, 2) // this, y
// g(3); // => 6
//this.x 绑定到1, y绑定到2, z绑定到3

/**
 * 例 8-5:ECMAScript 3版本的 Function.bind() 方法
 * bind 方法返回函数是一个闭包, 在这个闭包的外部函数中声明了self
 */
if (!Function.prototype.bindES3) {
  Function.prototype.bindES3 = function(o /*, args */) {
    // Save the this and arguments values into variables so we can.保存变量中
    // use them in the nested function below.以便在后面嵌套的函数中可以使用它们
    var self = this,
      boundArgs = arguments

    // The return value of the bind() method is a function, bind返回的是一个函数
    return function() {
      // Build up an argument list, starting with any args passed
      // to bind after the first one, and follow those with all args
      // passed to this function.
      //创建一个参列表,将传入bind()的第二个及后续的实参都传入这个函数
      var args = [],
        i
      for (i = 1; i < boundArgs.length; i++) args.push(boundArgs[i])
      for (i = 0; i < arguments.length; i++) args.push(arguments[i])

      // Now invoke self as a method of o, with those arguments
      return self.apply(o, args) //将self作为o的方法来调用, 传入这些参数
    }
  }
}

///////////////////////////////////////////////////////////
// JavaScript The Good Part
// Monday 5/1/2015
//
Function.prototype.method = function(name, func) {
  Function.prototype[name] = func
  return this
}

Function.method('bind', function(that) {
  // Return a function that will call this function as
  // though it is a method of that object.
  var method = this,
    slice = Array.prototype.slice,
    args = slice.apply(arguments, [1])
  return function() {
    return method.apply(that, args.concat(slice.apply(arguments, [0])))
  }
})
