
/*
1. 属性的简洁表示法
2. 属性名表达式
3. 方法的 name 属性
4. Object.is
5. Object.assign
6. 属性的可枚举性
7. 属性的遍历
8. __proto__ 属性，Object.setPrototypeOf()，Object.getPrototypeOf()
9. Object.keys / Object.values / Object.entries
10.对象的扩展运算符
11.Object.getOwnPropertyDescriptors()
12.Null 传导运算符
*/


//////////////////////////////////
// 混入 Mix-ins
// 从多个对象中复制出任意的成员并将这些成员组合成一个新的对象
function mix() {
	var arg, prop, child = {};
	for (arg = 0; arg < arguments.length; arg += 1) {
		for (prop in arguments[arg]) {
			if (arguments[arg].hasOwnProperty(prop)) {
				child[prop] = arguments[arg][prop];
			}
		}
	}
	return child;
}
var cake = mix(
		{eggs: 2, large: true},
		{butter: 1, salted: true},
		{flour: "3 cups"},
		{sugar: "sure!"}
		);
//console.dir(cake);

///////////////////////////////
// 1. 属性的简洁表示法
{
  var foo = 'bar'
  var baz = { foo }
  baz // => {foo: "baz"};
  var baz2 = { foo: foo } // 等同于
  function f(x, y) {
    return { x, y }
  }
  //等同于
  function f2(x, y) {
    return { x: x, y: y }
  }
  f(1, 2) // => object {x: 1, y: 2}

  // module.exports = { getItem, setItem, clear }
  // 等同于
  // module.exports = {
  //   getItem: getItem,
  //   setItem: setItem,
  //   clear: clear
  // }
}

///////////////////////////////
// 2.属性名表达式
{
  // es6 允许字面量定义对象
  let propKey = 'foo'
  let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
  }

  obj.foo = true
  obj['a' + 'bc'] = 123
  obj['abc'] // => 123
  ;(obj[propKey] === obj['foo']) === true
}

///////////////////////////////
// 3.方法的 name 属性
{
  const person = {
    sayName() {
      console.log('hello!')
    }
  }
  person.sayName.name //"sayName"

  const obj4 = {
    get foo() {},
    set foo(x) {}
  }
  // obj4.foo.name;
  // TypeError: Cannot read property 'name' of undefined
  var obj = {}
  const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo')
  // descriptor.get.name;	// "get foo"
  // descriptor.set.name;	// set foo
}

///////////////////////////////
// 4.Object.is
{
  Object.is('foo', 'foo') // => true
  Object.is({}, {}) // => false
  Object.is(+0, -0) // => false
  Object.is(NaN, NaN) // => true

  // es5实现
  Object.defineProperty(Object, 'is', {
    value: function(x, y) {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y
      }
      // 针对NaN 的情况
      return x !== x && y !== y
    },
    configurable: true,
    enumerable: false,
    writeable: true
  })
}

///////////////////////////////
// 5.Object.assign 对象合并
{
  // 后面的属性会覆盖前面的属性
  var target = { a: 1, b: 1 }
  var source1 = { b: 2, c: 2 }
  var source2 = { c: 3 }
  Object.assign(target, source1, source2)
  target // {a: 1, b: 2, c: 3}

  var v1 = 'abc'
  var v2 = true
  var v3 = 10
  var obj8 = Object.assign({}, v1, v2, v3)
  // console.log(obj8)
  // {0: "a", 1: "b", 2: "c"}
}

///////// 常见用途
{
  //（1）为对象添加属性
  class Point {
    constructor(x, y) {
      Object.assign(this, { x, y })
    }
  }

  //（2）为对象添加方法
  Object.assign(SomeClass.prototype, {
    someMethod(arg1, arg2) {},
    anotherMethod() {}
  })
  // 等同于下面的写法
  SomeClass.prototype.someMethod = function(arg1, arg2) {}
  SomeClass.prototype.anotherMethod = function() {}
  function SomeClass() {}

  // 3）克隆对象
  function clone(origin) {
    return Object.assign({}, origin)
  }
  // 保持继承链
  function clone(origin) {
    let orginProto = Object.getPrototypeOf(origin)
    return Object.assign(Object.create(originProto), origin)
  }

  // 4）合并多个对象
  const merge = (target, ...sources) => Object.assign(target, ...sources)
  const merge2 = (...sources) => Object.assign({}, ...sources)

  // （5）为属性指定默认值
  const DEFAULTS = {
    loglevel: 0,
    oupputFormat: 'html'
  }
  function processContent(options) {
    options = Object.assign({}, DEFAULTS, options)
    console.log(options)
  }
}

///////////////////////////////
// 10.对象的扩展运算符
{
  const [a22, ...b22] = [1, 2, 3]
  a22 // 1
  b22 // [2, 3]

  // 1) 解构赋值
  let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
  // console.log(x, y, z)  // 1 2 {a: 3, b: 4}

  // 解构赋值拷贝的是这个值的引用, 而不是这个值的副本。
  let obj22 = { a: { b: 1 } }
  let { ...x1 } = obj22
  obj22.a.b = 2
  x1.a.b // 2

  // 2）扩展运算符
  let z3 = { a: 3, b: 4 }
  let n3 = { ...z3 }
  n3 // { a: 3, b: 4 }

  var a
  // 等同于使用 Object.assign 方法。
  let aClone = { ...a }
  // 等同于
  let aClone2 = Object.assign({}, a)

  // 扩展运算符可以用于合并两个对象。
  // let ab1 = { ...a, ...b };
  // 等同于
  // let ab2 = Object.assign({}, a, b);
}
