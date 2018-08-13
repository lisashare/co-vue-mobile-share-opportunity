// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './stylesheets/main.less'
// 设置页面的rem的计算，放在最上面
import './modules/rem'

// filter premiere
import './modules/filter'

import './modules/directive'


import Vue from 'vue'
import App from './App'
import router from './router'
// 目的:在任意的组件中通过this.$store来使用关于store的api
import store from './store'

// 处理axios,让组件通过this.$http来使用
import axios from 'axios'

import {LoadMore} from 'vux'
// 按需引入部分组件
import {Lazyload, InfiniteScroll, Spinner} from 'mint-ui'

Vue.config.productionTip = true
Vue.prototype.$http = axios
Vue.component('load-more', LoadMore)
Vue.use(Lazyload)
Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
