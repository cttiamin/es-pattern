
/*************************************** 
 * 21.5.3 Comet
 * Comet是一种用于 web 的推送技术，
 * 能使服务器能实时地将更新的信息传送到客户端，
 * 而无须客户端发出请求.
 *
 * 服务器向页面推送数据的技术. 能让信息近乎时实的推送到页面上.
 * 非常适合处理体育比赛的分数和股票报价.
 * 
 * Comet实现方式 (2种):
 * 长轮询（long-polling）和iframe流（streaming）
 *
 *      1.HTTP长轮询(也称为短轮询): 浏览器定时向服务器发送请求,
 *        看看有不没有更新的数据
 *        长轮询,短轮询区别:服务器如何发送数据，
 *        短:服务器立即发送响应, 
 *        长:等待发送响应, 轮询的优势是:所有浏览器都支持
 *      2.HTTP流(HTTP Streaming) : 页面的整个生命周期内只使用一个HTTP连接.
 *  Ie不支持,管理comet容易出错
 *
 ******/

function createStreamingClient(url, progress, finished) {
    var xhr = new XMLHttpRequest(),
            received = 0;
    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
        var result;
        if (xhr.readyState == 3) {  //正在接收
            result = xhr.responseText.substring(received);
            //get only the new data and adjust counter
            
            received += result.length;
            progress(result); //call the progress callback
        } else if (xhr.readyState == 4) {
            finished(xhr.responseText);
        }
    };
    xhr.send(null);
    return xhr;
}

var client = createStreamingClient("server/210_streaming.php", 
function (data) {
    console.log("Received: " + data);
}, function (data) {
    console.log("Done!");
});




