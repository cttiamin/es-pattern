
var http = require("http");
var util = require('util');
// unlike php has $_GET, $_POST,
// url.parse  receive get request 
// 原始的path解析为一个对象
var url = require("url");

var querystring = require("querystring");

http.createServer(function (request, response) {
	console.log('request come', request.url);

	var objectUrl = url.parse(request.url);
	var objectQuery = querystring.parse(objectUrl.query);

	response.writeHead(200, {
		// 返回浏览器允许的域名
		"Access-Control-Allow-Origin": "*",
		// 返回浏览器允许的 请求头
		'Access-Control-Allow-Headers': 'X-Test-Cors',
		// 允许的方法
		'Access-Control-Allow-Methods': 'POST, PUT, Delete',
		// 允许跨域请求的最长时间(此时间内无需在跨域, 无需发 OPTION 请求验证)
		'Access-Control-Max-Age': '1000',
		// "content-type": "text/html"
	});

	// 输出 url 的各项参数
	// for (var i in objectUrl) {
	// 	if (typeof (objectUrl[i]) != "function") 
	// 		response.write(i + "=>" + objectUrl[i] + "<br>");
	// }

	// 输出url中的 query 的各项参数
	// response.write("<h1>objectQuery</h1>");
	// for (var i in objectQuery) {
	// 	response.write(i + "=>" + objectQuery[i] + "<br>");
	// }

	// print the Url object:
	// response.end(util.inspect(url.parse(request.url, true)));
	// response.end(url.parse(request.url, true));
	response.end('success ' + JSON.stringify(objectQuery));

}).listen(9012);
console.log('listen :9012');

// http://127.0.0.1:9012/user?name=byvoid&email=byvoid@byvoid.com
