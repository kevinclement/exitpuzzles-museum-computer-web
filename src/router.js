import Vue from 'vue'
import Router from 'vue-router'

import Launch from './views/Launch.vue'
import LaunchOld from './views/LaunchOld.vue'
import Quiz from './views/Quiz.vue'
import InsertDisk from './views/InsertDisk.vue'
import Password from './views/Password.vue'
import Journal from './views/Journal.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'launch',
      component: Launch
    },
    {
      path: '/old',
      name: 'launchold',
      component: LaunchOld
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/insert',
      name: 'insert',
      component: InsertDisk
    },
    {
      path: '/password',
      name: 'password',
      component: Password
    },
    {
      path: '/journal',
      name: 'journal',
      component: Journal
    },
  ]
})
