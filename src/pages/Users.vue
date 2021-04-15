<template>
	<section>
		<newuser :newuser="newuser" @setUser="setUser" @closePop="closePop" />
		<div class="container">
			<div class="col-lg-12">
				<h1>Пользователи</h1>
		        <v-btn depressed color="primary" @click="newuser = true">
		          	<v-icon>mdi-playlist-plus</v-icon> 
		          	Новый пользователь
		      	</v-btn>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<usertable :users="users" :load="load" @deleteUser="deleteUser" />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios'
import usertable from '../components/usertable.vue'
import newuser from '../components/newuser.vue'

	export default{
		data(){
			return{
				newuser: false,
				users: [],
				load: true
			}
		},
		components: {usertable, newuser},
		methods: {
			deleteUser(id){
				this.users = []
				this.load = true
				axios
				.get('https://door.webink.site/wp-json/door/v1/delete/user?user_id=' + id)
				.then(res =>{
					this.load = false
					this.users = res.data.users
					console.log(res.data)
				})
			},
			setUser(user){
				this.newuser = false
				console.log(user)
				this.load = true

				axios.post('https://door.webink.site/wp-json/door/v1/create/user', user)
				.then(res => {
					this.load = false
					this.users = res.data.users
				})
			},
			closePop(){
				this.newuser = false
			}
		},
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