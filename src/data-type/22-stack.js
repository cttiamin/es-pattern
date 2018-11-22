// https://juejin.im/entry/58759e79128fe1006b48cdfd

function Stack() {
  this.items = []
}
Stack.prototype = {
  constructor: Stack,
  push: function(element) {
    this.items.push(element)
  },
  pop: function() {
    return this.items.pop()
  },
  peek: function() {
    return this.items[this.items.length - 1]
  },
  isEmpty: function() {
    return this.items.length == 0
  },
  clear: function() {
    this.items = []
  },
  size: function() {
    return this.items.length
  },
  print: function() {
    console.log(this.items.toString())
  }
}

// var stack = new Stack()
// console.log(stack.isEmpty()) //true
// stack.push(5)
// stack.push(8)
// console.log(stack.peek()) //8
// stack.push(11)
// console.log(stack.size()) //3
// console.log(stack.isEmpty())
// stack.push(15)
// stack.pop()
// stack.pop()
// console.log(stack.size()) //2
// console.log(stack.print()) //5,8


function Queue() {
  this.items = []
}
Queue.prototype = {
  constructor: Queue,
  enqueue: function(elements) {
    this.items.push(elements)
  },
  dequeue: function() {
    return this.items.shift()
  },
  front: function() {
    return this.items[0]
  },
  isEmpty: function() {
    return this.items.length == 0
  },
  size: function() {
    return this.items.length
  },
  clear: function() {
    this.items = []
  },
  print: function() {
    console.log(this.items.toString())
  }
}

var queue = new Queue()
console.log(queue.isEmpty()) //true
queue.enqueue('huang')
queue.enqueue('cheng')
console.log(queue.print()) //huang,cheng
console.log(queue.size()) //2
console.log(queue.isEmpty()) //false
queue.enqueue('du')
console.log(queue.dequeue()) //huang
console.log(queue.print()) //cheng,du
