'use strict';
////////////////////////
// 命名约定
// 1.构造函数首字母大写
// 	new PersionAll();
// 2.函数方法使用小驼峰式命名
// 	myFunction(), calculateArea()
// 3.不是函数的变量 => 使用小驼峰式 / 小写单词+下划线分割
// 	first_name, favorite_band, sold_campany_name
// 	ECMAScript 骆驼峰式命名属性(较少见) => lastIndex, ignoreCase
// 4.常量 => 全部大写 
// 5.私有成员函数 => 一个下划线前缀来标识
// 6.注释 //
// 7.编写API文档

// 推荐使用 单一var模式
function func(){
	var a = 1,
	b = 2,
	sum = a + b,
	myobject = {},
	i,
	j;
	//函数体
}


/**
 * 翻转一个字符串
 * @param	{String} 输入需要翻转的字符串
 * @return	{String} 翻转后的字符串
 * */
var reverse = function (input){
	return true;
};

///////
// YUIDoc 范例
/**
 * 我的JavaScript 应用程序
 *
 * @module myapp
 **/
var MYAPP = {};

/**
 * 一个数字工具
 * @namespace MYAPP
 * @class math_stuff
 **/
MYAPP.match_stuff = {
	/**
	 * Subs two numbers
	 *
	 * @method sum
	 * @param	{Number} 是第一个数
	 * @param	{Number} 是第二个数
	 * @return	{Number} 两个输入的总和
	 **/
	sum: function(a, b){
		return a + b;
	},
	/**
	 * Multiplies two numbers
	 *
	 * @method	multi
	 * @param	{Number} 是第一个数
	 * @param	{Number} 是第二个数
	 * @return	{Number} 两个输入相乘后结果
	 **/
	mulit: function(a, b){
		return a * b;
	}
};
// @namespace 用于命名包含以上对象的全局引用的名称
// @clas 指对象或者构造函数

/**
 * Construct Person objects
 * @class Person
 * @constructor
 * @namespace MYAPP
 * @param	{String} first 是名字
 * @param	{String} last 是姓氏
 **/
MYAPP.Person = function(first, last){
	/**
	 * 人的姓名
	 * @property first_name
	 * @type String
	 * */
	this.first_name = first;
	/**
	 * last (family) name of the person
	 * @property last_name
	 * @type String
	 * */
	this.last_name = last;
}


/******************************
 * 错误对象
 * Error(), SyntaxError(), TypeError()
 * 属性: name, message
 * 错误构造函数以函数形式调用(不带new时)，
 * 其表现行为与构造函数(带new)相同, 返回一个错误对象。
 * */
try{
  // 发生意外的事情, 抛出一个错误
  throw {
      name: "MyErrorType",
      message: "oops",
      extra: "This was rather embarrassing",
      remdy: generichErrorHandler   
      // 指定应该处理该错误的函数
  };
} catch(e) {
  // console.log(e.message);
  //优美的处理错误
  e.remdy();
  // 调用函数 generichErrorHandler
}
function generichErrorHandler(){}


//////////////////////////////////////
// 即时函数模式 (Immediate Function pattern)
(function(){
	//console.log("watch out!");
}());
// JSLint偏好使用这种

(function(){
})();
// 代替语法

//////////////////////////////////////
// 之前: 5个全局变量
// 警告: 反模块
// 构造函数
function Parent_(){}
function Child(){}
//一个变量
var some_var = 1;
//一些对象
var module1 = {};
module1.data = {a: 1, b: 2};
var module2 = {};

// 之后: 1个全局变量
// 全局变量
var MYAPP = {};
// 构造函数
MYAPP.Parent_ = function(){};
MYAPP.Child = function(){};
// 一个变量
MYAPP.some_var = 1;
// 一个对象容器
MYAPP.modules = {};
// 嵌套对象
MYAPP.modules.module1 = {};