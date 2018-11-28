var fs = require('fs');

//异步读取文件 
fs.readFile('file.txt', 'utf-8', function(err, data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}

});
console.log('end aSync');

// 同步读取文件
var data = fs.readFileSync('file.txt', 'utf-8');
console.log(data);
console.log('end Sync');

// 异步读取文件，使用回调函数 callback
function readFileCallBack(err, data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
}

fs.readFile('file.txt', 'utf-8', readFileCallBack);
console.log('aSync callback end.');
// nodejs 不鼓励使用同步 IO
