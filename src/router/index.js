import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/main/main'
import Login from '@/components/login/login'
import Home from '@/components/main/home/home'
import Organization from '@/components/main/organization/organization'
import PersonManagenment from '@/components/main/person/person-management'

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
      }, {
        path: 'organization',
        name: 'organization',
        component: Organization
      }, {
        path: 'personmanagement',
        name: 'personmanagement',
        component: PersonManagenment
      }]
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
