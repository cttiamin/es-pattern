var express = require('express');
var app = express();

// Post
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());

 
// app.use(express.static('../src'));
app.use(express.static('./api'));
// ajax 测试
// http://localhost:9001/http/index.html
// +
// node node/030_express/020_router.js

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});


app.get('/get', function(req, res) {
	console.log('GET req => ', req.body, req.query.a, req.query.b, req.query.c);
	// res.writeHead(200, {
	// 	"content-type": "text/html"
	// });
	// res.write('get success');

	res.json({
		state: 0,
		msg: 'get success'
	});
	res.end('get req end');
});

app.post('/post', function(req, res) {
	console.log('Post req => ', req.body);
	// res.write('post success');
	res.json({
		state: 0,
		msg: 'post success'
	});
});

var server = app.listen(8880, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})