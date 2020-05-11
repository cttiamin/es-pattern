
/***********************************
 * 
 * 环视(lookaround)
 *  环视只匹配文本中的特定位置
 * 
 * (?=) 肯定型顺序环视(positive lookahead)
 *    (?=\d) 如果当前位置右边的是数字则匹配成功
 *
 * (?<=) 肯定逆序环视 (从右向左), JavaScript 中不支持
 *    (?=<\d): 如果当前位置的左边有一位数字则匹配成功
 * 
 * (?!) 否定顺序环视 (Negative lookahead)
 *    要求接下来的字符不与p匹配.
 *    例: /Java(?!Script)([A-Z]\w*)/ 可匹配"JavaBeans"
 *    不能匹配"JavaScripter", "Javaness".
 * 
 * (?<!) 否定逆序环视
 **/


// 这里的 ? 和可选项的 ? 元字符没有任何联系
/([-+]?[0-9]+ (?:\.[0-9])?)([CF])$/;
// 这样做好处有2点:
// 1.避免不必要的捕获，提高了匹配效率
// 2.跟据选择合适的括号能够让程序更清晰


var str_1 = "by Jeffrey Friedl. This is Jeffs book, WhyJeffs at home, Jeffs is writing next book";

/(?=Jeffrey)/.test(str_1); // true
/(?=Jeffrey)Jeff/.test(str_1); // true
/Jeff(?=Jeffrey)/.test(str_1); // false

/(?=Jeffrey)Jeff/ == /Jeff(?=rey)/; //等价的


// Jeffs 替换为 Jeff's 几种办法:
// 1.
/Jeffs\/Jeff's/;
( str_1.replace(/Jeffs/g, 'Jeff\'s') );
// 2
/\bJeffs\b\/Jeff's/g;      // 加入单词分界符
(str_1.replace(/\bJeffs\b/g, 'Jeff\'s'));
// 3
/\b(Jeffs)(s)\b\/$1'$2/g;  // 更复杂的方式
(str_1.replace(/\b(Jeff)(s)\b/g, '$1\'$2'));
// 4
/\bJeff(?=s\b)\/Jeff'/g;       // 顺序环视
(str_1.replace(/\bJeff(?=s\b)/g, 'Jeff\''));

('yiminghes book'.replace(/(yiminghe)(?=s)/g, "$1'") )


var number = '1231,300';
// 匹配逗号 需满足 左边有数字，右边数字是 3位数字
/(?=(\d\d\d)+$)/;   // 右边
(/(?=(\d\d\d)+$)/.exec(number));
// 用 (?!\d) 来标记3位数字取代 \b 或 $
/(\d)(?=(\d\d\d)+(?!\d)) \/ $/g;


/([Jj]ava(?:[Ss]cript)?)\sis\s(fun\w*)/; // 不创建带数字编码的引用 
// 子表达式(?:[Ss]cript) 
// (?:) 仅仅用于分组, 不生成引用.


// 解析 URL 地址
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-\_A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var url = "http://www.or-_a.com:80/goodparts?q#fragment";
var result = parse_url.exec(url);
var names = ['url', 'scheme', 'slash', 'host', 'port',
  'path', 'query', 'hash'];
var i;
for (i = 0; i < names.length; i++ ){ // i += 1
  // console.log(names[i] + ':' , result[i]);
}


{
  var str = "bedroom";
  var reg = /^bed(?=room$)/g;
  var arr = reg.exec(str);
  var msg;
  if(arr){
    msg = arr + ' matching success!';
  }else{
    msg = " matching fail!<br>";
  }
  // console.log(msg)
}

('I\'m singing while you\'re dancing.'.match(/\b\w+(?=ing)/g) );
// => ['sing', 'danc']

('xyz abc zuc zabc 11'.match(/\b((?!abc)\w)/g));
// 匹配第一个字母, 除 abc
("z".match(/(?![acd])[a-z]/));  // =>z, \w=[a-z]

// 匹配 数字
var parse_number = function(num){
  (/^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i.test(num));
}
parse_number('1');  // true
parse_number('number'); // false
parse_number('98.6');   // true
parse_number('132.21.86.100'); // false
parse_number('123.45E-67'); // true
parse_number('123.45D-67'); // false