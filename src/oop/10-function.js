// 2018-12-23
// this: 没有作用域的限制, 不会继承
// arguments: 函数内部属性
// arguments.callee: 返回正在被执行的对象(废)
// arguments.callee.caller: 返回函数体的调用函数体对象(废)
// length: 参数个数
// prototype: 所有实例方法原型
// apply(@scope, arguments): 指定作用域调用
//    与 call 类似,传实参形式和call有所不同, 该实参放入数组
// call: apply作用机同, 接收参数的方式不同
// bind: 主体的绑定函数, this 对象解析为传入的对象
// new 运算符原理
// JavaScript 函数有两个特点
//  1.函数是一类对象(first-class object)
//  2.它们可以提供作用域

// 跳过函数名称得到(unnameed)表达式，简称函数表达式，
var add = function(a, b) {
  return a + b;
};
// 函数表达式需加分号";"

////////////////////////////////
// new 运算符原理
var new3 = function(func) {
  // var o = inherit(func.prototype) // 指向原型
  var o = Object.create(func.prototype); // 指向原型
  var k = func.call(o); // 添加属性
  if (typeof k === 'object') {
    return k;
  } else {
    return o;
  }
};
var Method3 = function() {
  this.name = 'o2';
};
var o6 = new3(Method3);
o6 instanceof Method3; //true
o6.__proto__.contructor === Method3;

// 变量提升
var myname = 'global';
function func2() {
  console.log(myname); // undefined
  var myname = 'local';
}

// 函数的提升
function foo() {}
function bar() {}
function hoistMe() {
  console.log(
    typeof foo, // output "function"
    typeof bar  // output "undefined"
  ); 
  foo(); // output "local foo"
  function foo() {}
  // 表达式: 仅变量'bar'被提升, 函数实现并未被提升
  var bar = function() {};
}
// hoistMe();

// Forget new
function Waff() {
  return {
    tastes: 'yummy'
  };
}
var first = new Waff(),
  second = Waff();
// console.log(first.tastes, second.taste);
// 自调用构造函数
function Waffle2() {
  if (!(this instanceof Waffle2)) {
    return new Waffle2();
  }
  this.tastes = 'yummy';
}
Waffle2.prototype.wantAnother = true;
var first_2 = new Waffle2(),
  second_2 = Waffle2();
//console.log(first_2.tastes, first_2.tastes);

////////////////////////////////
// Callback and Scope 回调与作用域
var myapp = {};
myapp.color = "green";
myapp.paint = function(node){
    node.style.color = this.color;
};
var findNodes3 = function(callback, callback_obj){
  var found = document.body;
	if(typeof callback === "function"){
    // this.color 没有定义
    // findNodes 是全局函数，对象this引用了全局对象
    // 解决方案：传递回调函数所属对象
		callback.call(callback_obj, found);
    }
    // 另一种选择是： 将其中的方法作为字符串来传递
    if(typeof callback === "string"){
		callback = callback_obj[callback];
	}
};
findNodes3(myapp.paint, myapp);

///////////////////////////
// self-defining function 自定义函数
var scareMe = function(){
  console.log("Boo!");
  scareMe = function(){
  console.log("Double boo!");
  };
};
//scareMe();  //output Boo!
//scareMe();  //output Double boo!
// 这种模式也叫"惰性函数定义", 缺点:
// 1.重定义自身时旧函数属性都会丢失.
// 2.如果使用了不同的名称, 将执行旧函数.

//////////////////////////////
// 将以第一类对象使用的方式: 
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


// 即时对象初始化 immediate object initialization
({
    // 配置常数
    maxwidth: 600,
    maxheight: 400,
    //定义一些实用的方法
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
// 备忘模式 => 缓存值
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

// 如果有更复杂的参数解决方式:
// 将对象序列化为一个 JSON 字符串
var myFunc2 = function() {
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