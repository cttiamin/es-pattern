import { cube } from './math.js'
import './assets/scss/index.scss'
import './assets/css/index.css'
import Icon from './assets/img/border.png'
// import { printMe, ui } from './print.js'
// import {style} from './style/style.js'

import './data-type/index';
import './oop/index';
// import './async/10-action'
// import './async/20_cors'
// import './async/50-deferred'
// import './async/51-promise'
// import './async/52-es5-promise'
// import './async/53-await'
// import './async/60-genertaor'
// import './assets/js/event-util'
// import './dom-event/271-custom';
// import './dom-event/300-vdom'
// import './dom-event/301-snabbdom'
// import './dom-event/302-snabbdom'
// import './dom-event/310-diff'
// import './pattern/index'
// import './regex/index';

import _ from 'lodash';
import $ from 'jquery';

// ui();
const dom = $('<div>');
dom.html(_.join(['dell', 'lee', 'hello'], '-'));
$('body').append(dom)

// document.addEventListener('click', () => {
//   // getComponent().then(element => {
//   //   document.body.appendChild(element)
//   // })

// 当网络空闲时加载
// webpackPrefetch 等行核心代码加载后
// webpackPreload 与核心代码同时加载
// import(/* webpackPrefetch: true */ './style/style.js').then(({ default: func }) => {
//   func();
// })
// })

// webpack 实现异步加载、会单独产出一个 chunk
setTimeout(() => {
  import('./style/style.js').then(res => {
    // default.message
    console.log(res)
  });
}, 1500);

// import $ from "../assets/js/jquery3.3.1";
// console.log($('body'))

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

function component() {
  var element = document.createElement('div')

  var h5 = document.createElement('h5')
  h5.innerHTML = [
    'Hello',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n')
  element.appendChild(h5)

  element.id = 'app'
  element.classList.add('app-wrap')

  // Add the image to our existing div.
  var myIcon = new Image();
  myIcon.src = Icon;
  myIcon.classList.add('icon-border')
  element.appendChild(myIcon);

  // add font
  var fontWrap = document.createElement('div')
  fontWrap.classList.add('iconfont')
  fontWrap.classList.add('icon-icon-test')
  element.appendChild(fontWrap);

  return element
}

let element = component()
// Store the element to re-render on print.js changes
document.body.appendChild(element)


////////////////////////////////////
// shopping cart 
// import App from './pattern/shopping-cart/App.js'
// let app = new App('app')
// app.init()


////////////////////////////////////
// webpack 热更新，注册监听范围
if (module.hot) {
  // 如果 print.js 发生变化
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!')
    // printMe();
    document.body.removeChild(element)
    element = component() // Re-render the "component" to update the click handler
    document.body.appendChild(element)
  })
}
