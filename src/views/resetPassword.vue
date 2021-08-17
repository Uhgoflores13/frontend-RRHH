<template>
  <v-app>
    <v-main class="grey lighten-2">
      <v-container fill-height justify-center>
        <v-flex lg6>
          <v-card class="px-10" elevation="2" color="white">
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
                prepend-icon="mdi-account"
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
            <v-card-actions class="justify-center" width="100%">
              <v-btn class="primary">Solicitar</v-btn>
              <v-divider vertical></v-divider>
              <router-link to="/resetearPassword"
                >¿Olvidaste la contraseña?</router-link
              >
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
    email_error: false,
    email_message: "Este campo es requerido",
  }),
  methods: {
    valid(v) {
      return this.isEmail(v);
    },
  },
};
</script>
<style lang="scss" scoped></style>
