import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../modulos/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
  },
  modules: {
    utils,
  }
})
