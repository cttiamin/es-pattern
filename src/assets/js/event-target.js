/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-6-25
 * Time: 上午10:57
 * To change this template use File | Settings | File Templates.
 * 自定义事件:
 * 创建一个管理事件对象, 让其他对象监听那些事件.
 */

function EventTarget() {
  //存储存事件处理程序.
  this.handlers = {}
}

EventTarget.prototype = {
  constructor: EventTarget,
  //注册给定类型事件的事件处理程序
  addHandler: function(type, handler) {
    if (typeof this.handlers[type] == 'undefined') {
      this.handlers[type] = []
    }
    this.handlers[type].push(handler)
  },
  //触发一个事件
  fire: function(event) {
    if (!event.target) {
      event.target = this
    }
    //对应事件类型的一组处理程序
    if (this.handlers[event.type] instanceof Array) {
      var handlers = this.handlers[event.type]
      for (var i = 0, len = handlers.length; i < len; i++) {
        handlers[i](event) //调用各个函数
      }
    }
  },
  //注某个事件类型的事件处理程序
  removeHandler: function(type, handler) {
    if (this.handlers[type] instanceof Array) {
      var handlers = this.handlers[type]
      for (var i = 0, len = handlers.length; i < len; i++) {
        if (handlers[i] === handler) {
          //找到要删除处理程序的位置
          break
        }
      }
      handlers.splice(i, 1) //删除该项
    }
  }
}

// export default EventTarget
