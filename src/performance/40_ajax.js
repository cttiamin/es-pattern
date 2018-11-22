///////////////////////////////////////////////////////////
// Chapter 7 Ajax 异步 JavaScript 和 XML
// 
// 请求数据 : 
// XMLHttpRequest(XHR) ( 最常用)
// Dynamic script tag insertion
// iframes
// Comet
// Multipart XHR 



/// Ajax 请求示例 
var url = '../Ajax/server/data.php'; 
var params = [ 'id=934875','limit=20']; 
var req = new XMLHttpRequest();
req.onreadystatechange = function() {
    if (req.readyState === 4) { 
        var responseHeaders = req.getAllResponseHeaders(); 
        // Get the response headers. 

        var data = req.responseText; // Get the data. 
        // Process the data here... 
    } 
} 
req.open('GET', url + '?' + params.join('&'), true); 
req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
// Set a request header. 
//req.send(null); // Send the request.


// 任何数据，无论什么格式，必须在一个回调函数之中被组装起来。
var scriptElement = document.createElement('script'); 
//scriptElement.src = 'http://any-domain.com/javascript/lib.js'; 
//document.getElementsByTagName('head')[0].appendChild(scriptElement); 
function jsonCallback(jsonString) { 
    var data = ('(' + jsonString + ')'); 
    // Process the data here... 
}
//jsonCallback({ "status": 1, "colors": [ "#fff", "#000", "#ff0000" ] });



///////////////////////////////// 
// 数据格式
// XML

/*<?xml version="1.0" encoding='UTF-8'?> */
//<users total="4"> 
//<user id="1">
//<username>alice</username> 
//<realname>Alice Smith</realname> 
//<email>alice@alicesmith.com</email> 
//</user> 
//<user id="2"> 
//<username>bob</username> 
//<realname>Bob Jones</realname> 
//<email>bob@bobjones.com</email> 
//</user> 
//<user id="3"> 
//<username>carol</username> 
//<realname>Carol Williams</realname> 
//<email>carol@carolwilliams.com</email> 
//</user> 
//<user id="4"> 
//<username>dave</username> 
//<realname>Dave Johnson</realname> 
//<email>dave@davejohnson.com</email> 
//</user> 
//</users>

////////////////////////
// 将特定XML报文解析到对象的例子
function parseXML(responseXML) { 
    var users = []; 
    var userNodes = responseXML.getElementsByTagName('users'); 
    var node, usernameNodes, usernameNode, username, 
        realnameNodes, realnameNode, realname, 
        emailNodes, emailNode, email; 
    for (var i = 0, len = userNodes.length; i < len; i++) { 
        node = userNodes[i]; 
        username = realname = email = ''; 
        usernameNodes = node.getElementsByTagName('username'); 
        if (usernameNodes && usernameNodes[0]) { 
            usernameNode = usernameNodes[0]; 
            username = (usernameNodes.firstChild) ? 
                usernameNodes.firstChild.nodeValue : ''; 
        } 
        realnameNodes = node.getElementsByTagName('realname');

        if (realnameNodes && realnameNodes[0]) { 
            realnameNode = realnameNodes[0]; 
            realname = (realnameNodes.firstChild) ? 
                realnameNodes.firstChild.nodeValue : ''; 
        } 
        emailNodes = node.getElementsByTagName('email'); 
        if (emailNodes && emailNodes[0]) { 
            emailNode = emailNodes[0]; 
            email = (emailNodes.firstChild) ? 
                emailNodes.firstChild.nodeValue : ''; 
        } 
        users[i] = {
id: node.getAttribute('id'), 
    username: username, 
    realname: realname, 
    email: email 
        }; 
    } 
    return users; 
}


////////////////////
// 更有效的例子

/*<?xml version="1.0" encoding='UTF-8'?> */
//<users total="4"> 
//<user id="1-id001" username="alice" realname="Alice Smith" email="alice@alicesmith.com" /> 
//<user id="2-id001" username="bob" realname="Bob Jones" email="bob@bobjones.com" /> 
//<user id="3-id001" username="carol" realname="Carol Williams" email="carol@carolwilliams.com" /> 
//<user id="4-id001" username="dave" realname="Dave Johnson" email="dave@davejohnson.com" /> 
//</users>

function parseXML(responseXML) {
    var users = []; 
    var userNodes = responseXML.getElementsByTagName('users'); 
    for (var i = 0, len = userNodes.length; i < len; i++) { 
    users[i] = {
    id: userNodes[i].getAttribute('id'), 
    username: userNodes[i].getAttribute('username'), 
    realname: userNodes[i].getAttribute('realname'),
    email: userNodes[i].getAttribute('email')
    }; 
    } 
    return users; 
}
//使用属性文件尺寸更小, 特别是解析时间快



////////////////////////
// JSON
var json01 = [ 
{"id":1, "username":"alice", "realname": "Alice Smith", "email":"alice@alicesmith.com"}, 
{"id":2, "username":"bob", "realname": "Bob Jones", "email":"bob@bobjones.com"}, 
{"id":3, "username":"carol", "realname": "Carol Williams","email":"carol@carolwilliams.com"}, 
{"id":4, "username":"dave", "realname": "Dave Johnson", "email":"dave@davejohnson.com"} 
];


//javascript 中解析JSON可简单地使用():
function parseJSON(responseText) {
    return ('(' + responseText + ')');
}


// 去掉属性名以更少的结构和更小的字节尺寸送给浏览器
var json02 = [ 
    [ 1, "alice", "Alice Smith", "alice@alicesmith.com" ], 
    [ 2, "bob", "Bob Jones", "bob@bobjones.com" ], 
    [ 3, "carol", "Carol Williams", "carol@carolwilliams.com" ], 
    [ 4, "dave", "Dave Johnson", "dave@davejohnson.com" ]
];

    // 解析JSON
    function parseJSON(responseText) { 
        var users = []; 
        var usersArray = ('(' + responseText + ')'); 
        for (var i = 0, len = usersArray.length; i < len; i++) { 
            users[i] = { 
    id: usersArray[i][0], 
    username: usersArray[i][1], 
    realname: usersArray[i][2], 
    email: usersArray[i][3] 
            };
        } 
        return users; 
    }
// 数组形式的JSON在每一项中均获胜, 它文件尺寸最小,下载最快.



///////////////////////////////////
// JSON-P (JSON填充)  
// 
// JSON-P 用户列表:
//
parseJSON([ 
        {"id":1, "username":"alice", "realname":"Alice Smith", "email":"alice@alicesmith.com"}, 
        {"id":2, "username":"bob", "realname":"Bob Jones", "email":"bob@bobjones.com"}, 
        {"id":3, "username":"carol", "realname":"Carol Williams", "email":"carol@carolwilliams.com"}, 
        {"id":4, "username":"dave", "realname":"Dave Johnson", "email":"dave@davejohnson.com"} 
        ]);
// 作为本地化javascript代码执行, 比json解析更快, 传输较慢



////////////////////////////////////
//最理想的数据格式
//
// 1:alice:Alice Smith:alice@alicesmith.com; 
// 2:bob:Bob Jones:bob@bobjones.com;
// 3:carol:Carol Williams:carol@carolwilliams.com; 
// 4:dave:Dave Johnson:dave@davejohnson.com
// 
// split()是最快的字符串操作之一
// 数据的解析方式
function parseCustomFormat(responseText) { 
    var users = []; 
    var usersEncoded = responseText.split(';'); 
    var userArray; 
    for (var i = 0, len = usersEncoded.length; i < len; i++) { 
        userArray = usersEncoded[i].split(':'); 
        users[i] = { 
    id: userArray[0], 
    username: userArray[1], 
    realname: userArray[2], 
    email: userArray[3] 
        }; 
    } 
    return users; 
}


// 下面讲述如何在PHP中使用ASCII码
/*
   function build_format_custom($users) { 
   $row_delimiter = chr(1); // \u0001 in JavaScript. 
   $field_delimiter = chr(2); // \u0002 in JavaScript. 
   $output = array(); 
   foreach ($users as $user) { 
   $fields = array($user['id'], $user['username'], $user['realname'], $user['email']); 
   $output[] = implode($field_delimiter, $fields); 
   } 
   return implode($row_delimiter, $output); 
   } 
   */

////////////////////////////
// Storing data locally 本地缓存数据
//
// 将响应报文存放在一个对象中，以URL为键值索引它
// 这是一个XHR封装，它首先检查一个URL此前是否被取用过：
var localCache = {}; 
function xhrRequest(url, callback) { 
    // Check the local cache for this URL. 
    if (localCache[url]) { 
        callback.success(localCache[url]); 
        return; 
    } 
    // If this URL wasn't found in the cache, make the request. 
    var req = createXhrObject(); 
    req.onerror = function() { 
        callback.error(); 
    }; 
    req.onreadystatechange = function() { 
        if (req.readyState == 4) { 
            if (req.responseText === '' || req.status == '404') { 
                callback.error(); 
                return; 
            } 
            // Store the response on the local cache. 
            localCache[url] = req.responseText; 
            callback.success(req.responseText);
        }
    };
    req.open("GET", url, true); 
    req.send(null); 
}












