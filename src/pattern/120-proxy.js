// 代理模式 imooc
// 使用场景
//
// 1. 网页事件代理
//    (addEvent(父元素) 下的子元素 )
//
// 2. jquery $.proxy
//    var self = this
//
//    fn = $.proxy(fn, this)
// 3. ES6 Proxy
//

class ReadImg {
  constructor(fileName) {
    this.fileName = fileName
    this.loadFromDisk()
  }
  display() {
    console.log('display...' + this.fileName)
  }
  loadFromDisk() {
    console.log('loading...' + this.fileName)
  }
}
class ProxyImg {
  constructor(fileName) {
    this.realImg = new ReadImg(fileName)
  }
  display() {
    this.realImg.display()
  }
}
// let proxy = new ProxyImg('1.png')
// proxy.display()

/////////////////////////
// ES6 Proxy 模拟经纪人
let star = {
  name: '张xx',
  age: 23,
  phone: '13910733521'
}

let agent = new Proxy(star, {
  get: function(targte, key) {
    if (key === 'phone') {
      return '18611112222'
    }
    if (key === 'price') {
      return 120000
    }
    return targte[key]
  },
  set: function(target, key, val) {
    if (key === 'customPrice') {
      if (val < 100000) {
        throw new Error('价格太低')
      } else {
        target[key] = val
        return true
      }
    }
  }
})

console.log(agent.name, agent.age, agent.phone, agent.price)

agent.customPrice = 150000
console.log('customPrice', agent.customPrice)
