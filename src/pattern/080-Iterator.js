//////////////////////////////
// 迭代器模式
// 场景：
// jquery each
// ES6 Iterator 为何存在
// 	有序集合的数据类型有很多
//	Array Map Set String TypedArray Nodelist
//	需要有一个统一的遍历接口来遍历所有数据类型 
//	(object 不是有集合，可以用 Map 代替)
//	

var agg = (function() {
  var index = 0,
    data = [1, 2, 3, 4, 5],
    length = data.length
  return {
    next: function() {
      var element
      if (!this.hasNext()) {
        return null
      }
      element = data[index++]
      // index = index + 1;
      return element
    },
    hasNext: function() {
      return index < length
    },
    rewind: function() {
      index = 0
    },
    current: function() {
      return data[index]
    }
  }
})()

// while (agg.hasNext()) {
//   console.log(agg.next())
// }

// agg.rewind();
// console.log(agg.current());

// console.log(agg.next());
// console.log(agg.hasNext());

// console.log(agg.next());
// console.log(agg.hasNext());

// console.log(agg.next());
// console.log(agg.hasNext());

// console.log(agg.next());
// console.log(agg.hasNext());

// console.log(agg.next());
// console.log(agg.hasNext());

// console.log(agg.next());
// console.log(agg.hasNext());


///////////////////////////////////////
// es6 实现
class Iterator {
  constructor(container) {
    this.list = container.list
    this.index = 0
  }
  next() {
    if (this.hasNext()) {
      return this.list[this.index++]
    }
  }
  hasNext() {
    if (this.index >= this.list.length) {
      return false
    }
    return true
  }
}

class Container {
  constructor(list) {
    this.list = list
  }
  // 生成迭代器
  getIterator() {
    return new Iterator(this)
  }
}

let arr = [1, 2, 3, 4, 5, 6]
// let container = new Container(arr)
// let iterator = container.getIterator()
// while (iterator.hasNext()) {
// 	console.log(iterator.next())
// }


///////////////////////////////////////
// ES6 Symbol.iterator
// Array.prototype[Symbol.iterator]
// 只要 list_array[Symbol.iterator] 有返回就可用
// 
// 'Symbol.iterator' 并不是人人都知道
// 也不是每个都封装了 each 方法
// 因此 ES6 重新封装 Symbol.iterator => for...of
function each(data) {
	// let iterator = data[Symbol.iterator]()
	// let item = {done: false}
	// while(!item.done) {
	// 	item = iterator.next()
	// 	if(!item.done) {
	// 		console.log(item.value)
	// 	}
	// }

	// for of 
	for (let item of data) {
		console.log(data)
	}
}


let nodeList = document.getElementsByTagName('p')
let m = new Map()
m.set('a', 100)
m.set('b', 200)

each(arr)
each(nodeList)
each(m)
