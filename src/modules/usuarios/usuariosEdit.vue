<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Usuarios
          <v-icon color="blueGrayMinsal">mdi-pencil</v-icon>
        </v-card-title>
        <v-tabs
          v-model="tab"
          :vertical="$vuetify.breakpoint.xs"
          color="blueMinsal"
          :grow="$vuetify.breakpoint.xs"
        >
          <v-tab key="tab1"> Usuario </v-tab>
          <v-tab key="tab2"> Seguridad </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card-text>
              <v-text-field
                label="Correo"
                type="search"
                autocomplete="username"
                color="blueMinsal"
                v-model="usuario.email"
                :rules="userRules"
              ></v-text-field>
              <v-text-field
                label="Contraseña"
                color="blueMinsal"
                type="text"
                autocomplete="new-password"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
              <v-checkbox
                label="Deshabilitado"
                color="blueMinsal"
                v-model="usuario.is_suspended"
              ></v-checkbox>
            </v-card-text>
          </v-tab-item>
          <v-tab-item>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <span class="blueGrayMinsal--text body-1">Perfiles</span>
                  <v-select
                    :items="perfiles"
                    v-model="perfilesSelect"
                    label="Seleccione perfiles"
                    multiple
                    item-text="nombre"
                    item-value="id"
                    chips
                    color="blueMinsal"
                    item-color="blueMinsal"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <span class="blueGrayMinsal--text body-1">Roles</span>
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
                </v-col>
              </v-row>
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>
        <v-card-actions>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0">
              <v-btn
                color="blueMinsal"
                class="white--text ma-1"
                rounded
                @click="editUsuario()"
                :small="$vuetify.breakpoint.xs"
              >
                <v-icon left>mdi-content-save</v-icon>
                Editar y regresar al listado</v-btn
              >
             
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card></v-flex
    ></v-container
  >
</template>
<script>
export default {
  name: "perfilesEdit",
  data: () => ({
    usuario: { email: null, is_suspended: null, roles: [], perfiles: [] },
    password: null,
    editingUsuario: null,
    perfiles: [],
    perfilesSelect: [],
    rolesSelect: [],
    roles: [],
    tab: null,
  }),
  methods: {
    async getRoles() {
      const response = await this.http_client("/api/v1/roles");
      this.roles = response.data;
    },
    async getPerfiles() {
      const response = await this.http_client("/api/v1/perfiles");
      this.perfiles = response.data;
    },
    async deleteUsuarioRoles(id_usuario) {
      const response = await this.http_client(
        `/api/v1/users/${id_usuario}/roles`,
        {},
        "delete"
      );
    },
    async addUsuarioRoles(id_usuario, roles) {
      const response = await this.http_client(
        `/api/v1/users/${id_usuario}/roles`,
        { roles },
        "post"
      );
    },
    async deleteUsuarioPerfiles(id_usuario) {
      const response = await this.http_client(
        `/api/v1/users/${id_usuario}/perfiles`,
        {},
        "delete"
      );
    },
    async addUsuarioPerfiles(id_usuario, perfiles) {
      const response = await this.http_client(
        `/api/v1/users/${id_usuario}/perfiles`,
        { perfiles },
        "post"
      );
    },
    async putUsuario(id_usuario, data) {
      const response = await this.http_client(
        `/api/v1/users/${id_usuario}`,
        data,
        "put"
      );
    },
    async editUsuario() {
      try {
        this.showLoader();
        const id_usuario = this.$route.params.id;
        if (!this.usuario || this.perfilesSelect.length == 0) {
          this.temporalAlert({
            show: true,
            message: "Por favor complete todos los campos",
            type: "warning",
          });
          return;
        }
        var oldUsuario = this.editingUsuario;
        var newUsuario = this.usuario;
        const rolesHaveChanged =
          JSON.stringify(oldUsuario.roles) != JSON.stringify(this.rolesSelect);
        const perfilesHaveChanged =
          JSON.stringify(oldUsuario.perfiles) !=
          JSON.stringify(this.perfilesSelect);
        const canDeleteRoles = oldUsuario.roles.length > 0;
        const canDeletePerfiles = oldUsuario.perfiles.length > 0;
        const canPostRoles = this.rolesSelect.length > 0;
        const canPostPerfiles = this.perfilesSelect.length > 0;
        delete oldUsuario.roles;
        delete newUsuario.roles;
        delete oldUsuario.perfiles;
        delete newUsuario.perfiles;
        const usuarioHasChanged = !this.objectsEqual(oldUsuario, newUsuario);
        if (rolesHaveChanged) {
          if (canDeleteRoles) {
            await this.deleteUsuarioRoles(id_usuario);
          }
          if (canPostRoles) {
            await this.addUsuarioRoles(id_usuario, this.rolesSelect);
          }
        }
        if (perfilesHaveChanged) {
          if (canDeletePerfiles) {
            await this.deleteUsuarioPerfiles(id_usuario);
          }
          if (canPostPerfiles) {
            await this.addUsuarioPerfiles(id_usuario, this.perfilesSelect);
          }
        }
        if (usuarioHasChanged) {
          let usuario = {
            email: this.usuario.email,
            password: this.password,
            is_suspended: this.usuario.is_suspended,
          };
          // if (!usuario.password) {
          //   delete usuario.password
          // }
          await this.putUsuario(id_usuario, usuario);
        }
        this.temporalAlert({
          show: true,
          message: "Se actualizó el usuario",
          type: "success",
        });
        this.$router.push("/usuarios/list");
        localStorage.removeItem("editingUsuario");
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: e.response.data.message,
          type: "error",
        });
      } finally {
        this.hideLoader();
      }
    },
    async deleteUsuario() {
      const id_usuario = this.$route.params.id;
      const response = await this.http_client(
        `/api/v1/users/${id_usuario}`,
        {},
        "delete"
      );
      if (response?.status === 200) {
        this.temporalAlert({
          show: true,
          message: "Se deshabilitó el usuario",
          type: "success",
        });
      }
      this.$router.push("/usuarios/list");
      localStorage.removeItem("editingUsuario");
    },
  },
  computed: {
    userRules() {
      return [
        (v) => (v !== null && v !== "") || "Este campo es obligatorio",
        (v) => this.isEmail(v) || "El correo electrónico no es válido",
      ];
    },
    passwordRules() {
      return [
        (v) =>
          this.isPassword(v) ||
          "La contraseña debe tener al menos 1 minuscula, 1 mayuscula, 1 caracter especial, 1 numero y minimo 8 caracteres",
      ];
    },
  },
  async created() {
    this.editingUsuario = JSON.parse(localStorage.getItem("editingUsuario"));
    if (this.editingUsuario) {
      if (this.editingUsuario.id == this.$route.params.id) {
        await this.getRoles();
        await this.getPerfiles();
        this.usuario = JSON.parse(localStorage.getItem("editingUsuario"));
        if (this.editingUsuario.roles.length > 0) {
          this.rolesSelect = JSON.parse(
            localStorage.getItem("editingUsuario")
          ).roles;
        }
        if (this.editingUsuario.perfiles.length > 0) {
          this.perfilesSelect = JSON.parse(
            localStorage.getItem("editingUsuario")
          ).perfiles;
        }
      } else {
        this.$router.push("/usuarios/list");
      }
    } else {
      this.$router.push("/usuarios/list");
    }
  },
};
</script>
