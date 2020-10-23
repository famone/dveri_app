<template>
	<v-dialog v-model="newuser" max-width="800px">
          <v-card style="padding: 30px;">
            <h3 class="text-center">Новый пользователь</h3>
            <br>
            <div class="row">
            	<div class="col-lg-6">
            		<v-text-field v-model="fio" label="Имя и фамилия" required ></v-text-field>
            	</div>
            	<div class="col-lg-6">
            		<v-text-field v-model="email" label="Почта" required ></v-text-field>
            	</div>
            	<div class="col-lg-3">
            		<v-text-field v-model="nickname" label="Никнейм (2 буквы)" required ></v-text-field>
            	</div>
            	<div class="col-lg-3">
            		<v-select :items="['Администратор', 'Менеджер', 'Замерщик']"
            		v-model="role" label="Роль"></v-select>
            	</div>
            	<div class="col-lg-3">
            		<v-select :items="['Санкт-Петербург', 'Москва']"
            		v-model="city" label="Город"></v-select>
            	</div>
            	<div class="col-lg-3">
            		<v-select v-model="premia" :items="[5, 10, 15, 20]" label="Размер премии"></v-select>
            	</div>
            	<div class="col-lg-12 text-center">
            		<v-btn color="blue darken-1" text @click="closePop($emit)" >Отмена</v-btn><!--  @click="closeDelete" -->
              		<v-btn color="primary" @click="setNewUser($emit)">Добавить</v-btn>
            	</div>
            </div>	
          </v-card>
        </v-dialog>
</template>

<script>
	export default{
		props: {
			newuser:{
				required: true,
				type: Boolean
			}
		},
		data(){
			return{
				fio: '',
				nickname: '',
				email: '',
				role: '',
				city: '',
				premia: ''
			}
		},
		methods: {
			closePop(){
				this.$emit('closePop');
			},
			setNewUser(deliting){

				let newUser = {
					fio: this.fio,
					nickname: this.nickname,
					email: this.email,
					role: this.role,
					city: this.city,
					premia: this.premia
				}

				this.$emit('setUser', newUser);

			}
		}
	}
</script>