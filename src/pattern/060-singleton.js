///////////////////////////////////
// 单体模式 Singleton
// 保证一个类仅有一个实例
//
// 场景: 登录框，购物车
// vuex 和 redux 的 store
// jquery 只有一个 $
//
// 模式作用:
// 1.模块间通信
// 2.系统中某个类的对象只能存在一个
// 3.保护自己的属性和方法
//
// 注意事项:
// 1.注意 this 的使用
// 2.闭包容易造成内存泄露, 不需要的赶快干掉.
// 3.注意new的成本(继承)

// 1.
function Universe() {
  // do we have an existing instance?
  if (typeof Universe.instance === 'object') {
    return Universe.instance;
  }
  // proceed as normal
  this.start_time = 0;
  this.bang = 'Big';
  // cache
  Universe.instance = this;
}
var uni1 = new Universe();
var uni2 = new Universe();
uni1 === uni2; // true
Universe.instance;
// 缺点: instance 方法是公开的

// 2.闭包中的实例
// 采用闭包保护单体实例，私有静态成员实现
function Universe_2() {
  // 缓存实例
  var instance = this;
  // 正常进行
  this.start_time = 0;
  this.band = 'Big';
  // rewrite the constructor
  Universe_2 = function() {
    return instance;
  };
}
Universe_2.prototype.nothing = true;
var uni_2_1 = new Universe_2();
Universe_2.prototype.everything = true;
var uni_2_2 = new Universe_2();
uni_2_2 === uni_2_1; // true
// 缺点：重写构造时会丢失所有在初始定义和重定义时刻之间添加到它里面的属性。

// 仅有最初的原型 链接到对象上
uni_2_1.nothing; // true
uni_2_2.nothing; // true
uni_2_1.everything; // undefined
uni_2_2.everything; // undefined
// 结果看上去是正确的
uni_2_1.constructor.name; // Universe_2
uni_2_1.constructor === Universe_2; 
// => false 但这是很奇怪的
// 原因是：uni_2_1 指向了原始的构造函数，而不是重新定义的那个函数

// 3. 使原型和构造函数指针
function Universe_3() {
  // the cached instance
  var instance;
  // rewrite the constructor
  Universe_3 = function Universe_3() {
    return instance;
  };

  // carry over the prototype properties
  Universe_3.prototype = this;
  // the instance
  instance = new Universe_3();
  // reset the constructor pointer
  instance.constructor = Universe_3;
  // all the functionality
  instance.start_time = 0;
  instance.bang = 'Big';
  return instance;
}

Universe_3.prototype.nothing = true; //true
var uni_3_1 = new Universe_3();
Universe_3.prototype.everything = true; //
var uni_3_2 = new Universe_3();
// 相同的实例
uni_3_1 === uni_3_2; //true
// 无论这些原型属性是何时定义的
uni_3_1.nothing && uni_3_2.nothing && uni_3_1.everything && uni_3_2.everything; //=> true
uni_3_1.bang; // "Big"
uni_3_1.constructor === Universe_3; //true

// 4. 另一种解决方案也是 将构造函数和实例包装在即时函数中
var Universe_4;
(function() {
  var instance;
  Universe_4 = function Universe_4() {
    if (instance) {
      return instance;
    }
    instance = this;
    //所有功能
    this.start_time = 0;
    this.bang = 'Big';
  };
})();
var uni_4_1 = new Universe_4();
var uni_4_2 = new Universe_4();
uni_4_1 === uni_4_2 //=> true


// ES6
class SingleObject {
  constructor() {
    this.state = 'hide'
  }
  show() {
    if (this.state === 'show') {
      console.log('已经显示');
      return
    }
    this.state = 'show'
    console.log('登录框显示');
  }
  hide() {
    if (this.state === 'hide') {
      console.log('已经隐藏');
      return
    }
    this.state = 'hide'
    console.log('登录框隐藏成功');
  }
}

SingleObject.getInstance = (function () {
  let instance
  return function () {
    if(!instance) {
      instance = new SingleObject()
    }
    return instance
  }
})()

let obj1 = SingleObject.getInstance()
obj1.show()
let obj2 = SingleObject.getInstance()
obj2.hide()
obj1 === obj2 // => true

// error 
let obj3 = new SingleObject()
// obj3.login()
obj1 === obj3   //=> false



