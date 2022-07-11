import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShopView from "../views/ShopView.vue";
import CartView from "../views/CartView.vue";
import AdminView from "../views/AdminView.vue";
import ErrorView from "../views/ErrorView.vue";
import LoginView from "../views/LoginView.vue";
import MentionView from "../views/MentionView.vue";
import ProductView from "../views/ProductView.vue";
import jwt_decode from "jwt-decode";
import Vuex from "../store/index.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/huiles",
    name: "ShopView",
    component: ShopView,
  },
  {
    path: "/panier",
    name: "CartView",
    component: CartView,
  },
  {
    path: "/admin",
    name: "AdminView",
    component: AdminView,
  },
  {
    path: "/connexion",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/produit/:slug",
    name: "ProductView",
    component: ProductView,
  },

  {
    path: "/mentions",
    name: "MentionView",
    component: MentionView,
  },
  {
    path: "*",
    name: "ErrorView",
    component: ErrorView,
  },
];

const router = new VueRouter({
  routes,
});

//handle access admin page
router.beforeEach((to, from, next) => {
  if (to.path === "/admin") {
    //recuperation info localstorage
    if (Vuex.state.isLoggedIn && Vuex.state.role === 1) {
      return next();
    } else {
      return next("/");
    }
  } else {
    return next();
  }
});
//handle access cart page
router.beforeEach((to, from, next) => {
  if (to.path === "/panier") {
    //recuperation info localstorage
    if (Vuex.state.isLoggedIn) {
      return next();
    } else {
      return next("/");
    }
  } else {
    return next();
  }
});
//handle access cart page
router.beforeEach((to, from, next) => {
  if (to.path === "/connexion") {
    //recuperation info localstorage
    if (Vuex.state.isLoggedIn) {
      return next("/");
    } else {
      return next();
    }
  } else {
    return next();
  }
});
//mise a jour du role
var jwt = localStorage.getItem("jwt");
if (jwt) {
  let token = jwt_decode(jwt);

  Vuex.commit("UPDATE_LOGIN", true);
  Vuex.commit("UPDATE_ROLE", token.role);
  Vuex.commit("GET_USER", token.email);
  Vuex.commit("GET_USER_ID", token.userId);
}
export default router;
