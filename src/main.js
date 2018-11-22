import { cube } from './math.js'
import './assets/css/style.css'
// import Icon from './assets/img/clock-icon.png'
// import printMe from './print.js'

// es5 code
// import './data-type/01-assign';
// import './data-type/10-number';
// import './data-type/20-array';
// import './data-type/21-order';
// import './data-type/22-stack';
// import './data-type/23-es6';
// import './data-type/24-set-map.js';
// import './data-type/30-date';
// import './data-type/31-timer';
// import './data-type/40-string';
// import './data-type/41-es6';
// import './data-type/60-symbol';
// import './data-type/61-iterator';

// import './oop/10-function'
// import './oop/12-recursion.js'
// import './oop/13-es6'
// import './oop/20-getter'
// import './oop/22-rest'
// import './oop/30-prototype'
// import './oop/40-inherit';
// import './oop/50-closures';
// import './oop/51-extend';
// import './oop/60-proxy'
// import './oop/61-reflect'
// import './oop/62-class'

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

// import './pattern/010-es6'
// import './pattern/011-car'
// import './pattern/012-park'
// import './pattern/020_standard'
// import './pattern/030_Function'
// import './pattern/060-singleton'
// import './pattern/070-factory'
// import './pattern/080-Iterator';
// import './pattern/090-decorator.js'
// import './pattern/100-observer'
// import './pattern/120-proxy'
// import './pattern/130-state'


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
