<template>
  <v-app>
    <app-loader v-if="loader"></app-loader>

    <app-header></app-header>
    <!-- Colocar :menu="menu" para validar navegacion con back -->
    <app-aside-bar
      v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
    ></app-aside-bar>
    <v-main class="bgMinsal">
      <!-- <app-menu /> -->
      <div class="pa-2 pa-sm-4" v-if="userDetail">
        <router-view :key="$route.path" />
      </div>
    </v-main>
    <!-- Colocar :menu="menu" para validar navegacion con el back -->
    <app-bottom-navigation
      v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
    ></app-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import jwtDecode from "jwt-decode";

export default {
  name: "layout",
  data: () => ({}),
  methods: {
    ...mapMutations(["setUserInfo",'setUserDetail']),
    //...mapActions(['getEstablecimientos']),
    ...mapActions(["getUserDetail"]),
  },
  computed: {
    ...mapState({
      userInfo: "userInfo",
      token: "token",
      userDetail: "userDetail",
    }),
    ...mapState("utils", ["loader", "menu"]),
  },
  async created() {
    // //await this.getEstablecimientos();
    // DESCOMENTAR cuando se quiera funcinoalidad
    // var userToken = this.token || localStorage.getItem('token');
    // if (userToken) {
    //   const userDecode = jwtDecode(userToken);
    //   this.setUserInfo(userDecode);
    //   this.setUserDetail(userDecode.user);
    //   //await this.getUserDetail(userDecode.email);
    // } else {
    //   this.$router.push("/login").catch((e) => {});
    // }
  },
};
</script>

<style scoped>
</style>