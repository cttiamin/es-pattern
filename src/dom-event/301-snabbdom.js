// snabbdom 重做 virtual dom 

// create html target
var $container = document.createElement('div');
$container.id = 'container'
document.body.appendChild($container)
var button = document.createElement('button');
button.innerText = 'change';
button.id = 'btn-change'
document.body.appendChild(button);

///////////////////////
// snabbdom
var snabbdom = require('snabbdom');
// es5
// import 'https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom.js'
// import 'https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-class.js'
// import 'https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-props.js'
// import 'https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-style.js'
// import 'https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-eventlisteners.js'
// import 'https://cdn.bootcss.com/snabbdom/0.7.1/h.js'
// var snabbdom = window.snabbdom
// var patch = snabbdom.init([
//   snabbdom_class,
//   snabbdom_props,
//   snabbdom_style,
//   snabbdom_eventlisteners
// ])


var patch = snabbdom.init([
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default,
]);
// 定义 h
var h = require('snabbdom/h').default;

var container = document.getElementById('container')
// 生成 vnode
var vnode = h('ul#list', {}, [
  h('li.item', {}, 'Item 1'),
  h('li.item', {}, 'Item 2')
])
// 渲染
patch(container, vnode)

document.getElementById('btn-change').addEventListener('click', function(){
  console.log('change')
  var newVnode = h('ul#list', {}, [
    h('li.item', {}, 'Item 1'),
    h('li.item', {}, 'Item B'),
    h('li.item', {}, 'Item 3')
  ])
  patch(vnode, newVnode)
})





