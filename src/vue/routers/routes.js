// import Home from '../views/home/home.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'home',
    path: '/home',
    // component: Home,
    // component: () => import('@/views/home/home.vue'),
    component: resolve => {
      require.ensure([],
        () => {
          resolve(require('@vue/views/home.vue'))
        },
        'homePage'
      )
    },
    meat: {
      title: 'this is home',
      description: 'home description'
    }
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  }
]
