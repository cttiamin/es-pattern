/********************************************* 
 *  JSONP: JSON with padding(填充式JSON 或 参数式JSON),
 *      callback({"name" : "Nicholas"});
 *  JSONP组成:
 *      回调函数: 当响应到来时应该在页面中调用的函数
 *      数据: 传入回调函数中的 JSON数据
 *  缺点:
 *      1.如果其他域不安全,可能会夹带一些恶意代码
 *      2.确定JSONP请求失败不容易, so 使用计时器测指定时间内是否接收了响应
 */

//function handleResponse(response) {
//console.log("You're at IP address " + response.ip + ", which is in "
//+ response.city + ", " + response.region_name);
//}
//var script = document.createElement("script");
//script.src = "http://freegeoip.net/json/?callback=handleResponse";
//document.body.insertBefore(script, document.body.firstChild);
// //插入在 body 前端


//
function jsonpCallback(result) {
    //alert(result);
    for(var i in result) {
        console.log(i + ":" + result[i]);
        //循环输出 a:1, b:2, etc.
    }  
}
//JavaScript的链接，必须在 function 的下面。

//var JSONP=document.createElement("script");
//JSONP.type="text/javascript";
//JSONP.src="http://www.tjxfjt.com.cn/test/210_jsonp.php?callback=jsonpCallback";
//document.getElementsByTagName("head")[0].appendChild(JSONP);



/**
 * 权威指南 => 18.2 借助 <\script> 发送 HTTP 请求:JSONP
 * 例18-14: 使用script元素发送JSON请求
 * Make a JSONP request to the specified URL and pass the parsed response
 * data to the specified callback. Add a query parameter named "jsonp" to
 * the URL to specify the name of the callback function for the request.
 */
function getJSONP(url, callback) {
    // Create a unique callback name just for this request
    var cbnum = "cb" + getJSONP.counter++; // Increment counter each time
    var cbname = "getJSONP." + cbnum;      // As a property of this function

    // Add the callback name to the url query string using form-encoding
    // We use the parameter name "jsonp".  Some JSONP-enabled services
    // may require a different parameter name, such as "callback".
    if (url.indexOf("?") === -1)   // URL doesn't already have a query section
        url += "?jsonp=" + cbname; // add parameter as the query section
    else                           // Otherwise,
        url += "&jsonp=" + cbname; // add it as a new parameter.

    // Create the script element that will send this request
    var script = document.createElement("script");

    // Define the callback function that will be invoked by the script
    getJSONP[cbnum] = function (response) {
        try {
            callback(response); // Handle the response data
        }
        finally {               // Even if callback or response threw an error
            delete getJSONP[cbnum];                // Delete this function
            script.parentNode.removeChild(script); // Remove script
        }
    };

    // Now trigger the HTTP request
    script.src = url;                  // Set script url
    document.body.appendChild(script); // Add it to the document
}

getJSONP.counter = 0;  
// A counter we use to create unique callback names


