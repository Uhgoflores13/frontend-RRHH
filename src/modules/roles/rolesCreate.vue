<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-2 pa-sm-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Roles
          <v-icon color="blueGrayMinsal">mdi-plus</v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Nombre"
            color="blueMinsal"
            v-model="nombreRol"
            prefix="ROLE_"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0">
              <v-btn
                color="blueMinsal"
                class="white--text ma-1"
                rounded
                @click="
                  postRol(true);
                "
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
                @click="postRol()"
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
  name: "rolesCreate",
  data: () => ({
    nombreRol: null,
  }),
  methods: {
    async postRol(navigate = false) {
      if (!this.nombreRol) {
        return;
      }
      const response = await this.http_client(
        "/api/v1/roles",
        { nombre: "ROLE_" + this.nombreRol.trim() },
        "post"
      );
      this.temporalAlert({
        show: true,
        message: "Se ha creado el rol",
        type: "success",
      });
      this.nombreRol = null;
      if (navigate) {
        this.$router.push('/roles/list')
      }
    },
  },
};
</script>
