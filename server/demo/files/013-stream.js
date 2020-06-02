// 相比 CPU 计算和内存读写，IO的特点是：慢！
// 流：读取视频等大文件

// 标准输入输出
// process.stdin.pipe(process.stdout)

var fs = require('fs')
var path = require('path')

//////////////////////
// 测试异步事件
// const scriptName = path.resolve(__dirname, '../../src/assets/js/jquery3.3.1.js')
// var readStream = fs.createReadStream(scriptName)
// readStream.on('data', function (chunk) {
//   console.log('data emits',
//     // chunk.toString('utf8'),  // 输出读出内容
//     Buffer.isBuffer(chunk)
//   );
//   readStream.pause()
//   console.log('data pause');
//   setTimeout(() => {
//     console.log('data pause end');
//     readStream.resume()
//   }, 500);
// }).on('readble', function () {
//   console.log('data readable');
// }).on('end', function () {
//   console.log('data ends');
// }).on('close', function () {
//   console.log('data close');
// }).on('error', function (e) {
//   console.log('data read error'+ e);
// })


//////////////////////
// 重写复制文件
// const Photo = path.resolve(__dirname, '../../src/assets/img/panda.png')
// var readStream = fs.createReadStream(Photo)
// var writeStream = fs.createWriteStream(path.resolve(__dirname, 'panda-copy.png'))
// readStream.on('data', function (chunk) {
//   if(writeStream.write(chunk) === false) {
//     console.log('still cached');
//     readStream.pause()
//   }
// })
// readStream.on('end', function () {
//   console.log('data end');
//   writeStream.end()
// })

// writeStream.on('drain', function () {
//   console.log('data drains');
//   readStream.resume()
// })


