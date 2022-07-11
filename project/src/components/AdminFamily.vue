<template>
  <div class="admin padding-container">
    <v-container>
      <v-data-table
        :headers="headers"
        :items="categories"
        :items-per-page="5"
        class="elevation-1"
      >
        <!-- headers -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Familles</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- DIALOG create product -->
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nouveau
                </v-btn></template
              >
              <!-- modal new -->
              <form
                id="form"
                @submit.prevent="saveCategory"
              >
                <v-card>
                  <v-card-title>{{ formTitle }}</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="form.label_category"
                      label="Nom famille"
                      type="text"
                      required
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="dialog = false">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text type="submit">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </form>
            </v-dialog>
          </v-toolbar>
        </template>

        <!-- button actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon>
            <v-icon small class="mr-2" @click="editCategory(item)"
              >mdi-pencil</v-icon
            ></v-btn
          >
          <v-btn icon>
            <v-icon small @click="deleteCategory(item.id_category)">
              mdi-delete
            </v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AdminFamily",
  data() {
    return {
      dialog: false,
      editedIndex: 0,
      idCategory: "",
      categories: [],
      form: {
        label_category: "",
      },
      headers: [
        { text: "Nom", value: "label_category" },
        { text: "Actions", value: "actions" },
      ],
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    //submit
    saveCategory() {
      if (this.editedIndex !== 0) {
        //put
        axios
          .put(`http://localhost:3000/api/category/${this.idCategory}`, {
            category: this.form.label_category,
          })
          .then(() => {
            this.getAllCategory();
            window.location.reload()
          });
      } else {
        //post
        axios
          .post("http://localhost:3000/api/category", {
            category: this.form.label_category,
          })
          .then(() => {
            this.getAllCategory();
            window.location.reload()
          });
      }
      this.close();
    },
    //edit category
    editCategory(item) {
      //code...
      this.editedIndex = 1;
      this.form = Object.assign({}, item);
      this.dialog = true;
      this.idCategory = item.id_category;
    },
    //delete category
    deleteCategory(id) {
      if (window.confirm("voulez vous supprimer cette famille ? Cela supprimera les huiles associées ")) {
        axios.delete(`http://localhost:3000/api/category/${id}`);
        window.location.reload();
      }
    },
    //close modal
    close() {
      this.editedIndex = 0;
      this.dialog = false;
      if (this.editedIntex !== 0) {
        this.form.label_category = "";
      }
    },
    getAllCategory() {
      axios.get("http://localhost:3000/api/category").then((response) => {
        this.categories = response.data;
      });
    },
  },
  created() {
    this.getAllCategory();
  },
  computed: {
    formTitle() {
      return this.editedIndex === 0 ? "Nouveau" : "Edit";
    },
  },
};
</script>
