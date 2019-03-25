import Vue from 'vue'
import Router from 'vue-router'

import Launch from './views/Launch.vue'
import Quiz from './views/Quiz.vue'

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
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    }
  ]
})
