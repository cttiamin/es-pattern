// 闭包
//   在函数内定义了其它函数就定义了闭包;
//   函数对象可以通过作用域链相互关联起来,
//   函数体内部的变量都可以保存在函数作用域内,
//   这种特性在计算机科学文献中称为"闭包"

//   执行环境(execution context)
//   特殊的内部属性(Scope)
//   活动对象(activation object)
//   作用域链(scope chain)


/**
 *  闭包可以捕捉到局部变量, 并一直保存下去
 *  看起来像这些变量绑定到在其中定义它们的 外部函数
 */
var scope2 = 'global scope'
// 全局变量
function checkscope2() {
  var scope2 = 'local scope'
  // 局部变量
  function f() {
    // 在作用域中返回这个值
    return scope2
  }
  return f
}
// checkscope2()();     // => local scope

// 嵌套函数都共享一个作用域链
function counter1() {
  var n = 0
  return {
    count: function() {
      return n++
    },
    reset: function() {
      n = 0
    }
  }
}
var c1 = counter1(),
  d1 = counter1()
// c1.count(); // => 0
// d1.count(); // => 0:
// c1.reset(); // reset() 和 count() 方法共享状态
// c1.count(); // => 0: 因为我们重置 c
// d1.count(); // => 1: 而没有重置 d

///////////////////////////////
// 所不同的是：
// 这里私有状态的实现是利用了闭包, 而不是利用普通的对象属性来实现
function counter02(n) {
  return {
    get count() {
      return n++
    },
    set count(m) {
      if (m >= n) n = m
      else throw Error('count can only be set to larger value')
    }
  }
}
var c2 = counter02(1000)
// c.count;    // => 1000
// c.count;    // => 1001
// c.count = 2000;
// c.count;        // => 2000
//c.count = 2000; // => Error!

//8-4: 利用闭包实现的私有属性存取器方法
function addPrivateProperty(o, name, predicate) {
  // private
  var value

  o['get' + name] = function() {
    return value
  }

  // (首先检查值是否合法,不合法抛)
  o['set' + name] = function(v) {
    if (predicate && !predicate(v))
      //函数存在 && 是字符串
      throw Error('set' + name + ': invalid value ' + v)
    else value = v
  }
}
var o = {}
// 添加属性存取器方法 getName()和 setName()
addPrivateProperty(o, 'Name', function(x) {
  // Ensure that only string values are allowed (确保是字符)
  return typeof x == 'string'
})
o.setName('Frank') // Set the property value
o.getName() // Get the property value
//o.setName(0);         
// Try to set a value of the wrong type( Error )



//////////////////////////////////
// 嵌套的函数不会 将作用域内私有成员复制一份
function constFunc3() {
  var result = []
  for (var i = 0; i < 10; i++) {
    result[i] = (function(num) {
      // num: 函数的参数是按值传递的
      return function() {
        // 返回一个 num 的闭包函数
        return num
      }
    })(i)
  }
  return result
}
var funcs3 = constFunc3()
// funcs3[6]() // => 6
// console.log(funcs3[1]())

//////////////////////////////////
// 在闭包中this的问题：
// 函数在被调用时，活动对象会自动取得变量 this, arguments
var name1 = 'The window1'
var object1 = {
  name1: 'My Object',
  getNameFunc: function() {
    // 匿名函数挂在了, 全局下
    return function() {
      return this.name1
    }
  }
}
object1.getNameFunc()() // The window1

// 解决 :
// that = this;
var name2 = 'The window'
var object2 = {
  name2: 'My Object',
  getNameFunc: function() {
    var that = this
    // 函数返回后, that也仍然引用着object
    return function() {
      return that.name2
    }
  }
}
object2.getNameFunc()() //My Object

//在几种特殊情况下,值会改变
var name3 = 'The window'
var object3 = {
  name3: 'My Object',
  getName: function() {
    return this.name3
  }
}
var testObj3 = object3.getName
testObj3() // The window


// 内存泄漏
// element 的内存永远不会回收
function assignHandler2() {
  var element = document.getElementById('someElement')
  var id = element.id
  element.onclick = function() {
    alert(id)
  }
  element = null // 释放 element
}

//////////////////////////////////
// 模仿块级作用域
// 用匿名函数来模仿块级作用域块
// 可减少闭包占用内存的问题, 没有指向函数的引用

//创建私有作用域,存放临变量
function outputNumbers03(count) {
  ;(function() {
    for (var i = 0; i < count; i++) {
      console.log(i)
    }
  })()
  //    console.log(i); //error
}
//outputNumbers03(9)

//The Good Part
var fade = function(node) {
  var level = 1
  var step = function() {
    var hex = level.toString(16)
    console.log(hex)
    node.style.backgroundColor = '#FFFF' + hex + hex
    if (level < 15) {
      level += 1
      setTimeout(step, 100)
    }
  }
  setTimeout(step, 100)
}
// fade(document.body);

//////////////////////////////////
