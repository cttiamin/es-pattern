/////////////////////////////////////////
// 装饰者模式 Decorator
// 可以在运行时动态添加附加功能到对象
//
// 场景：es7 装饰器

function Sale(price){
	this.price = price || 100;
}

Sale.prototype.getPrice = function(){
	return this.price;
};


Sale.decorators = {};
Sale.decorators.fedtax = {
	getPrice: function () {
		console.log('fedtax getPrice');
		var price = this.uber.getPrice();
		price += price * 5 / 100;
		return price;
	}
};

Sale.decorators.quebec = {
	getPrice: function () {
		console.log('quebec getPrice');
		var price = this.uber.getPrice();
		price += price * 7.5 / 100;
		return price;
	}
};
Sale.decorators.money = {
	getPrice: function () {
		console.log('money getPrice');
		return "$" + this.uber.getPrice().toFixed(2);
	}
};
Sale.decorators.cdn = {
	getPrice: function () {
		return "CDN$ " + this.uber.getPrice().toFixed(2);
	}
};

Sale.prototype.decorate = function (decorator) {
	var F = function () {},
	overrides = this.constructor.decorators[decorator],
	i, newobj;

	//继承现有对象
	F.prototype = this;
	//	console.log(this.__proto__.constructor);
	//console.log(this);
	newobj = new F();
	// 依次调用父级 this.uber.getPrice(), 直到getPrice()
	newobj.uber = F.prototype;

	// 遍历对象
	for (i in overrides) {
		if (overrides.hasOwnProperty(i)) {
			newobj[i] = overrides[i];
			//			console.log(i);
		}
	}
	return newobj;

};

var sale = new Sale(100);				//该价格为100美元
sale = sale.decorate('fedtax'); //增加联邦税
sale = sale.decorate('quebec'); //增加省级税
sale = sale.decorate('money');  //格式化为美元货币形式
console.log(sale);
console.log( sale.getPrice() );	// $112.88

var sale = new Sale(100);	//该价格为 100美元
sale = sale.decorate('fedtax'); //增加联邦税
sale = sale.decorate('cdn'); //格式化为CDN形式
//console.log( sale.getPrice() );	// "CDN$ 105.00"


////////////////////////////////////////
// 使用列表实现 

function Sale2(price) {
	this.price = (price > 0) || 100;
	this.decorators_list = [];
}
Sale2.decorators = {};
Sale2.decorators.fedtax = {
	getPrice: function (price) {
		return price + price * 5 / 100;
	}
};
Sale2.decorators.quebec = {
	getPrice: function (price) {
		return price + price * 7.5 / 100;
	}
};
Sale2.decorators.money = {
	getPrice: function (price) {
		return "$" + price.toFixed(2);
	}
};

Sale2.prototype.decorate = function (decorator) {
	this.decorators_list.push(decorator);
};
Sale2.prototype.getPrice = function () {
	var price = this.price,
	i,
	max = this.decorators_list.length,
	name;
	for (i = 0; i < max; i += 1) {
		name = this.decorators_list[i];
		price = Sale2.decorators[name].getPrice(price);
	}
	return price;
};


//////////////////////////////////////////
// es6
class Circle {
  draw() {
    console.log('画一个圆形')
  }
}

class Decorator {
  constructor(circle) {
    this.circle = circle
  }
  draw() {
    this.circle.draw()
    this.setRedBorder(circle)
  }
  setRedBorder(circle) {
    console.log('设置红色边框')
  }
}

// let circle = new Circle()
// circle.draw()
// console.log('-----装饰之后-----')
// let dec = new Decorator(circle)
// dec.draw()


//////////////////////
// es7 装饰器
// @testDec
// class Demo {

// }
// function testDec(target) {
//   target.isDec = true
// }
// console.log(Demo.isDec)







