export default {
    namespaced: true,
    state: {
        alert: {
            show: false,
            type: 'default',
            message: ''
        },
        loader: false,
        sideBar: false
    },
    mutations: {
        setAlert: (state, payload) => {
            state.alert = payload
        },
        setLoader: (state, payload) => {
            state.loader = payload
        },
        setSibeBar: (state, payload) => {
            state.sideBar = payload
        }
    },
}