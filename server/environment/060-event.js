var EventEmitter = require('events').EventEmitter
var life = new EventEmitter()

// addEventListener

// 最多监听事件
life.setMaxListeners(11)

function water (who) {
  console.log('给' + who + '倒水');
}

life.on('求安慰', water)

life.on('求安慰', function (who) {
  console.log('给' + who + '按摩');
})

life.on('求安慰', function (who) {
  console.log('给' + who + '...10');
})

life.on('求安慰', function (who) {
  console.log('给' + who + '交工资');
})

life.on('求溺爱', function (who) {
  console.log('给' + who + '买衣衣');
})

// 移除事件
life.removeListener('求安慰', water)
// life.removeAllListeners()
// life.removeAllListeners('求安慰')


life.emit('求安慰', '汉子')
life.emit('求溺爱', '妹子')

console.log(life.listeners('求安慰').length)
console.log(EventEmitter.listenerCount(life, '求溺爱'));