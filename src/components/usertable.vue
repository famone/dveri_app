<template>
<div>
  <v-data-table v-if="users" :headers="headers" :items="users" :loading="load" :footer-props="{'items-per-page-options': [20, 40, 60, -1]}">
    <template v-slot:item.name="{ item }">
      <v-avatar color="primary" size="25">
        <span class="white--text">{{ item.name }}</span>
      </v-avatar>
      <strong>{{ item.fname }}</strong>
    </template>

    <template v-slot:item.role="{ item }">
      <v-chip :color="getColor(item.role)" dark>
        {{ getName(item.role) }}
      </v-chip>
    </template>

    <template v-slot:item.premia="{ item }">
      <v-chip
        class="ma-2"
        :color="getPremia(item.premia)"
        label
        text-color="white"
      >
        <v-icon left>mdi-label</v-icon>
        {{ item.premia }}%
      </v-chip>
    </template>

    <template #item.lenter="{ item }">
      {{ item.lenter | formatDate("DD.MM.YYYY hh:mm:ss") }}
    </template>

    <template #item.actions="{ item }">
        <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
    </template>
    <template #item.id="{ item }">
        <router-link tag="div" :to="'/report/' + item.id">
         
            <v-chip color="primary" dark label>
              Отчет
            </v-chip>
        </router-link>
    </template>

    






  </v-data-table>
  <v-dialog v-model="delitPop" max-width="500px">
            <v-card>
              <v-card-title class="headline "
                >Удалить этого пользователя?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="delitPop = false"
                  >Отмена</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Удалить</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
</div> 
</template>		



<script>
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
  computed:{
    ...mapGetters({
      getUser: "auth/getUser"
    }),
  },
  props: {
    users: {
      required: true,
      type: Array,
    },
    load: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      delitPop: false,
      delitingItem: null,
      headers: [
        {text: 'Действия', value: "actions"},
        { text: "Пользователи", value: "fname" },
        { text: "Роль", value: "role" },
        { text: "Почта", value: "email" },
        { text: "Кол-во заказов", value: "zakaz" },
        { text: "Процент премии", value: "premia" },
        { text: "Последний визит", value: "lenter" },
        { text: "Посмотреть отчет", value: "id" },
      ],
    };
  },
  methods: {
    deleteItem(id){
      this.delitPop = true
      this.delitingItem = id
    },
    deleteItemConfirm(){
      this.delitPop = false
      this.$emit('deleteUser', this.delitingItem)
    },
    getColor(role) {
      if (role === "administrator") return "red";
      else if (role === "zamershik") return "orange";
      else return "green";
    },
    getPremia(protein) {
      if (protein > 15) return "green";
      else if (protein > 9) return "orange";
      else return "primary";
    },
    getName(role) {
      if (role === "administrator") return "Администратор";
      else if (role === "zamershik") return "Замерщик";
      else return "Менеджер";
    },
  },
};
</script>