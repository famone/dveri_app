<template>
  <v-data-table
    :headers="headers"
    :items="filteredItems"
    :loading="loadDoors"
    sort-by="id"
    single-line
    class="elevation-1 rounded-lg"
  >
    <!-- @click:row="handleClick" -->
    <template v-slot:item.id="{ item }">
      <v-chip :color="getColor(item.status)" dark>
        {{ item.id }}
      </v-chip>
    </template>




    <template v-slot:item.date_mont="{ item }">

               <span>{{ item.date_mont }}</span> 
               <span v-if="item.time_mont">, {{item.time_mont}}</span>
        
      </v-chip>
    </template>









     <template v-slot:item.data_zamera="{ item }">
        <span>{{ item.data_zamera }}</span> 
        <span v-if="item.vremya_zamera">, {{item.vremya_zamera}}</span>
      </v-chip>
    </template>


    <template v-slot:item.zamershik="{ item }">
      <v-select v-if="!item.zamershik.name" :items="['вася', 'петя']" label="Выбрать" style="font-size: 12px!important;"></v-select>
      <span v-else>{{item.zamershik.name}}</span>
    </template>




    <template v-slot:item.adres="{ item }">
      <v-avatar :color="getPart(item.part_city)" size="15"></v-avatar>
         {{ item.adress }} {{ item.house }} {{ item.flat }}        
    </template>

    <template v-slot:item.zamershik.name="{ item }">
      <!-- TODO: если поле пустое должна быть надпись установить замерщика и выскакивать поп ап с выбором замерщика -->
         {{ item.zamershik.name }}
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Заказы</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-toolbar-title>Сегодня: 18.10.2020</v-toolbar-title>
         <v-divider class="mx-4" inset vertical></v-divider>

        <v-select label="Выберите город" style="margin-bottom: -15px;" :items="cities" v-model="city"></v-select>

        <v-spacer></v-spacer>
        <router-link tag="a" to="/neworder">
          <v-btn depressed color="primary"><v-icon>mdi-playlist-plus</v-icon> Новый заказ</v-btn>
        </router-link>



        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Вы точно хотите удалить этот заказ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
              <v-btn color="blue darken-1" v-model="deliting" text @click="deleteItemConfirm(deliting)">Удалить</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>



       
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <router-link tag="a" :to=" '/edit_order/' + item.id ">
        <v-icon small class="mr-2"> mdi-pencil </v-icon>
      </router-link>
      
      <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>

    </template>
    <template v-slot:no-data>
      <v-btn color="primary"> Reset </v-btn>
    </template>
  </v-data-table>
</template>


	<script>
import axios from "axios";
import { mapState } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    menu2: false,
    doMont: '',
    deliting: '',
    cities: ['Все', 'Санкт-Петербург', 'Москва'],
    city: '',
    headers: [
      { text: "Ред.", value: "actions", sortable: false },
      { text: "№", value: "id" },
      { text: "Желаемая дата монтажа", value: "date_mont" },
      { text: "Желаемая дата замера", value: "data_zamera" },
      { text: "БР", value: "brigada_mont.name" },
      { text: "Адрес", value: "adres" },
      { text: "ФИО", value: "fio" },
      { text: "Телефон", value: "phone" },
      { text: "Продавец", sortable: true, value: "saler.name" },
      { text: "Дата", value: "date" },
      { text: "Модель двери продавца", value: "model_saler.name" },
      { text: "Модель двери рук", value: "" },
      { text: "Размер двери", value: "door_size" },
      { text: "Сторона откр", value: "door_direction" },
      { text: "Размер проема", value: "proem_size" },
      { text: "Замерщик", value: "zamershik" },
      { text: "Цена диллера", value: "cost_diler" },
      { text: "Сумма премии", value: "sum_premia" },
      { text: "Премия ВДЗ", value: "vdz_premia" },
      { text: "Примечание продавца", value: "prim_saler" },
      { text: "Примечание Руководителя", value: "prim_rukvod" },
    ],
    editedIndex: -1,
    
  }),

  computed: {
    ...mapState('zakaz', ['doors', 'loadDoors']),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    filteredItems() {
      if(this.city === 'Все'){
        return this.doors
      }else{
          return this.doors.filter((i) => {
            return !this.city || (i.city === this.city);
         })
      }
    },
  },
  created() {
    // api

    this.$store.dispatch('zakaz/getDoors');
  },

  methods: {
        setMont(n){
          alert('asdas')
          console.log(n)
        },
        getColor(status) {
          if (status === 'pending') return "red";
          else if (status === 'processing') return "orange";
          else return "green";
        },
        getPart(part){
          if (part === 'Север') return "primary";
          else if(part === 'Юг') return "orange";
          else return "grey"
        },
        deleteItem(item){

          this.dialogDelete = true
          this.deliting = item

        },
        closeDelete(){
           this.dialogDelete = false
           this.deliting = ''
        },
        deleteItemConfirm(item){
          this.$store.dispatch('zakaz/startLoader')
          this.$store.dispatch('zakaz/deliteZakaz', item);
          this.dialogDelete = false
           this.deliting = ''
        }

  }
};
</script>

<style>
table td{
  font-size: 14px!important;
  font-weight: 500;
}
table th{
  font-size: 14px!important;
}
</style>