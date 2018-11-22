import $ from '../assets/js/jquery3.3.1'
/////////////////////
// 单线程： 只有一个线程只能做一件事(同一时间), 两段 js 不能同时执行
// 原因：避免 DOM 渲染的冲突
// 解决方案： 异步
// js 执行的时候， 浏览器 dom 渲染会暂停
// H5: webworker 支持多线程， 但是不能访问 DOM
//
// 异步的问题：
// 1. 没按照书写的方式执行，可读性差
// 2. callback 中不容易模块化
//
//////////////////
// event-loop 事件轮询
// js 实现异步的具体解决方案
// 同步代码，直接执行
// 异步函数先放在 异步队列中
// 行同步函数执行完毕, 轮询执行异步队列的函数
{
  // https://provider-joyreader.wawayaya.com/lenovo/bookResource/2417/page006/797950
  $.ajax({
    url: '/lenovo/bookResource/2417/page006/797950',
    success: function() {
      // console.log('a')
    }
  })

  setTimeout(function() {
    // console.log('b')
  }, 1000)

  setTimeout(() => {
    // console.log('c')
  })
  // => c b a
}

///////////////////////
// jquery Deferred
// 初步引入 Promise 概念

// done fail
{
  var ajax = $.ajax('/lenovo/bookResource/2417/page006/797950')
  ajax.done(function(){
    // console.log('success 1')
  })
  .fail(function() {
    console.log('error')
  })
  .done(function() {
    // console.log('success 2')
  })
  // => 1 2
}

// then
{
  var ajax = $.ajax('/lenovo/bookResource/2417/page006/797950')
  ajax.then(function(){
    // console.log('success 1')
  }, function() {
    console.log('fail 1')
  }).then(function(){
    // console.log('success 2')
  }, function(){
    console.log('fail 2')
  })
  // => 1 2
}

// deferred
// 扩展开放， 修改关闭
// 最初的 promise

// maintainer: 565537037@qq.com
{
  function waitHandle(){
    var dtd = $.Deferred()
    var wait = function (dtd) {
      var task = function() {
        console.log('exec finish')
        dtd.resolve()
        // dtd.reject()
      }
      setTimeout(task, 2000)
      // return dtd
      return dtd.promise()
      // w.reject() => error 
    }
    return wait(dtd)
  }
  var w = waitHandle()
  // w.reject()
  $.when(w).then(function(){
    console.log('ok 1')
  }, function() {
    console.log('err 1')
  })
  
  w.then(function(){
    console.log('ok 2')
  }, function(){
    console.log('err 2')
  })
}