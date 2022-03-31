import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  // state 中存放的就是全局共享的数据
  state: {
    count: 0
  },
  actions,
  mutations
})
