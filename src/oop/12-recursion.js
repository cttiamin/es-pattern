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
// factorial3[1] = 1;
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
// console.time('fac4')
// factorial4(5) // => 120
// console.timeEnd('fac4')


//////////////////
// 深拷贝,使用递归方式
function cloneDeep(o){
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
// var cloneObj = {
//   name: 'name1',
//   age: 22,
//   arr: [1, 2, 3],
//   obj: {
//     o1: 'o1',
//     o2: 'o2'
//   }
// }
// console.log(clone(cloneObj), '111')


//////////////////
/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 */
function deepClone2(obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
      // obj 是 null ，或者不是对象和数组，直接返回
      return obj
  }

  // 初始化返回结果
  let result
  if (obj instanceof Array) {
      result = []
  } else {
      result = {}
  }

  for (let key in obj) {
      // 保证 key 不是原型的属性
      if (obj.hasOwnProperty(key)) {
          // 递归调用！！！
          result[key] = deepClone(obj[key])
      }
  }

  // 返回结果
  return result
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




