// 题1
// javascript和css样式等修改后，部署新版本，但是因为客户浏览器缓存，导致客户端还在使用老版本javascript和css，如何解决该问题？

// 1.改css/js文件名
// 2.加载css语句中加入个版本号 src=“a.js?v=1.1.0”
// 3.Webpack output 使用 hash, chunkhash
{
  filename: 'static/js/[name]-[chunkhash:8].js'
}

// 题2
// 任意数字组成的数组，按顺序依次进行如下操作：
var arr_test = [31, 2, 3, 4, 7, 6, 4, 5, 2, 9, 15, 3, 6, 21]
var bubble = function(arr, fn) {
  var len = arr.length
  var count = true
  while (len--) {
    for (var j = 0; j < len; j++) {
      if (fn(arr[j], arr[j + 1]) > 0) {
        // es5
        // arr[j] = [arr[j + 1], (arr[j + 1] = arr[j])][0]
        // es6
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        count = false
      }
    }
    // 已经排好序
    if (count == true) {
      break
    }
  }
  return arr
}

// 1. 从小到大排序
// 1)
arr_test.sort(function(v1, v2) {
  return v1 - v2
})
// 2)
var arr_bubble = bubble(arr_test, function(a, b) {
  return a - b
})

// 2. 去除重复数字
var distinct = function(arr_origin) {
  var arr = arr_origin,
    result = [],
    i,
    j,
    len = arr.length
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        j = ++i
        // j 重置指针, i 指向下个索引, 如果之后没有该值才添加
      }
    }
    result.push(arr[i])
  }
  return result
}
distinct(arr_test)
// console.log(arr_test)

// 3. 去除特定数字
var removeNumber = function(arr, number) {
  var len = arr.length,
    start = arr.indexOf(number)
  // 数字不存在
  if (start < 0) {
    return false
  }
  while (start < len) {
    arr.splice(start, 1)
    start = arr.indexOf(number, start)
    if (start < 0) {
      break
    }
  }
  // console.log(arr)
  return arr
}

removeNumber(arr_test, 7)
removeNumber(arr_test, 8)

// 4. 翻转成从大到小的顺序
// 1)
arr_test.sort(function(v1, v2) {
  return v2 - v1
})
// 2)
bubble(arr_test, function(a, b) {
  return b - a
})
// 例如[31,2,3,4,7,6,4,5,2,9,15,3,6,21]，第三步去掉7，再去掉8

// 题3
// 在一个网页中，嵌入另一个网页的方法有哪些？
// 优缺点是什么？
// 1) iframe
// 缺点:
// 页面样式调试麻烦，出现多个滚动条；
// 浏览器的后退按钮失效；
// 过多会增加服务器的HTTP请求；
// 多数小型的移动设备无法完全显示框架，设备兼容性差
// 产生多个页面，不易管理；
// 不容易打印；
// 代码复杂，无法被一些搜索引擎解读。
// 优点:
// iframe能够原封不动的把嵌入的网页展现出来。
// 如果有多个网页引用iframe，那么你只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改，方便快捷。
// 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，可以增加代码的可重用。
// 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由iframe来解决。

// 2) 用 ajax，jquery.load()方法
// $.post(url, null, function(result) { 
//   $("#div").html(result); 
// })

// 题4
// 前后分离的项目，部署的步骤是什么？如何做到产品线和测试线分离，尽可能的阐述你的观点和方案
// 安装 node, 执行:npm init
// webpack, babel, eslint
// 安装依赖 npm install
// 打包 npm run build
// 产品测试用不同的构建配置
// package.json 添加 "build:test": "NODE_ENV=test node build/build_test.js",


// 题5
// 如何提高网页性能优化，尽可能的详细阐述
// 1.减少HTTP请求, 图片压缩, css,js 文件压缩合并, 合并雪碧图
// 2.使用 CDN, 预解析 DNS
// 3.服务器压缩传输 'Content-Encoding': 'gzip'
// 4.使用缓存 Cache-Control, Last-Modified, Etag
// 5.非核心代码异步加载 document.createElement('script'), defer, async

// 题6
// vue和react的打包都做了什么？用自己的语言描述一下
// vue:
// 查找 /build/build.js, 载入 /config/*, build/webpack.prod.conf 配置文件
// 加载 entry 入口文件 ./src/main.js
// 载入 vue-loader, babel-loader, url-loader, style-loader等
// 调用 plugins 下的各插件
// 将打包后的文件输出取 output 指定目录中


// 请于2天内完成并发送答案到: wei.liu@1step.ai和peng.gu@1step.ai
