<template>
  <div>
    <v-card class="mx-auto">
      <v-img
        class="white--text lighten-2 home-img"
        height="100vh"
        src="../assets/marche.webp"
        alt="home image"
      >
        <div class="home-content">
          <div class="home-text">
            <div class="home-title">
              <h1 class="white--text">Les huiles végétales</h1>
              <p>de graines germées</p>
            </div>
            <v-btn dark width="200px" 
              ><router-link to="/huiles" data-cy="shop"
                >découvrir nos huiles</router-link
              ></v-btn
            >
          </div>

          <v-card-text class="text"
            ><img src="../assets/new-logo-2022.webp" alt="logo huile vegetale"
          /></v-card-text>
        </div>
      </v-img>
    </v-card>
    <v-container>
      <!-- fabrication -->
      <section><FabricationSection></FabricationSection></section>
      <!-- valeurs -->
      <section><ValeurSection></ValeurSection></section>
      <!-- engagements -->
      <section><EngagementSection></EngagementSection></section>
    </v-container>
    <ContactSection></ContactSection>
  </div>
</template>

<script>
import FabricationSection from "@/components/FabricationSection.vue";
import ValeurSection from "@/components/ValeurSection.vue";
import EngagementSection from "../components/EngagementSection.vue";
import ContactSection from "../components/ContactSection.vue";
export default {
  name: "HomeView",
  data() {
    return {};
  },
  components: {
    FabricationSection,
    ValeurSection,
    EngagementSection,
    ContactSection,
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
