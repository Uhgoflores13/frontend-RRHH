<template>
  <v-app>
    <v-app-bar app elevation="0" color="white">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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

    <v-navigation-drawer app v-model="drawer" color="blue darken-4">
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content width="200">
            <img :src="require(`@/assets/web-logo-white.png`)" alt=""/>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list>
        <v-list-item>
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
          <v-list-item>
            <v-list-item-icon style="margin-right: .5rem">
              <v-icon color="white">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">prueba</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

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
export default {
  name: "layout",
  data: () => ({
    drawer: null,
  }),
  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapActions(['getUserDetail']),
    cerrarSession() {
      localStorage.clear()
      this.$router.push('/login').catch(e => {
      })
    }
  },
  computed: {
    ...mapState(['userInfo','token'])
  },
  async created() {
    //sacamos la info del token
    if (this.token) {
      const userDecode = jwtDecode(this.token)
      await this.setUserInfo(userDecode)
      await this.getUserDetail()
    } else{
      this.$router.push('/login').catch(e => {
      })
    }
  },
}
</script>

<style scoped>

</style>