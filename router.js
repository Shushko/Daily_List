import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages'
import About from './pages/about'
import Finance from './pages/finance'
import Statistics from './pages/statistics'

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
        name: 'finance',
        path: '/:lang?/finance',
        component: Finance
      },
      {
        name: 'statistics',
        path: '/:lang?/statistics',
        component: Statistics
      },
      {
        name: 'home',
        path: '/:lang?/',
        component: Home
      }
    ]
  })
}
