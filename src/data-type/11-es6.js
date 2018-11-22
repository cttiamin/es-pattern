  ///////////////////////////
// 1.二进制和八进制表示法
// 2.Number.isFinite(), Number.isNaN()
// 3.Number.parseInt(), Number.parseFloat()
// 4.Number.isInteger() 是否 整数
// 5.Number.EPSILON
// 6.安全整数和Number.isSafeInteger()
// 7.Math对象的扩展
// 8.Math.signbit()
// 9.指数运算符


///////////////////////////
// 2.Number.isFinite(), Number.isNaN()
isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false


///////////////////////////
// 3.Number.parseInt(), Number.parseFloat()
//es5
parseInt('12.34');	//12
parseInt('123.45');	//123.45
//es6
Number.parseInt('12.34');	//12
Number.parseInt('123.45#');	//123.45


///////////////////////////
// 4.Number.isInteger()
// 是否是整数
Number.isInteger(25);	//true
Number.isInteger(25.0);//true
// Number.isInteget(25.1);	// => false
Number.isInteger("15"); // => false

// es5 实现 Number.isInteger()
(function(global){
	var floor = Math.floor,
	isFinte = global.isFinte;

	Object.defineProperty(Number, 'isInteger', {
		value: function isInteger(value){
			return typeof value === 'number' && isFinite(value) 
			&& value > -9007199254740992 && value < 9007199254740992 
			&& floor(value) === value;
		},
		configurable: true,
	    enumerable: false,
	    writable: true
	})
})(this);

///////////////////////////
// 5.Number.EPSILON
// 
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON;
}
withinErrorMargin(0.1 + 0.2, 0.3)
// true
withinErrorMargin(0.2 + 0.2, 0.3);
// false


///////////////////////////
// 6.安全整数和Number.isSafeInteger()
// es5 数值控制范围在 -2^53 到 2^53 之间
// 

Math.pow(2, 53); // => 9007199254740992

// ES6 表示这个范围的上下限
// Number.MAX_SAFE_INTEGER
// Number.MIN_SAFE_INTEGER

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1;
// true
Number.MAX_SAFE_INTEGER === 9007199254740992;
// true

Number.MIN_SAFT_INTEGER === -Number.MAX_SAFE_INTEGER
// TRUE
Number.MIN_SAFT_INTEGER === -9007199254740991
// true


Number.isSafeInteger('a');	//false
Number.isSafeInteger(null); //false





///////////////////////////
// 7.Math对象的扩展

// Math.trunc 
// 去除小数部分， 返回整数部分
Math.trunc(4.1);	// => 4
Math.trunc(4.9);	// => 4 
Math.trunc(-4.1);	// => -4 
Math.trunc(-4.9);	// => -4 
Math.trunc(-0.1234);	//	=>0

Math.trunc('123');	// 123


// Math.sign()
// 判断一个数到底是正数，负数，还是零
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


// Math.cbrt
// 用于计算一个数的立方根

Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734

Math.cbrt('8') // 2
Math.cbrt('hello') // NaN


// Math.hypot
// 方法返回所有参数的平方和的平方根
Math.hypot(3, 4);        // 5 => 3的平方加上4的平方，等于5的平方。
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3



//////////////////////////
// 8.Math.signbit()
// 用来判断一个值的正负，但是如果参数是-0，它会返回-0。

Math.sign(-0) // -0
+0 === -0 // true
Math.signbit(2) //false
Math.signbit(-2) //true
Math.signbit(0) //false
Math.signbit(-0) //true


//////////////////////////
// 9.指数运算符
2 ** 2 // 4
2 ** 3 // 8

let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;








