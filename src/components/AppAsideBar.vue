<template>
  <v-navigation-drawer app :value="sideBar" @input="setSibeBar($event)" color="blue darken-4" temporary>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-content>
          <img :src="require(`@/assets/web-logo-white.png`)" alt="" class="app-img-logo-all"/>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>
    <v-list>
      <v-list-item to="/" active-class="blue darken-2">
        <v-list-item-icon>
          <v-icon color="white">mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title class="white--text">Home</v-list-item-title>
      </v-list-item>

      <v-list-group
          :value="true"
          no-action

      >
        <template v-slot:activator>
          <v-list-item-title class="white--text">Users</v-list-item-title>
        </template>
        <template #prependIcon>
          <v-icon color="white">mdi-account-circle</v-icon>
        </template>
        <template #appendIcon>
          <v-icon color="white">mdi-chevron-down</v-icon>
        </template>
        <v-list-item to="/perfil" active-class="blue darken-2">
          <v-list-item-icon class="app-list-item-icon">
            <v-icon color="white">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">prueba</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "AppAsideBar",
  data:()=>({
  }),
  methods:{
    ...mapMutations('utils',['setSibeBar']),
  },
  computed:{
    ...mapState('utils',['sideBar'])
  }
}
</script>

<style scoped>

</style>