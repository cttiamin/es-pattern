// 流：读取视频等 大文件 

var fs = require('fs')
// var n = 0

// 测试异步事件
// var readStream = fs.createReadStream('../../src/assets/js/event-target.js')
// 
// readStream.on('data', function (chunk) {
//   n++
//   console.log('data emits');
//   console.log(Buffer.isBuffer(chunk));
//   // console.log(chunk.toString('utf8'));
//   readStream.pause()
//   console.log('data pause');
//   setTimeout(() => {
//     console.log('data pause end');
//     readStream.resume()
//   }, 10);
// }).on('readble', function () {
//   console.log('data readable');
// }).on('end', function () {
//   console.log('data ends');
// }).on('close', function () {
//   console.log('data close');
// }).on('error', function (e) {
//   console.log('data read error'+ e);
// })


// 重写复制文件
var readStream = fs.createReadStream('../../src/assets/img/panda.png')
var writeStream = fs.createWriteStream('panda-1.png')
//../../test.avi  ../../src/assets/img/panda.png
readStream.on('data', function (chunk) {
  if(writeStream.write(chunk) === false) {
    console.log('still cached');
    readStream.pause()
  }
})

readStream.on('end', function () {
  console.log('data end');
  writeStream.end()
})

writeStream.on('drain', function () {
  console.log('data drains');
  readStream.resume()
})


