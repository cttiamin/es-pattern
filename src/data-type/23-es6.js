/*
1. Array.from: 对象转为真正的数组
2. Array.of: 将一组值，转换为数组
3. copyWithin
4. find: 找到第一个 findIndex:返回下标
5. fill: 使用给定值 填充一个数组
6. entries: => keys + values
7. includes:
8. 空位
*/

{
  /////////////////////////////
  // 1. Array.from
  // 将两类对象转为真正的数组: 类似数组的对象（array-like object）
  // 和可遍历（iterable）的对象（包括 ES6 新增的数据结构Set和Map）

  let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
  }
  // ES5 写法
  var arr1 = [].slice.call(arrayLike) // ['a', 'b', 'c']
  // ES6 写法
  let arr2 = Array.from(arrayLike) // ['a', 'b', 'c']

  // 解析 DOM 元素
  let p = document.querySelectorAll('p')
  let pArr = Array.from(p)
  pArr.forEach(function(item) {
    console.log(item.textContent)
  })

  // console.log(
  //   Array.from([1, 3, 5], function(item) {
  //     return item * 2
  //   })
  // )
  // 2, 6, 10
}

{
  /////////////////////////////
  // 2. Array.of
  // 将一组值，转换为数组
  Array.of(3, 11, 8) // => [3, 11, 8]
  // console.log(Array(3)) // [, , ,]
  Array.of()
  Array.of(undefined) // [undefined]
  // es5 实现
  function ArrayOf() {
    return [].slice.call(arguments)
  }
}

{
  /////////////////////////////
  // 3. copyWithin
  // @param target(必选) 开始替换数据位置
  // @param start(可选)	 读数据位置
  // @param end (可选)   停止读取数据位置
  // Array.prototype.copyWithin

  ;[1, 2, 3, 4, 5].copyWithin(0, 3)
  // [4, 5, 3, 4, 5]
  ;[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
  // [4, 2, 3, 4, 5]

  // -2相当于3号位，-1 相当于 4 号
  ;[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
  //[4, 2, 3, 4, 5]
}

{
  /////////////////////////////
  // 4. find findIndex
  // 找出第一个符合条件的数组成员
  ;[1, 4, -5, 10].find(n => n < 0)
  // -5
  ;[1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9
  }) // 10

  // 返回索引位置
  ;[1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9
  }) // => 2
}
{
  /////////////////////////////
  // 5. fill
  // 使用给定值，填充一个数组
  ;['a', 'b', 'c'].fill(7)
  // [7, 7, 7]
  ;['a', 'b', 'c'].fill(7, 1, 2)
  // ['a', 7, 'c']
}

{
  /////////////////////////////
  // 6. ertries 遍历数组
  // keys
  // values

  for (let index of ['a', 'b'].keys()) {
    // console.log(index);
  } // 0 1

  for (let elem of ['a', 'b'].values()) {
    // console.log(elem);
  } // 'a' 'b'

  for (let [index, elem] of ['a', 'b'].entries()) {
    // console.log(index, elem);
  }
  // 0 'a' => 1 'b'

  let letter = ['a', 'b', 'c']
  let entries = letter.entries()
  // console.log(entries.next().value); // [0, 'a']
  // console.log(entries.next().value); // [1, 'b']
  // console.log(entries.next().value); // [2, 'c']
}

{
  /////////////////////////////
  // 7. inclues
  // 某个数组是否包含给定的值
  ;[1, 2, 3].includes(2) // => true
  ;[1, 2, NaN].includes(NaN) // => true

  // 第二个参数:起始位置 default=0
  ;[1, 2, 3].includes(3, 3) // false
  // indexOf 误判
  ;[NaN].indexOf(NaN) // -1

  // 对于不支持 替代版本
  const contains = (() =>
    Array.prototype.includes
      ? (arr, value) => arr.includes(value)
      : (arr, value) => arr.some(el => el === value))()
}

/////////////////////////////
// 8.数组的空位
Array(3) // [,,,]

//
0 in [undefined, undefined, undefined] // true
0 in [, , ,] //false

// es5 大多数会忽略空位
;[, 'a'].forEach((x, i) => console.log(i)) //1
;['a', , 'b'].filter(x => true) //['a', 'b']

// every
;[, 'a'].every(x => x === 'a') //true

// some
;[, 'a'].map(x => 1) //[,1]

// join
;[, 'a', undefined, null].join('#')  // #a##

// toString
;[, 'a', undefined, null].toString() // ,a,,


//es6 明确将空位转为 undefined
Array.from(['a', , 'b'])
//['a', undefined, "b"]
