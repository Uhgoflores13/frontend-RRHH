import Vue from 'vue'
import store from '../store'

const http_client = async (url, data = {}, method = 'get', headers = {}, sendToken = true) => {
    const token = store.state.token ? store.state.token : localStorage.getItem('token')

    if (token && sendToken) headers.Authorization = 'Bearer ' + token


    let config = {
        method,
        url,
        headers
    }
    if (method === 'get') {
        config.params = data
    } else {
        config.data = data
    }
    try {
        return await Vue.prototype.axios(config);
    } catch (e) {
        if (e.response.status === 500) {

        } else if (e.response.status === 403) {

        }else{
            throw e
        }
    }
}

Vue.prototype.http_client = http_client

export {
    http_client
}
