//////////////////////////////////////////////////
// 20140326, Wednesday
//  constructor 原型的指向所在函数的指针
//  isPrototypeOf: 实例是否为原型关系
//  __proto__: 获取实例中原型(老版本不兼容)
//  setPrototypeOf:
//  getPrototypeOf: 获取实例的原型
//  hasOwnProperty: 属性是否在实例中
//  in : 原型 + 实例
//  Object.keys(Person.prototype) : 获取obj的属性(可枚举)
//      es6: values / entries
//  Object.getOwnPropertyNames(obj.prototype) :
//    获取 obj 的属性, 可枚举+不可枚举

/**
 * 由所有实例指向一个原型的属性和方法
 * @constructor 指定向 Person1
 */
function Person1() {}
Person1.prototype.name = 'Nicholas'
Person1.prototype.sayName = function() {
  console.log(this.name)
}

var person1 = new Person1()
// 确定对象之间是否是原型关系, 它们有一个指针指向 Person.prototype
Person1.prototype.isPrototypeOf(person1) // true

Object.getPrototypeOf(person1) === Person1.prototype
Object.getPrototypeOf(person1) === person1.__proto__
Person1.__proto__ === Function.prototype
Person1.prototype === person1.__proto__
Person1.prototype.constructor === Person1
Function.prototype.__proto__ === Object.prototype

////////////////
// es6: setPrototypeOf,
{
  Object.defineProperty(Object.prototype, '__proto__', {
    get() {
      let _thisObj = Object(this)
      return Object.getPrototypeOf(_thisObj)
    },
    set(proto) {
      if (this === undefined || this === null) {
        throw new TypeError()
      }
      if (!isObject(this)) {
        return undefined
      }
      if (!isObject(proto)) {
        return undefined
      }
      let status = Reflect.setPrototypeOf(this, proto)
      if (!status) {
        throw new TypeError()
      }
    }
  })

  // 读取一个原型对象
  function Rectangle() {}
  var rec = new Rectangle()
  Object.getPrototypeOf(rec) === Rectangle.prototype
  // true
  Object.setPrototypeOf(rec, Object.prototype)
  Object.getPrototypeOf(rec) === Rectangle.prototype
  //false
}

/**
 * in: 能否访问该属性 (原型 + 实例)
 * hasOwnProperty: 属性是否在实例中
 */
var person3 = new Person1()
person3.hasOwnProperty('name') //false
'name' in person3 //true
person3.name = 'Greg'
person3.hasOwnProperty('name') //true
delete person3.name
person3.hasOwnProperty('name') //flase

/**
 * 用 hasOwnProPerty() 和 in 来判断属性是否在原型中
 * @param 实例对象
 * @param 属性
 * @returns {boolean}
 */
function hasPrototypeProperty(object, name) {
  return !object.hasOwnProperty(name) && name in object
}
var person6 = new Person1()
hasPrototypeProperty(person6, 'name') // true
person6.name = 'Greg'
hasPrototypeProperty(person6, 'name') // false

/**
 * IE8- Bug
 * 不可枚举的Bug: hasownProperty(), propertyIsEnumerable(),
 * toLocalString(), toString(), valueOf()
 * ECMAScript5: constructor, prototype,
 */

///////////////////////////
// Object.keys: 返回对象可枚举的字符串数组
// 
{
  var keys7 = Object.keys(Person1.prototype)
  keys7 // ["name", "sayName"]
  var person7 = new Person1()
  person7.name = 'Rob'
  person7.age = 31
  var person7keys = Object.keys(person7)
  person7keys // ["name", "age"] =>(实例)
  // 得到所有实例属性 无论是否可枚举
  var keys6 = Object.getOwnPropertyNames(Person1.prototype)
  keys6 // "constructor, name, age, job, sayName

  ///////////
  // es6: values entries
  let { keys, values, entries } = Object
  let obj = { a: 1, b: 2, c: 3 }
  for (let key of keys(obj)) {
    // console.log(key); // 'a', 'b', 'c'
  }
  for (let value of values(obj)) {
    // console.log(value); // 1, 2, 3
  }
  for (let [key, value] of entries(obj)) {
    // console.log([key, value]);
    // ['a', 1], ['b', 2], ['c', 3]
  }

  // entries 方法将对象转为真正的 Map 结构。
  var obj21 = { foo: 'bar', baz: 42 }
  var map = new Map(Object.entries(obj21))
  map // Map { foo: "bar", baz: 42 }

  // 自己实现 Object.entries 方法，非常简单
  // Generator函数的版本
  function* entries2(obj) {
    for (let key of Object.keys(obj)) {
      yield [key, obj[key]]
    }
  }
  // 非 Generator 函数的版本
  function entries3(obj) {
    let arr = []
    for (let key of Object.keys(obj)) {
      arr.push([key, obj[key]])
    }
    return arr
  }
}

/**
 * constructor = Person
 * 这种做法会导致它的[Enumerable]特性被设置为 true; 默认原生为false
 */
function Person3() {}
Person3.prototype = {
  constructor: Person3, // this 指向 person3
  name: 'Nicholas',
  job: 'Software Engineer',
  sayName: function() {
    console.log(this.name)
  }
}
// 重设构造函数.只适用于ECMAScript
Object.defineProperty(Person3.prototype, 'constructor', {
  enumerable: false,
  value: Person3
})

///////////////////
// 原型对象的问题
{
  // person1 与 person2 指向同一个数组
  function Person5() {}
  Person5.prototype = {
    constructor: Person5,
    name: 'Nicholas',
    age: 29,
    job: 'Software Engineer',
    friends: ['Shelby', 'Court'], // 引用类型
    sayName: function() {
      console.log(this.name)
    }
  }
  var person8 = new Person5()
  var person9 = new Person5()
  person8.friends === person9.friends //true

  /******************************
   * 6.2.4 组合使用 构造模式+原型模式
   * ECMAScript使用最广泛，认同度最高的一种创建自定义类型方法，
   * 用来定义引用类型的一种默认模式
   */
  function Person6(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.friends = ['shelby', 'Court']
  }
  Person6.prototype = {
    constructor: Person6,
    sayName: function() {
      console.log(this.name)
    }
  }
  var person10 = new Person6('Nicholas', 29, 'Software Engineer')
  var person11 = new Person6('Greg', 27, 'Doctor')
  person10.friends === person11.friends //flase
  person10.sayName === person11.sayName //true

  /******************************
   * 6.2.5 动态原型模式
   * sayName 方法若不在实体中, 则加入 prototype中,
   */
  function Person7(name, age, job) {
    this.name = name
    this.age = age
    this.job = job

    if (typeof this.sayName != 'function') {
      Person7.prototype.sayName = function() {
        console.log(this.name)
      }
    }
  }
  var friend3 = new Person7('Nicholas', 29, 'Software Engineer')
  typeof friend3.sayName // => function
  //friend.sayName(); // => Nicholas
}
