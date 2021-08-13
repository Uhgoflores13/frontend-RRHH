import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../modulos/utils'
import {http_client} from "../plugins/http_client";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        userInfo: {},
        userDetail: {}
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        setUserInfo(state, payload) {
            state.userInfo = payload
        },
        setUserDetail(state, userDetail) {
            state.userDetail = userDetail
        }
    },
    actions: {
        async getUserDetail({commit, state}) {
            const response = await http_client(`/api/v1/usuarios/${state.userInfo.username}`)
            commit('setUserDetail', response.data)
        }
    },
    modules: {
        utils,
    }
})
