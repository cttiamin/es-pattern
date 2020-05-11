// 同步读取文件
var fs = require('fs');

// open 与 C 中的 fopen 函数类似 
fs.open('file.txt', 'r', function(err, fd) {
	if(err){
		console.error(err);
		return;
	}

	var buf = new Buffer(8);
	//从指定文件描述符 fd 中读取数据并写入 buffer 指向的缓冲区对象
	//offset: 0 偏移量
	//length: 8 读取的字节数
	//position: null 文件读取起始位置 
	fs.read(fd, buf, 0, 8, null, function(err, bytesRead, buffer) {
		if(err){
			console.error(err);
			return;
		}

		console.log('bytestRead' + bytesRead);
		console.log(buffer);
	})

});

