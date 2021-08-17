<template>
  <v-app>
    <v-main class="grey lighten-2">
      <v-container fill-height justify-center>
        <v-flex lg6>
          <v-card class="rounded-lg px-10 elevation-2">
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
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-space-around pb-5" width="100%">
              <v-btn class="primary" :loading="loading" @click="sendEmail"
                >Solicitar</v-btn
              >
              <v-divider vertical></v-divider>
              <router-link to="/login">O iniciar sesión</router-link>
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
    email_error: false,
    email_message: "",
  }),
  methods: {
    valid(v) {
      return this.isEmail(v);
    },
    sendEmail() {
      this.loading = true;
      setTimeout(() => {}, 5000);
      if (this.valid(this.email)) {
        this.email_error = false;
        this.email_message = "";
        //aqui va la peticion a la api que no existe todavia
        this.$router.push("/resetPassword");
      } else {
        this.email_error = true;
        this.email_message = "Correo electrónico no valido";
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
