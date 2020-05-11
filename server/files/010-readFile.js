var fs = require('fs');
// 兼容路径
var path = require('path')
const fileName = path.resolve(__dirname, 'data.txt')

//////////////////
// 异步读取文件 
fs.readFile(fileName, 'utf-8', (err, data) => {
	if (err) {
		console.error(err);
	}
	console.log('aSync', data);
});

// 同步读取文件
var data = fs.readFileSync(fileName, 'utf-8');
console.log('Sync', data);
// nodejs 不鼓励使用同步 IO


//////////////////
// 写入文件
const content = 'This is write content\n'
const opt = {
	// 追加写入，覆盖: w
	flag: 'a'
}
fs.writeFile(fileName, content, opt, (err) => {
	if (err) {
		console.error(err)
	}
})

//////////////////
// 判断文件是否存在
fs.exists(fileName, (exist) => {
	console.log('exist', exist)
})