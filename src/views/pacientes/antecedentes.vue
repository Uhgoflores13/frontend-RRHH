<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md11 lg10>
      <v-card rounded="lg" class="py-3 px-2 px-sm-8">
        <v-card-text class="text-h6 blueGrayMinsal--text">
          <v-row class="text-center">
            <v-col cols="12">
              Última fecha de actualización de antecentes
            </v-col>
          </v-row>
          <p class="text-center">
            <v-icon color="blueGrayMinsal" left>mdi-calendar-month</v-icon>
            {{
              antecedente_info
                ? moment(antecedente_info.fecha_actualizado).format(
                    "DD/MM/YYYY"
                  )
                : ""
            }}
          </p>
          <v-btn
          rounded
          class="white--text d-flex mb-3"
          color="blueMinsal"
          @click="$router.go(-1)"
          ><v-icon>mdi-arrow-left</v-icon>Regresar</v-btn
        >
        </v-card-text>
        <v-card-text
          class="grey--text text--darken-3"
          v-if="Object.keys(antecedente_info).length > 0"
        >
          <v-row dense>
            <v-col cols="12" sm="6" class="pl-sm-0" >
              <p class="text-h6"
                ><v-icon dense left>mdi-clipboard-text</v-icon
                >Diagnósticos</p
              >
              <v-spacer />
              <div v-if="antecedente_info.diagnosticos">
                <span v-for="(row, i) in antecedente_info.diagnosticos" :key="i">
                  <span class="font-weight-bold"
                    >{{ row.codigo_cie10_medico }} -
                    {{ row.nombre_cie10_medico }}</span
                  ><v-spacer />
                  <span
                    >Fecha
                    {{
                      row.fecha ? moment(row.fecha).format("DD/MM/YYYY") : ""
                    }}</span
                  >
                </span>
              </div>
              <v-alert color="blueMinsal" type="info" text v-else 
                >No posee información de diagnosticos</v-alert
              >
            </v-col>
            <v-col cols="12" sm="6" class="pl-sm-12">
              <p class="text-h6"
                ><v-icon dense left>mdi-virus</v-icon>Enfermedades</p
              >
              <v-spacer />
              <p v-for="(row, i) in antecedente_info.enfermedades" :key="i">
                <span class="font-weight-bold">{{ row.nombre_patologia }}</span>
                <v-spacer />
                <span>Año inicio: {{ row.detalle.anio_inicio }}</span>
                <v-spacer />
                <span
                  >Tratamiento tomado:
                  {{ row.detalle.tratamiento_tomado }}
                </span>
              </p>
            </v-col>
          </v-row>
          <v-row class="grey--text text--darken-3" dense>
            <v-col cols="12" sm="6">
              <p class="text-h6"
                ><v-icon dense left>mdi-account-group</v-icon>Familiares</p
              >
              <v-spacer />
              <div v-if="antecedente_info.familiares">
                <p v-for="(row, i) in antecedente_info.familiares" :key="i">
                  <span class="font-weight-bold">{{
                    row.nombre_parentesco
                  }}</span>
                  <v-spacer />
                  <span
                    v-for="(row, i) in row.antecedentes_enfermedades"
                    :key="i"
                  >
                    <v-icon dense x-small>mdi-checkbox-blank-circle</v-icon>
                    {{ row.nombre_patologia }} <v-spacer />
                  </span>
                </p>
              </div>
              <v-alert color="blueMinsal" type="info" text v-else 
                >No posee información de familiares</v-alert
              >
            </v-col>
            <v-col cols="12" sm="6" class="pl-sm-12">
              <p class="text-h6"
                ><v-icon dense left>mdi-glass-wine</v-icon>Sustancias</p
              >
              <v-spacer />
              <p v-for="(row, i) in antecedente_info.sustancias" :key="i">
                <span class="font-weight-bold"
                  >{{ row.nombre_sustancia }} ({{
                    row.presenta_consumo == true ? "SI" : "NO"
                  }})</span
                >
                <v-spacer />
              </p>
            </v-col>
          </v-row>
          <v-row class="grey--text text--darken-3">
            <v-col>
                <p class="text-h6">
                  <v-icon dense left>mdi-file-document-outline</v-icon>Otros
                </p>
              <p v-for="(row, i) in antecedente_info.otros" :key="i">
                <span class="pt-2 font-weight-bold">
                  {{ row.nombre_otro_antecedente }} ({{
                    row.presencia == true ? "si" : "no"
                  }})
                </span>
              </p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-alert color="blueMinsal" type="info" text prominent v-else
          >No posee datos de antecedentes</v-alert
        >
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { findEstablecimiento, isDui } from "../../plugins/utils";

export default {
  name: "antecedentes",
  data: () => ({
    ...mapState(["userDetail"]),
    antecedente_info: {},
    id_persona: null,
  }),
  methods: {
    async getAntecedentes() {
      try {
        const response = await this.http_client(
          `/api/v1/antecedentes/${this.id_persona}`,
          {}
        );
        this.antecedente_info = response.data;
      } catch (e) {
        console.log("error", e);
      }
    },
  },
  async created() {
    this.id_persona = this.$route.params.id;
    if (!this.id_persona) {
      this.$router.go(-1);
    }
    this.showLoader();
    await this.getAntecedentes();
    this.hideLoader();
  },
};
</script>

<style scoped></style>
