//  setInterval(): 间歇调用: 指定时间过后执行代码
//  clearInterval():
//  setTimeout:  超时调用: 每隔指定的时间就执行一次代码
//  clearTimeout:


// 超时调用:
// 调用 setTimeout 后, 返回一个数值 ID
// 超时调用 ID 执行唯一标识
// clearTimeout 取消
var timeoutId = setTimeout(function() {
  //设置超时调用
  console.log('Hello world!');
}, 1000);
// 1000: 告拆 js 在过1秒后, 把它添加到队列中
// 若队列是空的则执行, 若不是则等前面执行完在执行
clearTimeout(timeoutId); //把它取消

/////////////////
// 间歇调用
var num = 0;
var max1 = 10;
var intervalId = null;
function incrementNumber() {
  console.log(num++);
  if (num == max1) {
    clearInterval(intervalId);
    console.log('Done');
  }
}
// intervalId = setInterval(incrementNumber, 500);

/////////////////
// 使用超时调用来实现
function incrementFun1 () {
  var num2 = 0;
  var max2 = 60;
  var incrementNumber2 = function () {
    num2++
    // 如果执行次数未达到 max2 设定的值, 则设置另一次超时调用
    if (num2 < max2) {
      console.log(num2)
      setTimeout(incrementNumber2, 1000);
    } else {
      console.log('Done');
    }
  }
  return incrementNumber2;
}
// setTimeout(incrementNumber2, 1000);
// incrementFun1()();

/*
 * 定时器应用函数
 * 函数 f() 在未来的调用模式
 * 在等待了若干毫秒之后调用 f()
 * 如果设置了 interval 并没有设置 end 参数, 则对 f() 调用将不会停止
 * 如果没有设置 interval 和 end, 只在若干毫秒后调用 f() 一次
 * 中有指定了 f(), 才会从 start=0 的时刻开始
 * 注意,调用invoke()不会阻塞, 它会立即返回
 */
function invoke(f, start, interval, end) {
  if (!start) start = 0; // Default to 0 ms,
  if (arguments.length <= 2)
    // Single-invocation case 单次调用模式
    // Single invocation after start ms. 若干毫秒后的单次调用
    setTimeout(f, start);
  else {
    // Multiple invocation case 多次调用模式
    // Repetitions begin in start ms 在 start 后调用repeat()
    setTimeout(repeat, start);
    // Invoked by the timeout above 在上一行中调用
    function repeat() {
      // Invoke f every interval ms.循环调用 f()
      var h = setInterval(f, interval);
      // And stop invoking after end ms, if end is defined
      // 在 end 毫秒后停止调用,前提是 end 已经定义了
      if (end)
        setTimeout(function() {
          clearInterval(h); //remove
        }, end);
    }
  }
}

// invoke(function(){
//   console.log("hello");
//   }, 1000);

// invoke(function(){
//   console.log("hello world!");
// },
// 1000,
// 1000,
// 10000);

/**********************************************
 * Yielding Processes (产出 队列进行)
 *  数组分块 (array chunking) 的技术:
 *  要处理的的项目创建一个队列
 *  然后使用定时器取出下一个要处理的项目进行行处理
 *  接着再设置另一个定时器.
 *  array 变量本质上就是一个 "待办事宜" 列表, 它包含了要处理的项目
 *  使用shift()方法可以获得下一个项目.
 *  然后传递给某个函数, 如果队列中还有其它函数, 则设置一个定时器
 */
var data = [
  12,
  123,
  1234,
  453,
  436,
  23,
  23,
  5,
  4123,
  45,
  346,
  5634,
  2234,
  345,
  342
];
function chunk(array, process, context) {
  setTimeout(function chunkFunc() {
    var item = array.shift();
    process.call(context, item);
    if (array.length > 0) {
      setTimeout(chunkFunc, 100);
    }
  }, 100);
}
function printValue(item) {
  console.log(item);
}
// chunk(data, printValue);


////////////////////////////
// 函数节流
//  浏览器计算耗资源, DOM操作, onresize, oninput, 下拉
//  定时器对函数进行节流:
//  第一次调用函数, 创建一个定时器, 在指定的时间间隔运行代码.
//  第二次调用该函数时, 清除前一次定时器并设置另一个
//  目的: 在执行函数的请求停止了一段时间之后才执行,
//    其实就是替换为一个新的定时器
var processor = {
  timeoutId: null,
  // 实际执行代码
  performProcessing: function() {
    console.log('execute');
  },
  process: function() {
    // if (this.timeoutId)
    clearTimeout(this.timeoutId);
    var that = this;
    this.timeoutId = setTimeout(function() {
      that.performProcessing();
      // this.timeoutId = null
    }, 300);
  }
};
// processor.process();

function debounce(fn, delay = 500) {
  // timer 是闭包中的
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

// add input
var inputTag = document.createElement('input')
document.body.appendChild(inputTag)
// inputTag.addEventListener('keyup', debounce( function (e) {
//   console.log(inputTag.value)
// }), 500)

inputTag.addEventListener('keyup', function (e) {
  processor.performProcessing = function (){
    console.log(inputTag.value)
  }
  processor.process()
})




// onresize
function throttle(method, scope) {
  clearTimeout(method.tId);
  method.tId = setTimeout(function() {
    method.call(scope);
  }, 100);
}
function resizeDiv() {
  console.log(document.body.clientWidth)
}
// 当浏览器调整大小时
window.onresize = function() {
  throttle(resizeDiv);
};
