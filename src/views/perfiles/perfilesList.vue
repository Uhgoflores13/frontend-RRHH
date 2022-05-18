<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
            primary-title
            class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Perfiles
          <div>
            <v-btn
                rounded
                color="blueMinsal"
                class="white--text ma-1"
                @click="$router.push('create')"
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
              :items="perfiles"
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
            <template v-slot:[`item.accion`]="{ item }">
              <v-btn icon small :to="{name:'perfilesEdit', params:{id:item.id}}">
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
import {mapMutations} from "vuex";

export default {
  data: () => ({
    perfiles: [],
    loading: false,
    headers: [
      {
        text: "Código",
        align: "start",
        value: "codigo",
      },
      {
        text: "Nombre",
        align: "start",
        value: "nombre",
      },
      {text: "Accion", value: "accion", sortable: false, width: "100"},
    ],
  }),
  methods: {
    ...mapMutations('utils', ['setLoader']),
    async getPerfiles() {
      this.loading = true;
      const response = await this.services.profiles.getProfiles();
      this.perfiles = response.data;
      this.loading = false;
    },
  },
  computed: {},
  async created() {
    await this.getPerfiles();
  },
};
</script>
