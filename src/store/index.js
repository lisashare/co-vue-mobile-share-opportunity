import Vue from 'vue'
import Vuex from 'vuex'
import lisa from './lisa'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: { lisa }
})

export default store
