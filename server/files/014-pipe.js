var http = require('http')
var fs = require('fs')
var request = require('request')
const path = require('path')
const fileName = path.resolve(__dirname, '../../src/assets/img/panda.png')
// const scriptName = path.resolve(__dirname, '../../src/assets/js/jquery3.3.1.js')

// http.createServer(function (req, res) {
//   // 使用文件读取
//   // fs.readFile(fileName, function (err, data) {
//   //   if (err) {
//   //     res.end('file not exist!')
//   //   } else {
//   //     res.writeHeader(200, {'Content-Type': 'text/html'})
//   //     res.end(data)
//   //   }
//   // })
//   // 流式管道
//   fs.createReadStream(fileName).pipe(res)
//   // 请求网络资源
//   // request('https://www.imooc.com//static/img/common/logo.png').pipe(res)
// }).listen(8090)


// 例2
fs.createReadStream(fileName)
  .pipe(fs.createWriteStream('panda-2.png'))


// 例3
// var Readable = require('stream').Readable
// var Writable = require('stream').Writable
// var readStream = new Readable()
// var writeStream = new Writable()

// readStream.push('I ')
// readStream.push('love')
// readStream.push('Imooc\n')
// readStream.push(null)

// writeStream._write = function (chunk, encode, cb) {
//   console.log(chunk.toString());
//   cb()
// }
// readStream.pipe(writeStream)
