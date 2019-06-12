// 客户端检测
//    能力检测(特性检测)
//      更可靠的能力检测
//      能力检测, 不是浏览器检测
//    怪癖检测(quirk)
//    用户代理检测
//    navigator.userAgent: 由客户机发送服务器的 user-agent 头部的值
//      .appcodeName: 浏览器的代码名
//      .appMinorVersion: 浏览器的次级版本
//      .appName: 浏览器的名称
//      .appVersion: 浏览器的平台和版本信息
//      .browserLanguarge: 当前浏览器的语言
//      .cookieEnabled: 指明浏览器中是否启用 cookie 的布尔值
//      .cpuClass: 浏览器系统的 CPU 等级
//      .onLine: 指明系统是否处于脱机模式的布尔值
//      .platform: 运行浏览器的操作系统平台
//      .systemLanguage: OS 使用的默认语言
//      .userLanguage: OS 的自然语言设置
//    window.opera
//      用户代理字符串的历史
//      用户代理字符串检测技术

// 能力检测
function getElement(id) {
  if (document.getElementById) {
    return document.getElementById(id)
  } else if (document.all) {
    return document.all[id]
  } else {
    throw new Error('No way to retrieve element!')
  }
}

function getWindowWidth() {
  if (document.all) {
    //假设是IE, 也可能是Opera
    return document.documentElement.clientWidth //错误的方法!
  } else {
    return window.innerWidth
  }
}

/** 更可靠的能力检测
 *  尽量使用 typeof 进行能力检测
 */
function isSortable(object) {
  //检测对象是否存在 sort 方法
  //不要这样做, 这不是能力检测-只是检测到了是否存在相应的方法
  return !!object.sort
}
function isSortable(object) {
  //这样更好,
  return typeof object.sort == 'function' //检测sort是不是函数
}
//var result = isSortable({sort: true});
//console.log(result);

/** 大多数浏览器可以, IE8 之前版本不行,
 *  IE8之前返回的是"object" 而不是 "function", DOM对象是宿主对象,
 *  IE及更早版本中的宿主对象是通过COM而非JScript实现的,
 *  document.createElement()函数返回一个COM对象
 *  所以typeof才会返回"object", IE9纠正了这个问题
 */
function hasCreateElement() {
  return typeof document.createElement == 'function'
}
hasCreateElement() // => true

//var xhr = new ActiveXObject("Microsoft.XMLHttp");
//if (xhr.open) { //error
//}

/**
 * 在浏览器测试任何对象的某个特性是否存在
 */
function isHostMethod(object, property) {
  var t = typeof object[property]
  return (
    t == 'function' || !!(t == 'object' && object[property]) || t == 'unknown'
  )
}
// var xhr = new ActiveXObject("Microsoft.XMLHttp");
// result = isHostMethod(xhr, "open"); //true
// result = isHostMethod(xhr, "foo");  //false

/**********************************************/
txt = '<p>Browser CodeName: ' + navigator.appCodeName + '</p>'
txt += '<p>Browser Name: ' + navigator.appName + '</p>'
txt += '<p>Browser Version: ' + navigator.appVersion + '</p>'
txt += '<p>Cookies Enabled: ' + navigator.cookieEnabled + '</p>'
txt += '<p>Platform: ' + navigator.platform + '</p>'
txt += '<p>User-agent header: ' + navigator.userAgent + '</p>'
txt += '<p>User-agent language: ' + navigator.systemLanguage + '</p>'

txt

/**************************************************
 * 9.1.2 能力检测, 不是浏览器检测
 */

//确定浏览器是否支持Netscape风格插件
var hasNSPlugins = !!(navigator.plugins && navigator.plugins.length)
//确定浏览器是否具有DOM1级规定的能力
var hasDOM1 = !!(
  document.getElementById &&
  document.createElement &&
  document.getElementsByTagName
)
hasNSPlugins // => true
hasDOM1 // => true

/**
 * 9.2 怪癖检测( quirks detection )
 *      :是想要知道浏览器存在什么缺陷("怪癖"也就是bug)
 */
var hasDontEnumQuirk = (function() {
  var o = {
    toString: function() {}
  }
  for (var prop in o) {
    if (prop == 'toString') {
      return false
    }
  }
  return true
})()
hasDontEnumQuirk // => false, 是否IE

var hasEnumShadowsQuirk = (function() {
  var o = {
    toString: function() {}
  }
  var count = 0
  for (var prop in o) {
    if (prop == 'toString') {
      count++
    }
  }
  return count > 1
})()
hasEnumShadowsQuirk // => false

/**
 * 9.3 用户代理检测
 *      电子欺骗( spoofing )
 *     9.3.1 用户代理字符串的历史
 *     9.3.2 用户代理字符串检测技术
 */

//输出用户代理字符串
//        var ua = navigator.userAgent;
//        console.log(ua);

/**
 * 识别呈现引擎
 */
var client = (function() {
  var engine = {
    //呈现引擎
    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,
    ver: null
  }
  //在此检测呈现引擎, 平台和设备
  return {
    engine: engine
  }
})()
if (client.engine.ie) {
  //IE code
} else if (client.engine.gecko > 1.5) {
  if (client.engine.ver == '1.8.1') {
    //version code
  }
}

/**
 * 识别呈现引擎
 **/
var engine = {}
var ua = navigator.userAgent

//识别opera 对象
if (window.opera) {
  engine.ver = window.opera.version()
  engine.opera = parseFloat(engine.ver)
} else if (/AppleWebKit\/(\S+)/.test(ua)) {
  //AppleWebKit(Chrome, safair)
  engine.ver = RegExp['$1']
  engine.webkit = parseFloat(engine.ver)
} else if (/KHTML\/(S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
  //KHTML
  engine.ver = RegExp['$1']
  engine.khtml = parseFloat(engine.ver)
} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
  //Gecko(FireFox)
  engine.ver = RegExp['$1']
  engine.gecko = parseFloat(engine.ver)
} else if (/MSIE ([^;]+)/.test(ua)) {
  //IE
  engine.ver = RegExp['$1']
  engine.ie = parseFloat(engine.ver)
}
ua // => Mozilla/5.0..
engine.webkit // => 537.36

/**
 * 2.识别浏览器
 */
var client = (function() {
  var engine = {
    //呈现引擎
    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,
    ver: null //具体的版本
  }
  var browser = {
    //浏览器
    ie: 0,
    firefox: 0,
    safari: 0,
    konq: 0,
    opera: 0,
    chrome: 0,
    ver: null //具体版本
  }

  return {
    // 在此检测呈现引擎, 平台和设备
    engine: engine,
    browser: browser
  }
})()

var engine = client.engine
var browser = client.browser
var ua = navigator.userAgent

if (window.opera) {
  engine.ver = browser.ver = window.opera.version()
  engine.opera = browser.opera = parseFloat(engine.ver)
} else if (/AppleWebKit\/(\S+)/.test(ua)) {
  engine.ver = RegExp['$1']
  engine.webkit = parseFloat(engine.ver)
  if (/Chrome\/(\S+)/.test(ua)) {
    // Chrome
    browser.ver = RegExp['$1']
    browser.chrome = parseFloat(browser.ver)
  } else if (/Version\/(\S+)/.test(ua)) {
    // Safari,适合高版本
    browser.ver = RegExp['$1']
    browser.safari = parseFloat(browser.ver)
  } else {
    var safariVersion = 1 // 近似的确定版本号
    if (engine.webkit < 100) {
      safariVersion = 1
    } else if (engine.webkit < 312) {
      safariVersion = 1.2
    } else if (engine.webkit < 412) {
      safariVersion = 1.3
    } else {
      safariVersion = 2
    }
    browser.safari = browser.ver = safariVersion
  }
} else if (/KHTML\/(S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
  //KHTML(konq)
  engine.ver = browser.ver = RegExp['$1']
  engine.khtml = browser.konq = parseFloat(engine.ver)
} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
  //Gecko(FireFox)
  engine.ver = RegExp['$1']
  engine.gecko = parseFloat(engine.ver)
  if (/Firefox\/(\S+)/.test(ua)) {
    browser.ver = RegExp['$1']
    browser.firefox = parseFloat(browser.ver)
  }
} else if (/MSIE ([^;]+)/.test(ua)) {
  engine.ver = browser.ver = RegExp['$1']
  engine.ie = browser.ie = parseFloat(engine.ver)
}
ua // => Mozilla/5.0 ...
browser.ver // => 31.0.1650.63

if (client.engine.webkit) {
  //if it's WebKit
  if (client.browser.chrome) {
    //Chrome code
  } else if (client.browser.safari) {
    //Safari code
  }
} else if (client.engine.gecko) {
  if (client.browser.firefox) {
    //firefox code
  } else {
    //execute others Gecho code
  }
}

/**
 * 3.识别平台
 * navigator.platform
 */
var client = (function() {
  var engine = {
    //呈现引擎
    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,
    ver: null //具体的版本
  }
  var browser = {
    //浏览器
    ie: 0,
    firefox: 0,
    safari: 0,
    konq: 0,
    opera: 0,
    chrome: 0,
    ver: null //具体版本
  }
  var system = {
    win: false,
    mac: false,
    xll: false
  }

  return {
    //在此检测呈现引擎, 平台和设备
    engine: engine,
    browser: browser,
    system: system
  }
})()
var p = navigator.platform
var ua = navigator.userAgent
p // => Win32
var system = client.system
system.win = p.indexOf('Win') == 0
system.mac = p.indexOf('Mac') == 0
system.xll = p.indexOf('X11') == 0 || p.indexOf('Linux') == 0
system.win // => true

/**
 * detect windows operating systems
 */
if (system.win) {
  if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
    if (RegExp['$1'] == 'NT') {
      switch (RegExp['$2']) {
        case '5.0':
          system.win = '2000'
          break
        case '5.1':
          system.win = 'XP'
          break
        case '6.0':
          system.win = 'Vista'
          break
        case '6.1':
          system.win = '7'
          break
        default:
          system.win = 'NT'
          break
      }
    } else if (RegExp['$1'] == '9x') {
      system.win = 'ME'
    } else {
      system.win = RegExp['$1']
    }
  }
}
system.win // => 7