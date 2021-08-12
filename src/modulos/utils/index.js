export default {
    namespaced: true,
    state: {
        alert: {
            show: false,
            type: 'default',
            message: ''
        },
        loader: false,
    },
    mutations: {
        setAlert: (state, payload) => {
            state.alert = payload
        },
        showLoader: (state, payload) => {
            state.loader=payload
        },
    },
}