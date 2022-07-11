<template>
  <v-app>
    <v-main>
      <NavMenu></NavMenu>
      <router-view />
    </v-main>
    <FooterMenu></FooterMenu>
    <!-- <CookieBanner></CookieBanner> -->
  </v-app>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";
import FooterMenu from "./components/FooterMenu.vue";
// import CookieBanner from "./components/CookieBanner.vue";

export default {
  name: "App",
  data: () => ({
    //
  }),
  components: { NavMenu, FooterMenu },
};
</script>
<style>
:root {
  --vert: #168240;
}
* {
  user-select: none;
}
h2 {
  color: var(--vert);
}
a {
  color: white !important;
  text-decoration: none;
}
img {
  object-fit: cover;
  height: 150px;
}
.padding-container {
  padding: 8rem 0 4rem 0 !important;
}
.nav-img {
  height: 150px !important;
}
@media screen and (min-width: 1024px) {
  img {
    height: 200px;
  }
}
</style>
