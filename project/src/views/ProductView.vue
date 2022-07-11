<template>
  <div class="padding-container">
    <v-container>
      <div class="productid">
        <v-img class="productid-img" :src="editContent.image"></v-img>
        <v-card class="productid-card"
          ><v-card-title class="text-capitalize">{{
            editContent.name
          }}</v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between">
              <p class="text-h5">{{ editContent.price }} €</p>
              <p class="text-h6">{{ editContent.label_volume }} ml</p>
            </div>

            <v-divider class="py-4"></v-divider>
            <p class="text-h6">Famille: {{ editContent.label_category }}</p>
            <p>
              Description:<br />
              {{ editContent.description }}
            </p>
            <p>
              Composition:<br />
              {{ editContent.composition }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-card-actions>
              <v-btn data-cy="buy"
                class="productid-button"
                dark
                @click="addToCart(product)"
                v-if="$store.state.user !== ''"
                >acheter</v-btn
              >
              <router-link v-else to="/connexion">
                <v-btn dark data-cy="connectToBuy"
                  >connectez vous pour effectuer des achats</v-btn
                ></router-link
              >
            </v-card-actions></v-card-actions
          >
        </v-card>
      </div>
      <v-snackbar
        v-model="snackbar"
        color="success"
        class="snackbar"
        :timeout="timeout"
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar></v-container
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductView",
  data() {
    return {
      editContent: [],
      snackbar: false,
      text: "",
      timeout: 2000,
      product: {},
    };
  },
  created() {
    const { slug } = this.$route.params;

    axios.get(`http://127.0.0.1:3000/api/product/${slug}`).then((response) => {
      this.editContent = response.data[0];
      //envoyer vers le panier le produit sans l'image car image trop lourde
      this.product = {
        name: this.editContent.name,
        id_product: this.editContent.id_product,
        label_category: this.editContent.label_category,
        price: this.editContent.price,
        slug: this.editContent.slug,
        label_volume: this.editContent.label_volume,
      };
    });
  },

  methods: {
    addToCart(item) {
      let jwt = localStorage.getItem("jwt");
      if (jwt) {
        this.$store.commit("ADD_TO_CART", item);
        this.$store.commit("SAVE_CART");
        this.snackbar = true;
        this.text = `${item.name} ajouté au panier`;
        //produit ajouté au panier
      }
    },
  },
};
</script>

<style>
.productid {
  margin: auto;
}

@media screen and (min-width: 768px) {
  .productid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .productid-img {
    width: 500px;
    height: 500px;
    margin: 0 auto;
  }
}
@media screen and (min-width: 1440px) {
  .productid-card {
    padding: 2rem;
  }
}
</style>
