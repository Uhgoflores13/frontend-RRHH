<template>
  <div>
    <v-row>
      <v-col xs="12" sm="12" md="12" lg="6" xl="6">
        <v-card class="pa-4">
          <v-row no-gutters>
            <v-col md="6" sm="12">
              <p class="subtitle-2">Nombre</p>
              <p class="body-1 grey--text"></p>
            </v-col>
            <v-col md="6" sm="12">
              <p class="subtitle-2">Apellido</p>
              <p class="body-1 grey--text"></p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p class="subtitle-2">Correo electrónico</p>
              <p class="body-1 grey--text">{{userDetail.email}}</p>
            </v-col>
            <v-col>
              <p class="subtitle-2">Ultima conexion</p>
              <p class="body-1 grey--text">{{userDetail.ultima_conexion | moment('timezone','America/El_Salvador','LLLL:ss a')}}</p>
            </v-col>
          </v-row>
          <v-divider class="mt-4"></v-divider>
          <div class="mt-4">
            <p class="title">Actualizar email</p>
            <v-text-field prepend-icon="mdi-email"
                          name="email"
                          v-model="email"
                          label="Email "
                          outlined
                          dense>
            </v-text-field>
            <div class="text-center">
              <v-btn color="primary">
                <v-icon class="mr-1">mdi-content-save</v-icon>
                Guardar
              </v-btn>
            </div>
          </div>

        </v-card>
      </v-col>
      <v-col xs="12" sm="12" md="12" lg="6" xl="6">
        <v-card class="py-4 px-8">
          <v-text-field prepend-icon="mdi-lock"
                        name="password"
                        v-model="password"
                        label="Contraseña Actual"
                        :type="showPassword?'text':'password'"
                        :rules="passwordRules"
                        outlined
                        dense>
             <template #append>
                      <v-icon v-if="!showPassword" @click="showPassword=!showPassword">mdi-eye-outline</v-icon>
                      <v-icon v-else @click="showPassword=!showPassword">mdi-eye-off-outline</v-icon>
                    </template>
          </v-text-field>
          <v-text-field prepend-icon="mdi-lock"
                        name="newPassword"
                        v-model="newPassword"
                        label="Nueva Contraseña"
                        :type="showNewPassword?'text':'password'"
                        :rules="passwordRules"
                        outlined
                        dense>
             <template #append>
                      <v-icon v-if="!showNewPassword" @click="showNewPassword=!showNewPassword">mdi-eye-outline</v-icon>
                      <v-icon v-else @click="showNewPassword=!showNewPassword">mdi-eye-off-outline</v-icon>
                    </template>
          </v-text-field>
          <v-text-field prepend-icon="mdi-lock"
                        name="confirmPassword"
                        v-model="confirmPassword"
                        label="Confirmar Contraseña"
                        :type="showConfirmPassword?'text':'password'"
                        :rules="passwordRules"
                        outlined
                        dense>
             <template #append>
                      <v-icon v-if="!showConfirmPassword" @click="showConfirmPassword=!showConfirmPassword">mdi-eye-outline</v-icon>
                      <v-icon v-else @click="showConfirmPassword=!showConfirmPassword">mdi-eye-off-outline</v-icon>
                    </template>
          </v-text-field>
          <v-card-actions class="flex justify-center">
            <v-btn color="primary">
              <v-icon class="mr-1">mdi-content-save</v-icon>
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "perfil",
  data: () => ({
    password: null,
    showPassword: false,
    newPassword: null,
    showNewPassword: false,
    confirmPassword: null,
    showConfirmPassword: false,
    passwordRules: [
      v => (v !== null && v !== '') || 'password no valida'
    ],
    email:null
  }),
  computed:{
    ...mapState(['userDetail'])
  }
}
</script>

<style scoped>

</style>