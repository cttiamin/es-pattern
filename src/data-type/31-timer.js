//  间歇调用: 指定时间过后执行代码
//  setInterval():
//  clearInterval():
//  超时调用: 每隔指定的时间就执行一次代码
//  setTimeout(): @要执行的代码, @以毫秒表示时间
//  clearTimeout():

/*
 * @超时调用:
 * 1秒中后输出信息
 * javascript是一个单线程序的解析器, 一定时间内只执行一段代码.
 * 为控制要执行的代码, 就有一个 javascript 任务队列, 
 * 这些任务会按照将它们添加到队列的顺序执行.
 *      
 * 1000: 告拆javascript在过1秒后, 把它添加到队列中,
 *     若队列是空的则执行, 若不是则等前面执行完在执行
 */

// setTimeout("console.log('Hello World! not recommend')", 1000); // 不推荐
setTimeout(function(){  // 推荐的
  ("Hello world!");
}, 1000);

/**
 * 调用setTimeout()之后, 该方法会返回一个数值 ID, 表示超时调用, 
 * 这个超时调用ID是执行代码唯一标识.
 * 要取消尚未执行的超时调用计划, 可以用clearTimeout():
 */
var timeoutId = setTimeout(function(){  //设置超时调用
  console.log("Hello world!");
}, 1000);
clearTimeout(timeoutId);    //把它取消

/** @间歇调用
 *  setInterval( @要执行的代码, @每次需要等待的毫秒数 )
 */
//setInterval("console.log('Hello world')", 10000);   //不推荐的方法

// setInterval(function(){     //推荐的方法
//     console.log("Hello World!");
// }, 10000);

var num = 0;
var max1 = 10;
var intervalId = null;
function incrementNumber(){
    console.log(num++);
    if(num == max1){
        clearInterval(intervalId);
        console.log("Done");
    }
}
//intervalId = setInterval(incrementNumber, 500);

/**
 * 使用超时调用来实现
 */
var num2 = 0;
var max2 = 10;
function incrementNumber2() {
    console.log(num2++);
    //如果执行次数未达到max2设定的值, 则设置另一次超时调用
    if (num < max2) {
        setTimeout(incrementNumber2, 500);
    } else {
        console.log("Done");
    }
}
//setTimeout(incrementNumber, 500);

/*
 * 14-1:定时器应用函数
 * Schedule an invocation or invocations of f() in the future.
 * 安排函数f()在未来的调用模式
 * Wait start milliseconds, then call f() every interval milliseconds,
 * 在等待了若干毫秒之后调用f()
 * stopping after a total of start+end milliseconds.
 * 如果设置了interval并没有设置end参数,则对f()调用将不会停止
 * If interval is specified but end is omitted, then never stop invoking f.
 * 如果没有设置interval和end,只在若干毫秒后调用f()一次
 * If interval and end are omitted, then just invoke f once after start ms.
 * 中有指定了f(),才会从start=0的时刻开始
 * If only f is specified, behave as if start was 0.
 * Note that the call to invoke() does not block: it returns right away.
 * 注意,调用invoke()不会阻塞,它会立即返回
 */
function invoke(f, start, interval, end) {
  if (!start) start = 0;          // Default to 0 ms,
  if (arguments.length <= 2)      // Single-invocation case 单次调用模式
      //Single invocation after start ms.若干毫秒后的单次调用
      setTimeout(f, start);
  else {                          // Multiple invocation case 多次调用模式
      // Repetitions begin in start ms 在start后调用repeat()
      setTimeout(repeat, start);  
      // Invoked by the timeout above 在上一行中调用
      function repeat() {         
          // Invoke f every interval ms.循环调用f()
          var h = setInterval(f, interval); 
          // And stop invoking after end ms, if end is defined
          // 在end毫秒后停止调用,前提是end已经定义了
          if (end)
              setTimeout(function () {
                  clearInterval(h);   //remove
              }, end);
      }
  }
}

/*  
invoke(function(){
      console.log("hello");
      }, 1000);
invoke(function(){
      console.log("hello world!");
      },
      1000,
      1000,
      5000);
*/


/**********************************************
 * Yielding Processes (产出 队列进行)
 *  数组分块 (array chunking) 的技术:
 *  要处理的的项目创建一个队列,
 *  然后使用定时器取出下一个要处理的项目进行行处理,
 *  接着再设置另一个定时器.
 *  array 变量本质上就是一个"待办事宜"列表,它包含了要处理的项目,
 *  使用shift()方法可以获得下一个项目.
 *  然后传递给某个函数, 如果队列中还有其它函数,则设置一个定时器,
 *  并通过arguments.callee 调用同一个匿名函数.
 */
var data = [12, 123, 1234, 453, 436, 23, 23, 5, 
    4123, 45, 346, 5634, 2234, 345, 342];

function chunk(array, process, context) {
    setTimeout(function () {
        var item = array.shift();
        process.call(context, item);
        if (array.length > 0) {
            setTimeout(arguments.callee, 100);
        }
    }, 100);
}

function printValue(item) {
    // var div = document.getElementById("myDiv");
    // div.innerHTML += item + "<br>";
    console.log(item)
}
// chunk(data, printValue);



/********************************* 
 * 函数节流
 *  浏览器计算耗资源, DOM操作, onresize事件, 会让浏览器崩溃
 *  定时器对函数进行节流:
 *      第一次调用函数, 创建一个定时器, 在指定的时间间隔运行代码.
 *      第二次调用该函数时, 它会清除前一次的定时器并设置另一个.
 *      目的: 在执行函数的请求停止了一段时间之后才执行,
 *          其实就是替换为一个新的定时器
 */
var processor = {
    timeoutId: null,
    //实际执行代码
    performProcessing: function () {
        console.log("execute");
    },
    process: function () {
        clearTimeout(this.timeoutId);
        var that = this;
        this.timeoutId = setTimeout(function () {
            that.performProcessing();
        }, 100);
    }
};
//processor.process();

function throttle(method, scope) {
    clearTimeout(method.tId);
    //清除之前设置的任何定时器

    method.tId = setTimeout(function () {
        method.call(scope);
    }, 100);
}

function resizeDiv() {
    var div = document.getElementById("myDiv");
    div.style.height = div.offsetWidth + "px";//高度始终等于宽度
}

//当浏览器调整大小时
window.onresize = function () {
    throttle(resizeDiv);
};