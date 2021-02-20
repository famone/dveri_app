

<template>
  <section id="logSec" class="text-center">
    <v-snackbar
      v-model="snackbar.state"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      top
    >
      <!-- {{ snackbar.content }}  -->
      Некоректный пароль или логин
    </v-snackbar>
    <div class="login-box">
      <form @submit.prevent="login">
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
        <br />
        <v-btn depressed color="primary" type="submit">ВОЙТИ</v-btn>
      </form>
    </div>
  </section>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required },
    pass: { required },
  },

  data: () => ({
    name: "",
    pass: "",
    select: null,
    items: ["Item 1", "Item 2"],
    checkbox: false,
    // snackbar: false,
    // snackbarContent: "",
    // snackbarColor: "",
  }),

  computed: {
    ...mapGetters({
      snackbar: "ui/getSnackbar",
    }),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Некоректное поле");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.pass.$dirty) return errors;
      !this.$v.pass.required && errors.push("Некоректное поле");
      return errors;
    },
  },

  methods: {
    ...mapActions({
      AUTH_REQUEST: "auth/AUTH_REQUEST",
    }),
    
    login() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      let form = {
        username: this.name,
        password: this.pass,
      };

      this.AUTH_REQUEST(form).then(() => {
        this.$router.replace("/");
      });
    },
  },
};
</script>


<style>
#logSec {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 0;
}
.login-box {
  padding: 30px;
  width: 400px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
}
</style> 