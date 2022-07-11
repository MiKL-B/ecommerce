<template>
  <div class="fabrication">
    <div>
      <img
        class="fabrication-img"
        src="../assets/chardon.webp"
        alt="fabrication"
      />
    </div>
    <div>
      <h2>Processus de fabrication</h2>
      <p>Pourquoi faire activer les oléagineux et germer les graines ?</p>
      <p>
        L’activation est un procédé de trempage des graines et oléagineux dans
        le but d'amorcer le début de germination Celle-ci permet la
        décomposition de grosses molécules complexes en micronutriments simples
        facilement assimilables par l’organisme Ce pré-traitement permet
        d’augmenter leur potentiel nutritionnel et de profiter de leurs
        bienfaits.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FabricationSection",
};
</script>

<style>
.fabrication {
  display: grid;
  grid-template-columns: 1fr;
  margin: 2rem 0;
}
.fabrication div {
  margin: 0 auto;
}
.fabrication-img {
  width: 250px;
  height: auto;
}

@media screen and (min-width: 768px) {
  .fabrication {
    grid-template-columns: repeat(2, 1fr);
    margin: 4rem 0;
  }
}
</style>
