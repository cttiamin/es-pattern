

//////////////////////////////////////////////////////////
// 第八章 Programming Practices 编程实践
//
// Avoid Double Evaluation 避免二次评估
// Use Object/Array Literals 使用对象/数组直接量
// Don't Repeat Work 不要重复工作

// 以事件句柄的添加和删除为例
function addHandler(target, eventType, handler){ 
    if (target.addEventListener){ //DOM2 Events
        target.addEventListener(eventType, handler, false); 
    } else { //IE 
        target.attachEvent("on" + eventType, handler); 
    } 
}

function removeHandler(target, eventType, handler){
    if (target.removeEventListener){ // DOM2 Events
        target.removeEventListener(eventType, handler, false);
    } else { //IE
        target.detachEvent("on" + eventType, handler);
    }
}
// 隐藏的性能问题: 都进行同样的检查，看看某种方法是否存在。


///////////////////////////
// Lazy Loading 延迟加载
//
// 在前面的例子中，不需要判断使用哪种方法附加或分离事件句柄
// 直到有人调用此函数。
//
function addHandler(target, eventType, handler){
    //overwrite the existing function 
    if (target.addEventListener){ //DOM2 Events 
        addHandler = function(target, eventType, handler){
            target.addEventListener(eventType, handler, false); 
        }; 
    } else { //IE 
        addHandler = function(target, eventType, handler){
            target.attachEvent("on" + eventType, handler);
        }; 
    } 
    //call the new function 
    addHandler(target, eventType, handler); 
}

function removeHandler(target, eventType, handler){
    //overwrite the existing function
    if (target.removeEventListener){ //DOM2 Events
        removeHandler = function(target, eventType, handler){
            target.addEventListener(eventType, handler, false); 
        }; 
    } else { //IE
        removeHandler = function(target, eventType, handler){ 
            target.detachEvent("on" + eventType, handler); 
        }; 
    }
    //call the new function
    removeHandler(target, eventType, handler); 
}
// 这两个函数依照延迟加载模式实现。这两个方法第一次被调用时，
// 检查一次并决定使用哪种方法附加或分离事件句柄。然后，原始
// 函数就被包含适当操作的新函数覆盖了。最后调用新函数并将原
// 始参数传给它。以后再调用addHandler()或者removeHandler()时
// 不会再次检测，因为检测代码已经被新函数覆盖了。


/////////////////////////////////////////
// Conditional Advance Loading 条件预加载
// 在脚本加载之前提前进行检查,而不等待函数调用.
// 这样做检测仍只是一次
//
var addHandler = document.body.addEventListener ? 
function(target, eventType, handler){ 
    target.addEventListener(eventType, handler, false); 
}: 
function(target, eventType, handler){ 
    target.attachEvent("on" + eventType, handler); 
}; 

var removeHandler = document.body.removeEventListener ? 
function(target, eventType, handler){ 
    target.removeEventListener(eventType, handler, false); 
}: 
function(target, eventType, handler){ 
    target.detachEvent("on" + eventType, handler); 
};


// Use the Fast Parts 使用速度快的部份
// Bitwise Operators 位操作运算符 
//  速度快, 不友好.
//
var num1 = 25, 
    num2 = 3; 
(num1.toString(2)); //"11001" 
(num2.toString(2)); // "11"
//转换二进制

//bitwise AND 
var result1 = 25 & 3; //1 
(result1.toString(2)); //"1" 
//bitwise OR 
var result2 = 25 | 3; //27 
(result2.toString(2)); //"11011" 
//bitwise XOR 
var result3 = 25 ^ 3; //26 
(result3.toString(2)); //"11000" 
//bitwise NOT 
var result = ~25; //-26 
(result2.toString(2)); //"-11010"

// 通常采用对2取模运算实现表行颜色交替显示
var rows = 15, className;
for (var i=0, len=rows.length; i < len; i++){ 
    if (i % 2) { 
        className = "even"; 
    } else { 
        className = "odd"; 
    } 
    //apply class 
}

// 32位数字的底层（二进制）表示法，偶数的最低位是0，奇数的最低位是1。
// 如果此数为偶数，那么它和1进行位与操作的结果就是0；
// 如果此数为奇数，那么它和1进行位与操作的结果就是1。
for (var i=0, len=rows.length; i < len; i++){ 
    if (i & 1) { 
        className = "odd"; 
    } else { 
        className = "even"; 
    } 
    //apply class 
}
// 位运算比原版快 50%


// 快速地将数字转换为布尔标志数组。掩码中每个选项的值都等于2的幂。
var OPTION_A = 1; 
var OPTION_B = 2; 
var OPTION_C = 4; 
var OPTION_D = 8; 
var OPTION_E = 16;
var options = OPTION_A | OPTION_C | OPTION_D
/*if (options & OPTION_A){ */
////do something 
//} 
////is option B in the list? 
//if (options & OPTION_B){ 
////do something 
/*}*/

// 使用 Math 对象中 一些数学常数进行运算



///////////////////////////////////////////////////////////
// Chapter 9 Building and Deploying High-Performance 
//          JavaScript Applications
//  创建并部署高性能JavaScript 应用程序
//
//
// 1) Apache Ant  http://ant.apache.org/
//
// 2) Combining JavaScript Files 合并JavaScript文件
// 
// 3) gzip压缩, 编码 主要用于文本报文
//
// 4) Packer, 对JavaScript压缩能够超过YUI压缩器的水平, Dean Edwards
//      http://dean.edwards.name/packer/
//
// 5) YUI 压缩器     
// 


/////////////////////////////
// Caching JavaScript Files 缓存JavaScript文件
//
// 和不使用缓存相比，使用缓存将减少90%的HTTP请求和83%的下载字
// 节。往返时间（从请求页面开始到第一次onload事件）从2.4秒下降到0.9秒
// 
//
// http://yuiblog.com/blog/2007/01/04/performance-research-part-2/
//


// 使用CDN, 如Akamai, www.akamai.com, 
// Agile JavaScript Build Process 灵巧的JavaScript开发过程a
//
// smasher 是一个PHP5应用程序. 基于Yahoo!搜索所使用的一个内部工具
//      处理网页请求自动合并资源.
// http://github.com/jlecomte/smasher
//
//


///////////////////////////////////////////////////////////
// Chapter 10 Tools 工具
//
//  Profiling 性能分析
//  Network analysis 网络分析
//
//
// JavaScript Profiling  JavaScript性能分析

// 使用Data对象测量脚本的运行时间.
// 创建元素 与 克隆元素 所用的时间
var start = new Date(), 
    count = 10000, 
    i, element, time;
for (i = 0; i < count; i++) { 
    element = document.createElement('div'); 
}
time = new Date() - start; 
('created ' + count + ' in ' + time + 'ms'); // 10-13 ms

start = new Date();
for (i = 0; i < count; i++){ 
    element = element.cloneNode(false); 
}
time = new Date() - start; 
('created ' + count + ' in ' + time + 'ms'); // 5-8 ms


// 上例性能分析十分繁琐
// 定义一个Timer对象处理时间计算并存放那些下一步会用到的时间值
var Timer= { 
_data: {},
       start:function(key) { 
           Timer._data[key] = new Date(); 
       },
stop:function(key) { 
         var time = Timer._data[key]; 
         if (time) { 
             Timer._data[key] = new Date() - time; 
         } 
     },
getTime:function(key) { 
            return Timer._data[key]; 
        } 
};

Timer.start('createElement'); 
for (i = 0; i < count; i++) { 
    element = document.createElement ('div'); 
}
Timer.stop('createElement'); 
('created ' + count + ' in ' + Timer.getTime('createElement'));




///////////////////////////////////////
// Anonymous Functions 匿名函数 
// 给匿名函数加上一个名字, 一个内联名称使报告更加可读 
//
/*var onClick = function myNodeClickHandler() { */
//myApp.loadData(); 
/*};*/


////////////////////////////////////
// Firebug
//
// console => Profile =>点击Profile按钮可启动分析过程，触发脚本，
//      再次点击Profile按钮可停止分析
//
// 
// Console API 终端API
//   Firebug还提供了JavaScript接口用于启动和停止分析器。这可精确
//   控制测量某部分代码。
function regexTest(a1, a2){ return a1;}
function indexOfTest(a1, a2){ return a1;}
console.profile("regexTest"); 
regexTest('foobar', 'foo'); 
console.profileEnd(); 
console.profile("indexOfTest"); 
indexOfTest('foobar', 'foo'); 
console.profileEnd();


///////////////////////
// console.time() : 有助于测量循环和其他分析不能监视的操作.
// 对一小段包含循环的代码进行计时:
console.time("cache node");
for (var box = document.getElementById("box"), 
        i = 0;
        i < 100; i++) {

    value = parseFloat(box.style.left) + 10; 
    box.style.left = value + "px"; 
} 
console.timeEnd("cache node");

// 比较缓存节点引用和缓存节点样式的引用
console.time("cache style"); 
for (var style = document.getElementById("box").style, 
        i = 0; 
        i < 100; i++) { 
    value = parseFloat(style.left) + 10; 
    style.left = value + "px"; 
} 
console.timeEnd("cache style");

///////////////////////
// Net Panel 网络面板
// 在net 选项卡中
//  如果可以 将多个 js文件合并为一个文件.
//


////////////////////////
// Fiddler
// Fiddler是一个HTTP调试代理，检查资源在线传输情况，以定位加载瓶颈。
// http://www.telerik.com/download/fiddler
// Firebug: FiddlerHook 
//

////////////////////////
// YSlow 
// 深入视察初始页面视图整体加载和运行过程的性能
// http://developer.yahoo.com/yslow/


///////////////////////
// dynaTrace
// Java/.NET性能诊断工具, 
// dynaTrace Ajax Edition  Ajax版的dynaTrace
//
// http://ajax.dynatrace.com/pages/
// https://community.compuwareapm.com/community/display/AJAX/Dynatrace+AJAX+Edition+Community+Home
//

