<template>
	<section>
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<h2>Создание заказа</h2>
					
				</div>
			</div>

			<div class="row shad-box">
				<div class="col-lg-12">
					<h3><span class="mdi mdi-account-multiple-outline"></span> Персональная информация:</h3>
				</div>
				<div class="col-lg-3">
					<v-select :items="items" label="Продавец"></v-select>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Улица"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Номер дома"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Квартира"></v-text-field>
				</div>
				<!--  -->
				<div class="col-lg-3">
					<v-text-field label="Этаж"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Телефон" v-mask="'+7 (###) ###-##-##'"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Дополнительный телефон" v-mask="'+7 (###) ###-##-##'"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="ФИО"></v-text-field>
				</div>
				<div class="col-lg-4">
					<p>Часть города:</p>
					<v-radio-group v-model="sideOpen" row>
				      <v-radio label="Север" value="Север"></v-radio>
				      <v-radio label="Юг" value="Юг"></v-radio>
				    </v-radio-group>
				</div>
			</div>


			<div class="row shad-box">
				<div class="col-lg-12">
					<h3><span class="mdi mdi-cart-outline"></span> Информация о товаре:</h3>
				</div>
				<div class="col-lg-3">
					<v-select :items="items" label="Группа двери продавца"></v-select>
				</div>
				<div class="col-lg-3">
					<v-select :items="items" label="Модель двери продавца"></v-select>
				</div>
				<div class="col-lg-3">
					<v-select :items="items" label="Группа двери руководителя"></v-select>
				</div>
				<div class="col-lg-3">
					<v-select :items="items" label="Модель двери руководителя"></v-select>
				</div>
				<!--  -->
				<div class="col-lg-3">
					<v-menu
			        ref="menu"
			        v-model="menu"
			        :close-on-content-click="false"
			        :return-value.sync="dateZamer"
			        transition="scale-transition"
			        offset-y
			        min-width="290px">
					        <template v-slot:activator="{ on, attrs }">
					          <v-text-field
					            v-model="dateZamer"
					            label="Желаемая дата замера"
					            prepend-icon="mdi-calendar"
					            readonly
					            v-bind="attrs"
					            v-on="on"
					          ></v-text-field>
					        </template>
			        <v-date-picker v-model="dateZamer" no-title scrollable>
			          <v-spacer></v-spacer>
			          <v-btn text color="primary" @click="menu = false">Отмена</v-btn>
			          <v-btn text color="primary" @click="$refs.menu.save(dateZamer)">Ок</v-btn>
			        </v-date-picker>
			      </v-menu>
				</div>
				<div class="col-lg-2">
					<v-select :items="items" label="Размер двери"></v-select>
				</div>
				<div class="col-lg-3">
					<p>Сторона открывания:</p>
					<v-radio-group v-model="sideOpen" row>
				      <v-radio label="Левая" value="Левая"></v-radio>
				      <v-radio label="Правая" value="Правая"></v-radio>
				    </v-radio-group>
				</div>
				<div class="col-lg-2">
					<v-text-field label="Размер проема"></v-text-field>
				</div>
				<div class="col-lg-2">
					<v-text-field label="Номер двери"></v-text-field>
				</div>


				<div class="col-lg-6">
					<v-textarea label="Примечание продавца:" rows="1" prepend-icon="mdi-comment">
					</v-textarea>
				</div>
				<div class="col-lg-6">
					<v-textarea label="Примечание руководителя:" rows="1" prepend-icon="mdi-comment">
					</v-textarea>
				</div>
				<div class="col-lg-4">
					<v-menu
			        ref="menu"
			        v-model="menu"
			        :close-on-content-click="false"
			        :return-value.sync="dateZamer"
			        transition="scale-transition"
			        offset-y
			        min-width="290px">
					        <template v-slot:activator="{ on, attrs }">
					          <v-text-field
					            v-model="dateZamer"
					            label="Желаемая дата замера"
					            prepend-icon="mdi-calendar"
					            readonly
					            v-bind="attrs"
					            v-on="on"
					          ></v-text-field>
					        </template>
			        <v-date-picker v-model="dateZamer" no-title scrollable>
			          <v-spacer></v-spacer>
			          <v-btn text color="primary" @click="menu = false">Отмена</v-btn>
			          <v-btn text color="primary" @click="$refs.menu.save(dateZamer)">Ок</v-btn>
			        </v-date-picker>
			      </v-menu>
				</div>
				<div class="col-lg-4">
					<v-select :items="items" label="Замерщик"></v-select>
				</div>
			</div>

			<!--  -->

			<div class="row shad-box">
				<div class="col-lg-12">
					<h3><span class="mdi mdi-bookmark-outline"></span> Заявка:</h3>
				</div>
				<div class="col-lg-6">
					<v-select :items="items" label="Замерщик"></v-select>
				</div>
				<div class="col-lg-6">
					<v-select :items="items" label="Статус заявки"></v-select>
				</div>
				<div class="col-lg-4">
					<v-text-field label="Цена продавца со скидкой"></v-text-field>
				</div>
				<div class="col-lg-4">
					<v-text-field label="Цена двери руководителя"></v-text-field>
				</div>
				<div class="col-lg-4">
					<v-text-field label="Стоимость замера, доставки и установки"></v-text-field>
				</div>

			</div>

				<!--  -->

			<div class="row shad-box">
				<div class="col-lg-12">
					<h2><span class="mdi mdi-bookmark-plus-outline"></span> Дополинтельные работы:</h2>
				</div>
				<div class="col-lg-12">
					<div class="row repeater" v-for="(dop, index) in dopolnServ" :key="index">
						<div class="col-lg-6">
							<v-select
								:items="dopServArray" 
								label="Доп услуга" 
								item-text="name"
								item-value="price"
						        @change="atInput(index, $event)"
						        return-object
								></v-select>
						</div>
						<div class="col-lg-3">
							<v-text-field label="Стоимость руб." v-model="dop.price"></v-text-field>
						</div>
						<div class="col-lg-2">
							<v-btn depressed color="error" class="m-15" @click="deliteDop(index)">
								<v-icon left>mdi-delete</v-icon>Удалить</v-btn>
						</div>
					</div>
					<v-btn depressed color="primary" @click="addDop()">
					<v-icon left>mdi-cart-plus</v-icon>Добавить</v-btn>
				</div>
			</div>


				<!--  -->

			<div class="row shad-box">
				<div class="col-lg-12">
					<h2><span class="mdi mdi-sale"></span> Итого:</h2>
				</div>
				<div class="col-lg-4">
					<v-text-field label="Предоплата"></v-text-field>
				</div>
				<div class="col-lg-4">
					<v-text-field label="Скидка"></v-text-field>
				</div>
				<div class="col-lg-4">
					<v-text-field label="Итого"></v-text-field>
				</div>
				<div class="col-lg-4">
					<v-text-field label="Сумма премии"></v-text-field>
				</div>
				<div class="col-lg-4">
					<v-select :items="items" label="Статус премии"></v-select>
				</div>

			</div>

			<div class="row">
				<v-btn depressed x-large dark color="grey" class="m-15">НАЗАД</v-btn>
				<v-btn depressed x-large color="primary" class="m-15">ДОБАВИТЬ ЗАКАЗ</v-btn>
			</div>

		</div>
	</section>
</template>	

<script>
import axios from 'axios'
	export default{
		data(){
			return{
				items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
				dateZamer: new Date().toISOString().substr(0, 10),
				sideOpen: 'Левая',
				sideCity: '',
				menu: false,
				rej: '',
				dopServArray: [	
					{
						name: 'Открываемость',
						price: 1200
					},
					{
						name: 'Раздвигаемость',
						price: 2500
					},
				],
				dopolnServ: [

				]
			}
		},
		methods: {
			addDop(){
				this.dopolnServ.push({name: '', price: 0})
				console.log(this.dopolnServ)
			},
			deliteDop(index){
				this.dopolnServ.splice(index, 1);
				console.log(this.dopolnServ)
			},
			atInput(index, event){
				this.dopolnServ[index].name = event.name
				this.dopolnServ[index].price = event.price
				console.log(this.dopolnServ)
			}
		},
		computed: {
			
		},
		created(){
			axios
			.get('https://door.webink.site/wp-json/door/v1/get/dopserv')
			.then(response =>{
				console.log(response.data)
				this.dopServArray = response.data
			})
		}
	}
</script>

<style>
	.v-input--selection-controls{
		margin-top: 5px!important;
	}
	.m-15{
		margin:15px;
	}
</style>