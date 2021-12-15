<template>
  <v-navigation-drawer
    app
    permanent
    stateless
    :mini-variant="sideBar"
    mini-variant-width="70"
    @input="setSibeBar($event)"
  >
    <template v-slot:prepend>
      <v-list-item two-line class="blueDarkMinsal">
        <img
          :src="require(`@/assets/SIS-HBLANCO.png`)"
          width="100%"
          height="100"
          v-if="!sideBar"
        />
        <v-btn text fab @click.stop="setSibeBar(!sideBar)" v-if="!sideBar">
          <v-icon class="white--text">mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn text fab @click.stop="setSibeBar(!sideBar)" v-else>
          <v-icon class="white--text">mdi-chevron-right</v-icon>
        </v-btn>
      </v-list-item>
    </template>

    <v-divider></v-divider>
    <v-list rounded>
      <v-list-item
      v-for="(item,i) in menu" :key="i"
        :to="item.uri"
        active-class="grey lighten-4 blueDarkMinsal--text"
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
