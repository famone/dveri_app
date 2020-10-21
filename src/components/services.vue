<template>


  <section>
      <div class="container">
        <div class="col-lg-12">
          <h2>Дополнительные услуги:</h2>
        </div>




<div class="row">

                    <div class="col-lg-12">
                      <v-data-table
                        :headers="headers"
                        :items="dopServices"
                        :loading="loadServ"
                        class="elevation-1"
                      >

                        <template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2">mdi-pencil</v-icon>
                          <v-icon small >mdi-delete</v-icon>
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
      dopServices: [],
      loadServ: true,
      dialog: false,
      brand: '',
      load: true,
      categorys: [],
      dialogDelete: false,
      headers: [
        {text: 'Название услуги',align: 'start',value: 'name',},
        { text: 'Стоимость', sortable: false, value: 'price' },
        { text: 'Редактировать', value: 'actions', sortable: false }
      ]
    }),

    computed: {
      
    },
    created(){
      // дополнительные услуги
      axios
      .get('https://door.webink.site/wp-json/door/v1/get/dopserv')
      .then(response =>{
        this.dopServices = response.data
        this.loadServ = false
        console.log(this.dopServices)
      })

    },
    methods: {
        
    },
  }
</script>