const path = require('path');

// console.log('__dirname', __dirname, __filename) // 绝对路径
// console.log('process.cwd()', process.cwd()) // 当前路径, 当前用户在哪启动的脚本？
// console.log('./  ', path.resolve('./'))  // 相对路径


// buffer
// Buffer.concat
console.log(
  // 4
  Buffer.byteLength('test'),
  Buffer.byteLength('测试'),
  Buffer.isBuffer({}),
  Buffer.isBuffer(Buffer.from([1, 2, 3])),
)

const buf = Buffer.from('This is a test!')
console.log(buf.length);

const buf2 = Buffer.allocUnsafe(10);
buf2[0] = 2
console.log(buf2.length);

