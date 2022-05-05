import Vue from "vue";
import auth from './auth.services'
import users from './user.services'

Vue.prototype.services = {
    auth,
    users
}