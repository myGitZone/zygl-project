import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/main/main'
import Login from '@/components/login/login'
import Home from '@/components/main/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/main',
      name: 'main',
      component: Main,
      children: [{
        path: '',
        redirect: 'home'
      }, {
        path: 'home',
        name: 'home',
        component: Home
      }]
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
