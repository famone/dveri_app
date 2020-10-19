<template>
	<v-data-table
    :headers="headers"
    :items="desserts"
  >


  <template v-slot:item.name="{ item }">
     
      <v-avatar color="primary" size="25">
      		<span class="white--text">{{ item.nickname }}</span>
  	  </v-avatar> <strong>{{item.name}}</strong>
    </template>



    <template v-slot:item.calories="{ item }">
      <v-chip
        :color="getColor(item.calories)"
        dark
      >
        {{ item.calories }}
      </v-chip>
    </template>


    <template v-slot:item.protein="{ item }">
      <v-chip class="ma-2" :color="getPremia(item.protein)" label text-color="white">
      	<v-icon left>mdi-label</v-icon>
      	{{item.protein}}%
    </v-chip>
    </template>





  </v-data-table>
</template>		



<script>
  export default {
    data () {
      return {
        headers: [
          {text: 'Пользователи', value: 'name'},
          { text: 'Роль', value: 'calories' },
          { text: 'Почта', value: 'fat' },
          { text: 'Кол-во заказов', value: 'carbs' },
          { text: 'Процент премии', value: 'protein' },
          { text: 'Последний визит', value: 'iron' },
        ],
        desserts: [
          {
          	id: 1,
            name: 'Vadim Polh',
            nickname: 'pv',
            calories: 'Администратор',
            fat: 'polh@webink.site',
            carbs: 24,
            protein: 20 ,
            iron: '2020-10-15 14:05:57',
          },
          {
          	id: 2,
            name: 'Konstantin Timofeev',
            nickname: 'kt',
            calories: 'Менеджер',
            fat: 'kt@webink.site',
            carbs: 37,
            protein: 10 ,
            iron: '2020-10-15 14:05:57',
          },
          {
          	id: 2,
            name: 'Глеб (хуже всех)',
            nickname: 'ge',
            calories: 'Продавец',
            fat: 'gleb@webink.site',
            carbs: 3,
            protein: 2 ,
            iron: '2020-10-15 14:05:57',
          },
        ],
      }
    },
    methods: {
      getColor (calories) {
        if (calories === 'Администратор') return 'red'
        else if (calories === 'Менеджер') return 'orange'
        else return 'green'
      },
  	getPremia(protein) {
  		if(protein > 15) return 'green'
  		else if (protein > 9) return 'orange'
  			else return 'primary'
    }
  }
}
</script>