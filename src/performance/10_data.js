//////////////////////////////////////////////////
// High Performance JavaScript(高性能JavaScript)
// 2014/03/02
// 海淀区苏州街3号,大恒科技南座5层

// 非阻塞 动态载入
function loadScript(url, callback){ 
    var script = document.createElement ("script") 
        script.type = "text/javascript"; 
    if (script.readyState){ //IE 
        script.onreadystatechange = function(){ 
            if (script.readyState == "loaded" || script.readyState 
                    == "complete"){ 
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
    document.getElementsByTagName("head")[0].appendChild(script); 
}

/*loadScript("10_test.js", function(){*/
    //console.log("File is loaded!"); 
/*});*/

// 多次调用
//loadScript("file1.js", function(){ 
// loadScript("file2.js", function(){ 
// loadScript("file3.js", function(){ 
// console.log("All files are loaded!"); 
// }); 
// }); 
// });


/**********************************************
 * 1.所有 <script> 标签放置在页面的底部,紧靠body关闭的上方
 * 2.将脚本成组打包.页面<script>越少加载越快,响应也更快
 *
 * 使用非阻塞方式下载 JavaScript:
 * 1.为<script>标签添加defer属性(只适用于IE和Firefox3.5+)
 * 2.动态创建<script>元素,用它下载并执行代码
 * 3.用 XHR 对象下载代码,并注入到页面中
 */  



/*****************************************************
 * Chapter 2 Data Access
 *
 * 全局变量优化为 局部变量:
 * 此函数contain three document的引用, document 是一个全局对象,
 * 必须遍历整个作用域链,直到最后在全局变量中找到它.
 */ 

function initUI() { 
    var bd = document.body, 
        links = document.getElementsByTagName("a"), 
        i = 0, 
        len = links.length;

    while(i < len){ 
        update(links[i++]); 
    }
    document.getElementById("go-btn").onclick = function(){ 
        start(); 
    };
    bd.className = "active";
}


/*********************
 * 减轻重复的全局变量访问对性能的影响:
 * 将全局变量的引用存储在一个局部变量中.
 **/
function initUI2(){ 
    var doc = document,
        bd = doc.body, 
        links = doc.getElementsByTagName("a"), 
        i = 0, 
        len = links.length; 
    while(i < len){ 
        update(links[i++]); 
    } 
    doc.getElementById("go-btn").onclick = function(){ 
        start(); 
    }; 
    bd.className = "active"; 
}
/**
 * 将document 引入局部变量 doc 中. 现在访问全局变量的次数是1
 * 次,而不是3次
 **/


/***
 * 改变作用域链:
 * with 表达式
 * 用with重写避免多次书写document,看起来似乎更有效了.
 *
 * 当代码流执行到一个with表达式时, 运行期上下文的作用域链被临时
 * 改变了.一个新的可变对象将被创建,它包含指定对象所有属性.此对
 * 象被插入到作用域的前端,意味着现在函数的所有局部变量都被推入
 * 第二个作用域链对象中.所有访问代价更高了.
 * 
 * try-catch 表达式的catch()子句具有相同的效果.
 *
 */

function execute(code) {
    (code); 
    function subroutine(){
        return window; 
    } 
    var w = subroutine();
    //what value is w? 
};

// execute("var window = {};");



/**********************************************************
 * 解决闭包性能问题
 * 23/01/2015
 *
 * 事件处理句柄是一个闭包,当assignEvents()执行创建,可以访问
 * 其范围内部的id变量.用这种方法封闭对id变量的访问,必须创建
 * 一个特定的作用域链.
 * 优化: 域外变量放入局部变量中.
 ***/
function assignEvents(){ 
    var id = "xdi9592"; 
    document.getElementById("save-btn").onclick = function(event){ 
        saveDocument(id); 
    }; 
}


/***********************************************************
 * 原型链越深访问速度越慢
 *
 * DOM 访问和修改
 * 1.减速少对document的操作
 */

function innerHTMLLoop() { 
    for (var count = 0; count < 15000; count++) { 
        document.getElementById('here').innerHTML += 'a'; 
    } 
}

function innerHTMLLoop2() { 
    var content = ''; 
    for (var count = 0; count < 15000; count++) { 
        content += 'a'; 
    } 
    document.getElementById('here').innerHTML += content; 
}
// innerHTMLLoop2();
// innerHTMLLoop2 比 innerHTMLLoop 快上百倍



/********************************************************
 * innerHTML 与 DOM 方法比较
 * 
 * 两种方法性能差别不大,innerHTML 速度更快一些
 *
 * 用两种方法各创建一个1000行5列的HTML表
 */ 

function tableInnerHTML() { 
    var i, h = ['<table border="1" width="100%">']; 
    h.push('<thead>'); 
    h.push('<tr><th>id<\/th><th>yes?<\/th><th>name<\/th><th>url<\/th><th>action<\/th><\/tr>'); 
    h.push('<\/thead>'); 
    h.push('<tbody>'); 
    for (i = 1; i <= 1000; i++) { 
        h.push('<tr><td>'); 
        h.push(i); 
        h.push('<\/td><td>'); 
        h.push('And the answer is... ' + (i % 2 ? 'yes' : 'no')); 
        h.push('<\/td><td>'); 
        h.push('my name is #' + i); 
        h.push('<\/td><td>'); 
        h.push('<a href="http://example.org/' + i + '.html">http://example.org/' + i + '.html<\/a>'); 
            h.push('<\/td><td>'); 
        h.push('<ul>'); 
        h.push(' <li><a href="edit.php?id=' + i + '">edit<\/a><\/li>'); 
        h.push(' <li><a href="delete.php?id="' + i + '-id001">delete<\/a><\/li>'); 
            h.push('<\/ul>'); 
        h.push('<\/td>'); 
        h.push('<\/tr>'); 
    } 
    h.push('<\/tbody>'); 
    h.push('<\/table>'); 
    document.getElementById('here').innerHTML = h.join(''); 
};



/**********************************************
 * 使用DOM方法代码有些冗长
 **/
function tableDOM() {
    var i, table, thead, tbody, tr, th, td, a, ul, li; 
    tbody = document.createElement ('tbody'); 
    for (i = 1; i <= 1000; i++) { 
        tr = document.createElement ('tr'); 
        td = document.createElement ('td'); 
        td.appendChild(document.createTextNode((i % 2) ? 'yes' : 'no')); 
        tr.appendChild(td); 
        td = document.createElement ('td'); 
        td.appendChild(document.createTextNode(i)); 
        tr.appendChild(td); 
        td = document.createElement ('td'); 
        td.appendChild(document.createTextNode('my name is #' + i)); 
        tr.appendChild(td); 
        a = document.createElement ('a'); 
        a.setAttribute('href', 'http://example.org/' + i + '.html'); 
        a.appendChild(document.createTextNode('http://example.org/' 
                        + i + '.html')); 
        td = document.createElement ('td'); 
        td.appendChild(a); 
        tr.appendChild(td); 
        ul = document.createElement ('ul'); 
        a = document.createElement ('a'); 
        a.setAttribute('href', 'edit.php?id=' + i); 
        a.appendChild(document.createTextNode('edit')); 
        li = document.createElement ('li'); 
        li.appendChild(a); 
        ul.appendChild(li); 
        a = document.createElement ('a'); 
        a.setAttribute('href', 'delete.php?id=' + i); 
        a.appendChild(document.createTextNode('delete')); 
        li = document.createElement ('li'); 
        li.appendChild(a); 
        ul.appendChild(li); 
        td = document.createElement ('td'); 
        td.appendChild(ul); 
        tr.appendChild(td); 
        tbody.appendChild(tr); 
    } 
    tr = document.createElement ('tr'); 
    th = document.createElement ('th'); 
    th.appendChild(document.createTextNode('yes?')); 
    tr.appendChild(th); 
    th = document.createElement ('th'); 
    th.appendChild(document.createTextNode('id')); 
    tr.appendChild(th); 
    th = document.createElement ('th'); 
    th.appendChild(document.createTextNode('name')); 
    tr.appendChild(th); 
    th = document.createElement('th'); 
    th.appendChild(document.createTextNode('url')); 
    tr.appendChild(th); 
    th = document.createElement('th'); 
    th.appendChild(document.createTextNode('action')); 
    tr.appendChild(th); 
    thead = document.createElement('thead'); 
    thead.appendChild(tr); 
    table = document.createElement('table'); 
    table.setAttribute('border', 1); 
    table.setAttribute('width', '100%'); 
    table.appendChild(thead); 
    table.appendChild(tbody); 
    document.getElementById('here').appendChild(table); 
};
/**
 * 在IE6中 innerHTML 比对手快3.6倍
 * 在新版本浏览器就不那么明显, chorme慢1.15倍
 **/


/********************************
 * Cloning Nodes 节点克隆
 *      在Chrome 中快10%, 其它会快一点
 *
 * **/
function tableClonedDOM() { 
    var i, table, thead, tbody, tr, th, td, a, ul, li, 
        oth = document.createElement('th'), 
        otd = document.createElement('td'), 
        otr = document.createElement('tr'), 
        oa = document.createElement('a'), 
        oli = document.createElement('li'), 
        oul = document.createElement('ul'); 
    tbody = document.createElement('tbody'); 
    for (i = 1; i <= 1000; i++) { 
        tr = otr.cloneNode(false); 
        td = otd.cloneNode(false); 
        td.appendChild(document.createTextNode((i % 2) ? 'yes' : 'no')); 
        tr.appendChild(td); 
        td = otd.cloneNode(false); 
        td.appendChild(document.createTextNode(i)); 
        tr.appendChild(td); 
        td = otd.cloneNode(false); 
        td.appendChild(document.createTextNode('my name is #' + i)); 
        tr.appendChild(td); 
        // ... the rest of the loop ... 
    } 
    // ... the rest of the table generation ... 
}


/****************************************************
 * HTML Collection  HTML集合
 *      1.不要使用数组中的length属性做循环判断条件;
 *      2.遍历数组要比遍历集合快
 *      3.
 *
 ***/

/**
 * 复制一个数组
 * 可作为通用的集合转数组
 * **/
function toArray(coll) { 
    for (var i = 0, a = [], len = coll.length; i < len; i++) { 
        a[i] = coll[i]; 
    } 
    return a; 
}
//var coll = document.getElementsByTagName('div');
//var ar = toArray(coll);



/******************************************
 * 最快的版本将集合的当前元素存入局部变量
 ***/

// slow 
function collectionGlobal() { 
    var coll = document.getElementsByTagName('div'), 
        len = coll.length, 
        name = ''; 
    for (var count = 0; count < len; count++) { 
        name = document.getElementsByTagName('div')[count].nodeName; 
        name = document.getElementsByTagName('div')[count].nodeType; 
        name = document.getElementsByTagName('div')[count].tagName; 
    } 
    return name; 
}; 

// faster 
function collectionLocal() { 
    var coll = document.getElementsByTagName('div'), 
        len = coll.length, 
        name = ''; 
    for (var count = 0; count < len; count++) { 
        name = coll[count].nodeName; 
        name = coll[count].nodeType; 
        name = coll[count].tagName; 
    } 
    return name; 
}; 

// fastest
function collectionNodesLocal() { 
    var coll = document.getElementsByTagName('div'), 
        len = coll.length, 
        name = '', 
        el = null; 
    for (var count = 0; count < len; count++) { 
        el = coll[count]; 
        name = el.nodeName; 
        name = el.nodeType; 
        name = el.tagName;
    } 
    return name; 
};



/************************************************************
 * Walking the DOM
 * 采用非递归方式遍历一个元素的子节点
 * childNode, nextSibling;
 * 在IE中 nextSibling 表现比 childNodes 好; IE6快6倍, IE7快105倍
 **/
function testNextSibling() {
    var el = document.getElementById('mydiv1'),
        ch = el.firstChild,
        type1,
        name = '';  
    do { 
        name = ch.nodeName;
    } while (ch = ch.nextSibling); 
    return name;
};
//testNextSibling();

function testChildNodes() { 
    var el = document.getElementById('mydiv1'), 
        ch = el.childNodes, 
        len = ch.length, 
        name = ''; 
    for (var count = 0; count < len; count++) { 
        name = ch[count].nodeName; 
    } 
    return name; 
};
//testChildNodes();


/**
 * 用APPI函数返回元素节点比自己在 JavaScript 中写的滤方法要快.
 * 如: 
 * children, childNodes;
 ***/

/**
 * The Selectors API, 选择器API
 ***/
var elements = document.querySelectorAll('#menu a');
// 包含一个引用引表, 返回节点构成的类数组对象

// 不使用querySelectorAll()
var elements = document.getElementById('menu').
getElementsByTagName('a');
// 这种情况elements将是HTML集合, 还需将它拷贝到一个数组中.

// 用querySelectorAll()一次性获得两类节点
var errs1 = document.querySelectorAll('div.warning, div.notice');

// without querySelectorAll(), 
var errs = [], 
    divs = document.getElementsByTagName('div'), 
    classname = ''; 
for (var i = 0, len = divs.length; i < len; i++) {
    classname = divs[i].className;
    if (classname === 'notice' || classname === 'warning') {
        errs.push(divs[i]); 
    }
}
// using the Selectors API is 2 to 6 times faster.
