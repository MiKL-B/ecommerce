<template>
  <div class="cookie">
    <v-overlay :value="cookie">
      <v-alert
        v-model="cookie"
        light
        elevation="2"
        color="white"
        class="alert-cookie"
      >
        <v-card flat>
          <v-card-title> Ce site web utilise des cookies. </v-card-title>
          <v-card-text>
            Les cookies nous permettent de personnaliser le contenu et les
            annonces, d'offrir des fonctionnalités relatives aux médias sociaux
            et d'analyser notre trafic. Nous partageons également des
            informations sur l'utilisation de notre site avec nos partenaires de
            médias sociaux, de publicité et d'analyse, qui peuvent combiner
            celles-ci avec d'autres informations que vous leur avez fournies ou
            qu'ils ont collectées lors de votre utilisation de leurs
            services.</v-card-text
          >
          <v-spacer></v-spacer>
          <v-card-actions class="float-right">
            <v-btn color="red" class="white--text mt-4" @click="cookie = false">
              Refuser
            </v-btn>
            <v-btn
              color="green"
              class="white--text mt-4"
              @click="cookie = false"
            >
              Autoriser
            </v-btn></v-card-actions
          >
        </v-card>
      </v-alert></v-overlay
    >
  </div>
</template>
<script>
export default {
  name: "CookieBanner",
  data() {
    return {
      cookie: true,
    };
  },
};
</script>

<style>
.cookie {
  position: fixed !important;
  left: 0;
  bottom: 0;
  background-color: white;
  z-index: 1000;
}
.alert-cookie {
  width: 300px;
}
@media screen and (min-width: 768px) {
  .alert-cookie {
    width: 500px;
  }
}
</style>
