<template>
  <v-app>
    <v-main class="grey lighten-2">
      <v-container fill-height justify-center>
        <v-flex lg6>
          <v-card class="rounded-lg px-2 px-sm-10 elevation-2">
            <v-card-title class="justify-center"
              >Recuperar Contraseña</v-card-title
            >
            <v-card-text>
              <v-divider></v-divider>
              <div class="body-1 grey--text text--darken-3 my-3">
                Complete este formulario con su dirección de correo electrónico.
                Si la dirección ingresada se encuentra en nuestros registros le
                enviaremos un correo con las instrucciones para reestablecer su
                contraseña.
              </div>
              <v-text-field
                prepend-icon="mdi-email"
                name="email"
                label="Email"
                type="text"
                :error="email_error"
                :error-messages="email_message"
                v-model="email"
                outlined
                dense
                v-if="success == false"
              ></v-text-field>
              <v-alert dense text type="success" :value="success==true" transition="slide-x-transition" >
                Solicitud realizada, por favor revise su bandeja de entrada de
                su
                <strong> correo electrónico</strong>
              </v-alert>
            </v-card-text>
            <v-card-actions class="justify-space-around pb-5" width="100%">
              <v-btn
                class="primary"
                :loading="loading"
                @click="sendEmail"
                v-if="!success"
                >Solicitar</v-btn
              >
              <v-divider vertical v-if="!success"></v-divider>
              <router-link to="/login">Iniciar sesión</router-link>
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
    email: null,
    loading: false,
    success: false,
    email_error: false,
    email_message: "",
  }),
  methods: {
    valid(v) {
      return this.isEmail(v);
    },
    async sendEmail() {
      if (this.valid(this.email)) {
        try {
          this.loading = true;
          this.email_error = false;
          this.email_message = "";
          //Se usa form data para enviar el email
          var form_data = new FormData();
          form_data.append("email", this.email);
          const response = await this.http_client(
            "/api/recovery/password",
            form_data,
            "post",
            {
              "Content-Type": "application/x-www-form-urlencoded",
            }
          );
          //Si todo esta bien muestra alerta tipo success
          if (response.status === 200) {
            this.success = true;
          }
        } catch (e) {
        } finally {
          this.loading = false;
        }
      } else {
        this.email_error = true;
        this.email_message = "Correo electrónico no valido";
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
