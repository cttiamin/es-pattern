////////////////////////////////
// 栈
// 队列
// isArray
// unshift
// splice
// reduce
// 数组去重
// 数组拍平
// 遍历对象
// 不用 new 数组封装
// 统计字符出现次数

var Stack = function () {
  this.items = [];
}
Stack.prototype = {
  constructor: Stack,
  push: function(element) {
    this.items.push(element);
  },
  pop: function() {
    return this.items.pop();
  },
  peek: function() {
    return this.items[this.items.length - 1];
  },
  isEmpty: function() {
    return this.items.length == 0;
  },
  clear: function() {
    this.items = [];
  },
  size: function() {
    return this.items.length;
  },
  print: function() {
    console.log(this.items.toString());
  }
};

function Queue() {
  this.items = [];
}
Queue.prototype = {
  constructor: Queue,
  enqueue: function(elements) {
    this.items.push(elements);
  },
  dequeue: function() {
    return this.items.shift();
  },
  front: function() {
    return this.items[0];
  },
  isEmpty: function() {
    return this.items.length == 0;
  },
  size: function() {
    return this.items.length;
  },
  clear: function() {
    this.items = [];
  },
  print: function() {
    console.log(this.items.toString());
  }
};
// var queue = new Queue();

//////////////////////////
// 原生添加方法
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

// unshift 实现
Array.method('unshift2', function() {
  this.splice.apply(
    this,
    [0, 0].concat(Array.prototype.slice.apply(arguments))
  );
  return this.length;
});

///////////////////////////////
// splice 实现 ：Good Part
Array.method('splice', function(start, deleteCount) {
  var max = Math.max,
    min = Math.min,
    delta,
    element,
    insertCount = max(arguments.length - 2, 0),
    k = 0,
    len = this.length,
    new_len,
    result = [],
    shift_count;

  start = start || 0;
  if (start < 0) {
    start += len;
  }

  start = max(min(start, len), 0);
  deleteCount = max(
    min(typeof deleteCount === 'number' ? deleteCount : len, len - start),
    0
  );

  delta = insertCount - deleteCount;
  new_len = len + delta;
  while (k < deleteCount) {
    element = this[start + k];
    if (element !== undefined) {
      result[k] = element;
    }
    k += 1;
  }
  shift_count = len - start - deleteCount;
  if (delta < 0) {
    k = start + insertCount;
    while (shift_count) {
      this[k] = this[k - delta];
      k += 1;
      shift_count -= 1;
    }
    this.length = new_len;
  } else if (delta > 0) {
    k = 1;
    while (shift_count) {
      this[new_len - k] = this[len - k];
      k += 1;
      shift_count -= 1;
    }
  }
  for (k = 0; k < insertCount; k += 1) {
    this[start + k] = arguments[k + 2];
  }
  return result;
});

Array.method('reduce1', function(f, value) {
  var i;
  for (i = 0; i < this.length; i += 1) {
    // 上一项值
    value = f(this[i], value);
    // console.log(this[i], value);
  }
  return value;
});
// Create an array of numbers.
var data = [4, 8, 15, 16, 23, 42];
var add = function(a, b) {
  return a + b;
};
var mult = function(a, b) {
  return a * b;
};
// add function.
var reduce1Sum = data.reduce1(add, 0);
// sum is 108
var reduce1Product = data.reduce1(mult, 1);
// product is 7418880
data.total = function() {
  return this.reduce1(add, 0);
};
var total = data.total();
// total is 108

/////////////////////////////
// 数组去重-for
var distinct = function(arr_origin) {
  var arr = arr_origin,
    result = [],
    i,
    j,
    len = arr.length;
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      console.log(i, arr[i], j, arr[j])
      if (arr[i] === arr[j]) {
        j = ++i;
        // j 重置指针, i 指向下个索引, 如果之后没有该值才添加
      }
    }
    console.log('add', i, arr[i]);
    result.push(arr[i]);
  }
  return result;
};
var arra = [1, 2, 3, 4, 4, 1, 2, 2, 1, 1, 1];
console.log(distinct(arra))

/////////////////////////////
// 数组去重-indexof
function unique_indexof(arr) {
  const res = []
  arr.forEach(item => {
    if (res.indexOf(item) < 0) {
      res.push(item)
    }
  })
  return res
}
// console.log(unique_indexof([1, 2, 3, 4, 4, 1, 2, 2, 1, 1, 1]))

/////////////////////////////
// 数组去重-Set
function unique_set(arr) {
  const set = new Set(arr)
  return [...set] // 转数组
}
// console.log(unique_set([30, 10, 20, 30, 40, 10]))

/////////////////////////////
// 数组去重-hasOwnProperty
function unique_has(array) {
  let hashmap = {}
  let unique = []
  for (let i = 0; i < array.length; i++) {
    if(!hashmap.hasOwnProperty([array[i]])) {
      hashmap[array[i]] = 1;
      unique.push(array[i]);
    }
  }
  console.log(unique)
}
// unique_has([30, 10, 20, 30, 40, 10])

let obj = {}
var reductSort = [30, 10, 20, 30, 40, 10].reduce((cur,item) => {
  obj[item] ? "" : obj[item] = true && cur.push(item);
  return cur;
},[]) 
// log(person);

/////////////////////////////
// 数组拍平 使用递归
var arr = [1, 2, 3, [3, 3, 3, [5, 4, 5, 6, 6, 7, 8]], [333, 4444, [551, 552]]];
var arr_new = [],
  concatArr = function concatArrFunc(arr) {
    arr.forEach(function(item) {
      if (Array.isArray(item)) {
        arr_new.concat(concatArrFunc(item));
      } else {
        arr_new.push(item);
      }
    });
    return arr_new;
  };
// var arr_concat_res = concatArr(arr);
// console.log(arr, arr_concat_res)

function flat(arr) {
  // 验证 arr 中，还有没有深层数组 [1, 2, [3, 4]]
  const isDeep = arr.some(item => item instanceof Array)
  if (!isDeep) {
    return arr // 已经是 flatern [1, 2, 3, 4]
  }
  const res = Array.prototype.concat.apply([], arr)
  return flat(res) // 递归
}

/////////////////////////////////
// 遍历对象
var obj1 = {
  a: 'a',
  b: '',
  c: 'c',
  d: 'd'
};
// 获得对象属性名组成的数组
var keys = Object.keys(obj1);
var values1 = [];
for (var i = 0, len = keys.length; i < len; i++) {
  var key = keys[i];
  // 跳过 key = null / undefined
  if (!obj1[key]) continue;
  // 跳过 undefined
  if (obj1[key] === undefined) continue;
  // 跳过不存在的元素
  if (!(key in obj1)) continue;
  values1[i] = obj1[key];
  // console.log(values1[i]);
}

/////////////////////////////////
// 不能直接修改 Array 的构造函数, 可使用这个模式
function SpecialArray() {
  var values = new Array(); // 创建数组
  // apply : 劫持另外一个对象的方法，继承另外一个对象的属性
  // values : 用 values 去执行 values.push(Array)
  // 添加值, 在 values 作用域 push(argumens)
  values.push.apply(values, arguments);

  values.toPipeString = function() {
    return this.join('|'); // 数组转字符串
  };
  return values;
}
var colors = SpecialArray('red', 'blue', 'green'); // new
// colors.toPipeString();     // "red|blue|green

/////////////////////////////////
// 统计字符出现次数
function getMost(str) {
  var result = {};
  for(let i in str) {
    if(str[i] in result) {
      result[str[i]]++;
    } else {
      // result = Object.assign(result, { [str[i]]: 1});
      result[str[i]] = 1
    }
  }
  return result;
}
const str = 'jshdjsihh';
// console.log(getMost(str));        
// {x: 2, y: 3, z: 3}

/////////////////////////////////
// 统计字符出现次数-reduce
// var max = {idx : 0, data: 0}
const obj_reduce = str.split('').reduce((pre,item) => {
  pre[item] ? pre[item] ++ : pre[item] = 1
  // if (max.data < pre[item]) {
  //   max.idx = item;
  //   max.data = pre[item];
  // }
  return pre
},{})
// console.log(obj_reduce)
// {j: 2, s: 2, h: 3, d: 1, i: 1}
