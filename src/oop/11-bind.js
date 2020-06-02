Function.prototype.bind1 = function () {
  // 将参数拆解为数组
  const args = Array.prototype.slice.call(arguments)
  // 获取 this（数组第一项）
  const t = args.shift()
  // fn1.bind(...) 中的 fn1
  const self = this
  // 返回一个函数
  return function () {
    return self.apply(t, args)
  }
}

/**
 * 在 bind 中创建一个闭包，使用 apply 调用传入函数
 * 接收一个函数和一个 object 对象
 * @param fn 执行函数
 * @param context 执行环境
 * @returns {Function} 使用闭包返回函数
 */
function bindFunc(fn, context) {
  var args = Array.prototype.slice.call(arguments, 2)
  return function () {
    Array.prototype.slice.call(arguments)
    var innerArgs = Array.prototype.slice.call(arguments),
      finalArgs = args.concat(innerArgs);
    return fn.apply(context, finalArgs)
  }
}

var handler = {
  message: 'Event handled',
  handleClick: function (name, event) {
    console.log(this.message + ':' + name + ':' + event.type)
  }
}
document.body.addEventListener('click', bindFunc(handler.handleClick, handler, 'body:bindFunc'));


/////////////////////////////////////////////////
// GoodPart
// if (typeof Function.prototype.bind2 === "undefined") 
Function.prototype.bind2 = function (context) {
  var method = this,
    slice = Array.prototype.slice,
    args = slice.apply(arguments, [1]);

  if (method.bind(context)) {
    return method.bind(context, args)
  }
  return function () {
    return method.apply(context, args.concat(slice.call(arguments)))
  }
}

// document.body.addEventListener('click',
//   handler.handleClick.bind2(handler, "body:bind2"));

////////////////////////////
// ECMAScript 3 版本 Function.bind  
// bind 返回个闭包函数
if (!Function.prototype.bindES3) {
  Function.prototype.bindES3 = function (o /*, args */) {
    // Save the this and arguments values into variables so we can.保存变量中
    // use them in the nested function below.以便在后面嵌套的函数中可以使用它们
    var self = this,
      boundArgs = arguments

    // The return value of the bind() method is a function, bind返回的是一个函数
    return function () {
      // Build up an argument list, starting with any args passed
      // to bind after the first one, and follow those with all args
      // passed to this function.
      //创建一个参列表, 将传入bind()的第二个及后续的实参都传入这个函数
      var args = [],
        i
      for (i = 1; i < boundArgs.length; i++) args.push(boundArgs[i])
      for (i = 0; i < arguments.length; i++) args.push(arguments[i])

      // Now invoke self as a method of o, with those arguments
      return self.apply(o, args) //将self作为o的方法来调用, 传入这些参数
    }
  }
}

function f(y, z) {
  var result = Number(this.x) + Number(y) + Number(z);
  return this.x + y + z;
  return result
}
// var g = f.bindES3({ x: 1 }, 2);
// g(3); // => 6
