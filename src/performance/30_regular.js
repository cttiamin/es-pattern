////////////////////////////////////////////////////////////////
// Chapter 5 String and Regular Expressions

// str += "one" + "two";
// four steps are taken:
// 1. A temporarily string is created in memory.
// 2. The temporary value "onetwo" is assigned to the temporary string.
// 3. The temporary string is concatenated with the current value of "str".
// 4. The result is assigned to "str"

// 省去中间两步
//str += "one"; 
//str += "two";

// 省去中是两步, 与上例相同
//str = str + "one" + "two";
//str = "one"+ str + "two"; //错误的!



//////////////////////////////////////////////////////
// Firefox automatically merges them at compile time
//
function foldingDemo() {
    var str = "compile" + "time" + "folding";
    str += "this" + "works" + "too";
    str = str + "but" + "not" + "this";
}
//console.log(foldingDemo.toString());

//In Firefox, you'll see this: 
function foldingDemo2() {
    var str = "compiletimefolding";
    str += "thisworkstoo";
    str = str + "but" + "not" + "this";
}


/////////////////////////////
// Array Joining 数组联结
//
var str = "I'm a thirty-five character string.",
    newStr = "",
    appends = 5000;
while (appends--) {
    newStr += str;
}
// Ie7更早, 226 millisecondes for 5,000 concat nations
// 32 second in order to concatenated 20,000 short strings.


// which generates the same tring via array joining:
var str = "I'm a thirty-five character string.",
    strs = [],
    newStr,
    appends = 5000;
while (appends--) {
    strs[strs.length] = str;
}
newStr = strs.join("");
// This dramatic improvement results from avoiding repeatedly
// allocating memory for and copying progressively larger and 
// larger and larger strings.


//////////////////////////////
// String.prototype.concat

var s1, s2, s3 = '';
// append one string
str = str.concat(s1);
// append three strings
str = str.concat(s1, s2, s3);
// append every string in an array by using the array 
// as the list of arguments
//str = String.prototype.concat.apply(str, array);
// Unfortunately, concat is a little slower than simple + and +=
// opeartions in most cases,



////////////////////////////////////////////////////////
//Regular Expression Optimization 正则表达式优化
//  正则表达式处理的基本步骤:
//      1.编译
//      2.设置起始位置
//      3.匹配每个正则表达式的字元
//      4.匹配成功或失败
//
//      Backtrack 回溯
//


var test01 = /h(ello|appy) hippo/.test("hello there, happy hippo");
//console.log(test01);
// 1.h ello hippo ; fail 
// 2.h appy hippo ; success


var str = "<p>Para 1.</p>" + "<img src='smiley.jpg'>"
    + "<p>Para 2.</p>" + "<div>Div.</div>";
/<p>.*<\/p>/i.test(str);
// * : greedy matches.  匹配至第二段</p>尾.


/<p>.*?<\/p>/i.test(str);
// *?: lazy matches. 匹配至第一段</p>尾 

//JavaScript没有选项可使点号匹配任意字符，包括换行符，
//所以此 例中以[\s\S]匹配任意字符。
/<html>[\s\S]*?<head>[\s\S]*?<title>[\s\S]*?<\/title>[\s\S]*?<\/head> [\s\S]*?<body>[\s\S]*?<\/body>[\s\S]*?<\/html>/
// 上例匹配目标字符串时, 如果少</html> 会出错

// negative lookahead: 负向先行断言
// /<html>(?:(?!<head>)[\s\S])*<head>(?:(?!<title>)[\s\S])*<title> (?:(?!<\/title>)[\s\S])*<\/title>(?:(?!<\/head>)[\s\S])*<\/head> (?:(?!<body>)[\s\S])*<body>(?:(?!<\/body>)[\s\S])*<\/body> (?:(?!<\/html>)[\s\S])*<\/html>/
// 像这样每个匹配字符多次前瞻缺乏效率.

// backreferences:反向引用,向后引用.
// lookahead: 预测先行,前瞻,前瞻控制
//
// (?>...) : 原子组; "..."省略号表示任何正则模式
// 由于 JavaScript 不支持原子组, 也不提供其它方法消除backtracking.
// 利用前瞻过程中一项的行为来模拟原子组.
// 在捕获组中包装一个前瞻模板, 在前瞻模板之外向它添加一个后向引用.
// (?=(pattern to make atomic))\1
// /<html>(?=([\s\S]*?<head>))\1(?=([\s\S]*?<title>))\2(?=([\s\S]*? <\/title>))\3(?=([\s\S]*?<\/head>))\4(?=([\s\S]*?<body>))\5 (?=([\s\S]*?<\/body>))\6[\s\S]*?<\/html>/

// Alternation using the | vertical bar
// Character classes are faster than alternation:
// cat|bat => [cb]at
// red|read => rea?d
// red|raw => r(?:ed|aw)
// (.|\r|\n) => [\s\S]


// 字符串修剪

//正则表达式修剪
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+/, "").replace(/\s+$/, "");
    }
}
// test the new method... 
// tab (\t) and line feed (\n) characters are 
// included in the leading whitespace. 
var str = " \t\n test string ".trim();
//console.log(str == "test string"); // alerts "true"


// trim 2
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}


// trim 3
String.prototype.trim = function () {
    return this.replace(/^\s*([\s\S]*?)\s*$/, "$1");
}


// trim 4
String.prototype.trim = function () {
    return this.replace(/^\s*([\s\S]*\S)?\s*$/, "$1");
}


// trim 5
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
}



// 不用正则
// trim 6
String.prototype.trim = function () {
    var start = 0,
        end = this.length - 1,
        ws = "\n\r\t\f\x0b\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u202f\u205f\u3000\ufeff";
    while (ws.indexOf(this.charAt(start)) > -1) {
        start++;
    }
    while (end > start && ws.indexOf(this.charAt(end)) > -1) {
        end--;
    }
    return this.slice(start, end + 1);
}


// 混合解决方案
// trim 7
String.prototype.trim = function () {
    var str = this.replace(/^\s+/, ""),
        end = str.length - 1,
        ws = /\s/;
    while (ws.test(str.charAt(end))) {
        end--;
    }
    return str.slice(0, end + 1);
}



////////////////////////////////////////////////////////////////
// 第六章 Responsive Interfaces 响应接口

///////////////////////////////
// Splitting Up Tasks 分解任务

// 将一个任务分解成 一系列子任务
function saveDocument(id) {
    //save the document 
    openDocument(id)
    writeText(id);
    closeDocument(id);
    //update the UI to indicate success 
    updateUI(id);
}

// 将每个函数都放入一个数组, 使用数组处理模式.
function saveDocument(id) {
    var tasks = [openDocument, writeText, closeDocument, updateUI];
    setTimeout(function () {
        //execute the next task 
        var task = tasks.shift();
        task(id);
        //determine if there's more 
        if (tasks.length > 0) {
            setTimeout(arguments.callee, 25);
        }
    }, 25);
}


// 上例封装重用: 把独立方法放在定时器中调用
// @steps: 执行函数数组
// @args:an array of arguments to pass into each function when it executes
// @callback: when the process is complete.
//
function multistep(steps, args, callback) {
    var tasks = steps.concat(); //clone the array
    setTimeout(function () {
        //execute the next task
        var task = tasks.shift();
        task.apply(null, args || []);

        //determine if there's more 
        if (tasks.length > 0) {
            setTimeout(arguments.callee, 25);
        } else {
            callback();
        }
    }, 25);
}


// This function can be used like the following:
// @id: It must be an array type;
function saveDocument(id) {
    var tasks = [openDocument, writeText, closeDocument, updateUI];
    multistep(tasks, [id], function () {
        console.log("Save completed!");
    });
}



//////////////////////////////
// Timed Code 限时运行代码
//
// 不要让任何JavaScript代码持续运行超过50毫秒


// 原和的Data对象跟踪代码的运行时间.
// +new Date():  返回数值， 1465283366634
// new Date(): 返回时间， Date {Tue Jun 07 2016 15:09:26 GMT+0800}；
var start = +new Date(),
    // The plus operator(+)converts the Date object into a numeric.
    stop;

var start2 = new Date(); // Date {Mon Mar 23 2015}

//someLongProcess(); 
(function () {
    //console.log('hello');
}());

stop = +new Date();

if (stop - start < 50) {
    ("Just about right.");
} else {
    console.log("Taking too long.");
}


//ProcessArray() 通过一个时间检测机制, 可在每个定时器中执行多次处理 
function timedProcessArray(items, process, callback) {
    var todo = items.concat();
    //create a clone of the original

    setTimeout(function () {
        var start = +new Date();

        do {
            process(todo.shift());
        } while (todo.length > 0 && (+new Date() - start < 50));

        if (todo.length > 0) {
            setTimeout(arguments.callee, 25);
        }
        else {
            callback(items);
        }
    }, 25);
}
// 避免将任务分解成过于碎小的片断




////////////////////////////////
// Web Workers 网页工人线程
//

/*var worker = new Worker("code.js"); */
//worker.onmessage = function(event){ 
////console.log(event.data); 
//}; 
//worker.postMessage("Nicholas");

//inside code.js
self.onmessage = function (event) {
    self.postMessage("Hello, " + event.data + "!");
};

///////
// 网页工人 解析 JSON
//

/*var worker = new Worker("jsonparser.js"); */
////when the data is available, this event handler is called
//worker.onmessage = function(event){ 
////the JSON structure is passed back 
//var jsonData = event.data; 
////the JSON structure is used 
//evaluateData(jsonData); 
//}; 
////pass in the large JSON string to parse 
//worker.postMessage(jsonText);

// 工人线程负责JSON解析
//
//inside of jsonparser.js 
//this event handler is called when JSON data is available

/*self.onmessage = function(event){ */
////the JSON string comes in as event.data 
//var jsonText = event.data; 
////parse the structure 
//var jsonData = JSON.parse(jsonText); 
////send back to the results
//self.postMessage(jsonData); 
//};

