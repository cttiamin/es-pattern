import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes: [
      ...routes
    ],
    // mode: 'history',
    // base: '/base/'
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    // 再次返回页面跳转的位置
    // scrollBehavior (to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     return {
    //       x: 0, y: 0
    //     }
    //   }
    // }
    // 不支持 history 用 hash ?
    // fallback: true

    // ?a=xx&y=bbb 定制
    // parseQuery (query) {},

    // object => string
    // stringifyQuery () {}
  })
}