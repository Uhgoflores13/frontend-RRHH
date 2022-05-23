import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../modules/utils'
import {http_client} from "../plugins/http_client";

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
    modules: {
        utils,
    }
})
