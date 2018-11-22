/***************************************
 * 引用类型　20140321, Friday
 *
 * this: 关键字, 没有作用域的限制, 不会继承
 * arguments: 函数内部属性
 * arguments.callee : 返回正在被执行的对象
 * arguments.callee.caller: 返回调用者，函数体的调用函数体对象
 * length: 返回参数个数
 * prototype : 保存着所有实例方法的真正所在, toString(), valueOf()...
 * apply(@scope, arguments): 在指定作用域调用
 *    apply 与 call 类似,但传入实参的形式和call()有所不同,该实参都放入一个数组当中.
 *    在特定的作用域中调用函数,实际等于设置函数体内的this对象的值
 * call: 与apply()作用机同, 区别仅在于接收参数的方式不同
 * bind: 创建具有与原始函数相同的 主体的绑定函数,
 *      this 对象解析为传入的对象
 * new 运算符原理
 */

 //////////////////////////
// 创建对象 Object 实例的 3 种方式
// 1种
var obj1 = { name: 'o1' } // 默认指向 object
var obj2 = new Object({ name: 'o11' })
// 2种
var Method2 = function() {
  this.name = 'o2'
}
var obj3 = new Method2()
// 3种
var Parent3 = { name: 'o3' }
var obj4 = Object.create(Parent3)
Method2.prototype.say = function() {
  console.log('say hi')
}


////////////////////////////////////
// apply 的参数数组可以是"类数组"也可以是真实数组
// 将对象 o 中名为 m() 的方法替换为另一个方法
// 可以在调用原始的方法之前和之后记录日志消息
function trace(o, m) {
  var original = o[m] // 在闭包中保存原始方法
  o[m] = function() {
    // 定义新的方法
    console.log(new Date(), 'Entering;', m) //输出日志消息
    var result = original.apply(this, arguments) //调用原始函数
    console.log(new Date(), 'Exiting: ', m) //输出日志消息
    return result
  }
}

////////////////////////////////////
// call
// 传入 null 或 undefined 都会被全局对象代替.
window.color = 'red'
var o = {
  color: 'blue'
}
function sayColor() {
  console.log(this.color)
}
//sayColor.call(o);       //blue, 以o对象的方法来调用sayColor
//var objectSayColor = sayColor.bind(o);    //在o作用域 绑定 sayColor方法
//objectSayColor();       // blue


/****************************************
 *  作用域安全的构造函数
 *  当使用 new 调用时, 构造函数内用到的 this 对象会指向新创建的对象实例.
 *  当没有使用 new 操作符来调用该构造函数的情况上,
 *  由于该this对象在运行时绑定的, 所以直接调用 Person(),
 *  this 会映射到全局对象 window 上, 导致错误对象属性的意外增加.
 */
function Person1(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}
//    var person = Person1("Nicholas", 29, "Software Engineer");
//    console.log(window.name);  //属性的偶然覆盖
//    console.log(window.age);
//    console.log(window.job);

/**
*  因为构造函数是作为普通函数调用的, 忽略了 new 操作符, 
*  这个问题是由this对象的晚绑造成的. 在这里this被解析成了window对象,
*  由于window的name属性是用于识别链接目标和框架的,
*  所以这里对该属性的偶然覆盖可能会导致该页面上出现其他错误.
*  解决这个问题就是创建一个作用域安全的构造函数
*  添加了一个检查并确保this对象是Person实例的if语句,
*  使调用 Person 构造函数时无论是否使用 new 操作符都会返回一个Person的新实例
*/ 
function Person2(name, age, job) { //作用域安全的构造函数
  if (this instanceof Person2) {
      this.name = name;
      this.age = age;
      this.job = job;
  } else {
      return new Person2(name, age, job);
  }
}
  var person1 = Person2("Nicholas", 29, "Software Engineer");
//    console.log(window.name);     //""
//    console.log(person1.name);    //"Nicholas"
  var person2 = new Person2("Shelby", 34, "Ergonomist");
//    console.log(person2.name);    //"Shelby"


////////////////////////////////
// new 运算符原理
var new3 = function(func) {
  var o = inherit(func.prototype) // 指向原型
  var k = func.call(o) // 添加属性
  if (typeof k === 'object') {
    return k
  } else {
    return o
  }
}
var Method3 = function() {
  this.name = 'o2'
}
// o6 = new3(Method3)
// o6 instanceof Method3  //true
// o6.__proto__.contructor === Method3


/** 函数柯里化(function currying)
 *  创建已经设置好了一个或多个参数的函数, 
 *  函数柯里化的基本方法和函数绑定是一样的:
 *  使用一个闭包返回一个函数.
 *  区别:
 *  返回的函数还需要设置一些传入的参数.
 */
function add(num1, num2){
  return num1 + num2;
}
function curriedAdd(num2){
  return add(5, num2);
}
(add(2, 3));
(curriedAdd(3));


/** 动态创建步骤: 调用另一个函数并为它传入要柯里化的的函数和必要参数.
*  在arguments对象上调用slice方法, 截出第2个开始的参数
* @param fn
* @returns {Function}
*/
function curry(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  //外部参数,第2个开始参数

  return function () {
      var innerArgs = Array.prototype.slice.call(arguments),
          //内部, 当在次调用传参时
          finalArgs = args.concat(innerArgs);
          //连接两个
      return fn.apply(null, finalArgs);
  };
}

var curriedAdd = curry(add, 5);

(curriedAdd(3));   //8
(curriedAdd(4));   //9
var curriedAdd2 = curry(add, 5, 12);
(curriedAdd2());   //17

