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
export default {
  name: "InstallationSchedule",

    computed:{
        headers(){
            return [
               {
                    name: 'Honeycomb',
            category: 'Toffee',
            dairy: 'No'
                } 
            ]
        }
    }
};

created(){

}
</script>

<style>
</style>