<template>
  <div>
    <v-card>
      <v-app-bar dark fixed class="rounded-0">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/" title="accueil">Accueil</router-link>
        <span v-resize="onResize">
          <router-link v-if="size.x > 768" to="/huiles"
            ><v-list-item>Nos ...</v-list-item></router-link
          ></span
        >

        <v-spacer></v-spacer>
        <!-- menu -->
        <v-menu 
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn data-cy="account"
              v-if="$store.state.user !== ''"
              light
              v-bind="attrs"
              v-on="on"
              ><span class="red--text text-lg-h6"
                >{{ $store.state.cartCount }}<v-icon>mdi-cart</v-icon></span
              >
              Compte
            </v-btn>

            <router-link v-else to="/connexion">
              <v-btn light data-cy="menu">connexion</v-btn>
            </router-link>
          </template>
          <v-card v-resize="onResize">
            <v-card-title v-if="$store.state.user !== ''"
              ><v-icon class="mx-2">mdi-account</v-icon
              >{{ pseudo }}</v-card-title
            >
            <v-divider></v-divider>
            <v-card-text class="d-flex justify-space-around">
              <!-- panier -->
              <div v-if="$store.state.user !== ''">
                <router-link v-if="size.x > 768" data-cy="cart" to="/panier"
                  ><v-btn dark>panier</v-btn></router-link
                >
                <router-link v-else to="/panier"
                  ><v-btn icon title="panier"
                    ><v-icon>mdi-cart</v-icon></v-btn
                  ></router-link
                >
              </div>
              <v-divider vertical v-if="size.x < 768"></v-divider>
              <div v-if="$store.state.user !== ''">
                <v-btn v-if="size.x > 768" class="mx-2" @click="logout" dark
                  >déconnexion</v-btn
                >
                <v-btn v-else icon @click="logout" title="déconnexion">
                  <v-icon>mdi-logout</v-icon></v-btn
                >
              </div>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-text>
              <div v-if="$store.state.user !== ''" class="d-flex">
                <v-btn color="error" style="width: 100%" @click="deleteAccount"
                  >supprimer compte</v-btn
                >
              </div></v-card-text
            >
          </v-card>
        </v-menu>
        <!-- menu -->
      </v-app-bar>
    </v-card>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <router-link to="/" title="accueil">
            <img class="nav-img" src="" alt="logo"
          /></router-link>
          <router-link to="/huiles" class="nav-link"
            ><v-list-item>Découvrir nos ...</v-list-item></router-link
          >

          <router-link
            v-if="$store.state.role === 1"
            to="/admin"
            class="nav-link"
            ><v-list-item>Admin</v-list-item></router-link
          >
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
      drawer: false,
      group: null,
      user: this.$store.state.user,
      pseudo: "",
      menu: false,
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
  watch: {
    group() {
      this.drawer = false;
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
.router-link-exact-active{
 text-decoration: underline;
}
</style>
