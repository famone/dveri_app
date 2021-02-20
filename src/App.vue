<template>
  <v-app>
    <Header />
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Header from "./components/Header";
import "./assets/css/style.css";

export default {
  components: { Header },

  methods: {
    ...mapActions({
      LOAD_MODELS: "zakaz/LOAD_MODELS",
      LOAD_SERVICES: "zakaz/LOAD_SERVICES",
      UPDATE_TEAMS: "zakaz/UPDATE_TEAMS",
      UPDATE_ZAMERSHIKI: "zakaz/UPDATE_ZAMERSHIKI",
    }),
  },

  async mounted() {
    this.LOAD_MODELS();
    this.LOAD_SERVICES();
    this.UPDATE_TEAMS();
    this.UPDATE_ZAMERSHIKI();
  },
};
</script>