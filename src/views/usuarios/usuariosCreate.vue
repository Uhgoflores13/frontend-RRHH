<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-2 pa-sm-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Usuarios
          <v-icon color="blueGrayMinsal">mdi-plus</v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Correo"
            color="blueMinsal"
            v-model="usuario"
            :rules="[
              (v) => (v !== null && v !== '') || 'Este campo es obligatorio',
            ]"
          ></v-text-field>
          <v-text-field
            label="Contraseña"
            color="blueMinsal"
            type="password"
            v-model="password"
            :rules="[
              (v) => (v !== null && v !== '') || 'Este campo es obligatorio',
            ]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0">
              <v-btn
                color="blueMinsal"
                class="white--text ma-1"
                rounded
                @click="postUsuario(true)"
                :small="$vuetify.breakpoint.xs"
              >
                <v-icon left>mdi-content-save</v-icon>
                Crear y regresar al listado</v-btn
              >
              <v-btn
                color="blueMinsal"
                class="white--text ma-1"
                :small="$vuetify.breakpoint.xs"
                rounded
                @click="postUsuario()"
              >
                <v-icon left>mdi-content-save-all</v-icon>
                Crear y agregar otro</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card></v-flex
    ></v-container
  >
</template>
<script>
export default {
  name: "usuariosCreate",
  data: () => ({
    usuario: null,
    password: null,
  }),
  methods: {
    async postUsuario(navigate = false) {
      if (!this.usuario || !this.password) {
        return;
      }

      const response = await this.http_client(
        "/api/v1/usuarios",
        { email: this.usuario.trim(), password: this.password.trim() },
        "post"
      );
      this.temporalAlert({
        show: true,
        message: "Se ha creado el usuario",
        type: "success",
      });
      this.usuario = null;
      this.password = null;
      if (navigate) {
        this.$router.push("/usuarios/list");
      }
    },
  },
};
</script>
