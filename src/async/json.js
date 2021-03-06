// 三种类型的值:
//   简单值:String,number,boolean,null. 不支持 undefined
//      "HelloWorld" 必须使用双引号
//   对象: 表示一组有序的键值对儿, 是简单值也可是复杂数据类型的值
//      JSON对象与js对象相比下:
//        1.对象属性加双引号
//        2.没有声明变量
//        3.没有尾分号";"
//   数组:表示一组有序的值列表
//
// 解析与序列化
//   support: IE8+
//   JSON.stringify: 序列化,把JavaScript对象序列化为JSON字符串,
//     1.所有函数及原型成员都会被有意忽略
//     2.值为undefined的任何属性也都会被跳过
//   JSON.parse(): 解析,把JSON字符串解析为原生JavaScript值.

//解析与化解
var book = {
  title: 'Professional JavaScript',
  authors: ['Nicholas C. Zakas'],
  edition: 3,
  year: 2011
}
//    var jsonText = JSON.stringify(book);    //js序列化一个JSON字符串
//    console.log(jsonText);
//    var bookCopy = JSON.parse(jsonText);
//    console.log(bookCopy.title);

/***20.2.2 序列化选项
 *      stringify()可另接收两个( 过滤器Array/过滤函数(replacer) ,选项是否在JSON中保留缩进)
 *          1.过滤结果
 */
var jsonText = JSON.stringify(book, ['title', 'edition'])
//        console.log(jsonText);

/**
 * 函数作为过滤器
 */
var jsonText = JSON.stringify(book, function(key, value) {
  switch (key) {
    case 'authors':
      return value.join(',')
    case 'year':
      return 5000
    case 'edition': //通过undefined忽略
      return undefined
    default:
      //此外一定要写
      return value
  }
})
//    console.log(jsonText);

/**2.字符串缩进
 *      最大换缩进数为10,
 *      如果 传入非数值 则以字符串为前缀
 */
var jsonText = JSON.stringify(book, null, 4) //每个级别缩进4个
//    console.log(jsonText);

var jsonText = JSON.stringify(book, null, '--')
//    console.log(jsonText);

/** 3.toJSON方法
 *      Date.toJSON() 与 toISOString())结果一样
 *      与Date类似,这个对象也可以被序列为一个简单的字符串而非对象,
 *      可以让toJSON()返回 任何可序列化的值,
 *
 *      当把一个对象传入stringify():
 *      1.如果存在toJSON()方法而且通过它能取得有效的值,则调用该方法
 *      2.如果提供了第二个参数,应用这个函数过滤器,传入函数的值是 1步 返回值
 *      3.如果 2步 返回的每个值进行想应的序列化
 *      4.如果提供了第三参数,执行相应的格式
 */
var book = {
  title: 'Professional JavaScript',
  authors: ['Nicholas C. Zakas'],
  edition: 3,
  year: 2011,
  toJSON: function() {
    return this.title
  }
}
var jsonText = JSON.stringify(book)
//    console.log(jsonText);

/**
 * 20.2.3 解析选项
 * JSON.parse(还原函数(reviver)):
 */
var book = {
  title: 'Professional JavaScript',
  authors: ['Nicholas C. Zakas'],
  edition: 3,
  year: 2011,
  releaseDate: new Date(2014, 6, 18)
}
var jsonText = JSON.stringify(book)
var bookCopy = JSON.parse(jsonText, function(key, value) {
  if (key == 'releaseDate') {
    return new Date(value)
  } else {
    return value
  }
})
//    console.log(bookCopy.releaseDate.getFullYear());
