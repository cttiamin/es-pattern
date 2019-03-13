var http = require('http');
var querystring = require('querystring');
var util = require('util');

http
  .createServer(function(request, response) {
    // 定义变量，用来处理 post 数据
    var postData = '';

    // 输出字符串
    var responseString = '';

    response.writeHead(200, {
      'content-type': 'text/html'
    });

    if (request.method == 'GET') {
      responseString =
        '<!doctype html><html lang="en">\
						 <head><meta charset="UTF-8" /><title>Document</title></head><body>\
						 <form action="/" method="post">\
						 <input type="text" name="a" value="1" />\
						 <input type="text" name="b" value="2" />\
						 <input type="text" name="c" value="3" />\
						 <input type="submit" value="submit" />\
						 </form>\
						 </body></html>';

      response.write(responseString);

      response.end();
    } else if (request.method == 'POST') {
      // 设置接收数据编码格式为 UTF-8
      request.setEncoding('utf8');

      // 因为nodejs在处理post数据的时候，会将数据分成小包来序列处理
      // 所以必须监听每一个数据小包的结果
      request.addListener('data', function(postDataChunk) {
        postData += postDataChunk;
      });

      // 所有数据包接收完毕
      request.addListener('end', function() {
        // 解析post数据
        var objectPostData = querystring.parse(postData);

        for (var i in objectPostData) {
          responseString += i + ' => ' + objectPostData[i] + '<br>';
        }

        response.write(responseString);

        response.end();
      });
    }

    // 用于在闭包暂存请求体作息
    var post = '';
    request.on('data', function(chunk) {
      post += chunk;
    });
    request.on('end', function() {
      // 将 post 解析为 真正的 POST 请求格式
      post = querystring.parse(post);
      res.end(util.inspect(post));
    });
  })
  .listen(2014);
