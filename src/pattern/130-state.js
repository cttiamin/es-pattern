// 状态机模式

// 场景：有限状态机 promise

// 状态(红灯，绿灯，黄灯)
class State {
  constructor(color) {
    this.color = color
  }
  handle(context) {
    console.log(`true to ${this.color} light`)
    context.setState(this)
  }
}

// 主体
class Context {
  constructor() {
    this.state = null
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
  }
}

// let context = new Context()
// let green  = new State('green')
// let yellow = new State('yellow')
// let red = new State('red')
// green.handle(context)
// console.log(context.getState())
// yellow.handle(context)
// console.log(context.getState())
// red.handle(context)
// console.log(context.getState())

//////////////////////////////////
// 状态机
// cnpm i javascript-state-machine --save
var StateMachine = require('javascript-state-machine')
var fsm = new StateMachine({
  init: '收藏',
  transitions: [
    { name: 'doStore', from: '收藏', to: '取消收藏' },
    { name: 'deleteStore', from: '取消收藏', to: '收藏' }
  ],
  methods: {
    onDoStore: function() {
      console.log('收藏成功')
      updateText()
    },
    // 监听取消收藏
    onDeleteStore: function() {
      console.log('取消收藏')
      updateText()
    }
  }
})

let btn = document.createElement('button')
document.body.appendChild(btn)
// btn.textContent= 'btn-1'

btn.addEventListener('click', function(e) {
  // console.log(e)
  if (fsm.is('收藏')) {
    fsm.doStore()
  } else {
    fsm.deleteStore()
  }
})

// 更新按钮的文案
function updateText() {
  btn.textContent = fsm.state
}

// updateText()



//////////////////////////////////
// Promise
var fsm2 = new StateMachine({
  init: 'pending',
  transitions: [
    {
      name: 'resolve',
      from: 'pending',
      to: 'fullfilled'
    },
    {
      name: 'reject',
      from: 'pending',
      to: 'rejected'
    }
  ],
  methods: {
    onResolve: function(state, data) {
      // 参数：state - 当前状态示例; data - fsm.resolve(xxx) 执行时传递过来的参数
      data.successList.forEach(fn => fn())
    },
    onReject: function(state, data) {
      data.failList.forEach(fn => fn())
    }
  }
})

class MyPromise {
  constructor(fn) {
    this.successList = []
    this.failList = []
    fn(
      () => {
        fsm2.resolve(this)
      },
      () => [fsm2.reject(this)]
    )
  }
  then(successFn, failFn) {
    this.successList.push(successFn)
    this.failList.push(failFn)
  }
}

function loadImg(src) {
  const promise = new MyPromise(function(resolve, reject) {
    var img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject()
    }
    img.src = src
  })
  return promise
}

var src = 'http://www.imooc.com/static/img/index/logo_new.png'
var result = loadImg(src)
console.log(result)

result.then(
  function(img) {
    console.log('success 1')
  },
  function() {
    console.log('failed 1')
  }
)
result.then(
  function(img) {
    console.log('success 2')
  },
  function() {
    console.log('failed 2')
  }
)
