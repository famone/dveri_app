<template>

	<section>
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<v-btn depressed color="primary" @click="$router.go(-1)">
						<v-icon>mdi-arrow-left</v-icon> 
					Назад</v-btn>
					<h2>{{getModelEdit(routeId).category.name}}</h2>
					<h3>{{getModelEdit(routeId).name}}</h3>
				</div>
			</div>


			<div class="row shad-box">
				<div class="col-lg-12">
					<h2><span class="mdi mdi-arrow-all"></span> Размеры:</h2>
				</div>

				<div class="col-lg-12">
					<div class="row repeater" v-for="(model, index) in modelsArray">
						<div class="col-lg-3">
							<v-text-field type="number" v-model="model.size"  label="Размер"></v-text-field>
						</div>
						<div class="col-lg-3">
							<v-text-field type="number" v-model="model.price" label="Цена"></v-text-field>
						</div>
						<div class="col-lg-3">
							<v-btn depressed color="error" class="m-15" @click="deliteModel(index)">
								<v-icon left>mdi-delete</v-icon>Удалить
							</v-btn>
						</div>
					</div>
					<v-btn depressed color="primary" @click="addModel()" >
						<v-icon left>mdi-cart-plus</v-icon>Добавить
					</v-btn>
				</div>
			</div>


			<div class="row">
				<v-btn depressed x-large dark color="grey" class="m-15">НАЗАД</v-btn>
				<v-btn depressed x-large color="primary" class="m-15"
				@click="changeModels()">Сохранить изменения</v-btn>
			</div>



		</div>
	</section>

</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

export default{
	data(){
		return{
			routeId: '',
			modelsArray: []
			
		}
	},
	computed: {
		...mapGetters('zakaz', ['getModelEdit'])
	},
	created(){
		// модели
      	this.$store.dispatch('zakaz/loadModels')
		this.routeId = this.$route.params.id

		let newKey = Object.keys(this.getModelEdit(this.routeId).price)
		let newVal = Object.values(this.getModelEdit(this.routeId).price)

		newKey.forEach(item => {
			this.modelsArray.push({size: item, price: '' })
		})

		for (let i = 0; i < newVal.length; i++){
			this.modelsArray[i].price = newVal[i]
		}

	},
	methods: {
		addModel(){
			this.modelsArray.push({size: '' , price: ''})
		},
		deliteModel(index){
			this.modelsArray.splice(index, 1);
		},
		changeModels(){
			console.log(this.modelsArray)
			this.$router.push('/directories')
		}
	}
}

</script>