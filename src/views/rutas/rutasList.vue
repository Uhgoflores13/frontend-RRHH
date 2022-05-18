<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md11 lg10>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
            primary-title
            class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Rutas
          <div>
            <v-btn
                rounded
                color="blueMinsal"
                class="white--text ma-1"
                @click="$router.push({name:'rutasCreate'})"
            >
              <v-icon left>mdi-plus</v-icon>
              Agregar
            </v-btn
            >
          </div>
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader v-if="loading"></v-skeleton-loader>
          <v-data-table
              :headers="headers"
              :items="rutas"
              item-key="id"
              class="elevation-0 border-1"
              no-data-text="No hay datos"
              no-results-text="No hay resultados"
              :footer-props="{
              'items-per-page-options': [5, 10, 20],
              'items-per-page-text': 'Filas',
              'page-text': '',
            }"
              v-else
          >
            <template v-slot:[`item.mostrar`]="{ item }">
              <v-chip class="ma-2 white--text" color="blueMinsal" small v-if="item.mostrar">
                Si
              </v-chip>
              <v-chip class="ma-2 white--text" color="red darken-1" v-else small>
                No
              </v-chip>
            </template>
            <template v-slot:[`item.icono`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-on="on" v-bind="attrs">{{ item.icono }}</v-icon>
                </template>
                {{ item.icono }}
              </v-tooltip>
            </template>
            <template v-slot:[`item.publico`]="{ item }">
              <v-chip class="ma-2 white--text" color="blueMinsal" small v-if="item.publico">
                Si
              </v-chip>
              <v-chip class="ma-2 white--text" color="red darken-1" v-else small>
                No
              </v-chip>
            </template>
            <template v-slot:[`item.admin`]="{ item }">
              <v-chip class="ma-2 white--text" color="blueMinsal" small v-if="item.admin">
                Si
              </v-chip>
              <v-chip class="ma-2 white--text" color="red darken-1" v-else small>
                No
              </v-chip>
            </template>
            <template v-slot:[`item.accion`]="{ item }">
              <v-btn icon small :to="{name:'rutasEdit', params:{id:item.id}}">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
import {mapActions} from "vuex";

export default {
  data: () => ({
    rutas: [],
    rutaModal: false,
    loading: false,
    headers: [
      {
        text: "Nombre",
        align: "start",
        value: "nombre",
      },
      {
        text: "URI",
        align: "start",
        value: "uri",
      },
      {
        text: "Nombre URI",
        align: "start",
        value: "nombre_uri",
      },
      {
        text: "Icono",
        align: "start",
        sortable: false,
        value: "icono",
      },
      {
        text: "Mostrar",
        align: "start",
        value: "mostrar",
      },
      {
        text: "Publico",
        align: "start",
        value: "publico",
      },
      {
        text: "Administrador",
        align: "start",
        value: "admin",
      },
      {text: "Accion", value: "accion", sortable: false, width: "100"},
    ],
  }),
  methods: {
    ...mapActions("utils", ["getMenu"]),
    async getPaths() {
      this.loading = true;
      const response = await this.services.paths.getPaths()
      this.rutas = response.data;
      this.loading = false;
    },
    async deleteRutas(idPath) {

    },
  },
  computed: {},
  async created() {
    this.getPaths()
  },
};
</script>
