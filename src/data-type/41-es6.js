///////////////////////////////////
// es6 stirng 扩展
// 1. Unicode
// 2. codePointAt()
// 3. String.fromCodePoint()
// 4. 字符串的遍历器接口
// 5. at()
// 6. normalize()
// 7. include(), startsWith(), endsWidth()
// 8. repeat()
// 9. padStart(), padEnd()
// 10.模块字符串
// 11.实例：模板编译
// 12.标签模板
// 13.String.raw
// 14.模块字符串的限制

{
  ///////////////////////////////////////
  //1.字符串的 Unicode 表示法

  // console.log("\u0061");         // a
  // console.log("\uD842\uDFB7");  // "𠮷"
  // console.log("\u20BB7");       // 7

  // es6 的改进
  // console.log("\u{20BB7}"); // "𠮷"
  // console.log("\u{41}\u{42}\u{43}"); // "ABC"

  'z' === 'z' //true
  // '\172' === 'z' //true
  '\x7A' === 'z' //true
  '\u007A' === 'z' //true
  '\u{7A}' === 'z' //true
}

{
  ///////////////////////////////////////
  // 2.codePointAt()
  var s1 = '𠮷'
  s1.length // => 2
  s1.charAt(0)
  s1.charAt(1)
  s1.charCodeAt(0) // 55362
  s1.charCodeAt(1) // 57271

  var s2 = '𠮷a'
  s2.codePointAt(0) // 134071
  s2.codePointAt(1) // 57271

  // es5 对应的字符
  // console.log(String.fromCharCode('0x20bb7'))
  // es6
  // console.log(String.fromCodePoint('0x20bb7')) //𠮷
}

{
  ///////////////////////////////////////
  // 4.字符串的遍历器接口
  for (let codePoint of 'foo') {
    //	console.log(codePoint);
  }

  // es5: 字符串遍历
  let str = '\u{20bb7}abc'
  for (let i = 0; i < str.length; i++) {
    // console.log('es5', str[i]) // 乱码 a b c
  }
  // es6: of 遍历
  for (let code of str) {
    // console.log('es6', code)  // 𠮷 a b c
  }
}

{
  // 5. at
  // ('abc'.at(0)); // a
  // ('吉'.at(0));	 // 吉
}

{
  ///////////////////////////////////////
  // include
  // statsWith 是否在头部
  // endsWith

  // f, o, o
  let str = 'string'
  // 是否包含"c"
  // console.log('includes', str.includes('c'))  //false
  // str 开始
  // console.log('start', str.startsWith('str')) // true
  // ng 结束
  // console.log('end', str.endsWith('ng'))      // true
}

{
  ///////////////////////////////////////
  // 8.repeat()
  'x'.repeat(3) // xxx
  'na'.repeat(0) // ''
}

{
  ///////////////////////////////////////
  // 9. padStart: 向前补
  //  padEnd: 向后补

  'x'.padStart(5, 'ab') // ababx
  'x'.padEnd(4, 'ab') //xaba

  // console.log('1'.padStart(2, '0')) // 01
  // console.log('1'.padEnd(2, '0'))   // 10
}

{
  ///////////////////////////////////////
  // 10.模析字符串

  // 字符串中嵌入变量
  var name = 'Bob',
    time = 'today'
  let msg = `Hello ${name}, how you ${time}?`
  // Hello Bob, how you today?

  var x1 = 1
  var y1 = 2
  ;`${x1} + ${y1} = ${x1 + y1}`
  // 1 + 2 = 3
  ;`${x1} + ${y1 * 2} = ${x1 + y1 * 2}`
  // 1 + 4 =5
}

///////////////////////////////////////
// 12.标签模板

var a2 = 5
var b2 = 10
function tag(s, v1, v2) {
  console.log(s[0])
  console.log(s[1])
  console.log(s[2])
  console.log(v1)
  console.log(v2)
  return 'OK'
}
// tag`Hello ${a2 + b2} world ${a2 * b2} `;
// 等同于
// tag(['Hello ', 'world ', ''], 15, 50);

// Hello

var total = 30
// var msg = passthru`The total is ${total} (${total*1.05} with tax)`;
var msg = passthru`The total is ${total} (${total * 1.05} with tax)`

function passthru(literals) {
  var result = ''
  var i = 0

  while (i < literals.length) {
    result += literals[i++]
    if (i < arguments.length) {
      result += arguments[i]
    }
  }

  return result
}
// console.log(msg);
// The total is 30 (31.5 with tax)

// rest 参数写法
function passthru2(literals, values) {
  var output = ''
  for (var index = 0; index < values.length; index++) {
    output += literals[index] + values[index]
  }
  output += literals[index]
  return output
}

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

///////////////////////////////////////
// 13. String.raw()
String.raw`Hi\n${2 + 3}`
// "Hi\\n5"
String.raw`Hi\u000A!` //Hi\u000A!

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

