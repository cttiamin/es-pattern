/**********************************************************
 * Chapter 5, 引用类型　20140321, Friday
 * 5.4 RegExp 类型：正则
 * 
 * =>原子:
 *
 *  正则表达式中的直接量字符
 *      \d: 十进制数字
 *      \D: 表示任意一个非数字的字符
 *      \o: NUL字符
 *      \t: 空格
 *      \n: 制表符
 *      \v: 垂直制表符
 *      \f: 换页符
 *      \r: 回车符
 *      \xnn    由十六进制数nn指定的拉丁字符
 *      \uxxxx  由十六进制数xxxx指定的Unicode字符,
 *      \cX     控制字符^X, 例如,\cJ等价于换行符
 *      \b      单词分界符
 *
 *
 *   自定义原子表:
 *      []: 可以匹配方括号中的任何一个原子
 *      [-]: 可以匹配方括号中的一个范围
 *      [^]: 表示取反 例 ：[^1-6] 除了1到6 所有原子

 *
 * =>匹配模式:g (global):全局,
 *            i (case-insensitive):不区分大小写 ,
 *            m (multiline):多行
 * =>元字符: ( [ { \ ^ $ | ) ? * + .} ]
 *   修饰原子的, 不能单独出现.
 *      ^ : 匹配输入字符串开始位置
 *      $ : 匹配输入字符串结束位置
 *      * : 零次或多次
 *      + : 一次或多次
 *      ? : 零次或一次,
 *      . : 除"\n"之外的 任何单个字符
 *
 * =>RegExp 实例属性  
 *      global : boolean, is set "g"
 *      ignoreCase : boolean, is set "i"
 *      lastIndex : int, 开始搜索下一匹配项字符位置, start:0
 *      multiline : boolean , is set "m"
 *      source : 正则表达式的字符串表示, 按字面量形式
 * =>RegExp 实例方法  
 *      exec(): 
 *      test():
 *      toLocaleString(), 
 *      toString()
 *************************************************************/

// var pattern1 = /\[bc\]at/i;
// 直接量表示, 匹配一个[bat]不区分大小写, //:边界

// var pattern2 = new RegExp("\\[bc\\]at", "i");
// 使用构造函数创建的, 构造的转义符是: \\

/****************************
 * RegExp 实例属性
 *
 * global : boolean, is set "g"
 * ignoreCase : boolean, is set "i"
 * lastIndex : 下次搜索匹配项字符索引位置
 * multiline : boolean , is set "m"
 * source : 正则表达式的字符串表示, 按字面量形式
 ****************************/
var pattern1 = /\[bc\]at/i;
(pattern1.global);     // false
(pattern1.ignoreCase); // true
(pattern1.lastIndex);  // false
(pattern1.multiline);  // 0
(pattern1.source);     //"\[bc\]at"

/****************************
 * RegExp 145 Properties:
 * RegExp.index: 查找字符串中第一个成功匹配的开始位置.
 * RegExp.lastIndex: 被查找字符串中下一次成功匹配的开始位置
 * RegExp.lastMatch: 任何正则表达式搜索过程中的最后匹配的字符
 * RegExp.lastParen: 任何正则表达式查找过程中最后括的子匹配
 * RegExp.leftContext: 被查找的字符串中从字符串开始位置到最后
 *                      匹配之前的位置之间的字符
 * RegExp.rightContext: 被搜索的字符串中从最后一个匹配位置开始
 *                      到字符串结尾之间的字符
 * RegExp.$1 - $9: 九个在模式匹配期间找到的、最近保存的部分
 * RegExp.input: 执行规范表述查找的字符串
 *
 * RegExp.exec() :
 * @return {Array[input(正则表达式字符串), index(current 位置)]/null}
 * @parameter {String}
 *
 */

var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;
var matches  = pattern.exec(text);
(matches.index); //0
(matches.input);   //"mom and dad and baby
(matches[0]);    //"mom and dad and baby
(matches[1]);    //and dad and baby
(matches[2]);    //and baby

var text = "cat, bat, sat, fat";
var pattern1 = /.at/;
var matches = pattern1.exec(text);
(matches.index);    //0
(matches[0]);       //"cat"
(pattern1.lastIndex);//0

var pattern2 = /.at/g;    //全局模式
var matches = pattern2.exec(text);
(matches.index);    //0
(matches[0]);       //"cat"
(pattern2.lastIndex);//3

matches = pattern2.exec(text);  //全局模式 exec()后 返回下一个匹配项
(matches.index);     //5
(matches[0]);        //"bat"
(pattern2.lastIndex);//8

///////////////////////////////////////////////////////////
// JavaScript The Good Part
// Monday 5/1/2015
//
var text = '<html><body bgcolor=linen><p>' + 
'This is <b>bold<\/b>!<\/p><\/body><\/html>';
var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
var a, i;
while((a = tags.exec(text) )){
    for(i = 0; i < a.length; i += 1){
        // console.log(('// [' + i + '] ' + a[i]).entityify());
    }
}


/****************************
 * RegExp.test()
 *
 * 接收一个字符串参数,在模式与该参数匹配的情况下返回true
 * @type {string}
 * toLocaleString() 
 * toString() 返回表达式自面量
 */
var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;
if(pattern.test(text)){
    ("The pattern was matched.");
}

//toLocaleString(), toString返回表达式自面量
var pattern = new RegExp("\\[bc\\]at", "gi");
(pattern.toString());       //"\\[bc\\]at"
(pattern.toLocaleString());  //"\\[bc\\]at"

/****************************
 * RegExp 构造函数属性:
 *      multiline: 是否多行模式
 * Note: Opera doesn't support input, lastMatch, lastParen, or multiline.
 * Internet Explorer doesn't support multiline.
 */
var text = "this has been a short summer";
var pattern = /(.)hort/g;
if (pattern.test(text)){
    (RegExp.input);          //=> this has been a short summer
    (RegExp.leftContext);         // => this has been a
    (RegExp.rightContext);        // => summer
    (RegExp.lastMatch);           // => short
    (RegExp.lastParen);           // =>s, 最后括的子匹配
    (RegExp.multiline);           // =>false, 是否多行模式
}

/****************************
 * RegExp.$1, 
 * RegExp.$2 ... RegExp$9
 * 9个用于存储捕获组的构造函数属性
 */
var text = "this has been a short summer";
var pattern = /(..)or(.)/g;

if (pattern.test(text)){
    (RegExp.$1);       //sh
    (RegExp.$2);       //t
}

/****************************
 * 模式的局限性
 * 不支持的的特性,
 */

/**********************************************************************
 * JavaScript 权威指南
 * Chapter 10 正则表达式的模式匹配
 *      文本模式
 *      String 方法
 *      RegExp 方法
 *  10.1 正则表达式的定义
 *  10.2 用于模式匹配的string方法
 *  10.3 regexp对象
 */

var pattern = /s$/; //用直接量
var pattern = new RegExp("s$"); //用构造


/**********************************
 * 10.1.4 选择,分组和引用
 *
 * /ab|cd|ef/ 可用字符串"ab",也可以匹配字符串"cd",还可以匹配字符串"ef".
 * /\d{3}|[a-z]{4}/ : 匹配3位数字或四个小写字母
 * 圆括号有两个作用, 其一:把单独的项组合成了子表达式
 * /java(script)?/: 可以匹配字符串java,其后"script"可有可无
 * /(ab|cd)+|ef/ :可以匹配字符串"ef",也可以匹配字符串"ab"或"cd"
 * 其二: 在完整的模式中定义子模式.
 * /[a-z]+\d+/
 * (/[a-z]+(\d+)/) : 将模式的数字部分放在括号中,就可检索到匹配中抽取数字了,
 * 其三: 允许在同一正则表达式后部引用前面的子表达式
 * /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/ 其中 \1:([Jj]ava), \2:[Ss]cript,
 *
 * 与那个模式相匹配的文本的引用,
 * /['"][^'"]*['"]/ : 匹配单引号和双引号之内的0个或多个字符
 * /(['"])[^'"]*\1/ : 使用左侧的括号
 * /(['"])[^/1]*\1/ : 非法写法, 正则表达式不允许用双引号括起内容中有单引号.
 *
 *
 * /([Jj]ava(?:[Ss]cript)?)\sis\s(fun\w*)/ : 不创建带数字编码的引用 
 *  子表达式(?:[Ss]cript) :
 *      (?:) 仅仅用于分组,不生成引用.
 *
 *  表10-4 正则表达式的选择,分组和引用字符
 *  |: 选择, 匹配的是该符号左边的子表达式或右边的
 *  (...): 组合, 将几个项组合为一个单元, 这个单元可以通过"*"
 *      , "+", "?"和"|" 等符号加以修饰.
 *  (?:...) : 只组合, 把项组合到一个单元, 但不记忆与该组相匹
 *      配的字符.
 *  \n : 和第n个分组第一次匹配的字符相匹配, 组是圆括号中的子
 *      表达式(也有可能是嵌套的), 组索引是从左到右的左括号数
 *      , "(?:" 形式的分组不编码.
 *
 *  10.1.5 指定匹配位置
 *      锚元素:
 *      ^: 字符串开始,
 *      $: 字符串结束
 *      \b: 单词边界
 *      \B: 非单词边界
 *
 *      (?=p) : 零宽正向先行断言, 要求接下来的字符都与p匹配,
 *          但不能包括匹配p的那些字符.
 *              如/[Jj]ava([Ss]cript)?(?=\:)/ 可匹配"JavaScri-
 *              pt: The Definitive"中的"JavaScript",但不能匹配
 *              "Java in a Nutshell"中的"Java".因为后没有":"
 *                      
 *      (?!p) : 零宽负向先行断言，要求接下来的字符不与p匹配.
 *          例:/Java(?!Script)([A-Z]\w*)/可匹配"JavaBeans",
 *          但不能匹配"JavaScripter", "Javaness".
 *
 *  /^JavaScript$/ : 匹配"JavaScript"
 *  /\s\Javas/ : 匹配前后都有空格的 java,问题1:前后其一没有空格,
 *  /\bJava\b/ ; \b 单词边界
 *  /\B[Ss]cript/:  \B 非单词边界，
 *  /[Jj]ava([Ss]cript)?(?=\:)/ :
 *  /Java(?! Script)([A-Z]\w*)/
 *
 * 10.1.6 修饰符
 *  i, g, m
 *
 * 10.2 用于模式匹配的String方法
 *  String 支持４种使用正则表达式的方法
 *      search()    : 返回匹配位置
 *      replace()   : 检索与替换
 *              $$          $
 *              $&          The matched text 
 *              $number     Capture group text
 *              $`          The text preceding the match
 *              $'          The text following the match
 *      match() :　将包含查找的结果作为数组返回。
*      split() : 将一个字符串分割为子字符串，将结果作为数组返回
***/

/**********
 *  search(): 参数是正则表达式,返回一个与之匹配的子串的起始位置,如果找不
 *  到匹配的子串.返回-1.不支全局检索,忽略正则表达式参数中的修饰符g
 *  "JavaScript".search(/script/i); //4
 ***/

/**********
 *  replace() :
 *  将所有不区分大小写的javascript都替换成大小写正确的JavaScript
 */
text.replace(/javascript/gi, "JavaScript");


// 一段引用文本起始于引导,结束于引号
//中间的内容区域不能包含引号
var quote = /"([^"]*)"/g;
// 用中文半角引号替换英文引号,同时要保持引号之间的内容(存
// 储在$1中)没有被修改
text.replace(quote, '“$1”');

/*******************
 *  match() :
 *  返回结果组成的数组=>  例:
 *  "1 plus 2 equals 3".match(/\d+/g);  //=> ["1", "2", "3"]
 *
 */

var url = /(\w+):\/\/([\w.]+)\/(\S*)/;
var text = "Visit my blog at http://www.example.com/~david";
var result = text.match(url);
if (result != null) {
    var fullurl = result[0];    //包含"http://www.example.com/~david"
    var protocol = result[1];   //contain "http"
    var host = result[2];       //contain "www.example.com"
    var path = result[3];       //contain "~david"
}

/**
 * split()
 * "123,456,789".split(",");    //返回["123","456","789"]
 */
"1, 2, 3, 4, 5".split(/\s*,\s*/);   //返回["1","2","3","4","5"]
// 去除空白

/**
 * 10.3 RegExp 对象
 *  构造 : RegExp("\\", "修饰符")
 *      //全局匹配字符串中的5个数字,注意这里使用了"\\",而不是"\"
 *      var zipcode = new RegExp("\\d{5}", "g");
 *
 * 10.3.1 RegExp的属性
 *  source: 包含则表达式的文本
 *  global: 是否带有修饰符 g
 *  ignoreCase: 是否带有 修饰符 i
 *  multiline: 是否带有 修饰符 m
 *  lastIndex : 可读写, 如是匹配模式带有g修饰符,这个属性
 *       存储在整个字符串下一次检索
 *       的开始位置,这个属性会被exec()和texst()方法用到
 *
 * 10.3.2 RegExp 的方法
 *  RegExp 对象定义了两个用于执行模式匹配操作的方法: exec(),test()
 *  
 *   exec(): 与match相似,指定字符串执行一个正则表达式,就是
 *       在一个字符串中执行检索.返回数组,没有匹配返回null.
 *
 *   index: 包含了发生匹配的字符位置,与match()不同,不管
 *       是否使用g,exec()都返回一样的数组.第二次调exec()时从
 *       lastIndex开始检索
 */

var pattern = /Java/g;
var text = "JavaScript is more fun than Java!";
var result;
while( (result = pattern.exec(text)) != null ){
    ("Matched '" + result[0] + "'" +
     " at position " + result.index +
     "; next search begins at " + pattern.lastIndex);
}

/**
 *   test() :
 *   参数是字符串,如果包含正则表达式的一个匹配结果,
 *   则返回true使用test()与使用exec()一样,匹配结果后立即
 *   设置lastIndex为当前匹配子串的结束
 */
var pattern = /java/i;
pattern.test("JavaScript"); //返回 true


//////////////////////////////////////////////////
// JavaScript The Good Part
// 26th, December, 2014
// 
// Regexp 捕获组
// () : 捕获组
// (?:...) : 指可选非捕获组
// (?= ): positive lookahead 正向预测先行
// (?! ): Negative lookahead 消极的预测先行
// ()? 不贪婪匹配

var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-\_A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var url = "http://www.or-_a.com:80/goodparts?q#fragment";

var result = parse_url.exec(url);

var names = ['url', 'scheme', 'slash', 'host', 'port',
    'path', 'query', 'hash'];
var blanks = '        ';
var i;
for (i = 0; i < names.length; i += 1 ){
    (names[i] + ':' +
     blanks.substring(names[i].length), result[i] 
    );
}


// web write 20150413 Monday
var str = "bedroom";
var reg = /^bed(?=room$)/g;
var arr = reg.exec(str);
var msg;
if(arr){
    msg = arr + ' matching success!';
}else{
    msg = " matching fail!<br>";
}


///////////////////////
// (?= exp)
// 零宽度 正预测 先行断言(positive lookahead )
// 当子表达式在此位置右侧时才继续匹配
// 
var x = /\b\w+(?=ing)/g;
('I\'m singing while you\'re dancing.'.match(x) );

// (?<= exp)
// 零宽度 正回顾 后发断言(positive lookbehind)
// 不支持
// ('yiminghes book'.replace(/((?=s)(?<=yiminghe))/g, ",") );

// 其实可以用分组捕获来回避的
('yiminghes book'.replace(/(yiminghe)(?=s)/g, "$1'") )



//////////////////////////
// (?! exp) 
// 零宽度 负预测 先行断言 (negative lookahead)
// 断言此位置的后面不能匹配表达式 exp.
var x = /\b((?!abc)\w)/g;
('xyz abc zuc zabc 11'.match(x));
//匹配每个词第一个字母

("z".match(/(?![acd])[a-z]/));  


// matches numbers
var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i

var test = function(num){
    (parse_number.test(num));
}

test('1');  // true
test('number'); // false
test('98.6');   // true
test('132.21.86.100'); // false
test('123.45E-67'); // true
test('123.45D-67'); // false


// replace()
var oldareacode = /\((\d{3})\)/g;
var p = '(555)666-1212'.replace(oldareacode, '$1-');
// p is '555-666-1212'
// console.log(p);




