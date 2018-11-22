// 面试题： 
// 打车时， 可以打专车或快车，任何车都有车牌号和名称
// 不同车价格不同， 快车每公里1元，专车每公里2元
// 行程开始时， 显示车辆信息
// 行程结束时，显示打车金额(假定行程就 5 公里)

class Car {
  constructor(number, name) {
    this.number = number
    this.name = name
  }
}

class Kuaiche extends Car {
  constructor(number, name) {
    super(number, name)
    this.price = 1
  }
}

class ZhuanChe extends Car {
  constructor(number, name) {
    super(number, name)
    this.price = 2
  }
}

class Trip {
  constructor (car) {
    this.car = car
  }
  start() {
    console.log(`start name: ${this.car.name}, number: ${this.car.number}`);
  }
  end() {
    console.log(`end price: ${this.car.price * 5}` )
  }
}

let car = new Kuaiche(100, '桑塔纳')
let trip = new Trip(car)
trip.start()
trip.end()
