<template>
  <v-layout justify-center>
    <v-flex xs12 sm12 md10 lg8>
      <v-card :class="dinamicMargins" class="px-0" rounded="lg">
        <v-card
          :style="
            'position: absolute; top:' +
            positionTopDinamic +
            '; left: 0; right: 0; margin-left:1%; margin-right:1%;'
          "
          color="blueMinsal"
          dark
          rounded="lg"
          class="py-4 px-2"
        >
          <v-icon size="35">mdi-account</v-icon>
          <span class="pl-4 text-sm-h6 text-subtitle-1 font-weight-regular"
            >Búsqueda de paciente por DUI</span
          >
        </v-card>
        <v-card-text class="pt-15 px-3 px-sm-10">
          <div class="pt-12 pt-sm-2 d-flex"></div>
          <v-text-field
            v-mask="'########-#'"
            hint="Digite su número de DUI"
            label="Número de DUI"
            :rules="numeroDuiRules"
            :error="error"
            v-model="numeroDui"
            color="blueMinsal"
            persistent-hint
            @keypress.enter="verificarDui()"
            :disabled="loadingPersona"
            outlined
          >
            <template v-slot:append>
              <v-btn small text plain>
                <v-icon
                  color="grey"
                  size="24"
                  @click="verificarDui()"
                  :disabled="loadingPersona"
                  >mdi-magnify</v-icon
                >
              </v-btn>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-text class="px-3 px-sm-10">
          <v-alert
            class="px-2 px-sm-8 pt-4 pb-10"
            text
            color="blueMinsal"
            outlined
            rounded="lg"
          >
            <p>Pasos para consultar la información clínica del paciente:</p>
            <ol>
              <li>
                Ingresar el número de DUI con el formato <b>########-#</b> en la
                opción de búsqueda.
              </li>
              <li>
                Hacer click sobre el botón consultar
                <v-icon color="white">mdi-magnify</v-icon>
              </li>
              <li>
                En la pantalla emergente, verificar que la información
                corresponda a la persona que desea buscar y luego hacer click en
                el botón <b>Consultar</b>
              </li>
            </ol>
          </v-alert>
        </v-card-text>
        <v-fade-transition>
          <v-progress-linear
            indeterminate
            height="5"
            color="blueMinsal"
            v-if="loadingPersona"
          ></v-progress-linear>
        </v-fade-transition>
      </v-card>
      <v-dialog v-model="showInfo" width="900">
        <v-card v-if="showInfo" rounded="lg">
          <v-card-text>
            <p class="text-h5 pt-5 black--text text-center">
              {{ nombre_completo }}
            </p>
          </v-card-text>
          <v-card-text>
            <v-container fluid>
              <v-layout row>
                <v-flex xs12 sm3 md3 lg3 xl3 class="d-flex justify-center">
                  <img
                    :src="'data:image/jpeg;base64,' + informacionPersona.foto"
                    width="160"
                    height="200"
                  /><br />
                </v-flex>
                <v-flex xs10 sm10 md8 lg8 xl8>
                  <span class="font-weight-bold">{{
                    informacionPersona.nombre_sexo
                  }}</span>
                  <v-row dense>
                    <v-col
                      cols="12"
                      style="border-bottom: solid grey 1px"
                      class="py-2"
                    >
                      <v-icon left size="20">mdi-cake</v-icon
                      ><span class="pt-1 font-weight-bold"
                        >Datos de Nacimiento</span
                      >
                    </v-col>
                    <v-col>
                      <span class="font-weight-bold">Fecha de Nacimiento</span>
                      <v-spacer></v-spacer>
                      <v-icon>mdi-calendar</v-icon>{{ formatDate }}
                    </v-col>
                    <v-col>
                      <span class="font-weight-bold">Pais</span>
                      <v-spacer></v-spacer>
                      <v-icon>mdi-earth</v-icon>
                      {{ informacionPersona.datos_nacimiento.nombre_pais }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <span class="font-weight-bold">Departamento</span>
                      <v-spacer></v-spacer>
                      <v-icon>mdi-earth</v-icon>
                      {{
                        informacionPersona.datos_nacimiento.nombre_departamento
                      }}
                    </v-col>
                    <v-col>
                      <span class="font-weight-bold">Municipio</span>
                      <v-spacer></v-spacer>
                      <v-icon>mdi-earth</v-icon>
                      {{ informacionPersona.datos_nacimiento.nombre_municipio }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" style="border-bottom: solid grey 1px">
                      <v-icon left>mdi-account-multiple</v-icon
                      ><span>Familiares</span>
                    </v-col>
                    <v-col v-if="informacionPersona.familiares.madre">
                      <v-icon left>mdi-human-female</v-icon>
                      <span class="font-weight-bold">Madre</span>
                      <v-spacer></v-spacer>
                      {{
                        informacionPersona.familiares.madre
                          ? informacionPersona.familiares.madre.nombre_completo
                          : null
                      }}
                    </v-col>
                    <v-col v-if="informacionPersona.familiares.padre">
                      <v-icon left>mdi-human-male</v-icon>
                      <span class="font-weight-bold">Padre</span>
                      <v-spacer></v-spacer>
                      {{
                        informacionPersona.familiares.padre
                          ? informacionPersona.familiares.padre.nombre_completo
                          : null
                      }}
                    </v-col>
                  </v-row>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn
              @click="detallePersona()"
              rounded
              color="blueMinsal"
              class="white--text"
              >Ver mas</v-btn
            >
            <v-btn
              @click="limpiar()"
              rounded
              color="blueMinsal"
              class="white--text"
              >Cancelar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "home",
  data: () => ({
    loadingPersona: false,
    numeroDui: null,
    error: false,
    error_message: null,
    showInfo: false,
    informacionPersona: null,
    nombre_completo: null,
  }),
  methods: {
    // ...mapActions(["getEstablecimientos", "getEstablecimiento"]),
    limpiar() {
      this.numeroDui = null;
      this.showInfo = false;
    },
    detallePersona() {
      this.$router.push("antecedentes/" + this.informacionPersona.id_persona);
    },
    verificarDui() {
      if (this.numeroDui !== null && this.numeroDui !== "") {
        if (Vue.prototype.isDui(this.numeroDui)) {
          this.error = false;
          this.consultar();
        }
      } 
    },
    async consultar() {
      try {
        this.loadingPersona = true;
        const response = await this.http_client(
          `/api/v1/personas/${this.numeroDui}`,
          {}
        );
        /*
        *
        * informacionPersona.primer_nombre+' '+informacionPersona.segundo_nombre+' '
                                                  +informacionPersona.primer_apellido+ '' + informacionPersona.segundo_apellido
        * */
        this.informacionPersona = response.data;
        if (Object.keys(response.data).length > 0) {
          this.showInfo = true;
          if (response.data.primer_nombre !== null) {
            this.nombre_completo = response.data.primer_nombre + " ";
          }
          if (response.data.segundo_nombre !== null) {
            this.nombre_completo += response.data.segundo_nombre + " ";
          }
          if (response.data.tercer_nombre !== null) {
            this.nombre_completo += response.data.tercer_nombre + " ";
          }
          if (response.data.primer_apellido !== null) {
            this.nombre_completo += response.data.primer_apellido + " ";
          }
          if (response.data.segundo_apellido !== null) {
            this.nombre_completo += response.data.segundo_apellido + " ";
          }
          if (response.data.apellido_casada !== null) {
            this.nombre_completo += response.data.apellido_casada + " ";
          }
        }
      } catch (e) {
      } finally {
        this.loadingPersona = false;
      }
    },
  },
  computed: {
    numeroDuiRules() {
      return [
        (v) => (v !== null && v !== "") || "Digite su número de DUI",
        (v) => this.isDui(v) || "Ingrese un número de DUI válido",
      ];
    },
    formatDate() {
      var objFecha = new Date(
        this.informacionPersona.datos_nacimiento.fecha_hora_nacimiento
      );
      var dia = objFecha.getDate();
      var mes = objFecha.getMonth() + 1;
      var anio = objFecha.getFullYear();
      let fecha_final =
        (dia <= 9 ? "0" + dia : dia) +
        "/" +
        (mes <= 9 ? "0" + Number(mes) : Number(mes)) +
        "/" +
        anio;
      return fecha_final;
    },
    positionTopDinamic() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "-1%";
        case "sm":
          return "-5%";
        case "md":
          return "-6%";
        case "lg":
          return "-5%";
        case "xl":
          return "-5%";
        case "2xl":
          return "-5%";
      }
    },
    dinamicMargins() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "my-2";
        case "sm":
          return "my-8";
        case "md":
          return "my-8";
        case "lg":
          return "my-8";
        case "xl":
          return "my-8";
        case "2xl":
          return "-5%";
      }
    },
    dinamicCols() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "12";
        case "sm":
          return "12";
        case "md":
          return "3";
        case "lg":
          return "3";
        case "xl":
          return "3";
      }
    },
    dinamicPosition() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "text-center";
        case "sm":
          return "text-left";
        case "md":
          return "text-left";
        case "lg":
          return "text-left";
        case "xl":
          return "text-left";
      }
    },
    dinamicFullScreen() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return true;
        case "sm":
          return true;
        case "md":
          return true;
        case "lg":
          return false;
        case "xl":
          return false;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
