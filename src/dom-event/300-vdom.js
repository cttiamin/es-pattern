// 用jquery 实现 虚拟dom
import $ from '../assets/js/jquery3.3.1'

var $container = document.createElement('div');
$container.id = 'container'
document.body.appendChild($container)
var button = document.createElement('button');
button.innerText = 'change';
button.id = 'btn-change'
document.body.appendChild(button);

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

// 渲染函数
function render(data) {
  var $container = $('#container')
  // var $container = $($container)

  // 清空容器，重要！！！
  $container.html('')

  // 拼接 table
  var $table = $('<table>')

  $table.append($('<tr><td>name</td><td>age</td><td>address</td>/tr>'))
  data.forEach(function (item) {
      $table.append($('<tr><td>' + item.name + '</td><td>' 
          + item.age + '</td><td>' + item.address + '</td>/tr>'))
  })

  // 渲染到页面
  $container.append($table)
}

$('#btn-change').click(function () {
  data[1].age = 30
  data[2].address = '深圳'
  // re-render  再次渲染
  // console.log(data)
  render(data)
})

// 页面加载完立刻执行（初次渲染）
render(data)




