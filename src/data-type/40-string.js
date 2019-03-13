// 20140324 Monday
// String 类型
//   字符方法:
//       charAt(int) : 返回指定位置字符串
//       charCodeAt(int) : 返回指定位置的字符的 Unicode 编码(数值)
//       fromCharCode: 接受 Unicode 值，然后返回一个字符串
//   字符操作方法:
//       concat:  多个字符串连接
//       slice(startIndex, endIndex):  索引 3-7, 允许负数
//       substr( +startIndex, len):  索引3开始, 留7位, 允许负数
//       substring(+startIndex, +endIndex7): 索引 3-7, 不允许负数
//   字符串位置方法
//       indexOf(): 传入字母返回索引位置
//       lastIndexOf(): 从后往前找
//       trim(): 删除前后空格
//   字符串大小写转换方法
//       toLocaleUpperCase() :大写,  借签 java
//       toLocaleLowerCase() :小写 借签 java
//       toUpperCase():   大写,
//       toLowerCase():   小写
//   字符串的模式匹配方法
//       match: 与RegExp.exect()相同,接受一个参数(正则表达式/RegExp对象)
//       search:返回第一个匹配项的索引,return 1 or -1
//       replace:替换
//       split: 字符串分割成数组
//
//   encodeURI: 对URI编码,不会对 ":, /, ?, #" 编码
//   encodeURIComponent: 对任何字符
//   decodeURI: 解码
//   dencodeURIComponent: 解码
//   eval: 使用非常危险，容易代码注入
//
///////////////////////////////////
//
//  es6 stirng 扩展
//    codePointAt
//    String.fromCodePoint
//    字符串的遍历器接口
//    at()
//    normalize()
//    include:是否包含, startsWith:是否在头部, endsWidth
//    repeat()
//    padStart 向前补, padEnd 向后补
//    模块字符串
//    实例：模板编译
//    标签模板
//    String.raw
//    模块字符串的限制

var stringValue1 = 'hello world';
stringValue1.charAt(1); // e
stringValue1.charCodeAt(1); // 101
'𠮷a'.codePointAt(0); // 134071
'𠮷a'.codePointAt(1); // 57271
String.fromCharCode(104, 101, 108, 111); // hello
String.fromCodePoint('0x20bb7'); //𠮷
'A' === '\u0041'; // true
'c' + 'a' + 't' === 'cat'; // true
'hello'.concat(' world', '!');
// =>  "hello world!"

stringValue1.slice(3, 7); //=> "lo w", 索引 3-7
stringValue1.substring(3, 7); //=> "lo w", 索引 3-7
stringValue1.substr(3, 7); //=> "lo worl" , 索引3开始, 留7位
stringValue1.slice(-3);
//=> "rld"   (11+(-3)= 8) = slice(8)
stringValue1.substring(-3);
//=> "hello world"
stringValue1.substr(-3);
//=> "rld"   (11+(-3)= 8) = substr(8)
stringValue1.slice(3, -4);
//=> "lo w" (11+(-4)=7)
stringValue1.substring(3, -4);
//=> "hel", 不接受负数
stringValue1.substr(3, -4);
//"" , len = 负数

stringValue1.indexOf('o', 6);     // 7
stringValue1.lastIndexOf('o', 6); // 4 从后向前找
// ('abc'.at(0));  // a
// ('吉'.at(0));	 // 吉
'string'.includes('c');     // false
'string'.startsWith('str'); // true
'string'.endsWith('ng');    // true
'x'.repeat(3);  // xxx
'na'.repeat(0); // ''
'x'.padStart(5, 'ab'); // ababx
'x'.padEnd(4, 'ab');   // xaba
String.raw`Hi\n${2 + 3}`
// "Hi\\n5"
String.raw`Hi\u000A!` //Hi\u000A!

// es5: 字符串遍历
let str = '\u{20bb7}abc';
for (let i = 0; i < str.length; i++) {
  // console.log('es5', str[i]) // 乱码 a b c
}
// es6: of 遍历
for (let code of str) {
  code; // 𠮷 a b c
}

// 把 "e" 每次出现的位置记录在数组中
var stringValue2 = 'Long ipsum dolor sit amet, consectetur adipisicing elit';
var positions = new Array();
var pos = stringValue2.indexOf('e');
while (pos > -1) {
  positions.push(pos);
  pos = stringValue2.indexOf('e', pos + 1);
  // 从 pos+1开始查找
}
// output 输出记录的值
for (var i = 0; i < positions.length; i++) {
  positions[i];
}

// trim
'   hello world   '.trim(); // hello world
'"' + '  neat  '.replace(/^\s+|\s+$/g, '');
// => "neat"

// 大小写转换
stringValue1.toLocaleUpperCase(); // HELLO WORLD
stringValue1.toUpperCase(); // HELLO WORLD, by Java
stringValue1.toLocaleLowerCase(); // hello world
stringValue1.toLowerCase(); // hello world, by Java

// replace
var text1 = 'cat, bat, sat, fat';
text1.replace('at', 'ond'); // 替换一个
// "cond, bat, sat, fat"
text1.replace(/at/g, 'ond'); // 有g替换全部
//"cond, bond, sond, fond"
text1.replace(/(.at)/g, 'word $1');
// word (cat), word(bat), word(sat), word(fat)

// split: 字符转数组
var colorText1 = 'red,blue,green,yellow';
colorText1.split(',');
// ["red", "blue", "green", "yellow"]
colorText1.split(',', 2); // 包含两项
//["red", "blue"]
colorText1.split(/[^\,]+/); // ^: 匹配字符
//["", ",", ",", ",", ""]
var text2 = 'last,  first  ,middle';
text2.split(/\s*,\s*/);
// ["last", "first", "middle"]
text2.split(/\s*(,)\s*/);
// ["last", ",", "first", ",", "middle"]

// uri 编码
encodeURI('http://www.wrox.com/illegal/value.htm#start');
// "http://www.wrox.com/illegal/value.htm#start"
encodeURIComponent('http://www.wrox.com/illegal/value.htm#start');
// "http%3A%2F%2Fwww.wrox.com%2Fillegal%2Fvalue.htm%23start"
// Uri解码
decodeURI("http%3A%2F%2Fwww.wrox.com%2Fillegal%2Fvalue.htm%23start");
// "http%3A%2F%2Fwww.wrox.com%2Fillegal%2Fvalue.htm%23start"
decodeURIComponent("http%3A%2F%2Fwww.wrox.com%2Fillegal%2Fvalue.htm%23start");
// "http://www.wrox.com/illegal/value.htm#start"


// 模板标签
var x1 = 1;
var y1 = 2;
`${x1} + ${y1} = ${x1 + y1}`;


///////////////////////////////////
// HTML标签编码
// deentityify 解码
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

/** 将 HTML 代码进行编码, 防 Xss 攻击
 * @param HTMLText
 * @returns
 * @param match: 模式的匹配项
 * @parma pos:  模式匹配项在字符中的位置
 * @parma oiginalText  : 原始字符串
 */
function htmlEscape(text) {
  return text.replace(/[<>"&]/g, function(match, pos, originalText) {
    switch (match) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '"':
        return '&quot;';
    }
  });
}
htmlEscape('<p class="greeting">Hello world!</p>')
// &lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;

// Good Parts: 23/12/2014
// ISO 8859-1 (Latin-1)  字符 => "实体名称" 转 "结果"
String.method('deentityify', (function() {
  // The entity table. It maps entity names to characters.
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };
  // Return the deentityify method
  return function() {
    // This is the deentityify method. It calls the string
    // replace method, looking for substrings that start
    // with '&' and end with ';'. If the characters in
    // between are in the entity table, then replace the
    // entity with the character from the table. It uses
    // a regular expression (Chapter 7)
    return this.replace(/&([^&;]+);/g, function(a, b) {
      var r = entity[b];
      return typeof r === 'string' ? r : a;
    });
  };
})()
);
'&lt;&quot;&gt;'.deentityify(); // => <">

//  ISO 8859-1 (Latin-1)  字符 =>"结果" 转 "实体名称"
String.method('entityify', (function() {
  var character = {
    '<': '&lt;',
    '<': '&gt;',
    '&': '&amp;',
    '"': '&quot;'
  };
  return function() {
    return this.replace(/[<>&"]/g, function(c) {
      return character[c];
    });
  };
})()
);
'<&>'.entityify(); // "&gt;&amp;undefined"


// es6
function SaverHTML(templateData) {
  var s = templateData[0]
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i])

    s += arg
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    s += templateData[i]
  }
  return s
}
var sender = '<script>alert("abc")</script>' //
var message = SaverHTML`<p>${sender} has sent you a message.</p>`;
// console.log(message);

String.raw2 = function(strings, ...values) {
  var output = ''
  for (var index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index]
  }

  output += strings.raw[index]
  return output
}
// String.raw2`H1\u000A!`;
String.raw2({ raw: 'test' }, 0, 1, 2)
String.raw2({ raw: ['t', 'e', 's', 't'] }, 0, 1, 2)


