import Vue from 'vue'
import './plugins/axios'
import './plugins/http_client'
import './plugins/utils'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './components'

const moment = require('moment')
require('moment/locale/es')
import momentTime from 'moment-timezone'

Vue.use(require('vue-moment'), {
  moment,momentTime
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    const token = localStorage.getItem('token')
    if (token)
      store.commit('setToken', token)
  },
  render: h => h(App)
}).$mount('#app')
