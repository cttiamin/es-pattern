var fs = require('fs')

// 'utf-8'
// fs.readFile('../../src/assets/js/cookie-util.js', function(err, data) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data.toString()) // data 为二进制
//   }
// })

// 复制一个图片
fs.readFile('../../src/assets/img/panda.png', function (err, origin_buffer) {
	console.log(Buffer.isBuffer(origin_buffer));
	// fs.writeFile('login_buffer.png')

	fs.writeFile('login_buffer.png', origin_buffer, function (err) {
		if(err) console.log(err);

		// var base64Image = origin_buffer.toString('base64')
		// console.log(base64Image);

		// var decodeImage = new Buffer(base64Image, 'base64')
		// console.log(Buffer.compare());

	})
})


