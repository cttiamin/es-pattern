
/*************
 *
 *  CORS( Cross-Origin Resource Sharing ): 跨源资源共享
 *      当 get/post request 没有自定义头部, 主体是 text/plain, 
 *      发送请求需要附加一个额外的 Origin 头部
 *      包含:请求页面的源信息(协议,域名和端口)
 *      服务跟据这个信息来决定是否响应.
 *      头部示例: Origin: http://www.nczonline.net
 *      Access-Control-Allow-Origin 头部中回发相同的源信息
 *      Access-Control-Allow-Origin: http://www.nczonline.net
 *      注:请求和响应都不包含 cookie 信息
 *
 *  ie对 CORS 的实现
 *      IE8 中引入 XDR(XDomainRequest)类型, 这个对象与XHR类似,
 *          但能实现安全可靠的跨域通信
 *      XDR对象实现了W3C的CORS规范, 与XHR不同之处:
 *          1.cookie不会随请求发送, 也不会随响应返回
 *          2.只能设置请求头部信息中的Content-Type字段
 *          3.不能访问响应头部信息
 *          4.只支持GET和 POST 请求
 *      timeout 属性
 *      ontimeout 事件处理程序
 */

// 队列事件
import {whenReady} from '../assets/js/when-ready'
// 表单序列化
import {serialize} from '../assets/js/serialize'
// 版本兼容
import {createXHR, createXHRState} from './11-create-xhr'

function xmlDomainRequest() {
    var xdr = new XDomainRequest();
    xdr.onload = function () {    //在请求之后,会触发load事件
        alert(xdr.responseText);  //输出响应数据
    };
    // 如果失败(响应中缺少Access-Content-Allow-Origin头部)
    xdr.onerror = function () {   
        alert("Error!");
    };
    xdr.timeout = 1000;
    xdr.ontimeout = function(){
        alert("Request took too long.");
    };
    xdr.open("get", "http://www.tjxfjt.com.cn/test/210_xdr.php");
    xdr.contentType = "application/x-www-form-urlencoded";
    xdr.send(null);
}






/*************************************************************
 * 21.4.2 其它浏览器对 CORS的实现
 *  Support: FireFox3.5+, Safari4+, Chrome,iOS,Android 
 *  都通过 XMLHttpRequest 对象实现了对 CORS 原生支持
 *      跨域XHR对象的限制:
 *          1.不能使用 setRequestHeader
 *          2.不能发送 cookie
 *          3.调用 getAllReesponseHeaders 方法总会返回空字符串
 *
 *  XMLHttpRequest 与 XDomainRequest 共同 属性/方法:
 *      xdr.onload: 用于代替onreadystatechange检测成功
 *      xdr.onerror: 用于代替onreadystatechange检测错误
 *      xdr.abort():  终止请求
 *      xdr.responseText: 用于取得响应内容
 *      xdr.send(): 用于发送请求
 */

var xhr = createXHR();
xhr.onreadystatechange = function () {
   if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
       console.log(xhr.responseText);
   } else {
       console.log("Request was unsuccessful: " + xhr.status);
   }
}

//xhr.open("get", "http://www.tjxfjt.com.cn/test/210_xdr.php", true);
//xhr.send(null);


/****************************************************
 *
 * 21.4.3 Preflighted Requests
 *  CORS 通过一种叫做 Preflighted Requests 的透明服务器验证机制支持开发人员
 *  使用自定义头部,GET或POST之外的方法,以及不类型的主体内容.
 *  在使用下列高级选项来发送请求时,就会向服务器发送一个Preflight请求，
 *  这种请求使用OPTIONS方法：
 *      Origin: 与简单的请求相同
 *      Access-Control-Request-Method: 请求自身使用的方法
 *      Access-Control_request-Headers:(可选)自定义的头部信息,多个头部以逗号分隔
 *
 *      例:带自定义头部NCZ的使用POST方法发送的请求:
 *      Origin: http://www.nczonline.net
 *      Access-Control-Request-Method: POST
 *      Access-Control_request-Headers: NCZ
 *
 *  请求发送后,服务器可以决定是否允许这种类型的请求.
 *  服务器通过在响应中发送如下头部与浏览器进行沟通:
 *      Access-Control-Allow-Origin: 与简单的请求相同
 *      Access-Control-Allow-Method: 允许的方法, 多个方法以逗号分隔
 *      Access-Control_Allow-Headers: 允许的头部, 多个头部以逗号分隔
 *      Access-Control-Max-Age: 应该将这个Preflight请求缓存多长时间(以秒表示)
 *
 *  例如 php=>header(Access-Control-Allow-Origin: *) :
 *      Access-Control-Allow-Origin: http://www.nczonline.net
 *      Access-Control-Allow-Method: POST, GET
 *      Access-Control_Allow-Headers: NCZ
 *      Access-Control-Max-Age: 172800
 *
 *  Preflight请求结束后,结果将按照指定时间缓存起来,为此付出代价是
 *  第一次发送请求时会多一次HTTP请求
 *  Prrflight Support: FireFox3.5+, Safari4+, Chrome,ie10+
 *
 *
 *  21.4.5 跨浏览器的CORS
 *      withCredentials : 检测XHR是否支持CORS,
 *      在结合检测XDomainRequest对象是否存在,
 *****/
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

//    var request = 
//    createCORSRequest("get", "http://www.tjxfjt.com.cn/test/210_xdr.php");
//    if (request) {
//        request.onload = function () {
//            console.log(request.responseText);
//        };
//        request.send();
//    }


/****************************************************************
 * 权威指南
 * 例18-13: 例用 HEAD 和 CORS 请求链接详细信息
 * linkdetails.js
 * This unobtrusive JavaScript module finds all <\a> elements that have an href
 * attribute but no title attribute and adds an onmouseover event handler to
 * them. The event handler makes an XMLHttpRequest HEAD request to fetch
 * details about the linked resource, and then sets those details in the title
 * attribute of the link so that they will be displayed as a tooltip.
 */
whenReady(function () {
    // Is there any chance that cross-origin requests will succeed?
    var supportsCORS = (new XMLHttpRequest()).withCredentials !== undefined;

    // Loop through all links in the document
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (!link.href) continue; // Skip anchors that are not hyperlinks
        if (link.title) continue; // Skip links that already have tooltips

        // If this is a cross-origin link
        if (link.host !== location.host || link.protocol !== location.protocol) {
            link.title = "Off-site link";  // Assume we can't get any more info
            if (!supportsCORS) continue;   // Quit now if no CORS support
            // Otherwise, we might be able to learn more about the link
            // So go ahead and register the event handlers so we can try.
        }

        // Register event handler to download link details on mouse over
        if (link.addEventListener)
            link.addEventListener("mouseover", mouseoverHandler, false);
        else
            link.attachEvent("onmouseover", mouseoverHandler);
    }

    function mouseoverHandler(e) {
        var link = e.target || e.srcElement;      // The <a> element
        var url = link.href;                      // The link URL

        var req = new XMLHttpRequest();           // New request
        req.open("HEAD", url);                    // Ask for just the headers
        req.onreadystatechange = function () {     // Event handler
            if (req.readyState !== 4) return;     // Ignore incomplete requests
            if (req.status === 200) {             // If successful
                var type = req.getResponseHeader("Content-Type");   // Get
                var size = req.getResponseHeader("Content-Length"); // link
                var date = req.getResponseHeader("Last-Modified");  // details
                // Display the details in a tooltip.
                link.title = "Type: " + type + "   \n" +
                        "Size: " + size + "   \n" + "Date: " + date;
            }
            else {
                // If request failed, and the link doesn't already have an
                // "Off-site link" tooltip, then display the error.
                if (!link.title)
                    link.title = "Couldn't fetch details: \n" +
                            req.status + " " + req.statusText;
            }
        };
        req.send(null);

        // Remove handler: we only want to fetch these headers once.
        if (link.removeEventListener)
            link.removeEventListener("mouseover", mouseoverHandler, false);
        else
            link.detachEvent("onmouseover", mouseoverHandler);
    }
});




