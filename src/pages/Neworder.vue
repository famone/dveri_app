<template>
	<section>
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<v-btn depressed color="primary" @click="$router.go(-1)">
						<v-icon>mdi-arrow-left</v-icon> 
					Назад</v-btn>
					<h2>Создание заказа</h2>
					
				</div>
			</div>

			<div class="row shad-box">
				<div class="col-lg-12">
					<h3><span class="mdi mdi-account-multiple-outline"></span> Персональная информация:</h3>
				</div>
				<div class="col-lg-6">
					<v-text-field label="ФИО" v-model="fio"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Телефон" v-model="phone" v-mask="'+7 (###) ###-##-##'"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Дополнительный телефон" 
					v-model="dop_phone" 
					v-mask="'+7 (###) ###-##-##'"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Улица" v-model="street"></v-text-field>
				</div>
				<div class="col-lg-2">
					<v-text-field label="Номер дома" v-model="house"></v-text-field>
				</div>
				<div class="col-lg-2">
					<v-text-field label="Квартира" v-model="flat"></v-text-field>
				</div>
				<!--  -->
				<div class="col-lg-2">
					<v-text-field label="Этаж" v-model="floor"></v-text-field>
				</div>
				
				
				<div class="col-lg-3">
					<p>Часть города:</p>
					<v-radio-group v-model="part_city" row>
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
					<v-select :items="doorsCategory" 
					item-text="name" 
					label="Группа двери продавца"
					@change="changeModel($event)"
					return-object></v-select>
				</div>
				<div class="col-lg-3">
					<v-select :items="doorsModels" 
					item-text="name"
					v-model="doorModel"
					@change="changeSize($event)"
					return-object
					label="Модель двери продавца"></v-select>
				</div>
				<div class="col-lg-3">
					<v-select :items="doorsCategory" 
					item-text="name" 
					label="Группа двери руководителя" 
					v-model="groopRuk"
					@change="changeModelRuk($event)"
					return-object></v-select>
				</div>
				<div class="col-lg-3">
					<v-select :items="modelsRuk" 
					item-text="name" 
					item-value="id" 
					label="Модель двери руководителя" 
					v-model="modelRuk"></v-select>
				</div>
				<!--  -->
			
				<div class="col-lg-3">
					<v-select :items="doorSizes" 
					label="Размер двери"
					@change="showPrice($event)"
					return-object
					></v-select>
				</div>
				<div class="col-lg-3">
					<p>Сторона открывания:</p>
					<v-radio-group v-model="sideOpen" row>
				      <v-radio label="Лево" value="Лево"></v-radio>
				      <v-radio label="Право" value="Право"></v-radio>
				    </v-radio-group>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Размер проема" v-model="proemSize"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Номер двери" v-model="doorNumber"></v-text-field>
				</div>


				<div class="col-lg-6">
					<v-textarea label="Примечание продавца:" rows="1" prepend-icon="mdi-comment"
					v-model="primecProd">
					</v-textarea>
				</div>
				<div class="col-lg-6">
					<v-textarea label="Примечание руководителя:" rows="1" prepend-icon="mdi-comment"
					v-model="primecRuk">
					</v-textarea>
				</div>
				
			</div>
				<!--  -->

			<div class="row shad-box">
				<div class="col-lg-12">
					<h2><span class="mdi mdi-bookmark-plus-outline"></span> Дополнительные работы:</h2>
				</div>
				<div class="col-lg-12">
					<div class="row repeater" v-for="(dop, index) in dopolnServ" :key="index">
						<div class="col-lg-4">
							<v-select
								:items="dopServArray" 
								label="Доп услуга" 
								item-text="name"
								item-value="price"
						        @change="atInput(index, $event)"
						        return-object
								></v-select>
						</div>
						<div class="col-lg-2">
							<v-text-field type="number"  label="Количество" v-model="dop.count"></v-text-field>
						</div>	
						<div class="col-lg-3">
							<v-text-field label="Стоимость руб." v-model="dop.price"></v-text-field>
						</div>
						<div class="col-lg-2">
							<v-btn depressed color="error" class="m-15" @click="deliteDop(index)">
								<v-icon left>mdi-delete</v-icon>Удалить</v-btn>
						</div>
					</div>
					<v-btn depressed color="primary" @click="addDop()" >
						<v-icon left>mdi-cart-plus</v-icon>Добавить
					</v-btn>
				</div>
			</div>

			<!--  -->

			<div class="row shad-box">
				<div class="col-lg-12">
					<h2><span class="mdi mdi-bookmark-plus-outline"></span> Замер и монтаж:</h2>
				</div>

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

				<div class="col-lg-3">
					<v-select label="Замерщик"
					:items="zamershiks"
					item-text="fname"
					item-value="id"
					@change="setZamer($event)"
					return-object></v-select>
				</div>

				<div class="col-lg-3">
					<v-menu
			        ref="menu2"
			        v-model="menu2"
			        :close-on-content-click="false"
			        :return-value.sync="dateMont"
			        transition="scale-transition"
			        offset-y
			        min-width="290px">
					        <template v-slot:activator="{ on, attrs }">
					          <v-text-field
					            v-model="dateMont"
					            label="Желаемая дата монтажа"
					            prepend-icon="mdi-calendar"
					            readonly
					            v-bind="attrs"
					            v-on="on"
					          ></v-text-field>
					        </template>
			        <v-date-picker v-model="dateMont" no-title scrollable>
			          <v-spacer></v-spacer>
			          <v-btn text color="primary" @click="menu2 = false">Отмена</v-btn>
			          <v-btn text color="primary" @click="$refs.menu2.save(dateMont)">Ок</v-btn>
			        </v-date-picker>
			      </v-menu>
				</div>

				<div class="col-lg-3">
					<v-select :items="brigadi" 
					label="Бригада"
					item-text="title"
					item-value="id"
					@change="setTeam($event)"></v-select>
				</div>
			</div>
	
			<div class="row shad-box">
				<div class="col-lg-12">
					<h2><span class="mdi mdi-sale"></span> Итого:</h2>
				</div>

				<div class="col-lg-3">
					<v-select :items="payments_metod" v-model="spayments_metod" label="Тип расчета"></v-select>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Цена продавца со скидкой" v-model="prod_sale"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Цена двери руководителя" v-model="ruk_cena"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Стоимость замера, доставки и установки" v-model="delivery"></v-text-field>
				</div>

				
				<div class="col-lg-2">
					<v-text-field label="Предоплата" v-model="predoplata"></v-text-field>
				</div>
					
				<div class="col-lg-2">
					<v-text-field label="Скидка"  v-model="sale"></v-text-field>
				</div>
				<div class="col-lg-2">
					<v-text-field label="Итого" v-model="doorPrice"></v-text-field>
				</div>
			</div>

			<div class="row shad-box">

				<div class="col-lg-3">
				<div class="col-lg-12">
					<h2><span class="mdi mdi-bookmark-outline"></span> Заявка:</h2>
				</div>
				<div class="col-lg-12">
					<v-select :items="statuses" v-model="status_zayavka" label="Статус заявки"></v-select>
				</div>

				</div>

				<div class="col-lg-8">
					<div class="col-lg-12 ">
						<h2><span class="mdi mdi-sale"></span> Премия:</h2>
					</div>
				<div class="col-lg-4">
					<v-text-field label="Сумма премии" v-model="sum_premii"></v-text-field>
				</div>
				<div class="col-lg-4">
					<v-select :items="items" label="Статус премии" v-model="status_premii"></v-select>
				</div>
				</div>
				

			</div>

			<div class="row">
				<v-btn depressed x-large dark color="grey" class="m-15">НАЗАД</v-btn>
				<v-btn depressed x-large color="primary" class="m-15" :loading="loadBtn"
				@click="addNewOrder()">ДОБАВИТЬ ЗАКАЗ</v-btn>
			</div>

		</div>
	</section>
</template>	

<script>
import axios from 'axios'
import {mapState} from 'vuex'
	export default{
		data(){
			return{
				loadBtn:false,
				doorsCategory: [],
				doorsModels: [],
				items: ['Тест 1', 'Тест 2', 'Тест 3', 'Тест 4'],
				dateZamer: new Date().toISOString().substr(0, 10),
				dateMont: '',
				sideCity: '',
				menu: false,
				menu2: false,
				statuses: ['В обработке', 'Оплачено', 'На складе'],
				payments_metod: ['Наличными', 'Терминал', 'Оплата по безналичному расчету'],
				spayments_metod: '',
				dopServArray: [],
				dopolnServ: [],
				selectedModel: {},
				doorSizes: [],
				doorPrice: '', 
				zamershiks: [],
				brigadi: [],
				modelsRuk: [],
				// 
				fio: '',
				phone: '',
				dop_phone: '',
				street: '',
				house: '',
				flat: '',
				floor: '',
				part_city: '',
				doorGroup: '',
				doorModel: '',
				doorSize: '',
				groopRuk: '',
				modelRuk: '',
				sideOpen: '',
				proemSize: '',
				doorNumber: '',
				primecProd: '',		
				primecRuk: '',
				zamershik: '',
				team: '',
				status_zayavka: '',
				prod_sale: '',
				ruk_cena: '',
				delivery: '',
				predoplata: '',
				sale: '',
				sum_premii: '',
				status_premii: '',

			}
		},
		computed: {
			...mapState('auth', ['user'])
		},
		created(){
			// дополнительные услуги
			axios
			.get('https://door.webink.site/wp-json/door/v1/get/dopserv')
			.then(response =>{
				this.dopServArray = response.data
			})

			// категории дверей
			axios
			.get('https://door.webink.site/wp-json/door/v1/get/categorys')
			.then(response =>{
				
				this.doorsCategory = response.data
			})

			// замерщики
			axios
			.get('https://door.webink.site/wp-json/door/v1/get/users?type=zamershik')
			.then(response =>{
				
				this.zamershiks = response.data
			})

			// ,бригады
			axios
			.get('https://door.webink.site/wp-json/door/v1/get/teams')
			.then(response =>{
				this.brigadi = response.data
				console.log(this.brigadi)
			})
		},
		methods: {
			addDop(){
					this.dopolnServ.push({name: '', count:1 ,price: 0})
			},
			deliteDop(index){
				this.dopolnServ.splice(index, 1);
			},
			atInput(index, event){
				this.dopolnServ[index].name = event.name
				this.dopolnServ[index].count = event.count
				this.dopolnServ[index].price = event.price
			},
			changeModel(param){
				this.doorGroup = param.term_id
				
				this.doorModel = ''
				//получение доп услуг по производителю двери
				axios
				.get(`https://door.webink.site/wp-json/door/v1/get/models?proizvoditel=${param.term_id}`)
				.then(response =>{
					this.doorsModels = response.data
				})

				axios
				.get(`https://door.webink.site/wp-json/door/v1/get/dopserv?proizvoditel=${param.term_id}`)
				.then(response =>{
					this.dopServArray = response.data
				})
			},
			changeModelRuk(param){
				this.modelRuk = ''

				axios
				.get(`https://door.webink.site/wp-json/door/v1/get/models?proizvoditel=${param.term_id}`)
				.then(response =>{
					this.modelsRuk = response.data
				})
			},
			changeSize(sizes){
				this.selectedModel = sizes
				this.doorSizes = Object.keys(sizes.price)
			},
			showPrice(num){
				this.doorPrice = this.selectedModel.price[num]
				this.doorSize = num
			},
			setZamer(zam){
				this.zamershik = zam.id
			},
			setTeam(tm){
				this.team = tm
			},
			addNewOrder(){
				let newOrder = {
					fio: this.fio,
					phone: this.phone,
					dop_phone: this.dop_phone,
					street: this.street,
					house: this.house,
					flat: this.flat,
					floor: this.floor,
					part_city: this.part_city,
					doorGroup: this.doorGroup,
					doorModel: this.doorModel.id,
					doorSize: this.doorSize,
					groopRuk: this.groopRuk.term_id,
					modelRuk: this.modelRuk,
					sideOpen: this.sideOpen,
					proemSize: this.proemSize,
					doorNumber: this.doorNumber,
					primecProd: this.primecProd,		
					primecRuk: this.primecRuk,
					dopolnServ: this.dopolnServ,
					dateZamer: this.dateZamer,
					zamershik: this.zamershik,
					dateMont: this.dateMont,
					team: this.team,
					status_zayavka: this.status_zayavka,
					prod_sale: this.prod_sale,
					ruk_cena: this.ruk_cena,
					delivery: this.delivery,
					predoplata: this.predoplata,
					sale: this.sale,
					sum_premii: this.sum_premii,
					status_premii: this.status_premii,
					doorPrice: this.doorPrice,
					user_id: this.user.id
				}
				
				console.log(newOrder)

				this.loadBtn = true
				//отправить новый заказ

				axios
				.post('https://door.webink.site/wp-json/door/v1/add/sales', newOrder)
				.then(response =>{
					console.log(response)
					this.loadBtn = false;
					this.$router.push('/')
				})
			}
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