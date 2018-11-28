
const {argv, argv0, execArgv, execPath, env } = process;
// argv[0] : node 安装位置
// argv[1]: 当前文件路径
// 
// argv.forEach(item => {
//   console.log(item)
// })

// execArgv: 额外参数
// console.log(argv0, execArgv, execPath)

// # node argv.js --test a=1 b=2


// 环境
// console.log(env)


// 等下个任务队列最首 (常用)
setImmediate(() => {
  // console.log('setImmediate')
})

// 中间
setTimeout(() => {
  // console.log('timeout')
}, 0);

// 当前队列的最后 1 个, 队尾
process.nextTick(() => {
  // console.log('nextTick');
  // // 问题
  // process.nextTick(() => {
  //   console.log('nextTick2');
  // })
})


// 调试测试
function test1() {
  const a = parseInt(Math.random() * 10);
  const b = parseInt(Math.random() * 10);
  const c = test2(a, b)
}

function test2(a, b) {
  if(a > b) {
    a += a * 2;
  } else {
    b -= a;
  }
  return a + b;
}

// test1();

// node --inspect-brk argv.js
// chrome://inspect


function test(n) {
  console.log(n)
}

for(let i = 0; i < 100; i++) {
  const n = parseInt(Math.random() * 10);
  test(n)
}

