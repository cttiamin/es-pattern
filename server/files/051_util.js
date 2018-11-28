// 实现继承 
var util = require('util');

function Base(){
	this.name = 'base';
	this.base = 1991,

	this.sayHello = function(){
		console.log('Hello' + this.name);
	};
}

Base.prototype.showName = function(){
	console.log(this.name);
};

function Sub(){
	this.name = 'sub';
}

// 只能继承自原型， 无法从实例中继承
util.inherits(Sub, Base);

var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

var objSub = new Sub();
objSub.showName();	//from prototype
console.log(objSub);

