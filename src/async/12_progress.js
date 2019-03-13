
/*********************************************** 
 * 21.3 进度事件
 *  Progress Events, 有6个进度事件
 *      loadstart: 在接收到响应数据的第一个字节时触发
 *      progress: 在接收响应期间持续不断地触发
 *      error: 在请求发生错误时触发
 *      abort: 在因为调用 abort 方法而终止连接时触发
 *      load: 在接收到完整的响应数据时触发
 *      loadend: 在通信完成 或者触发 error, abort或load事件后触发
 *      Support: IE8+ only support "load" event
 * */

// 进度事件
//  load 事件
//  progress 事件

/******
 *  load 事件
 *      代替 readystatechange
 * **/
var xhr01 = createXHR();
xhr01.onload = function () {
    if ( (xhr01.status >= 200 && xhr01.status < 300) 
            || xhr01.status == 304) {
        console.log(xhr01.responseText);
    } else {
        console.log("Request was unsuccessful: " + xhr01.status);
    }

    xhr01 = null
}
/*xhr01.open("get", "server/210_altevents.php", true);*/
/*xhr01.send(null);*/



/****************************************
 * progress 事件
 *      lengthComputable: 一个表示进度信息是否可用的布尔值
 *      position: 已经接收的字节数
 *      totalSize: 根据Content-Length 响应头部确定的预期字数,
 */
xhr02 = createXHR();
xhr02.onprogress = function (event) {
    var divStatus = document.getElementById("status");
    if (event.lengthComputable) {
        divStatus.innerHTML = "Received " 
            + event.position + " of "
            + event.totalSize + " bytes";
    }
};
/*xhr02.open("post", "server/210_altevents.php", true);*/
/*xhr02.send(null);*/

/**************************************
 * 权威指南 => 18.1.4 HTTP 进度事件
 * 例18-11: 监控HTTP上传进度 (beta)
 * Find all elements of class "fileDropTarget" and register DnD event handlers
 * to make them respond to file drops. When files are dropped, 
 * upload them to the URL specified in the data-uploadto attribute.
 */
whenReady(function () {
    var elts = document.getElementsByClassName("fileDropTarget");
    for (var i = 0; i < elts.length; i++) {
        var target = elts[i];
        var url = target.getAttribute("data-uploadto2");
        if (!url) continue;
        createFileUploadDropTarget(target, url);
    }

    function createFileUploadDropTarget(target, url) {
        // console.log(1);
        // Keep track of whether we're currently uploading something so we can
        // reject drops. We could handle multiple concurrent uploads, but
        // that would make progress notification too tricky for this example.
        var uploading = false;

        //console.log(target, url);

        target.ondragenter = function (e) {
            console.log("dragenter");
            if (uploading) return;  // Ignore drags if we're busy
            var types = e.dataTransfer.types;
            if (types &&
                    ((types.contains && types.contains("Files")) ||
                       (types.indexOf && types.indexOf("Files") !== -1)) ) {
                target.classList.add("wantdrop");
                return false;
            }
        };
        target.ondragover = function (e) {
            if (!uploading) return false;
        };
        target.ondragleave = function (e) {
            if (!uploading) target.classList.remove("wantdrop");
        };
        target.ondrop = function (e) {
            if (uploading) return false;
            var files = e.dataTransfer.files;
            if (files && files.length) {
                uploading = true;
                var message = "Uploading files:<ul>";
                for (var i = 0; i < files.length; i++)
                    message += "<li>" + files[i].name + "</li>";
                message += "</ul>";

                target.innerHTML = message;
                target.classList.remove("wantdrop");
                target.classList.add("uploading");

                var xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                var body = new FormData();
                for (var i = 0; i < files.length; i++) body.append(i, files[i]);
                xhr.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        target.innerHTML = message +
                                Math.round(e.loaded / e.total * 100) +
                                "% Complete";
                    }
                };
                xhr.upload.onload = function (e) {
                    uploading = false;
                    target.classList.remove("uploading");
                    target.innerHTML = "Drop files to upload";
                };
                xhr.send(body);

                return false;
            }
            target.classList.remove("wantdrop");
        }
    }
});
