var http = require('http')
var fs = require('fs')
var request = require('request')

// http.createServer(function (req, res) {
  // fs.readFile('../../src/assets/img/panda.png', function (err, data) {
  //   if (err) {
  //     res.end('file not exist!')
  //   } else {
  //     res.writeHeader(200, {'Content-Type': 'text/html'})
  //     res.end(data)
  //   }
  // })

  // fs.createReadStream('../../src/assets/img/panda.png').pipe(res)

//   request('https://www.imooc.com//static/img/common/logo.png').pipe(res)
// }).listen(8090)


// 例2
// fs.createReadStream('../../src/assets/img/panda.png')
//   .pipe(fs.createWriteStream('panda-2.png'))


// 例3
var Readable = require('stream').Readable
var Writable = require('stream').Writable

var readStream = new Readable()
var writeStream = new Writable()

readStream.push('I ')
readStream.push('love')
readStream.push('Imooc\n')
readStream.push(null)

writeStream._write = function (chunk, encode, cb) {
  console.log(chunk.toString());
  cb()
}
readStream.pipe(writeStream)
