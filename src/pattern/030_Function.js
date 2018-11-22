/********
 * JavaScript Patterns 
 * Edit 20160718, 565537037@qq.com
 * Chapter 4 函数 (Function)
 * JavaScript 函数有两个特点
 *  1.函数是一类对象(first-class object)
 *  2.它们可以提供作用域
 * */

//当看到new Function()构造函数运行时，
//函数就是对象意义就非常明确了
//反模式
//仅用于演示目的
var add = new Function('a, b', 'return a + b');
add(1, 2);  //return 3


//跳过函数名称得到(unnameed)表达式，简称函数表达式，
//或称为匿名函数
var add = function (a, b){
    return a + b;
};
// 函数表达式需加分号";"


////////////////////////////
// 函数的命名属性
function foo(){}
var bar = function(){};
var baz = function baz(){};
//console.log(foo.name);  //foo
//console.log(bar.name);  // => ""
//(baz.name);  //baz


////////////////////////////
// 函数的提升
function foo(){
    console.log('global foo');
}
function bar(){
    console.log('global bar');
}
function hoistMe(){
    console.log(typeof foo); // output "function"
    console.log(typeof bar); // output "undefined"

    foo();  // output "local foo"
    // bar();  // output TypeError: bar is not a function

    // 函数声明: 变量'foo'以及其实现者被提升
    function foo(){
        //console.log('local foo');  //=> local foo
    }

    // 表达式: 仅变量'bar'被提升, 函数实现并未被提升
    var bar = function(){
        console.log('local bar');
    };
}
// hoistMe();

//////////////////////////////////
// Callback Pattern 回调模式 

//refactored findNodes() to accept a Callback
var findNodes = function (callback) {
    var i = 1000,
        nodes = [],
        found;

    // check if callback is callble
    if(typeof callback !== "function"){
        callback = false;
    }

    while(i){
        i -= 1;
        // complex logic here...

        if(callback){ // now callback
            // callback(found);
            callback(i);
        }
        nodes.push(found);
    }
    return nodes;
};

// a callback function
var  hide = function(node){
    console.log(node)
    // node.style.display = "none";
};

// findNodes(hide);
// findNodes(function(node){
//     console.log(node)
//     //    node.style.display = "block";        
// });


////////////////////////////////
// Callback and Scope
// 回调与作用域
var myapp = {};
myapp.color = "green";
myapp.paint = function(node){
    node.style.color = this.color;
};

var findNodes3 = function(callback, callback_obj){
    var found;
    found = document.body;
	if(typeof callback === "function"){
        // this.color 没有定义
        // findNodes 是全局函数，对象this引用了全局对象
        // callback(found);

        // 解决方案：传递回调函数所属对象
		callback.call(callback_obj, found);
	}
};
findNodes3(myapp.paint, myapp);

// 另一种选择是： 将其中的方法作为字符串来传递
var findNode4 = function(callback, callback_obj){
	if(typeof callback === "string"){
		callback = callback_obj[callback];
	}
	//...
	if(typeof callback === "function"){
		callback.call(callback_obj, found);
	}
	//...
};


////////////////
// 返回函数 
// 闭包实现 计数器例子
var setup = function(){
	var count = 0;
	return function(){
		return (count++);
	};
};
var next = setup();
next();	// 1
next();	// 2


///////////////////////////
// 自定义函数
// self-defining function
var scareMe = function(){
    //console.log("Boo!");
    scareMe = function(){
        //console.log("Double boo!");
    };
};

//使用自定义函数
//scareMe();  //output Boo!
//scareMe();  //output Double boo!
//这种模式也叫"惰性函数定义"

// 该模式缺点:
// 1.重定义自身时旧函数属性都会丢失.
// 2.如果使用了不同的名称, 将执行旧函数.

//////////////////////////////
//示例 将以第一类对象使用的方式: 

// 1.添加一个新属性
scareMe.property = "properly";

// 2.赋值给另一个不同名称的变量
var prank = scareMe;

//3. 作为一个方法使用
var spooky = {
    boo: scareMe
};

// calling with a new name
prank(); //=> "Boo!"
prank(); //=> "Boo!"
//console.log(prank.property); //properly

//作为一个方法来调用
spooky.boo();   // => Boo!
spooky.boo(); // => Boo!
//console.log(spooky.boo.property); //=> "properly"

// 自定议函数
scareMe();  // Double boo!
scareMe();  // Double boo!
//console.log(scareMe.property); //=> undefined


//////////////////////////////////////
// 即时函数模式 (Immediate Function pattern)
(function(){
    //console.log("watch out!");
}());
// JSLint偏好使用这种

(function(){
 
 })();
// 代替语法


//如果需要定义一个在对象生存期内永远都不会改变的属性, 
//但是在定义它之前需要执一些工作以找出正确的值
//即时函数包装这些工作:
//
var o = {
    message: (function(){
        var who = "me",
            what = "call";
        return what + " " + who;            
    }()),

    getMsg: function(){
        return this.message;        
    }
};
o.getMsg(); //输出 "call me"
//console.log(o.message);  //=> "call me"

//回调函数包含了 
//自调用(self-invoking)以及
//自执行 self-executing

/*****************************************
 * 即时对象初始化 immediate object initialization
 * */
({
    //在这里可以定义设定值
    //又名配置常数
    maxwidth: 600,
    maxheight: 400,

    //还可以定义一些实用的方法
    gimmeMax: function(){
        return this.maxwidth + "x" + this.maxheight;
    },

    // 初始化
    init: function (){
        (this.gimmeMax());
    }
 }).init();

// 有同等效果的 init
({
    init:function(){
    } 
}.init());


//////////////////
// 初始化分支
//之前
var utils_1 = {
    addlistener: function(el, type, fn){
        if(typeof window.addEventListener === 'function'){
            el.addEventListener(type, fn, false);
        }else if(typeof document.attachEvent === 'function'){
            el.attachEvent('on' + type, fn);
        }else{
            el['on' + type] = fn;
        }
    },

    removeListener: function(el, type, fn){}
};
// 这段代码效率低下, 每次调用utils.addListener(),removeListener
// 都会执行相同检查

var utils_2 = {
    addListener: null,
    removeListener: null
};
// 之后 实现
if(typeof window.addEventListener === 'function'){
    utils_2.addListener = function(el, type, fn){
        el.addEventListener(type, fn, false);    
    };
    utils_2.removeListener = function(el, type, fn){
        el.removeEventListener(type, fn, false);    
    };
}else if(typeof document.attachEvent === 'function'){
    utils_2.addListener = function(el, type, fn){
        el.attachEvent('on' + type, fn);
    };
    utils_2.removeListener = function(el, type, fn){
        el.detachEvent('on' + type, fn);
    };
}else{
    utils_2.addListener = function(el, type, fn){
        el['on' + type] = fn;
    };
    utils_2.removeListener = function(el, type, fn){
        el['on' + type] = null;
    };
}


//////////////////
// 备忘模式
var myFunc = function(param){
    if(!myFunc.cache[param]){
        var result = {};
        // ... 开销很大的操作
        myFunc.cache[param] = result;
    }
    return myFunc.cache[param];
};
// 缓存存储
myFunc.cache = {};


//////////////////
// 如果有更复杂的参数 解决方式:
// 将对象序列化为一个 JSON 字符串
var myFunc2 = function(){
    var cachekey = JSON.stringify(Array.prototype.slice.call(arguments)),
        result;
    if(!myFunc2.cache[cachekey]){
        result = {};
        // ... 开销很大的操作
        myFunc2.cache[cachekey] = result;
    }
    return myFunc2.cache[cachekey];
};
// 缓存存储
myFunc2.cache = {};
myFunc2('name')

////////////////////
// 使用arguments.call
// ECMAScript 5 严格模式中不支持 arguments.callee
var myFunc3 = function(param){
    var f = arguments.callee,
        result;
    if(!f.cache[param]){
        result = {};
        // ... 开销很大的操作
        f.cache[param] = result;
    }
    return f.cache[param];
};
// 缓存存储
myFunc3.cache = {};


// 配置对象
function addPerson(args){
    console.log(args.username);
}
var conf = {
    username: "batman",
    first: "Bruce",
    last: "Wayne",
    dob: 'DOb',
    gender: "IT",
    address: "Lishuiqiao"
};
// addPerson(conf);


////////////////////////
// Curry 函数应用

var sayHi = function(who){
    return "Hello" + (who ? ", " + who : "") + "!";
};
sayHi();    // => Hello
sayHi('world'); // => Hello world!
sayHi.apply(null, ["hello"]);   // => "Hello, hello! n  "
//第一参数将要绑定到该函数内部 this 的一个对象.
//如果第一个参数为null, 那么 this 将指向全局对象.

var alien = {
    sayHi: function(who){
        return "Hello" + (who ? ", " + who : " ") + "!";
    }
};
alien.sayHi('world');   //=> "Hello world"
sayHi.apply(alien, ["humans"]);	//=> "Hello humans"
sayHi.call(alien, "humans");	//=> "Hello humans"
// call 节省了一个数组


////////////////
// 将 add 函数改成一个用于处理部份应用的 Curry 化函数
// Curry 来自数学家 Haskell Curry 的名字，
// Curry 是一个转化过程
//
// Curry 化的 add 函数 接受部分参数列表
function add_2 (x, y){
    var oldx = x, oldy = y;
    if(typeof oldy === "undefined"){ //部分
        return function(newy){
            return oldx + newy;
        };
    }
    //完全应用
    return x + y;
}

//测试
//console.log( typeof add_2(5) );  // "function"
( add_2(3)(4) );  //7
var add200 = add_2(2000);
(add200(10));   // => 2010


// curry 化的 add 函数
// 接受部分参数列表
function add_3(x, y) {
    if(typeof y === "undefined"){
        return function(y){
            return x + y;
        };
    }
    return x + y;   // 完全应用
}

// 通用 curry 化函数的示例
function schonfinkelize(fn){
    var slice = Array.prototype.slice,
        stored_args = slice.call(arguments, 1);
	//console.log( Array.prototype.slice.call(arguments, 1));
	

    return function(){
        var new_args = slice.call(arguments),
            args = stored_args.concat(new_args);
		//console.log(new_args);
        return fn.apply(null, args);
    };
}

//普通函数
function add_4(x, y){
    return x + y;
}

//将一个函数 curry 化以获得一个新的函数
var newadd = schonfinkelize(add_4, 5);
(newadd(4)); // => 9

//another way,  直接调用新的函数
schonfinkelize(add, 6)(7);

function add_5(a, b, c, d, e){
    return a + b + c + d + e;
}
//可运行于任意数量的参数
( schonfinkelize(add_5, 1, 2, 3)(5, 5) );
//16

//两步 curry 化
var addOne = schonfinkelize(add_5, 1);
addOne(10, 10, 10, 10); //=> 41
var addSix = schonfinkelize(addOne, 2, 3);
( addSix(5, 5) ); // => 16








