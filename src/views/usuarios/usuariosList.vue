<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Usuarios
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
            :items="usuarios"
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
            v-if="usuarios.length > 0"
          >
            <template v-slot:[`item.last_login`]="{ item }">
              {{ item.last_login | moment("DD/MM/YYYY") }}
            </template>
            <template v-slot:[`item.is_suspended`]="{ item }">
              <v-chip
                class="ma-2 white--text"
                color="blueMinsal"
                small
                v-if="item.is_suspended"
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
              <v-btn icon small @click="showUsuarioData(item)"
                ><v-icon>mdi-eye</v-icon></v-btn
              >
              <v-btn icon small @click="editingUsuario(item)"
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
                        @click="deleteUsuarios()"
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
      v-model="usuarioModal"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card rounded="lg" max-height="700px">
        <v-card-title primary-title>
          Detalle:
        </v-card-title>
        <v-card-text>
          <span class="font-weight-bold">Correo electrónico</span>
          <v-spacer></v-spacer>
          {{ usuarioData ? usuarioData.email : null }}
          <v-spacer></v-spacer>
          <span class="font-weight-bold">Deshabilitado</span>
          <v-spacer></v-spacer>
          <v-chip
            class="ma-2 white--text"
            color="blueMinsal"
            small
            v-if="usuarioData ? usuarioData.is_suspended : false"
          >
            Si
          </v-chip>
          <v-chip class="ma-2 white--text" color="red" v-else small>
            No
          </v-chip>
          <v-spacer></v-spacer>
          <span
            class="font-weight-bold"
            v-if="usuarioData ? usuarioData.last_login : false"
            >Ultima conexión</span
          >
          <v-spacer></v-spacer>
          {{
            usuarioData
              ? usuarioData.last_login
              : "2000-01-01" | moment("DD/MM/YYYY")
          }}
          <v-spacer></v-spacer>
          <span class="font-weight-bold">Roles</span>
          <ul>
            <li
              v-for="(rol, i) in usuarioData ? usuarioData.mnt_rols : []"
              :key="i"
            >
              {{ rol.name }}
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
    usuarios: [],
    selected: [],
    usuarioModal: false,
    usuarioData: null,
    headers: [
      {
        text: "Correo electrónico",
        align: "start",
        sortable: false,
        value: "email",
      },
      {
        text: "Ultima conexión",
        align: "start",
        sortable: false,
        value: "last_login",
      },
      {
        text: "Deshabilitado",
        align: "start",
        sortable: false,
        value: "is_suspended",
      },
      { text: "Accion", value: "accion", sortable: false, width: "100" },
    ],
  }),
  methods: {
    async getUsuarios() {
      const response = await this.http_client("/api/v1/usuarios");
      this.usuarios = response.data;
    },
    editingUsuario(item) {
      let roles = [];
      let perfiles = [];
      if (item.mnt_rols.length > 0) {
        roles = item.mnt_rols.map((item) => {
          return item.id;
        });
      }
      if (item.mnt_perfils.length > 0) {
        perfiles = item.mnt_perfils.map((item) => {
          return item.id;
        });
      }
      localStorage.setItem(
        "editingUsuario",
        JSON.stringify({
          id: item.id,
          email: item.email,
          is_suspended: item.is_suspended,
          roles,
          perfiles,
        })
      );
      this.$router.push(`edit/${item.id}`);
    },
    showUsuarioData(item) {
      this.usuarioModal = true;
      this.usuarioData = item;
    },
    async deleteUsuarios() {
      const usuarios = this.selected.map((usuario) => {
        return usuario.id;
      });
      const response = await this.http_client(
        "/api/v1/usuarios",
        { id: usuarios },
        "delete"
      );
      this.temporalAlert({
        show: true,
        message: "Se eliminaron los perfiles",
        type: "success",
      });
      this.selected = [];
      this.getUsuarios();
    },
  },
  async mounted() {
    await this.getUsuarios();
  },
};
</script>
