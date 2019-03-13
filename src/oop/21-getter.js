// 1.数据属性(修改属性默认特性)
//   Object.defineProperty:
//   Object.defineProperties: 定义多个属性
//   Object.getOwnPropertyDescriptor: 读取属性的信息
//
//   属性包含一个名字和4个特性:
//   configurable:  default:true,是否可delete/修改/
//   enumerable:    default:true,是否可通过for-in循环
//   writable:      default:true,是否可“修改”属性的值
//   value:         deault:undefine
// 2.访问属性
//   get:
//   set:
//   __defineGetter__() : IE9+ / 欲废弃?
//   __defineSetter__() :

// writable 写入
var person1 = {}
Object.defineProperty(person1, 'name', {
  writable: false, // 不可修改特性
  value: 'Nicholas' // 读取时为 "Nicholas"
})
person1.name = 'Greg'
person1.name // => Nicholas

// configurable
// 一旦设置 configurable:false, 便不能改 true.
var person2 = {}
Object.defineProperty(person2, 'name', {
  configurable: false,
  value: 'Nicholas'
})
delete person2.name // 不能删除
person2.name // Nicholas

// get set
var book1 = {
  _year: 2004,
  edition: 1
}
Object.defineProperty(book1, 'year', {
  get: function() {
    // console.log('get => ', this._year);
    return this._year
  },
  set: function(newValue) {
    // console.log('set => ' + newValue);
    if (newValue > 2004) {
      this._year = newValue
      this.edition += newValue - 2004
    }
  }
})
book1.year = 2005
// (book1.edition);

/**
 * 重写前面的例子,另一种方法
 * __defineGetter__() : IE9+
 * __defineSetter__() : IE9+
 */
var book2 = {
  _year: 2004,
  edition: 1
}
book2.__defineGetter__('year', function() {
  console.log('__defineGetter__ =>', this._year)
  return this._year
})
book2.__defineSetter__('year', function(newValue) {
  // console.log('__defineSetter____ => ', newValue)
  if (newValue > 2004) {
    this._year = newValue
    this.edition += newValue - 2004
  }
})
book2.year = 2005
book2.edition // 2

// defineProperties: 定义多个属性
var book3 = {
  edition: 1
}
Object.defineProperties(book3, {
  _year: {
    value: 2004,
    wriable: true,
    enumerable: true,
    configuration: true
  },
  year: {
    get: function() {
      return this._year
    },

    set: function(newValue) {
      if (newValue > 2004) {
        this._year = newValue
        this.edition += newValue - 2004
      }
    },
    enumerable: true,
    configuration: true
  }
})
// book3.year = 2005;
book3.edition

// getOwnPropertyDescriptor: 获得对象特定属性描述符
var descript1 = Object.getOwnPropertyDescriptor(book3, '_year') //数据属性
descript1.value, descript1.configurable //2004, false
var descript2 = Object.getOwnPropertyDescriptor(book3, 'year') //访问属性
descript2.value, descript2.configurable //undefined, false
Object.getOwnPropertyDescriptor({ x: 1 }, 'x')
//{value,writable,enumerable, configurable}

//////////////////////////
// es6 属性的可枚举性
{
  let obj11 = { foo: 123 }
  Object.getOwnPropertyDescriptor(obj11, 'foo')
  //  {
  //    value: 123,
  //    writable: true,
  //    enumerable: true,
  //    configurable: true
  //  }

  Object.getOwnPropertyDescriptor(Object.prototype, 'toString')
    .enumerable
  // false

  Object.getOwnPropertyDescriptor([], 'length').enumerable
  // false

  Object.getOwnPropertyDescriptor(
    class {
      foo() {}
    }.prototype,
    'foo'
  ).enumerable
  // false
}

//////////////////////////
// getter 和 setter
var p1 = {
  // x and y are 普通的可读写的数据属性
  x: 1.0,
  y: 1.0,
  //r 是可读写的存取器属性, 它有 getter 和 setter.
  get r() {
    console.log('get =>')
    return Math.sqrt(this.x * this.x + this.y * this.y)
  },
  set r(newvalue) {
    console.log('set =>', newvalue)
    var oldvalue = Math.sqrt(this.x * this.x + this.y * this.y)
    var ratio = newvalue / oldvalue
    this.x *= ratio
    this.y *= ratio
  },
  get theta() {
    return Math.atan2(this.y, this.x)
  }
}
var q1 = Object.create(p1)
q1.x = 1
q1.y = 1
// (q1.r);       // => 1.4142135...
// q1.r = 2;
// (q1.theta);   // => 0.7853...
