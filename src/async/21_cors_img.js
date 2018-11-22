/*********************************************************
 * 21.5 其他跨域技术
 *  21.5.1 图像 Ping
 *      图像 Ping 是与服务器进行简单, 单向的跨域通信的一种方式,
 *      请求是通过字符串形式发送的响应是任意内容,
 *      浏览器得不到任何数据,
 *      通过load,error事件来知道响应是什么时候接收到的.
 *      最常用于跟踪用户点击页面或动态广告曝光次数,图像 Ping 有两个主要缺点:
 *          1.只能发送 GET 请求,
 *          2.无法访问服务器的响应文本,
 */
//    var img = new Image();
//    img.onload = img.onerror = function(){
//        console.log("Done!");
//    };
//    img.src = "http://www.example.com/test?name=Nicholas";

