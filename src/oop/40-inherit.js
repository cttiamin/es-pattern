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
function SuperType4(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
// SuperType4.prototype.sayColor = function() {
//   console.log(this.colors)
// }
function SubType4() {
  SuperType4.call(this, 'Tom')
}
var instance3 = new SubType4()
var instance4 = new SubType4()
instance3.colors.push('black')
instance3.colors // => "red,blue,green,blank"
instance4.colors // => "red,blue,green"
// 缺点：
// 1.父类原型不会被继承

/*************************************
 * 3.组合继承 (combination inheritance)
 * 原型链 + 构造函数
 */
function SuperType6(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
// SuperType6.prototype.sayName = function() {
//   console.log(this.name)
// }
function SubType6(name, age) {
  SuperType6.call(this, name) // exec 2
  // this.age = age
}
SubType6.prototype = new SuperType6() // exec 1
var instance5 = new SubType6('Nicholas', 29)
var instance6 = new SubType6('Greg', 27)
instance5.colors.push('black')
instance5.colors === instance6.colors // flase
// 缺点： 父类方法执行 2次

//////////////////////////////
// 4.组合继承的优化1
function SuperType7() {
  this.name = 'parent4'
  this.play = [1, 2, 3]
}
function SubType7() {
  SuperType7.call(this)
  this.type = 'child4'
}
SubType7.prototype = SuperType7.prototype
// construct 错误的指向了 SuperType7
var sub1_type7 = new SubType7()
var sub2_type7 = new SubType7()
// sub1_type7.constructor === SuperType7
// 缺点：Child 实例化的 construct 还是 Parent

// var person1 = {
//     name: "Nicholas",
//     friends: ["shelby", "Court", "Van"]
// };
// var obj1_per1 = inherit(person1);
// var obj2_per1 = inherit(person1);
// obj2_per1.friends.push("Barbie");
// obj1_per1.friends === obj2_per1.friends

///////////////////////////////
// 5.寄生组合式继承 => 组合继承的优化2
function SuperType8(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
// SuperType8.prototype.sayName = function() {
//   console.log(this.name)
// }

function SubType8(name, age) {
  SuperType8.call(this, name) // 继承父类实例
  this.age = age
}
// 子类原型指向父类
SubType8.prototype = inherit(SuperType8.prototype)
// Object.create(SuperType8.prototype);

// 构造指向子类
SubType8.prototype.constructor = SubType8
// SubType8.prototype.sayAge = function() {
//   console.log(this.age)
// }
var instance_type8 = new SubType8('Nicholas', 29)
instance_type8.name //=> "Nicholas"


/////////////////////////////////
// 返回了一个继承自原型对象 p 的属性的新对象
// 如果不存在 Object.create 则退化使用其他方法
function inherit(p) {
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
