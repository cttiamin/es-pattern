/**
 * 如果使用构造函数窃取模式的继承且不使用原型链, 那么这个继承很可能被破坏
 *  Polygon 构造函数是作用域安全的, 然而 Rectangle 构造函数不是,
 *  新创建一个 Rectangle 实例之后这个实例
 *  通过 Polygon.call() 来继承 Polygon 的 sides 属性,
 *  但由于 Polygon 作用域安全的, this 对象并非 Polygon 实例,
 *  所以会返回一个新 Polygon对象,
 *  Rectangle 构造函数中this对象并没有得到增长,
 *  Polygon.call() 返回值也没有用到, Rectangle 实例中不会有sides属性
 */
function Polygon(sides) {
  if (this instanceof Polygon) {
    this.sides = sides
    this.getArea = function() {
      return 0
    }
  } else {
    return new Polygon(sides)
  }
}

function Rectangle(width, height) {
  Polygon.call(this, 2)
  // 在当前作用域中调用: Polygon 传入参数:2
  this.width = width
  this.height = height
  this.getArea = function() {
    return this.width * this.height
  }
}
//    var rect = new Rectangle(5, 10);
//    console.log(rect.sides);   //undefined


/**
 * 如果构造函数窃取结合使用 原型链 或者 寄生组合 
 * 则可以解决这个问题
 */
Rectangle.prototype = new Polygon();
var rect = new Rectangle(5, 10);
//console.log(rect.sides);    //2