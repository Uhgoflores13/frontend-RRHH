<template>
  <v-app>
    <v-main class="grey lighten-2">
      <v-container fill-height justify-center>
        <v-flex lg6>
          <v-card
            class="rounded-lg px-2 px-sm-12 elevation-2"
            v-if="mostrarActualizar == true"
          >
            <v-card-title class="justify-center" primary-title
              >Reestablecer Contraseña</v-card-title
            >
            <v-card-text>
              <v-divider></v-divider>
              <v-row class="mt-6">
                <v-col class="pa-0 ma-0 cols-12">
                  <v-text-field
                    id="new_pass"
                    prepend-icon="mdi-lock"
                    name="new_pass"
                    v-model="new_pass.value"
                    label="Contraseña nueva"
                    :type="new_pass.show ? 'text' : 'password'"
                    :error="new_pass.error"
                    :error-messages="new_pass.error_msg"
                    outlined
                    dense
                  >
                    <template #append>
                      <v-icon
                        v-if="new_pass.show === false"
                        @click="new_pass.show = !new_pass.show"
                        >mdi-eye-outline</v-icon
                      >
                      <v-icon v-else @click="new_pass.show = !new_pass.show"
                        >mdi-eye-off-outline</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="pa-0 ma-0">
                  <v-text-field
                    id="repeat_pass"
                    prepend-icon="mdi-lock-check"
                    name="repeat_pass"
                    v-model="repeat_pass.value"
                    label="Repita la contraseña"
                    :type="repeat_pass.show ? 'text' : 'password'"
                    :error="repeat_pass.error"
                    :error-messages="repeat_pass.error_msg"
                    outlined
                    dense
                  >
                    <template #append>
                      <v-icon
                        v-if="repeat_pass.show === false"
                        @click="repeat_pass.show = !repeat_pass.show"
                        >mdi-eye-outline</v-icon
                      >
                      <v-icon
                        v-else
                        @click="repeat_pass.show = !repeat_pass.show"
                        >mdi-eye-off-outline</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-space-around pb-5 " width="100%">
              <v-btn color="primary" :loading="loading" @click="changePassword">
                <v-icon left>mdi-content-save</v-icon>actualizar
              </v-btn>
              <v-divider vertical></v-divider>
              <router-link to="/login">O iniciar sesión</router-link>
            </v-card-actions>
          </v-card>
          <v-card
            class="rounded-lg px-2 px-sm-12 elevation-2"
            v-else-if="mostrarActualizar == false"
          >
            <v-card-title class="justify-center" primary-title>
              Ocurrió un error
            </v-card-title>
            <v-card-text class="justify-center text-center body-1">
              El token para reestablecer contraseña ya expiro, por favor
              <router-link to="/recuperar-password"
                >intente nuevamente</router-link
              >
            </v-card-text>
          </v-card>
          <v-card class="rounded-lg px-2 px-sm-12 elevation-2" v-else>
            <v-card-title class="justify-center" primary-title>
              Cargando
            </v-card-title>
            <v-card-text class="justify-center text-center body-1">
              Por favor espere ...
            </v-card-text>
            <v-card-actions>
              <v-progress-linear
                indeterminate
                color="primary"
                rounded
                height="6"
              ></v-progress-linear>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-container>
        <v-icon left>mdi-error-circle</v-icon>
        <span class="body-1"><strong>{{ text_error }}</strong></span>
    </v-main>
      <v-snackbar
        v-model="success"
        :timeout="2000"
        absolute
        top
        elevation="2"
        color="success"
        right
      >
        <v-icon left>mdi-check-circle</v-icon>
        <span class="body-1">{{ text_success }}</span>
      </v-snackbar>
      <v-snackbar
        v-model="error"
        :timeout="5000"
        absolute
        top
        elevation="2"
        color="error"
        right
      >
      </v-snackbar>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    mostrarActualizar: null,
    success: false,
    error: false,
    text_success: "Contraseña cambiada con éxito",
    text_error: "",
    loading: false,
    new_pass: {
      value: null,
      error: false,
      error_msg: "",
      show: false,
    },
    repeat_pass: {
      value: null,
      error: false,
      error_msg: "",
      show: false,
    },
  }),
  methods: {
    async checkToken() {
      try {
        //Obtenemos el token de la url actual
        let token = this.$route.params.id;
        //revisamos si el token aun no ha vencido realizando la siguiente peticion
        const response = await this.http_client(
          "/api/recovery/checktoken",
          null,
          "post",
          {
            Authorization: `Bearer ${token}`,
          }
        );
        //si no ha vencido entonces se le permite ver el formulario
        if (response.status === 200) {
          this.mostrarActualizar = true;
        }
      } catch (e) {
        //si ha vencido entonces que intente de nuevo
        this.text_error='El token de autorización ya se venció'
        this.error=true
        this.mostrarActualizar = false;
      }
    },

    async changePassword() {
      if (!this.validInput(this.new_pass)) return;
      if (!this.validInput(this.repeat_pass)) return;
      if (this.repeat_pass.value == this.new_pass.value) {
        //si paso las validaciones pasamos a hacer la peticion
        try {
          let token = this.$route.params.id;
          const response = await this.http_client(
            `/api/reset/password`,
            {
              new_password: this.new_pass.value.toString(),
              repeat_password: this.repeat_pass.value.toString(),
            },
            "post",
            {
              Authorization: `Bearer ${token}`,
            }
          );
          //recordar hacer tostring a las password
          if (response.status === 200) {
            this.success = true;
            this.$router.push("/login");
            //si funciono todo entonces redirige al login y muestra mensaje
          }
        } catch (e) {
          if (e.response.status === 404 || e.response.status === 400) {
            //Aqui se coloca el error en input si es que la contraseña no cumple con las
            //validaciones del back, ej: longitud,caracteres especiales
            this.text_error = JSON.parse(
              e.response.data.detail
            ).errors[0].error;
            this.error = true;
          }
        }
      } else {
        this.error=true;
        this.text_error='Las contraseñas no coinciden'
      }
    },
  },
  async beforeMount() {
    await this.checkToken();
  },
};
</script>
<style lang="scss" scoped></style>
