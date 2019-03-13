// class
// 基本定义和生成实例
{
  class Parent {
    constructor(x, y) {
      this.name = name
    }
    add() {
      return this.x + this.y
    }
  }
  let p = new Parent(1, 2)
  p.add()

  // console.log(typeof Parent) //=> function
  // console.log(Parent === Parent.prototype.constructor) //=> true
  // 隐式原型 === 显式原型
  console.log(p.__proto__ === Parent.prototype) //=>true
}

// 转后的 es5
{
  function Parent(x, y) {
    this.x = x;
    this.y = y;
  }

  Parent.prototype.add = function() {
    return this.x + this.y
  }

  var p = new Parent(1, 2);
  p.add()
}

// getter, setter
{
  class Parent {
    constructor(name = 'mukewang') {
      this.name = name
    }

    get longName() {
      return 'mk: ' + this.name
    }

    set longName(value) {
      this.name = value
    }
  }

  let v = new Parent()
  v.longName // mk: mukewang
  v.longName = 'hello'
  v.longName // mk: hello
}

// 静态方法
{
  class Parent {
    constructor(name = 'mukewang') {
      this.name = name
    }

    static tell() {
      return 'tell'
    }
  }

  Parent.tell() // tell
}

// 静态属性
{
  class Parent {
    constructor(name = 'mukewang') {
      this.name = name
    }
    changeName() {}
  }
  Parent.type = 'test'
}
