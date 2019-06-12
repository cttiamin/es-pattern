//////////////////////////////////////////////////
// Date类型
// api:
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date
//
//  => 继承的方法
//    toLocalString
//    toString
//    toValueOf
//  => 日期格式化方法
//    toDateString
//    toTimeString
//    toLocaleDateString
//    toLocaleTimeString
//    toUTCString
//
// Date.now
// Date.parse
// Date.UTC


var date = new Date()
date - new Date() // 0
date.getTime() // 1545189885181
date.getDay() // 星期？
date.getMonth() // 月
date.getHours() // 小时
date.getMinutes() // 分
date.getSeconds() // 秒

Date.now() // 1545189885181
;+new Date() // 1545189885181

// 解析一个包含日期的字符串
Date.parse('May 25, 2004') 
// => 1085414400000

new Date('May 25, 2004')
//Tue May 25 2004 00:00:00 GMT+0800 (中国标准时间

// 返回全球标准时间 (UTC)
Date.UTC(2000, 0) //946684800000
Date.UTC(2005, 4, 5, 17, 55, 55) //1115315755000

new Date(2000, 0)
// Sat Jan 01 2000 00:00:00 GMT+0800 (中国标准时间)
new Date(2005, 4, 5, 17, 55, 55)
// Thu May 05 2005 17:55:55 GMT+0800 (中国标准时间)

// toUTCString
new Date(Date.UTC(2000, 0)).toUTCString()
// Sat, 01 Jan 2000 00:00:00 GMT
new Date(Date.UTC(2005, 4, 5, 17, 55, 55)).toUTCString()
// "Thu, 05 May 2005 17:55:55 GMT"

new Date(2000, 0).toLocaleString()
// 2000/1/1 上午12:00:00
new Date(2005, 4, 5, 17, 55, 55).toLocaleString()
// 2005/5/5 下午5:55:55

var date1 = new Date(2007, 0, 1)
var date2 = new Date(2007, 1, 1)
date1 < date2 // true
date1 > date2 // false

// 2018/12/19 上午11:29:03
new Date().toLocaleString()

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */

Date.prototype.pattern = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  var week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? '/u661f/u671f'
          : '/u5468'
        : '') + week[this.getDay() + '']
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
console.log('pattern', date.pattern('yyyy-MM-dd HH:mm:ss'))

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   {  
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

// let datefmt1 = date.Format('yyyy-MM-dd');
// console.log('format',datefmt1,
// Date.parse(datefmt1))

