<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Perfiles
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
            v-if="perfiles.length > 0"
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
        <v-card-title primary-title>
          Detalle:
        </v-card-title>
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
    async getPerfiles() {
      const response = await this.http_client("/api/v1/perfiles");
      this.perfiles = response.data;
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
  async mounted() {
    await this.getPerfiles();
    this.dataTableKey += 1;
  },
};
</script>
