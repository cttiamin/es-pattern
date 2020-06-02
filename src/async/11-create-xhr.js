// IE5 中 XHR 对象是通过 MSXML 库中的一个 ActiveX 对象实现
// 在IE中会遇到三种 XHR 对象 ActiveXObject:
//      MSXML2.XMLHttp
//      MSXML2.XMLHttp.3.0
//      MXSML2.XMLHttp.6.0
//
//  XMLHttpRequest: 原生 XHR 对象
//      sopport:Ie7+, firefox, opera, Chrome, Safari
//
// 适用于所有版本
// @activeXString: 自定义属性

// 惰性载入函数
// 减少没必要的 if 语句, 每次都要对浏览器反支持的能力仔细检查,
// 执行分支代码时牺牲一点性能函数的执行分支仅会发生一次, 
// 惰性载入的实现方式 (2种):

//////////////////////////////////
// 1种. 在函数被调用时再处理函数;
// 在第一次调用中,该函数会被覆盖为另外一个按合适方式执行函数,
// 这样任何对原函数的调用都不用在经过执行的分支了.
// if 语句的每一个分支都会为 createXHR 变量赋值,有效覆盖了原有的函数,
// 最后一步便是调用新赋函数. 下一次调用 createXHR() 的时候
// 就会直接调用被分配的函数, 这样就不用在执行if语句了
export function createXHR() {
  // 检测是否支持原生
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest();
  }
  // 适用于IE7之前的版本
  else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var version = [
          'MSXML2.XMLHttp.6.0',
          'MSXML2.XMLHttp.3.0',
          'MSXML2.XMLHttp',
          'Microsoft.XMLHTTP' // 新加？
        ],
        i,
        len;
      for (i = 0, len = version.length; i < len; i++) {
        try {
          new ActiveXObject(version[i]);
          arguments.callee.activeXString = version[i];
          break;
        } catch (ex) {}
      }
    }
  } else {
    throw new Error('No XHR object available.');
  }
  return new ActiveXObject(arguments.callee.activeXString);
}

//////////////////////////////////
// 2种.声明函数时指定适当的函数. 第1次调用函数时不会损失性能
// 在代码首次加载时会损失一点性能
export var createXHRState = (function () {
  //使用了 var定义函数
  if (typeof XMLHttpRequest != "undefined") {
      return function () {
          return new XMLHttpRequest();
      };
  } else if (typeof ActiveXObject != "undefined") {
      return function () {
          if (typeof arguments.callee.activeXString != "string") {
              var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                          "MSXML2.XMLHttp"],
                      i, len;
              for (i = 0, len = versions.length; i < len; i++) {
                  try {
                      new ActiveXObject(versions[i]);
                      arguments.callee.activeXString = versions[i];
                      break;
                  } catch (ex) {
                      // skip
                  }
              }
          }
          return new ActiveXObject(arguments.callee.activeXString);
      };
  } else {
      return function () {
          throw new Error("de.");
      };
  }
})();


//    var xhr1 = createXHR();
//    var xhr2 = createXHR();