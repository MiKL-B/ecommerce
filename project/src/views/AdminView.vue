<template>
  <div class="admin padding-container">
    <v-container>
      <p class="d-flex red--text justify-center">{{ error }}</p>
      <v-data-table
        v-if="categories.length"
        :headers="headers"
        :items="shopsAdmin"
        :items-per-page="5"
        class="elevation-1"
      >
        <!-- headers -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Produits</v-toolbar-title>
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
                enctype="multipart/form-data"
                @submit.prevent="save"
              >
                <v-card>
                  <v-card-title>{{ formTitle }}</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="form.name"
                      label="Nom"
                      type="text"
                      required
                      :rules="nameRules"
                    ></v-text-field>

                   <!--  <v-text-field
                      v-model="form.description"
                      label="Description"
                      type="text"
                      required
                      :rules="nameRules"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.composition"
                      label="Composition"
                      type="text"
                      required
                      :rules="nameRules"
                    ></v-text-field>
                    <v-text-field
                      suffix="€"
                      type="number"
                      v-model="form.price"
                      label="Prix"
                      required
                      :rules="priceRules"
                      @keypress="onlyNumber"
                    ></v-text-field>

                    <div class="container-radio">
                      <div>
                        <h3>Volume</h3>
                        <v-radio-group v-model="selectedVolume">
                          <v-radio
                            v-for="volume in volumes"
                            :key="volume.id_volume"
                            :value="volume.id_volume"
                            :label="`${volume.label_volume} ml`"
                            color="success"
                            required
                          >
                            ></v-radio
                          >
                        </v-radio-group>
                      </div>
                      <div class="container-radio-family">
                        <h3>Famille</h3>
                        <v-radio-group v-model="selectedCategory">
                          <v-radio
                            v-for="category in categories"
                            :key="category.id_category"
                            :value="category.id_category"
                            :label="`${category.label_category}`"
                            color="success"
                            required
                          >
                            ></v-radio
                          >
                        </v-radio-group>
                      </div>
                    </div>

                    <input
                      type="file"
                      @change="handleUpload"
                      accept=".jpg, .jpeg, .png"
                      name="image"
                      style="width: 250px"
                      required
                      multiple
                    />
                    <v-img v-if="image" :src="image"></v-img>-->
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
        <template v-slot:[`item.image`]="{ item }">
          <v-avatar> <v-img :src="item.image"></v-img></v-avatar>
        </template>
        <template v-slot:[`item.createdat`]="{ item }">
          {{ format_date(item.createdat) }}
        </template>
        <!-- button actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon>
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            ></v-btn
          >
          <v-btn icon>
            <v-icon small @click="deleteItem(item.id_product)">
              mdi-delete
            </v-icon></v-btn
          >
        </template>
      </v-data-table>
      <AdminFamily></AdminFamily>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import dayjs from "dayjs";
import AdminFamily from "@/components/AdminFamily.vue";
/** Get base64 from image * @method */
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default {
  name: "AdminView",
  data() {
    return {
      volumes: [],
      error: "",
      dialog: false,
      selectedVolume: "",
      selectedCategory: "",
      editedIndex: 0,
      idProduct: "",
      nameRules: [(v) => !!v || "Nom requis"],
      priceRules: [(v) => !!v || "Prix requis"],
      image: "",
      form: {
        name: "",
        price: "",
        description: "",
        composition: "",
        category: "",
        volume: "",
      },
      categories: [],
      headers: [
        { text: "Image", value: "image" },
        { text: "Nom", value: "name" },
        { text: "Famille", value: "label_category" },
        { text: "Volume", value: "label_volume" },
        { text: "Prix", value: "price" },
        { text: "Date", value: "createdat" },
        { text: "Actions", value: "actions" },
      ],
      shopsAdmin: [],
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    //formatage date
    format_date(value) {
      if (value) {
        return dayjs(value).format("DD-MMMM-YYYY");
      }
    },
    //upload image
    async handleUpload(event) {
      const file = event.target.files[0];
      this.image = await getBase64(file);
    },
    //submit new product
    save() {
      if (this.editedIndex !== 0) {
        axios
          .put(`http://localhost:3000/api/product/${this.idProduct}`, {
            name: this.form.name,
            // image: this.image,
            // description: this.form.description,
            // composition: this.form.composition,
            // price: this.form.price,
            // category: this.selectedCategory,
            // volume: this.selectedVolume,
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            this.error = err.request.response;
          });
      } else {
        axios
          .post("http://localhost:3000/api/product", {
            name: this.form.name,
            image: this.image,
            description: this.form.description,
            composition: this.form.composition,
            price: this.form.price,
            category: this.selectedCategory,
            volume: this.selectedVolume,
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            this.error = err.request.response;
          });
      }
      this.close();
    },
    //edit item
    editItem(item) {
      //code...
      this.editedIndex = 1;
      this.form = Object.assign({}, item);
      this.dialog = true;
      this.idProduct = item.id_product;
    },
    //delete item
    deleteItem(id) {
      if (window.confirm("voulez vous supprimer ce produit ?")) {
        axios.delete(`http://localhost:3000/api/product/${id}`);
        window.location.reload();
      }
    },
    //close modal
    close() {
      this.editedIndex = 0;
      this.dialog = false;

      if (this.editedIntex !== 0) {
        this.form.name = "";
        this.form.price = "";
        this.form.description = "";
        this.form.composition = "";
      }
    },
    getAllProduct() {
      axios.get("http://localhost:3000/api/product").then((response) => {
        this.shopsAdmin = response.data;
        console.log(this.shopsAdmin);
      });
    },
    onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
  },
  created() {
    this.image = "";
    this.getAllProduct();
    axios.get("http://localhost:3000/api/category").then((response) => {
      this.categories = response.data;
    });
    axios.get("http://localhost:3000/api/volume").then((response) => {
      this.volumes = response.data;
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === 0 ? "Nouveau" : "Modifier";
    },
  },
  components: { AdminFamily },
};
</script>
<style>
.container-radio {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.container-radio-family {
  overflow: scroll;
  height: 200px;
}
@media screen and (min-width: 768px) {
  .container-radio {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
