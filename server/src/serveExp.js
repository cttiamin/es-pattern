var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var index = require('./routes/index-exp');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
// Router
var blog = require('./routes/blog-exp');
const userRouter = require('./routes/user-exp')

var app = express();

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}

// 解析 post json 到 req.body
// app.use(bodyParser.json());
app.use(express.json());

// 解析 application/x-www-form-urlencoded
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.use(urlencodedParser);
app.use(express.urlencoded({ extended: false }));

// 解析 cookie
app.use(cookieParser());

// 解析静态文件
// app.use(express.static('./api'));


const redisClient = require('./db/redis-exp')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'WJiol#23123_',
  cookie: {
    // path: '/',   // 默认配置
    // httpOnly: true,  // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});


// app.get('/get', function(req, res) {
// 	// console.log('GET req => ', req.body, req.query.a, req.query.b, req.query.c);
// 	// res.writeHead(200, {
// 	// 	"content-type": "text/html"
// 	// });
// 	// res.write('get success');
// 	res.json({
// 		state: 0,
// 		msg: 'get success'
// 	});
// 	res.end('get req end');
// });
// app.post('/post', function(req, res) {
// 	res.json({
// 		state: 0,
// 		msg: 'post success'
// 	});
// });


// 路由, 合并路径
app.use('/', index);
app.use('/api/blog', blog)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})