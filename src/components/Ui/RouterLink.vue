<template>
  <div>
    <div>
      <RouterLink :to="{ name: to }"
      class="block md:inline-block rounded bg-blue-600 py-2 px-3 text-white uppercase font-bold text-sm shadow hover:bg-blue-500 ">
    <slot></slot>
    </RouterLink>
    </div>
  </div>
</template>

<script>
    import { RouterLink } from 'vue-router';

    export default {
  name: "Router-link",
  props: {
    to:{
        type: String,
    }
  },
  methods: {
  },
  computed: {
  },
};
</script>
