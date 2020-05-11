///////////////////////////////////////////////
// Repaints and Reflows 重绘和重排版
//  A DOM tree :
//  A render tree : will be displayed
//
// Queuing and Flushing Render Tree Changes
// 查询并刷新渲染树改变


// setting and retrieving styles in succession
var computed,
    tmp = '',
    bodystyle = document.body.style;

// IE, Opera
if (document.body.currentStyle) {
    computed = document.body.currentStyle;
}
// W3C
else {
    computed = document.defaultView.getComputedStyle(document.body, '');
}
// inefficient way of modifying the same property
// and retrieving style information right after


//bodystyle.color = 'red';
//tmp = computed.backgroundColor;
//bodystyle.color = 'white';
//tmp = computed.backgroundImage;
//bodystyle.color = 'green';
//tmp = computed.backgroundAttachment;

//更好的方法是不要在布局信息改变时查询它
bodystyle.color = 'red';
bodystyle.color = 'white';
bodystyle.color = 'green';
tmp = computed.backgroundColor;
tmp = computed.backgroundImage;
tmp = computed.backgroundAttachment;
// 第二种方式更快



///////////////////////////////////////////////////
// Minimizing Repaints and Reflows 最小化 重绘和重排版

var el = document.getElementById('mydiv2');
el.style.borderLeft = '1px';
el.style.borderRight = '2px';
el.style.padding = '5px';
// This will cause the browser to reflow three times.

// Combine all the changes and apply them at once.
// This can be done using the cssText property.
//var el = document.getElementById('mydiv2');
el.style.cssText = 'border-left: 1px; border-right: 2px; padding: 5px;';

// overwrites existing style information
el.style.cssText += 'border-left:1px';

// the CSS class name of changing
//var el = document.getElementById('mydiv2');
el.className = 'active';
el = null;


/////////////////////////////////////////////////
// Batching DOM changes 批量修改DOM

// Suppose additional data
var data = [
{
    "name": "Nicholas",
        "url": "http://nczonline.net"
},
{
    "name": "Ross",
    "url": "http://techfoolery.com"
}
];

// update a given node with new data
function appendDataToElement(appendToElement, data) {
    var a, li;
    for (var i = 0, max = data.length; i < max; i++) {
        a = document.createElement('a');
        a.href = data[i].url;
        a.appendChild(document.createTextNode(data[i].name));
        li = document.createElement('li');
        li.appendChild(a);
        appendToElement.appendChild(li);
    }
};

///////////////////////////////////
// without worrying about reflows
var ul = document.getElementById('mylist1');
appendDataToElement(ul, data);


///////////////////////////////////
// The first solution
// 通过 display 属性, 减少重排(flow).

//ul.style.display = 'none';
//appendDataToElement(ul, data);
//ul.style.display = 'block';

///////////////////////////////////
// The second solution (recommendation)
// Another way to create and update to document fragment.

/*var fragment = document.createDocumentFragment(); */
//appendDataToElement(fragment, data);
//document.getElementById('mylist').appendChild(fragment);


///////////////////////////////////
// The third solution.
// Create a copy of the node, work on the copy.

//var old = document.getElementById('mylist');
//var clone = old.cloneNode(true);
//appendDataToElement(clone, data);
//old.parentNode.replaceChild(clone, old)



//////////////////////////////////////////////////////
// Caching Layout Information 缓冲布局信息

// inefficient
//myElement.style.left = 1 + myElement.offsetLeft + 'px';
//myElement.style.top = 1 + myElement.offsetTop + 'px';
//if (myElement.offsetLeft >= 500) {
//stopAnimation();
//}

// 因为每次元素移动，代码查询偏移量，导致浏览器刷新渲染队列
// 将 myElement.offsetLeft 存入局部变量

//var current = myElement.offsetLeft;
//current++
//myElement.style.left = current + 'px';
//myElement.style.top = current + 'px';
//if (current >= 500) {
//stopAnimation();
//}


///////////////////////////////////////////////////////
// Take Elements Out of the Flow for Animations 将元素提出动画流
//
// 避免对大部份页面进行重排
//
// 1. Use absolute positioning for the element you want to animate
// on the page,taking it out of the layout flow of the page.
// 使用绝对坐标定位页面动画的元素，使它位于页面布局流之外。
//
// 2. Animate the element. When it expands, it will temporarily cover
// part of the page. This is a repaint, but only of a small part of
// the page instead of a reflow and repaint of a big page chunk.
// 启动元素动画。当它扩大时，它临时覆盖部分页面。这是一个重绘过程，
// 但只影响页面的一小部分，避免重排版并重绘一大块页面。
//
// 3. When the animation is done, restore the positioning, thereby
// pushing down the rest of the document only once.
// 当动画结束时，重新定位，从而只一次下移文档其他元素的位置
//
//
// 译者注：文字描述比较简单概要，我对这三步的理解如下：
// 1、页面顶部可以“折叠/展开”的元素称作“动画元素”，用绝对坐标对
// 它进行定位，当它的尺寸改变时，就不会推移页面中其他元素的位置，
// 而只是覆盖其他元素。
// 2、展开动作只在“动画元素”上进行。这时其他元素的坐标并没有改变，
// 换句话说，其他元素并没有因为“动画元素”的扩大而随之下移，而是
// 任由动画元素覆盖。
// 3、“动画元素”的动画结束时，将其他元素的位置下移到动画元素下方，
// 界面“跳”了一下。



////////////////////////////////////////////////////////
// Event Delegation 事件托管
//
// 添加事件,截取链接字符
document.getElementById('menu2').onclick = function(e) {
    // x-browser target
    e = e || window.event;
    var target = e.target || e.srcElement;
    var pageid, hrefparts;
    // only interesed in hrefs
    // exit the function on non-link clicks
    if (target.nodeName !== 'A') {
        return;
    }
    // figure out page ID from the link
    hrefparts = target.href.split('/');
    pageid = hrefparts[hrefparts.length - 1];
    pageid = pageid.replace('.html', '');
    // update the page
    ajaxRequest('xhr.php?page=' + id, updatePageContents);
    // x-browser prevent default action and cancel bubbling
    if (typeof e.preventDefault === 'function') {
        e.preventDefault();
        e.stopPropagation();
    } else {
        e.returnValue = false;
        e.cancelBubble = true;
    }
};





///////////////////////////////////////////////////////////
// Chapter 4 Algorithms and Flow control 算法和流程控制
//
// Loop: 4 types of loops:
//      1.for; 2.while; 3.do-while; 4.for-in
// 除非遍历数目不详 用for-in, 比其它慢7倍


// 代替 for-in 的方法

var props = ["prop1", "prop2"],
    i = 0;
//while (i < props.length){
//process( object[props[i]]);
//}


//////////////////////////
// original loops
var process = function(i){
    //console.log(i);
}

var items = ["one", "two", "three", "four", "five", "six",
    "seven", "eight", "nine", "ten", "eleven", "twelve"];

for (var i=0; i < items.length; i++){
    process(items[i]);
}
var j=0;
while (j < items.length){
    process( items[j++] );
}
var k=0;
do {
    process(items[k++]);
} while (k < items.length);


// minimizing property lookups
// items.length optimizing 25%-50%

for (var i=0, len=items.length; i < len; i++){
    process(items[i]);
}

var j=0,
    count = items.length;
while (j < count){
    process( items[j++] );
}

var k=0,
    num = items.length;
do {
    process(items[k++]);
} while (k < num);


// minimizing property lookups and reversing
// 可以略微提高循环性能, 反转循环

for (var i=items.length; i--; ){
    process(items[i]);
}

var j = items.length;
while (j--){
    process(items[j]);
}

var k = items.length-1;
do {
    process(items[k]);
} while (k--);



/////////////////////////////
// 达夫设备背后的基本理念
// credit: Jeff Greenberg
// if items.length =12,

var iterations = Math.floor(items.length / 8),
    startAt = items.length % 8,
    i = 0;
do {
    switch(startAt){
        case 0: process(items[i++]);
        case 7: process(items[i++]);
        case 6: process(items[i++]);
        case 5: process(items[i++]);
        case 4: process(items[i++]);
        case 3: process(items[i++]);
        case 2: process(items[i++]);
        case 1: process(items[i++]);
    }
    startAt = 0;

} while (--iterations);


// credit: Jeff Greenberg
// if items.length is 12.

/*var i = items.length % 8; */
//while(i){
//process(items[i--]);
//}
//i = Math.floor(items.length / 8);
//while(i){
//process(items[i--]);
//process(items[i--]);
//process(items[i--]);
//process(items[i--]);
//process(items[i--]);
//process(items[i--]);
//process(items[i--]);
//process(items[i--]);
/*}*/
// 超过 1 000 次迭代, 适合达夫设备


// forEach
// 基于函数比 loop 慢8倍
items.forEach( function(value, index, array){
        process(value);
        //console.log(value);
        });



/////////////////////////////////////////////
// if-else Versus switch  if-else与switch比较
//
// 当条件体数量很大时 switch 明显更快
//
// if-else 优化optimizing
//  1.最常见的条件体放在首位
//  2.使用嵌套 if-else 表达式,减少判断次数
//  如下: 二分法

var value = 1;
if (value < 6){
    if (value < 3){
        if (value == 0){
            //return result0;
        } else if (value == 1){
            //return result1;
        } else {
            // return result2;
        }
    } else {
        if (value == 3){
            // return result3;
        } else if (value == 4){
            //return result4;
        } else {
            //return result5;
        }
    }
} else {
    if (value < 8){
        if (value == 6){
            //return result6;
        } else {
            //return result7;
        }
    } else {
        if (value == 8){
            //return result8;
        } else if (value == 9){
            //return result9;
        } else {
            //return result10;
        }
    }
}


////////////////////////////////////////
// 查表法
//define the array of results
//var results = [result0, result1, result2,result3, result4, result5, result6, result7, result8, result9, result10]
//return the correct result
//return results[value];



///////////////////////////////////////
// Recursion 递归
// 捕获 调用栈溢出错误

try {
    recurse();
} catch (ex){
    //console.log("Too much recursion!");
}


//////////////////////////////////////
// 实现的合并排序算法

function merge(left, right){
    var result = [];
    while (left.length > 0 && right.length > 0){
        //        console.log(left, right);
        if (left[0] < right[0]){
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left).concat(right);
}

function mergeSort(items){
    if (items.length == 1) {
        return items;
    }
    var middle = Math.floor(items.length / 2),
        left = items.slice(0, middle),
        right = items.slice(middle);

    //console.log(items);
    //console.log(middle);
    return merge(mergeSort(left), mergeSort(right));
}
// 上例代码非常简单, 但是mergeSort()调用非常频繁.
// 一个具有n个项的数组总共调用mergeSort()达2*n-1次,
// 也就是超过1500个项目的数组操作,就可能在Firefox上
// 导致栈溢出(stack overflow)


// 递归不是最好的实现方法.合并排序算法还可以用迭代实现
// uses the same mergeSort() function from previous example
function mergeSort2(items) {
    if (items.length == 1) {
        return items;
    }
    var work = [];
    for (var i=0, len=items.length; i < len; i++){
        work.push([items[i]]);
    }

    work.push([]); //in case of odd number of items
    for (var lim=len; lim > 1; lim = (lim+1)/2) {
        for (var j=0,k=0; k < lim; j++, k+=2) {
            work[j] = merge(work[k], work[k+1]);
        }

        work[j] = []; //in case of odd number of items
    }
    return work[0];
}
var items = [3, 2, 5, 6, 9, 8, 1, 4];
var sort = mergeSort2(items);
//console.log(sort);

//虽然迭代版本的合并排序可能比递归版本的慢一些，
//但它不会像递归版本那样影响调用栈。将递归算法切
//换为迭代只是避免栈溢出错误的方法之一。



////////////////////////////////////
// rewrite the factorial() function to make use of memoization
//
function memfactorial(n) {
    if (!memfactorial.cache){
        memfactorial.cache = {
            "0": 1,
            "1": 1
        };
    }
    if (!memfactorial.cache.hasOwnProperty(n)){
        memfactorial.cache[n] = n * memfactorial (n-1);
    }
    return memfactorial.cache[n];
}
//console.log(memfactorial(5));

function factorial(n){
    if (n == 0){
        return 1;
    } else {
        return n * factorial(n-1);
    }
}

// To make memoizing a function easier, define a memoize()
// function that encapsulates the basic functionality.
function memoize(fundamental, cache){
    cache = cache || {};
    var shell = function(arg){
        if (!cache.hasOwnProperty(arg)){
            cache[arg] = fundamental(arg);
        }
        return cache[arg];
    };
    return shell;
}

//memoize the factorial function
var memfactorial2 = memoize(factorial, { "0": 1, "1": 1 } );
//call the new function
var fact6 = memfactorial2(6);  // => 720
var fact5 = memfactorial2(5);  // => 120
var fact4 = memfactorial2(4);  // => 24
