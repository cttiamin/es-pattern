// 静态文件服务
// 路由
// 中间件
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());

//请求日志
// npm install morgan
// var morgan = require('morgan');


app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

//add static folder
// app.use(express.static('./public'));
// app.use(morgan());

app.get('/', function(req, res) {
  res.end('hello\n');
});

/************************** 
三种路由方法:
1.path
2.Router
3.route

Router
	example.com/post/add
	example.com/post/list
*/
var Router = express.Router();

Router.get('/add', function(req, res) {
  res.end('Router /add\n');
});
Router.get('/list', function(req, res) {
  res.end('Router /list\n');
});

app.use('/post', Router);

app
  .route('/article')
  .get(function(req, res) {
    // document.write(req);
    // res.write(req);
    res.write("<h1>Request success!</h1>");
    
    res.end('route /article get !');
  })
  .post(function(req, res) {
    res.end('route /article post\n');
  });

/*************************
路由参数
http://example.com/news/123

@next: 函数执行完需要调用的
@newsId: 用户在路由中自定义参数的值
*/
app.param('newsId', function(req, res, next, newsId) {
  req.newsId = newsId;
  next();
});
app.get('/news/:newsId', function(req, res) {
  res.end('newsId: ' + req.newsId + '\n');
});

/**************************
中间件
*/

app.listen(18001, function afterListen() {
  console.log('express running on http://localhost:18001');
});
