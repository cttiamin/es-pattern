// 异步编程的解决方案
// 解决：多个回调顺序 => 可读性，可维护性
// all:   所有完成
// race:  其中1个完成

// 老版ie 不支持：
// 引入 https://cdn.bootcss.com/bluebird/3.5.1/bluebird.js

// 三种状态: pending:初始 fulfiled:成功 rejected:失败

// 基本定义
{
  let ajax = function() {
    console.log('执行2')
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log('resolve timeout 2')
        resolve()
      }, 1000)
    })
  }
  // ajax().then(() => console.log('timeout2'))
}

function loadImg(src) {
  var promise = new Promise((resolve, reject) => {
    let img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function(err) {
      // reject(err)
      reject('图片加载失败！')
    }
    img.src = src
  })
  return promise
}

function showImgs(imgs) {
  // console.log(imgs instanceof Array)
  if (imgs instanceof Array) {
    imgs.forEach(function(img) {
      document.body.appendChild(img)
    })
  } else {
    let p = document.createElement('p')
    p.appendChild(imgs)
    document.body.appendChild(imgs)
  }
}

// catch err
{
  // var src = 'https://wawaqinpic.b0.upaiyun.com/tushu/aaa'
  // var result = loadImg(src)
  // result.then(function(img) {
  //     console.log(1, img.width)
  //     return img
  //   }, (err)=> {
  //     console.log('1 err', err)
  //   })
  //   .then(function(img) {
  //     console.log(2, img.height)
  //   }, (err) => console.log('2 err', err))
  // .catch(function(ex) {
  //   console.log(ex)
  // })
}

// 串联操作
{
  var result1 = loadImg('https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/84088.jpg!/quality/60/fh/259')
  var result2 = loadImg('https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/82489.jpg!/quality/60/fh/259');
  result1.then((img1) => {
    console.log('img1 load', img1.width)
    return result2
  }).then((img2) => {
    console.log('img2 load', img2.width)
  }).catch((ex)=> {
    console.log(ex)
  })
}


// all
// 所有图片加载完在添加到页面
{
  // 所有执行完
  // Promise.all([
  //   loadImg('https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/84088.jpg!/quality/60/fh/259'),
  //   loadImg('https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/82489.jpg!/quality/60/fh/259'),
  //   loadImg('https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/80392.jpg!/quality/60/fh/259')
  // ]).then(showImgs)
}

// race
{
  // 其中 1 个
  // Promise.race([
  //   loadImg('https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/84088.jpg!/quality/60/fh/259'),
  //   loadImg('https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/82489.jpg!/quality/60/fh/259'),
  //   loadImg('https://wawaqinpic.b0.upaiyun.com/tushu/thumbhigh/80392.jpg!/quality/60/fh/259')
  // ]).then(showImgs)
}

// es5 实现
{
  function loadImg(src, callback, fail) {
    var img = document.createElement('img')
    img.onload = function() {
      callback(img)
    }
    img.onerror = function() {
      fail()
    }
    img.src = src
  }

  // var src = 'https://education.lenovo.com.cn/wawayaya/wawayaya2/static/image/logo.png';
  // loadImg(src, function(img){
  //   console.log(img)
  // }, function(img) {
  //   console.log(img)
  // })
}
