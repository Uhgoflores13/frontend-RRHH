<template>
  <v-app>
    <v-main class="grey lighten-3">
      <v-container fluid fill-height>

        <v-layout align-center justify-center>

          <v-flex xs12 sm10 md7 lg5>
            <v-card class="elevation-3 pa-10 rounded-lg" >
            <div class="d-flex justify-center align-center mb-2">
              <img src="../assets/SIS-HAZUL.png" alt="" width="200px">
            </div>
            <p class="text-h4 text-center secondary_bcen--text my-8"> Ingresa tus datos para iniciar </p>
              <v-form @submit.prevent="login()" v-model="isValid">
                <v-card-text>
                  <v-alert color="error_bcen" type="error" v-if="error">
                    <v-row>
                      <v-col cols="10">
                        {{ error_message }}
                      </v-col>
                    </v-row>
                  </v-alert>
                  <v-text-field
                      name="correo"
                      label="Correo"
                      type="text"
                      v-model="user"
                      :rules="userRules"
                      outlined
                      append-icon="mdi-account"
                      dense
                  >
                  </v-text-field>
                  <v-text-field
                      id="password"
                      append-icon="mdi-eye"
                      name="password"
                      v-model="password"
                      label="Password"
                      :type="showPassword?'text':'password'"
                      :rules="passwordRules"
                      outlined
                      dense
                  >
                    <template #append>
                      <v-icon v-if="!showPassword" @click="showPassword=!showPassword">mdi-eye-outline</v-icon>
                      <v-icon v-else @click="showPassword=!showPassword">mdi-eye-off-outline</v-icon>
                    </template>
                  </v-text-field>
                </v-card-text>
                <div class="text-center">
                  <v-btn class="mb-6 white--text px-16" color="blueMinsal" elevation="" type="submit" :loading="disabled" rounded>Entrar</v-btn>
                  <v-spacer></v-spacer>
                  <router-link to="/recuperar-password">¿Olvidaste la contraseña?</router-link>
                </div>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
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
    ...mapActions('utils',['clearMenu']),
    async login() {
      if (this.isValid) {
        this.disabled = true
        try {
          let data = {
            username: this.user,
            password: this.password
          };
          this.clearMenu()
          let response = await this.http_client('/api/login_check', data, 'post')
          if (response.status === 200) {
            this.error=false
            this.error_message=null;
            console.log(response.data.refresh_token);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            this.setToken(response.data.token)
            this.setUserInfo(jwtDecode(response.data.token))
            this.$router.push('/').catch()
          }
        } catch (e) {
          this.temporalAlert({
            show:true,
            message:e.response.data.message,
            type:'error'
          });
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