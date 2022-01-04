<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <!--      <v-layout align-center justify-center>-->
    <v-flex xs12 sm11 md10 lg9>
      <v-card rounded="lg">
        <v-card-title class="mb-3">Administración</v-card-title>
        <v-card-text>
          <v-row
            v-for="item in items"
            :key="item.nombre"
            style="border-top: 1px solid #f1f1f1"
          >
            <v-col cols="12" sm="6">
              <p class="font-weight-bold black--text">
                {{ item.nombre }}
              </p>
            </v-col>
            <v-col class="text-left" cols="12" sm="6">
              <v-row dense>
                <v-col v-for="(item,i) in item.acciones" class="text-sm" :key="i">
                  <v-btn text class="blueMinsal--text" :to="item.path">
                    <v-icon right class="mr-1">
                      {{ item.icono }}
                    </v-icon>
                    {{ item.nombre }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: "dashboard",
  data: () => ({
    items: [],
  }),
  methods: {
    addItems() {
      //Agregar las opciones adicionales aquí
      this.items.push(
        {
          nombre: "Usuarios",
          acciones: [
            { nombre: "Agregar Nuevo", icono: "mdi-plus-circle",path:'/usuarios/create' },
            { nombre: "Listar", icono: "mdi-view-list",path:'/usuarios/list' },
          ],
        },
        {
          nombre: "Roles",
          acciones: [
            { nombre: "Agregar Nuevo", icono: "mdi-plus-circle",path:'/roles/create' },
            { nombre: "Listar", icono: "mdi-view-list",path:'/roles/list'},
          ],
        },
        {
          nombre: "Perfiles",
          acciones: [
            { nombre: "Agregar Nuevo", icono: "mdi-plus-circle",path:'/perfiles/create'},
            { nombre: "Listar", icono: "mdi-view-list",path:'/perfiles/list' },
          ],
        },
        {
          nombre: "Rutas",
          acciones: [
            { nombre: "Agregar Nuevo", icono: "mdi-plus-circle",path:'/rutas/create' },
            { nombre: "Listar", icono: "mdi-view-list",path:'/rutas/list' },
          ],
        }
      );
    },
  },
  created() {
    this.addItems();
  },
};
</script>

<style scoped></style>
