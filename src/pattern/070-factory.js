//////////////////////
// 工厂方法 Factory
//
// 目标：
// 1.当创建相似对象时 执行重复的操作
// 2.当编译时不知道具体类型(类)的情况下，为工厂客户提供一种创建对象的接口
//
// 应用场景：
// jQuery - $('div')
// React.createElement
// vue 异步组件

// parent constructor
function CarMaker() {}
// a method of the parent
CarMaker.prototype.drive = function() {
  return 'Vroom, I have ' + this.doors + ' doors';
};
// the static factory method
CarMaker.factory = function(type) {
  var constr = type,
    args = Array.prototype.slice.call(arguments, 1),
    newcar;

  //console.log(args.toString() );

  // error if the constructor doesn't exist
  if (typeof CarMaker[constr] !== 'function') {
    throw {
      name: 'Error',
      message: constr + " doesn't exist"
    };
  }
  // at this point the constructor is known to exist
  // let's have it inherit the parent but only once
  if (typeof CarMaker[constr].prototype.drive !== 'function') {
    CarMaker[constr].prototype = new CarMaker();
  }
  // create a new instance
  newcar = new CarMaker[constr](args);
  // optionally call some methods and then return...
  return newcar;
};

// define specific car makers
CarMaker.Compact = function() {
  this.doors = 4;
  this.args = arguments;
  //console.log(this.args);
};
CarMaker.Convertible = function() {
  this.doors = 2;
};
CarMaker.SUV = function() {
  this.doors = 24;
};

// Used:
var corolla = CarMaker.factory('Compact', ['1', '2']);
var solstice = CarMaker.factory('Convertible');
var cherokee = CarMaker.factory('SUV');
corolla.drive(); // "Vroom, I have 4 doors"
solstice.drive(); // "Vroom, I have 2 doors"
cherokee.drive(); // "Vroom, I have 17 doors"

//////////////////////////////////////
// Built-in Object Factory
var o = new Object(),
  n = new Object(),
  s = Object('1'),
  b = Object(true);

//test
o.constructor === Object; //true
n.constructor === Number; //true
s.constructor === String;
b.constructor === Boolean;

//////////////////////////////////////
// es6
class Product {
  constructor(name) {
    // static
    this.name = name;
  }
  // Write in prototype
  init() {
    console.log('init');
  }
  func1() {
    console.log('func1');
  }
  func2() {
    console.log('func2');
  }
}
// console.log(Product.prototype.func1);

class Creator {
  create(name) {
    return new Product(name);
  }
}

let creator = new Creator();
let p = creator.create('p1');
p.init();
p.func1();
