<template>
  <v-app>
    <app-loader v-if="loader"></app-loader>

    <app-header></app-header>

    <app-aside-bar></app-aside-bar>
    <v-main class="grey lighten-3">
      <div class="pa-4">
        <router-view :key="$route.path"/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import jwtDecode from 'jwt-decode'
import AppHeader from "../components/AppHeader";
import AppAsideBar from "../components/AppAsideBar";

export default {
  name: "layout",
  components: {
    AppHeader,
    AppAsideBar
  },
  data: () => ({
  }),
  methods: {
    ...mapMutations(['setUserInfo']),

    ...mapActions(['getUserDetail']),
  },
  computed: {
    ...mapState({userInfo: 'userInfo', token: 'token'}),
    ...mapState('utils', ['loader'])
  },
  async created() {
    //sacamos la info del token
    if (this.token) {
      const userDecode = jwtDecode(this.token)
      await this.setUserInfo(userDecode)
      await this.getUserDetail(userDecode.username)
    } else {
      this.$router.push('/login').catch(e => {
      })
    }
  },
}
</script>

<style scoped>

</style>