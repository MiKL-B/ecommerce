<template>
  <div>
   
    <v-footer dark padless>
      <v-card flat tile class=" lighten-1 white--text text-center">

        <v-card-text>
          <p>Vous pouvez me contacter à cette adresse</p>
          <a href="#" class="text-decoration-underline">contact@mail.com</a>
        </v-card-text>
        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>
        <v-card-text class="pt-0"
          ><router-link class="text-decoration-underline" to="/mentions"
            >Mentions légales</router-link
          ></v-card-text
        >
        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Website</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "FooterMenu",
  data: () => ({
  }),
};
</script>
