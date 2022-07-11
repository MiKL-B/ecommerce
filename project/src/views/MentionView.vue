<template>
  <div class="mention padding-container">
    <v-container>
      <h2>Mentions légales</h2>
      <v-list>
        <!-- mentions légales -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Mentions légales</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- article 0 -->
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Article 0 - Préambule</v-list-item-title>
            <p class="grey--text my-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
              veniam et in, nostrum quibusdam laudantium pariatur non nobis?
              Earum accusamus vitae iure eaque amet quos laboriosam repellendus
              labore, provident temporibus.
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MentionView",
};
</script>
