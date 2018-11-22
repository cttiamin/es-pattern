/****************************
 * Cross browser event atcion
 * Date: 14-1-10下午2:01
 */
var EventUtil = {
  /**
   * 添加事件
   * @param element   元素
   * @param type      事件类型
   * @param handler   匿名函数
   */
  addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      // DOM2级
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      // ie特有
      element.attachEvent('on' + type, handler);
    } else {
      //DOM0级
      element['on' + type] = handler;
    }
  },

  /**
   * 移除事件
   * @param element :
   * @param type : Event type
   * @param handler : The add function name
   */
  removeHandler: function(element, type, handler) {
    if (element.removeEventListene) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },

  /**
   * @param event : 当前 event 对象
   * @returns {*} : event 对象的引用
   */
  getEvent: function(event) {
    return event ? event : window.event;
  },

  /**
   * 返回按键信息
   * 将IE(IE8之前)模型下的button属性转换为DOM模型下的button属性
   * IE8之前的buttion属性值与DOM的button属性有很大的差异
   *      0:表示没有按下按钮,
   *      1:表示按下了主鼠标按钮,
   *      2:表示按下了次鼠标按钮
   *      3.同时按下主,次,
   *      4.按下了中间的,
   *      5.同时按下主,中间的
   *      6.同时按下次,中间的,
   *      7.同时按下了三个
   * @param event
   * @returns {*}
   */
  getButton: function(event) {
    //如果是DOM
    if (document.implementation.hasFeature('MouseEvents', '2.0')) {
      // 0 表示主鼠标按钮,
      // 1 表示中间(滚轮)鼠标按钮
      // 2 表示次鼠标按钮
      return event.button;
    }
    // IE8- 必须规范化
    // IE8- 的 buttion 属性值与 DOM的 button 属性有很大的差异
    else {
      switch (event.button) {
        case 0: // 表示没有按下按钮
        case 1: // 表示按下了主鼠标按钮
        case 3: // 同时按下主,次
        case 5: // 同时按下主,中间的
        case 7: // 同时按下了三个
          return 0;
        case 2: // 表示按下了次鼠标按钮
        case 6: // 同时按下次,中间的,
          return 2;
        case 4: // 按下了中间的
          return 1;
      }
    }
  },

  /**
   * relatedTarget
   * 这个属性只有在 mouseover mouseout 事件中才有效.
   * ie8-: fromElement,toElement.
   *
   * relatedTarget: 相关元素的信息,ie no support,
   * toElement: ie特有 在mouseout触发时,相关元素的信息
   * fromElement: ie8 ago特有,在mouseover触发时,
   */
  getRelatedTarget: function(event) {
    if (event.relatedTarget) {
      return event.relatedTarget;
    } else if (event.toElement) {
      return event.toElement;
    } else if (event.fromElement) {
      return event.fromElement;
    } else {
      return null;
    }
  },

  /**
   * 获取事件的目标
   * @param event
   * @returns :触发事件的标签对象
   */
  getTarget: function(event) {
    return event.target || event.srcElement;
  },

  /**
   * 取消事件的默认行为
   * @param event
   */
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    // ie8-
    else {
      event.returnValue = false;
    }
  },

  /**
   * 取消冒泡事件 取消捕获或冒泡
   * @param event
   */
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    // ie-
    else {
      event.cancelBubble = true;
    }
  },

  /**
   * 鼠标滚轮事件
   * @param event
   * @returns {number}: 滚轮事件的值, 120/-120
   */
  getWheelDelta: function(event) {
    // Opera and others
    if (event.wheelDelta) {
      // include "lib/client.js"
      return client.engine.opera && client.engine.opera < 9.5
        ? -event.wheelDelta
        : event.wheelDelta;
      // Opera9.5 之前 wheelDelta 值的正负号是颠倒的
    }
    // FireFox: 把值取反 * 40,  --3*40 = 120
    else {
      return -event.detail * 40;
    }
  },

  /**
   * chrome/firefox 不支持！
   * 键盘事件 => 字符编码
   * 检测 charCode 是否可用, 不支持测用 keyCode
   * @param event
   * @returns {*} 按下那个键的所代表字符的ASCII编码
   */
  getCharCode: function(event) {
    if (typeof event.charCode === 'number') {
      return event.charCode;
    } else {
      return event.keyCode;
    }
  },

  /**
   * * 14.2.2 过滤输入=> 2.操作剪帖
   * 从剪帖板中获得数据
   * @param event :当前对象
   * @returns {string} : 剪贴板中数据
   */
  getClipboardText: function(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    return clipboardData.getData('text');
  },

  /**
   * 14.2.2 过滤输入=> 2.操作剪帖
   * @param event : 当前对象
   * @param value : 放入剪贴板的文本
   * @returns {boolean}: success:true, error:false
   */
  setClipboardText: function(event, value) {
    if (event.clipboardData) {
      //Safari, Chrome
      return event.clipboardData.setData('text/plain', value);
    } else if (window.clipboardData) {
      return window.clipboardData.setData('text', value); //ie
    }
  }
};

// export default EventUtil
