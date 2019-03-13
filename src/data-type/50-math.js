// 单体内置对象, 20140325 Tuesday
// Math.max(): 取最大数,
// Math.min(): 取最小数
// Math.ceil():  取整(往上,取大)
// Math.round(): 取整
// Math.floor(): 取整(住下,取小)
// Math.random(): 随机生成 0.10000 - 0.999999 之间
//
// ES6
// Math.trunc 去除小数部分， 整数部分
// Math.sign 判断一个数到底是正数，负数，还是零
// Math.cbrt 用于计算一个数的立方根
// Math.hypot 方法返回所有参数的平方和的平方根


Math.PI;    // 3.141592653589793
Math.LN2;   // 0.6931471805599453 2 的自然对数
Math.LN10;  // 2.302585092994046 1 的自然对数
Math.SQRT2; // 1.4142135623730951 2 的平方根

//取大,取小
Math.max(3, 54, 32, 16);   //54
Math.min(3, 54, 32, 16);  // 3
Math.ceil(25.1);    // =>26 取大
Math.round(25.5);    //26 四舍五入
Math.floor(25.9);    //25 取小

Math.random() * 9;
Math.floor(Math.random() * 10 + 1); // 1-10
Math.floor(Math.random() * 9 + 2);  // 2-10

// 随机生成指定范围内的数
function selectFrom(lowerValue, upperValue) {
  var choices = upperValue - lowerValue + 1
  return Math.floor(Math.random() * choices + lowerValue)
}
selectFrom(2, 10);   //介于2到10之间的数(包括2,10)


var colors = ["red", "green", "blue", "yellow", "black", "purple", "brown"];
colors[ selectFrom(0, colors.length - 1) ]; 
// 在数组中随机取出

// 计算两个笛卡尔坐标 (x1, y1) 和 (x2, y2) 之间的距离
// 勾股定理，找弦?
function distance(x1, y1, x2, y2) {
  var dx = x2 - x1
  var dy = y2 - y1
  return Math.sqrt(dx * dx + dy * dy)
}


///////////////////////////
// ES6  Math 对象的扩展
// Math.trunc 去除小数部分， 整数部分
Math.trunc(4.1);	// => 4
Math.trunc(4.9);	// => 4 
Math.trunc(-4.1);	// => -4 
Math.trunc(-4.9);	// => -4 
Math.trunc(-0.1234);	//	=>0
Math.trunc('123');	// 123


// Math.sign 判断一个数到底是正数，负数，还是零
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
Math.sign('foo'); // NaN
Math.sign();      // NaN
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};

// Math.cbrt 用于计算一个数的立方根
Math.cbrt(-1) // -1
Math.cbrt(2)  // 1.2599210498948734
Math.cbrt('8') // 2


// Math.hypot 方法返回所有参数的平方和的平方根
Math.hypot(3, 4);        // 5 => 3的平方加上4的平方，等于5的平方。
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3

// Math.signbit()
// 用来判断一个值的正负，但是如果参数是-0，它会返回-0。
Math.sign(-0) // -0
+0 === -0 // true
// Math.signbit(2) //false
// Math.signbit(-2) //true
// Math.signbit(0) //false
// Math.signbit(-0) //true

