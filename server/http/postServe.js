var http = require('http');
var querystring = require('querystring');

http.createServer(function(request, response) {
    // 处理 post 数据
    var postData = '';
    // 输出字符串
    var responseString = '';
    if (request.method == 'GET') {
      response.writeHead(200, {'content-type': 'text/html'});
      response.end('aaa')
      return;
    }
    
    console.log('req content-type:', request.headers['content-type'])
    // 设置响应头
    response.writeHead(200, {'content-type': 'application/json'});
    // 设置接收数据编码格式为 UTF-8
    request.setEncoding('utf8');
    // 处理 post 数据的时候，将数据分成小包来序列处理, 监听每一个数据小包的结果
    request.addListener('data', function(postDataChunk) {
      postData += postDataChunk;
    });
    
    // 所有数据包接收完毕
    request.addListener('end', function() {
      
      // 将 post 解析为 真正的 POST 请求格式
      var objectPostData = querystring.parse(postData);
      for (var i in objectPostData) {
        responseString += i + ' => ' + objectPostData[i] + '<br>';
      }
      // response.write(responseString);
      // console.log('post data: ', postData, objectPostData, responseString)
      response.end(JSON.stringify(postData));
    });
  })
  .listen(2014);
