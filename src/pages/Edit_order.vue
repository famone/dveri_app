<template>
	<section>
		
		<div class="container">

			<div class="col-lg-12">
					<v-btn depressed color="primary" @click="$router.go(-1)">
						<v-icon>mdi-arrow-left</v-icon> 
					Назад</v-btn>
					<h2>Редактирование заказа № {{routeId}}</h2>
					
				</div>

			<v-skeleton-loader v-if="loading" class="mx-auto" width="100%" type="card">
			</v-skeleton-loader>
			<br><br>
			<v-skeleton-loader v-if="loading" class="mx-auto" width="100%" type="card">
			</v-skeleton-loader>
			<br><br>
			<v-skeleton-loader v-if="loading" class="mx-auto" width="100%" type="card">
			</v-skeleton-loader>

			<div class="row" v-else>

				

			<div class="row shad-box">
				<div class="col-lg-12">
					<h3><span class="mdi mdi-account-multiple-outline"></span> Персональная информация:</h3>
				</div>
				<div class="col-lg-6">
					<v-text-field label="ФИО" v-model="EditingOrder.fio"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Телефон" v-model="EditingOrder.phone" v-mask="'+7 (###) ###-##-##'"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Дополнительный телефон" 
					v-model="EditingOrder.dop_phone" 
					v-mask="'+7 (###) ###-##-##'"></v-text-field>
				</div>
				<div class="col-lg-3">
					<v-text-field label="Улица" v-model="EditingOrder.street"></v-text-field>
				</div>
				<div class="col-lg-2">
					<v-text-field label="Номер дома" v-model="EditingOrder.house"></v-text-field>
				</div>
				<div class="col-lg-2">
					<v-text-field label="Квартира" v-model="EditingOrder.flat"></v-text-field>
				</div>
				
				<div class="col-lg-2">
					<v-text-field label="Этаж" v-model="EditingOrder.floor"></v-text-field>
				</div>

				<div class="col-lg-3">
					<p>Часть города:</p>
					<v-radio-group v-model="EditingOrder.part_city" row>
				      <v-radio label="Север" value="Север"></v-radio>
				      <v-radio label="Юг" value="Юг"></v-radio>
				    </v-radio-group>
				</div>
			</div>		




			<!--  -->



			<div class="row shad-box">
				<div class="col-lg-12">
					<h3><span class="mdi mdi-cart-outline"></span> Информация о товаре:</h3>
				</div>
				<!-- <div class="col-lg-3">
					<v-select :items="doorsCategory" 
					item-text="name" 
					label="Группа двери продавца"
					v-model="doorGroup"
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
					<v-select :items="items" label="Группа двери руководителя" v-model="groopRuk"></v-select>
				</div>
				<div class="col-lg-3">
					<v-select :items="items" label="Модель двери руководителя" v-model="modelRuk"></v-select>
				</div> -->

				<!--  -->
			
				<!-- <div class="col-lg-3">
					<v-select :items="EditingOrder.door_size" 
					label="Размер двери"
					@change="showPrice($event)"
					return-object
					></v-select>
				</div> -->
				<div class="col-lg-3">
					<p>Сторона открывания:</p>
					<v-radio-group v-model="EditingOrder.door_direction" row>
				      <v-radio label="Лево" value="Лево"></v-radio>
				      <v-radio label="Право" value="Право"></v-radio>
				    </v-radio-group>
				</div>
				<!-- <div class="col-lg-3">
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
				</div> -->
				
			</div>



				<!--  -->










			</div>
		</div>
	</section>


</template>

<script>
import {mapState, mapGetters} from 'vuex'
import axios from 'axios'

export default{
	data(){
		return{
			loading: true,
			routeId: '',
			EditingOrder: {
				fio: '',
				phone: '',
				dop_phone: '',
				street: '',
				house: '',
				flat: '',
				floor: '',
				part_city: '',

				door_direction: '',
			}
		}
	},
	computed: {
		
	},
	created(){
		this.routeId = this.$route.params.id

		axios
          .get("https://door.webink.site/wp-json/door/v1/get/sales")
          .then((response) => {
            this.EditingOrder = response.data.find(item => item.id == this.routeId)
            console.log(this.EditingOrder)
            this.loading = false
         });
		

	}
}
</script>