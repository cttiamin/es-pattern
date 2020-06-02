/*********************************************************
 *  20140327 16:19, Thursday
 *  inherit
 *  1.原型链
 *  2.借用构造函数
 *  3.组合继承 => 原型链+构造函数
 *  4.组合继承的优化1 => 原型式继承 Object.create
 *  5.组合继承的优化2 => 寄生组合式继承
 * 
 * inherit 兼容的 Object.create
 * ES6 继承
 */

 /////////////////////////////////
// 返回了一个继承自原型对象 p 的属性的新对象
// 如果不存在 Object.create 则退化使用其他方法
var inherit = function (p) {
  // 如果p对象不存在
  if (p == null) {
    throw TypeError()
  }
  // ECMAScript5 实现
  if (Object.create) {
    return Object.create(p)
  }
  // 原型继承的方法实现 == Object.create
  var t = typeof p
  if (t !== 'object' && t !== 'function') {
    throw TypeError()
  }
  function f() {}
  f.prototype = p
  return new f()
}


var inherit2 = (function(){
	var F = function (){};
	return function(C, P){
		F.prototype = P.prototype;
		C.prototype = new F();
		C.uber = P.prototype;
		C.prototype.constructor = C;
	};
}());

///////////////////
// 1.原型链
function Parent1() {
  this.colors = ['red', 'blue', 'green']
} // parent / child
function Child1() {}
Child1.prototype = new Parent1() // 继承了 SuperType
var instance1 = new Child1()
instance1.colors.push('black')
instance1.colors // "red,blue,green,blank"
var instance2 = new Child1()
instance2.colors // "red,blue,green,blank"
instance1.colors === instance2.colors // true
// 原型链的问题
// 第1.引用类型被多个实例共享
// 第2:创建子类实例时, 不能向超类型构造函数传递参数

// es6:
class Parent1_1 {
  constructor() {
    this.colors = ['red', 'blue', 'green']
    this.name = name
  }
}
// => Child1.prototype = new Parent1()
class Child1_1 extends Parent1_1 {
  constructor(name) {
    super(name)
    this.name = name
  }
}

/********************************************
 * 2. 构造函数 (constructor stealing)
 * 解决：
 * 引用类型值的问题
 * 可以在子构造函数传递参数.
 **/
function Parent2(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
// Parent2.prototype.sayColor = function() {
//   console.log(this.colors)
// }
function Child2() {
  Parent2.call(this, 'Tom')
}
var instance3 = new Child2()
var instance4 = new Child2()
instance3.colors.push('black')
instance3.colors // => "red,blue,green,blank"
instance4.colors // => "red,blue,green"
// 缺点：
// 1.父类原型不会被继承

/*************************************
 * 3.组合继承 (combination inheritance)
 * 原型链 + 构造函数
 */
function Parent3(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
// Parent3.prototype.sayName = function() {
//   console.log(this.name)
// }
function Child3(name, age) {
  Parent3.call(this, name) // exec 2
  // this.age = age
}
Child3.prototype = new Parent3() // exec 1
var instance5 = new Child3('Nicholas', 29)
var instance6 = new Child3('Greg', 27)
instance5.colors.push('black')
instance5.colors === instance6.colors // flase
// 缺点： 父类方法执行 2次

//////////////////////////////
// 4.组合继承的优化1
function Parent4() {}
function Child4() {
  Parent4.call(this)
}
Child4.prototype = Parent4.prototype
// construct 错误的指向了 Parent4
var sub1_type7 = new Child4()
// sub1_type7.constructor === Parent4
// 缺点：Child 实例化的 construct 还是 Parent

///////////////////////////////
// 5.寄生组合式继承 => 组合继承的优化2
function Parent5(name) {
  this.name = name
}
function Child5(name, age) {
  Parent5.call(this, name) // 继承父类实例
}
// Child5.prototype = Object.create(Parent5)
// Child5.prototype = inherit(Parent5.prototype) // Object.create
Child5.prototype.constructor = Child5; // 构造指向子类

// 封装在继承函数中
inherit2(Child5, Parent5)
var instanceChild5 = new Child5('Nicholas', 29)

//////////////////////
// es6
// 继承
{
  class Parent {
    constructor(name = 'parentName') {
      this.name = name
    }
  }
  class Child extends Parent {}
  // console.log('继承', new Child());
} 

// 继承传递参数
{
  class Parent {
    constructor(name = 'parentName') {
      this.name = name
    }
  }

  class Child extends Parent {
    constructor(name = 'childName') {
      super(name)
      this.type = 'childName'
    }
    // toString() {
    //   return this.color + ' ' + super.toString() 
    //   // 等同于 parent.toString
    // }
  }
  console.log(new Child('hello'))
}


//////////////////////////
// 通过复制属性实现继承
// 深复制 deep copy
// 创建对象真实的副本
function extendDeep(parent, child) {
	var i,
	toStr = Object.prototype.toString,
	astr = "[object Array]";
	child = child || {};

	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
			if (typeof parent[i] === "object") {
				child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
				extendDeep(parent[i], child[i]);
			} else {
				// 浅复制 shallow copy 
				child[i] = parent[i];
			}
		}
	}
	return child;
}
var dad_3 = {
	counts: [1, 2, 3],
	reads: {paper: true}
};
var kid_9 = extendDeep(dad_3);
//console.log( kid_9.counts.push(4) );
//console.log( kid_9.counts.toString() ); // 1,2,3,4
//console.log( dad_3.counts.toString() );	// 1,2,3
//console.log( dad_3.reads === kid_9.reads); // false
//console.log( kid_9.reads.paper = false );
//console.log( kid_9.reads.web = true );
//console.log( dad_3.reads.paper ); // true