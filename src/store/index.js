import Vue from 'vue'
import Vuex from 'vuex'
import lisa from './lisa'
// import * as modules from './modules'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: { lisa }
})

export default store
