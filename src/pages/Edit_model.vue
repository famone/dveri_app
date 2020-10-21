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
					<p>{{getModelEdit(routeId).price}}</p>
				</div>
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
			
		}
	},
	computed: {
		...mapGetters('zakaz', ['getModelEdit'])
	},
	created(){
		// модели
      	this.$store.dispatch('zakaz/loadModels')
		this.routeId = this.$route.params.id

		// axios
  //         .get("https://door.webink.site/wp-json/door/v1/get/models")
  //         .then((response) => {
  //           this.door = response.data.find(item => item.id == this.routeId)
  //           console.log(this.door)
            
  //        });
	}
}

</script>