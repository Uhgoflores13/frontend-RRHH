<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-2 pa-sm-4" rounded="lg">
        <v-card-title
            primary-title
            class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Rutas
        </v-card-title>
        <v-row>
          <v-col cols="12" md="6">
            <v-card-text>
              <v-text-field
                  label="Nombre"
                  color="blueMinsal"
                  v-model="form.nombre"
              ></v-text-field>
              <v-text-field
                  label="URI"
                  color="blueMinsal"
                  v-model="form.uri"
              ></v-text-field>
              <v-text-field
                  label="Nombre URI"
                  color="blueMinsal"
                  v-model="form.nombre_uri"
              ></v-text-field>
              <v-text-field
                  label="Icono"
                  :append-icon="form.icono"
                  color="blueMinsal"
                  v-model="form.icono"
              ></v-text-field>
              <v-text-field
                  label="Orden"
                  color="blueMinsal"
                  v-model="form.orden"
              ></v-text-field>
              <v-checkbox
                  label="Mostrar"
                  v-model="form.mostrar"
                  class="d-inline-flex"
                  color="blueMinsal"
              ></v-checkbox>
              <v-checkbox
                  label="Publico"
                  v-model="form.publico"
                  class="d-inline-flex ml-2"
                  color="blueMinsal"
              ></v-checkbox>
              <v-checkbox
                  label="Admin"
                  v-model="form.admin"
                  class="d-inline-flex ml-2"
                  color="blueMinsal"
              ></v-checkbox>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-text>
              <v-select
                  :items="roles"
                  v-model="form.roles"
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
                  @click="savePath(true)"
                  :small="$vuetify.breakpoint.xs"
              >
                <v-icon left>mdi-content-save</v-icon>
                Crear y regresar al listado
              </v-btn
              >
              <v-btn
                  color="blueMinsal"
                  class="white--text ma-1"
                  :small="$vuetify.breakpoint.xs"
                  rounded
                  @click="savePath()"
              >
                <v-icon left>mdi-content-save-all</v-icon>
                Crear y agregar otro
              </v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-flex
    >
  </v-container
  >
</template>
<script>
import {mapActions} from "vuex";
import paths from "../../services/path.services";

export default {
  name: "formPath",
  data: () => ({
    form: {
      nombre: null,
      uri: null,
      nombre_uri: null,
      icono: null,
      mostrar: false,
      publico: false,
      orden: null,
      admin: false,
      roles: []
    },
    roles: [],
  }),
  methods: {
    ...mapActions("utils", ["getMenu"]),
    async getRoles() {
      const response = await this.services.paths.getPaths()
      this.roles = response.data;
    },
    async savePath(navigate = false) {

    },
  },
  async created() {
    await this.getRoles();
  },
};
</script>
