<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-2 pa-sm-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Usuarios
          <v-icon color="blueGrayMinsal">mdi-plus</v-icon>
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
                v-model="usuario"
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
              <v-text-field
                label="Numero de DUI"
                color="blueMinsal"
                v-model="dui"
                v-mask="'########-#'"
                :rules="[
                  (v) =>
                    (v !== null && v !== '') || 'Este campo es obligatorio',
                ]"
              ></v-text-field>
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
                @click="postUsuario(true)"
                :small="$vuetify.breakpoint.xs"
              >
                <v-icon left>mdi-content-save</v-icon>
                Crear y regresar al listado</v-btn
              >
              <v-btn
                color="blueMinsal"
                class="white--text ma-1"
                :small="$vuetify.breakpoint.xs"
                rounded
                @click="postUsuario()"
              >
                <v-icon left>mdi-content-save-all</v-icon>
                Crear y agregar otro</v-btn
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
  name: "usuariosCreate",
  data: () => ({
    usuario: null,
    perfiles: [],
    perfilesSelect: [],
    rolesSelect: [],
    roles: [],
    dui: null,
    tab: null,
    password: null,
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
    async postUsuario(navigate = false) {
      if (!this.dui || !this.usuario || !this.password) {
        this.temporalAlert({
          show: true,
          message: "Por favor complete los campos del usuario",
          type: "warning",
        });
        return;
      }
      if (this.perfilesSelect.length == 0 && this.rolesSelect.length == 0) {
        this.temporalAlert({
          show: true,
          message: "Debe seleccionar por lo menos un perfil o un rol",
          type: "warning",
        });
        return;
      }
      try {
        const response = await this.http_client(
          "/api/v1/usuarios",
          {
            email: this.usuario.trim(),
            password: this.password.trim(),
            confirm_password: this.password.trim(),
            roles: this.rolesSelect,
            perfiles: this.perfilesSelect,
            dui: this.dui,
          },
          "post"
        );
        this.temporalAlert({
          show: true,
          message: "Se ha creado el usuario",
          type: "success",
        });
        this.usuario = null;
        this.password = null;
        if (navigate) {
          this.$router.push("/usuarios/list");
        }
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: e.response.data.message,
          type: "error",
        });
      }
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
        (v) => (v !== null && v !== "") || "Este campo es requerido",
        (v) =>
          this.isPassword(v) ||
          "La contraseña debe tener al menos 1 minuscula, 1 mayuscula, 1 caracter especial, 1 numero y minimo 8 caracteres",
      ];
    },
  },
  async created() {
    await this.getRoles();
    await this.getPerfiles();
  },
};
</script>
