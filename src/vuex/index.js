import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    val: 0
  },
  mutations: {
    changeVal (state, val) {
      state.val = val
    }
  },
  actions: {

  }
})
