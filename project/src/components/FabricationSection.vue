<template>
  <div class="fabrication">
    <div>
      <img class="fabrication-img" src="" alt="fabrication" />
    </div>
    <div>
      <h2>Processus ...</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex fugiat ab
        reprehenderit illo, blanditiis quisquam deleniti atque debitis porro
        numquam aperiam et id repellat expedita libero ducimus molestias saepe.
        Architecto?
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
