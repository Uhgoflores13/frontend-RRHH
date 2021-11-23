<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Usuarios
          <v-icon color="blueGrayMinsal">mdi-pencil</v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Correo electrónico"
            color="blueMinsal"
            v-model="usuario.email"
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
          <v-checkbox
            label="Deshabilitado"
            v-model="usuario.is_suspended"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0">
              <v-btn
                color="blueMinsal"
                class="white--text ma-1"
                rounded
                @click="putUsuario()"
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
                @click="deleteUsuario()"
              >
                <v-icon left>mdi-delete</v-icon>
                Eliminar y regresar al listado</v-btn
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
  name: "perfilesEdit",
  data: () => ({
    usuario: { email: null, is_suspended: null },
    password: null,
    editingUsuario: null,
  }),
  methods: {
    async getRoles() {
      const response = await this.http_client("/api/v1/roles");
      this.roles = response.data;
      this.editingUsuario.roles.forEach((element) => {
        const index = this.roles.findIndex(
          (item) => element.nombre == item.name
        );
        this.roles[index].value = true;
      });
    },
    async putUsuario() {
      if (!this.usuario.email || !this.password) {
        return;
      }
      const response = await this.http_client(
        `/api/v1/usuarios`,
        {
          email: this.usuario.email,
          password: this.password,
          is_suspended: this.usuario.is_suspended,
        },
        "put"
      );
      this.temporalAlert({
        show: true,
        message: "Se actualizó el usuario",
        type: "success",
      });
      this.$router.push("/perfiles/list");
      localStorage.removeItem("editingPerfil");
    },
    async deleteUsuario() {
      const id_usuario = this.$route.params.id;
      const response = await this.http_client(
        "/api/v1/usuarios",
        {
          id: [id_usuario],
        },
        "delete"
      );
      this.temporalAlert({
        show: true,
        message: "Se eliminó el usuario",
        type: "success",
      });
      this.$router.push("/perfiles/list");
      localStorage.removeItem("editingPerfil");
    },
  },

  async created() {
    this.editingUsuario = JSON.parse(localStorage.getItem("editingUsuario"));
    if (this.editingUsuario) {
      if (this.editingUsuario.id == this.$route.params.id) {
        this.usuario = this.editingUsuario;
      } else {
        this.$router.push("/usuarios/list");
      }
    } else {
      this.$router.push("/usuarios/list");
    }
  },
};
</script>
