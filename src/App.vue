<template>
 <v-app>

  <Header />








 <section>
   <div class="container-fluid">
      <datatable />
   </div>
 </section>


</v-app>
</template>

<script>
import Header from './components/Header.vue'
import datatable from './components/datatable.vue'
import {mapState} from 'vuex'
import './assets/css/style.css';
import axios from 'axios'

export default {
  components: {Header, datatable},
 data(){
  return{
   

  }
 },
}
</script>

<style>

</style>

