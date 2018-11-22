////////////////////////////////////////////////
// 观察者模式
// Date: 2018-03-22 
// 
// 关系: 
//    发布者 
//    订阅者
//    
// 场景: 
// 网页事件绑定 
// Promise 
// Jquery CallBacks: $.Callbacks()
// nodejs 自定义事件: EventEmitter
// vue/react 组件生命周期触发
// 

var publisher = {
  subscribers: {
    any: [] // event type: subscribers 
  },
  subscribe: function (fn, type) {
    type = type || 'any';
    if (typeof this.subscribers[type] === "undefined") {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  },
  unsubscribe: function (fn, type) {
    this.visitSubscribers('unsubscribe', fn, type);
  },
  publish: function (publication, type) {
    this.visitSubscribers('publish', publication, type);
  },
  visitSubscribers: function (action, arg, type) {
    var pubtype = type || 'any',
      subscribers = this.subscribers[pubtype],
      i,
      max = subscribers.length;

    for (i = 0; i < max; i += 1) {
      if (action === 'publish') {
        subscribers[i](arg);
      } else {
        if (subscribers[i] === arg) {
          subscribers.splice(i, 1);
        }
      }
    }
  }
};

function makePublisher(o) {
  var i;
  for (i in publisher) {
    // console.log(i);
    if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
      o[i] = publisher[i];
    }
  }
  o.subscribers = { any: [] };
}

var paper = {
  daily: function () {
    this.publish("big news today");
  },
  monthly: function () {
    this.publish("interesting analysis", "monthly");
  }
};

makePublisher(paper);

var joe = {
  drinkCoffee: function (paper) {
    console.log('Just read ' + paper);
  },
  sundayPreNap: function (monthly) {
    console.log('About to fall asleep reading this ' + monthly);
  }
}

paper.subscribe(joe.drinkCoffee)
paper.subscribe(joe.sundayPreNap, 'monthly');

paper.daily();
paper.daily();
paper.daily();
paper.monthly();

makePublisher(joe);

joe.tweet = function (msg) {
  this.publish(msg);
};

paper.readTweets = function (tweet) {
  console.log('Call big meeting! Someone ' + tweet);
};
joe.subscribe(paper.readTweets);
joe.tweet("hated the paper today");


///////////////////////////////////
// es6 
class Subject {
  constructor () {
    this.state = 0
    this.observers = []
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
    this.notifyAllObservers()
  }
  notifyAllObservers() {
    this.observers.forEach(observers => {
      observers.update()
    })
  }
  attach(observer) {
    this.observers.push(observer)
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name
    this.subject = subject
    this.subject.attach(this)
  }
  
  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`)
  }
}

let s = new Subject()
let o1 = new Observer('o1', s)
let o2 = new Observer('o2', s)
let o3 = new Observer('o3', s)
s.setState(1)








