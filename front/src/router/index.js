import Vue from 'vue'
import Router from 'vue-router'

/**
 * 路由懒加载
 * */
const login = () => import('../views/login.vue')
const home = () => import('../views/home.vue')
const register = () => import('../views/register.vue')
const main = () => import('../views/main.vue')
const admin = () => import('../views/admin.vue')
const errorPage = () => import('../views/error/404.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',/*舍弃hash模式，改用history模式*/
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {        
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/404',
      name: '404',
      component: errorPage
    }
  ]
})
