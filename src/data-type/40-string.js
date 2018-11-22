/*************************************************************
 * 20140324 Monday
 * 5.6 基本包装类型
 *  Boolean 类型:
 *  Number 类型 :
 *      toString() : 转换字符串
 *      toFixed() ;  小数格式化
 *      toExponential(1): 指数表示法,e表示法, 数格式化
 *      toPrecision() : 转换字符串
 *
 *  String 类型 :
 *      字符方法:
 *          charAt(int) : 返回指定位置字符串
 *          charCodeAt(int) : 返回指定位置的字符的 Unicode 编码(数值)
 *          fromCharCode: 接受一个指定的 Unicode 值，然后返回一个字符串
 *      字符操作方法:
 *          concat() :  多个字符串连接
 *          slice(startIndex, endIndex):  索引 3-7, 允许负数
 *          substr( +startIndex, len);  索引3开始, 留7位, 允许负数
 *          substring(+startIndex, +endIndex7): 索引 3-7, 不允许负数
 *      字符串位置方法
 *          indexOf() : 传入字母返回索引位置
 *          lastIndexOf() : 从后往前找
 *          trim() : 删除前后空格
 *      字符串大小写转换方法
 *          toLocaleUpperCase() :大写,  借签 java
 *          toLocaleLowerCase() :小写 借签 java
 *          toUpperCase():   大写,
 *          toLowerCase():   小写
 *      字符串的模式匹配方法
 *          match: 与RegExp.exect()相同,接受一个参数(正则表达式/RegExp对象)
 *          search:返回第一个匹配项的索引,return 1 or -1
 *          replace:替换
 *          split: 字符串分割成数组
 *          localCompare: 比较两个字符串,
 *
 *      encodeURI: 对URI编码,不会对 ":, /, ?, #" 编码
 *      encodeURIComponent: 对任何字符
 *      decodeURI: 解码
 *      dencodeURIComponent: 解码
 *
 *      eval: 使用非常危险，容易代码注入
 ***/

Function.prototype.method = function(name, func) {
  this.prototype[name] = func
  return this
}

// Boolean 类型
var falseObject = new Boolean(false) // 不推荐的方式
// typeof falseObject === object
// falseObject instanceof Boolean;   //true
var result1 = falseObject && true
// 表达式中是对 falseObject 而不是 falseObject 的值,
// falseObject 对象转换布尔值:true
// result1;  //=> true
var falseValue = false
// falseValue && true; // false

/*********************************
 *  Number 类型
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

/*********************************
 *  String
 */
var stringValue1 = 'hello world'
stringValue1.charAt(1) // e
stringValue1.charCodeAt(1) // 101
// fromCharCode
String.fromCharCode(104, 101, 108, 111) // hello
'A' === '\u0041' // true
'c' + 'a' + 't' === 'cat' // true

var stringValue2 = 'hello'
var result2 = stringValue2.concat(' world', '!')
// =>  "hello world!"

stringValue1.slice(3, 7) //=> "lo w", 索引 3-7
stringValue1.substring(3, 7) //=> "lo w", 索引 3-7
stringValue1.substr(3, 7) //=> "lo worl" , 索引3开始, 留7位

stringValue1.slice(-3)
//=> "rld"   (11+(-3)= 8) = slice(8)
stringValue1.substring(-3)
//=> "hello world"
stringValue1.substr(-3)
//=> "rld"   (11+(-3)= 8) = substr(8)

stringValue1.slice(3, -4)
//=> "lo w" (11+(-4)=7)
stringValue1.substring(3, -4)
//=> "hel", 不接受负数
stringValue1.substr(3, -4)
//"" , len = 负数

//字符串位置操作
//  位置操作, String.indexOf(), String.lastIndexOf()
stringValue1.indexOf('o', 6) // 7
stringValue1.lastIndexOf('o', 6) // 4 从后向前找

// 把"e"每次出现的位置记录在数组中
var stringValue2 = 'Long ipsum dolor sit amet, consectetur adipisicing elit'
var positions = new Array()
var pos = stringValue2.indexOf('e')
while (pos > -1) {
  positions.push(pos)
  pos = stringValue2.indexOf('e', pos + 1)
  // 从 pos+1开始查找
}
// output 输出记录的值
for (i = 0; i < positions.length; i++) {
  //    console.log(positions[i]);
}

// trim()
'   hello world   '.trim() // hello world

String.method('trim2', function() {
  return this.replace(/^\s+|\s+$/g, '')
})
'"' + '  neat  '.trim2() + '"' // => "neat"

// 大小写转换
stringValue1.toLocaleUpperCase() // HELLO WORLD
stringValue1.toUpperCase() // HELLO WORLD, by Java
stringValue1.toLocaleLowerCase() // hello world
stringValue1.toLowerCase() // hello world, by Java

// replace() ; // /at/g,  g:global,  全局
var text1 = 'cat, bat, sat, fat'
text1.replace('at', 'ond') // 没有g只替换一个
// "cond, bat, sat, fat"
text1.replace(/at/g, 'ond') // 有g替换全部
//"cond, bond, sond, fond"

//捕获组, $$, $&, $`, $', $n, $nn
//var text = "cat, bat, sat, fat";
text1.replace(/(.at)/g, 'word($1)') // 捕获组
//word (cat), word(bat), word(sat), word(fat)

/** 将 HTML 代码进行编码, 防Xss攻击
 * @param HTMLText
 * @returns :
 * @param match : 模式的匹配项, ,
 * @parma pos  :模式匹配项在字符中的位置
 * @parma oiginalText  : 原始字符串
 */
function htmlEscape(text) {
  return text.replace(/[<>"&]/g, function(match, pos, originalText) {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case '"':
        return '&quot;'
    }
  })
}
htmlEscape('<p class="greeting">Hello world!</p>')

//split: 字符转数组
var colorText1 = 'red,blue,green,yellow'
colorText1.split(',')
// ["red", "blue", "green", "yellow"]
colorText1.split(',', 2) // 包含两项
//["red", "blue"]
colorText1.split(/[^\,]+/) // ^: 匹配字符
//["", ",", ",", ",", ""]

var text2 = 'last,  first  ,middle'
text2.split(/\s*,\s*/)
// ["last", "first", "middle"]

text2.split(/\s*(,)\s*/)
// ["last", ",", "first", ",", "middle"]

// localeCompare : 参数其之前返回:1, 与相等返回:0, 在之后返回-1
var stringValue3 = 'yellow'
stringValue3.localeCompare('brick') //1
stringValue3.localeCompare('yellow') //0
stringValue3.localeCompare('zoo') //-1

//使用 localeCompare 的建议方式
function determineOrder(value) {
  var result = stringValue3.localeCompare(value)
  if (result < 0) {
    console.log("The string 'yellow' comes before the string " + value)
  } else if (result > 0) {
    console.log('The string yellow comes after the string ' + value)
  } else {
    console.log('The string yello comes equal to the string  ' + value)
  }
}
// determineOrder("brick");
// determineOrder("yellow");
// determineOrder("zoo");

// Good Parts: 23/12/2014
// ISO 8859-1 (Latin-1)  字符 => "实体名称" 转 "结果"
String.method(
  'deentityify',
  (function() {
    // The entity table. It maps entity names to characters.
    var entity = {
      quot: '"',
      lt: '<',
      gt: '>'
    }
    // Return the deentityify method
    return function() {
      // This is the deentityify method. It calls the string
      // replace method, looking for substrings that start
      // with '&' and end with ';'. If the characters in
      // between are in the entity table, then replace the
      // entity with the character from the table. It uses
      // a regular expression (Chapter 7)
      return this.replace(/&([^&;]+);/g, function(a, b) {
        var r = entity[b]
        return typeof r === 'string' ? r : a
      })
    }
  })()
)
'&lt;&quot;&gt;'.deentityify() // => <">

//  ISO 8859-1 (Latin-1)  字符 =>"结果" 转 "实体名称"
String.method(
  'entityify',
  (function() {
    var character = {
      '<': '&lt;',
      '<': '&gt;',
      '&': '&amp;',
      '"': '&quot;'
    }
    return function() {
      return this.replace(/[<>&"]/g, function(c) {
        return character[c]
      })
    }
  })()
)
'<&>'.entityify() // "&gt;&amp;undefined"

/////////////////////////////
//对uri编码,
var encodeUri = 'http://www.wrox.com/illegal value.htm#start'
encodeURI(encodeUri)
//"http://www.wrox.com/illegal%20value.htm#start"
encodeURIComponent(encodeUri)
//"http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start"

//对uri解码
var decodeUri = 'http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start'
decodeURI(decodeUri)
//http%3A%2F%2Fwww.wrox.com%2Fillegal value.htm%23start
decodeURIComponent(decodeUri)
//http://www.wrox.com/illegal value.htm#start

//eval(), 使用非常危险，容易代码注入
//eval(" console.log('hi') ");

// very danger
// eval("function sayHi(){alert('hi')}");
// sayHi();
