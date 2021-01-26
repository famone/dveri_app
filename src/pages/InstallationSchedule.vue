<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    single-line
    must-sort
    class="elevation-1 rounded-lg"
    sort-by="name"
    group-by="category"
    show-group-by
  >
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "InstallationSchedule",

  computed: {
    ...mapGetters({
      sales: "zakaz/GET_SALES",
    }),
    headers() {
      return [];
    },
  },

  methods: {
    ...mapActions({
      fetchDoors: "zakaz/getDoors",
    }),
  },

  async created() {
    await this.fetchDoors();
  },
};
</script>

<style>
</style>