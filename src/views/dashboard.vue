<template>
  <div>
    <div class="text-center">
<!--      <v-layout align-center justify-center>-->
        <v-flex  xs12 sm12 md7 lg9>
          <v-card>
            <v-card-title class="mb-3">Administración</v-card-title>
            <v-card-text>
              <v-row v-for="item in items" :key="item.nombre" style="border-top: 1px solid #f1f1f1">
                <v-col>
                  <p class="font-weight-bold black--text">
                    {{item.nombre}}
                  </p>
                </v-col>
                <v-col class="text-left" cols="7">
                  <v-row dense>
                    <v-col v-for="itemactions in item.acciones" class="text-sm">
                      <v-btn text class="primary_bcen--text">
                        <v-icon right class="mr-1">
                          {{ itemactions.icono }}
                        </v-icon>
                        {{itemactions.nombre}}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-flex>
<!--      </v-layout>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data: () => ({
    items: []
  }),
  methods:{
    addItems(){
      this.items.push({nombre:'Usuarios', acciones:[{nombre:'Agregar Nuevo', icono:'mdi-plus-circle'},{nombre:'Listar', icono:'mdi-view-list'}]},
                      {nombre:'Roles', acciones:[{nombre:'Agregar Nuevo', icono:'mdi-plus-circle'},{nombre:'Listar', icono:'mdi-view-list'}]},
                      {nombre:'Perfiles', acciones:[{nombre:'Agregar Nuevo', icono:'mdi-plus-circle'},{nombre:'Listar', icono:'mdi-view-list'}]},
                      {nombre:'Rutas', acciones:[{nombre:'Agregar Nuevo', icono:'mdi-plus-circle'},{nombre:'Listar', icono:'mdi-view-list'}]},
      )
    }
  },
  created() {
    this.addItems()
  }
}
</script>

<style scoped>

</style>