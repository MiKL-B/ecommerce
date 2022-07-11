<template>
  <div class="errorview padding-container">
    <div>
      <h1>Oups !</h1>
      <p>La page que vous recherchez semble introuvable</p>
      <p>Voici un lien que vous pouvez visiter à la place</p>
      <v-btn dark width="200px"
        ><router-link to="/">accueil</router-link></v-btn
      >
    </div>
    <div><p class="error-number">404</p></div>
  </div>
</template>
<script>
export default {
  name: "ErrorView",
  data: () => ({}),
};
</script>
<style>
.errorview {
  display: grid;
  grid-template-columns: 1fr;
}
.errorview div {
  padding: 1rem;
}
.error-number {
  font-size: 100px;
}
@media screen and (min-width: 768px) {
  .errorview {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: relative;
    top: 50%;
    transform: perspective(1px) translateY(-50%);
  }
  .errorview div {
    margin: 0 auto;
  }
  .error-number {
    font-size: 300px;
  }
}
</style>
