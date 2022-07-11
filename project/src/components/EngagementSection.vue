<template>
  <div class="engagement">
    <div>
      <img class="engagement-img" src="" alt="engagement" />
    </div>
    <div>
      <h2>Nos engagements</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
        recusandae repellat. Assumenda similique error blanditiis maiores, quod
        pariatur voluptates explicabo unde voluptatum, eveniet nostrum, hic
        eaque! Dolorum, aut ratione! Corporis.
      </p>
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
