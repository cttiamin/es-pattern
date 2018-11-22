// Proxy
{
  let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
  }

  let monitor = new Proxy(obj, {
    // 拦截对象属性的读取
    get(target, key) {
      return target[key].replace('2017', '2018')
    },
    // 拦截对象设置属性
    set(target, key, value) {
      if (key === 'name') {
        return (target[key] = value)
      } else {
        return target[key]
      }
    },
    // 拦截key in object操作
    has(target, key) {
      if (key === 'name') {
        return target[key]
      } else {
        return false
      }
    },
    // 拦截delete
    deleteProperty(target, key) {
      if (key.indexOf('_') > -1) {
        delete target[key]
        return true
      } else {
        return target[key]
      }
    },
    // 拦截 Object.keys, Object.getOwnPropertySymbols, 
    // Object.getOwnPropertyNames
    ownKeys(target) {
      return Object.keys(target).filter(item => item != 'time')
    }
  })

  // console.log(monitor.time)  // 2018-03-11
  monitor.time = '2018'         // no change
  monitor.name = 'mukewang'
  // console.log(monitor.time) // 2018-03-11
  monitor  // {time: "2017-03-11", name: "mukewang", _r: 123}
  console.log('name' in monitor, 'time' in monitor)
  // true false

  delete monitor.time;
  // monitor // {time: "2017-03-11", name: "mukewang", _r: 123}
  
  delete monitor._r;
  console.log('delete',monitor);
  // {time: "2017-03-11", name: "mukewang"}
  
  // console.log('ownKeys', Object.keys(monitor))
}


