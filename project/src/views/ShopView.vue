<template>
  <div class="shop padding-container">
    <v-container v-if="!shops.length"
      ><h1 class="d-flex justify-center my-10">
        Pas de produit pour l'instant !
      </h1></v-container
    >
    <v-container v-else>
      <div class="d-flex filter">
        <v-select
          v-model="search"
          :items="category"
          label="Tri par famille"
          solo
        >
        </v-select>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon @click="search = ''"
              ><v-icon>mdi-reload</v-icon></v-btn
            >
          </template>

          <span>Réinitialiser</span></v-tooltip
        >
      </div>
      <div class="product-container">
        <v-card
          v-for="item in filterList"
          :key="item.id_product"
          class="mx-auto my-12 product"
        >
          <template slot="progress">
            <v-progress-linear
              color="green"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img class="product-img" :src="item.image" ></v-img>

          <v-card-title class="text-capitalize">{{ item.name }}</v-card-title>

          <v-card-text>
            <div class="d-flex justify-space-between">
              <p class="text-h5">{{ item.price }} €</p>
              <p>{{ item.label_volume }} ml</p>
            </div>
            <v-divider></v-divider>
            <p class="text-h6">{{ item.label_category }}</p>
          </v-card-text>

          <v-card-actions>
            <router-link :to="`/produit/${item.slug}`" data-cy="product"
              ><v-btn dark>voir produit</v-btn></router-link
            >
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ShopView",
  components: {},
  data: () => ({
    shops: [],
    search: "",
    category: [],
  }),
  computed: {
    filterList() {
      return this.shops.filter((category) => {
        return category.label_category.includes(this.search);
      });
    },
  },
  created() {
    axios.get("http://127.0.0.1:3000/api/product").then((response) => {
      this.shops = response.data;
      this.shops.forEach((el) => {
        this.category.push(el.label_category);
      });
    });
  },
};
</script>
<style>
.product-img {
  width: 250px;
  height:250px;
  object-fit: cover;
}
.product-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.search {
  width: 300px;
}
.filter {
  width: 200px;
}

@media screen and (min-width: 768px) {
  .product-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}
@media screen and (min-width: 1440px) {
  .product-container {
    grid-template-columns: repeat(4, 1fr);
  }
  .product {
    max-width: 300px;
  }
  .product-img {
    width: 300px;
  }
}
</style>
