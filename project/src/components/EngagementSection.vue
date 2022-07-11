<template>
  <div class="engagement">
    <div>
      <img
        class="engagement-img"
        src="../assets/presse.webp"
        alt="engagement"
      />
    </div>
    <div>
      <h2>Nos engagements</h2>
      <ul>
        <li>Respecter et préserver la biodiversité</li>
        <li>Ecouter, rassurer et etre transparent</li>
        <li>
          Récupérer, recycler et valoriser les déchets des producteurs agricoles
          (drêches, jus de fruits, crêmes de cassis, framboise, vin, etc.)
        </li>
        <li>
          Assurer une production locale de façon mécanique pour limiter notre
          impact carbone
        </li>
        <li>
          Promouvoir et vulgariser les nouvelles découvertes scientifiques en
          matière d’alimentation santé
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "EngagementSection",
};
</script>

<style>
.engagement {
  display: grid;
  grid-template-columns: 1fr;
  margin: 2rem 0;
}
.engagement div {
  margin: 0 auto;
}
.engagement-img {
  width: 200px;
  height: auto;
}
@media screen and (min-width: 768px) {
  .engagement {
    grid-template-columns: repeat(2, 1fr);
    margin: 4rem 0;
  }
  .engagement-img {
    width: 350px;
    height: auto;
  }
}
</style>
