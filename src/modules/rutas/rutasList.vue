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
                @keypress.enter="filtrarRutas()"
              >
              </v-text-field>
              <v-select
                outlined
                dense
                :label="filtro_disponible.nombre"
                :items="
                  filtro_disponible.options ? filtro_disponible.options : []
                "
                :item-text="filtro_disponible.textfield"
                :item-value="filtro_disponible.valuefield"
                v-show="true"
                :multiple="filtro_disponible.multiple"
                v-model="filtro_disponible.value"
                v-else-if="filtro_disponible.tipo == 'select'"
              ></v-select>
            </v-col>
          </v-slide-x-transition>
          <v-slide-y-transition>
            <v-btn
              color="blueMinsal"
              v-show="filtros_seleccionados.length > 0"
              @click="filtrarRutas()"
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
            :items="rutas"
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
            v-if="rutas.length > 0"
          >
            <template v-slot:[`item.mostrar`]="{ item }">
              <v-chip
                class="ma-2 white--text"
                color="blueMinsal"
                small
                v-if="item.mostrar"
              >
                Si
              </v-chip>
              <v-chip
                class="ma-2 white--text"
                color="red darken-1"
                v-else
                small
              >
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
              <v-chip
                class="ma-2 white--text"
                color="blueMinsal"
                small
                v-if="item.publico"
              >
                Si
              </v-chip>
              <v-chip
                class="ma-2 white--text"
                color="red darken-1"
                v-else
                small
              >
                No
              </v-chip>
            </template>
            <template v-slot:[`item.admin`]="{ item }">
              <v-chip
                class="ma-2 white--text"
                color="blueMinsal"
                small
                v-if="item.admin"
              >
                Si
              </v-chip>
              <v-chip
                class="ma-2 white--text"
                color="red darken-1"
                v-else
                small
              >
                No
              </v-chip>
            </template>
            <template v-slot:[`item.accion`]="{ item }">
              <v-btn icon small @click="showRutaData(item)"
                ><v-icon>mdi-eye</v-icon></v-btn
              >
              <v-btn icon small @click="editingRuta(item)"
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
                        @click="deleteRutas()"
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
      v-model="rutaModal"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card rounded="lg" max-height="700px">
        <v-card-title primary-title>
          Detalle:
        </v-card-title>
        <v-card-text>
          <p>
            <span class="font-weight-bold">Nombre: </span>
            {{ rutaData ? rutaData.nombre : null }}
          </p>
          <p>
            <span class="font-weight-bold">Nombre URI: </span>
            {{ rutaData ? rutaData.nombre_uri : null }}
          </p>
          <p>
            <span class="font-weight-bold">URI: </span>
            {{ rutaData ? rutaData.uri : null }}
          </p>
          <p>
            <span class="font-weight-bold">Icono: </span>
            {{ rutaData ? rutaData.icono : null }}
          </p>
          <p>
            <span class="font-weight-bold">Mostrar: </span>
            <v-chip
              class="ma-2 white--text"
              color="blueMinsal"
              small
              v-if="rutaData ? rutaData.mostrar : false"
            >
              Si
            </v-chip>
            <v-chip class="ma-2 white--text" color="red darken-1" v-else small>
              No
            </v-chip>
          </p>
          <p>
            <span class="font-weight-bold">Público: </span>
            <v-chip
              class="ma-2 white--text"
              color="blueMinsal"
              small
              v-if="rutaData ? rutaData.publico : false"
            >
              Si
            </v-chip>
            <v-chip class="ma-2 white--text" color="red darken-1" v-else small>
              No
            </v-chip>
          </p>
          <p> <span class="font-weight-bold">Roles: </span>
            <ul>
              <li v-for="(rol,i) in rutaData ? rutaData.mnt_rols : []" :key="i">{{rol.name}}</li>
            </ul>
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    rutas: [],
    selected: [],
    rutaModal: false,
    loading: false,
    filtros_seleccionados_aux: [],
    filtros_disponibles: [],
    rutaData: null,
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "nombre",
      },
      {
        text: "URI",
        align: "start",
        sortable: false,
        value: "uri",
      },
      {
        text: "Nombre URI",
        align: "start",
        sortable: false,
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
        sortable: false,
        value: "mostrar",
      },
      {
        text: "Publico",
        align: "start",
        sortable: false,
        value: "publico",
      },
      {
        text: "Administrador",
        align: "start",
        sortable: false,
        value: "admin",
      },
      { text: "Accion", value: "accion", sortable: false, width: "100" },
    ],
  }),
  methods: {
    ...mapActions("utils", ["getMenu"]),
    async filtrarRutas() {
      let filtros = {};
      this.filtros_seleccionados.forEach((filtro_selec) => {
        filtros[filtro_selec.filter_name] = filtro_selec.value;
      });
      await this.getRutas(filtros);
    },
    limpiarFiltros() {
      this.filtros_seleccionados_aux.forEach((filtro) => {
        filtro.value = null;
      });
      this.filtros_seleccionados_aux = [];
      this.getRutas();
    },
    async getRutas(filtros = null) {
      try {
        this.loading = true;
        const response = await this.http_client("/api/v1/show/rutas", filtros);
        this.rutas = response.data;
        this.loading = false;
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: e.response.data.message,
          type: "warning",
        });
      }
    },
    editingRuta(item) {
      let roles = [];
      if (item.mnt_rols.length > 0) {
        roles = item.mnt_rols.map((item) => {
          return item.id;
        });
      }
      localStorage.setItem("editingRuta", JSON.stringify({ ...item, roles }));
      this.$router.push(`edit/${item.id}`);
    },
    showRutaData(item) {
      this.rutaModal = true;
      this.rutaData = item;
    },
    async deleteRutas() {
      const rutas = this.selected.map((rol) => {
        return rol.id;
      });
      const response = await this.http_client(
        "/api/v1/rutas",
        { id: rutas },
        "delete"
      );
      this.temporalAlert({
        show: true,
        message: "Se eliminaron las rutas",
        type: "success",
      });
      this.getMenu();
      this.selected = [];
      this.getRutas();
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
          value: null,
          filter_name: "nombre",
        },
        {
          id: 1,
          nombre: "Mostrar",
          tipo: "select",
          multiple: false,
          options: [
            { text: "Si", value: true },
            { text: "No", value: false },
          ],
          value: null,
          textfield: "text",
          valuefield: "value",
          filter_name: "mostrar",
        },
        {
          id: 2,
          nombre: "Publico",
          tipo: "select",
          multiple: false,
          options: [
            { text: "Si", value: true },
            { text: "No", value: false },
          ],
          value: null,
          textfield: "text",
          valuefield: "value",
          filter_name: "publico",
        },
        {
          id: 3,
          nombre: "Admin",
          tipo: "select",
          multiple: false,
          options: [
            { text: "Si", value: true },
            { text: "No", value: false },
          ],
          value: null,
          textfield: "text",
          valuefield: "value",
          filter_name: "admin",
        },
        {
          id: 4,
          nombre: "URI",
          tipo: "text",
          value: null,
          filter_name: "uri",
        },
      ];
    },
    filtros_seleccionados() {
      return this.filtros_seleccionados_aux;
    },
  },
  async created() {
    this.filtros_disponibles = this.filtros;
    await this.getRutas();
  },
};
</script>
