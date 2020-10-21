<template>


  <section>
      <div class="container">
        <div class="col-lg-12">
          <h2>Модели дверей:</h2>
        </div>
        <div class="row">



     
          


<div class="col-lg-12">
  <v-data-table
    :headers="headers"
    :items="filteredItems"
    :loading="loadModels"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-select 
      label="Производитель" 
      :items="categorys"
      v-model="brand"

    ></v-select>
        <v-spacer></v-spacer>
        



        <!-- <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Вы уверены?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Ок</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->

      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">

      <router-link tag="a" :to=" '/edit_model/' + item.id ">
        <v-icon small class="mr-2">mdi-pencil</v-icon>
      </router-link>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>

    </template>
    
  </v-data-table>
</div>



        </div>
      </div>
    </section>



  
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      brand: '',
      load: true,
      categorys: [],
      dialogDelete: false,
      headers: [
        {
          text: 'Производитель двери',
          align: 'start',
          sortable: false,
          value: 'category.name',
        },
        { text: 'Модель двери', sortable: false, value: 'name' },
        { text: 'Редактировать', value: 'actions', sortable: false }
      ]
    }),

    computed: {
      filteredItems() {
      if(this.brand === 'Все'){
        return this.models
      }else{
          return this.models.filter((i) => {
            return !this.brand || (i.category.name === this.brand);
         })
      }
    },
    ...mapState('zakaz', ['models', 'loadModels'])
    },
    created(){
      // категории


      axios 
      .get('https://door.webink.site/wp-json/door/v1/get/categorys')
      .then(response =>{
        response.data.forEach(item =>{
            this.categorys.push(item.name)
        })
           this.categorys.push('Все')
      })

      // модели
      this.$store.dispatch('zakaz/loadModels')

    },
    methods: {
        editItem (item) {
          console.log(item)
        }
    },
  }
</script>