// 闭包
//   在函数内定义了其它函数就定义了闭包;
//   函数对象可以通过作用域链相互关联起来,
//   函数体内部的变量都可以保存在函数作用域内,
//   这种特性在计算机科学文献中称为"闭包"

//   执行环境(execution context)
//   特殊的内部属性(Scope)
//   活动对象(activation object)
//   作用域链(scope chain)


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

//////////////////////////////////
// 保存遍历的变量
function constFunc3() {
  var result = []
  // for (var i = 0; i < 10; i++) {
  //   result[i] = (function(num) {
  //     return function() {
  //       return num
  //     }
  //   })(i)
  // }
  // es6 解决
  for (let i = 0; i < 10; i++) {
    result[i] = i;
  }
  return result
}
var funcs3 = constFunc3();
// funcs3[6]() // => 6
console.log(funcs3[3]);

//////////////////////////////////
// 解决 this 作用域问题：
var object2 = {
  name2: 'My Object',
  getNameFunc: function() {
    var that = this
    // 函数返回后, that 也仍然引用着 object
    return function() {
      return that.name2
    }
  }
}
// object2.getNameFunc()() // My Object

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

// The Good Part
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
