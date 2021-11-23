<template>
  <div>
    <v-spacer class="my-14"></v-spacer>
    <v-bottom-navigation background-color="blueDarkMinsal" fixed >
      <v-btn
        value="recent"
        v-for="(item, index) in menu"
        :key="index"
        rounded
        :to="item.uri"
      >
        <span class="white--text">{{ item.nombre }}</span>
    
        <v-icon class="white--text">{{ item.icono }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    menu: {
      type: Array,
      default: () => {
        return [{uri:'/dashboard',nombre:'Dashboard',icono:'mdi-home'}];
      },
    },
  },
  data: () => ({}),
  methods: {
    ...mapMutations("utils", ["setSibeBar"]),
    
  },
  computed: {
    ...mapState("utils", ["sideBar"]),
    ...mapState(["userInfo", "userDetail"]),
  },
};
</script>
