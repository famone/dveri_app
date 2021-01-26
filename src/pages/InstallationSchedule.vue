<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    single-line
    must-sort
    class="elevation-1 rounded-lg ma-4"
  >
    <template #top>
      <v-container fluid>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-select
              placeholder="Выберите бригаду"
              :items="teams"
              v-model="title"
              item-text="name"
              return-object
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "InstallationSchedule",

  data() {
    return {
      teams: [],
      team: null,
      headers: [
        { text: "Адрес", value: "adress" },
        { text: "Телефон", value: "phone" },
        { text: "Модель двери", value: "door_model" },
        { text: "Размер / Сторона", value: "door_size" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      sales: "zakaz/GET_SALES",
    }),
  },

  methods: {
    ...mapActions({
      fetchDoors: "zakaz/getDoors",
    }),
  },

  async created() {
    await this.fetchDoors();
    await axios
      .get("https://door.webink.site/wp-json/door/v1/get/teams")
      .then((response) => {
        this.teams = response.data;
      });
    // let teams;

    this.sales.forEach((sale) => {});
  },
};
</script>

<style>
</style>