<template>
  <v-app class="bgMinsal">
    <v-main>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md6 lg4 xl3>
            <v-img
              class="mx-auto d-flex mb-2"
              src="../assets/SIS-HAZUL.png"
              max-width="350"
            />
            <v-card class="pa-2 pa-sm-10" rounded="lg" :elevation="5">
              <p class="text-h5 pt-5 text-center blueGrayMinsal--text ma-0">
                Inicie sesión para continuar
              </p>
              <p class=" text-center blueGrayMinsal--text text--lighten-1 ma-0">
                Administrador
              </p>

              <v-form @submit.prevent="login()">
                <v-card-text>
                  <v-text-field
                    append-icon="mdi-account"
                    name="login"
                    label="Usuario / Correo Electronico *"
                    type="text"
                    v-model="user"
                    :rules="userRules"
                    :error="error"
                    :error-messages="error_message"
                  >
                  </v-text-field>
                  <v-text-field
                    append-icon="mdi-eye"
                    id="password"
                    name="password"
                    v-model="password"
                    label="Contraseña *"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="passwordRules"
                    :error="error"
                    :error-messages="error_message"
                  >
                    <template #append>
                      <v-icon
                        v-if="!showPassword"
                        @click="showPassword = !showPassword"
                        :color="error ? 'red' : ''"
                        >mdi-eye</v-icon
                      >
                      <v-icon
                        v-else
                        @click="showPassword = !showPassword"
                        :color="error ? 'red' : ''"
                        >mdi-eye-off</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-card-text>
                <v-card-text class="text-center justify-center pa-0">
                  <v-btn
                    color="blueMinsal white--text px-sm-8"
                    rounded
                    type="submit"
                    @click="login()"
                    :loading="disabled"
                    >iniciar sesión</v-btn
                  >

                  <v-btn
                    text
                    style="text-transform: none"
                    color="blueMinsal"
                    class="mt-2 mx-auto"
                    rounded
                    to="/recuperar-password"
                    >Olvidaste tu contraseña?</v-btn
                  >
                </v-card-text>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-spacer class="my-10"></v-spacer>
  </v-app>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import jwtDecode from "jwt-decode";

export default {
  name: "login",
  data: () => ({
    error: false,
    error_message: null,
    isValid: false,
    user: null,
    userRules: [(v) => (v !== null && v !== "") || "usuario no valido"],
    password: null,
    passwordRules: [(v) => (v !== null && v !== "") || "password no valida"],
    showPassword: false,
    disabled: false,
  }),
  methods: {
    ...mapMutations(["setToken", "setUserInfo"]),
    ...mapActions("utils", ["clearMenu"]),
    async login() {
      if (!this.user || !this.password) {
        return;
      }
      this.disabled = true;
      try {
        let data = {
          username: this.user,
          password: this.password,
        };
        this.clearMenu();
        let response = await this.http_client("/api/login_check", data, "post");
        if (response.status === 200) {
          this.error = false;
          this.error_message = null;
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          this.setToken(response.data.token);
          this.setUserInfo(jwtDecode(response.data.token));
          this.$router.push("/").catch();
        }
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: e.response.data.message,
          type: "error",
        });
        if (e.response && e.response.status === 401) {
          this.error = true;
          this.error_message = e.response.data.message;
        }
      } finally {
        this.disabled = false;
      }
    },
    showAlert(message) {
      console.log(message);
      this.alert.show = true;
      this.alert.message = message;
      this.alert.type = "success";
      setTimeout(() => {
        this.ocultarAlert();
      }, 2000);
    },
    ocultarAlert() {
      this.alert.show = !this.alert.show;
    },
  },
};
</script>

<style scoped></style>
