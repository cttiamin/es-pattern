const EventEmitter = require('events')
class CustomEvent extends EventEmitter {}

const ce = new CustomEvent();

ce.on('test', () => {
  console.log('this is a test!')
})

// setInterval(() => {
//   ce.emit('test')
// }, 500)


ce.on('error', (err, time) => {
  console.log(err, time)
})

// ce.emit('error', new Error('oops!'), Date.now())


// 只调1次
ce.once('test2', () => {
  console.log('test event')
})

// setInterval(( ) => {
//   ce.emit('test2')
// }, 500);


// 
function fn1() {
  console.log('fn1')
}

function fn2() {
  console.log('fn2')
}

ce.on('fn', fn1)
ce.on('fn', fn2)

setInterval(() => {
  ce.emit('fn')
}, 500);

