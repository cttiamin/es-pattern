import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import store from './vue/store'
// import Meta from 'vue-meta'

// import './assets/scss/reset.scss'
import createRouter from './vue/routers/router'
// import VueLocalStorage from 'vue-localstorage'
// import './libs/rem'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import store from './store/index'
// import VueLazyLoad from 'vue-lazyload'
// import { getData, postData } from './libs/fech'

// 定义全局变量
// Vue.prototype.$post = postData
// Vue.prototype.$get = getData
// Vue.use(VueLazyLoad, {
//   error: './assets/img/loading.gif',
//   loading: './assets/img/loading.gif',
//   preLoad: 1.3,
//   attempt: 1,
//   throttleWait: 200,
//   listenEvents: ['scroll']
// })
// Vue.use(VueAxios, axios)
// Vue.use(VueLocalStorage)
Vue.config.productionTip = false

// 注册路由
Vue.use(VueRouter)
const router = createRouter()

// meta
// Vue.use(Meta)

// const root = document.createElement('div')
// document.body.appendChild(root)
// new Vue({
//   localStorage: {
//     bookrackList: {
//       type: Object,
//       default: {
//         sum: 0,
//         list: []
//       }
//     },
//     userInfo: {
//       type: Object,
//       default: {
//         token: '',
//         lenovoId: '',
//         deviceId: '',
//         userId: '',
//         userName: ''
//       }
//     },
//     bookrackSum: {
//       type: Number
//     }
//   },
//   router,
//   render: h => h(App)
// }).$mount('#root')

export function createApp() {
  const app = new Vue({
    localStorage: {
      bookrackList: {
        type: Object,
        default: {
          sum: 0,
          list: []
        }
      },
      userInfo: {
        type: Object,
        default: {
          token: '',
          lenovoId: '',
          deviceId: '',
          userId: '',
          userName: ''
        }
      },
      bookrackSum: {
        type: Number
      }
    },
    router,
    store,
    render: h => h(App)
  })
  return { app, router }
}
// console.log('app')
