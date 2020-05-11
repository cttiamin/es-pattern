/**********************************************************
 * 
 * 正则表达式：regular expression
 * 
 * 述语:
 * regex: 正则
 * matching: 匹配
 * metacharacter: 元字符
 * metasequence: 元字符序列
 * escaped: 转义
 * flavor: 流派
 * subexpression: 子表达式
 * character: 字符
 * 
 * 两种字符构成：
 *    1.特殊字符(special characters)称为 => 元字符(metacharacters)
 *    2.其它为文字(literal)
 * 
 *  正则表达式中的直接量字符
 *    \d: 十进制数字
 *    \D: 表示任意一个非数字的字符
 *    \o: NUL字符
 *    \t: 空格
 *    \n: 制表符
 *    \v: 垂直制表符
 *    \f: 换页符
 *    \r: 回车符
 *    \b: 单词分界符
 *    \s: 空格回车等
 *
 *
 *   自定义原子表:
 *    []: 可以匹配方括号中的任何一个原子
 *    [-]: 可以匹配方括号中的一个范围
 *    [^]: 表示取反 例 ：[^1-6] 除了1到6 所有原子

 *
 * =>匹配模式  
 *    g (global): 全局
 *    i (case-insensitive): 不区分大小写
 *    m (multiline): 多行
 * 
 * =>元字符: ( [ { \ ^ $ | ) ? * + .} ]
 *   修饰原子, 不能单独出现
 *    ^ : 匹配输入字符串开始位置
 *    $ : 匹配输入字符串结束位置
 *    * : 0次或多次
 *    + : 1次或多次
 *    ? : 0次或1次,
 *    . : 除"\n"之外任何占位符(placeholder)
 *    \b: 单词边界
 *    \B: 非单词边界
 *    
 * 
 * 字符组：
 *  [ea] => sep[ea]r[ea]te: e或a
 * 字符组+元字符(charater-class metacharacter):
 *  -: 连字符 => [H1-6], [0-9] 需在字符组内部且不是第1位才成立
 *  ^: 取反=> q[^u] => q后没有u,
 *  .: 元字符=> 匹配任意字符的占位符(placeholder), 字符组外部才行
 *    /03[-./]19[-./]76/  = /03.19.76/, 
 *    在[-./]中的 . 不是元字符, 在字符组内定义不一样.
 *    -: 也不是连字符，因为它们都紧接在 [ 或者 ^ 之后。
 *    如果是 [.-/] 可表示连字符
  *  |: 或=> 多选分支 (alternative) => /grey|gray/, /gr(a|e)y/
 *    /gr[a|e]y/ 这里的"|"与普通字符一样
 * 
 * =>RegExp 实例属性  
 *    global : boolean, is set "g"
 *    ignoreCase : boolean, is set "i"
 *    lastIndex : int 开始搜索下一匹配项字符位置 start:0
 *    multiline : boolean , is set "m"
 *    source : 正则表达式的字符串表示, 按字面量形式
 * 
 * =>RegExp 实例方法
 *    exec(string): 返回 array/null, 第2次 exec 时从 lastIndex 开始检索
 *    test : 接收一个字符串参, 匹配的情况下返回 true
 *    toLocaleString: 返回表达式自面量
 *    toString
 * 
 *    search: 返回1个匹配的起始位置,找不到返回-1.不支全局检索g
 *    replace
 *    match: 返回结果组成的数组
 *    split
 *    
 *    
 *    index:  查找字符串中第一个成功匹配的开始位置
 *    lastIndex: 被查找字符串中下一次成功匹配的开始位置
 *    lastMatch: 任何正则表达式搜索过程中的最后匹配的字符
 *    lastParen: 任何正则表达式查找过程中最后括的子匹配
 *    leftContext: 开始位置到最后匹配之前的位置之间的字符
 *    rightContext: 最后一个匹配位置开始到字符串结尾之间的字符
 *    $1 - $9: 九个在模式匹配期间找到的、最近保存的部分
 *    input: 执行规范表述查找的字符串
 *****/

// var pattern2 = new RegExp("\\[bc\\]at", "i");
// 使用构造函数创建的, 构造的转义符是: \\

var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;

(pattern.global,  // true
pattern.ignoreCase, // true
pattern.lastIndex,  // 0
pattern.multiline,  // false
pattern.source) // "mom( and dad( and baby)?)?"

var matches  = pattern.exec(text);
(matches.index);   //0
(matches.input);   //"mom and dad and baby
(matches[0]);    //"mom and dad and baby
(matches[2]);    //and baby

var text1 = "cat, bat, sat, fat";
var pattern1 = /.at/;
var matches = pattern1.exec(text1);
(matches.index);  //0
(matches[0]);       //"cat"
(pattern1.lastIndex);//0


var text2 = "000-00-0000";
var pattern2 = /\d{3}-\d{2}-\d{4}/;
if(pattern2.test(text2)) {
  ("The pattern was matched.");
}

var pattern3 = new RegExp("\\[bc\\]at", "gi");
(pattern3.toString());       //"\\[bc\\]at"
(pattern3.toLocaleString());  //"\\[bc\\]at"

var text4 = "this has been a short summer";
var pattern4 = /(.)hort/g;
if (pattern4.test(text4)){
  (RegExp.input);          //=> this has been a short summer
  (RegExp.leftContext);    // => this has been a
  (RegExp.rightContext);   // => summer
  (RegExp.lastMatch);      // => short
  (RegExp.lastParen);      // =>s, 最后括的子匹配
  (RegExp.multiline);      // =>false, 是否多行模式
}

var text5 = "this has been a short summer";
var pattern5 = /(..)or(.)/g; // short

if (pattern5.test(text5)){
  (RegExp.$1);       //sh
  (RegExp.$2);       //t
}

///////////////////////////////////////////

"JavaScript".search(/script/i); //4
text.replace(/javascript/gi, "JavaScript");

// 一段引用文本起始于引导,结束于引号
//中间的内容区域不能包含引号
var quote = /"([^"]*)"/g;
// 用中文半角引号替换英文引号,同时要保持引号之间的内容(存
// 储在$1中)没有被修改
text.replace(quote, '“$1”');

"1 plus 2 equals 3".match(/\d+/g);  //=> ["1", "2", "3"]

var url = /(\w+):\/\/([\w.]+)\/(\S*)/;
var text = "Visit my blog at http://www.example.com/~david";
var result = text.match(url);
if (result != null) {
  var fullurl = result[0];  //包含"http://www.example.com/~david"
  var protocol = result[1];   //contain "http"
  var host = result[2];     //contain "www.example.com"
  var path = result[3];     //contain "~david"
}

"123,456,789".split(",");    // 返回["123","456","789"]
"1, 2, 3, 4, 5".split(/\s*,\s*/);   // 返回["1","2","3","4","5"]


var pattern = /Java/g;
var text = "JavaScript is more fun than Java!";
var result;
while( (result = pattern.exec(text)) != null ){
  ("Matched '" + result[0] + "'" +
  " at position " + result.index +
  "; next search begins at " + pattern.lastIndex);
}






