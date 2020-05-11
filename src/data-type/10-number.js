'use strict';

Number.MAX_VALUE; // 最大值
isFinite();       // 能接受的最大值,最大整数.
isNaN();          // 非数字
// 数值转换
parseInt('String');   // 转换为数字
// 转换为小数, parse 只适字符串
parseFloat('22.34.5'); // 22.34

// 转为价格格式 "123,123,123,123,123"
parseFloat('123123123123123').toLocaleString()

// 小数格式化
13.37.toFixed(1); // => 13.4"
// toExponential(1); // 指数表示法, e表示法, 数格式化
// toPrecision(); // 转换字符串

///////////////////////////
// es6:
Number.isInteger() // 是否 整数
Number.EPSILON
// 安全整数和 Number.isSafeInteger()
// 指数运算符

// 十六进制, 前加0x, 大小写不限
0xa, 0x1f;
// => 10 31

// e 表示法
var floatNum = 3.125e7;
// => 31250000   3.125*10 000 000(7个零)

// 数值范围
isFinite(Number.MAX_VALUE + Number.MAX_VALUE);
// false

// 非数字
isNaN(NaN); //true
isNaN(10); //false
isNaN('10'); //false, 可以被转换成数值10
isNaN('blue'); //true
isNaN(true); //false

// 数值转换
Number('hello world'); // NaN
Number(''); // 0
Number('000011'); // 11
Number(true); // 1

//字符转数值 二, 十, 十六, 八
parseInt('1234blue'); // 1234
parseInt('');         // NaN
parseInt('0xA');      // 10(十六)
parseInt(22.5);       // 22
parseInt('070');      // 56    (八)
parseInt('70');       // 70    (十)

parseInt('10', 2);  // 当二进制解析 , 2
parseInt('10', 8);  // 当八进制解析 , 8
parseInt('10', 16); // 当十六进制解析, 16

//es6
Number.parseInt('12.34');	  // 12
Number.parseInt('123.45#');	// 123.45

// Number() 转换比 parseInt 快很多, parseInt 解析而不是简单转换
// If string "08 hello" 只能用 parseInt

/*********
 *  toString() : 转换字符串
 *  toFixed() ; 小数格式化
 *  toExponential(1): 指数表示法,e表示法, 数格式化
 *  toPrecision() : 转换字符串
 **/
var num = 10
num.toString() // => "10"
num.toString(2) // => "1010"  二进制
num.toString(8) //"12"
num.toString(16) //"a"

//将数值格式化的方法
num.toFixed(2) //10.00, 保留两位小数
;(11.0005).toFixed(2) //10.001
num.toExponential(1) //1.0e+1

num.toPrecision(1) //1e+2
num.toPrecision(2) //"10"
num.toPrecision(4) //"10.00"

/////////////////
// 位操作符
// 二进制码, 补码, 反码
var num = -18;
num.toString(2) // => -10010 输出二进制字符

// 按位非(NOT), binary:反码
var num1 = 25;      // binary: 11001
var num2 = ~num1;   // binary: 00110 
// => -26

// 按位与(AND)
// binary : 1 1001 AND 0 0011 = 0 0001
25 & 3;    // 1

// 按位或(OR)
// binary : 1 1001 OR 0 0011 = 1 1011
25 | 3;   // 27

// 按位异或(XOR)
// binary: 0 1001 XOR 0 0011 = 1 1010
25 ^ 3; // 26

0 == '';   // true
0 == '0';  // true

false == 'false'; // false
false == '0';     // true

false == undefined; // false
false == null;      // false
null == undefined;  // true


//////////////////////////////////////////////////
// ES6

///////////////////////////
// Number.isInteger() 是否是整数
Number.isInteger(25);	  // true
Number.isInteger(25.0); // true
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
})
// (this);



///////////////////////////
// Number.EPSILON
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON;
}
withinErrorMargin(0.1 + 0.2, 0.3)
// true
withinErrorMargin(0.2 + 0.2, 0.3);
// false

///////////////////////////
// 安全整数和 Number.isSafeInteger()
// es5 数值控制范围在 -2^53 到 2^53 之间
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

//////////////////////////
// 指数运算符
2 ** 2 // 4
2 ** 3 // 8

let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;