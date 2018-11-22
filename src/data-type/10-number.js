//  严格模式 strict mode
//  使用时在文档顶部加 "use strict"
//  支持此模式的浏览器: ie10+, firefox4+, Safari5.1+, Opera12+, Chrome
'use strict';

// =>Number.MAX_VALUE:最大值, 
// =>isFinite(): 能接受的最大值,最大整数.
// =>isNaN(): 非数字
// =>数值转换: Number 任何类型, 
// parseInt("String"): 转换为数字 
// parseFloat("String"): parse只适字符串
// toString(), String(): 转换为字符串:

// undefined : 保存变量
// null : 保存对象  alert(null == undefined);  //true

/********************************************************
 * Number 类型
 */
//十六进制, 前加0x, 大小写不限
//        var hexNum1 = 0xA;
//        var hexNum2 = 0x1f;

//e 表示法,
//        var floatNum = 3.125e7;  // 等于 3.125 * 10 000 000(7个零) =31250000
//        console.log(floatNum);

//数值范围
//        console.log(Number.MAX_VALUE);  //最大数
//        var result = Number.MAX_VALUE + Number.MAX_VALUE;
//        console.log(isFinite(result));

//NaN(Not a Number), 非数字,
//        console.log(isNaN(NaN));    //true
//        console.log(isNaN(10));     //false
//        console.log(isNaN("10"));   //false, 可以被转换成数值10
//        console.log(isNaN("blue"));    //true
//        console.log(isNaN(true));       //false

//数值转换
Number('hello world'); //NaN
Number(''); //0
Number('000011'); //11
Number(true); //1

//字符转数值,十,十六,八
//        console.log(parseInt("1234blue"));//1234
//        console.log(parseInt(""));  //NaN
//        console.log(parseInt("0xA"));      //10(十六)
//        console.log(parseInt(22.5));    //22
//        console.log(parseInt("070"));   //56    (八)
//        console.log(parseInt("70"));    //70    (十)
//        console.log(parseInt("0xf"));   //15    (十六)

//        console.log(parseInt("10", 16));  //当十六进制解析, 175
//        console.log(parseInt("AF", 16));  //当十六进制解析, 175
//        console.log(parseInt("10", 2));  //当二进制解析 , 2
//        console.log(parseInt("10", 8));  //当八进制解析 , 8
//        console.log(parseInt("10", 16));  //当十六进制解析, 16

//        console.parseFloat("22.34.5");  //22.34

/********************************************************
 Object类型
  Constructor : 该函数构造指针
  hasOwnProperty(propertyName): 检测属性在当前实例中是否存在
  isPrototypeOf(Object): 传入对象是否是另一个对象原型
  propertyIsEnumerable(propertyName): 检查给定属性是否能使用for-in语句来枚举
  toLocaleString();对象的字符串表示, 与执行环境的地区对应
  toString(): 对象的字符串表示
  valueOf(); 将对象转换为原始值, 数值, 布尔值, 与toString差不多
*/

/********************************************************
 * 位操作符
 * 二进制码,补码,反码
 */
//        var num = -18;
//        console.log(num.toString(2));   //输出二进制字符

//按位非(NOT), binary:反码
//        var num1 = 25;      //binary: 11001
//        var num2 = ~num1;  //binary: 00110
//        console.log(num2); //-26
//按位与(AND)
//        var result = 25 & 3;     //binary : 1 1001 AND 0 0011 = 0 0001
//        console.log(result);    //1
//按位或(OR)
//        var result = 25 | 3;     //binary : 1 1001 OR 0 0011 = 1 1011
//        console.log(result);    //27
//按位异或(XOR)
//        var result = 25 ^ 3;     //binary: 0 1001 XOR 0 0011 = 1 1010
//        console.log(result); //26

/********************************************************
 *  循环
 */
//        for(;;){//do some thing}  //无限循环

//输出window对象中
//        for (var propName in window) {
//            document.write(propName + "<br>");
//        }

/*
         with用法, 降低性能, 不易调试, 大项目不建议用
         * */
//        var qs = location.search.substring(1);
//        var hostname = location.hostname;
//        var url = location.href;
//
//        with (location) {
//            var qs = search.substring(1);
//            var hostname = hostname;
//            var url = href;
//        }

//        var name = "qunmeng";
//        var b = function () {
//            this.name = "laruence";
//            this.age = 24;
//        }
//        var p = new b();
//        //document.write()
//        with (document) {
//            write(name + "<br/>");
//            //b.name, b.age
//            with (p) {
//                write(age + "<br/>");
//                write(name);
//            }
//        }

////////////////////////////////////////////////
// JavaScript The Good Part
// Bad Part
'' == '0'; // false
0 == ''; // true
0 == '0'; // true

false == 'false'; //false
false == '0'; // true

false == undefined; // false
false == null; // false
null == undefined; // true

export function testData () {
  return 'testData';
}
