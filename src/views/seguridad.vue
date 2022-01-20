<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fluid>
    <v-flex xs12 sm10 lg7 xl6>
      <v-card class="pa-0 pa-sm-8 pb-sm-0" elevation="3" rounded="lg">
        <v-card-title
          primary-title
          class="text-h5 text-center blueGrayMinsal--text d-block"
          >Metodos de autenticación</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text>
          <v-list subheader two-line>
            <v-subheader inset>Métodos disponibles</v-subheader>

            <v-list-item
              link
              v-for="(item, index) in metodos"
              :key="index"
              :disabled="item.id === 1"
            >
              <v-list-item-avatar @click="metodoSeleccionado(item.id)">
                <v-icon
                  :class="
                    item.is_primary == true || item.is_primary == false
                      ? 'blueMinsal'
                      : 'grey'
                  "
                  dark
                >
                  {{ item.icono }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content @click="metodoSeleccionado(item.id)">
                <v-list-item-title>{{ item.nombre }}</v-list-item-title>

                <v-list-item-subtitle>{{
                  item.descripcion
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action
                :key="actionsKey"
                v-if="item.id !== 1 && item.is_primary == false"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      @click="eliminarMetodo(item.id_metodo_usuario)"
                      v-bind="attrs"
                      v-on="on"
                      ><v-icon>mdi-delete</v-icon></v-btn
                    ></template
                  >
                  <span>Quitar método</span>
                </v-tooltip>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-text>
          <v-subheader inset>Método preferido</v-subheader>
          <v-select
            :items="metodosDisponibles"
            item-text="nombre"
            item-value="id_metodo_usuario"
            v-model="metodoPrimario"
            :value="metodoPrimario"
            flat
            filled
            solo
            dense
            @change="cambiarMetodoPrimario()"
          >
          </v-select>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <div v-if="metodoselect == 2">
        <v-stepper alt-labels :value="step" rounded="lg">
          <v-stepper-header class="elevation-0">
            <v-stepper-step
              step="1"
              :complete="step > 1"
              color="blueMinsal"
              class="text-center"
            >
              Escanee el codigo QR
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="2" color="blueMinsal">
              Ingrese el codigo
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-content step="1">
            <p class="body-1 grey--text text--darken-1">
              A continuación se le muestra un código QR, puede utilizar las
              siguientes aplicaciones para escanearlo:

              <v-row class="d-flex justify-space-between px-7 mt-3">
                <b>Autenticador de Google</b>
                <span>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=es_SV&gl=US"
                    target="_blank"
                    style="text-decoration: none;"
                  >
                    <v-icon class="green--text">mdi-android</v-icon></a
                  >
                  <a
                    href="https://apps.apple.com/es/app/google-authenticator/id388497605"
                    target="_blank"
                    style="text-decoration: none;"
                    ><v-icon class="black--text">mdi-apple</v-icon></a
                  >
                </span>
              </v-row>
              <v-row class="d-flex justify-space-between px-7 mt-3">
                <b>Autenticador de Microsoft</b>
                <span>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=es_SV&gl=US"
                    target="_blank"
                    style="text-decoration: none;"
                  >
                    <v-icon class="green--text">mdi-android</v-icon></a
                  >
                  <a
                    href="https://apps.apple.com/es/app/microsoft-authenticator/id983156458"
                    target="_blank"
                    style="text-decoration: none;"
                  >
                    <v-icon class="black--text">mdi-apple</v-icon></a
                  >
                </span>
              </v-row>
            </p>
            <div class="d-flex justify-center">
              <v-img :src="qr" max-width="300"></v-img>
            </div>
            <v-btn
              color="primary"
              rounded
              class="blueMinsal white--text"
              @click="step = 2"
            >
              Continuar
            </v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-text-field
              placeholder="ingrese el codigo"
              label="Codigo"
              v-model="codigo"
              :key="refreshTextField"
              color="blueMinsal"
              pattern="[0-9]*"
              type="number"
              @keypress="this.restrictInteger"
              @keypress.enter="updateMethod()"
              v-mask="'######'"
              :rules="[
                (v) => (v !== null && v !== '') || 'Este campo es obligatorio',
              ]"
            ></v-text-field>
            <v-btn
              color="blueMinsal white--text mr-3 elevation-0"
              rounded
              @click="
                step = 1;
                codigo = null;
                refreshTextField += 1;
              "
              v-if="step == 2"
            >
              Regresar
            </v-btn>
            <v-btn
              color="blueMinsal white--text elevation-0"
              rounded
              @click="updateMethod()"
            >
              Ingresar
            </v-btn>
          </v-stepper-content>
        </v-stepper>
      </div>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    refreshTextField: 0,
    dialog: false,
    qr: null,
    step: 1,
    metodoPrimario: null,
    metodoPrimarioAux: null,
    codigo: null,
    metodos: [],
    metodoselect: null,
    actionsKey: 0,
  }),
  methods: {
    async getMetodos() {
      const response = await this.http_client(
        "/api/v1/users/metodos-autenticacion-usuario"
      );
      this.metodos = response.data.metodos_autenticacion;
      this.metodoPrimario = this.metodos.find((metodo) => {
        return metodo.is_primary === true;
      });
      this.metodoPrimarioAux = this.metodoPrimario;
    },
    async getQr() {
      try {
        const response = await this.http_client(
          "/api/v1/users/2fa/add",
          { id_metodo: this.metodoselect },
          "post"
        );
        this.temporalAlert({
          show: true,
          message: response.data.message,
          type: "success",
        });
        this.qr = response.data.codigoQr;
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: e.response.data.message,
          type: "error",
        });
        }
    },
    async eliminarMetodo(id_metodo) {
      try {
        const response = await this.http_client(
          "/api/v1/eliminar_metodo",
          { id: id_metodo },
          "delete"
        );
        this.getMetodos();
        this.actionsKey += 1;
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: e.response.data.message,
          type: "error",
        });
      }
    },
    async cambiarMetodoPrimario() {
      if (this.metodoPrimarioAux.id_metodo_usuario == this.metodoPrimario) {
        return;
      }
      try {
        const response = await this.http_client(
          "/api/v1/users/2fa/method/update",
          { id_metodo_usuario: this.metodoPrimario },
          "post"
        );
        this.metodoPrimarioAux = this.metodoPrimario;
        this.getMetodos();
        this.actionsKey += 1;
        this.temporalAlert({
          message: "Se ha actualizado la información",
          show: true,
          type: "success",
        });
      } catch (e) {
        this.temporalAlert({
          message: "Ocurrió un error en la petición",
          show: true,
          type: "error",
        });
      }
    },
    async updateMethod() {
      if (this.codigo) {
        try {
          const response = await this.http_client(
            "/api/v1/users/2fa/add/verify",
            { id_metodo: this.metodoselect, codigo: this.codigo },
            "post"
          );
          this.dialog = false;
          await this.getMetodos();
          this.temporalAlert({
            show: true,
            message: "Se ha actualizado la información",
            type: "success",
          });
        } catch (e) {
          this.temporalAlert({
            show: true,
            message: e.response.data.message,
            type: "error",
          });
        }
      }
    },
    metodoSeleccionado(id) {
      this.dialog = true;
      this.refreshTextField += 1;
      this.step = 1;
      this.codigo = null;
      this.metodoselect = id;
      switch (id) {
        case 2:
          this.getQr();
          break;
        default:
          break;
      }
    },
  },
  computed: {
    metodosDisponibles() {
      return this.metodos.filter((metodo) => {
        if (metodo.id_metodo_usuario) {
          return metodo;
        }
      });
    },
  },
  created() {
    this.getMetodos();
  },
};
</script>
