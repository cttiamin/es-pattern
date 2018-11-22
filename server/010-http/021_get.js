var http = require("http");
var util = require('util');
// unlike php has $_GET, $_POST,
// url.parse  receive get request 
// 原始的path解析为一个对象
var url = require("url");

// 引用querystring模块
var querystring = require("querystring");

http.createServer(function (request, response) {
	console.log(request.url);

	var objectUrl = url.parse(request.url);
	var objectQuery = querystring.parse(objectUrl.query);

	response.writeHead(200, {
		"content-type": "text/html"
	});

	// 输出url的各项参数
	response.write("<h1>obutiljectUrl</h1>");
	for (var i in objectUrl) {
		if (typeof (objectUrl[i]) != "function") 
			response.write(i + "=>" + objectUrl[i] + "<br>");
	}

	// 输出url中的query的各项参数
	response.write("<h1>objectQuery</h1>");
	for (var i in objectQuery) {
		response.write(i + "=>" + objectQuery[i] + "<br>");
	}

	// print the Url object:
	// response.end(util.inspect(url.parse(request.url, true)));
	response.end(url.parse(request.url, true));

}).listen(3000);
console.log('listen :3000');

//在浏览器上打开
// http://127.0.0.1:3000/user?name=byvoid&email=byvoid@byvoid.com
