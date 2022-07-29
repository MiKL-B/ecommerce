<template>
  <div>
    <v-card>
      <v-carousel v-model="model">
        <v-carousel-item v-for="(color, i) in colors" :key="color">
          <v-sheet :color="color" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="text-h2">Slide {{ i + 1 }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel></v-card
    >
    <ShopView></ShopView>
  </div>
</template>

<script>
import ShopView from "./ShopView.vue";

export default {
  name: "HomeView",
  data() {
    return {
      model: 0,
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    };
  },
  components: {
    ShopView,
  },
};
</script>
<style>
.home-title {
  display: flex;
  flex-direction: column;
}
.home-title h1 {
  font-size: 30px;
}
.home-title p {
  font-size: 20px;
}
.home-content {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5));
  padding: 1rem;
}
.home-content div {
  margin: 0 auto;
  padding: 1rem 0;
}
.home-content img {
  display: none;
}
.home-text {
  margin: auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media screen and (min-width: 768px) {
  .home-title h1 {
    font-size: 50px;
  }
  .home-title p {
    font-size: 30px;
  }
  .home-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 100%;
    align-items: center;
  }
  .home-content img {
    display: block;
  }

  .text {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
}
</style>
