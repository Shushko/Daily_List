import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages'
import About from './pages/about'
import Tasks from './pages/tasks'
import Finance from './pages/finance'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: 'about',
        path: '/:lang?/about',
        component: About
      },
      {
        name: 'tasks',
        path: '/:lang?/tasks',
        component: Tasks
      },
      {
        name: 'finance',
        path: '/:lang?/finance',
        component: Finance
      },
      {
        name: 'home',
        path: '/:lang?/',
        component: Home
      }
    ]
  })
}
