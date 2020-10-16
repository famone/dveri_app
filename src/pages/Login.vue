

<template>
	<section id="logSec" class="text-center">
    <v-snackbar v-model="snackbar" :timeout="2000" :color="snackbarColor" top>
      {{ snackbarContent }}
    </v-snackbar>
		<div class="login-box">
		
    <form @submit.prevent="login()">
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      
      label="Логин"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="pass"
      type="password"
      :error-messages="emailErrors"
      label="Пароль"
      required
      @input="$v.pass.$touch()"
      @blur="$v.pass.$touch()"
    ></v-text-field>
    <br>
    <v-btn depressed color="primary" type='submit'>ВОЙТИ</v-btn>
  </form>
		</div>
	</section>
</template>



<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required },
      pass: { required },
      
    },

    data: () => ({
      name: '',
      pass: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
      ],
      checkbox: false,
      snackbar: false,
      snackbarContent: "",
      snackbarColor: "",
    }),

    computed: {
      
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Некоректное поле')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.pass.$dirty) return errors
        !this.$v.pass.required && errors.push('Некоректное поле')
        return errors
      },
    },

    methods: {
      async login() {
       if(this.$v.$invalid) {
					this.$v.$touch();
					return;
			 }

       let form = {
          username: this.name,
          password: this.pass
       }


      try{
        const result = await this.$store.dispatch('goods/login', form)
        const { redirect = false } = this.$route.query
        const path = redirect ? decodeURI(redirect) : '/'
        this.$router.push('/');
        
        }catch(e){
            this.snackbarColor = "error";
            this.snackbar = true;
            this.snackbarContent = e.message;        

      }

			// console.log(this.name)
			// console.log(this.pass)
   //    this.$router.push('/')
      },
    }
  }
</script>


<style>
#logSec{
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 30px 0;
}
.login-box{
	padding: 30px;
	width: 400px;
	border-radius: 10px;
	background-color: #fff;
	box-shadow: 0 4px 20px 0 rgba(0,0,0,.1);
}
</style> 