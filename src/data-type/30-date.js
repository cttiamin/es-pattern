/******************************************************************
 * Chapter 5 引用类型  5.3 Date类型: 　Date() ，parse(), UTC()
 * => 继承的方法
 *  toLocalString()
 *  toString()
 *  toValueOf()
 * => 日期格式化方法 :
 *  toDateString
 *  toTimeString
 *  toLocaleDateString()
 *  toLocaleTimeString()
 *  toUTCString()
 *
 * =>日期/时间组件方法 :
 *
 * Date 类型
 * new Date()
 * Date.parse(): 解析一个包含日期的字符串
 * Date.UTC(): 返回全球标准时间 (UTC)
 * Date.now(): ie9+
 *
 * API: http://www.w3school.com.cn/jsref/jsref_obj_date.asp
 *************************************/

var date = new Date()
console.log(date - new Date())
console.log(date.getTime())
console.log(date.getDay())

// Date.parse("May 25, 2004");
//1085414400000,为2004年创建一个日期对象

// console.log(new Date("May 25, 2004"));

//console.log(Date.UTC(2000, 0));
//946684800000

//console.log(Date.UTC(2005, 4, 5, 17, 55, 55));
//1115315755000

//console.log(new Date(2000, 0));
// Sat Jan 01 2000 00:00:00 GMT+0800 (中国标准时间)

//console.log(new Date(2005, 4, 5, 17, 55, 55));
// Thu May 05 2005 17:55:55 GMT+0800 (中国标准时间)

//        //January 1, 2000 at midnight
//        var y2k = new Date(Date.UTC(2000, 0));
//        console.log(y2k.toUTCString());
//        //May 5, 2005 at 5:55:55 PM GMT
//        var allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));
//        console.log(allFives.toUTCString());

//console.log(Date.now());    //ie9+
//console.log(+new Date());

/*****************************
 * 继承的方法
 * toLocalString()
 * toString()
 * valueOf()
 */

//January 1, 2000 at midnight in local time
//var y2k = new Date(2000, 0);
//console.log(y2k.toLocaleString());

//May 5, 2005 at 5:55:55 PM in local time
//var allFives = new Date(2005, 4, 5, 17, 55, 55);
//console.log(allFives.toLocaleString());

//console.log(Date.toString());
//var date1 = new Date(2007, 0, 1);
//var date2 = new Date(2007, 1, 1);
//console.log(date1 < date2); //true
//console.log(date1 > date2); //false

//console.log( new Date().toLocaleString() );

/*****************************
 * 日期格式化方法
 * toDateString():
 * toTimeString();
 * toLocaleDateString();
 * toLocaleTimeString();
 * toUTCString():
 */

//console.log( Date.toDateString() );

/****************************
 * 日期/时间组件方法
 */
