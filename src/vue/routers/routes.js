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
  }, {
    name: 'map',
    path: '/map',
    component: resolve => {
      require.ensure([],
        () => {
          resolve(require('@vue/views/map.vue'))
        },
        'mapPage'
      )
    },
    meat: {
      title: 'this is map',
      description: 'map description'
    }
  }, {
    name: 'iframe',
    path: '/iframe',
    component: resolve => {
      require.ensure([],
        () => {
          resolve(require('@vue/views/iframe.vue'))
        },
        'iframePage'
      )
    },
    meat: {
      title: 'this is iframe',
      description: 'iframe description'
    }
  }
]
