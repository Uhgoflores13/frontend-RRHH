<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-2 pa-sm-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Rutas
          <v-icon color="blueGrayMinsal">mdi-plus</v-icon>
        </v-card-title>
        <v-row>
          <v-col cols="12" md="6">
            <v-card-text>
              <v-text-field
                label="Nombre"
                color="blueMinsal"
                v-model="rutaForm.nombre"
              ></v-text-field>
              <v-text-field
                label="URI"
                color="blueMinsal"
                v-model="rutaForm.uri"
              ></v-text-field>
              <v-text-field
                label="Nombre URI"
                color="blueMinsal"
                v-model="rutaForm.nombre_uri"
              ></v-text-field>
              <v-text-field
                label="Icono"
                :append-icon="rutaForm.icono"
                color="blueMinsal"
                v-model="rutaForm.icono"
              ></v-text-field>
              <v-text-field
                label="Orden"
                color="blueMinsal"
                v-model="rutaForm.orden"
              ></v-text-field>
              <v-checkbox
                label="Mostrar"
                v-model="rutaForm.mostrar"
                class="d-inline-flex"
                color="blueMinsal"
              ></v-checkbox>
              <v-checkbox
                label="Publico"
                v-model="rutaForm.publico"
                class="d-inline-flex ml-2"
                color="blueMinsal"
              ></v-checkbox>
              <v-checkbox
                label="Admin"
                v-model="rutaForm.admin"
                class="d-inline-flex ml-2"
                color="blueMinsal"
              ></v-checkbox>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-text>
              <v-select
                :items="roles"
                v-model="rolesSelect"
                label="Seleccione roles"
                multiple
                item-text="name"
                item-value="id"
                chips
                color="blueMinsal"
                item-color="blueMinsal"
              ></v-select>
            </v-card-text>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0">
              <v-btn
                color="blueMinsal"
                class="white--text ma-1"
                rounded
                @click="postRuta(true)"
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
                @click="postRuta()"
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
import { mapActions } from 'vuex';
export default {
  name: "rolesCreate",
  data: () => ({
    rutaForm: {
      nombre: null,
      uri: null,
      nombre_uri: null,
      icono: null,
      mostrar: false,
      publico: false,
      orden: null,
      admin:false,
    },
    roles: [],
    rolesSelect: [],
  }),
  methods: {
    ...mapActions('utils',['getMenu']),
    async getRoles() {
      const response = await this.http_client("/api/v1/roles");
      this.roles = response.data;
    },
    async postRuta(navigate = false) {
      if (
        !this.rutaForm.nombre ||
        !this.rutaForm.uri ||
        !this.rutaForm.nombre_uri ||
        !this.rutaForm.icono ||
        this.rolesSelect.length == 0
      ) {
        this.temporalAlert({
          show: true,
          message: "Por favor complete todos los campos",
          type: "warning",
        });
        return;
      }
      const response = await this.http_client(
        "/api/v1/rutas",
        {
          nombre: this.rutaForm.nombre,
          uri: this.rutaForm.uri,
          nombre_uri: this.rutaForm.nombre_uri,
          mostrar: this.rutaForm.mostrar,
          icono: this.rutaForm.icono,
          publico: this.rutaForm.publico,
          admin: this.rutaForm.admin,
          roles: this.rolesSelect,
          orden: this.rutaForm.orden
        },
        "post"
      );
      if (response.status == 201) {
        this.temporalAlert({
          show: true,
          message: "Se ha creado la ruta",
          type: "success",
        });
        this.getMenu();
        this.rutaForm = {
          nombre: null,
          uri: null,
          nombre_uri: null,
          icono: null,
          mostrar: false,
          publico: false,
          admin:false,
          orden: null,
        };
        if (navigate) {
          this.$router.push("/rutas/list");
        }
      }
    },
  },
  async created() {
    await this.getRoles();
  },
};
</script>
