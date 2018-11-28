//客户端向 http 服务器发起请求 
var http = require('http');
var querystring = require('querystring');


var contents = querystring.stringify({
	name: 'cttiamin',
	email: 'cttiamin@foxmail.com',
	address: 'Haidian XiBeiWang'
});

var options = {
	// host: '127.0.0.1:8888',
	// path: '/',
  host: 'www.byvoid.com',
  path: '/application/node/post.php',
	method: 'POST',
	headers:{
		'Content-Type': 'applicatino/x-www-form-urlencoded',
		'Content-Length': contents.length
	}
};

var req = http.request(options, function(res){
	res.setEncoding('utf8');
	res.on('data', function(data){
		console.log(data);
	});
});

req.write(contents);
req.end();
