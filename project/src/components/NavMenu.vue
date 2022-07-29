<template>
  <div>
    <v-card>
      <v-app-bar  fixed class="rounded-0">
        <router-link to="/" title="accueil">Accueil</router-link>

        <v-spacer></v-spacer>

        <div v-resize="onResize">
          <v-autocomplete
            v-if="size.x > 768"
            chips
            clearable
            hide-details
            hide-selected
            item-text="name"
            item-value="symbol"
            label="Search for products..."
            soloG
          ></v-autocomplete>
        </div>
        <!--v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"-->
        <v-spacer></v-spacer>
        <router-link v-if="role === 1" to="/admin"
          ><v-btn>admin</v-btn></router-link
        >
        <div v-if="user !== ''">
          <router-link to="/panier"
            ><v-btn icon title="Panier"
              ><span class="red--text text-lg-h6">{{ $store.state.cartCount }}</span
              ><v-icon>mdi-cart</v-icon></v-btn
            ></router-link
          >
          <v-btn icon @click="logout" title="Déconnexion">
            <v-icon>mdi-logout</v-icon></v-btn
          >
        </div>
        <div v-else>
          <router-link to="/connexion"
            ><v-btn icon title="Connexion"
              ><v-icon>mdi-account</v-icon></v-btn
            ></router-link
          >
        </div>
      </v-app-bar>
    </v-card>
    <div v-if="$store.state.user !== ''" class="d-flex">
      <v-btn color="error" style="width: 100%" @click="deleteAccount"
        >supprimer compte</v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { mapState } from "vuex";
export default {
  name: "NavMenu",

  data() {
    return {
      size: {
        x: 0,
        y: 0,
      },
      user: this.$store.state.user,
      role: this.$store.state.role,
      pseudo: "",
    };
  },
  mounted() {
    this.onResize();
  },
  methods: {
    onResize() {
      this.size = { x: window.innerWidth, y: window.innerHeight };
    },
    logout() {
      if (window.confirm("Si vous vous déconnectez, votre panier sera vidé")) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("cart");
        localStorage.removeItem("cartCount");
        this.$store.commit("UPDATE_LOGIN", false);
        delete axios.defaults.headers.common["Authorization"];
        window.location.reload();
      }
    },
    deleteAccount() {
      if (window.confirm("etes vous sur de vouloir supprimer votre compte ?")) {
        axios
          .delete(`http://localhost:3000/api/user/delete/${this.userId}`)
          .then(() => {});
        localStorage.removeItem("jwt");
        localStorage.removeItem("cart");
        localStorage.removeItem("cartCount");
        this.$store.commit("UPDATE_LOGIN", false);
        delete axios.defaults.headers.common["Authorization"];
        window.location.reload();
      }
    },
  },

  computed: {
    ...mapState(["userId"]),
  },
  created() {
    //définir l'index de @ dans l'email
    let index = this.user.indexOf("@");
    //découpe de l'email de l'emplacement 0 jusqu'a @
    this.pseudo = this.user.substring(0, index);
  },
};
</script>
<style>
.navbar {
  position: sticky;
  top: 0;
}
.account-logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}
.nav-link {
  color: #303030 !important;
}
.router-link-exact-active {
  text-decoration: underline;
}
</style>
