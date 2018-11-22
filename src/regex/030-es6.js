/**
1.RegExp构造函数
2.字符串的正则方法
3.u 修饰符
4.y 修饰符
5.sticky 属性
6.flags 属性 
7.RegExp.escape()
8.s 修饰符：dotAll模式
9.后行断言
10.Unicode 属性类
*/

var regex1 = new RegExp('xyz', 'i');
// uqual
var regex2 = /xyz/i;

// es6
var regex3 = new RegExp(/abc/ig, 'i').flags;
//i



{
  // 3.u 修饰符
  console.log('u修饰符',/^\uD83D/.test('\uD83D\uDC2A'));  // true
  console.log('u修饰符',/^\uD83D/u.test('\uD83D\uDC2A')); // false
  // 大括号表示Unicode字符，只有加上u才能识别
  console.log(/\u{61}/.test('a')); // false
  console.log(/\u{61}/u.test('a')); // true
  console.log(/\u{20BB7}/u.test('𠮷')); // true
  // 点（.）字符不能识别码点大于0xFFFF的Unicode字符，必须加上u修饰符。
  let s = '𠮷';
  console.log('大于0xFFFF的Unicode字符',/^.$/.test(s)); // false
  console.log('使用u字符',/^.$/u.test(s)); // true

  // 使用u修饰符后，所有量词都会正确识别大于码点大于 0xFFFF 的 Unicode 字符。
  console.log('量词',/a{2}/.test('aa')); // true
  console.log('量词',/a{2}/u.test('aa')); // true
  console.log('量词',/𠮷{2}/.test('𠮷𠮷')); // false
  console.log('量词',/𠮷{2}/u.test('𠮷𠮷')); // true
}



// 4.y 修饰符
// “粘连”的涵义

var s1 = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

// console.log(r1.exec(s1)); // => ["aaa"]
// console.log(r2.exec(s1)); // => ['aaa']

// console.log(r1.exec(s1)); // => ['aa']
// console.log(r2.exec(s1)); // => null

var r3 = /a+_/y;
// console.log(r3.exec(s1)); // ['aaa_']
// console.log(r3.exec(s1)); // ['aa_']


////////////////////////////////
// lastIndex 属性,更好的说明 y 修饰符
// y: 隐含了 头匹配的标志 ^ 
const REGEX = /a/g;
// 指定从2号位置y 开始匹配
REGEX.lastIndex = 2;
// 匹配成功
const match = REGEX.exec('xaya');
// 在3号位置匹配成功
// console.log(match.index); // => 3
REGEX.lastIndex;	// => 4
// 4号位置匹配失败
REGEX.exec('xaxa'); // null


const REGEX2 = /a/y;
REGEX.lastIndex = 2;
//不是粘连，匹配失败
REGEX.exec('xaya');	//null
//指定从3号位置开始匹配
REGEX.lastIndex = 3;
// 3号位置是粘连，匹配成功
const match2 = REGEX.exec('xaxa');
match2.index; // => 3
REGEX.lastIndex;	// => 4


/b/y.exec('aba'); //null

////////////////
// split 

// 没有找到
'x##'.split(/#/y); // => ['x##']
// 找到两个匹配
'##y'.split(/#/y); // => ['', '', 'x']


////////////////
// replace

const REGEX3 = /a/gy;
'aaxa'.replace(REGEX3, '-');	// => '--xa'

// 单单一个y 只能返回第一个匹配，必须与g 修饰符联用
'a1a2a3'.match(/a\d/y);	// => ['a1']
'a1a2a3'.match(/a\c/gy); // => ['a1', 'a2', 'a3']


////////////////////////
// 5.sticky 属性
// 是否设置了y 属性
var r = /hello\d/y;
r.sticky;	// => true


////////////////////////

//返回正则表达式的修饰符// 6.flags 属性

//es5 source
/abc/ig.source;	// => 'abc'

// es6 flags
/abc/ig.flags;	// => 'gi'


////////////////////////
// 7.RegExp.escape()
// 

function escapeRegExp(str){
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

let str7 = '/path/to/resource.html?search=query';
escapeRegExp(str7);
// "\/path\/to\/resource\.html\?search=query"


////////////////////////
// s 修饰符：dotAll 模式
// 修补 . 不能匹配 /r, /n
/foo.bar/.test('foo\nbar');	// => false
/foo[^]bar/.test('foo\nbar'); // => true

// /foo.bar/s.test('foo\nbar'); // => true

// const re7 = /foo.bar/s;
//另一种写法
// const re = new RegExp('foo.bar', 's');
// re7.test('foo\nbar');	// => true
// re7.doAll;	// => true
// re7.flags;	// 's'


////////////////////////
//9.后行断言

// 先行断言
/\d+(?=%)/.exec('100% of US presidents have been male');
// ['100']
/\d+(?!%)/.exec('that`s all 44 of them');
//['44']

// 后行断言
// /(?<=y)x/ : 只有 x 在 y 后后才匹配
// 后行否定 /(?<!y)x/ : 

// /(?<=(\d+)(\d+))$/.exec('1053');

// /(?<=(\d+)(\d+))$/.exec('1053') // ["", "1", "053"]
// /^(\d+)(\d+)$/.exec('1053') // ["1053", "105", "3"]

// /(?<=(o)d\1)r/.exec('hodor')  // null
// /(?<=\1d(o))r/.exec('hodor')  // ["r", "o"]






