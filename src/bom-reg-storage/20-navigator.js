/////////////////////////////////
// navigator
//   浏览器的屏信息,识别客户端浏览器的事实标准
//   appName:browser全称,
//   appVersion: 浏览器厂商版本信息
//   userAgent: 浏览器在它的USER-AGENT HTTP头部中发送的字符串
//   platform: 在其上运行浏览器的操作系统
//   plugins: 插件
//   onLine: 表示当前浏览器当前是否连接到网络
//   geolocation: Geolocation对象定义用于确定用户地理位置信息的接口.
//   javaEnabled(): 一个非标准的方法,当浏览器可以运行java小程序时返回true
//   cookieEnable(): 非标准方法,如果浏览器可以保存永久的cookie时,返回true.
//
// 同步, 异步和延迟的脚本

navigator.appName // => Netscape
navigator.appVersion // => 5.0 (window NT ...
navigator.userAgent.toLowerCase() // => mozilla/5.0 ...
navigator.platform // => Win32

/**
 * 使用 navigator.userAgent 来进行浏览器嗅探
 * Define browser.name and browser.version for client sniffing, using code
 * derived from jQuery 1.4.1. Both the name and number are strings, and both
 * may differ from the public browser name and version. Detected names are:
 *
 *   "webkit": Safari or Chrome; version is WebKit build number
 *   "opera": the Opera browser; version is the public version number
 *   "mozilla": Firefox or other gecko-based browsers; version is Gecko version
 *   "msie": IE; version is public version number
 *
 * Firefox 3.6, for example, returns: { name: "mozilla", version: "1.9.2" }.
 */
var browser = (function() {
  var s = navigator.userAgent.toLowerCase()
  var match =
    /(webkit)[ \/]([\w.]+)/.exec(s) ||
    /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(s) ||
    /(msie) ([\w.]+)/.exec(s) ||
    (!/compatible/.test(s) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s)) ||
    []
  return { name: match[1] || '', version: match[2] || '0' }
})()
//for(var p in browser) console.log(p +" : "+browser[p]);

/**
 *  检测插件
 *  对于非IE浏览器, 可用plugins 数组来达到这个目的, plugins 包含以下属性:
 *  name, description, filename, length
 */
function hasPlugin(name) {
  name = name.toLowerCase()
  for (var i = 0; i < navigator.plugins.length; i++) {
    if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
      return true
    }
  }
  return false
}
hasPlugin('Flash') // => true, 检测Flash
hasPlugin('QuickTime') // => false, 检测QuickTime

/**
 *  检测IE中的插件
 *  IE不支持Netscape式的插件, 唯一的方式是用专有的 ActiveXObject类型,
 *  IE是以COM对象的方式实现插件的, 而COM对象使用唯一标识符来标识,
 *  so要检测特定的插件, 就必须知道其COM标识符,
 *  例如Flash的标识符是ShockwaveFlash.ShockwaveFlash
 */
function hasIEPlugin(name) {
  try {
    new ActiveXObject(name)
    return true
  } catch (ex) {
    return false
  }
}
hasIEPlugin('ShockwaveFlash.ShockwaveFlash') //detect flash
hasIEPlugin('QuickTime.QuickTime') //detect quicktime

/*
 * 两种方法差别较大, so 针对每个插件分别创建检测函数,
 */
function hasPlugin(name) {
  name = name.toLowerCase()
  for (var i = 0; i < navigator.plugins.length; i++) {
    if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
      return true
    }
  }
  return false
}
function hasIEPlugin(name) {
  //plugin detection for IE
  try {
    new ActiveXObject(name)
    return true
  } catch (ex) {
    return false
  }
}
function hasFlash() {
  //detect flash for all browsers
  var result = hasPlugin('Flash')
  if (!result) {
    result = hasIEPlugin('ShockwaveFlash.ShockwaveFlash')
  }
  return result
}
function hasQuickTime() {
  //detect quicktime for all browsers
  var result = hasPlugin('QuickTime')
  if (!result) {
    result = hasIEPlugin('QuickTime.QuickTime')
  }
  return result
}
hasFlash() // detect flash
hasQuickTime() // detect quicktime

//////////////////////////////////////
// 同步, 异步和延迟的脚本
// defer 和 sync 属性都像在告诉浏览器链接进来的脚本不会使用 document.write().
// 也不会生成文档内容,
// defer: 使浏览器延迟脚本的执行,直到文档的载入和解析完成,并可以操作.
// async: 属性使得浏览器可以尽快地执行脚本,而不用在下载脚本时阻塞文档解析
// 如果时使用这两个属性,会遵从 async 属性并忽略 defer 属性

// script type="text/javascript" defer src="deferred.js"></script>
// script type="text/javascript" async src="async.js"></script>

// defer, async 属性还没有广泛实现, 它们只被一些优化建议所考虑
// 通过 <script> 元素并把它插入到文档中, 来实现脚本的异步载入和执行
// Asynchronously load and execute a script from a specified URL
function loadasync(url) {
  // Find document <head>
  var head = document.getElementsByTagName('head')[0]
  var s = document.createElement('script') // Create a <script> element
  s.src = url // Set its src attribute
  head.appendChild(s) // Insert the <script> into head
}

// <!--[if IE]>
// <script src="lib/090_client.js"></script>
// <![endif]-->
