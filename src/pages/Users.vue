<template>
	<section>
		<div class="container">
			<div class="col-lg-12">
				<h1>Пользователи</h1>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<usertable :users="users" :load="load" />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios'
import usertable from '../components/usertable.vue'
	export default{
		data(){
			return{
				users: [],
				load: true
			}
		},
		components: {usertable},
		created(){
			axios
			.get('https://door.webink.site/wp-json/door/v1/get/users')
			.then(response =>{
				console.log(response.data)
				this.users = response.data
				this.load = false
			})
		}
	}
</script>