<template>
  <v-app>
    <v-main class="grey lighten-3">
      <v-container fluid fill-height>

        <v-layout align-center justify-center>

          <v-flex xs12 sm8 md5 lg3>

            <div class="d-flex justify-center align-center mb-2">
              <img src="../assets/minsal.svg" alt="" width="400px">
            </div>
            <v-card class="elevation-3 pa-10">
              <v-form @submit.prevent="login()" v-model="isValid">
                <v-card-text>

                  <v-text-field
                      prepend-icon="mdi-account"
                      name="login"
                      label="Login"
                      type="text"
                      v-model="user"
                      :rules="userRules"
                      outlined
                      dense
                  >
                  </v-text-field>
                  <v-text-field
                      id="password"
                      prepend-icon="mdi-lock"
                      name="password"
                      v-model="password"
                      label="Password"
                      :type="showPassword?'text':'password'"
                      :rules="passwordRules"
                      :error="error"
                      :error-messages="error_message"
                      outlined
                      dense
                  >
                    <template #append>
                      <v-icon v-if="!showPassword" @click="showPassword=!showPassword">mdi-eye-outline</v-icon>
                      <v-icon v-else @click="showPassword=!showPassword">mdi-eye-off-outline</v-icon>
                    </template>
                  </v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" elevation="" type="submit" :loading="disabled">Entrar</v-btn>
                  <v-spacer></v-spacer>
                  <router-link to="/recuperar-password">¿Olvidaste la contraseña?</router-link>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapMutations} from 'vuex'
import jwtDecode from "jwt-decode"

export default {
  name: "login",
  data: () => ({
    error:false,
    error_message:null,
    isValid: false,
    user: null,
    userRules: [
      v => (v !== null && v !== '') || 'usuario no valido'
    ],
    password: null,
    passwordRules: [
      v => (v !== null && v !== '') || 'password no valida'
    ],
    showPassword: false,
    disabled: false
  }),
  methods: {
    ...mapMutations(['setToken', 'setUserInfo']),
    async login() {
      if (this.isValid) {
        this.disabled = true
        try {
          let data = {
            username: this.user,
            password: this.password
          };
          let response = await this.http_client('/api/login_check', data, 'post')
          if (response.status === 200) {
            this.error=false
            this.error_message=null
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            this.setToken(response.data.token)
            this.setUserInfo(jwtDecode(response.data.token))
            this.$router.push('/').catch()
          }
        } catch (e) {
          if (e.response && e.response.status === 401) {
            this.error=true
            this.error_message=e.response.data.message
          }
        } finally {
          this.disabled = false
        }
      }
    },
    showAlert(message) {
      console.log(message)
      this.alert.show = true
      this.alert.message = message
      this.alert.type='success'
      setTimeout(() => {
        this.ocultarAlert()
      }, 2000)
    },
    ocultarAlert() {
      this.alert.show = !this.alert.show
    },

  }
}
</script>

<style scoped>

</style>