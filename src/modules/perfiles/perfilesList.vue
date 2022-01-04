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
            <v-menu rounded="0" :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  rounded
                  color="blueMinsal"
                  class="white--text ma-1"
                  v-bind="attrs"
                  v-on="on"
                  ><v-icon left>mdi-filter-variant-plus</v-icon>filtros</v-btn
                >
              </template>

              <v-list dense>
                <v-list-item-group
                  v-model="filtros_seleccionados_aux"
                  multiple
                  color="blueMinsal"
                >
                  <v-virtual-scroll
                    :items="filtros_disponibles"
                    :item-height="40"
                    max-height="250"
                    :bench="14"
                    width="200"
                  >
                    <template v-slot="{ item }">
                      <v-list-item :key="item.id" link :value="item">
                        <v-list-item-title>{{ item.nombre }}</v-list-item-title>
                      </v-list-item></template
                    >
                  </v-virtual-scroll>
                </v-list-item-group>
              </v-list>
            </v-menu>
            <v-btn
              rounded
              color="blueMinsal"
              class="white--text ma-1"
              @click="$router.push('create')"
              ><v-icon left>mdi-plus</v-icon>Agregar</v-btn
            >
          </div>
        </v-card-title>
        <v-card-text
          :class="filtros_seleccionados.length > 0 ? 'pt-7' : 'pa-0 pt-2'"
        >
          <v-slide-x-transition group tag="div" class="row">
            <v-col
              cols="12"
              md="4"
              lg="3"
              sm="6"
              xl="2"
              class="py-0"
              v-for="(filtro_disponible, index) in filtros_seleccionados"
              :key="index + 1"
            >
              <v-text-field
                v-if="filtro_disponible.tipo == 'text'"
                dense
                outlined
                color="blueMinsal"
                :label="filtro_disponible.nombre"
                v-model="filtro_disponible.value"
                @keypress.enter="filtrarPerfiles()"
              >
              </v-text-field>
            </v-col>
          </v-slide-x-transition>
          <v-slide-y-transition>
            <v-btn
              color="blueMinsal"
              v-show="filtros_seleccionados.length > 0"
              @click="filtrarPerfiles()"
              rounded
              text
              ><v-icon left>mdi-filter</v-icon>Filtrar</v-btn
            >
          </v-slide-y-transition>
          <v-slide-y-transition>
            <v-btn
              color="red"
              rounded
              text
              v-show="filtros_seleccionados.length > 0"
              @click="limpiarFiltros()"
              ><v-icon left>mdi-filter-off</v-icon>Limpiar</v-btn
            >
          </v-slide-y-transition>
        </v-card-text>
        <v-card-text>
          <v-skeleton-loader v-if="loading == true"></v-skeleton-loader>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="perfiles"
            :single-select="false"
            item-key="id"
            show-select
            class="elevation-0 border-1"
            no-data-text="No hay datos"
            no-results-text="No hay resultados"
            :footer-props="{
              'items-per-page-options': [5, 10, 20],
              'items-per-page-text': 'Filas',
              'page-text': '',
            }"
            v-if="perfiles.length > 0 && loading == false"
            :key="dataTableKey"
          >
            <template v-slot:[`item.accion`]="{ item }">
              <v-btn icon small @click="showPerfilData(item)"
                ><v-icon>mdi-eye</v-icon></v-btn
              >
              <v-btn icon small @click="editingPerfil(item)"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
            </template>
            <template v-slot:[`body.append`]>
              <v-expand-transition>
                <div v-show="selected.length > 0">
                  <tr>
                    <td class="px-2">
                      <v-btn
                        color="blueMinsal"
                        text
                        rounded
                        icon
                        @click="deletePerfiles()"
                        ><v-icon color="red darken-1"
                          >mdi-trash-can</v-icon
                        ></v-btn
                      >
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </div>
              </v-expand-transition>
            </template>
          </v-data-table>
          <v-alert
            color="blueMinsal"
            icon="mdi-information"
            prominent
            text
            v-else
          >
            No se encontraron datos</v-alert
          >
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog
      v-model="perfilModal"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card rounded="lg" max-height="600px">
        <v-card-title primary-title> Detalle: </v-card-title>
        <v-card-text>
          <span class="font-weight-bold">Nombre</span>
          <v-spacer></v-spacer>
          {{ perfilData ? perfilData.nombre : null }}
          <v-spacer></v-spacer>
          <span class="font-weight-bold">Código</span>
          <v-spacer></v-spacer>
          {{ perfilData ? perfilData.codigo : null }}
          <v-spacer></v-spacer>
          <span
            class="font-weight-bold"
            v-if="perfilData ? perfilData.roles.length > 0 : false"
            >Roles</span
          >
          <v-spacer></v-spacer>

          <ul>
            <li
              v-for="(item, i) in perfilData ? perfilData.roles : []"
              :key="i"
            >
              {{ item.nombre }}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    perfiles: [],
    selected: [],
    loading: false,
    filtros_seleccionados_aux: [],
    filtros_disponibles: [],
    perfilModal: false,
    dataTableKey: 0,
    perfilData: null,
    headers: [
      {
        text: "Código",
        align: "start",
        sortable: false,
        value: "codigo",
      },
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "nombre",
      },
      { text: "Accion", value: "accion", sortable: false, width: "100" },
    ],
  }),
  methods: {
    async filtrarPerfiles() {
      let filtros = {};
      this.filtros_seleccionados.forEach((filtro_selec) => {
        filtros[filtro_selec.filter_name] = filtro_selec.value;
      });
      await this.getPerfiles(filtros);
    },
    limpiarFiltros() {
      this.filtros_seleccionados_aux.forEach((filtro) => {
        filtro.value = null;
      });
      this.filtros_seleccionados_aux = [];
      this.getPerfiles();
    },
    async getPerfiles(filtros = null) {
      try {
        this.loading = true;
        const response = await this.http_client("/api/v1/perfiles", filtros);
        this.perfiles = response.data;
        this.loading = false;
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: e.response.data.message,
          type: "warning",
        });
      }
    },
    editingPerfil(item) {
      localStorage.setItem("editingPerfil", JSON.stringify(item));
      this.$router.push(`edit/${item.id}`);
    },
    showPerfilData(item) {
      this.perfilModal = true;
      this.perfilData = item;
    },
    async deletePerfiles() {
      const perfiles = this.selected.map((perfil) => {
        return perfil.id;
      });
      const response = await this.http_client(
        "/api/v1/perfiles",
        { id_perfil: perfiles },
        "delete"
      );
      this.temporalAlert({
        show: true,
        message: "Se eliminaron los perfiles",
        type: "success",
      });
      this.selected = [];
      this.getPerfiles();
    },
  },
  computed: {
    busquedas() {
      return this.filtros_seleccionados.filter((filtro) => {
        return { id: filtro.id, search: filtro.search, value: filtro.value };
      });
    },
    filtros() {
      return [
        {
          id: 0,
          nombre: "Nombre",
          tipo: "text",
          multiple: false,
          value: null,
          filter_name: "nombre",
        },
      ];
    },
    filtros_seleccionados() {
      return this.filtros_seleccionados_aux;
    },
  },
  async mounted() {
    this.filtros_disponibles = this.filtros;
    await this.getPerfiles();
    this.dataTableKey += 1;
  },
};
</script>
