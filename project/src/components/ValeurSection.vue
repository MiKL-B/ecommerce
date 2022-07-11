<template>

    <div class="valeur">
      <div>
        <h2>Qui sommes nous ? Et nos valeurs ?</h2>
        <span
          >Nous sommes une entreprise créee en 2022 basée à NANCY Notre ambition
          est de vous :</span
        >
        <ul>
          <li>
            Proposer des huiles vierges de qualité, à partir des graines germées
            et oléagineux activés
          </li>
          <li>
            De travailler le plus souvent possible avec des producteurs locaux
          </li>
          <li>
            Faire découvrir d’autres huiles végétales vierges issues des graines
            et oléagineux produits sur d’autres continents (Afrique, ...)
          </li>
          <li>
            Garantir la qualité et le fraîcheur de nos huiles produites :Leur
            mode de production en petite quantité réduit leur temps de stockage
          </li>
        </ul>
        <v-carousel hide-delimiters width="100%" class="carousel">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </div>

  </div>
</template>

<script>
import huiles from "../assets/huiles.webp";
import graines from "../assets/graines.webp";
import tables from "../assets/tables.webp";
export default {
  name: "ValeurSection",
  data() {
    return {
      items: [
        {
          src: huiles,
        },
        {
          src: graines,
        },
        {
          src: tables,
        },
      ],
    };
  },
};
</script>

<style>

.valeur {
  display: grid;
  grid-template-columns: 1fr;
  margin: 2rem 0;
}
.valeur div {
  margin: 1rem auto;
}

.carousel .v-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
}
@media screen and (min-width: 768px) {
  .valeur {
    margin: 4rem 0;
  }

  .carousel .v-image {
    width: 100%;
    height: 500px;
    width: 500px;
    display: flex;
  }
}
</style>
