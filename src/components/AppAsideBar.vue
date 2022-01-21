<template>
  <v-navigation-drawer
    app
    permanent
    stateless
    :class="sideBar ? 'px-0' : 'px-2'"
    :mini-variant="sideBar"
    mini-variant-width="70"
    @input="setSibeBar($event)"
  >
    <template v-slot:prepend>
      <v-card elevation="1" class="ma-4 py-0" v-if="!sideBar">
        <v-card-title class="pa-0">
          <img
            :src="require(`@/assets/img/SIS-HAZUL.png`)"
            width="95%"
            height="auto"
          />
        </v-card-title>
      </v-card>
      <v-list-item v-else two-line>
        <v-btn text icon x-large color="blueMinsal" 
          ><v-icon size="30">mdi-asterisk</v-icon></v-btn
        >
      </v-list-item>
    </template>
    <v-list dense nav>
      <v-list-item
        v-for="(item, i) in menu"
        :key="i"
        :to="item.uri"
        active-class="grey lighten-5 blueMinsal--text"
      >
        <v-tooltip right :disabled="!sideBar" color="blueMinsal">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon>{{ item.icono }}</v-icon>
            </v-list-item-icon>
          </template>
          <span>{{ item.nombre }}</span>
        </v-tooltip>

        <v-list-item-title class="text-capitalize">{{
          item.nombre
        }}</v-list-item-title>
      </v-list-item>
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
