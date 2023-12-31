<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-container max-width="xl" class="py-4">
        <v-row>
          <v-col cols="12">
            <h1 class="display-1 font-weight-bold white--text">
              Administrador de Libros
            </h1>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main class="pa-5">
      <v-container max-width="960px" class="mt-10">
        <div class="flex-container mb-3">
          <v-btn
            :to="{ name: 'nuevo-libro' }"
            color="primary"
            class="rounded-btn"
            depressed
          >
            Autores
          </v-btn>
        </div>
        <v-row>
          <v-col>
            <Heading tittle="Libros"></Heading>
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="search"
              label="Buscar libro"
              solo
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn @click="searchBook" color="primary"> Buscar </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <!-- Sección de Filtros -->
          <v-col cols="12" md="4">
            <!-- En pantallas medianas (md) y mayores ocupará 4/12 del ancho -->
            <!-- Filtro de Género -->
            <v-select
              :items="genres"
              label="Género"
              v-model="selectedGenre"
              solo
            ></v-select>

            <!-- Filtro de Autor -->
            <v-select
              :items="authors"
              label="autor"
              v-model="selectedAuthor"
              solo
              class="mt-3"
            ></v-select>

            <!-- Filtro de Año -->
            <v-select
              :items="years"
              label="Año"
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
              :items="filteredBooks"
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
                <v-card-title class="headline">Eliminar libro</v-card-title>
                <v-card-text
                  >¿Estas seguro que quieres borrar este libro?</v-card-text
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
                <v-card-title class="headline">Editar Libro</v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedBook.bookName"
                          label="Libro"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedBook.genre"
                          label="Género"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedBook.author"
                          label="Autor"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedBook.year"
                          label="Año"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedBook.status"
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
                  <v-btn color="blue darken-1" text @click="saveEditedBook"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import RouterLink from "../../components/Ui/RouterLink.vue";
import Heading from "../../components/Ui/Heading.vue";

export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Libro", value: "bookName" },
      { text: "Género", value: "genre" },
      { text: "Autor", value: "author" },
      { text: "Año", value: "year" },
      { text: "Estado", value: "status" },
      { text: "Acciones", value: "action", sortable: false },
    ],
    books: [
      {
        bookName: "El principito",
        genre: "Ficción",
        author: "Autor 1",
        year: "2001",
        status: "Disponible",
      },
      // ... puedes agregar más libros aquí
    ],
    selectedGenre: null, // Valor seleccionado en el filtro de género
    selectedAuthor: null, // Valor seleccionado en el filtro de autor
    selectedYear: null, // Valor seleccionado en el filtro de año
    genres: [
      "Ficción",
      "Drama",
      "Terror",
      "accion" /* ... otros géneros ... */,
    ],
    authors: ["Autor 1", "Autor 2" /* ... otros autores ... */],
    years: ["2000", "2001", "2002" /* ... otros años ... */],
    dialogVisible: false, // Controla la visibilidad del modal
    editedBook: {
      bookName:"",
      genre: "",
      author: "",
      year: "",
      status: "",
    },
    deleteDialogVisible: false,
    bookToDelete: null,
  }),
  components: {
    RouterLink,
    Heading,
  },
  methods: {
    editItem(item) {
      this.editedBook = { ...item };
      this.dialogVisible = true;
    },
    searchBook() {
      // Aquí es donde agregarás la lógica para buscar el libro
      console.log("Buscar libro:", this.search);
    },
    saveEditedBook() {
      // Aquí podrías implementar la lógica para guardar las ediciones, por ejemplo, actualizando el libro en un servidor o en un store de Vuex.
      this.dialogVisible = false; // Cerrar el modal
    },
    deleteItem(item) {
      this.bookToDelete = item;
      this.deleteDialogVisible = true;
    },
    confirmDelete() {
      // Aquí puedes agregar la lógica para eliminar el libro de tu lista
      // Por ejemplo: this.books.splice(this.books.indexOf(this.bookToDelete), 1);
      this.bookToDelete = null;
      this.deleteDialogVisible = false;
    },
    cancelDelete() {
      this.bookToDelete = null;
      this.deleteDialogVisible = false;
    },
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) => {
        return (
          (!this.selectedGenre || book.genre === this.selectedGenre) &&
          (!this.selectedAuthor || book.author === this.selectedAuthor) &&
          (!this.selectedYear || book.year === this.selectedYear)
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
