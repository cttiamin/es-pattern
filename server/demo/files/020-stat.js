const fs = require('fs');


const content = Buffer.from('this is a test.')
// fs.writeFile('./file', content, err => {
// 	if(err) throw err;
// 	console.log('create done!')
// })


// 读 ?
// fs.stat('./020-stat.js', (err, stats) => {
//   if (err) {
//     console.log('文件不存在')
//     return;
//   }
  
//   console.log(stats.isFile())
//   console.log(stats.isDirectory())
//   console.log(stats)
// })


// 改名
// fs.rename('./file', 'file.txt', err => {
//   if(err) throw err;
//   console.log('rename done!');
// })

// delete
fs.unlink('./file.txt', err => {
  console.log('del done')
});


