<template>
  <v-app>
    <Header />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import "./assets/css/style.css";

export default {
  components: { Header },
};
</script>