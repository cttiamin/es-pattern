// imooc: request 方法
var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify({
  'content': '一起期待',
  'cid': 348
})

var options = {
  hostname: 'www.imooc.com',
  port: 80,
  path: '/course/document',
  method: 'POST',
  headers: {
    'Content-Length': postData.length
  }
}

var req = http.request(options, function (res) {
  console.log('Status: ', res.statusCode)
  console.log('headers: ', JSON.stringify(res.headers));

  res.on('data', function (chunk) {
    console.log(Buffer.isBuffer(chunk));
    console.log(typeof chunk);
  })

  res.on('end', function () {
    console.log('finish');
  })
})

req.on('error', function (e) {
  console.log('Error: '+ e.message);
})
req.write(postData)
req.end()
