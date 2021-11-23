<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Roles
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
            :items="roles"
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
            v-if="roles.length > 0"
          >
            <template v-slot:[`item.accion`]="{ item }">
              <v-btn icon small @click="showRolData(item)"
                ><v-icon>mdi-eye</v-icon></v-btn
              >
              <v-btn icon small @click="editingRole(item)"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
            </template>
            <template v-slot:[`body.append`]>
              <v-expand-transition>
                  <div v-show="selected.length > 0" >
                      <tr  >
                        <td class="px-2">
                          <v-btn
                            color="blueMinsal"
                            text
                            rounded
                            icon
                            @click="deleteRoles()"
                            
                            ><v-icon color="red darken-1">mdi-trash-can</v-icon></v-btn
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
      v-model="rolModal"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card rounded="lg">
        <v-card-title primary-title>
          Detalle:
        </v-card-title>
        <v-card-text>
          <span class="font-weight-bold">Nombre</span>
          <v-spacer></v-spacer>
          {{ rolData ? rolData.name : null }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    roles: [],
    selected: [],
    rolModal: false,
    rolData: null,
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Accion", value: "accion", sortable: false, width: "100" },
    ],
  }),
  methods: {
    async getRoles() {
      const response = await this.http_client("/api/v1/roles");
      this.roles = response.data;
    },
    editingRole(item) {
      localStorage.setItem("editingRole", JSON.stringify(item));
      this.$router.push(`edit/${item.id}`);
    },
    showRolData(item) {
      this.rolModal = true;
      this.rolData = item;
    },
    async deleteRoles() {
      const roles = this.selected.map((rol) => {
        return rol.id;
      });
      const response = await this.http_client("/api/v1/roles", { id: roles },'delete');
      this.temporalAlert({
        show: true,
        message: "Se eliminaron los roles",
        type: "success",
      });
      this.selected = []
      this.getRoles();
    },
  },
  async created() {
    await this.getRoles();
  },
};
</script>
