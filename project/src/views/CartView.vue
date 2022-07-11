<template>
  <div class="cart padding-container">
    <v-container>
      <!-- cart product -->
      <div v-if="$store.state.cart.length > 0">
        <v-data-table
          :headers="headers"
          :items="$store.state.cart"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-btn dark width="200px" 
              ><router-link to="/huiles"
                >Continuer mes achats</router-link
              ></v-btn
            >
          </template>
          <template v-slot:[`item.label_volume`]="{ item }">
            {{ item.label_volume }} ml
          </template>
          <template v-slot:[`item.price`]="{ item }">
            {{ item.totalPrice }} €
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-card-actions
              ><v-btn icon @click="removeFromCartId(item)"
                ><v-icon class="red--text">mdi-minus</v-icon></v-btn
              ><v-card-text class="text-center cart-quantity-number">{{
                item.quantity
              }}</v-card-text
              ><v-btn icon @click="addToCart(item)"
                ><v-icon class="green--text">mdi-plus</v-icon></v-btn
              ></v-card-actions
            >
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-btn icon @click="removeFromCart(item)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </template>
        </v-data-table>
      </div>
      <div v-else>
        <v-card>
          <v-card-title class="my-2"> <h1>Oups !</h1></v-card-title>
          <v-card-text
            ><p>Votre panier est vide</p>
            <p>Vous pouvez retourner à la boutique ici</p></v-card-text
          >
          <v-card-actions>
            <v-btn dark width="200px" class="ma-2"
              ><router-link to="/huiles">Boutique</router-link></v-btn
            ></v-card-actions
          >
        </v-card>
      </div>
    </v-container>
    <!-- checkout -->
    <v-container>
      <div class="checkout">
        <v-card>
          <v-card-text><h3>Résumé de la commande</h3></v-card-text>
          <v-card-text>{{ $store.state.cartCount }} produit(s)</v-card-text>
          <v-card-text>Livraison gratuit</v-card-text>
          <v-card-text class="font-weight-black"
            >Total: {{ totalPrice }} €</v-card-text
          >

          <v-card-actions>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  disabled
                  placeholder="Entrez votre code promo"
                  solo
                ></v-text-field>
              </v-col> </v-row
          ></v-card-actions>
          <!--BOUTON PAYPAL-->
          <div class="paypal" v-if="$store.state.cart.length > 0">
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input
                type="hidden"
                name="hosted_button_id"
                value="UUZU4C87Z4R7A"
              />
              <input
                type="image"
                src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_buynowCC_LG.gif"
                border="0"
                name="submit"
                alt="PayPal, le réflexe sécurité pour payer en ligne"
              />
              <img
                alt=""
                border="0"
                src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
          </div>
          <v-divider class="my-4"></v-divider>

          <v-card-text><h3>Besoin d'aide ?</h3> </v-card-text>
          <v-card-text class="text-decoration-underline">livraison</v-card-text>
          <v-card-text class="text-decoration-underline"
            >retour et remboursement</v-card-text
          >
          <v-card-text class="text-decoration-underline"
            >commande et paiement</v-card-text
          >
          <v-card-text class="text-decoration-underline"
            >promotions et codes de réduction</v-card-text
          >
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "CartView",
  data() {
    return {
      headers: [
        { text: "Nom", value: "name" },
        { text: "Volume", value: "label_volume" },
        { text: "Famille", value: "label_category" },
        { text: "Quantité", value: "actions" },
        { text: "Prix", value: "price" },
        { text: "Supprimer", value: "delete" },
      ],
    };
  },
  methods: {
    addToCart(item) {
      let jwt = localStorage.getItem("jwt");
      if (jwt) {
        this.$store.commit("ADD_TO_CART", item);
        this.$store.commit("SAVE_CART");
      }
    },
    removeFromCartId(item) {
      this.$store.commit("REMOVE_FROM_CART_ID", item);
      this.$store.commit("SAVE_CART");
    },
    removeFromCart(item) {
      this.$store.commit("REMOVE_FROM_CART", item);
      this.$store.commit("SAVE_CART");
    },
  },
  computed: {
    totalPrice() {
      return this.$store.state.cart.reduce(
        (acc, item) => acc + Number(item.totalPrice),
        0
      );
    },
    isDisabled() {
      return this.$store.state.cart.length === 0;
    },
  },
};
</script>
<style>
.cart-product {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  margin: 0.5rem 0;
}
.cart-img {
  display: flex;
  justify-content: center;
  margin: 0.5rem auto;
}
.cart-quantity {
  margin: 0 auto;
}
.cart-quantity-number {
  padding: 0;
  width: 40px;
}
.paypal {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.paypal img {
  display: none;
}
@media screen and (min-width: 375px) {
  .cart-product {
    display: flex;
    align-items: center;
    padding: 1rem;

    flex-direction: row;
  }
}
@media screen and (min-width: 768px) {
  .cart {
    display: flex;
    justify-content: space-around;
  }
  .paypal {
    justify-content: start;
    margin-left: 0.5rem;
  }
}
</style>
