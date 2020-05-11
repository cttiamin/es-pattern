var http = require('http');
var fs = require('fs');
var zlib = require('zlib');
// 创建一个 http.Server 的实例
// HTTP 协议测试
http.createServer(function(request, response) {
    // var objectUrl = url.parse(request.url);
    // var objectQuery = querystring.parse(objectUrl.query);

    // 跨域设置
    // response.header("Access-Control-Allow-Headers", "X-Requested-With");
    // response.header("X-Powered-By",' 3.2.1');
    response.writeHead(200, {
      // 返回浏览器允许的域名
      "Access-Control-Allow-Origin": "*",
      // 返回浏览器允许的 请求头
      'Access-Control-Allow-Headers': 'X-Test-Cors',
      // 允许的方法
      'Access-Control-Allow-Methods': 'POST,PUT,Delete,GET,DELETE,OPTION',
      // 允许跨域请求的最长时间(此时间内无需在跨域, 无需发 OPTION 请求验证)
      'Access-Control-Max-Age': '1000',
      // 响应文本本格式: application/json;charset=utf-8
      // "Content-Type": "text/html" 
    });

    // 输出网页内容
    // response.write('<h1>Request success!</h1>')
    // for (var i in objectQuery) {
    // 	response.write(i + "=>" + objectQuery[i] + "<br>");
    // }
    // response.end('html');

    // 重定向 
    if (request.url === '/redirect') {
      // 302 临时跳转
      // 301 永久跳转
      response.writeHead(302, {  // or 301
        'Location': '/new'
      })
      response.end()
    }
    if (request.url === '/new') {
      response.writeHead(200, {
        'Content-Type': 'text/html',
      })
      response.end('<div>this is content</div>')
    }

    if (request.url === '/') {
      // 读取 html 文件 显示
      const html = fs.readFileSync('./011-createServer.html', 'utf8');

      // output server header, 200 state
      response.writeHead(200, {
        'Content-type': 'text/html',
        // 兼容老版本IE, 预测头信息
        'X-Content-Type-Options': 'nosniff',
        // 压缩格式
        'Content-Encoding': 'gzip'
      });
      // 压缩传输
      response.end(zlib.gzipSync(html));
      // response.end(html);
    }
    // 长连接测试
    else {
      const img = fs.readFileSync('../../src/assets/img/clock-icon.png')
      response.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Connection': 'close' // keep-alive / close关闭长连接
      })
      response.end(img)
    }

    // 缓存测试
    if (request.url === '/script.js'){
      response.writeHead(200, {
        'Content-type': 'text/javascript',
        // 强制缓存, no-cache:不缓存, 但需要服务器验证
        'Cache-Control': 'max-age=200000000, no-cache',
        // 验证头
        'Last-Modified': '123',
        'Etag': '777'
      })
      const etag = request.headers['if-none-match']
      if (etag === '777') {
        response.writeHead(304, {
          'Content-type': 'text/javascript',
          'Cache-Control': 'max-age=200000000, no-cache',
          'Last-Modified': '123',
          'Etag': '777'
        })
        response.end()
      } else {
        response.writeHead(200, {
          'Content-type': 'text/javascript',
          'Cache-Control': 'max-age=200000000, no-cache',
          'Last-Modified': '123',
          'Etag': '777'
        })
        response.end('console.log("script loaded twice")')
      }

      response.end('console.log("script loaded")')
    }
  })
  .listen(9011);

console.log('listeren : 9011');

// http://localhost:2014/?a=1&b=2&c=3

// 并发测试
// ab -n1000 -c10 http://localhost:2014/
