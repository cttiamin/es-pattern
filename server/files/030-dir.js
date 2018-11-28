const fs = require('fs');

// 读取目录
fs.readdir('./', (err, files) => {
  if(err) throw err;
  // console.log(files);
})

// 创建
// fs.mkdir('test', err => {})

// fs.rmdir('test', err => {})


// 监视文件/目录
// fs.watch('./', {
//   recursive: true,  // 是否递归
// }, (eventType, filename) => {
//   console.log(eventType, filename)
// })


// promise
const promisify = require('util').promisify;
const read = promisify(fs.readFile);

// read('./030-dir.js').then(data => {
//   console.log(data.toString())
// }).catch(ex => {
//   console.log(ex)
// })

// async
async function test() {
  try {
    const content = await read('./030-dir.js')
    console.log(content.toString())
  } catch (error) {
    console.log(error)
  }
}
test()
