<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fluid>
    <v-flex xs12 sm11 md11 lg10>
      <v-row class="pa-0 ma-0">
        <v-col cols="12" md="6" class="pt-0 px-0 px-sm-2">
          <v-card class="pa-4 pa-sm-8" elevation="3" rounded="lg">
            <p class="text-h5 text-center blueGrayMinsal--text">
              Datos de perfil
            </p>
            <v-row>
              <v-col>
                <p class="subtitle-2">Correo electrónico</p>
                <p class="body-1 grey--text">{{ userInfo.email }}</p>
              </v-col>
            </v-row>
            <v-divider class="mt-4"></v-divider>
            <div class="mt-4">
              <p class="title">Actualizar email</p>
              <v-text-field prepend-icon="mdi-email" name="email" v-model="form_email.email" label="Email " outlined
                            dense @blur="$v.form_email.email.$touch()" :error-messages="emailErrors">
              </v-text-field>
              <div class="text-center">
                <v-btn
                    color="blueMinsal white--text"
                    rounded @click="validateUserByChangeEmail()"
                >
                  <v-icon class="mr-1">mdi-content-save</v-icon>
                  Guardar
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="pb-0 px-0 px-sm-2">
          <v-card class="pa-4 pa-sm-8" elevation="3" rounded="lg">
            <p class="text-h5 text-center blueGrayMinsal--text">
              Actualizar contraseña
            </p>
            <v-form>
              <v-text-field
                  prepend-icon="mdi-lock"
                  name="password"
                  v-model="form_password.password"
                  label="Contraseña Actual"
                  outlined
                  dense
              >
              </v-text-field>
              <v-text-field prepend-icon="mdi-lock" name="newPassword" v-model="form_password.new_password"
                            label="Nueva Contraseña" outlined dense>
              </v-text-field>
              <v-text-field prepend-icon="mdi-lock" name="confirmPassword" v-model="form_password.confirm_password"
                            label="Confirmar Contraseña" outlined dense>
              </v-text-field>
              <v-card-actions class="flex justify-center pa-0">
                <div class="text-center">
                  <v-btn color="blueMinsal white--text" rounded type="submit">
                    <v-icon class="mr-1">mdi-content-save</v-icon>
                    Guardar
                  </v-btn>
                </div>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-flex
    >
    <v-dialog
        v-model="show_change_email"
        scrollable
        max-width="500px"
        transition="dialog-transition"
    >
      <v-card rounded="lg">
        <v-card-title>Ingrese su contraseña</v-card-title>
        <v-card-text class="pt-2 pb-0">
          <v-text-field v-model="form_email.password" @blur="$v.form_email.password.$touch()"
                        :error-messages="passwordByChangeEmailErrors"
                        @keyup.enter="changeEmail()" label="Contraseña actual" outlined dense>
          </v-text-field>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-btn
              rounded
              color="blueMinsal"
              class="white--text"
              @click="changeEmail()"
          >
            <v-icon left>mdi-content-save</v-icon>
            GUARDAR
          </v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import jwtDecode from "jwt-decode";
import {required, email} from "vuelidate/lib/validators";

export default {
  name: "perfil",
  validations: {
    form_email: {
      email: {
        required, email,
      },
      password: {
        required
      }
    },
    form_password: {
      password: {
        required
      },
      new_password: {
        required
      }, confirm_password: {
        required
      }
    }
  },
  data: () => ({
    show_change_email: false,
    loadin_change_email: false,
    form_email: {
      email: null,
      password: null
    },
    form_password: {
      password: null,
      new_password: null,
      confirm_password: null
    }
  }),
  methods: {
    ...mapActions(["getUserDetail"]),
    ...mapMutations(["setUserInfo", "setToken"]),
    async validateUserByChangeEmail() {
      this.$v.form_email.email.$touch()
      if (!this.$v.form_email.email.$invalid)
        this.show_change_email = true
    },
    async changeEmail() {
      this.$v.form_email.$touch()
      if (!this.$v.form_email.$invalid) {
        try {
          this.loadin_change_email = true
          const response = await this.services.auth.changeEmail({
            email: this.form_email.email,
            password: this.form_email.password,
          })
          const {token, refreshToken} = response.data
          this.setUserInfo(jwtDecode(token))
          this.setToken(token)
          localStorage.setItem('token', token)
          localStorage.setItem('refresh_token', refreshToken)
          this.show_change_email = false
          this.$v.form_email.$reset()
        } catch {

        } finally {
          this.loadin_change_email = false
        }
      }

    },
    async changePassword() {
      const response = await this.http_client(
          "/api/v1/users/update/password",
          {
            password_actual: this.password.value,
            password: this.new_password.value,
            confirm_password: this.confirm_password.value,
          },
          "put"
      );
    },
  },
  computed: {
    ...mapState(["userInfo", "userDetail"]),
    emailErrors() {
      const errors = []
      if (!this.$v.form_email.email.$dirty) return errors
      !this.$v.form_email.email.required && errors.push('Correo es obligatorio')
      !this.$v.form_email.email.email && errors.push('Correo no es valido')
      return errors
    },
    passwordByChangeEmailErrors() {
      const errors = []
      if (!this.$v.form_email.password.$dirty) return errors
      !this.$v.form_email.password.required && errors.push('Contraseña es obligatoria')
      return errors
    }
  },
};
</script>

<style scoped></style>
