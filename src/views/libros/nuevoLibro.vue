<template>
  <div>
    <v-app-bar app color="primary">
      <v-container max-width="xl" class="py-4">
        <v-row>
          <v-col cols="12">
            <h1 class="display-1 font-weight-bold white--text">
              Administrador de Autores
            </h1>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main class="pa-5">
      <v-container max-width="960px" class="mt-10">
        <div class="flex-container mb-3">
          <v-btn to="libros" color="primary" class="rounded-btn" depressed>
            Libros
          </v-btn>
        </div>
        <v-row>
          <v-col>
            <h1 class="display-1 font-weight-bold">Autores</h1>
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="search"
              label="Buscar autor"
              solo
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn @click="searchAuthor" color="primary"> Buscar </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <!-- Sección de Filtros -->
          <v-col cols="12" md="4">
            <!-- En pantallas medianas (md) y mayores ocupará 4/12 del ancho -->
            <!-- Filtro de Autor -->
            <v-select
              :items="authors"
              label="Autor"
              v-model="selectednameAuthor"
              solo
            ></v-select>

            <!-- Filtro de Edad -->
            <v-select
              :items="ages"
              label="Edad"
              v-model="selectedage"
              solo
              class="mt-3"
            ></v-select>

            <!-- Filtro de Sexo -->
            <v-select
              :items="sexes"
              label="Sexo"
              v-model="selectedSex"
              solo
              class="mt-3"
            ></v-select>

            <!-- Filtro de Año de Nacimiento (Esto debería ser un número, no una lista de strings) -->
            <v-select
              :items="years"
              label="Año de Nacimiento"
              v-model="selectedYear"
              solo
              class="mt-3"
            ></v-select>
          </v-col>

          <!-- Sección de la Tabla -->
          <v-col cols="12" md="8">
            <!-- En pantallas medianas (md) y mayores ocupará 8/12 del ancho -->
            <!-- Tu tabla de libros aquí ... -->
            <v-data-table
              :headers="headers"
              :items="filteredAuthors"
              :items-per-page="5"
              class="elevation-1 mt-5"
            >
              <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
            <v-dialog v-model="deleteDialogVisible" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">Eliminar autor</v-card-title>
                <v-card-text
                  >¿Estas seguro que quieres borrar este autor?</v-card-text
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="cancelDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="red darken-1" text @click="confirmDelete"
                    >Eliminar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogVisible" max-width="600px">
              <v-card>
                <v-card-title class="headline">Editar autor</v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedAuthor.authorName"
                          label="Autor"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedAuthor.age"
                          label="Edad"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedAuthor.sex"
                          label="Sexo"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedAuthor.estado"
                          label="Año"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedAuthor.status"
                          label="Estado"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogVisible = false"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="saveEditedAuthor"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import RouterLink from "../../components/Ui/RouterLink.vue";
export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Nombre", value: "nameAuthor" },
      { text: "Edad", value: "age" },
      { text: "Sexo", value: "sex" },
      { text: "Año", value: "year" },
      { text: "Estado", value: "status" },
      { text: "Acciones", value: "action", sortable: false },
    ],
    authors: [
      {
        nameAuthor: "Autor 1",
        age: "25",
        sex: "Masculino",
        year: "2001",
        status: "Disponible",
      },
      // ... puedes agregar más autores aquí
    ],
    selectednameAuthor: null, // Valor seleccionado en el filtro de género
    selectedage: null, // Valor seleccionado en el filtro de autor
    selectedSex: null, // Valor seleccionado en el filtro de sexo
    selectedYear: null, // Valor seleccionado en el filtro de año

     
  ages: [25, 30, 35, 40, 45, 50], // Edades típicas, puedes cambiarlas según lo que necesites.
  sexes: ["Masculino", "Femenino"],
  years: [2000, 2001, 2002], // Años como números.

  dialogVisible: false, // Controla la visibilidad del modal
  editedAuthor: {
    nameAuthor: "",
    age: null,  // Considera si quieres inicializar esto como 0 o null.
    sex: "",
    year: null,  // Lo mismo aquí.
    status: "",
  },
    deleteDialogVisible: false,
    authorToDelete: null,
  }),
  components: {
    RouterLink,
  },
  methods: {
    editItem(item) {
      this.editedAuthor = { ...item };
      this.dialogVisible = true;
    },
    searchAuthor() {
      // Aquí es donde agregarás la lógica para buscar el libro
      console.log("Buscar libro:", this.search);
    },
    saveEditedAuthor() {
      // Aquí podrías implementar la lógica para guardar las ediciones, por ejemplo, actualizando el libro en un servidor o en un store de Vuex.
      this.dialogVisible = false; // Cerrar el modal
    },
    deleteItem(item) {
      this.authorToDelete = item;
      this.deleteDialogVisible = true;
    },
    confirmDelete() {
      // Aquí puedes agregar la lógica para eliminar el libro de tu lista
      // Por ejemplo: this.books.splice(this.books.indexOf(this.bookToDelete), 1);
      this.authorToDelete = null;
      this.deleteDialogVisible = false;
    },
    cancelDelete() {
      this.authorToDelete = null;
      this.deleteDialogVisible = false;
    },
  },
computed: {
    filteredAuthors() {
      return this.authors.filter((author) => {
        return (
          (!this.selectednameAuthor || author.nameAuthor === this.selectednameAuthor) &&
          (!this.selectedage || author.age === this.selectedage) &&
          (!this.selectedSex || author.sex === this.selectedSex) &&
          (!this.selectedYear || author.year === this.selectedYear)
        );
      });
    },
},
  watch: {},
  async created() {},
};
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: flex-end;
}

.rounded-btn {
  border-radius: 10px;
  color: white;
}

.rounded-btn:hover {
  background-color: primary !important;
}
</style>
