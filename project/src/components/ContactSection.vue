<template>
  <div class="contact">
    <h3>Contact</h3>
    <span>Vous pouvez me contacter à cette adresse</span>
    <span class="my-4"
      ><a href="#" class="text-decoration-underline"
        >contact@mail.com</a
      ></span
    >
    <!--<a href="mailto:contact@hv_ak.com" class="text-decoration-underline"
        >contact@hv_ak.com</a
      >-->
  </div>
</template>

<script>
export default {
  name: "EngagementSection",
};
</script>

<style>
.contact {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 200px;
  background: var(--vert);
  color: white;
}
</style>
