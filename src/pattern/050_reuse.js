/**
 * Chapter 6 代码复用模式 
 *
 * **/

///////////////////////////////////////
// 使用类式继承时预期结果
// 类式继承模式#1  默认模式

//the parent constructor
function Parent(name){
	this.name = name || 'Adam';
}

//adding functionlity to the prototype
Parent.prototype.say = function(){
	return this.name;
};

//empty child constructor
function Child(name){}

// 原型的属性应该指向一个对象，而不是一个函数，
// 它必须指向一个由父类构造的函数所创建的实例(一个对象)
function inherit(C, P){
	C.prototype = new P();
}

//inheritance magic happens here 
inherit(Child, Parent);

var kid = new Child();
//console.log(kid.say());	// "Adam"

// 此模式不支持交将参数传递到子构造函数中，
var s = new Child('Seth');
//console.log(s.say());	// Adam


////////////////////////////////
// 模式#2 借用构造函数 
// defect: 无法获取原型的内容 

// a parent constructor
function Article() {
	this.tags = ['js', 'css'];
}
var article = new Article();
// a blog post inherits from an article object
// via the classical pattern #1
function BlogPost() {}
BlogPost.prototype = article;
var blog = new BlogPost();
//console.log(blog.tags);	// from prototype

// note that above you didn't need `new Article()`
// because you already had an instance available
// a static page inherits from article
// via the rented constructor pattern
function StaticPage() {
	Article.call(this);
}
var page = new StaticPage();
//console.log(article.hasOwnProperty('tags')); // true
//console.log(blog.hasOwnProperty('tags')); // false
///console.log(page.hasOwnProperty('tags')); // true

blog.tags.push('html');
page.tags.push('php');
//console.log(article.tags.join(', ')); // "js, css, html"


//////////////
// The Prototype Chain 原型链

//父构造函数
function Parent_2(name) {
	this.name = name || 'Adam';
}
//向该原型添加功能
Parent_2.prototype.say = function(){
	return this.name;
};

function Child_2 (name){
	Parent_2.apply(this, arguments);
}

var kid_2 = new Child_2("Patrick");
// console.log( kid_2.name);	// out "Patrick"
// console.log(kid_2.say);	//undefined
//本模式中根本没有使用 Child.prototype, 只继承了name, 未继承say方法


////////////
// 实现多重继承 
function Cat() {
	this.legs = 4;
	this.say = function () {
		return "meaowww";
	};
}
function Bird() {
	this.wings = 2;
	this.fly = true;
}
function CatWings() {
	Cat.apply(this);
	Bird.apply(this);
}
var jane = new CatWings();
//console.dir(jane);

//借用构造缺点 ：无法从原型中继承任何东西，
//优点：获得父对象成员的真实副本。


///////////////////////////////////
// 模式#3 借用和设置原型 
// defect：父构造函数被调用了两次，效率低下

// the parent constructor
function Parent_2(name) {
	this.name = name || 'Adam';
}
// adding functionality to the prototype
Parent_2.prototype.say = function () {
	return this.name;
};
// child constructor
function Child_2(name) {
	Parent_2.apply(this, arguments);
}
Child_2.prototype = new Parent_2();

var kid_2 = new Child_2("Patrick");
//console.log(kid_2.name); // "Patrick"
kid_2.say(); // "Patrick"
delete kid_2.name;
kid_2.say(); // "Adam"


///////////////////////////
// 模式#4 共享原型
// 子对象与父对象设置相同
// 缺点： 如果继承下方的某处存在一个子对象或孙对象修改了原型，将会
// 影响到所有父对象和袓先对象。
function inherit_2(C, P){
	C.prototype = p.prototype;
}

//////////////////////////
// 模式#5 临时构造函数
function inherit_3(C, P){
	var F = function(){};
	F.prototype = P.prototype;
	C.prototype = new F();
}
//父构造添加到 this 中的任何成员都不会被继承 

////////////////
//存储超类
function inherit_4(C, P){
	var F = function(){};
	F.prototype = P.prototype;
	C.prototype = new F();
	C.uber = P.prototype;
	// super 是保留关键字，所以称uber
}

/////////////////
//重置构造函数指针

// parent, child, inheritance
function Parent_4() {
}
function Child_4() {
}
inherit_4(Child_4, Parent_4);
// testing the waters
var kid_4 = new Child_4();
//console.log(kid_4.constructor.name); // "Parent"
//console.log(kid_4.constructor === Parent_4); // true

//这个类式继承模式最后的圣杯 Holy Grail
function inherit_5(C, P){
	var F = function(){};
	F.prototype = P.prototype;
	C.prototype = new F();
	C.uber = P.prototype;
	C.prototype.constructor = C;
}
// 这种模式也被称之为代理函数(proxy function) 
// 或代理构造函数 proxy constructor 的模式 
// 而不是使用临时构造函数 temporary constructor.

function Parent_5(name){
	this.name = name;
}
function Child_5(first){
	this.first = first;
}
inherit_5(Child_5, Parent_5);

kid_5 = new Child_5('first');


// 使用即时函数存储代理函数，避免每次继承时都创建临时(代理)构造函数
var inherit_6 = (function(){
	var F = function (){};
	return function(C, P){
		F.prototype = P.prototype;
		C.prototype = new F();
		C.uber = P.prototype;
		C.prototype.constructor = C;
	};
}());

console.log('----------------------------- end #5');


///////////////////////////////////
// Klass
// 很多类库都模拟了类的概念，并引进了一些sugar syntax
// JavaScript 中模拟类的实现方式


var klass = function (Parent, props) {
	var Child, F, i;
	// 1.
	// new constructor
	Child = function () {
		if (Child.uber && Child.uber.hasOwnProperty("__construct")) {
			//console.log(Child.uber);
			Child.uber.__construct.apply(this, arguments);
		}
		if (Child.prototype.hasOwnProperty("__construct")) {
			Child.prototype.__construct.apply(this, arguments);
		}
	};
	// 2.
	// inherit
	Parent = Parent || Object;

	F = function () {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.uber = Parent.prototype;
	Child.prototype.constructor = Child;
	// 3.
	// add implementation methods
	for (i in props) {
		if (props.hasOwnProperty(i)) {
			Child.prototype[i] = props[i];
		}
	}

	// return the "class"
	return Child;
};


var Man = klass(null, {
	__construct: function (what) {
		console.log("Man's constructor");
		this.name = what;
	},
	getName: function () {
		return this.name;
	}
});

var first = new Man('Adam');	//记录了 "Man's constructor"
//console.log(first.getName());	//"Adam"

// Now let's extend this class and create a SuperMan class
var SuperMan = klass(Man, {
	__construct: function (what) {
		console.log("SuperMan's constructor");
	},
	getName: function () {
		var name = SuperMan.uber.getName.call(this);
		return "I am " + name;
	}
});

var clark = new SuperMan('Clark Kent');
//console.log(clark.getName());	//结果为"I am Clark kent "

//console.log(clark instanceof Man); // true
//console.log(clark instanceof SuperMan); // true
console.log('---------------------------- End Klass');


////////////////////////////////
// 原型继承 

function object(o){
	function F(){}
	F.prototype = o;
	return new F();
}

// object to inherit from
var parent_7 = {
	name: "Papa"
};
// the new object
var child_7 = object(parent_7);
// testing
//console.log(child_7.name); // "Papa"


// parent constructor
function Person() {
	// an "own" property
	this.name = "Adam";
}
// a property added to the prototype
Person.prototype.getName = function () {
	return this.name;
};

// create a new person
//var papa = new Person();

// inherit
//var kid = object(papa);

// test that both the own property
// and the prototype property were inherited
//kid.getName(); // "Adam

// 本模式另一个变化：
var kid_7 = object(Person.prototype);

//console.log(typeof kid_7.getName);// function, from prototype
//console.log(typeof kid_7.name);	// undefined,


//////////////////////////
// 增加到ECMAScript5中 
// ES5 增加了 Object.create 方法 
var child_8 = Object.create(parent, {
	age: { value: 2 }	//ES5 描述符号
});
child_8.hasOwnProperty("age");	//结果为true


//////////////////////////
// 通过复制属性实现继承

// 浅复制 shallow copy 
function extend(parent, child) {
	var i;
	child = child || {};
	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
			child[i] = parent[i];
		}
	}
	return child;
}
var dad = {name: "Adam"};
var kid = extend(dad);
//console.log(kid.name);

// 可能导致的意外发生
var dad_2 = {
	counts: [1, 2, 3],
	reads: {paper: true}
};
var kid_8 = extend(dad_2);
kid_8.counts.push(4);
dad_2.counts.toString();	//1,2,3,4
//console.log(dad_2.reads === kid_8.reads);

//深复制 deep copy
//创建对象真实的副本
function extendDeep(parent, child) {
	var i,
	toStr = Object.prototype.toString,
	astr = "[object Array]";
	child = child || {};

	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
			if (typeof parent[i] === "object") {
				child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
				extendDeep(parent[i], child[i]);
			} else {
				child[i] = parent[i];
			}
		}
	}
	return child;
}
var dad_3 = {
	counts: [1, 2, 3],
	reads: {paper: true}
};

var kid_9 = extendDeep(dad_3);

//console.log( kid_9.counts.push(4) );
//console.log( kid_9.counts.toString() ); // 1,2,3,4
//console.log( dad_3.counts.toString() );	// 1,2,3

//console.log( dad_3.reads === kid_9.reads); // false
//console.log( kid_9.reads.paper = false );

//console.log( kid_9.reads.web = true );
//console.log( dad_3.reads.paper ); // true


//////////////////////////////////
// 混入 Mix-ins
// 从多个对象中复制出任意的成员并将这些成员组合成一个新的对象
function mix() {
	var arg, prop, child = {};
	for (arg = 0; arg < arguments.length; arg += 1) {
		for (prop in arguments[arg]) {
			if (arguments[arg].hasOwnProperty(prop)) {
				child[prop] = arguments[arg][prop];
			}
		}
	}
	return child;
}

var cake = mix(
		{eggs: 2, large: true},
		{butter: 1, salted: true},
		{flour: "3 cups"},
		{sugar: "sure!"}
		);
//console.dir(cake);


///////////////////////////////////
//借用方法 
// 仅需要对象其中的一个或两个方法

//借用数组的方法：
// 形如arguments的类似数组的对象并不具有这些方法，
// 因此arguments可以借用数组方法：slice
function f(){
	var args = [].slice.call(arguments, 1, 3);

	//var args = Array.prototype.slice.call(arguments, 1, 3);
	// 使用Array.prototype 可节省创建 数组[] 的工作

	return args;
}
// console.log(f(1, 2, 3, 4, 5, 6));


////////////////////////////////
// 借用和绑定
// 锁定this的值，将其绑定到特定对象预先确定该对象。
//
// the object that this points to inside of the borrowed method 
// is determined based on the call expression.
// 在借用方法的内部，this所指向的的对象是基于调用表达式而确定的。

//Let’s see an example. There’s an object called one that has a say() method:
var one = {
	name: "object",
	say: function (greet) {
		return greet + ", " + this.name;
	}
};
// test
( one.say('hi') ); // "hi, object"

// Now another object two doesn’t have a say() method,
// but it can borrow it from one :
var two = {
	name: "another object"
};
one.say.apply(two, ['hello']); // "hello, another object"


// 函数指针 指向一个全局变量的场景。
// assigning to a variable
// `this` will point to the global object
var say = one.say;
console.log( say('hoho') ); // "hoho, undefined"
// passing as a callback
var yetanother = {
	name: "Yet another object",
	method: function (callback) {
		return callback('Hola');
	}
};
yetanother.method(one.say); // "Holla, undefined"


// 修复 (绑定) 对象与方法之间的关系
function bind(o, m){
	return function(){
		return m.apply(o, [].slice.call(arguments));
	};
}

var twosay = bind(two, one.say);
console.log(twosay('yo') );
// yo, another object


///////////////////////
// Function.prototype.bind()
// ES5 添加 bind方法 

//var newFunc = obj.someFunc.bind(myobj, 1,2,3);

// ES5之前的实现方法
if (typeof Function.prototype.bind === "undefined") {
	Function.prototype.bind = function (thisArg) {
		var fn = this,
		slice = Array.prototype.slice,
		args = slice.call(arguments, 1);
		return function () {
			return fn.apply(thisArg, args.concat(slice.call(arguments)));
		};
	};
}


var twosay2 = one.say.bind(two);
console.log( twosay2('Bonjour') ); // "Bonjour, another object"

var twosay3 = one.say.bind(two, 'Enchanté');
console.log( twosay3() ); // "Enchanté, another object"


