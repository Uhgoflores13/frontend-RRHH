<template>
  <v-app>
    <v-main class="bgMinsal">
      <v-container fill-height justify-center fluid>
        <v-flex xs12 sm8 md6 lg4 xl3>
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
                    :rules="passwordRules"
                    :type="new_pass.show ? 'text' : 'password'"
                    :error="new_pass.error"
                    :error-messages="new_pass.error_msg"
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
                    :rules="passwordRules"
                    :type="repeat_pass.show ? 'text' : 'password'"
                    :error="repeat_pass.error"
                    :error-messages="repeat_pass.error_msg"
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
            <v-card-actions class="justify-space-around pb-5" width="100%">
              <v-btn
                color="blueMinsal white--text"
                :loading="loading"
                @click="changePassword"
                rounded
              >
                <v-icon left>mdi-content-save</v-icon>actualizar
              </v-btn>
              <v-divider vertical></v-divider>
              <router-link to="/login" class="blueMinsal--text"
                >O iniciar sesión</router-link
              >
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
              <router-link to="/recuperar-password" class="blueMinsal--text"
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
    </v-main>
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
        this.text_error = "El token de autorización ya se venció";
        this.error = true;
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
              password: this.new_pass.value.toString().trim(),
              confirm_password: this.repeat_pass.value.toString().trim(),
            },
            "post",
            {
              Authorization: `Bearer ${token}`,
            }
          );
          //recordar hacer tostring a las password
          if (response.status === 200) {
            this.temporalAlert({
              show:true,
              message:'La contraseña se cambio, inicie sesión',
              type:'success',
              timeout:4000,
            })
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
        this.error = true;
        this.text_error = "Las contraseñas no coinciden";
      }
    },
  },
  computed: {
    passwordRules() {
      return [
        (v) => (v !== null && v !== "") || "Este campo es requerido",
        (v) =>
          this.isPassword(v) ||
          "La contraseña debe tener al menos 1 minuscula, 1 mayuscula, 1 caracter especial, 1 numero y minimo 8 caracteres",
      ];
    },
  },
  async beforeMount() {
    await this.checkToken();
  },
};
</script>
<style lang="scss" scoped></style>
