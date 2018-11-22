'use strict';

// 使用严格模式
// 推荐在代码中使用static模式
function my(){
    "use strict";
}

//推荐使用 单一var模式
function func(){
	var a = 1,
	b = 2,
	sum = a + b,
	myobject = {},
	i,
	j;
	//函数体
}

Window.name == window['name'];  //true


// 变量提升
var myname = "global"; //全局变量
function func2(){
	console.log(myname);	// undefined
	var myname = "local";
	console.log(myname);	// local
}
// func2();


// parseInt 数值约定
var month = "06",
	day = "08",
	year = parseInt("09", 10);
// console.log(year);
var day = Number("08");
// Number 转换会比parseInt 快很多， parseInt 是解析而不是简单的转换，
// If string "08 hello" 只能用 parseInt
//console.log(day);


////////////////////////
// 命名约定
// 1.构造函数首字母大写
// var adam = new PersionAll();
//
// 2.函数方法使用小驼峰式命名
// myFunction(), calculateArea()
//
// 3.不是函数的变量 => 使用小驼峰式 / 小写单词+下划线分割
// 	first_name, favorite_band, sold_campany_name
// 	ECMAScript 骆驼峰式命名属性(较少见) => lastIndex, ignoreCase
// 4.常量 => 全部大写 
//
// 5.私有成员函数 => 一个下划线前缀来标识
//
// 6.注释 //
//
// 7.编写API文档

/**
 * 翻转一个字符串
 *
 * @param	{String} 输入需要翻转的字符串
 * @return	{String} 翻转后的字符串
 * */
var reverse = function (input){
	//...
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


////////////////////
//对象字面量
var dog = {};
// add a property
dog.name = "Benji";
// 添加一个方法
dog.getName = function(){
	return dog.name;
};
//删除属性方法
delete dog.name;

/////////////////
//构造函数对象
var car = {goes: "far"};
//另一种方法 使用内置构造方法 
//Warning: this is an antipatter  
var car = new Object();
car.goes = "far";

// 构造函数返回值
var Objectmarker = function(){
	this.name = "This is it";
	var that = {
	};
	that.name = "And that's that";
	return that;
};
// Test
var o = new Objectmarker();
//console.log(o.name);

////////////
// Forget new
function Waff(){
	return {
		tastes: "yummy"
	};
}
var first = new Waff(),
	second = Waff();
// console.log(first.tastes);
// console.log(second.tastes);

//////////////
// 自调用构造函数
function Waffle2(){
	if(!(this instanceof Waffle2)){
		return new Waffle2();
	}
	//另一种方法 ES5 严格模式不支持 arguments.callee
   /* if(!(this instanceof arguments.callee)){*/
		//return new arguments.callee();
	/*}*/
	this.tastes = "yummy";
};
Waffle2.prototype.wantAnother = true;

var first_2 = new Waffle2(),
	second_2 = Waffle2();
//console.log(first_2.tastes);
//console.log(first_2.tastes);


/////////////////
// 数组字面量

// warning: this is an antipatter
var a = new Array("itsy", "bitsy", "spider");
//完全相同的数组
var a_2 = ["itsy", "bitsy", "spider"];
//console.log(typeof a);	// => Object
//console.log(a.constructor === Array); // => true

/////
//数组构造函数特殊性
//var a_3 = new Array(3.14);
// Output RangError:invalid array length
//console.log(typeof a_3);	//=> undefined

// 检查数组的性质
// ES5 支持 Array.isArray
Array.isArray({
	length: 1,
	"0": 1,
	slice: function(){}
});

// 不支持 isArray 方法，使用 Object.prototype.toString()
if(typeof Array.isArray === "undefined"){
	Array.isArray = function(arg){
		return Object.prototype.toString().call(arg) === "[object Array]";
	}
}


/******************************
 * 错误对象
 * Error(), SyntaxError(), TypeError()
 * 属性:
 * name, message
 * 错误构造函数以函数形式调用(不带new时)，
 * 其表现行为与构造函数(带new)相同,
 * 返回一个错误对象。
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
    console.log(e.message);
    //优美的处理错误
    e.remdy();
    //调用函数generichErrorHandler
}

function generichErrorHandler(){}

