<template>
  <div>
    <v-footer dark padless>
      <v-card flat tile class="lighten-1 white--text text-center" width="100%">
        <v-card-text>
          <router-link to="/" title="accueil">
            <img src="" alt="logo"
        
          />
              <!--<img src="../assets/new-logo-2022.webp" alt="logo"-->
          </router-link>
        </v-card-text>
        <v-card-text class="pt-0"
          ><router-link class="text-decoration-underline" to="/mentions"
            >Mentions légales</router-link
          ></v-card-text
        >
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "FooterMenu",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
