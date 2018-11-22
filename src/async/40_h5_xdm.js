// 跨文档消息传送(cross-document messaging): 简称=>XDM
// postMessage(消息, 接收域): 向另一个地方(当前页面的 <iframe> 元素)传递数据

// var iframeWindow = document.getElementById("myframe").contentWindow;
// iframeWindow.postMessage("A secret", "http://www.wrow.com/other.html");
// 向wrow.com 发送信息

/////
// window.message 事件: 接收XDM消息会触发此事件, 异步触发
//      onmessage 处理程序的事件对象包含以下三方面的重要信息
//      data: 作为postMessage()第一个参数传入字符串数据
//      orign: 发送消息的文档所在域, "http://www.wrox.com"
//      source: 发送消息的文档的window对象代理.
///

// EventUtil.addHandler(window, 'message', function(event) {
//   if (event.origin == 'http://www.wrox.com') { 
//     // 确保发送消息的域是已知的域
//     processMessage(event.data); //接收到的数据
//     //可选: 向来源窗口发送回执
//     event.source.postMessage('Received!', 'http://p2p.wrox.com');
//   }
// });
