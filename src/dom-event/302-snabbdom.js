// snabbdom 重做 virtual dom 

// create html target
var container = document.createElement('div');
container.id = 'container'
document.body.appendChild(container)
var button = document.createElement('button');
button.innerText = 'change';
button.id = 'btn-change'
document.body.appendChild(button);

///////////////////////
// snabbdom
var snabbdom = require('snabbdom');

var patch = snabbdom.init([
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default,
]);
// 定义 h
var h = require('snabbdom/h').default;

var data = [
  {
      name: '张三',
      age: '20',
      address: '北京'
  },
  {
      name: '李四',
      age: '21',
      address: '上海'
  },
  {
      name: '王五',
      age: '22',
      address: '广州'
  }
]

// 把表头也放在 data 中
data.unshift({
  name: '姓名',
  age: '年龄',
  address: '地址'
})

// var container = document.getElementById('container')

var vnode
function render(data) {
  var newVnode = h('table', {}, data.map(function (item) {
    var tds = []
    var i
    for (i in item) {
      if (item.hasOwnProperty(i)) {
          tds.push(h('td', {}, item[i] + ''))
      }
    }
    return h('tr', {}, tds)
  }))
  
  if (vnode) {
    // re-render
    patch(vnode, newVnode)
  } else {
    // 初次渲染
    patch(container, newVnode)
  }

  // 存储当前的 vnode 结果
  vnode = newVnode
}

render(data)

button.addEventListener('click', function() {
  data[1].age = 30
  data[2].address = '深圳'
  render(data)
})




