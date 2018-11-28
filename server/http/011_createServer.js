var http = require('http')

// 创建一个 http.Server 的实例，
http
  .createServer(function(request, response) {
    // var objectUrl = url.parse(request.url);
    // var objectQuery = querystring.parse(objectUrl.query);

    //output server header, 200 state
    response.writeHead(200, {
      'content-type': 'text/html'
    })

    // response.header("Access-Control-Allow-Origin", "*");
    // response.header("Access-Control-Allow-Headers", "X-Requested-With");
    // response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // response.header("X-Powered-By",' 3.2.1');
    // response.header("Content-Type", "application/json;charset=utf-8");
		
		// 输出网页内容
    response.write('<h1>Request success!</h1>')

		console.log('request from' + request.url)
		
    // for (var i in objectQuery) {
    // 	response.write(i + "=>" + objectQuery[i] + "<br>");
    // }

    // 结束输出
    response.end()
  })
	.listen(2014)
	
console.log('listeren : 2014')

// http://localhost:2014/?a=1&b=2&c=3

// 并发测试
// ab -n1000 -c10 http://localhost:2014/
