import Vue from "vue";
import auth from './auth.services'
import users from './user.services'
import roles from './roles.services'
import profiles from './profiles.services'
import typeRoles from './typeRoles.services'

Vue.prototype.services = {
    auth,
    users,
    roles,
    profiles,
    typeRoles
}