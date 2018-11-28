/*
创建TCP服务器
net 模块
net.createServer([option][,connectionlistener])

*/

// 导入核心模块类
var net = require('net');
const PORT = 18001;
const HOST = '127.0.0.1';

// 创建监听函数
var clientHandler = function(socket){
	console.log('someone connected');

	//监听soket事件 用on方法;
	//客户端发送数据时会触发data事件
	socket.on('data', function dataHandler(data){
		console.log(socket.remoteAddress, socket.remotePort,
			'send', data.toString());

		//向客户端发送数据
		socket.write('server received\n');
	});

	// socket.on('data', function dataHandler(data) {
 //    	console.log(socket.remoteAddress, socket.remotePort, 'send', data.toString());
 //    	socket.write('server received\n');
 //  	});

	socket.on('close', function(){
		console.log(socket.remoteAddress, socket.remotePort,
			'disconnected');
	});
};

//创建TCP实例
//有客户端连接进来, 触发connection事件
//执行clientHandler 函数
var app = net.createServer(clientHandler);

app.listen(PORT, HOST);
console.log('tcp server running on tcp://', HOST, ";", PORT);




