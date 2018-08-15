import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: () => import('@/components/pages/Mine/Mine')
    },
    {
      // path: '/detail/:id',
      path: '/detail',
      name: 'detail',
      component: () => import('@/pages/Detail/Detail')
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: () => import('@/pages/authentication/authentication')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/components/pages/search/Search')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('@/pages/message/Message')
    },
    {
      path: '/brandSearch',
      name: 'brandSearch',
      component: () => import('@/pages/brandSearch/BrandSearch')
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: () => import('@/components/pages/NotFound/NotFound')},
    {path: '**', redirect: '/not-found'}// 通配符就是没有名字，重定向到not-found
  ]
})
