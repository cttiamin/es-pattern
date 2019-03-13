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

var date = new Date();
date - new Date(); // 0
date.getTime(); // 1545189885181
date.getDay(); // 星期？
date.getMonth(); // 月
date.getHours(); // 小时
date.getMinutes(); // 分
date.getSeconds(); // 秒

Date.now(); // 1545189885181
+new Date(); // 1545189885181

// 解析一个包含日期的字符串
Date.parse('May 25, 2004');
//1085414400000, 为2004年创建一个日期对象

new Date('May 25, 2004');
//Tue May 25 2004 00:00:00 GMT+0800 (中国标准时间

// 返回全球标准时间 (UTC)
Date.UTC(2000, 0); //946684800000
Date.UTC(2005, 4, 5, 17, 55, 55); //1115315755000

new Date(2000, 0);
// Sat Jan 01 2000 00:00:00 GMT+0800 (中国标准时间)

new Date(2005, 4, 5, 17, 55, 55);
// Thu May 05 2005 17:55:55 GMT+0800 (中国标准时间)

new Date(Date.UTC(2000, 0)).toUTCString();
// Sat, 01 Jan 2000 00:00:00 GMT

new Date(Date.UTC(2005, 4, 5, 17, 55, 55)).toUTCString();
// "Thu, 05 May 2005 17:55:55 GMT"

/*****************************
 * 继承的方法
 */
new Date(2000, 0).toLocaleString();
// 2000/1/1 上午12:00:00

new Date(2005, 4, 5, 17, 55, 55).toLocaleString();
// 2005/5/5 下午5:55:55

var date1 = new Date(2007, 0, 1);
var date2 = new Date(2007, 1, 1);
date1 < date2; // true
date1 > date2; // false

// 2018/12/19 上午11:29:03
new Date().toLocaleString();
