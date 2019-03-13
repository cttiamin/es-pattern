'use static'
////////////////////////////////
// 原生 sort
// 冒泡 插入 快速 选择 希尔
// 二分查找
// 统计次数


var arr = [4, 8, 5, 9, 7, 6, 3, 2, 1, 0];
var arr_number = [5,4,3,2,1,4,3,2,1,7,4];
var arr_obj = [
  { name: 'Zachary', age: 28 }, 
  { name: 'Nicholas', age: 29 }
];
var arr_mix = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42]

[31,2,3,4,7,6,4,5,2,9,15,3,6,21].sort(function (v1, v2) {
  return v1 - v2
})

/**
 * 比较排序,传入两个数返回正数则改变两个数的位置,
 * 假设第一个参数应该在前, 比较函数应该返回一个小于0的数值, 返之
 * 假设第一个参数应该在后, 函数应该返回一个大于0的数值,
 * 假设两个值相等, 函数应该返回 0
 * @param value1
 * @param value2
 * @returns {number} : -1 / 0 / 1
 */
function compare(value1, value2) {
  if (value1 < value2) {
    return -1
  } else if (value1 > value2) {
    return 1
  } else {
    return 0
  }
}
// 第2种方法
function compare2(value1, value2) {
  return value1 - value2
}
// arr_number.sort(compare2); // [0, 1, 1, 5, 10]
// console.log(arr_number);

////////////////////////
// 字符排序
var arr_str = ['ant', 'Bug', 'Aut', 'cat', 'Dog']
// 区分大小写的排序: ['Bug', 'Dog', 'ant', 'cat']
arr_str.sort()
arr_str.sort(function(s, t) {
  // 不区分大小写的排序
  var a = s.toLowerCase() //小写
  var b = t.toLowerCase()
  if (a < b) return -1
  if (a > b) return 1
  return 0
})
// console.log(arr_str);
// => ['ant', 'Bug', 'cat', 'Dog']



////////////////////////
// 字符串排序
// 跟据某个对象属性对数组进行排序, 传递给 sort
function createComparisonFunction(propertyName) {
  return function(object1, object2) {
    var value1 = object1[propertyName]
    var value2 = object2[propertyName]
    if (value1 < value2) {
      return -1
    } else if (value1 > value2) {
      return 1
    } else {
      return 0
    }
    // return value2 - value1
  }
}
arr_obj.sort(createComparisonFunction('name'))
arr_obj[0].name;   // Nicholas
arr_obj.sort(createComparisonFunction('age'))
arr_obj[0].name;   // Zachary


////////////////////////
// Good Part: Sunday, 01/04/2015
arr_mix.sort(function(a, b) {
  if (a === b) {
    return 0
  }
  if (typeof a === typeof b) {
    return a < b ? -1 : 1
  }
  return typeof a < typeof b ? -1 : 1
})
// console.log(arr_mix);
// => [4, 8, 15, 16, 23, 42, "a", "aa", "bb"]

var by = function(name) {
  return function(o, p) {
    var a, b
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = o[name]
      b = p[name]
      if (a === b) {
        return 0
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1
      }
    } else {
      throw {
        name: 'Error',
        message: 'Expected an object when sorting by' + name
      }
    }
  }
}
var arr_obj2 = [
  { first: 'Joe', last: 'Besser', age: 24},
  { first: 'Moe', last: 'Howard', age: 33},
  { first: 'Joe', last: 'DeRita', age: 19},
  { first: 'Shemp', last: 'Howard', age: 36},
  { first: 'Larry', last: 'Fine', age: 29},
  { first: 'Curly', last: 'Howard', age: 33}
]
// arr_obj2.sort(by('first'));
// arr_obj2.sort(by('first')).sort(by('last')); // last failed!

// Function by takes a member name string and
// optional minor comparison function and returns
// a comparison function that can be used to sort an
// array of objects that contain that member. The
// minor comparision functiom is used to break ties
// when the o[name] and p[name] are equal.
var by2 = function(name, minor) {
  return function(o, p) {
    var a, b
    if (o && p && typeof o === 'object' && typeof p === 'object') {
      a = o[name]
      b = p[name]
      if (a === b) {
        return typeof minor === 'function' ? minor(o, p) : o
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1
      }
    } else {
      // return typeof o < typeof p ? -1 : 1
      throw {
        name: 'Error',
        message: 'Expected an object when sorting by ' + name
      }
    }
  }
}
// arr_obj2.sort(by2('last'));
// arr_obj2.sort(by2('last', by('age')));
// console.log(arr_obj2);

//////////////////////////////////////
// 冒泡 插入 快速 选择 希尔
var Sort = {
  // 冒泡排序
  bubble: function(arr, fn) {
    console.time('bubble')
    var len = arr.length,
      start_time = new Date();
    let count = true;
    // for (var i = 0; i < len; i++) {
    while (len--) {
      // for (var j = 0; j < len - 1 - i; j++) {
      for (var j = 0; j < len; j++) {
        // if (arr[j] > arr[j + 1]) {
        if (fn(arr[j], arr[j + 1]) > 0) {
          // arr[j] <=> arr[j + 1]
          // arr[j] = [arr[j + 1], (arr[j + 1] = arr[j])][0]
          [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
          count = false;

          // es6 
          // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

          // console.log('i:', i,
          //   'j:', j,
          //   'arr[j]', arr[j],
          //   'arr:', arr,
          // );
        }
      }
      // 已经排好序
      if (count == true) { 
        break 
      }
    }
    new Date() - start_time
    console.timeEnd('bubble')
    return arr
  },

  // 插入排序
  Insert: function() {
    for (var i = 1; i < arr.length; i++) {
      for (var j = 0; j < i; j++) {
        if (arr[i] < arr[j]) {
          // console.log('i:', i, 'arr[i]', arr[i],
          //   'j:', j, 'arr[j]', arr[j],
          //   'arr:', arr,
          // );
          arr[i] = [arr[j], (arr[j] = arr[i])][0]
        }
      }
      setTimeout(
        (function(m) {
          return function() {
            console.log(m)
          }
        })(arr.join(',')),
        i * 500
      )
    }
    return arr
  },

  // 快速排序
  quick: function(arr) {
    if (arr.length <= 1) {
      return arr
    }
    var pivotIndex = Math.floor(arr.length / 2),
      left = [],
      right = [],
      pivot = arr.splice(pivotIndex, 1)[0]
    // console.log(pivotIndex, pivot)

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    return this.quick(left).concat([pivot], this.quick(right))
    // return quickSort(left).concat([pivot], quickSort(right));
  },

  // 选择排序: 数据规模越小越好
  // https://segmentfault.com/a/1190000009366805
  selection: function(arr) {
    console.time('selection')
    var len = arr.length
    var minIndex, temp
    for (var i = 0; i < len - 1; i++) {
      minIndex = i
      for (var j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j
        }
      }
      // arr[minIndex] = [arr[i], arr[i] = arr[minIndex]][0]
      temp = arr[i]
      arr[i] = arr[minIndex]
      arr[minIndex] = temp
    }
    console.timeEnd('selection')
    // console.log(arr);
    return arr
  },

  // 希尔排序
  // https://segmentfault.com/a/1190000009461832
  shell: function(arr) {
    console.time('shell')
    var len = arr.length,
      temp,
      gap = 1
    while (gap < len / 3) {
      gap = gap * 3 + 1
    }
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
      for (var i = gap; i < len; i++) {
        temp = arr[i]
        for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
          arr[j + gap] = arr[j]
        }
        arr[j + gap] = temp
      }
    }
    console.timeEnd('shell')
    console.log(arr)
    return arr
  }
}
// console.log(arr)
// var arr_order = Sort.bubble(arr, (a, b)=> a-b);
// console.log(arr)
// Sort.Insert();
// console.time('quick');
// console.log(Sort.quick(arr))
// console.timeEnd('quick');
// Sort.selection(arr);
// Sort.shell(arr);
// console.log(arr)


////////////////////////
// 二分查找法
function binarySearch(arr, data) {
  var max = arr.length - 1,
    min = 0;
  while (min < max) {
    var mid = Math.floor((max+min)/2);  // 中间
    if (arr[mid] === data) {
      return mid
    }
    if (arr[mid] < data) {
      min = mid + 1;
    } else {
      max = mid - 1;
    } 
  }
  return -1;
}

// Sort.bubble(arr_number, (a, b) => a-b);
// console.log(arr_number)
// console.log(binarySearch(arr_number, 1))

///  统计出现次数
function count(arr,data){
  var count = 0;
  var position = binarySearch(arr,data);
  if(position>-1){
      count++;
      for(var i=position-1;i>0;i--){
          if(arr[i]==data){
              count++;
          }else{
              break;
          }
      }
      for(var i=position+1;i<arr.length;i++){
          if(arr[i]==data){
              count++;
          }else{
              break;
          }
      }
  }
  return count;
}
// console.log(count(arr_number, 4))


////////////////////////
// es6

// function bubble(arr) {
// }

