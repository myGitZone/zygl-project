import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/main/main'
import Login from '@/components/login/login'
import Home from '@/components/main/home/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/main',
      component: Main,
      children: [{
        path: '',
        redirect: 'home'
      }, {
        path: 'home',
        component: Home
      }]
    }, {
      path: '/login',
      component: Login
    }
  ]
})
