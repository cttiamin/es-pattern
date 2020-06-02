// inspect: 将对象转换为字符串 
var util = require('util');

function Person(){
	this.name = 'byvoid';
	this.toString = function(){
		return this.name;
	};
}

var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));
//输出更多信息
