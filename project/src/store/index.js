import Vue from "vue";
import Vuex from "vuex";
let cart = window.localStorage.getItem("cart");
let cartCount = window.localStorage.getItem("cartCount");
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    userId: 0,
    role: 0,
    isLoggedIn: false,
    cart: cart ? JSON.parse(cart) : [],
    cartCount: cartCount ? parseInt(cartCount) : 0,
  },
  getters: {},
  mutations: {
    GET_USER(state, payload) {
      state.user = payload;
    },
    GET_USER_ID(state, payload) {
      state.userId = payload;
    },
    UPDATE_LOGIN(state, payload) {
      state.isLoggedIn = payload;
    },
    UPDATE_ROLE(state, payload) {
      state.role = payload;
    },
    ADD_TO_CART(state, item) {
      let found = state.cart.find(
        (product) => product.slug === item.slug
      );

      if (found) {
        found.quantity++;
        found.totalPrice = found.quantity * found.price;
      } else {
        state.cart.push(item);
        Vue.set(item, "quantity", 1);
        Vue.set(item, "totalPrice", item.price);
      }

      state.cartCount++;
    },
    REMOVE_FROM_CART_ID(state, item) {
      let index = state.cart.indexOf(item);
      let found = state.cart.find(
        (product) => product.slug === item.slug
      );

      if (found) {
        found.quantity--;
        found.totalPrice = found.quantity * found.price;
      } else {
        Vue.set(item, "quantity", 1);
        Vue.set(item, "totalPrice", item.price);
      }
      state.cartCount--;
      if (found.quantity === 0) {
        state.cart.splice(index, 1);
      }
    },
    REMOVE_FROM_CART(state, item) {
      let index = state.cart.indexOf(item);

      if (index > -1) {
        let product = state.cart[index];
        state.cartCount -= product.quantity;

        state.cart.splice(index, 1);
      }
    },
    SAVE_CART(state) {
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
      window.localStorage.setItem("cartCount", state.cartCount);
    },
  },
  actions: {},
  modules: {},
});
