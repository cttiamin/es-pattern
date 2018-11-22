
///////////////////////////////////////////////////////////
// Chapter 5, 对象创建模式
//
// 命名空间模式
// 创建一个全局对象重构 5个全局变量

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
//构造函数
MYAPP.Parent_ = function(){};
MYAPP.Child = function(){};
//一个变量
MYAPP.some_var = 1;
//一个对象容器
MYAPP.modules = {};
//嵌套对象
MYAPP.modules.module1 = {};



///////////////////////////////////////////////////////////
// 通用命名空间函数

//不安全的代码
var MYAPP2 = {};
// 更好的代码风格
if(typeof MYAPP2 === "undefined"){
	var MYAPP2 = {};
}
// 或者更短的语句
var MYAPP2 = MYAPP2 || {};


// 使用命名空间函数
// MYAPP2.namespace('MYAPP2.modules.module2');

//相当于以下代码
/*
   var MYAPP2 = {
   modules: {
   module2: {}         
   }
   };
   */

var MYAPP3 = MYAPP3 || {};
MYAPP3.namespace = function (ns_string) {
	var parts = ns_string.split('.'),
	parent = MYAPP3,
	i;

	//剥离最前面的冗余全局变量
	if(parts[0] === 'MYAPP3'){
		parts = parts.slice(1);
	}
	for(i = 0, len = parts.length; i < len; i +=1){
		if(typeof parent[parts[i]] === "undefined"){
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};

// 将返回值赋给一个局部变量
var module2 = MYAPP3.namespace('MYAPP3.modules.module2');
//console.log(module2 === MYAPP3.modules.module2);	//=> true
//忽略最前面的'MYAPP3'
MYAPP3.namespace('modules.module51');

//长命名空间
MYAPP3.namespace('once.upon.a.time.there.was.this.long.nested.property');
//console.log(MYAPP3);


///////////////////////////////////////////////////////////
// 声明依赖关系

//类库 在函数或模块顶部声明代码所依赖的模块
//是一个非常好的主意
var myFunction = function(){
	//依赖
	var event = YAHOO.util.Event,
	dom = YAHOO.util.Dom;
};

function test2(){
	var modules = MYAPP3.modules;
	//modules.m1;
	//modules.m2;
	//modules.m3;
}
/*
   缩减的 test2 主体：
   var a=MYAPP3.modules; console.log(a.m1); (a.m2); (a.m3);
   */

///////////////////////////////////////////////////////////
// 私有属性和方法

//javascript 中所有对象成员是公共的
var myobj_1 = {
	myprop : 1,
	getProp: function(){
		return this.myprop;
	}
};
//console.log( myobj_1.myprop);  //'myprop'是公有可访问的
//console.log( myobj_1.getProp() ); // getProp()也是公有可访问的

//当使用构造函数创建对象也同样如此:
function Gadget_1 () {
	this.name = 'iPod';
	this.stretch = function(){
		return 'iPad';
	};
}
var toy_1 = new Gadget_1();
//console.log(toy_1.name);    //`name` 是公共的
//console.log(toy_1.stretch); // stretch()是公有的


/////////////////////////////
// 私有成员
// js中可以使用闭包, 构造函数创建了一个闭包
// name 是一个私有成员
function Gadget_2(){
	// 私有成员
	var name = 'iPod';
	// 公有函数
	this.getName = function(){
		return name;
	};
}
var toy_2 = new Gadget_2();
//console.log(toy_2.name); // => undefined
//console.log(toy_2.getName() ); // => "ipod"

//特权方法：可以访问私有成员的公共方法


/////////////////////////////
// 私有性失效
// 1.eval()
// 2.从特权方法中返回私有一个变量
function Gadget_3(){
	var specs = {
		screen_width: 320,
		screen_height: 480,
		color: "white"
	};

	//公有函数
	this.getSpecs = function(){
		return specs;
	};
}
var toy_3 = new Gadget_3(),
	specs = toy_3.getSpecs();

specs.color = "black";
specs.price = "free";
(toy_3.getSpecs());


/////////////////////////////
// 对象字面量以及私有性
// object literal 对象字面量
// anonymous immediate function 立即执行函数
var myobj_1;  //这将会是对象
(function(){
	//私有成员
	var name = "my, oh my";

	//实现公有部分
	//注意，没有var 修饰符
	myobj_1 = {
		//特权方法
		getName: function(){
			return name;
		}
	};
}());
( myobj_1.getName() );    // => "my, oh my"

//具有同样思想的实现
var myobj_2 = (function(){
	//私有成员
	var name = "my, oh my";
	//实现公有部分
	return {
		getName: function(){
			return name;
		}
	};

}());
(myobj_2.getName()); //=> "my, oh my"
// module pattern: 模块模式的基础框架


/////////////////////////////
// 原型和私有属性

//构造函数中的私有属性
function Gadget_4(){
	//私有成员
	var name = 'iPod';
	//公有函数
	this.getName = function(){
		return name;
	};
}
Gadget_4.prototype = (function(){
	//私有变量
	var browser = "Mobile Webkit";
	//公有原型成员
	return {
		getBrowser: function(){
			return browser;
		}
	};
}());
var toy_4 = new Gadget_4();
(toy_4.getName() );  // 特权own方法
(toy_4.getBrowser() );　// 特权原型方法


/////////////////////////////
// 将私有方法揭示为公共方法
// 揭示模式 revelation pattern
// 揭示块模式: revealing module pattern
var myarray;
(function (){
	var astr = "[object Array]",
	toString = Object.prototype.toString;

	function isArray(a){
		return toString.call(a) === astr;
	}

	function indexOf(haystack, needle){
		var i = 0,
		max = haystack.length;
		for(; i < max; i += 1){
			if(haystack[i] === needle){
				return i;
			}
		}
		return -1;
	}

	myarray = {
		isArray: isArray,
		indexOf: indexOf,
		inArray: indexOf
	};

}());

var arr_1 = [1, 2, 3];
( Object.prototype.toString.call(arr_1) );  //
( myarray.isArray([1, 2]) );    //true
myarray.isArray({0: 1});    //false
myarray.indexOf(["a", "b", "z"], "z");   // 2
myarray.isArray(["a", "b", "z"], "z");   // 2



///////////////////////////////////////////////////////////
// 模块模式 Module Pattern
// 自包含非耦合: self-contained de-coupled
// 是多种模式的组合：命名空间，即时函数，私有特权成员，声明依赖
/***
 * 
 * */
MYAPP3.namespace('MYAPP3.utilities.array');
//即时函数，
MYAPP3.utilities.array = (function(){
	//依赖
	var uobj = MYAPP3.utilities.object,
	ulang = MYAPP3.utilities.lang,

	//私有属性
	array_string = "[object Array]",
	ops = Object.prototype.toString;

	//私有方法
	// ...

	// var变量定义结束

	// 可选的一次性初始化过程
	// ...

	//公共API
	return {
		inArray: function (needle, haystack){
			var i = 0,
			max = haystack.length;
			for(; i < max; i += 1){
				if(haystack[i] === needle){
					return true;
				}
			}
		},

		isArray: function(a){
			return ops.call(a) === array_string;
		}
		// 更多方法和属性

	};        
}());

( MYAPP3.utilities.array.inArray("z", ["a", "b", "z"]) );
( MYAPP3.utilities.array.isArray({0:1}));


///////////////////////////////////////////////////////////
// 揭示模块模式 revelation Pattern
// 私有模式: privacy pattern
// 所有方法都保持私有性，只能暴露最后决定设立API的方法

MYAPP3.namespace('MYAPP3.utilities.array2');
MYAPP3.utilities.array2 = (function(){

	// 私有属性
	var array_string = "[object Array]",
	ops = Object.prototype.toString,

	//私有方法
	inArray = function(haystack, needle){
		var i = 0,
		max = haystack.length;
		for(; i < max; i += 1){
			if(haystack[i] === needle){
				return i;
			}
		}
		return -1;
	},
	isArray = function(a){
		return ops.call(a) === array_string;
	};
	// var 变量定义结束

	return {
		isArray: isArray,
		indexOf: inArray
	};
}());

( MYAPP3.utilities.array2.indexOf(["a", "b", "z"], "z") );
( MYAPP3.utilities.array2.isArray({0:1}));



///////////////////////////////////////////////////////////
// 创建构造函数模块
// 有些时候使用构造函数创建对象更方便
// 唯一的区别是：包装了模块的即时函数最终将返回一个函数，
// 而不是返回一个对象

MYAPP3.namespace('MYAPP3.utilities.Array3');
MYAPP3.utilities.Array3 = (function(){
	//依赖
	var uobj = MYAPP3.utilities.object,
	ulang = MYAPP3.utilities.lang,

	//私有属性和方法
	Constr;

	// var 变量定义结束

	// 可选的一次性初始化过程
	// ...

	// 公有API -- 构造函数
	Constr = function(o){
		this.elements = this.toArray(o);
	};
	//公有 API －原型
	Constr.prototype = {
		constructor: MYAPP3.utilities.Array3,
		version: "2.0",
		toArray: function(obj){
			var i = 0,
			a = [],
			// ES5 支持Object.keys方法,ie8+
			obj_keys_arr = Object.keys(obj);
			len = obj_keys_arr.length;

			for(; i < len; i += 1){
				//console.log(obj_keys_arr[i]);
				a[i] = obj[obj_keys_arr[i]];
			}

			/* while(i < len){*/
			//a[i] = obj[obj_keys_arr[i]];
			//i++;
			/*}*/

			return a;
		}
	};

	// 返回要分配给新命名空间的构造函数
	return Constr;
}());

var arr = new MYAPP3.utilities.Array3({1: 1, 2: 2});
//console.log(arr);
//console.log( arr.toArray({3:3, 4: 4}) );




/////////////////////////////
// 将全局变量导入到模块中
// 导入有助于加速全局即时函数中的全局符号解析的速度
MYAPP3.utilities.module = (function(app, global){
	//console.log(global);
	//console.log(app);
}(MYAPP3, this));



//////////////////////////////////////////////////////////
// 沙箱模式 sandbox pattern
// 解决命名空间模式的几个缺点
// 1.一个应用程序或库的两个版本运行在同一个页面中，因为需要同一个
// 全局符号名
// 2.以点 . 分割的名字，需要更长的字符，在运行时需要解析更长的时间
//


/////////////////////////////
//全局构造函数

Sandbox = function(){};

//new Sandbox(function(box){});
// box 与命名空间MYAPP3相似

Sandbox(['ajax', 'event'], function(box){
	//console.log(box);        
});

Sandbox('ajax', 'dom', function(box){
	//console.log(box);
});

Sandbox('*', function(box){
	//console.log(box);
});

Sandbox(function(){
	// console.log(box);
});

// 将一个模块嵌入到另外一个模块中
Sandbox('dom', 'event', function(box){
	//使用 DOM和事件来运行
	Sandbox('ajax', function(box){
		//另一个沙箱化(sandbox)的'box'对象
		//这里的"box" 对象与函数外部的
		//"box"并不相同

		//...
	});

	//这里没有ajax模块

});


/////////////////////////////
//增加模块
Sandbox.modules = {};

Sandbox.modules.dom = function(box){
	box.getElement = function(){};
	box.getStyle = function(){};
	box.foo = "bar";
};

Sandbox.modules.event = function(box){
	//如果需要, 就访问Sandbox 原型, 如下语句：
	//box.constructor.prototype.m = "mmm";
	box.attachEvent = function(){};
	box.dettachEvent = function(){};
};

Sandbox.modules.ajax = function(box){
	box.makeRequest = function(){};
	box.getRequest = function(){};
};

/////////////////////////////
// 实现构造函数
function Sandbox_2(){

	//console.dir(arguments);

	//将参数转换成一个数组
	var args = Array.prototype.slice.call(arguments),
	//最后一个参数是回调函数
	callback = args.pop(),
	//模块可以作为一个数组传递，或作为单独的参数传递
	modules = (args[0] && typeof args[0] === "string") ? args : args[0],
	i;
	//console.log( arguments);	// object


	// 确保该函数
	// 作为构造函数被调用
	if(!(this instanceof Sandbox_2)){
		return new Sandbox_2(modules, callback);
	}

	//需要向 'this' 添加属性
	this.a = 1;
	this.b = 2;

	// 现在向该核心 'this' 对象添加模块
	// 不指定模块名称或指定"*" 都表示"使用所有模块"
	if(!modules || modules === '*'){
		modules = [];
		for(i in Sandbox_2.modules){
			if(Sandbox_2.modules.hasOwnProperty(i)){
				modules.push(i);
			}
		}
	}

	//初始化所需的模块
	for(i = 0; i < modules.length; i += 1){
		Sandbox_2.modules[modules[i]](this);
	}

	// call the callback
	callback(this);
}

// 需要的任何原型属性
Sandbox_2.prototype = {
	name: "My Application",
	version: "1.0",
	getName: function(){
		return this.name;
	}
};


/////////////////////////////
//增加模块
Sandbox_2.modules = {};

Sandbox_2.modules.dom = function(box){
	box.getElement = function(){
		console.log('this is getElement method');
	};
	box.getStyle = function(){};
	box.foo = "bar";
};

Sandbox_2.modules.event = function(box){
	//如果需要, 就访问Sandbox_2 原型, 如下语句：
	//box.constructor.prototype.m = "mmm";
	box.attachEvent = function(){};
	box.dettachEvent = function(){};
};

Sandbox_2.modules.ajax = function(box){
	box.makeRequest = function(){};
	box.getRequest = function(){};
};


// Test
Sandbox_2(['dom', 'event'], function(that){
	//console.log(that);
	//that.getElement();
});



//////////////////
// 静态成员
// 公有静态成员
var Gadget_5 = function(){};
//靜太方法
Gadget_5.isShiny = function(){
	//console.log(this);
	return "you bet";
};

//向原型添加一个普通方法
Gadget_5.prototype.setPrice = function(price){
	this.price = price;
};

//调用静态方法
(Gadget_5.isShiny());

//创建一个实例并调用其方法
var iphone_5 = new Gadget_5();
iphone_5.setPrice(500);

//consoel.log(typeof Gadget_5.setPrice); // undefined
//console.log( typeof iphone.isShiny);	//undefined

// 原型中添加一个新方法
Gadget_5.prototype.isShiny = Gadget_5.isShiny;
iphone_5.isShiny();	//"you bet"
//this: 
//执行 Gadget_5.isShiny(), isShiny 内部的 this 将会指向Gadget_5构造函数，
//执行 iphone.isShiny, this将会指向iphone


// 以静态或非靜态方式调用一个方法 
Gadget_6 = function(price){
	this.price = price;
};

// static method
Gadget_6.isShiny = function(){
	var msg = "you bet";

	if (this instanceof Gadget_6){
		msg += ", it costs $" + this.price + '!';
	}

	return msg;
};

// to prototype add a method
Gadget_6.prototype.isShiny = function(){
	return Gadget_6.isShiny.call(this);
	//return Gadget_6.isShiny();	// you bet
};

//Test static
Gadget_6.isShiny();	// "you bet"

var a_6 = new Gadget_6('499.99');
//console.log(a_6.isShiny());	// you bet, it costs $499.99


/////////////////
// 私有静态成员
var Gadget_7 = (function(){

	// static variable/property
	var counter = 0;
	// returning the new implementation
	// of the constructor
	return function () {
		console.log(counter += 1);
	};

}()); // execute immediately

//var g_71 = new Gadget_7();	//
//var g_72 = new Gadget_7();	//
//var g_73 = new Gadget_7();


//////////////
// 增加特权方法 getLastId 访问私有属性
var Gadget_8 = (function(){

	// static variable/property
	var counter = 0,
	NewGadget;
	// this will become the
	// new constructor implementation
	NewGadget = function () {
		counter += 1;
	};
	// a privileged method
	NewGadget.prototype.getLastId = function () {
		return counter;
	};
	// overwrite the constructor
	return NewGadget;

}()); // execute immediately

var iphone_8 = new Gadget_8();
iphone_8.getLastId();	//1
var ipod_8 = new Gadget_8();
ipod_8.getLastId();	//2
var ipad_8 = new Gadget_8();
//console.log(ipad_8.getLastId());	//3


//////////////////////////////
// 对象常量
// constructor
var Widget = function () {
	// implementation...
};
// constants
Widget.MAX_HEIGHT = 320;
Widget.MAX_WIDTH = 480;

////////////////
// constont 对象方法实现方法示例
// 静态私有变量实现

var constant = (function () {
	var constants = {},
	ownProp = Object.prototype.hasOwnProperty,
	allowed = {
		string: 1,
		number: 1,
		boolean: 1
	},
	prefix = (Math.random() + "_").slice(2);
	//console.log(prefix);

	return {
		set: function (name, value) {
			if (this.isDefined(name)) {
				return false;
			}
			if (!ownProp.call(allowed, typeof value)) {
				return false;
			}
			constants[prefix + name] = value;
			return true;
		},
		isDefined: function (name) {
			//console.log(ownProp.call(constants, prefix + name));
			//console.log(constants.hasOwnProperty(prefix + name));	//same
			return ownProp.call(constants, prefix + name);
		},
		get: function (name) {
			if (this.isDefined(name)) {
				return constants[prefix + name];
			}
			return null;
		}
	};
}());

//Testing the implementation
constant.isDefined("maxwidth");//flase
constant.set("maxwidth", 480);	//true
//console.log(constant.isDefined("maxwidth"));
constant.set("maxwidth", 320);	//flase
//console.log( constant.get("maxwidth") );	//480

////////////////////////////////////
// Chaining Pattern 链模式
var obj = {
	value: 1,
	increment: function () {
		this.value += 1;
		//console.log(this.value);
		return this;
	},
	add: function (v) {
		this.value += v;
		return this;
	},
	shout: function () {
		console.log(this.value);
	}
};
// chain method calls
// obj.increment().add(3).shout(); // 5

// as opposed to calling them one by one
obj.increment();
obj.add(3);
// obj.shout(); // 5



////////////////////
// method 方法的实现
// 解决：
// this 添加方法机制，每个实现都重新创建，效率低下,
// 如果没有方法，将其为为implementation参数传递给构造函数的原型。
// this 指的是构造函数，其原型得到了增强。
if (typeof Function.prototype.method !== "function"){
	Function.prototype.method = function(name, implementation){
		this.prototype[name] = implementation;
		return this;
	};
}

/**
 * method 方法 
 * 接收两个参数
 * @param 新方法的名称
 * @param 方法的实现
 **/
var Person = function(name){
	this.name = name;
}.
method('getName', function(){
	return this.name;
}).
method('setName', function(name){
	this.name = name;
	return this;
});

var a = new Person('Adam');
console.log( a.getName() );	// 'Adam'
console.log( a.setName('Eve').getName() );	//Eve











