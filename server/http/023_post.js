var http = require('http');

var querystring = require('querystring');

var util = require('util');

http.createServer(function(req, res){
	// 用于在闭包暂存请求体作息
	var post = '';

	req.on('data', function(chunk){
		post += chunk;
	})

	req.on('end', function(){
		// 将 post 解析为 真正的 POST 请求格式
		post = querystring.parse(post);
		res.end(util.inspect(post));		
	});

}).listen(8888);
console.log('listen : 8888');