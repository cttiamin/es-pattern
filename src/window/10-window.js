/////////////////////////
// window对象-BOM, 20140402, Wednesday, 15: 00
// window 对象同时扮演着 ECMAScript 中和 Global对象 角色
// 
// frames:
// top: 最高, 最外层的框架, 也就是浏览器窗口
// window: 指向那个框架的特定实例
// parent: 指向当前框架的上层
// self: 与 window
//
// 窗口位置:
//  IE, Opera, Safari support:
// screenLeft: 浏览器窗口与屏幕左边距
// screenTop: ...右..
// FirefoxSupport:
// screenX: 浏览器窗口与屏幕左边距
// screenY: ...右..
// moveTo(), moveBy(): 将窗口移动到一个新置,被浏览器禁用的

// 窗口大小
// innerWidth/innerHeight: 浏览器显示内容区域视图区大小(减去边框宽度)
// outerWidth/outerHeight: 浏览器大小,视口(viewport), ie9+
// document.documentElement.clientWidth / clientHeight: 保页面视口信息
// document.body.clientWidth/clientHeight: IE特有, IE在非标准模下
// resizeTo, resizeBy: 调整浏览器窗口大小, 被禁用的, 只对外层的window使用

// 导航和打开窗口
// open:
// @加载URL, "http://www.baidu.com"
// @窗口目标, "topFrame, _self, parent, _top, _blank"
// @一个特性字符, (fullscreen, height, idht, left, top
//   , location, menubar, resizable, scrollbars, status
//   , toolbar)
// @页面是否取代浏览器
// close
// closed
// window.opener: 新建窗口中保存着原始窗口象,原始窗口中并没有指针指向弹出窗口
// 
//
// 系统对话框
// alert: 显示一条消息并等待用户关闭对话框
// confirm: 要求用户单击"确定"或"消"
// prompt: 等待用户输入字符串并返回那个字符串.
// window.print(): 显示打印对话框
// window.find(): 显示查找对话框

// window.error: 错误处理
// location
//      hash: "#contents", URL中片段标识符部份
//      host: "www.baidu.com:80,
//      hostname: "www.baidu.com"
//      href: "http://www.baidu.com"
//      pathname: "/WileyCDA/", 返回URL中的目录或文件名
//      port: "8080"
//      protocol: http:
//      search: "?q=javascript"
//      assign(): 载入并显示你指定的URL中的文档
//      replace(): 载入,比 assgin() 更好的选择."后退"
//      reload(true): 重新加载
// navigator
// history

// 窗口关系及框架
{/* <frameset rows="160,*">
    <frame src="080/frame.htm" name="topFrame">
    <frameset cols="50%,50%">
        <frame src="080/anotherframe.htm" name="leftFrame">
        <frame src="080/yetanotherframe.htm" name="rightFrame">
    </frameset>
</frameset> */}

/**
 * 全局与window差别:
 * 全局变量不能通过 delete 操作符删除, window 对象可以
 **/
var age = 29;   //全局变量
window.color = "red";   //windows变量
delete window.age;     //在IE <9 时抛出错误
delete window.color;    //return true
(window.age);   // => 29
(window.color);  // =>undefined
// 访问未声明的变量会抛出错误
// var newValue = oldValue;
// 这里不会抛出错误,因为是一次属性查询,newValue的值是undefind
var newValue = window.oldValue;


////////////////////////////
// 跨浏览器获取窗口的位置
var leftPos = (typeof window.screenLeft == "number") ?
  window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ?
  window.screenTop : window.screenY;
("Left: " + leftPos);
("Top: " + topPos);
window.moveTo(0, 0);    // 将窗口称动到屏幕左上角
window.moveBy(0, 100);  // 向下移动100像素


////////////////////////////
// 视口(viewport)大小获取, 窗口大小获取
var pageWidth = window.innerWidth,
  pageHeight = window.innerHeight;

if (typeof pageWidth != "number") {
  // 页面是否处于标准模式
  if (document.compatMode == "CSS1Compat") {
    console.log(1);
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  }
  else { // IE 对于非标准模式(混杂模式),
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
    console.log(2);
  }
}
(pageWidth); // => 704
(pageHeight); // => 415


////////////////////////////
//  导航和打开窗口
//window.open("http://www.baidu.com", "_blank",
//                "height=400,width=400, top=100, left=10, resizable=yes");
var wroxWin = window.open("http://www.baidu.com", "wroxWindow",
  "height=400,width=400, top=10, left=10, resizable=yes");
if (wroxWin == null) {   //测试浏览器是否 开启屏蔽程序
  console.log("The popup was blocked!");
}
wroxWin.resizeTo(500, 500);
wroxWin.moveTo(100, 100);
wroxWin.close();    //top.close()只对open()的窗口有效;
(wroxWin.closed);    //true, 窗口关闭后其引用还在;
(wroxWin.opener == window);
//切断 与上级 标签 面之间的联系, 在独立的进程中运行
wroxWin.opener = null;

////////////////////////////
// 弹出窗口屏蔽程序
var blocked = false;
try {
  var wroxWin = window.open("http://www.baidu.com", "_blank");
  if (wroxWin == null) {
    blocked = true;
  }
} catch (ex) {
  blocked = true;
}
if (blocked) {
  alert("The popup was blocked!");
}
wroxWin.close();

// if (confirm("Are you sure?")) {
//   alert("I'm so glad you're sure!");
// } else {
//   alert("I'm sorry to hear you're not srue. ");
// }

// var result = prompt("what's your name?", "Michael");
// if (result !== null) {
//   alert("Welcom, " + result);
// }

// do {
//   var name = prompt("What is your name?");
//   var correct = confirm("You entered '; " + name + "' .\n"
//     + "Click Okay to proceed or Cancel to re-enter.");
// } while (!correct)
// console.log("Hello" + name);    //输入一个纯文本的消息

// window.print();   //显示打印对话框
// window.find();    //显示查找对话框

////////////////////////////
// 错误处理
window.onerror = function (msg, url, line) {
  if (onerror.num++ < onerror.max) {
    alert("ERROR: " + msg + "\n" + url + ":" + line);
    return true;
  }
}
  //        onerror.max = 3;
  //        onerror.num = 0;

  ////////////////////////////
  // location
  //  Document 对象的loaction属性也引用到Location对象
  (window.location === document.location); // => true

// location.toString() 返回 href 属性值, 会隐式调用 toString
(location == location.href);   // => true

// 查找字符串参数(lenovo)
// assume query string of ?q=javascript&num=10
function getQueryStringArgs() {
  //get query string without the initial ?
  var qs = (location.search.length > 0
    ? location.search.substring(1) : ""),
    args = {},      //object to hold data
    //get individual items
    items = qs.length ? qs.split("&") : [],
    item = null,
    name = null,
    value = null,
    i = 0,  //used in for loop
    len = items.length;

  //assign each item onto the args object
  for (i = 0; i < len; i++) {
    item = items[i].split("=");
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  }
  return args;
}
var args = getQueryStringArgs();
(args["q"]);     // => "javascript"
(args["num"]);   // => "10"

// 提取URL的搜索字符串中的参数
// This function parses ampersand-separated name=value argument pairs from
// the query string of the URL. It stores the name=value pairs in
// properties of an object and returns that object. Use it like this:
// var args = urlArgs();  // Parse args from URL
// var q = args.q || "";  // Use argument, if defined, or a default value
// var n = args.n ? parseInt(args.n) : 10;
function urlArgs() {
  var args = {};                             // Start with an empty object
  var query = location.search.substring(1);  // Get query string, minus '?'
  var pairs = query.split("&");              // Split at ampersands
  for (var i = 0; i < pairs.length; i++) {    // For each fragment
    var pos = pairs[i].indexOf('=');       // Look for "name=value"
    if (pos == -1) continue;               // If not found, skip it
    var name = pairs[i].substring(0, pos);  // Extract the name
    var value = pairs[i].substring(pos + 1); // Extract the value
    value = decodeURIComponent(value);     // Decode the value
    args[name] = value;                    // Store as a property
  }
  return args;                               // Return the parsed arguments
}
var args2 = urlArgs();
(args2["q"]);   // => "javascript"

//  位置操作
//  assign: 载入并显示你指定的URL中的文档
// location.assign("http://www.baidu.com");    // 历史记录中生成一条记录
// window.location = "http://www.baidu.com";   // 更传统的方式
// location.href = "http://www.baidu.com";
// location = "#top";    // 跳到文档的顶部

// 通过将 hash, search, hostname, pathname, port 属性设置为新值改变URL
// 假设初值 URL 为 http://www.wrox.com/WileyCDA/
// 将URL修改为 "http://www.wrox.com/WileyCDA/#section1"
// location.hash = "#section1";
// location.search = "?q=javascript"; // 加上 http://...//WileyCDA/?q=javascript
// location.hostname = "www.yahoo.com"; // http://www.yahoo.com//WileyCDA/
// location.pathname = "mydir"; // http://www.yahoo.com/mydir
// location.port = 8080;

// 当调用跳转后, 在浏览器单击后退,会返回
// location.replace("http://www.baidu.com");
// location.reload();      //重新加载(有可能从缓存中加载)
// location.reload(true);  // 重新加载(从服务器加载)

////////////////////////////
// history: 每个浏览器窗口,每个标签都有自己的history
// history.go(-2);   //后退2次
// history.go(1);    //前进一页
// history.go(2);      //前进两页
// history.go("baidu.com");    //跳到最近的baidu.com页面
// history.back();     //后退一页
// history.forward();  //前进一页

// 历史状态管理
//   hashchange 事件: URL的参数什么时候发生了变化
//   history.pushState( 状态对象, 新状态的标题, 相对URL ) :
//   replaceState()
//  history.pushState({name: "Nicholas"}, "Nicholas' page", "nicholas.html");
