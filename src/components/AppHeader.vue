<template>
  <v-app-bar app elevation="0" color="white">
    <v-app-bar-nav-icon @click.stop="setSibeBar(!sideBar)"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

    <v-menu offset-y transition="scroll-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            elevation=""
        >
          {{ userInfo.username }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/perfil">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>
        <v-list-item @click="cerrarSession()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cerrar Sessión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState} from "vuex";

export default {
  name: "AppHeader",
  methods:{
    ...mapMutations('utils',['setSibeBar']),
    cerrarSession() {
      localStorage.clear()
      this.$router.push('/login').catch(e => {
      })
    }
  },
  computed:{
    ...mapState(['userInfo']),
    ...mapState('utils', {
      sideBar:'sideBar'
    })
  }
}
</script>

<style scoped>

</style>