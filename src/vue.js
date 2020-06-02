import { createApp } from './vue-app'

const { app, router } = createApp()

// 这里假定 App.vue 模板中根元素具有 `id="app"`
// app.$mount('#root')

router.onReady(() => {
  app.$mount('#root')
})