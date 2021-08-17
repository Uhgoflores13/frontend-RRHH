<template>
  <v-app>
    <v-main class="grey lighten-2">
      <v-container fill-height justify-center>
        <v-flex lg6>
          <v-card class="rounded-lg px-2 px-sm-12 elevation-2">
            <v-card-title class="justify-center"
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
              <v-btn color="primary" :loading="loading" @click="sendEmail">
                <v-icon left>mdi-content-save</v-icon>actualizar
              </v-btn>
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
    sendEmail() {
      if (!this.validInput(this.new_pass)) return;
      if (!this.validInput(this.repeat_pass)) return;
      if (this.repeat_pass.value==this.new_pass.value) {
        //En esta parte es donde se realiza la peticion de la api que todavia no han creado
        
      }else{
        this.repeat_pass.error=true
        this.new_pass.error=true
        this.repeat_pass.error_msg='Estos campos no pueden ser diferentes'
        this.new_pass.error_msg='Estos campos no pueden ser diferentes'
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
