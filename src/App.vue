<template>
 <v-app>

  <Header />




<router-view></router-view>





</v-app>
</template>

<script>
import Header from './components/Header.vue'
import {mapState} from 'vuex'
import './assets/css/style.css';
import axios from 'axios'

export default {
  components: {Header},
 data(){
  return{
   

  }
 },
}
</script>

<style>

</style>

