export default {
  namespaced: true,
  state: {
    alert: {
      show: false,
      type: "info",
      message: "",
      timeout: 2500,
    },
    loader: false,
    sideBar: false,
  },
  getters: {
    getAlert: (state) => {
      return state.alert;
    },
  },
  mutations: {
    setAlert: (state, payload) => {
      state.alert = payload;
    },
    setLoader: (state, payload) => {
      state.loader = payload;
    },
    setSibeBar: (state, payload) => {
      state.sideBar = payload;
    },
  },
  actions: {
    setAlert: ({ commit }, payload) => {
      commit("setAlert", payload);
    },
  },
};
