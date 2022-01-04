<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-2 pa-sm-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Perfiles
          <v-icon color="blueGrayMinsal">mdi-plus</v-icon>
        </v-card-title>
        <v-row>
          <v-col cols="12" md="6">
            <v-card-text>
              <v-text-field
                label="Nombre"
                color="blueMinsal"
                v-model="nombrePerfil"
                :rules="[
                  (v) =>
                    (v !== null && v !== '') || 'Este campo es obligatorio',
                ]"
              ></v-text-field>
              <v-text-field
                label="Código"
                color="blueMinsal"
                v-model="codigoPerfil"
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
                @click="
                  postPerfil(true);
                  
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
                @click="postPerfil()"
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
  name: "perfilesCreate",
  data: () => ({
    nombrePerfil: null,
    codigoPerfil: null,
    allRoles: false,
    roles: [],
  }),
  methods: {
    async getRoles() {
      const response = await this.http_client("/api/v1/roles");
      this.roles = response.data;
    },
    async postPerfil(navigate=false) {
      if (!this.nombrePerfil || !this.codigoPerfil) {
        return;
      }
      const newRoles = this.roles.reduce((activos, rol)=> {
        if (rol.value==true) {
          activos.push(rol.id);
        }
        return activos;
      }, []);
      const response = await this.http_client(
        "/api/v1/perfiles",
        { nombre: this.nombrePerfil.trim(),
          codigo: this.codigoPerfil.trim(),
          roles: newRoles
        },
        "post"
      );
      this.temporalAlert({
        show: true,
        message: "Se ha creado el perfil",
        type: "success",
      });
      this.nombrePerfil = null;
      this.codigoPerfil = null;
      if (navigate) {
        this.$router.push('/perfiles/list');
      }
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
  created() {
    this.getRoles();
  },
};
</script>
