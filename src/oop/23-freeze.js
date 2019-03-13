// isExtensible: 判断该对象是否是可扩展的
// preventExtensions:  将对象转换为不可扩展的, 一旦转换便不可逆转
// seal: 将对象设置为不可扩展的,还可以将对象的所有自有属性都设置为不可配置的
// isSealed: 检测对象是否封闭
// freeze(): 将更严格地锁定对象. "冻结"(frozen),
//   除不可扩展, 不可配置, 还将所有数据设为只读
// isFrozen():  是否已经冻结


/** 
 * 防篡改对象
 *  任何对象都可以被在同一环境中运行的代码修改.
 *  手工设置每个属性的 [[Configurable]],
 *  [[Writable]], [[Enumerable]],[[Value]],[[Get]] 以及 [[Set]]特性,改变属性的行为
 *      一旦定义为防篡改,就无法撤销了.
 *
 *      Object.preventExtensions : 禁止扩展
 *      Object.isExtensible: 是否可扩展
 */

var person = {name: "Nicholas" };
(Object.isExtensible(person));   //true
Object.preventExtensions(person);   //改变行为
(Object.isExtensible(person));   //false
person.age = 29;
(person.age);//undefined


/***********************************
 * 22.2.2 密封的对象 (sealed object)
 *  密封对象不可扩展, 而且有成员的[[Configurable]]特性将设置为false,
 *  不能删除属性和方法, 因不能使用 Object.defineProperty() 
 *  把数据属性修改为访问属性
 * 
 *  Object.seal(): 防止修改现有属性的特性，并防止添加新属性。
 *  Object.isSealed():是否被密封
 */

var person = { name:"Nicholas" };
(Object.isSealed(person));  //false
(Object.isExtensible(person)); //true
Object.seal(person);
(Object.isSealed(person));//true
(Object.isExtensible(person));//false
person.age = 29;
(person.age);    //undefined
delete person.name;
(person.name);   //"Nicholas"



/************************************
 * 22.2.3 冻结的对象 (frozen object)
 *  即不可扩展, 又是密封的. 
 *  页面对象与密封和不允许扩展一样,
 */

var person  = { name : "Nicholas" };
(Object.isExtensible(person));   //true
(Object.isSealed(person));   //false
(Object.isFrozen(person));   //false
Object.freeze(person);
(Object.isExtensible(person));   //false
(Object.isSealed(person));   //true
(Object.isFrozen(person));   //true
person.age = 29;
(person.age);    //undefined
delete person.name;
(person.name);   //"Nicholas"
person.name = "Greg";
(person.name);   //"Nicholas"