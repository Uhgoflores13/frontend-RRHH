<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Roles
          <v-icon color="blueGrayMinsal">mdi-pencil</v-icon>
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Nombre"
            color="blueMinsal"
            v-model="nombreRol"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0">
              <v-btn
                color="blueMinsal"
                class="white--text ma-1"
                rounded
                @click="putRol()"
                :small="$vuetify.breakpoint.xs"
              >
                <v-icon left>mdi-content-save</v-icon>
                Editar y regresar al listado</v-btn
              >
              <v-btn
                color="blueMinsal"
                class="white--text ma-1"
                :small="$vuetify.breakpoint.xs"
                rounded
                @click="deleteRol()"
              >
                <v-icon left>mdi-delete</v-icon>
                Eliminar</v-btn
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
  name: "rolesEdit",
  data: () => ({
    nombreRol: "",
  }),
  methods: {
    async putRol() {
      if (!this.nombreRol) {
        return;
      }
      const id_rol = this.$route.params.id;
      const response = await this.http_client(
        "/api/v1/roles",
        {
          id: id_rol,
          name: this.nombreRol,
        },
        "put"
      );
      this.temporalAlert({
        show: true,
        message: "Se actualizó el rol",
        type: "success",
      });
      this.$router.push("/roles/list");
      localStorage.removeItem("editingRole");
    },
    async deleteRol() {
      const id_rol = this.$route.params.id;
      const response = await this.http_client(
        "/api/v1/roles",
        {
          id: [id_rol],
        },
        "delete"
      );
      this.temporalAlert({
        show: true,
        message: "Se eliminó el rol",
        type: "success",
      });
      this.$router.push("/roles/list");
      localStorage.removeItem("editingRole");
    },
  },
  created() {
    let item = JSON.parse(localStorage.getItem("editingRole"));
    if (item) {
      if (item.id == this.$route.params.id) {
        this.nombreRol = item.name;
      } else {
        this.$router.push("/roles/list");
      }
    } else {
      this.$router.push("/roles/list");
    }
  },
};
</script>
