/**
 * Created with vim.
 * User: Administrator
 * Date: 14-11-10
 * Time: 下午14:42
 * To change this template use File | Settings | File Templates.
 */


//////////////////////////////////////////
// 高性能 JavaScript
// 非阻塞 动态载入

function loadScript(url, callback){ 
    var script = document.createElement ("script")
        script.type = "text/javascript"; 
    if (script.readyState) {    // IE 
        script.onreadystatechange = function(){ 
            if (script.readyState == "loaded" || script.readyState == "complete"){ 
                script.onreadystatechange = null; 
                callback(); 
            } 
        }; 
    } else { //Others 
        script.onload = function(){ 
            callback(); 
        }; 
    } 
    script.src = url; 
    document.getElementsByTagName_r("head")[0].appendChild(script); 
}

// loadScript("file1.js", function(){ 
//  alert("File is loaded!"); 
// });

// 多次调用
//loadScript("file1.js", function(){ 
// loadScript("file2.js", function(){ 
// loadScript("file3.js", function(){ 
// alert("All files are loaded!"); 
// }); 
// }); 
// });





