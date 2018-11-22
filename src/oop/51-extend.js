//////////////////////////
// 20140721 17:28
// type
// classof
// Range
// getObjectType
// quacks
// generic
// extend
// Set, ArraySet, NonNullSet, AbstractEnumerableSet...
// enumeration => Card
// Complex 复数

// 9.5.2 constructor 属性
function typeAndValue(x) {
  if (x == null) return "";    //Null 和 undefined 没有构造函数
  switch (x.constructor) {
    case Number: return "Number: " + x;     //处理原始类型
    case String: return "String: '" + x + "'";
    case Date: return "Date: " + x;         //处理内置类型
    case RegExp: return "Regexp: " + x;
    case Complex: return "Complex: " + x;   //处理自定义类型
  }
}

// 9.5.3 构造函数的名称
// 例 9-4: 可以判断值的类型的 type() 函数
function type(o) {
  var t, c, n;  // type, class, name

  // Special case for the null value:
  if (o === null) return "null";

  // Another special case: NaN is the only value not equal to itself:
  if (o !== o) return "nan";

  // Use typeof for any value other than "object".
  // This identifies any primitive value and also functions.
  if ((t = typeof o) !== "object") return t;

  // 返回对象类名,除 object
  // 这两种方式可以识别大多数的类型和函数
  if ((c = classof(o)) !== "Object") return c;

  // Return the object's constructor name, if it has one
  if (o.constructor && typeof o.constructor === "function" &&
    (n = o.constructor.getName())) {
    return n;
  }

  // We can't determine a more specific type, so return "Object"
  return "Object";
}
// Return the class of an object. 
function classof(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}
// Return the name of a function (may be "") or null for nonfunctions
Function.prototype.getName = function () {
  if ("name" in this) return this.name;
  return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
};
// (type(null));         // => "Null"
// (type(1));            // => "Number"
// (type(""));           // => "String"
// (type(false));        // => "Boolean"
// (type({}));           // => "Object"
// console.log(type([]));           // => "Array"
// (type(/./));          // => "Regexp"
// (type(new Date()));   //  => "Date"
// (type(window));       //  => "Window"
// function f() {           //定义一个自定义构造函数
// }
// (type(new f()));      // => "Object"
var f2 = function f2() { };
type(f2);   // => Function



/////////////////////////////////
// 实现一个能表示值范围对象
// 这个工厂方法返回一个新的"范围对象"
function range01(from, to) {
  //使用Inherit()函数来创建对象,这个对象继承自在下面定义的原型对象
  //原型对象作为函数的一个属性存储,并定义所有"范围对象"所共享的方法
  var r = inherit(range01.methods);
  // 存储新的"范围对象"的起始位置和结束位置
  r.from = from;
  r.to = to;
  return r;
}
// 原型对象定义方法,这些方法为每个范围对象所继承
range01.methods = {
  // 如果x在范围内, 则返回 true, 否则返回false
  // 这个方法可以比较数字范围, 也可以比较字符串和日期范围
  includes: function (x) {
    return this.from <= x && x <= this.to;
  },
  // 对于范围内的每个整数都调用一次f
  // 这个方法只可用做数字范围
  foreach: function (f) {
    for (var x = Math.ceil(this.from); x <= this.to; x++)
      if (f === null) console.log(x);
      else f(x);
  },
  toString: function () { // 返回表这个范围的字符串
    return "(" + this.from + "..." + this.to + ")";
  }
};
var r1 = range01(1, 3);  // Create a range object
r1.includes(2);          // => true: 2 is in the range
// r1.foreach(null);        // 1 2 3;
r1;    //=> Object, Prints (1...3)


/*****************************
 * 9.2 类和构造函数
 * 使用构造方法, 原型继承的方式实现
 * range2.js
 * 将定例9-1和例2-2中代码做一个仔细的对比,可以发现两种定义类的技术的差别,
 * 着先,注意当工厂函数range()转化为构造函数时被重命名Range(),这里遵循了
 * 一个常见的编程约定:从某种意义讲定义构造函数既是定义类,并且类名着字母
 * 要大写
 * 9-2: 使用构造函数来定义"范围类"
 * 这是一个构造函数,用以始化新创建的"范围对象"
 */
function Range2(from, to) {
  // Store the start and end points (state) of this new range object.
  // These are noninherited properties that are unique to this object.
  this.from = from;
  this.to = to;
}
// 原型没有 constructor 属性问题.
Range2.propertype = {
  constructor: Range2,
  test: function (x) { } // undefined ?
}
// 这样就自动创建 Range2.prototype.constructor属性
// 扩展定义的 Range2.prototype 对象 而不重写.
Range2.prototype.includes = function (x) {
  return this.form <= x && x <= this.to;
};
Range2.prototype.foreach = function (f) {
  for (var x = Math.ceil(this.form); x <= this.to; x++) {
    f(x);
  }
};
Range2.prototype.toString = function () {
  return "(" + this.form + "..." + this.to + ")";
};
/* 给 Range2 添加一个类似的方法,用以比较它们的下边界:
  * */
Range2.prototype.compareTo = function (that) {
  return this.from = that.from;
};
/**
 * Range修正后的 compareTo 方法, 它的比较逻辑和 equals(保持一致)
 * 但当传入不可比较的值时仍然会报错
 */
Range2.prototype.compareTo = function (that) {
  if (!(that instanceof Range2))
    throw new Error("Can't compare a Range2 with " + that);
  var diff = this.from = that.from;         //比较下边界
  if (diff == 0) diff = this.to - that.to;    //如果相等,比较上边界
  return diff;
};
// Here are example uses of a range object
var r2 = new Range2(1, 3);// Create a range object,构造用new()
// r2.includes(2);        // => true: 2 is in the range
// r2.foreach(null);   // Prints 1 2 3
// r2;   // Prints (1...3)

/**
 * 9.6.6 私有状态
 *  将对象的某个状态封装或隐藏在对象内, 只有通过对象的方法才能访问这些状态.
 *  例9-10:对 Range 类的读取端点方法的简单封装
 */
function Range3(from, to) {
  // 不要将端点保存为对象的属性,相反
  // 定义存取函数来返回端点的值
  // 这些值都保存在闭包中
  this.from = function () {
    return from;
  };
  this.to = function () {
    return to;
  };
}
// 原型上的方法无法直接操作端点
// 它们必须调用存取器方法
Range3.prototype = {
  constructor: Range3,
  includes: function (x) {
    return this.from() <= x && x <= this.to();
  },
  foreach: function (f) {
    for (var x = Math.ceil(this.from()), max = this.to(); x <= max; x++)
      //f.call(this, x);
      f(x);

  },
  toString: function () {
    return "(" + this.from() + "..." + this.to() + ")";
  }
};
// 一个不可修改的范围
var r3 = new Range3(1, 5);
// 通过方法替换来修改它
r3.from = function () {
  return 1;
}
r3.to = function () {
  return 6
}
//console.log(r3.toString()); //=> (1...6)
//console.log(r3.foreach(function(x){
//  console.log(x); // => 1 -6
// }));

/**
 * 9.8.2 定义不可变的类
 * 使用Object.definedProperties()来为类创建原型对象,
 * 并将(原型对象) 实例文法设置为不可读.
 * 实现的构造函数也可以用做工厂函数,这样不论调用函数之前是否带
 * 有new关键字,都可以正确
 *
* 将修改这个已定义属性的特性的操作定义为一个工具函数.
* 例9-19: 属性描述符工具函数
* 将o的指定名字(或所有)的属性设置为不可写的和不可配置的
*/
function freezeProps(o) {
  var props = (arguments.length == 1)  // If 1 arg 只有一个参数
    ? Object.getOwnPropertyNames(o) // use all props 使用所有的属性
    // else named props 指定名字的属性
    : Array.prototype.splice.call(arguments, 1);
  // Make each one read-only and permanent(不可变)
  props.forEach(function (n) {
    // Ignore nonconfigurable properties 忽略不可配置的属性
    if (!Object.getOwnPropertyDescriptor(o, n).configurable) return;
    Object.defineProperty(o, n, { writable: false, configurable: false });
  });
  return o;  // So we can keep using it 所以我们可以继续使用它
}
// 将o的指定名字(或所有)的属性设置为不可枚举的和可配置的
function hideProps(o) {
  var props = (arguments.length == 1)  // If 1 arg 如果只有一个参数
    ? Object.getOwnPropertyNames(o) // use all props 使用所有的属性
    //  else named props 指定名字的属性
    : Array.prototype.splice.call(arguments, 1);
  // Hide each one from the for/in loop 设置不可枚举
  props.forEach(function (n) {
    // Ignore nonconfigurable properties 忽略不可配置的属性
    if (!Object.getOwnPropertyDescriptor(o, n).configurable) return;
    Object.defineProperty(o, n, { enumerable: false });
  });
  return o;
}
/**
 * 利用ECMAScript 5 的特性来实现一个不可变的类,而且不用动态地修改这个类,
 * 例9-20: 
 * Constructor for an immutable Range class 不可变构造函数
 */
function Range4(from, to) {
  this.from = from;
  this.to = to;
  freezeProps(this);// Make the properties immutable 将属性设置为不可变的
}
// Define prototype with nonenumerable properties 使用不可枚举的属性定义原型
Range4.prototype = hideProps({
  constructor: Range4,
  includes: function (x) {
    return this.from <= x && x <= this.to;
  },
  foreach: function (f) {
    for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
  },
  toString: function () {
    return "(" + this.from + "..." + this.to + ")";
  }
});


/**
 * 9.8.3 封装对象状态
 * 构造函数中变量和参数可以用做它创建的对象的私有状态.该方法在ECMAScript3
 * 的一个缺点是:访问这些私有状态的存取器方法是可以替换的.
 * ECMAScript中可以通过定义属性getter和setter方法将状态变量更健壮地封装起
 * 来.
 */
// 这个版本的Range类是可变的,但将端点变量进行了封装
// 变量保持不变
function Range5(from, to) {
  // Verify that the invariant holds when we're created
  if (from > to) throw new Error("Range: from must be <= to");

  // Define the accessor methods that maintain the invariant
  function getFrom() {
    return from;
  }

  function getTo() {
    return to;
  }

  function setFrom(f) {  // Don't allow from to be set > to
    if (f <= to) from = f;
    else throw new Error("Range5: from must be <= to");
  }

  function setTo(t) {    // Don't allow to to be set < from
    if (t >= from) to = t;
    else throw new Error("Range5: to must be >= from");
  }

  // Create enumerable, nonconfigurable properties that use the accessors
  // 将使用取值器的属性设置为可枚举的, 不可配置的
  Object.defineProperties(this, {
    from: {
      get: getFrom, set: setFrom, enumerable: true
      , configurable: false
    },
    to: { get: getTo, set: setTo, enumerable: true, configurable: false }
  });
}

// The prototype object is unchanged from previous examples.
// The instance methods read from and to as if they were ordinary properties.
Range5.prototype = hideProps({
  constructor: Range5,
  includes: function (x) {
    return this.from <= x && x <= this.to;
  },
  foreach: function (f) {
    for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
  },
  toString: function () {
    return "(" + this.from + "..." + this.to + ")";
  }
});



/**
 * 例 8-3: 特定场景下返回带补丁的extend()版本
 * 定义一个扩展函数,用来将第二个以及后续参数复制至第1个参数对象
 * 这里我们处理了IE bug; 在多数IE版本中
 * 不会枚举对象o的可枚举属性,也就是说,将不会正确处理诸如toString的性
 * 除非我们显式检测它
 */
// Assign the return value of this function 这个函数返回值绘extend
var extend = (function () {
  // 在修复之前 ,前先检查这是否存在bug
  for (var p in { toString: null }) {//In ie8 ago toString is not enumerable
    // 如果代码执行到这里,那么for/in 循环会正确工作并返回
    // 一个简单版本的extend()函数
    return function extend(o) {
      // 0是o,遍历对象
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        //复制属性方法
        for (var prop in source) o[prop] = source[prop];
      }
      return o;
    };
  }
  // 如果代码执行到这里,说明for/in循环不会枚举测试对象的toString属性
  // 因此返回另一个版本的extend()函数, 这个函数显示测试Object.prototype
  // 中的不可枚举属性
  return function patched_extend(o) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      // Copy all the enumerable properties
      // 复制所有的可枚举属性
      for (var prop in source) o[prop] = source[prop];

      // And now check the special-case properties
      // 现在检查特殊属性
      for (var j = 0; j < protoprops.length; j++) {
        prop = protoprops[j];
        if (source.hasOwnProperty(prop)) o[prop] = source[prop];
      }
    }
    return o;
  };

  // 这个列表列出了需要检查的特殊属性
  var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty",
    "isPrototypeOf", "propertyIsEnumerable", "toLocaleString"];
}());
// constructor：添加扩展类 
// method: 添加方式
// statics: 添加静态方法
function defineClass(constructor, methods, statics) {
  if (methods) extend(constructor, methods, statics);
  if (statics) extend(constructor, statics);
  return constructor;
}
//这是Range类的另一个实现
var SimpleRange = defineClass(function (f, t) {
  this.f = f;
  this.t = t;
}, {
    includes: function (x) {
      return this.f <= x && x <= this.t
    },
    toString: function () {
      return this.f + "..." + this.t;
    }
  }, {
    upto: function (t) {
      return new SimpleRange(0, t);
    }
  });

/**
 * 9.6.5 方法借用 (borrowing)
 *  把一个类的方法用到其他的类中的做法也称做“多重继承(multiple inheritance)”
 *  例 9-9 : 方法借用的 泛型(generic)实现
 */
var generic = {
  // Returns a string that includes the name of the constructor function
  // if available and the names and values of all noninherited, nonfunction
  // properties.
  //返回一个字符串,这个字符串包含构造函数的名字(如果构造函数包含名字)
  //以及所有非继承来的,非函数属性的名字和值
  toString: function () {
    var s = '[';
    // If the object has a constructor and the constructor has a name,
    // 如果这个对象包含构造函数,且构造函数包含名字
    // use that class name as part of the returned string.  Note that
    // 这个名字会作为返回字符串的一部分
    // the name property of functions is nonstandard and not supported
    // everywhere.
    // 需要注意的是,函数的名字属性是非标准的,并不是在所有的环境中都可用
    if (this.constructor && this.constructor.name)
      s += this.constructor.name + ": ";

    // Now enumerate all noninherited, nonfunction properties
    var n = 0;
    for (var name in this) {
      if (!this.hasOwnProperty(name)) continue;   // skip inherited props
      var value = this[name];
      if (typeof value === "function") continue;  // skip methods
      if (n++) s += ", ";
      s += name + '=' + value;
    }
    return s + ']';
  },

  // Tests for equality by comparing the constructors and instance properties
  // 通过比较this和that的构造函数和实例属性来判断它们是否相等
  // of this and that.  Only works for classes whose instance properties are
  // 这种方法只适合于那些实例属性是原始值的情况,原始值可以通过"==="来比较
  // primitive values that can be compared with ===.
  // As a special case, ignore the special property added by the Set class.
  // 这里还处理一种特殊情况,就是忽略由Set类添加的特殊属性
  equals: function (that) {
    if (that == null) return false;
    if (this.constructor !== that.constructor) return false;
    for (var name in this) {
      // skip special prop.跳过特殊属性
      if (name === "|**objectid**|") continue;
      if (!this.hasOwnProperty(name)) continue; // skip inherited
      if (this[name] !== that[name]) return false; // compare values
    }
    return true;  // If all properties matched, objects are equal.
  }
};

/**
 * 9.5.4 鸭式辩型
 * 例9-5: 利用鸭式辩型实现的函数
 * 如果 o 实现了除第一个参数之外的参数所表示的方法, 则返回 true
 */
function quacks(o /*, ... */) {
  for (var i = 1; i < arguments.length; i++) {  // for each argument after o
    var arg = arguments[i];
    switch (typeof arg) { // If arg is a:
      case 'string':       // string: check for a method with that name
        if (typeof o[arg] !== "function") return false;
        continue;
      case 'function':     // function: use the prototype object instead
        // If the argument is a function, we use its prototype object
        arg = arg.prototype;
      // fall through to the next case
      case 'object':       // object: check for matching methods
        for (var m in arg) { // For each property of the object
          if (typeof arg[m] !== "function") continue; //skip non-methods
          if (typeof o[m] !== "function") return false;
        }
    }
  }
  // If we're still here, then o implements everything
  return true;
}

/**
 * 判定o是否是一个类数组对象
 * 字符串和函数有length属性, 但是它们
 * 可以用typeof检测将其排除, 在客户端JavaScript中, DOM文本节点
 * 也有length属性,需要用额外判断o.nodeType != 3 将其排除
 * @param o
 * @returns {boolean}
 */
function isArrayLike(o) {
  if (o &&                     // o 非null, undefined等
    typeof o === "object" &&   // o 是对象
    isFinite(o.length) &&   //o.length 是有限数值
    o.length >= 0 &&      //o.length为非负值
    o.length === Math.floor(o.length) && // o.length 是整数
    o.length < 4294967296)  // o.length < 2^32
    return true;        //o是类数组对象
  else
    return false;       // 否则它不是
}
////////////////////////////
// 9.6.1 Set.js: 值的任意集合
function Set() {        // This is the constructor
  this.values = {};     // The properties of this object hold the set
  this.n = 0;           // How many values are in the set
  // All arguments are values to add
  // this.add(arguments);
  this.add.apply(this, arguments);

  // 如果传入一个类数组的对象,将这个元素添加至集合中
  // 否则,将所有的参数都添加至集合中
  if (arguments.length == 1 && isArrayLike(arguments[0])) {
    this.add.apply(this, arguments[0]);
  }
  else if (arguments.length > 0) {
    this.add.apply(this, arguments);
  }
}
//  这个工厂方法用来通过数组初始化Set对象:
Set.fromArray = function (a) {
  var s = new Set();
  s.add.apply(s, a);
  return s;
}
// Add each of the arguments to the set.
Set.prototype.add = function () {
  for (var i = 0; i < arguments.length; i++) {//For each argument
    var val = arguments[i];                 //The value to add to the set
    var str = Set._v2s(val);                //Transform it to a string
    //console.log(str);
    //console.log(val +"="+ str);
    if (!this.values.hasOwnProperty(str)) { //If not already in the set
      this.values[str] = val;             //Map string to value
      this.n++;                           //Increase set size
    }
  }
  return this;                              //Support chained method calls
};
// Remove each of the arguments from the set.
Set.prototype.remove = function () {
  for (var i = 0; i < arguments.length; i++) {  // For each argument
    var str = Set._v2s(arguments[i]);        // Map to a string
    if (this.values.hasOwnProperty(str)) {   // If it is in the set
      delete this.values[str];             // Delete it
      this.n--;                            // Decrease set size
    }
  }
  return this;                                 // For method chaining
};
// Return true if the set contains value; false otherwise.
Set.prototype.contains = function (value) {
  return this.values.hasOwnProperty(Set._v2s(value));
};
// Return the size of the set.
Set.prototype.size = function () {
  return this.n;
};
// Call function f on the specified context for each element of the set.
Set.prototype.foreach = function (f, context) {
  for (var s in this.values)                 // For each string in the set
    if (this.values.hasOwnProperty(s))    // Ignore inherited properties
      f.call(context, this.values[s]);  // Call f on the value
};
Set.prototype.echo = function (obj) {
  console.log(obj);
}
// This internal function maps any JavaScript value to a unique string.
Set._v2s = function (val) {
  switch (val) {
    case undefined:
      return 'u';          // Special primitive
    case null:
      return 'n';          // values get single-letter
    case true:
      return 't';          // codes.
    case false:
      return 'f';
    default:
      switch (typeof val) {
        case 'number':
          return '#' + val;    // Numbers get # prefix.
        case 'string':
          return '"' + val;    // Strings get " prefix.
        default:
          return '@' + objectId(val); // Objs and funcs get @
      }
  }
  // For any object, return a string. This function will return a different
  // string for different objects, and will always return the same string
  // if called multiple times for the same object. To do this it creates a
  // property on o. In ES5 the property would be nonenumerable and read-only.
  function objectId(o) {
    var prop = "|**objectid**|";   // Private property name for string ids
    if (!o.hasOwnProperty(prop))   // If the object has no id
      o[prop] = Set._v2s.next++; // Assign it the next available
    return o[prop];                // Return the id
  }
};
Set._v2s.next = 100;    // Start assigning object ids at this value.
var test01_obj = { test01: '1' };
var s1 = new Set(test01_obj);
s1.add("one", "two", "three", "four");
s1.remove("one");
(s1.size());  // =>3
s1.contains("two"); // => true
// s1.foreach(s1.echo, this); // => two three four
// s1.foreach(function(x){
//       console.log(x);
// });
s1.size();

// 9.6.3 标准转换方法
// 为Set.prototype 添加/重写: 
// toString(), toLocaleString(), toArray()
extend(Set.prototype, {
  // 将集合转换为字符串
  toString: function () {
    var s = "{",
      i = 0;
    this.foreach(function (v) {
      s += ((i++ > 0) ? "," : "") + v;
    });
    return s + "}";
  },
  //类似 toString, 但是对于所有的值都调用toLocaleString()
  toLocaleString: function () {
    var s = "{", i = 0;
    this.foreach(function (v) {
      if (i++ > 0) s += ", ";
      if (v == null) s += v;  //null 和 undefined
      else s += v.toLocaleString();   //其他情况
    });
  },
  //将集合转换为值数组
  toArray: function () {
    var a = [];
    this.foreach(function (v) {
      a.push(v);
    });
    return a;
  }
});
Set.prototype.toJSON = Set.prototype.toArray();

/**
 * 不同名字的的工厂方法用以执行不同的初始化, 由于构造函数是类的公有标识,
 * 因此每个类只有一个构造函数,但这并不是一个"必须遵守"的规则,在JavaScript
 * 中可以定义多个构造函数继承自一个原型对象的,如果这样,这些构造函数的任意
 * 一个所创建的对象都属于同一类型.并不推荐这种技术
 * 使用这种技术定义了该类型的一个辅助构造函数
 */
// Set类的一个辅助构造函数
function SetFromArray(a) {
  //通过以函数的形式调用Set()来初始化新对象
  //将a的元素作为参数传入
  Set.apply(this, a);
}
//设置原型,以便SetFromArray能创建Set的实现
SetFromArray.prototype = Set.prototype;
var s = new SetFromArray([1, 2, 3]);
s instanceof Set;   //=> true

// 例 9-11 定义子类
// 用一个简单的函数创建简单的子类
function defineSubclass(superclass, // Constructor of the superclass
  constructor,// The constructor for the new subclass
  methods,// Instance methods: copied to prototype 
  statics // Class properties: copied to constructor 
) {
  // 建立子类的原型对象
  constructor.prototype = inherit(superclass.prototype);
  constructor.prototype.constructor = constructor;
  // 对常规类一样复制方法和类属性
  if (methods) extend(constructor.prototype, methods);
  if (statics) extend(constructor, statics);
  return constructor;
}

// 通过父类构造
Function.prototype.extend = function (constructor, methods, statics) {
  return defineSubclass(this, constructor, methods, statics);
};
/**
 * 例9-12 SingletonSet: 一个简单的子类
 *  The constructor function 构造函数
 *  SingletonSet 不是将Set中的方法列表静态地借用过来, 而是动态地从Set类继承方法
 *  如是给 Set.prototype 添加新方法, 
 *  Set 和 SingletonSet 的实例就会立即拥有这个方法
 */
function SingletonSet(member) {
  // Remember the single member of the set 记住集合中这个唯一成员
  this.member = member;
}
// 创建一个原型对象,这个原型对象继承自Set的原型
SingletonSet.prototype = inherit(Set.prototype);
// 给原型添加对象
// 如果有同名的属性就覆盖 Set.prototype 中的同名属性
extend(SingletonSet.prototype, {
  // Set the constructor property appropriately
  // 设置合适的construct 属性
  constructor: SingletonSet,
  // This set is read-only: add() and remove() throw errors
  // 这个集合是只读的:调用add()和remove()都会报错
  add: function () {
    throw "read-only set";
  },
  remove: function () {
    throw "read-only set";
  },
  // A SingletonSet always has size 1
  // SingletonSet的实例中永远只有一个元素
  size: function () {
    return 1;
  },
  // Just invoke the function once, passing the single member.
  // 这个方法只调用一次,传入这个集合的唯一成员
  foreach: function (f, context) {
    f.call(context, this.member);
  },
  // The contains() method is simple: true only for one value
  // contains() 方法非常简单: 只须检查传入的值是否匹配这个集合唯一的成员即可
  contains: function (x) {
    return x === this.member;
  }
});

/**
 * 9.7.2 构造函数和方法链
 * 例 9-13: 在子类中调用父类的构造函数和方法
 * NonNullSet 是Set的子类,它的成员不能是null和undefined
 */
function NonNullSet() {
  // Just chain to our superclass. 仅链接到父类
  // 作为普通函数调用父类的构造函数来初始化通过该构造函数调用创建的对象
  Set.apply(this, arguments);
}
// 将NonNullSet设置为Set的子类
NonNullSet.prototype = inherit(Set.prototype);
NonNullSet.prototype.constructor = NonNullSet;
// 为了将null和undefined排除在外,只须重写add()方法
NonNullSet.prototype.add = function () {
  // 检查参数是不是null或undefined
  for (var i = 0; i < arguments.length; i++)
    if (arguments[i] == null)
      throw new Error("Can't add null or undefined to a NonNullSet");
  // 调用父类的add()方法以执行实际插入操作
  return Set.prototype.add.apply(this, arguments);
};

var non001 = new NonNullSet(1, 2, 4);
non001.add(5, 6, 7);
// non001.foreach(function(x){
//        console.log(x);
//        });


// 例9-14 : 类工厂和方法链
// This function returns a subclass of specified Set class and overrides
// 这个函数返回具体Set类的子类
// the add() method of that class to apply the specified filter.
// 并重写该类的add()方法用以对添加的元素做特殊的过滤
function filteredSetSubclass(superclass, filter) {
  var constructor = function () { // The subclass constructor 子类构造函数
    // Chains to the superclass 调用父类构造函数
    superclass.apply(this, arguments);
  };
  var proto = constructor.prototype = inherit(superclass.prototype);
  proto.constructor = constructor;
  proto.add = function () {
    // Apply the filter to all arguments before adding any
    // 在添加任何成员之前首先使用过滤器将所有参数进行过滤
    for (var i = 0; i < arguments.length; i++) {
      var v = arguments[i];
      if (!filter(v)) throw ("value " + v + " rejected by filter");
    }
    // Chain to our superclass add implementation 调用父类add()方法
    superclass.prototype.add.apply(this, arguments);
  };
  return constructor;
}


/**上例用一个函数将创建子类的代码包装起来,这样就可以构造函数和方法链中使用
 * 构造函数和方法链中使用父类的参数,而不是通过写死某个父类的名字来使用它的
 * 参数,也就是说如果想修改父类,只须修改一处代码取可, 而不必对每个用到父类
 * 名的地方都做修改.即使不是定义类工厂的场景中,这种技术也是值得提倡使用的.
 *
 * 使用包装函数和例9-11的Function.prototype.extend()方法来重写NonNullSet
 *
 * 类以这种创建类工厂的能力是JavaScript语言动态特性的一个体现,类工厂是一个
 * 非常强大和有用的特性,在Java和C++等语言中是没有的
 */
var NonNumSet = (function () {
  var superclass = Set;
  //invoke line 1023 extend()=> line 1005 defineSubclass()
  return superclass.extend(
    //父类构造函数
    function () {
      superclass.apply(this, arguments)
    }, {
      // 新的子类构造
      add: function () {
        // 检查参数是否是null或undefined
        for (var i = 0; i < arguments; i++)
          if (arguments[i] == null)
            throw new Error("Can't add null of undefined");
        //调用父类的add()方法以执行实际插入操作
        return superclass.prototype.add.apply(this, arguments);
      }
    });
}());

/**
 * 9.7.3 组合 VS 子类
 *  面向对象设计原则:"组合优于继承"
 *  利用组合的原理定义一个新的集合实现,它"包装"了另一个集合对象,在将受制的成员
 *  过滤掉之后会用到这个(包装的)集合对象.
 *
 *  例9-15 :使用组合代替继承的集合的实现
 * A FilteredSet wraps a specified set object and applies a specified filter
 * to values passed to its add() method.  All of the other core set methods
 * simply forward to the wrapped set instance.
 *  实现一个FilteredSet,它包装某个指定的"集合"对象,并对传入add()方法的值应
 *  用了某种指定的过滤器"范围"类中其他所有的核心方法延续到包装后的实例中
 * invoke line 1023 extend()=> line 1005 defineSubclass()
 * @reutrn:FilteredSet(set, filter){}
 */
var FilteredSet = Set.extend(
  // The constructor 子类构造函数,添后返回
  function FilteredSet(set, filter) {
    this.set = set;
    this.filter = filter;
  },
  {  // The instance methods 子类实例方法
    add: function () {
      // If we have a filter, apply it 如果已有过滤器,直接使用
      if (this.filter) {
        for (var i = 0; i < arguments.length; i++) {
          var v = arguments[i];
          if (!this.filter(v))
            throw new Error("FilteredSet: value " + v +
              " rejected by filter");
        }
      }

      // Now forward the add() method to this.set.add()
      // 调用set中的add()方法
      this.set.add.apply(this.set, arguments);
      return this;
    },
    // The rest of the methods just forward to this.set and do
    //nothing else.
    // 剩下的方法都保持不变
    remove: function () {
      this.set.remove.apply(this.set, arguments);
      return this;
    },
    contains: function (v) {
      return this.set.contains(v);
    },
    size: function () {
      return this.set.size();
    },
    foreach: function (f, c) {
      this.set.foreach(f, c);
    }
  });
/**
 * 这个例子使用组合好处是,只须创建一个单独的FilteredSet子类即可,可以利用这个
 * 类的实例来创建任意带有成员限制的集合实例.比如,不用上文中定义的NonNullSet类
 */
var s = new FilteredSet(new Set(), function (x) {//初始化Filtered,和set
  return x !== null;
});
s.add(1, 2, 3);
//甚至还可以对已经过滤后的集合进行过滤
var t = new FilteredSet(s, function (x) {
  return !(x instanceof Set);
});

/**
 * 9.7.4 类的层次结构和抽象类
 * 例 9-16: 抽象类和非抽象Set类的层次结构
 */
// A convenient function that can be used for any abstract method
// 这个函数可以用做任何抽象方法,非常方便
function abstractmethod() {
  throw new Error("abstract method");
}

/*
  * The AbstractSet class defines a single abstract method, contains().
  * AbstractSet类定义了一个抽象方法:contains()
  */
function AbstractSet() {
  throw new Error("Can't instantiate abstract classes");
}
AbstractSet.prototype.contains = abstractmethod;

/*
  * NotSet is a concrete subclass of AbstractSet.
  * NotSet是AbstractSet的一个非抽象子类
  * The members of this set are all values that are not members of some
  * other set. Because it is defined in terms of another set it is not
  * writable, and because it has infinite members, it is not enumerable.
  * All we can do with it is test for membership.
  * 所有不在其他集合中的成员都在这个集合中
  * 因为它是在其他集合是不可写的条件下定义的
  * 同时由于它的成员是无限个,因此它是不可枚举的
  * 我们中能用它来检测元素成员的归属情况
  * Note that we're using the Function.prototype.extend() method we defined
  * earlier to define this subclass.
  * 注意,我们使用了Function.prototype.extend()方法来定义这个子类
  */
var NotSet = AbstractSet.extend(
  function NotSet(set) {
    this.set = set;
  },
  {
    contains: function (x) {
      return !this.set.contains(x);
    },
    toString: function (x) {
      return "~" + this.set.toString();
    },
    equals: function (that) {
      return that instanceof NotSet && this.set.equals(that.set);
    }
  }
);


/*
  * AbstractEnumerableSet is an abstract subclass of AbstractSet.
  * AbstractEnumerableSet是AbstractSet的一个抽象子类
  * It defines the abstract methods size() and foreach(), and then implements
  * concrete isEmpty(), toArray(), to[Locale]String(), and equals() methods
  * on top of those. Subclasses that implement contains(), size(), and foreach()
  * get these five concrete methods for free.
  * 它定义了抽象方法size()和foreach()
  * 然后实现了非抽象方法isEmpty(),toArray(),to[locale]String()和equals()方法
  * 子类实现了contains(),size()和foreach,这三个方法可以很轻易地调用这5个抽象方法
  */
var AbstractEnumerableSet = AbstractSet.extend(function () {
  //抽象类不允许实例
  throw new Error("Can't instantiate abstract classes");
}, {
    size: abstractmethod,
    foreach: abstractmethod,
    isEmpty: function () {
      return this.size() == 0;
    },
    toString: function () {
      var s = "{", i = 0;
      this.foreach(function (v) {
        if (i++ > 0) s += ", ";
        s += v;
      });
      return s + "}";
    },
    toLocaleString: function () {
      var s = "{", i = 0;
      this.foreach(function (v) {
        if (i++ > 0) s += ", ";
        if (v == null) s += v; // null & undefined
        else s += v.toLocaleString(); // all others
      });
      return s + "}";
    },
    toArray: function () {
      var a = [];
      this.foreach(function (v) {
        a.push(v);
      });
      return a;
    },
    equals: function (that) {
      if (!(that instanceof AbstractEnumerableSet)) return false;
      // If they don't have the same size, they're not equal
      // 如果它们大小不同,则不相等
      if (this.size() != that.size()) return false;
      // Now check whether every element in this is also in that.
      // 检查每一元素是否也在that中
      try {
        this.foreach(function (v) {
          if (!that.contains(v)) throw false;
        });
        // All elements matched: sets are equal.所有元素都匹配
        return true;
      } catch (x) {
        // Sets are not equal 集合不相等
        if (x === false) return false;
        // Some other exception occurred: rethrow it. 发生异常
        throw x;
      }
    }
  });

/*
  * SingletonSet is a concrete subclass of AbstractEnumerableSet.
  * SingletonSet 是 AbstractEnumerableSet 的非抽象子类
  * A singleton set is a read-only set with a single member.
  * singleton集合是只读的,它只包含一个成员
  */
var SingletonSet = AbstractEnumerableSet.extend(
  function SingletonSet(member) {
    this.member = member;
  },
  {
    contains: function (x) {
      return x === this.member;
    },
    size: function () {
      return 1;
    },
    foreach: function (f, ctx) {
      f.call(ctx, this.member);
    }
  }
);

/*
  * AbstractWritableSet is an abstract subclass of AbstractEnumerableSet.
  * AbstractWritableSet 是 AbstractEnumerableSet的一个抽象子类
  * It defines the abstract methods add() and remove(), and then implements
  * concrete union(), intersection(), and difference() methods on top of them.
  * 它定义了抽象方法union(), intersection()和difference()
  */
var AbstractWritableSet = AbstractEnumerableSet.extend(
  function () {
    throw new Error("Can't instantiate abstract classes");
  }, {
    add: abstractmethod,
    remove: abstractmethod,
    union: function (that) {
      var self = this;
      that.foreach(function (v) {
        self.add(v);
      });
      return this;
    },
    intersection: function (that) {
      var self = this;
      this.foreach(function (v) {
        if (!that.contains(v)) self.remove(v);
      });
      return this;
    },
    difference: function (that) {
      var self = this;
      that.foreach(function (v) {
        self.remove(v);
      });
      return this;
    }
  });


/**
 * 9.8.5 子类和ECMAScript 5
 * 例 9-22 : StringSet: 利用ECMAScript 5 特性定义子类
 */
function StringSet() {
  // Create object with no proto 没有继承成员
  this.set = Object.create(null);
  this.n = 0;
  this.add.apply(this, arguments);
}
/**
 * Note that with Object.create we can inherit from the superclass prototype
 *  and define methods in a single call. Since we don't specify any of the
 *  writable, enumerable, and configurable properties, they all default to
 *  false.
 *  Readonly methods makes this class trickier to subclass.
 *  只读方法让这个类 难于子类化(被继承)
 ***/
StringSet.prototype = Object.create(AbstractWritableSet.prototype, {
  constructor: { value: StringSet },
  contains: {
    value: function (x) {
      return x in this.set;
    }
  },
  size: {
    value: function (x) {
      return this.n;
    }
  },
  foreach: {
    value: function (f, c) {
      Object.keys(this.set).forEach(f, c);
    }
  },
  add: {
    value: function () {
      for (var i = 0; i < arguments.length; i++) {
        if (!(arguments[i] in this.set)) {
          this.set[arguments[i]] = true;
          this.n++;
        }
      }
      return this;
    }
  },
  remove: {
    value: function () {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] in this.set) {
          delete this.set[arguments[i]];
          this.n--;
        }
      }
      return this;
    }
  }
});
var stringSet01 = new StringSet(1, 2, 3);
stringSet01.size();
// stringSet01.foreach(function(x){
//   console.log(x); // 1, 2, 3
// });





/**************************************
 * 9.8 ECMAScript 5 中的类
 *     9.8.1 让属性不可枚举
 * 展示如何通过Object.definedProperty()来做到这一点.
 * 如何定义一个getter函数以及检测对象是否可扩展的(extensible)
 * 例9-17 : 定义不可枚举的属性
 * 将代码包装在一个匿名函数中, 这样定义的变量就在这个函数作用域内
 */
(function () {
  // Define objectId as a nonenumerable property inherited by all objects.
  // When this property is read, the getter function is invoked.
  // It has no setter, so it is read-only.
  // It is nonconfigurable, so it can't be deleted.
  Object.defineProperty(Object.prototype, "objectId", {
    get: idGetter,       // Method to get value 取值器
    enumerable: false,   // Nonenumerable  不可枚举的
    configurable: false  // Can't delete it 不可删除的
  });

  // This is the getter function called when objectId is read
  // 当读取objectId的时候直接调用这个getter函数
  function idGetter() {             // A getter function to return the id
    if (!(idprop in this)) {// If object doesn't already have an id
      if (!Object.isExtensible(this)) // And if we can add a property
        throw Error("Can't define id for nonextensible objects");
      Object.defineProperty(this, idprop, {// Give it one now.
        value: nextid++,    // This is the value 就是这个值
        writable: false,    // Read-only 只读
        enumerable: false,  // Nonenumerable 不可枚举
        configurable: false // Nondeletable 不可删除
      });
    }
    return this[idprop];// Now return the existing or new value.返回ID
  };

  // These variables are used by idGetter() and are private to this 
  //      function
  var idprop = "|**objectId**|";// Assume this property isn't in use 
  var nextid = 1; // Start assigning ids at this # 给它设置初始值

}()); // Invoke the wrapper function to run the code right away

/**
 * 9.8.6 属性描述符
 * 例9-23 :ECMAScript 5 属性操作
 * 
 * Define a properties() method in Object.prototype that returns an
 * object representing the named properties of the object on which it
 * is invoked (or representing all own properties of the object, if
 * invoked with no arguments).  The returned object defines four useful
 * methods: toString(), descriptors(), hide(), and show().
 */
// Wrap everything in a private function scope
(function namespace() {

  // This is the function that becomes a method of all object
  function properties() {
    var names;  // An array of property names
    if (arguments.length == 0)  // All own properties of this
      names = Object.getOwnPropertyNames(this);
    else if (arguments.length == 1 && Array.isArray(arguments[0]))
      names = arguments[0];   // Or an array of names
    else                        // Or the names in the argument list
      names = Array.prototype.splice.call(arguments, 0);

    // Return a new Properties object representing the named properties
    return new Properties(this, names);
  }

  // Make it a new nonenumerable property of Object.prototype.
  // This is the only value exported from this private function scope.
  //Object.defineProperty(Object.prototype, "properties", {
  //    value: properties,
  //    enumerable: false, writable: true, configurable: true
  //});

  // This constructor function is invoked by the properties() function above.
  // The Properties class represents a set of properties of an object.
  function Properties(o, names) {
    this.o = o;            // The object that the properties belong to
    this.names = names;    // The names of the properties
  }

  // Make the properties represented by this object nonenumerable
  Properties.prototype.hide = function () {
    var o = this.o, hidden = { enumerable: false };
    this.names.forEach(function (n) {
      if (o.hasOwnProperty(n))
        Object.defineProperty(o, n, hidden);
    });
    return this;
  };

  // Make these properties read-only and nonconfigurable
  Properties.prototype.freeze = function () {
    var o = this.o, frozen = { writable: false, configurable: false };
    this.names.forEach(function (n) {
      if (o.hasOwnProperty(n))
        Object.defineProperty(o, n, frozen);
    });
    return this;
  };

  // Return an object that maps names to descriptors for these properties.
  // Use this to copy properties along with their attributes:
  //   Object.defineProperties(dest, src.properties().descriptors());
  Properties.prototype.descriptors = function () {
    var o = this.o, desc = {};
    this.names.forEach(function (n) {
      if (!o.hasOwnProperty(n)) return;
      desc[n] = Object.getOwnPropertyDescriptor(o, n);
    });
    return desc;
  };

  // Return a nicely formatted list of properties, listing the
  // name, value and attributes. Uses the term "permanent" to mean
  // nonconfigurable, "readonly" to mean nonwritable, and "hidden"
  // to mean nonenumerable. Regular enumerable, writable, configurable
  // properties have no attributes listed.
  Properties.prototype.toString = function () {
    var o = this.o; // Used in the nested function below
    var lines = this.names.map(nameToString);
    return "{\n  " + lines.join(",\n  ") + "\n}";

    function nameToString(n) {
      var s = "", desc = Object.getOwnPropertyDescriptor(o, n);
      if (!desc) return "nonexistent " + n + ": undefined";
      if (!desc.configurable) s += "permanent ";
      if ((desc.get && !desc.set) || !desc.writable) s += "readonly ";
      if (!desc.enumerable) s += "hidden ";
      if (desc.get || desc.set) s += "accessor " + n
      else s += n + ": " + ((typeof desc.value === "function") ? "function"
        : desc.value);
      return s;
    }
  };

  // Finally, make the instance methods of the prototype object above
  // nonenumerable, using the methods we've defined here.
  //Properties.prototype.properties().hide();
}());
// Invoke the enclosing function as soon as we're done defining it.

/********************************
 * 9.9 模块
 *  9.9.1 用做命名空间的对象
 *  9.9.2 作为私有命名空间的函数
 *
 *  例 9-24 模块函数中的Set类
 * Declare a global variable Set and assign it the return value of this function
 * The open parenthesis and the function name below hint that the function
 * will be invoked immediately after being defined, and that it is the function
 * return value, not the function itself, that is being assigned.
 * Note that this is a function expression, not a statement, so the name
 * "invocation" does not create a global variable.
 */
var Set2 = (function invocation() {

  function Set2() {         // This constructor function is a local variable.
    this.values = {};    // The properties of this object hold the set
    this.n = 0;           // How many values are in the set
    this.add.apply(this, arguments);  // All arguments are values to add
  }

  // Now define instance methods on Set2.prototype.
  // For brevity, code has been omitted here
  Set2.prototype.contains = function (value) {
    // Note that we call v2s(), not the heavily prefixed Set._v2s()
    return this.values.hasOwnProperty(v2s(value));
  };
  Set2.prototype.size = function () {
    return this.n;
  };
  Set2.prototype.add = function () { /* ... */
  };
  Set2.prototype.remove = function () { /* ... */
  };
  Set2.prototype.foreach = function (f, context) { /* ... */
  };

  // These are helper functions and variables used by the methods above
  // They're not part of the public API of the module, but they're hidden
  // within this function scope so we don't have to define them as a
  // property of Set or prefix them with underscores.
  function v2s(val) { /* ... */
  }

  function objectId(o) { /* ... */
  }

  var nextId = 1;

  // The public API for this module is the Set() constructor function.
  // We need to export that function from this private namespace so that
  // it can be used on the outside.  In this case, we export the constructor
  // by returning it.  It becomes the value of the assignment expression
  // on the first line above.
  return Set2;
}()); // Invoke the function immediately after defining it.



/*****************************
 * Math.random():取 0.10000 - 0.999999 之间的数
 *
 * This function creates a new enumerated type.  The argument object specifies
 * the names and values of each instance of the class. The return value
 * is a constructor function that identifies the new class.  Note, however
 * that the constructor throws an exception: you can't use it to create new
 * instances of the type.  The returned constructor has properties that
 * map the name of a value to the value itself, and also a values array,
 * a foreach() iterator function
 */
function enumeration(namesToValues) {
  // This is the dummy constructor function that will be the return value.
  var enumeration = function () {
    throw "Can't Instantiate Enumerations";
  };

  // Enumerated values inherit from this object.
  var proto = enumeration.prototype = {
    constructor: enumeration,                   // Identify type
    toString: function () {
      return this.name;
    }, // Return name
    valueOf: function () {
      return this.value;
    }, // Return value
    toJSON: function () {
      return this.name;
    }    // For serialization
  };
  enumeration.values = [];  // An array of the enumerated value objects
  // Now create the instances of this new type.
  for (name in namesToValues) {         // For each value
    var e = inherit(proto);          // Create an object to represent it
    e.name = name;                   // Give it a name
    e.value = namesToValues[name];   // And a value
    enumeration[name] = e;           // Make it a property of constructor
    enumeration.values.push(e);      // And store in the values array
  }
  // A class method for iterating the instances of the class
  enumeration.foreach = function (f, c) {
    for (var i = 0; i < this.values.length; i++) {
      f.call(c, this.values[i]);
    }
  };
  enumeration.echo = function (obj) {
    console.log(obj);
  }
  // Return the constructor that identifies the new type
  return enumeration;
}
var enumerationTest = new enumeration({ userId: 11, userName: "zhangSan" });
//enumerationTest.foreach ( enumerationTest.echo, this);
// enumerationTest.foreach(function(x){
//        console.log(x);
//        });
/**
 * 9.6.2 一个例子:枚举类型
 */
var Coin = enumeration({ Penny: 1, Nickel: 5, Quarter: 25 });
var c = Coin.Dime;      // 这是新类的实例
c instanceof Coin;      // => true: instanceof 正常工作
//c.constructor == Coin;   // => true: 构造函数的属性正常工作
Coin.Quarter + 3 * Coin.Nickel;     // => 40: 将值转换为数字的例子
Coin.Dime == 10;        // => true: 更多转换为数字的例子
Coin.Dime > Coin.Nickel;            // => true: 关系运算符正常工作
String(Coin.Dime) + ":" + Coin.Dime;    // => "Dime: 10":强制转换为字符串
// 例9-8: 使用枚举类型表示一副扑克牌
function Card(suit, rank) {   // Define a class to represent a playing card
  this.suit = suit;         // Each card has a suit;每张牌都有花色
  this.rank = rank;         // and a rank:以及点数
}
// These enumerated types define the suit and rank values
Card.Suit = enumeration({ Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4 });
Card.Rank = enumeration({
  Two: 2, Three: 3, Four: 4, Five: 5, Six: 6,
  Seven: 7, Eight: 8, Nine: 9, Ten: 10,
  Jack: 11, Queen: 12, King: 13, Ace: 14
});
// Define a textual representation for a card
Card.prototype.toString = function () {
  return this.rank.toString() + " of " + this.suit.toString();
};
// Compare the value of two cards as you would in poker
Card.prototype.compareTo = function (that) {
  if (this.rank < that.rank) return -1;
  if (this.rank > that.rank) return 1;
  return 0;
};
// A function for ordering cards as you would in poker
Card.orderByRank = function (a, b) {
  return a.compareTo(b);
};
// A function for ordering cards as you would in bridge
Card.orderBySuit = function (a, b) {
  if (a.suit < b.suit) return -1;//比数据
  if (a.suit > b.suit) return 1;
  if (a.rank < b.rank) return -1;//比黑桃,红桃...
  if (a.rank > b.rank) return 1;
  return 0;
};
// Define a class to represent a standard deck of cards;定义表示一副标准扑克牌的类
function Deck() {
  var cards = this.cards = [];     // A deck is just an array of cards
  Card.Suit.foreach(function (s) {  // Initialize the array, 4次
    Card.Rank.foreach(function (r) { // 13
      cards.push(new Card(s, r));   //将 52 张牌装入数组中
    });
  });
}
// Shuffle method: shuffles cards in place and returns the deck; 洗牌
Deck.prototype.shuffle = function () {
  // For each element in the array, swap with a randomly chosen lower element
  var deck = this.cards, len = deck.length;
  for (var i = len - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1)), temp;     // Random number
    temp = deck[i], deck[i] = deck[r], deck[r] = temp;       // Swap
  }
  return this;
};
// Deal method: returns an array of cards;发牌
Deck.prototype.deal = function (n) {
  if (this.cards.length < n) throw "Out of cards";
  return this.cards.splice(this.cards.length - n, n);//(52-13=39,39-13=26...)
};
// Create a new deck of cards, shuffle it, and deal a bridge hand
var deck = (new Deck()).shuffle();
var hand = deck.deal(13).sort(Card.orderBySuit);
for (var iHand1 in hand) {
  var temp = hand[iHand1];
  ("suit is" + temp.suit.name + " rank is " + temp.rank.value);
}



/////////////////////////////////
// 9-3: Complex.js: 表示复数的类
// Complex.js:
// 这个文件定义了Complex类, 用来描述复数
// 复数是实数和虚数的和, 并且虚数i是-1的平方根
// 这个构造函数为它所创建的每个实例定义了实例字段r和i
// 这两个字段分别保存复数的实部和虚部
// 它们是对象的状态
function Complex(real, imaginary) {
  if (isNaN(real) || isNaN(imaginary)) // Ensure that both args are numbers.
    throw new TypeError();           // Throw an error if they are not.
  this.r = real;                       // The real part of the complex number.
  this.i = imaginary;                  // The imaginary part of the number.
}
/*
  * The instance methods of a class are defined as function-valued properties
  * of the prototype object.  The methods defined here are inherited by all
  * instances and provide the shared behavior of the class. Note that JavaScript
  * instance methods must use the this keyword to access the instance fields.
  */
// Add a complex number to this one and return the sum in a new object.
Complex.prototype.add = function (that) {
  return new Complex(this.r + that.r, this.i + that.i);
};
// Multiply this complex number by another and return the product.
Complex.prototype.mul = function (that) {
  return new Complex(this.r * that.r - this.i * that.i,
    this.r * that.i + this.i * that.r);
};
// Return the real magnitude of a complex number. This is defined
// as its distance from the origin (0,0) of the complex plane.
Complex.prototype.mag = function () {
  return Math.sqrt(this.r * this.r + this.i * this.i);
};
// Return a complex number that is the negative of this one.
Complex.prototype.neg = function () {
  return new Complex(-this.r, -this.i);
};
// Convert a Complex object to a string in a useful way.
Complex.prototype.toString = function () {
  return "{" + this.r + "," + this.i + "}";
};
// Test whether this Complex object has the same value as another.
Complex.prototype.equals = function (that) {
  return that != null &&                      // must be defined and non-null
    that.constructor === Complex &&         // and an instance of Complex
    this.r === that.r && this.i === that.i; // and have the same values.
};
/*
  * Class fields (such as constants) and class methods are defined as
  * properties of the constructor. Note that class methods do not
  * generally use the this keyword: they operate only on their arguments.
  */
// Here are some class fields that hold useful predefined complex numbers.
// Their names are uppercase to indicate that they are constants.
// (In ECMAScript 5, we could actually make these properties read-only.)
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);
// This class method parses a string in the format returned by the toString
// instance method and returns a Complex object or throws a TypeError.
Complex.parse = function (s) {
  try {          // Assume that the parsing will succeed
    var m = Complex._format.exec(s);  // Regular expression magic
    return new Complex(parseFloat(m[1]), parseFloat(m[2]));
  } catch (x) {  // And throw an exception if it fails
    throw new TypeError("Can't parse '" + s + "' as a complex number.");
  }
};
// A "private" class field used in Complex.parse() above.
// The underscore in its name indicates that it is intended for internal
// use and should not be considered part of the public API of this class.
Complex._format = /^\{([^,]+),([^}]+)\}$/;
// 使用工厂方法来返回一个使用极坐标初始的Complex对象
Complex.polar = function (r, theta) {
  return new Complex(r * Math.cos(theta), r * Math.sin(theta));
};
var c = new Complex(2, 3);  //
var d = new Complex(c.i, c.r);
c.add(d).toString();    //
Complex.parse(c.toString()).add(c.neg()).equals(Complex.ZERO);


function inherit(p) {
  // 如果p对象不存在
  if (p == null) {
    throw TypeError();
  }
  // ECMAScript5 实现
  if (Object.create) {
    return Object.create(p);
  }
  // 原型继承的方法实现 == Object.create
  var t = typeof p;
  if (t !== "object" && t !== "function") {
    throw TypeError();
  }
  function f() {
  };
  f.prototype = p;
  return new f();
}