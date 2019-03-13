'use strict';
// 递归 

/////////////////////////////////
// Fibonacci 斐波那契
var fibonacci2 = (function() {
  var memo = [0, 1]
  var fib = function(n) {
    var result = memo[n]
    if (typeof result !== 'number') {
      // console.log(n + ': ' + fib(n -2));
      result = fib(n - 1) + fib(n - 2)
      memo[n] = result
    }
    return result
  }
  return fib
})()
// console.log(fibonacci2(10)) // => 55

// 阶乘 第1种：
function factorial1(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factorial1(num - 1)
  }
}
// console.log(factorial1(5));
// 弊端：
// 当函数名发生改变时， 则不能运行

//////////////////////
// 第2种：用 arguments.callee
// another way (去除与函数名耦合)
var factorial2 = function(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * arguments.callee(num - 1)
  }
}
// console.log(factorial2(5));
// 弊端：
// 严格模式下不能访问 argument.callee


//////////////////////
// 第2种 缓存
// 使用了自身的属性（将自身当做数组来对待）来缓存上一次的计算结果
function factorial3(n) {
  // isFinite: 有限的正整数
  // Math.round: 四舍五入为最接近的整数
  if (isFinite(n) && n > 0 && n == Math.round(n)) {
    if (!(n in factorial3)) {
      // 如果没有属性 n 缓存结果
      factorial3[n] = n * factorial3(n - 1) 
      // 计算结果并缓存
    }
    //返回缓存结果
    return factorial3[n];
  } else {
    throw NaN //如果输入有误
  }
}
// 1 作为 factorial3 的属性保存着值 1
factorial3[1] = 1;
// console.log(factorial3(5)); // 120
// console.log(factorial3[2]);


//////////////////////
// 第4种 The Good Part
// 函数式编程: 函数的最后一步调用 另一个函数
// 尾递归是一种递归的写法，可以避免不断的将函数压栈最终导致堆栈溢出。
// 通过设置一个累加参数，并且每一次都将当前的值累加上去，然后递归调用。
var factorial4 = function factorial(n, a) {
  // console.log(n, a)
  a = a || 1
  // if (i === 1) return a
  if (n < 2) {
    return a
  }
  return factorial(n - 1, n * a)
}
console.time('fac4')
factorial4(5) // => 120
console.timeEnd('fac4')

// 柯里化 currying
function currying(fn, n) {
  return function(m) {
    return fn.call(this, m, n)
  }
}
const factorial5 = currying(factorial4, 1)
console.time('fac5')
factorial5(5) // 120
console.timeEnd('fac5')

//////////////////
// 深拷贝,使用递归方式
function clone(o){
  var temp = {};
  for(var key in o){
      if(typeof o[key] == 'object') {
          temp[key] = clone(o[key]);
      } else {
          temp[key] = o[key];
      }
  }
  return temp;
}

// 使用递归实现 getElementsByClassName
function byClass(node, className, arr){
  //得到传入节点的所有子节点
  var lists = node.childNodes;
  for(var i = 0; i< lists.length; i++){
      //判断是否有相同className元素
      if(arr[i].className == className){
          arr.push(arr[i]);
      }
      //判断子节点是否还有子节点
      if(arr[i].childNodes.length > 0){
          byClass(arr[i], className, arr);
      }
  }
}




