// async / await
// es7, promise 扩展: 当作同步代码执行
// 使用 await, 函数必须用 async 标识
// await 后面跟的是一个 promise 实例
// cnpm i --save-dev babel-polyfill

// 特点
// 用了 promise 但是没有冲突
// 完全是同步的写法，没有回调函数
// 改变不了 js 单线程

{
  function loadImg(src) {
    var promise = new Promise((resolve, reject) => {
      let img = document.createElement('img')
      img.onload = function() {
        resolve(img)
      }
      img.onerror = function(err) {
        reject('图片加载失败！')
      }
      img.src = src
    })
    return promise
  }

  // var result1 = loadImg(
  //   'https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/84088.jpg!/quality/60/fh/259'
  // )
  // var result2 = loadImg(
  //   'https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/82489.jpg!/quality/60/fh/259'
  // )
  
  var src1 = 'https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/84088.jpg!/quality/60/fh/259'
  var src2 = 'https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/82489.jpg!/quality/60/fh/259'

  const load = async function() {
    const result1 = await loadImg(src1)
    console.log(result1)
    // console.log('result1 end')
    const result2 = await loadImg(src2)
    console.log(result2)
  }
  // load()
}

// promise.Trick()> promise的回调 > setTimeout > setImmediate
{
  async function async1() {
    console.log('asyny1 start');
    await async2();
    console.log('async1 end')
  }
  async function async2() {
    console.log('async2');
  }
  console.log('script start');
  setTimeout(function(){
    console.log('settimeout');
  }, 0)
  async1();
  new Promise (function(resolve) {
    console.log('promise1')
    resolve()
  }).then(function() {
    console.log('promise2')
  })
  console.log('script end')

}
// script start 
// async1 start 
// async2
// promise1 
// script end 
// async1 end 
// promise2
// settimeout 


