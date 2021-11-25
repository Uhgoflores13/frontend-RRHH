<template>
  <v-app>
    <app-loader v-if="loader"></app-loader>

    <app-header></app-header>

    <app-aside-bar :menu="menu"
      v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
    ></app-aside-bar>
    <v-main class="grey lighten-3">
      <div class="pa-4">
        <router-view :key="$route.path" />
      </div>
    </v-main>
    <app-bottom-navigation :menu="menu"
      v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
    ></app-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import jwtDecode from "jwt-decode";
import AppHeader from "../components/AppHeader";
import AppAsideBar from "../components/AppAsideBar";
import AppBottomNavigation from "../components/AppBottomNavigation.vue";

export default {
  name: "layout",
  components: {
    AppHeader,
    AppAsideBar,
    AppBottomNavigation,
  },
  data: () => ({}),
  methods: {
    ...mapMutations(["setUserInfo"]),

    ...mapActions(["getUserDetail"]),
  },
  computed: {
    ...mapState({ userInfo: "userInfo", token: "token" }),
    ...mapState("utils", ["loader", "menu"]),
  },
  async created() {
    //sacamos la info del token
    if (this.token) {
      const userDecode = jwtDecode(this.token);
      await this.setUserInfo(userDecode);
      await this.getUserDetail(userDecode.username);
    } else {
      this.$router.push("/login").catch((e) => {});
    }
  },
};
</script>

<style scoped></style>
