//  open(post/get, url, true异步/false同步)
//  send(要作为请求主体发送的数据/null) :
//  responseText: 作为响应主体被返回的文本
//  responseXML: 如果响应的内容类型是"text/html"或"application/xml"
//         这个属性中将保存包含着响应数据的XML DOM文档
//         对非XML数据而言 responseXML 属性的值为 null
//  status: 响应 HTTP 状态
//    200:成功
//    300:多种选择 服务器根据请求可执行多种操作.
//    301：永久
//    302: 临时
//    304: 请求的资源并没有修改,可以直接用浏览器中缓存的版本
//    403: 没权限
//    404: 地址错误，文件不存在
//    500:服务器内部错误
//
//  statusText: HTTP 状态的说明 跨浏览器不可靠
//
//  readyState: 请求/响应过程的当前活动阶段
//        0: 未初始化, 尚未调用 open 方法
//        1: 启动, 已调用 open方法, 未调用 send 方法
//        2: 发送, 已调用 send 方法, 未接收到响应
//        3: 交互, 已收到部分响应数据
//        4: 完成, 已接收到全部响应数据, 已可以在客户端使用
//  onreadystatchange: 当 readySate 值发生改变时触发
//      事件处理程序必须在 open() 前指定, 才能确保跨浏览器兼容性
//
//  abort: 在接收到响应之前 取消正在理行的 HTTP 请求
//      调用后会停止触发事件 不在允许访问任何与响有关的对象事件
//
// HTTP头部信息
//  XHR对象两种头(请求头部 接收头部)
//    Accept: 浏览器能够处理的内容类型
//    Accept-Charset: 浏览器能够显示的字符集
//    Accept-Encoding: 浏览器能够处理的压缩编码
//    Accept-Language: 浏览器当前设置的语言
//    Connection:浏览器与服务器之间连接的类型
//    Cookie: 当前页面设置的任何 Cookie
//    Host: 发出请求的页面所有域
//    Referer: 发出请求的页面的URL.(referrer)
//    User-Agent: 浏览器的用户代理字符串
//
//    xhr.setRequestHeader(头部字段名, 头部字段值): 设置请求头信息
//    xhr.getResponseHeaders(): 单个响应头信息
//    xhr.getAllResponseHeaders(): 所有响应头部信息
//
// FormData
//    FormData 类型 : 序列化表单及创建与表单格式相同的数据(用于通用XHR传输)
//    append(键, 值): 向构造函数中传入表单元素,
//      也可用表单数据预先向其中填入键值对
//
// 超时
//  xhr.timeout: 
//  xhr.ontimeout = fn: 超时回调
//    请求终止时调用 ontimeout 事件处理, 但 readyState 可能已经改变为4了
//    就会调用 onreadystatechange 事件处理程序

// var local_get = 'http://localhost:18001/?a=1&b=2&c=3';
var local_get = '/get?a=1&b=2&c=3';
var local_post = '/post';


var url_get_page = '/lenovo/bookResource/2417/page006/797950'
var url_post_user = 'https://education.lenovo.com.cn/process_set'

// node server-ajax.js
// http://localhost:9001/async/index.html
// +
// node node/030_express/020_router.js

// 队列事件
import {whenReady} from '../assets/js/when-ready'
// 表单序列化
import {serialize} from '../assets/js/serialize'
// 版本兼容
import {createXHR, createXHRState} from './11-create-xhr'

var collbackFunc = function(data){
  console.log(data);
}

var xhr = createXHR();

function getRequest(url, callback) {
  xhr.open('get', url, true); // 异步请求 
  // 发送纯文本给服务器
  xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
  // 超时设置
  // xhr.timeout = 5000;
  // xhr.ontimeout = function(){
  //    console.log("Request did not return in a second.");
  // };
  xhr.onreadystatechange = function() {
    console.log(xhr.readyState);
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        // 获取头信息
        var contentType = xhr.getResponseHeader('Content-Type');
        var allHeaders = xhr.getAllResponseHeaders(); // 所有头信息
        console.log('Content-Type: ', contentType, 
          '\nAllHeaders: ', allHeaders)

        if (contentType.match(/^text/)) {
          callback(xhr.responseText);
        } else if (contentType.indexOf('xml') !== -1 
          && xhr.responseXML) {
          callback(xhr.responseXML); // Document response
        }
        else if (contentType === 'application/json'){
          callback(JSON.parse(xhr.responseText)); // JSON response
        }
        else {
          callback(xhr.responseText); // String response
        }
      } else {
        console.log('Request was unsuccessful:' + xhr.status);
      }
    }
  };
  xhr.send(null);
}

// getRequest(url_get_page, collbackFunc)

// 添加请求字段 查询字符串格式良好
function addURLParam(url, name, value) {
  url += url.indexOf('?') == -1 ? '?' : '&';
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
  return url;
}
url_get_page = addURLParam(url_get_page, 'uid', '8394');


//////////////////////
//  用 XHR 模仿表单提交 POST 请求:
//  1.Content-Type: application/x-www-form-urllencoded: 
//      表单提交时 数据编码的MIME类型
//  2.以适当的格式创建一个字符串, 如果通过表单的数据序列化,
//    在通过XML发送到服务器用的 serialize 函数创建这个字符串
function submitData() {
  var xhr = createXHR();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        console.log(xhr.responseText);
      } else {
        console.log('Request was unsuccessful : ' + xhr.status);
      }
    }
  };
  xhr.open('post', 'server/210_postexample.php', true);
  // 发送给服务器数据 保存在 $_POST 全局变量中
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var form = document.getElementById('user-info');
  // console.log(serialize(form));
  xhr.send(serialize(form));
  // 序列化的表单作为请求主体
}


//  HTTP 编码请求主体
function encodeFormData(data) {
  if (!data) return ''; // Always return a string
  var pairs = []; // To hold name=value pairs
  for (var name in data) {
    // For each name
    if (!data.hasOwnProperty(name)) continue; // Skip inherited
    if (typeof data[name] === 'function') continue; // Skip methods
    var value = data[name].toString(); // Value as string
    name = encodeURIComponent(name.replace(' ', '+')); // Encode name
    value = encodeURIComponent(value.replace(' ', '+')); // Encode value
    pairs.push(name + '=' + value); // Remember name=value pair
  }
  return pairs.join('&'); // Return joined pairs separated with &
}

var post_data = {
  name: 'ZhangSan',
  token: 'abc',
  age: 32
};
// console.log(encodeFormData(post_data));

// 用表单编码数据发起 POST 请求
// abort: 取消正在进行的 HTTP 请求
function postData(url, data, callback, timeout) {
  var request = xhr;

  var timedout = false; // Whether we timed out or not.
  // Start a timer that will abort the request after timeout ms.
  var timer = setTimeout(function() {
    // Start a timer. If triggered,
    timedout = true; // set a flag and then
    request.abort(); // abort the request.
  }, timeout); // How long before we do this

  request.open('POST', url);
  // 强制当作XML来处理 ie不支持
  // request.overrideMimeType("text/xml");   
  request.onreadystatechange = function() {
    if (request.readyState !== 4) return
    if (timedout) return; // Ignore aborted requests.
    clearTimeout(timer); // Cancel pending timeout.

    if (request.readyState === 4 && callback)
      callback(request);
  };
  request.setRequestHeader(
    'Content-Type', // Set Content-Type
    'application/x-www-form-urlencoded'
  );
  request.send(encodeFormData(data));// Send form-encoded data

  // 使用 JSON 编码主体来发起 HTTP POST请求
  // request.setRequestHeader('Content-Type', 'application/json');
  // request.send(JSON.stringify(data));

}
// 发起一个 post 请求
// postData(url_post_user, post_data, collbackFunc, 5000);


// 使用 HTTP POST 请求上传文件
whenReady(function() {
  // Run when the document is ready
  var elts = document.getElementsByTagName('input'); // All input elements
  for (var i = 0; i < elts.length; i++) {
    // Loop through them
    var input = elts[i];
    if (input.type !== 'file') continue; // Skip all but file upload elts
    var url = input.getAttribute('data-uploadto'); // Get upload URL
    if (!url) continue; // Skip any without a url

    input.addEventListener('change', function() {
      // When user selects file
      var file = this.files[0]; // Assume a single file selection
      if (!file) return; // If no file, do nothing
      var xhr = new XMLHttpRequest(); // Create a new request
      xhr.open('POST', url); // POST to the URL
      xhr.send(file); // Send the file as body
    }, false);
  }
});