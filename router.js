import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages'
import About from './pages/about'
import Finance from './pages/finance'
import SearchDailyExpenses from './pages/search-daily-expenses'

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
        name: 'search-daily-expenses',
        path: '/:lang?/search-daily-expenses/:id?',
        component: SearchDailyExpenses
      },
      {
        name: 'home',
        path: '/:lang?/',
        component: Home
      }
    ]
  })
}
