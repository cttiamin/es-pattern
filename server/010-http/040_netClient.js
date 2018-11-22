
/********************************
使用核心模块net 创建客户端
*/

//导入核心模块类
var net = require('net');

const PORT = 18001;
const HOST = '127.0.0.1';

var tcpClient = net.Socket();

tcpClient.connect(PORT, HOST, function(){
  console.log('connect success.');
  tcpClient.write('this is tcp client by Node.js');
});

tcpClient.on('data', function(data){
  console.log('received: ', data.toString());
});