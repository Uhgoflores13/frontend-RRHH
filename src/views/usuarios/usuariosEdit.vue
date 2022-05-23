<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
            primary-title
            class="d-flex justify-space-between blueGrayMinsal--text"
        >
          Usuarios
        </v-card-title>

        <v-card-text>
          <v-text-field
              label="Correo"
              type="search" :error-messages="emailErrors" @blur="$v.usuario.email.$touch()"
              autocomplete="username"
              color="blueMinsal"
              v-model="usuario.email"
          ></v-text-field>
          <v-row>
            <v-col>
              <app-search-list :error-messages="perfilesErrors" placeholder="Buscar Perfiles"
                               item-text="nombre"
                               item-value="id"
                               :items="perfiles" v-model="usuario.perfiles">
              </app-search-list>
            </v-col>
            <v-col cols="12" md="6">
              <app-search-list :error-messages="rolesErrors" placeholder="Buscar Perfiles"
                               item-text="name" item-value="id"
                               :items="roles" v-model="usuario.roles">
              </app-search-list>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0">
              <v-btn
                  color="blueMinsal"
                  class="white--text ma-1"
                  rounded
                  @click="saveUser()"
                  :small="$vuetify.breakpoint.xs"
              >
                <v-icon left>mdi-content-save</v-icon>
                Editar y regresar al listado
              </v-btn
              >

            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-flex
    >
  </v-container
  >
</template>
<script>
import AppSearchList from "../../components/AppSearchList";
import {mapMutations} from "vuex";
import {email, required, minLength, sameAs, requiredIf} from "vuelidate/lib/validators";


export default {
  name: "perfilesEdit",
  components: {
    AppSearchList
  },
  validations: {
    usuario: {
      email: {required, email},
      perfiles: {
        required: requiredIf(function () {
          return this.usuario.roles.length === 0
        })
      },
      roles: {
        required: requiredIf(function () {
          return this.usuario.perfiles.length === 0
        })
      }
    }

  },
  data: () => ({
    usuario: {email: null, roles: [], perfiles: []},
    perfiles: [],
    roles: []
  }),
  methods: {
    ...mapMutations('utils', ["setLoader"]),
    async getRoles() {
      const response = await this.services.roles.getRoles()
      this.roles = response.data
    },
    async getProfiles() {
      const response = await this.services.profiles.getProfiles()
      this.perfiles = response.data
    },
    async getUser() {
      const response = await this.services.users.showUser(this.$route.params.id)
      const {data} = response
      data.roles = data.roles.map(rol => rol.id)
      data.perfiles = data.perfiles.map(profile => profile.id)
      this.usuario = data
    },
    async saveUser() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          await this.setLoader(true)
          await this.services.users.updateUser(this.$route.params.id, {
            email: this.usuario.email,
            roles: this.usuario.roles,
            perfiles: this.usuario.perfiles
          })
          this.temporalAlert({
            show: true,
            message: "Se ha actualizado el usuario",
            type: "success",
          });
          await this.$router.push({
            name: 'usuariosList'
          })
        } catch (e) {
        } finally {
          await this.setLoader(false)
        }
      }
    }
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.usuario.email.$dirty) return errors
      !this.$v.usuario.email.required && errors.push('Correo es obligatorio')
      !this.$v.usuario.email.email && errors.push('El correo no es valido')
      return errors
    },
    perfilesErrors() {
      const errors = []
      if (!this.$v.usuario.perfiles.$dirty) return errors
      !this.$v.usuario.perfiles.required && errors.push('Perfil son requeridos si no hay roles')
      return errors
    }, rolesErrors() {
      const errors = []
      if (!this.$v.usuario.roles.$dirty) return errors
      !this.$v.usuario.roles.required && errors.push('Roles son requeridos si no hay perfiles')
      return errors
    },
  },
  async created() {
    try {
      await this.setLoader(true)
      await Promise.all([this.getUser(), this.getRoles(), this.getProfiles()])
    } catch {
    } finally {
      await this.setLoader(false)
    }
  },
};
</script>
