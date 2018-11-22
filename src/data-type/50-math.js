/**********************************************************
 *  Chapter 5 引用类型, 5.7 单体内置对象, 20140325 Tuesday
 *  Global 对象
 *
 * Math 数学运算符
 * Math.max() : 取最大数,
 * Math.min() : 取最小数
 * 舍入方法
 *      Math.ceil():  取整(往上,取大)
 *      Math.round(): 取整
 *      Math.floor(): 取整(住下,取小)
 * Math.random() :随机生成
 *      取 0.10000 - 0.999999 之间的数
 *
 *
 *********************************************************/

//var color = "red";
//function sayColor() {
//    alert(window.color);
//}
//window.sayColor();  //red

//Window 对象
//        var color = "red";
//        function sayColor(){
//            console.log(window.color);
//        }
//        window.sayColor();  //"red"
//获取window object
//        var global = function () {
//            return this;
//        }();
//        console.log(global);

//Math
//        console.log(Math.PI);
//        console.log(Math.LN2);      //2的自然对数
//        console.log(Math.LN10);     //1的自然对数
//        console.log(Math.SQRT2);    //2的平方根

//取大,取小
//        var max = Math.max(3, 54, 32, 16);
//        console.log(max);   //54
//        var min = Math.min(3, 54, 32, 16);
//        console.log(min);

//舍入方法
//                alert(Math.ceil(25.9));     //26
//                alert(Math.ceil(25.5));     //26
//                alert(Math.ceil(25.1));     //26
//
//        alert(Math.round(25.9));    //26
//        alert(Math.round(25.5));    //26
//        alert(Math.round(25.1));    //25
//
//        alert(Math.floor(25.9));    //25
//        alert(Math.floor(25.5));    //25
//        alert(Math.floor(25.1));    //25

//console.log(Math.random() * 9);

//1-10
//alert( Math.floor(Math.random() * 10 + 1) );
//2-10
//alert( Math.floor(Math.random() * 9 + 2) );

//随机生成　1-10　的数
function selectFrom(lowerValue, upperValue) {
  var choices = upperValue - lowerValue + 1
  return Math.floor(Math.random() * choices + lowerValue)
}
//        var num = selectFrom(2, 10);
//        console.log(num);   //介于2到10之间的数(包括2,10)

//        var colors = ["red", "green", "blue", "yellow", "black", "purple", "brown"];
//        var color = color[ selectFrom(0, colors.length - 1) ]; //在数组中随机取出
//        console.log(color);

/**
 * 计算两个笛卡尔坐标(x1, y1)和(x2, y2)之间的距离
 */
function distance(x1, y1, x2, y2) {
  var dx = x2 - x1
  var dy = y2 - y1
  return Math.sqrt(dx * dx + dy * dy)
}
