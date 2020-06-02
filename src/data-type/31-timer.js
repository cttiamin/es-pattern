//  setInterval()
//  clearInterval()
//  setTimeout 每隔指定的时间就执行一次代码
//  clearTimeout


/////////////////
// Timeout 例计时
function incrementFun(num = 60) {
  var max = num;
  var incrementNumber = function () {
    incrementExce(max)
    max--
    if (max > 0) {
      setTimeout(incrementNumber, 1000);
    } else {
      console.log('Done');
    }
  }
  return incrementNumber;
}
// var h3Tag = document.createElement('h3')
// document.body.appendChild(h3Tag)
// incrementFun(10)();
// function incrementExce(num) {
//   h3Tag.innerText = num
//   console.log(num)
// }


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
        setTimeout(function () {
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
// 函数节流-定时器
//  浏览器计算耗资源, DOM操作, onresize, oninput, 下拉
//  对函数进行节流
var processor = {
  timeoutId: null,
  performProcessing: null,
  process: function () {
    clearTimeout(this.timeoutId);
    // var that = this;
    this.timeoutId = setTimeout(function () {
      this.performProcessing();
    }, 300);
  }
};
// processor.process();

////////////////////////////
// 函数节流-定时器2
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

// var inputTag2 = document.createElement('input')
// document.body.appendChild(inputTag2)

// inputTag.addEventListener('keyup', debounce(function (e) {
//   console.log(inputTag.value, e)
// }, 500))


inputTag.addEventListener('keyup', function (e) {
  processor.process()
  processor.performProcessing = function (){
    console.log(inputTag.value, 'tag1')
  }
})

// inputTag2.addEventListener('keyup', function (e) {
//   processor.process()
//   processor.performProcessing = function (){
//     console.log(inputTag2.value, 'tag1')
//   }
// })

// 函数节流-时间戳
function throttle(fn, wait = 50) {
  let previous = 0;
  return function (...args) {
    let now = +new Date()
    if (now - previous > wait) {
      previous = now;
      fn.apply(this, args)
    }
  }
}

window.onresize = throttle(function (e) {
  console.log(document.body.clientWidth, e)
}, 500)