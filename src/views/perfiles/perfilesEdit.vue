<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Perfiles
          <v-icon color="blueGrayMinsal">mdi-pencil</v-icon>
        </v-card-title>

        <v-row>
          <v-col cols="12" md="6">
            <v-card-text>
              <v-text-field
                label="Nombre"
                color="blueMinsal"
                v-model="perfil.nombre"
                :rules="[
                  (v) =>
                    (v !== null && v !== '') || 'Este campo es obligatorio',
                ]"
              ></v-text-field>
              <v-text-field
                label="Código"
                color="blueMinsal"
                v-model="perfil.codigo"
                :rules="[
                  (v) =>
                    (v !== null && v !== '') || 'Este campo es obligatorio',
                ]"
              ></v-text-field>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="6">
            <v-virtual-scroll
              height="200"
              item-height="37"
              :bench="roles.length - 5"
              :items="roles"
            >
              <template v-slot:default="{ item }">
                <v-checkbox
                  :label="item.name"
                  class="ml-2"
                  v-model="item.value"
                  color="blueMinsal"
                ></v-checkbox>
              </template>
            </v-virtual-scroll>
            <v-checkbox
              label="TODOS"
              class="ml-2"
              v-model="allRoles"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0">
              <v-btn
                color="blueMinsal"
                class="white--text ma-1"
                rounded
                @click="putPerfil()"
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
                @click="deletePerfil()"
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
  name: "perfilesEdit",
  data: () => ({
    perfil: { nombre: null, codigo: null },
    editingPerfil: null,
    allRoles: false,
    roles: [],
  }),
  methods: {
    async getRoles() {
      const response = await this.http_client("/api/v1/roles");
      this.roles = response.data;
      this.editingPerfil.roles.forEach((element) => {
        const index = this.roles.findIndex(
          (item) => element.nombre == item.name
        );
        this.roles[index].value = true;
      });
    },
    async putPerfil() {
      if (!this.perfil.nombre || !this.perfil.codigo) {
        return;
      }
      const id_perfil = this.$route.params.id;
      const newRoles = this.roles.filter((rol) => {
        if (rol.value == true) {
          return rol;
        }
      });
      const response = await this.http_client(
        "/api/v1/perfiles",
        {
          id_perfil: id_perfil,
          nombre: this.perfil.nombre,
          codigo: this.perfil.codigo,
          roles: newRoles,
        },
        "put"
      );
      this.temporalAlert({
        show: true,
        message: "Se actualizó el perfil",
        type: "success",
      });
      this.$router.push("/perfiles/list");
      localStorage.removeItem("editingPerfil");
    },
    async deletePerfil() {
      const id_perfil = this.$route.params.id;
      const response = await this.http_client(
        "/api/v1/perfiles",
        {
          id: [id_perfil],
        },
        "delete"
      );
      this.temporalAlert({
        show: true,
        message: "Se eliminó el perfil",
        type: "success",
      });
      this.$router.push("/perfiles/list");
      localStorage.removeItem("editingPerfil");
    },
  },
  watch: {
    allRoles() {
      if (this.allRoles == true) {
        this.roles = this.roles.map((item) => {
          return { ...item, value: true };
        });
      } else {
        this.roles = this.roles.map((item) => {
          return { ...item, value: false };
        });
      }
    },
  },
  async created() {
    this.editingPerfil = JSON.parse(localStorage.getItem("editingPerfil"));
    if (this.editingPerfil) {
      if (this.editingPerfil.id == this.$route.params.id) {
        await this.getRoles();
        this.perfil = this.editingPerfil;
      } else {
        this.$router.push("/perfiles/list");
      }
    } else {
      this.$router.push("/perfiles/list");
    }
  },
};
</script>
