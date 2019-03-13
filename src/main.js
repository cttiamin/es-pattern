import { cube } from './math.js'
import './assets/css/style.css'
// import Icon from './assets/img/clock-icon.png'
// import printMe from './print.js'

// es5 code => 数据类型
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

// pattern
import './pattern/index'
// reg
import './regex/index';


// import $ from "../assets/js/jquery3.3.1";
// console.log($('body'))


if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

function component() {
  var element = document.createElement('div')
  var h5 = document.createElement('h5')
  
  h5.innerHTML = '[Hello , webpack4]'
  h5.innerHTML = [
    'Hello webpack4!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n')

  element.appendChild(h5)
  element.id = 'app'
  element.classList.add('app-wrap')

  // Add the image to our existing div.
  // var myIcon = new Image();
  // myIcon.src = Icon;
  // element.appendChild(myIcon);

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
// hot replace
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!')
    // printMe();
    document.body.removeChild(element)
    element = component() // Re-render the "component" to update the click handler
    document.body.appendChild(element)
  })
}
