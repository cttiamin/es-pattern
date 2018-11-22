{
  let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
  }

  // console.log(Reflect.get(obj, 'time')) // 2017-03-11
  Reflect.set(obj, 'name', 'mukewang')
  // console.log(obj)
  // console.log('has', Reflect.has(obj, 'name'))
}

// 应用
{
  function validator(target, validator) {
    return new Proxy(target, {
      _validator: validator,
      set(target, key, value, proxy) {
        if (target.hasOwnProperty(key)) {
          let va = this._validator[key]
          if (!!va(value)) {
            return Reflect.set(target, key, value, proxy)
          } else {
            throw Error(`不能设置${key}到${value}`)
          }
        } else {
          throw Error(`${key} 不存在`)
        }
      }
    })
  }

  const personValidators = {
    name(val) {
      return typeof val === 'string'
    },
    age(val) {
      return typeof val === 'number' && val > 18
    }
  }

  class Person {
    constructor(name, age) {
      this.name = name
      this.age = age
      return validator(this, personValidators)
    }
  }

  const person = new Person('lilei', 30)
  console.info(person)
  person.name = 'han mei mei'
  // person.sex = 12
}