<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md11 lg10>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Rutas
          <v-btn
            color="blueMinsal"
            rounded
            class="white--text"
            @click="$router.push('create')"
            ><v-icon left>mdi-plus</v-icon> Agregar</v-btn
          >
        </v-card-title>
        <v-card-text>
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
export default {
  data: () => ({
    rutas: [],
    selected: [],
    rutaModal: false,
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
    async getRutas() {
      const response = await this.http_client("/api/v1/show/rutas");
      this.rutas = response.data;
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
      this.selected = [];
      this.getRutas();
    },
  },
  async created() {
    await this.getRutas();
  },
};
</script>
