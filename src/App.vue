<template>
 <router-view></router-view>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: null,
    opciones:[{
      title:'Perfil',
      icon:'mdi-account',
    },{
      title:'Cerrar Session',
      icon:'mdi-logout',
    }]
  }),
};
</script>
