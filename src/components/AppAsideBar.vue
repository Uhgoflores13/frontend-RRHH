<template>
  <v-navigation-drawer
    app
    permanent
    stateless
    :class="sideBar?'px-0':'px-2'"
    :mini-variant="sideBar"
    mini-variant-width="70"
    @input="setSibeBar($event)"
  >
    <template v-slot:prepend >
       <v-card elevation="2" class="ma-4 py-0" v-if="!sideBar">
          <v-card-title>
            <img
              :src="require(`@/assets/img/SIS-HAZUL.png`)"
              width="95%"
              height="auto"
            />
          </v-card-title>
       </v-card>
         <v-list-item v-else two-line >
           <v-btn text icon x-large color="blueMinsal" @click="$router.push('/')"><v-icon size="30">mdi-asterisk</v-icon></v-btn>
         </v-list-item>
    </template>
    <v-list rounded>
      <v-list-item
      v-for="(item,i) in menu" :key="i"
        :to="item.uri"
        active-class="grey lighten-5 blueMinsal--text"
      >
        <v-list-item-icon>
          <v-icon>{{item.icono}}</v-icon>
        </v-list-item-icon>

        <v-list-item-title class="text-capitalize">{{item.nombre}}</v-list-item-title>
      </v-list-item>

      <!-- <v-list-group :value="true" no-action>
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
      </v-list-group> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "AppAsideBar",
  props: {
    menu: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data: () => ({}),
  methods: {
    ...mapMutations("utils", ["setSibeBar"]),
  },
  computed: {
    ...mapState("utils", ["sideBar"]),
  },
};
</script>

<style scoped></style>
